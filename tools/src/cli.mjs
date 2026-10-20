#!/usr/bin/env node

import { detectProject } from "./detector.mjs";
import { setupWorkflow } from "./installer.mjs";
import { getProjectInfo, getProjectStatus } from "./project.mjs";
import { findText, findFile, findSymbol } from "./find.mjs";
import { runCheck } from "./check.mjs";
import { getContext } from "./context.mjs";
import { collectLogs } from "./logs.mjs";
import { checkDbHealth } from "./db.mjs";
import { loadCatalog, getSkillInfo } from "./skills/catalog.mjs";
import { listInstalledSkills, installSkill, removeSkill, updateSkill, planInstallation } from "./skills/manager.mjs";
import { recommendSkills, PROFILES } from "./skills/recommend.mjs";
import { runDoctor } from "./skills/doctor.mjs";
import { browseCatalog } from "./skills/browse.mjs";

const args = process.argv.slice(2);

function hasFlag(flag) {
  return args.includes(flag);
}

function getFlagValue(flag) {
  const idx = args.indexOf(flag);
  if (idx !== -1 && idx + 1 < args.length && !args[idx + 1].startsWith("-")) {
    return args[idx + 1];
  }
  return null;
}

const isJson = hasFlag("--json") || hasFlag("-j");
const isDryRun = hasFlag("--dry-run");
const isForce = hasFlag("--force");
const isGlobal = hasFlag("--global");
const isYes = hasFlag("--yes") || hasFlag("-y");
const profileFlag = getFlagValue("--profile");
const categoryFlag = getFlagValue("--category");

const cleanArgs = args.filter(a => !a.startsWith("-"));

function output(result) {
  if (isJson) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    printHuman(result);
  }

  if (result.status === "error" || (result.errors && result.errors.length > 0)) {
    process.exit(result.status === "error" ? 2 : 1);
  }
}

function printHuman(res) {
  if (res.status === "error") {
    console.error(`[ERROR] ${res.errors.join(", ")}`);
    return;
  }

  const data = res.data;
  if (!data) {
    console.log("[OK] Executado com sucesso.");
    return;
  }

  // Dry run notice
  if (data.dryRun) {
    console.log(`\n🔍 MODO --dry-run ATIVO: Nenhuma alteração foi escrita no disco.`);
  }

  // Skills Doctor
  if (data.healthyCount !== undefined && data.issuesCount !== undefined) {
    const symbol = res.status === "ok" ? "✔" : (res.status === "warning" ? "⚠" : "✖");
    console.log(`\n${symbol} HEALTH CHECK DO WORKSPACE:`);
    console.log(`   Escopo:             ${data.workspace}`);
    console.log(`   Lockfile presente:  ${data.lockfileExists ? "sim" : "não"}`);
    console.log(`   Skills gerenciadas: ${data.installedCount}`);
    console.log(`   Skills saudáveis:   ${data.healthyCount}`);
    console.log(`   Problemas achados:  ${data.issuesCount}`);

    if (data.issues.length > 0) {
      console.log(`\n   Diagnósticos detalhados:`);
      data.issues.forEach(iss => {
        const tag = iss.severity === "error" ? "[ERRO]" : (iss.severity === "warning" ? "[ALERTA]" : "[INFO]");
        console.log(`   ${tag} ${iss.message}`);
      });
    } else {
      console.log(`   Nenhum conflito, arquivo ausente ou divergência de hash detectada.`);
    }
    return;
  }

  // Skills Browse
  if (data.categories !== undefined && data.profiles !== undefined) {
    console.log(`\n=====================================================`);
    console.log(`   AGENT STARTER KIT — COMMUNITY CAPABILITY MANAGER`);
    console.log(`=====================================================\n`);
    console.log(`Perfis de Instalação Disponíveis:`);
    for (const [pKey, pVal] of Object.entries(data.profiles)) {
      console.log(`  [P] ${pKey.padEnd(16)} -> ${pVal.description}`);
    }
    console.log(`\nCategorias de Capacidades (${data.totalCategories} categorias, ${data.totalComponents} componentes):`);
    let catIdx = 1;
    for (const [catName, catSkills] of Object.entries(data.categories)) {
      console.log(`\n[${catIdx++}] ${catName.toUpperCase()}:`);
      catSkills.forEach(s => {
        const typeBadge = s.type === "toolkit" ? "[TOOLKIT]" : (s.type === "integration" ? "[INTEGRATION]" : "[SKILL]");
        console.log(`    • ${s.id.padEnd(20)} ${typeBadge.padEnd(14)} ${s.description.substring(0, 75)}...`);
      });
    }
    console.log(`\nComandos rápidos:`);
    console.log(`  agent-tool skills recommend --profile <NOME>   Recomenda por perfil`);
    console.log(`  agent-tool skills info <id>                    Exibe detalhes completos`);
    console.log(`  agent-tool skills install <id>                 Instala o componente selecionado`);
    return;
  }

  // Skills List
  if (data.skills && Array.isArray(data.skills)) {
    console.log(`\n📦 Catálogo de Capacidades (${data.total} disponíveis):`);
    console.log(`\n--- [BUILTIN] (Mantidas pelo kit) ---`);
    data.skills.filter(s => s.source === "builtin").forEach(s => {
      const typeBadge = s.type === "toolkit" ? "[TOOLKIT]" : (s.type === "integration" ? "[INTEGRATION]" : "[SKILL]");
      console.log(`  • ${s.id.padEnd(22)} ${typeBadge.padEnd(14)} [${s.category.padEnd(12)}] ${s.description}`);
    });

    console.log(`\n--- [COMMUNITY_REVIEWED] (Curadas e opcionais) ---`);
    data.skills.filter(s => s.source === "community").forEach(s => {
      const typeBadge = s.type === "toolkit" ? "[TOOLKIT]" : (s.type === "integration" ? "[INTEGRATION]" : "[SKILL]");
      console.log(`  • ${s.id.padEnd(22)} ${typeBadge.padEnd(14)} [${s.category.padEnd(12)}] ${s.description}`);
    });
    console.log(`\nPara mais detalhes: agent-tool skills info <id>`);
    console.log(`Para instalar:     agent-tool skills install <id> [--project|--global]`);
    return;
  }

  // Skill Info
  if (data.reviewStatus !== undefined && data.repository !== undefined) {
    console.log(`\n📖 Componente: ${data.name} (${data.id})`);
    console.log(`   Origem:        ${data.source.toUpperCase()} [${data.reviewStatus}]`);
    console.log(`   Categoria:     ${data.category}`);
    console.log(`   Tipo:          ${data.type.toUpperCase()}`);
    console.log(`   Licença:       ${data.license}`);
    if (data.author) console.log(`   Autor:         ${data.author}`);
    if (data.maintainer) console.log(`   Mantenedor:    ${data.maintainer}`);
    console.log(`   Repositório:   ${data.repository}`);
    if (data.revision) console.log(`   Revisão/Tag:   ${data.revision}`);
    if (data.lastVerified) console.log(`   Verificado em: ${data.lastVerified}`);
    console.log(`   Descrição:     ${data.description}`);
    if (data.reviewNotes) console.log(`   Auditoria:     ${data.reviewNotes}`);
    if (data.triggers && data.triggers.length > 0) console.log(`   Gatilhos:      ${data.triggers.join(", ")}`);
    if (data.dependencies && data.dependencies.length > 0) console.log(`   Dependências:  ${data.dependencies.join(", ")}`);
    if (data.conflicts && data.conflicts.length > 0) {
      console.log(`   Conflitos/Sobreposições declaradas:`);
      data.conflicts.forEach(c => console.log(`     - [${c.type}] ${c.id}: ${c.reason}`));
    }
    return;
  }

  // Skills Installed
  if (data.installed && Array.isArray(data.installed)) {
    console.log(`\n📂 Capacidades Instaladas [Escopo: ${data.scope.toUpperCase()}] (${data.total}):`);
    if (data.installed.length === 0) {
      console.log(`   (Nenhum componente instalado via agent-tool neste escopo ainda)`);
    } else {
      data.installed.forEach(s => {
        const modFlag = s.modifiedLocally ? " [MODIFICADA LOCALMENTE]" : "";
        const typeBadge = s.type === "toolkit" ? "[TK]" : (s.type === "integration" ? "[INT]" : "[SK]");
        console.log(`  • ${s.id.padEnd(20)} ${typeBadge} [${s.source}] ${s.path}${modFlag}`);
      });
    }
    return;
  }

  // Skills Recommendations
  if (data.totalRecommendations !== undefined && data.builtin !== undefined) {
    console.log(`\n💡 Recomendações de Capacidades para o Projeto:`);
    console.log(`   Perfil ativo:      [${data.activeProfile}]`);
    console.log(`   Stack identificada: ${data.detectedStack.name} (${data.detectedStack.runtimes.join(", ") || "n/a"})`);

    if (data.builtin.length > 0) {
      console.log(`\n--- Componentes Internos Recomendados (Builtin) ---`);
      data.builtin.forEach(s => {
        const warn = s.conflictNotice ? ` ⚠ ${s.conflictNotice}` : "";
        console.log(`  [+] ${s.id.padEnd(22)} -> ${s.reason}${warn}`);
      });
    }

    if (data.community.length > 0) {
      console.log(`\n--- Componentes Opcionais da Comunidade ---`);
      data.community.forEach(s => {
        const warn = s.conflictNotice ? ` ⚠ ${s.conflictNotice}` : "";
        console.log(`  [?] ${s.id.padEnd(22)} [${s.type}] -> ${s.reason}${warn}`);
      });
    }

    console.log(`\nPara instalar: agent-tool skills install <id> [--global|--project]`);
    return;
  }

  // Skill install/remove
  if (data.installedPath || data.removed) {
    if (data.removed) {
      console.log(`✔ Componente '${data.skillId}' removido com sucesso do escopo [${data.scope}].`);
    } else {
      console.log(`✔ Componente '${data.skillId}' (${data.type}) instalado com sucesso em '${data.installedPath}' [${data.scope}].`);
      if (data.conflicts && data.conflicts.length > 0) {
        console.log(`   Notas de coexistência/sobreposição:`);
        data.conflicts.forEach(c => console.log(`     - [${c.type}] com '${c.targetId}': ${c.reason}`));
      }
    }
    return;
  }

  // Detect / Project Info
  if (data.runtimes !== undefined) {
    console.log(`\n📦 Projeto: ${data.name || "workspace"}`);
    console.log(`   Runtimes: ${data.runtimes.join(", ") || "nenhum"}`);
    console.log(`   Linguagens: ${data.languages ? data.languages.join(", ") : "n/a"}`);
    console.log(`   Frameworks: ${data.frameworks ? data.frameworks.join(", ") : "n/a"}`);
    if (data.database) console.log(`   Banco de dados: ${data.database}`);
    if (data.desktop) console.log(`   Desktop: ${data.desktop}`);
    if (data.testFramework) console.log(`   Test Runner: ${data.testFramework}`);
    if (data.recommendedSkills) console.log(`   Skills recomendadas: ${data.recommendedSkills.join(", ")}`);
    return;
  }

  // Setup Workflow
  if (data.actions !== undefined || data.installedSkills !== undefined) {
    console.log(`\n🚀 Workflow preparado para: ${data.workspace}`);
    if (data.actions) {
      console.log(`   Ações planejadas/executadas:`);
      data.actions.subagents.forEach(a => console.log(`     - Subagente [${a.name}]: ${a.action}`));
      data.actions.skills.forEach(a => console.log(`     - Skill [${a.name}]: ${a.action}`));
      if (data.actions.agentsMd) console.log(`     - AGENTS.md: ${data.actions.agentsMd.action}`);
    } else {
      console.log(`   Subagentes: ${data.installedSubagents.join(", ")}`);
      console.log(`   Skills: ${data.installedSkills.join(", ")}`);
    }
    return;
  }

  // Project Status
  if (data.git !== undefined) {
    console.log(`\n🌿 Git: ${data.git.branch} (${data.git.clean ? "limpo" : "modificado"})`);
    if (data.git.modifiedCount) console.log(`   Modificados: ${data.git.modifiedCount} arquivos`);
    if (data.git.untrackedCount) console.log(`   Não rastreados: ${data.git.untrackedCount} arquivos`);
    if (data.git.recentCommits && data.git.recentCommits.length > 0) {
      console.log(`   Último commit: ${data.git.recentCommits[0]}`);
    }
    return;
  }

  // Check / Test
  if (data.passed !== undefined && data.failed !== undefined) {
    const symbol = data.failed === 0 ? "✔" : "✖";
    console.log(`\n${symbol} Validação (${data.checkType}): ${data.passed} aprovados, ${data.failed} falhos (${data.durationMs}ms)`);
    if (data.failures && data.failures.length > 0) {
      console.log(`   Falhas:`);
      data.failures.forEach(f => {
        console.log(`   - ${f.name}`);
        if (f.details) f.details.forEach(d => console.log(`       ${d}`));
      });
    }
    return;
  }

  // Find / Matches
  if (data.matches !== undefined) {
    console.log(`\n🔍 Busca (${data.type}): ${data.totalMatches} ocorrências`);
    data.matches.slice(0, 15).forEach(m => {
      if (typeof m === "string") {
        console.log(`   - ${m}`);
      } else {
        console.log(`   - ${m.file}:${m.line} ${m.snippet || m.declaration || ""}`);
      }
    });
    if (data.truncated) console.log(`   ... (resultados truncados para brevidade)`);
    return;
  }

  // Logs
  if (data.topErrors !== undefined) {
    console.log(`\n📑 Logs coletados: ${data.errorCount} erros, ${data.warnCount} avisos`);
    if (data.topErrors.length > 0) {
      console.log(`   Top Erros frequentes:`);
      data.topErrors.forEach(e => console.log(`   [${e.count}x] ${e.message}`));
    }
    return;
  }

  console.log(JSON.stringify(data, null, 2));
}

function printUsage() {
  console.log(`
agent-tool (v1.4.0) — Community Skills & Capability Manager

Comandos Principais:
  agent-tool detect [dir]                 Analisa o projeto e recomenda o workflow
  agent-tool setup [dir]                  Prepara subagentes e skills com idempotência
  agent-tool project info [dir]           Exibe metadados da stack do projeto
  agent-tool project status [dir]         Exibe status resumido do Git e checagens
  agent-tool check [all|test|lint] [dir]  Executa testes/linters com filtragem de logs
  agent-tool find text <query>            Busca rápida de texto ou regex
  agent-tool find file <pattern>          Busca de arquivos por nome
  agent-tool find symbol <symbol>         Busca de símbolos e declarações
  agent-tool context <caminho|simbolo>    Gera contexto condensado para subagentes
  agent-tool logs collect <arquivo>       Coleta, sanitiza e resume erros de logs
  agent-tool db health <arquivo.sqlite>   Valida integridade e tabelas SQLite

Gerenciamento de Capacidades (Skills, Toolkits e Integrações):
  agent-tool skills browse                Interface interativa para explorar catálogo por categoria
  agent-tool skills list                  Lista todas as capacidades catalogadas
  agent-tool skills info <id>             Exibe detalhes, autor, licença, tipo e segurança
  agent-tool skills recommend [dir]       Recomendações contextuais (opcional: --profile <NOME>)
  agent-tool skills installed [dir]       Lista capacidades ativas (opcional: --global)
  agent-tool skills install <id...>       Instala capacidades (opcional: --global|--project)
  agent-tool skills remove <id>           Remove capacidade com segurança
  agent-tool skills update <id>           Atualiza capacidade instalada
  agent-tool skills doctor [dir]          Health check completo de lockfile, arquivos e conflitos

Opções Globais:
  --json, -j                              Retorna saída estruturada em JSON
  --dry-run                               Simula a execução sem gravar nada no disco
  --force                                 Permite sobrescrever alterações locais ou arquivos existentes
  --global                                Opera no escopo do usuário (~/.agents/skills/)
  --project                               Opera no escopo local do projeto (.agents/skills/) [Padrão]
  --profile <nome>                        Filtra recomendações (MINIMAL, DEVELOPER, DEVOPS_SRE, DOCUMENTATION, AI_ENGINEERING)
  --category <nome>                       Filtra a listagem por categoria
`);
}

async function run() {
  const command = cleanArgs[0];
  const subCommand = cleanArgs[1];

  if (!command || command === "help" || hasFlag("--help") || hasFlag("-h")) {
    printUsage();
    process.exit(0);
  }

  switch (command) {
    case "detect": {
      const dir = cleanArgs[1] || process.cwd();
      const detected = detectProject(dir);
      output({ status: "ok", data: detected, warnings: [], errors: [] });
      break;
    }

    case "setup":
    case "init": {
      const dir = cleanArgs[1] || process.cwd();
      const result = setupWorkflow(dir, {
        dryRun: isDryRun,
        force: isForce
      });
      output(result);
      break;
    }

    case "skills": {
      const action = subCommand;
      const targetParam = cleanArgs[2];

      if (!action || action === "list") {
        output(loadCatalog({ category: categoryFlag }));
      } else if (action === "browse") {
        output(browseCatalog({ category: categoryFlag }));
      } else if (action === "doctor") {
        const dir = targetParam || process.cwd();
        output(runDoctor(dir, { global: isGlobal }));
      } else if (action === "info") {
        output(getSkillInfo(targetParam));
      } else if (action === "recommend") {
        const dir = targetParam || process.cwd();
        output(recommendSkills(dir, { profile: profileFlag, global: isGlobal }));
      } else if (action === "installed") {
        const dir = targetParam || process.cwd();
        output(listInstalledSkills(dir, { global: isGlobal }));
      } else if (action === "install") {
        const skillIds = cleanArgs.slice(2);
        if (skillIds.length === 0) {
          output({ status: "error", data: null, errors: ["Informe pelo menos um ID de skill/toolkit para instalar"] });
          break;
        }
        const dir = process.cwd();
        const results = [];
        let hasError = false;
        for (const sid of skillIds) {
          const res = installSkill(dir, sid, { dryRun: isDryRun, force: isForce, global: isGlobal });
          results.push(res);
          if (res.status === "error") hasError = true;
        }
        if (skillIds.length === 1) {
          output(results[0]);
        } else {
          output({
            status: hasError ? "error" : "ok",
            data: { batch: results },
            warnings: [],
            errors: hasError ? ["Uma ou mais instalações falharam"] : []
          });
        }
      } else if (action === "remove") {
        const dir = cleanArgs[3] || process.cwd();
        output(removeSkill(dir, targetParam, { dryRun: isDryRun, force: isForce, global: isGlobal }));
      } else if (action === "update") {
        const dir = cleanArgs[3] || process.cwd();
        output(updateSkill(dir, targetParam, { dryRun: isDryRun, force: isForce, global: isGlobal }));
      } else {
        console.error(`[ERROR] Subcomando de skills desconhecido: ${action}`);
        printUsage();
        process.exit(2);
      }
      break;
    }

    case "project": {
      const dir = cleanArgs[2] || process.cwd();
      if (subCommand === "info") {
        output(getProjectInfo(dir));
      } else if (subCommand === "status") {
        output(getProjectStatus(dir));
      } else {
        printUsage();
      }
      break;
    }

    case "check": {
      const type = (subCommand && ["all", "test", "lint"].includes(subCommand)) ? subCommand : "all";
      const dir = (cleanArgs[2] && !["all", "test", "lint"].includes(cleanArgs[2])) ? cleanArgs[2] : (cleanArgs[1] && !["all", "test", "lint"].includes(cleanArgs[1]) ? cleanArgs[1] : process.cwd());
      output(runCheck(dir, type));
      break;
    }

    case "find": {
      const findType = subCommand;
      const query = cleanArgs[2];
      const dir = cleanArgs[3] || process.cwd();

      if (findType === "text") {
        output(findText(dir, query));
      } else if (findType === "file") {
        output(findFile(dir, query));
      } else if (findType === "symbol") {
        output(findSymbol(dir, query));
      } else {
        output(findText(dir, findType));
      }
      break;
    }

    case "context": {
      const query = subCommand;
      const dir = cleanArgs[2] || process.cwd();
      output(getContext(dir, query));
      break;
    }

    case "logs": {
      const file = cleanArgs[2] || subCommand;
      output(collectLogs(file));
      break;
    }

    case "db": {
      const file = cleanArgs[2] || subCommand;
      output(checkDbHealth(file));
      break;
    }

    default:
      console.error(`[ERROR] Comando desconhecido: ${command}`);
      printUsage();
      process.exit(2);
  }
}

run().catch(err => {
  console.error(`[FATAL] ${err.message}`);
  process.exit(2);
});
