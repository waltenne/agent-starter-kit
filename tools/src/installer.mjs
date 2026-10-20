import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { detectProject } from "./detector.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kitRoot = path.resolve(__dirname, "../..");

function computeSha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

export function setupWorkflow(targetDir = process.cwd(), options = {}) {
  const dir = path.resolve(targetDir);
  const detected = detectProject(dir);
  const isDryRun = !!options.dryRun;
  const force = !!options.force;

  const actions = {
    subagents: [],
    skills: [],
    agentsMd: null,
    wrapper: null
  };

  const installedSkills = [];
  const skippedSkills = [];
  const installedSubagents = [];
  const skippedSubagents = [];
  const warnings = [];

  const agentsDir = path.join(dir, ".agents");
  const skillsDir = path.join(agentsDir, "skills");
  const subagentsDir = path.join(agentsDir, "subagents");
  const toolsDir = path.join(dir, "tools");
  const lockfilePath = path.join(agentsDir, ".skills-lock.json");

  // 1. Planejamento de Subagentes
  const subagentTemplatesDir = path.join(kitRoot, "templates", "subagents");
  for (const sub of detected.recommendedSubagents) {
    const srcFile = path.join(subagentTemplatesDir, `${sub}.md`);
    if (fs.existsSync(srcFile)) {
      const destFile = path.join(subagentsDir, `${sub}.md`);
      const exists = fs.existsSync(destFile);
      if (exists && !force) {
        skippedSubagents.push(sub);
        actions.subagents.push({ name: sub, action: "preserve_existing", path: path.relative(dir, destFile) });
      } else {
        installedSubagents.push(sub);
        actions.subagents.push({ name: sub, action: exists ? "overwrite" : "create", path: path.relative(dir, destFile) });
      }
    }
  }

  // 2. Planejamento de Skills Recomendadas Internas (Builtin)
  // Segue o padrão Agent Skills (pasta com SKILL.md ou arquivo .md)
  const skillTemplatesDir = path.join(kitRoot, "templates", "skills");
  const lockEntries = {};

  for (const skill of detected.recommendedSkills) {
    let srcFile = path.join(skillTemplatesDir, skill, "SKILL.md");
    let isFolderSkill = true;
    if (!fs.existsSync(srcFile)) {
      srcFile = path.join(skillTemplatesDir, `${skill}.md`);
      isFolderSkill = false;
    }

    if (fs.existsSync(srcFile)) {
      // Destino seguindo a especificação Agent Skills: .agents/skills/<skill>/SKILL.md
      const targetSkillDir = path.join(skillsDir, skill);
      const destSkillMd = path.join(targetSkillDir, "SKILL.md");
      const legacyDestFile = path.join(skillsDir, `${skill}.md`);

      const exists = fs.existsSync(destSkillMd) || fs.existsSync(legacyDestFile);
      const finalDest = fs.existsSync(legacyDestFile) && !fs.existsSync(destSkillMd) ? legacyDestFile : destSkillMd;

      if (exists && !force) {
        skippedSkills.push(skill);
        actions.skills.push({ name: skill, action: "preserve_existing", path: path.relative(dir, finalDest) });
      } else {
        installedSkills.push(skill);
        actions.skills.push({ name: skill, action: exists ? "overwrite" : "create", path: path.relative(dir, finalDest) });
      }

      const content = fs.readFileSync(srcFile, "utf-8");
      lockEntries[skill] = {
        name: skill,
        type: "BUILTIN",
        source: "agent-starter-kit",
        version: "1.3.0",
        path: path.relative(dir, finalDest),
        hash: computeSha256(content),
        installedAt: new Date().toISOString()
      };
    }
  }

  // 3. Planejamento do Wrapper Local Portátil
  const localToolBash = path.join(toolsDir, "agent-tool");
  const localToolCmd = path.join(toolsDir, "agent-tool.cmd");
  const cliScriptPath = path.join(kitRoot, "tools", "src", "cli.mjs");

  // O wrapper bash procura na seguinte ordem:
  // 1. Binário 'agent-tool' no PATH do sistema
  // 2. Dependência em node_modules/.bin/agent-tool
  // 3. Variável de ambiente AGENT_TOOL_PATH
  // 4. Caminho de instalação original de fallback
  const bashWrapperContent = `#!/usr/bin/env bash
# agent-tool wrapper portátil para workspace
if command -v agent-tool &>/dev/null; then
  exec agent-tool "$@"
elif [ -f "$(dirname "$0")/../node_modules/.bin/agent-tool" ]; then
  exec "$(dirname "$0")/../node_modules/.bin/agent-tool" "$@"
elif [ -n "$AGENT_TOOL_PATH" ] && [ -f "$AGENT_TOOL_PATH" ]; then
  exec node "$AGENT_TOOL_PATH" "$@"
elif [ -f "${cliScriptPath}" ]; then
  exec node "${cliScriptPath}" "$@"
else
  echo "[ERROR] agent-tool não encontrado no PATH nem no caminho de fallback." >&2
  exit 127
fi
`;

  const cmdWrapperContent = `@echo off
where agent-tool >nul 2>nul
if %ERRORLEVEL% equ 0 (
  agent-tool %*
  exit /b %ERRORLEVEL%
)
if exist "%~dp0..\\node_modules\\.bin\\agent-tool.cmd" (
  call "%~dp0..\\node_modules\\.bin\\agent-tool.cmd" %*
  exit /b %ERRORLEVEL%
)
if defined AGENT_TOOL_PATH (
  node "%AGENT_TOOL_PATH%" %*
  exit /b %ERRORLEVEL%
)
if exist "${cliScriptPath}" (
  node "${cliScriptPath}" %*
  exit /b %ERRORLEVEL%
)
echo [ERROR] agent-tool nao encontrado no PATH nem no caminho de fallback.
exit /b 127
`;

  const wrapperExists = fs.existsSync(localToolBash);
  actions.wrapper = {
    action: wrapperExists && !force ? "preserve_existing" : (wrapperExists ? "overwrite" : "create"),
    path: path.relative(dir, localToolBash)
  };

  // 4. Planejamento do AGENTS.md
  const agentsMdPath = path.join(dir, "AGENTS.md");
  let newAgentsMdContent = "";
  const agentsMdExists = fs.existsSync(agentsMdPath);

  if (agentsMdExists && !force) {
    const existing = fs.readFileSync(agentsMdPath, "utf-8");
    if (!existing.includes("agent-tool")) {
      newAgentsMdContent = existing.trimEnd() + `\n\n` + generateAgentsMdSection(detected, installedSkills.concat(skippedSkills), installedSubagents.concat(skippedSubagents));
      actions.agentsMd = { action: "append", path: "AGENTS.md" };
    } else {
      actions.agentsMd = { action: "preserve_existing", path: "AGENTS.md" };
    }
  } else {
    newAgentsMdContent = generateFullAgentsMd(detected, installedSkills.concat(skippedSkills), installedSubagents.concat(skippedSubagents));
    actions.agentsMd = { action: agentsMdExists ? "overwrite" : "create", path: "AGENTS.md" };
  }

  // Se for DRY RUN, encerra aqui sem escrever nada no disco
  if (isDryRun) {
    return {
      status: "ok",
      data: {
        dryRun: true,
        workspace: dir,
        detected: {
          name: detected.name,
          runtimes: detected.runtimes,
          languages: detected.languages,
          frameworks: detected.frameworks,
          packageManager: detected.packageManager,
          testFramework: detected.testFramework,
          database: detected.database,
          recommendedBlueprint: detected.recommendedBlueprint
        },
        actions,
        installedSkills,
        skippedSkills,
        installedSubagents,
        skippedSubagents
      },
      warnings: ["Operação em modo --dry-run: nenhuma alteração foi escrita no disco."],
      errors: []
    };
  }

  // EXECUÇÃO REAL (não-dry-run)
  fs.mkdirSync(skillsDir, { recursive: true });
  fs.mkdirSync(subagentsDir, { recursive: true });
  fs.mkdirSync(toolsDir, { recursive: true });

  // 1. Executar cópia de Subagentes
  for (const item of actions.subagents) {
    if (item.action === "create" || item.action === "overwrite") {
      const src = path.join(subagentTemplatesDir, `${item.name}.md`);
      const dest = path.join(dir, item.path);
      fs.copyFileSync(src, dest);
    }
  }

  // 2. Executar cópia de Skills (suporte a diretório Agent Skills)
  for (const item of actions.skills) {
    if (item.action === "create" || item.action === "overwrite") {
      const destFile = path.join(dir, item.path);
      fs.mkdirSync(path.dirname(destFile), { recursive: true });

      let src = path.join(skillTemplatesDir, item.name, "SKILL.md");
      if (!fs.existsSync(src)) {
        src = path.join(skillTemplatesDir, `${item.name}.md`);
      }
      fs.copyFileSync(src, destFile);
    }
  }

  // 3. Atualizar/Gravar Lockfile
  let currentLock = { lockfileVersion: 1, installed: {} };
  if (fs.existsSync(lockfilePath)) {
    try {
      currentLock = JSON.parse(fs.readFileSync(lockfilePath, "utf-8"));
    } catch {}
  }
  for (const [id, entry] of Object.entries(lockentriesFrom(lockEntries, actions.skills))) {
    currentLock.installed[id] = entry;
  }
  fs.writeFileSync(lockfilePath, JSON.stringify(currentLock, null, 2), "utf-8");

  // 4. Executar gravação do Wrapper
  if (actions.wrapper.action === "create" || actions.wrapper.action === "overwrite") {
    fs.writeFileSync(localToolBash, bashWrapperContent, { mode: 0o755 });
    fs.writeFileSync(localToolCmd, cmdWrapperContent);
  }

  // 5. Executar gravação do AGENTS.md
  if (newAgentsMdContent && (actions.agentsMd.action === "create" || actions.agentsMd.action === "append" || actions.agentsMd.action === "overwrite")) {
    fs.writeFileSync(agentsMdPath, newAgentsMdContent, "utf-8");
  }

  return {
    status: "ok",
    data: {
      workspace: dir,
      detected: {
        name: detected.name,
        runtimes: detected.runtimes,
        languages: detected.languages,
        frameworks: detected.frameworks,
        packageManager: detected.packageManager,
        testFramework: detected.testFramework,
        database: detected.database,
        desktop: detected.desktop,
        recommendedBlueprint: detected.recommendedBlueprint
      },
      installedSkills,
      skippedSkills,
      installedSubagents,
      skippedSubagents,
      lockfilePath: path.relative(dir, lockfilePath),
      agentsMdPath: path.relative(dir, agentsMdPath),
      localCliPath: path.relative(dir, localToolBash)
    },
    warnings,
    errors: []
  };
}

function lockentriesFrom(allLock, skillsActions) {
  const res = {};
  for (const act of skillsActions) {
    if (act.action === "create" || act.action === "overwrite") {
      if (allLock[act.name]) res[act.name] = allLock[act.name];
    }
  }
  return res;
}

function generateAgentsMdSection(detected, skills, subagents) {
  return `## Hierarquia Operacional e Ferramentas Determinísticas

Este workspace adota a hierarquia estrita:

1. **SCRIPT** (\`tools/agent-tool\`): Executa tarefas determinísticas antes de LLM para economizar tokens.
2. **SKILL** (\`.agents/skills/\`): Procedimentos reutilizáveis e boas práticas seguindo a especificação Agent Skills.
3. **AGENT / WORKER** (\`.agents/subagents/\`): Coordenação e implementação (T0 direto, T1 worker, T2 implementer).
4. **ADVISOR** (\`.agents/subagents/advisor.md\`): Decisões arquiteturais de alto impacto e trade-offs (T3 deep).

### Comandos Determinísticos Disponíveis:
- \`tools/agent-tool project info --json\`: Metadados da stack sem varredura manual de arquivos.
- \`tools/agent-tool project status --json\`: Status de git, arquivos modificados e testes.
- \`tools/agent-tool check all --json\`: Execução de validações e testes com filtragem de logs.
- \`tools/agent-tool find text "<query>" --json\`: Busca rápida sem comandos ad-hoc.
- \`tools/agent-tool context <arquivo> --json\`: Contexto condensado de dependências e símbolos.
- \`tools/agent-tool skills list --json\`: Consulta o catálogo de skills internas e comunitárias.

### Skills Instaladas:
${skills.map(s => `- \`.agents/skills/${s}/SKILL.md\` (ou \`.agents/skills/${s}.md\`)`).join("\n")}

### Subagentes Disponíveis:
${subagents.map(s => `- \`.agents/subagents/${s}.md\``).join("\n")}
`;
}

function generateFullAgentsMd(detected, skills, subagents) {
  return `# Instruções Operacionais do Workspace

Projeto: **${detected.name}**
Blueprint Primário: \`${detected.recommendedBlueprint}\`

## Regra Central

Se uma tarefa pode ser executada de forma determinística por um script, ela **não deve** consumir tokens de raciocínio da LLM.

## Hierarquia de Execução

\`\`\`text
SCRIPT       -> executa tarefas determinísticas (tools/agent-tool)
SKILL        -> ensina procedimentos e padrões (.agents/skills/)
AGENT/WORKER -> decide, implementa e valida (T0 direto, T1 worker, T2 implementer)
ADVISOR      -> resolve decisões complexas e revisões críticas (T3 deep)
\`\`\`

## Níveis de Autonomia e Escalonamento

- **T0 (Direto)**: Pequenas correções, ajustes pontuais e documentação simples. Executado diretamente pelo orquestrador sem subagente.
- **T1 (Worker - FAST)**: Busca determinística, coleta de evidências e execução de scripts mecânicos via \`tools/agent-tool\`.
- **T2 (Implementer - BALANCED)**: Implementação de código e refatoração guiada pelas skills de domínio.
- **T3 (Advisor - DEEP)**: Decisões arquiteturais, migrações de risco ou persistência de erros após 2 tentativas.

## Comandos da CLI Determinística (\`tools/agent-tool\`)

Sempre use a flag \`--json\` para respostas curtas e estruturadas:

- \`tools/agent-tool project info --json\`: Retorna runtime, stack e caminhos importantes.
- \`tools/agent-tool project status --json\`: Retorna branch, arquivos alterados e status geral.
- \`tools/agent-tool check all --json\`: Executa a suíte de testes/lint com filtragem automática de logs.
- \`tools/agent-tool find [text|file|symbol] "<query>" --json\`: Busca estruturada e deduplicada.
- \`tools/agent-tool context <caminho> --json\`: Gera contexto mínimo para a tarefa.
- \`tools/agent-tool skills list --json\`: Consulta catálogo de skills.

## Skills Recomendadas Instaladas

${skills.map(s => `- \`.agents/skills/${s}/SKILL.md\` (ou \`.agents/skills/${s}.md\`)`).join("\n")}

## Subagentes Instalados

${subagents.map(s => `- \`.agents/subagents/${s}.md\``).join("\n")}
`;
}
