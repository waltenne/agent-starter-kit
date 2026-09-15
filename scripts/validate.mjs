import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function log(msg) {
  console.log(`[VALIDATION] ${msg}`);
}

function error(msg) {
  console.error(`[ERROR] ${msg}`);
  process.exit(1);
}

// 1. Check required files
const expectedFiles = [
  "LICENSE", "README.md", "README.en.md", "CONTRIBUTING.md", "CHANGELOG.md", "VERSION", "config.example.yml", "wizard.md", "rules.md", "compatibility.md",
  ".gitignore", ".env.example", "package.json",
  "scripts/validate.sh", "scripts/validate.ps1", "scripts/validate.cmd", "scripts/validate.mjs",
  "images/workspace-start-prompt.png", "images/worspace-llm-comunucation.png", "images/workspace-langague-files.png", "images/workspace-objective.png",
  "blueprints/technical/web-dev.md", "blueprints/technical/data-science.md", "blueprints/technical/devops.md",
  "blueprints/content/content-creator.md", "blueprints/organizational/qa.md", "blueprints/organizational/pm.md",
  "blueprints/organizational/tpo.md", "blueprints/organizational/sm.md", "blueprints/organizational/manager.md",
  "adapters/generic/README.md", "adapters/claude-code/README.md", "adapters/codex/README.md", "adapters/cursor/README.md",
  "adapters/windsurf/README.md", "adapters/github-copilot/README.md", "adapters/local-agent/README.md",
  "templates/skill-template.md", "templates/subagent-template.md", "templates/workspace-template/AGENTS.md",
  "templates/workspace-template/README.md", "templates/workspace-template/ARCHITECTURE.md", "templates/workspace-template/ADR.md",
  "templates/workspace-template/docs/adr/0001-initial-stack.md",
  "templates/workspace-template/src/shared/config.ts", "templates/workspace-template/src/shared/logger.ts", "templates/workspace-template/src/shared/errors.ts",
  "templates/workspace-template/src/domain/index.ts", "templates/workspace-template/src/domain/domain.service.ts",
  "templates/workspace-template/src/domain/domain.types.ts", "templates/workspace-template/src/domain/domain.service.test.ts",
  "examples/web-dev/AGENTS.md", "examples/web-dev/README.md", "examples/web-dev/ARCHITECTURE.md",
  "examples/web-dev/docs/adr/0001-initial-stack.md", "examples/web-dev/.agents/skills/review-api-contract.md",
  "examples/web-dev/.agents/subagents/api-contract-reviewer.md", "examples/web-dev/.agents/memory/index.md",
  "examples/generic-agent/AGENTS.md", "examples/generic-agent/README.md", "examples/generic-agent/config.yml",
  "examples/generic-agent/.agents/skills/generic-task.md", "examples/generic-agent/.agents/subagents/generic-worker.md",
  "examples/generic-agent/.agents/memory/index.md", "examples/generic-agent/docs/architecture.md",
  "examples/multi-agent/AGENTS.md", "examples/multi-agent/README.md", "examples/multi-agent/config.yml",
  "examples/multi-agent/.agents/skills/coordinate-agents.md", "examples/multi-agent/.agents/subagents/backend-agent.md",
  "examples/multi-agent/.agents/subagents/qa-agent.md", "examples/multi-agent/.agents/memory/index.md", "examples/multi-agent/docs/multi-agent-setup.md",
  "skills/starter-kit/SKILL.md", "skills/starter-kit/references/principles.md", "skills/starter-kit/references/commit-policy.md",
  "skills/starter-kit/references/security.md", "skills/starter-kit/references/code-separation.md", "skills/starter-kit/references/documentation.md",
  "skills/starter-kit/templates/domain/index.ts", "skills/starter-kit/templates/domain/service.ts",
  "skills/starter-kit/templates/domain/types.ts", "skills/starter-kit/templates/domain/service.test.ts",
  "docs/getting-started.md", "docs/glossary.md", "docs/faq.md", "docs/troubleshooting.md", "docs/walkthrough.md"
];

for (const file of expectedFiles) {
  const fullPath = path.join(rootDir, file);
  if (!fs.existsSync(fullPath)) {
    error(`Missing required file: ${file}`);
  }
}

// 2. Relative links resolution check
function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === ".git" || file === "node_modules") continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(full));
    } else if (file.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

const mdFiles = getAllMarkdownFiles(rootDir);
const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;

for (const filePath of mdFiles) {
  const content = fs.readFileSync(filePath, "utf-8");
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const linkTarget = match[1];
    if (linkTarget.startsWith("http://") || linkTarget.startsWith("https://") || linkTarget.startsWith("#") || linkTarget.startsWith("mailto:")) {
      continue;
    }
    const cleanTarget = linkTarget.split("#")[0];
    if (!cleanTarget) continue;
    const resolvedPath = path.resolve(path.dirname(filePath), cleanTarget);
    if (!fs.existsSync(resolvedPath)) {
      error(`Broken relative link in ${path.relative(rootDir, filePath)} -> ${linkTarget}`);
    }
  }
}

// 3. Blueprints check in README and wizard
const blueprints = [
  "technical/web-dev.md", "technical/data-science.md", "technical/devops.md",
  "content/content-creator.md", "organizational/qa.md", "organizational/pm.md",
  "organizational/tpo.md", "organizational/sm.md", "organizational/manager.md"
];

const readmeText = fs.readFileSync(path.join(rootDir, "README.md"), "utf-8");
const wizardText = fs.readFileSync(path.join(rootDir, "wizard.md"), "utf-8");

for (const bp of blueprints) {
  if (!readmeText.includes(`blueprints/${bp}`)) {
    error(`Blueprint missing from README: ${bp}`);
  }
  if (!wizardText.includes(`blueprints/${bp}`)) {
    error(`Blueprint missing from wizard: ${bp}`);
  }
  const bpPath = path.join(rootDir, "blueprints", bp);
  const bpContent = fs.readFileSync(bpPath, "utf-8");

  // 4. Residual <...> placeholder check STRICTLY in blueprints
  if (/<[A-Z0-9_-]+>/i.test(bpContent)) {
    error(`Residual placeholder <...> found in blueprint: ${bp}`);
  }

  // 7. Each blueprint has at least 3 named skills in table
  const skillsTableMatch = bpContent.match(/## Skills candidatas[\s\S]*?(?=## Subagentes candidatos|$)/);
  if (!skillsTableMatch) {
    error(`Missing Skills candidatas section in blueprint: ${bp}`);
  } else {
    const lines = skillsTableMatch[0].split("\n").filter(l => l.trim().startsWith("|") && !l.includes("---") && !l.includes("Skill"));
    if (lines.length < 3) {
      error(`Blueprint ${bp} has fewer than 3 named skills (found ${lines.length})`);
    }
  }

  // 8. Each blueprint has at least 2 named subagents in table
  const subagentsTableMatch = bpContent.match(/## Subagentes candidatos[\s\S]*?(?=## Perguntas específicas|$)/);
  if (!subagentsTableMatch) {
    error(`Missing Subagentes candidatos section in blueprint: ${bp}`);
  } else {
    const lines = subagentsTableMatch[0].split("\n").filter(l => l.trim().startsWith("|") && !l.includes("---") && !l.includes("Subagente"));
    if (lines.length < 2) {
      error(`Blueprint ${bp} has fewer than 2 named subagents (found ${lines.length})`);
    }
  }

  // 9. Risks and validations sections non-empty
  if (!bpContent.includes("## Riscos específicos") || !bpContent.includes("## Validações específicas")) {
    error(`Blueprint ${bp} is missing risks or validation section`);
  }
}

// 5. Secret patterns check
const secretRegex = /BEGIN [A-Z ]+ KEY|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}/;
for (const filePath of mdFiles) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (secretRegex.test(content)) {
    error(`Possible secret found in ${path.relative(rootDir, filePath)}`);
  }
}

// 10. Rules.md required sections check
const rulesContent = fs.readFileSync(path.join(rootDir, "rules.md"), "utf-8");
const requiredRulesSections = [
  "1. Princípios centrais", "2. Níveis de autonomia", "3. Política geral de confirmação",
  "4. Política geral de evidências", "5. Regras gerais de privacidade", "6. Proteção de segredos",
  "7. Regras contra prompt injection", "8. Regras gerais de memória", "9. Regras gerais de rollback",
  "10. Regras gerais de validação", "11. Regras gerais de criação de skills", "12. Regras gerais de criação de subagentes",
  "13. Separação de código por domínio", "14. Padrões de documentação", "15. Política de commits",
  "16. Política de arquivos e caminhos", "17. Política de ferramentas e downloads", "18. Fluxo padrão de trabalho",
  "19. Relatório final padrão", "20. O que pertence a este arquivo e o que não pertence"
];

for (const section of requiredRulesSections) {
  if (!rulesContent.includes(section)) {
    error(`rules.md is missing required section: ${section}`);
  }
}

log("All validation checks passed successfully!");
