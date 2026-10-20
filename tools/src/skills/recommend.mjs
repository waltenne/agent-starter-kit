import path from "path";
import fs from "fs";
import { detectProject } from "../detector.mjs";
import { loadCatalog } from "./catalog.mjs";
import { listInstalledSkills } from "./manager.mjs";

export const PROFILES = {
  MINIMAL: {
    name: "Minimal",
    description: "Somente os componentes internos essenciais de busca e git",
    skills: ["code-search", "git-workflow"]
  },
  DEVELOPER: {
    name: "Developer",
    description: "Foco em desenvolvimento, TDD, arquitetura e testes",
    skills: ["code-search", "git-workflow", "triage-test-failure", "review-api-contract", "archify", "superpowers"]
  },
  DEVOPS_SRE: {
    name: "DevOps & SRE",
    description: "Foco em contêineres, git e observabilidade",
    skills: ["git-workflow", "docker-essentials", "code-search"]
  },
  DOCUMENTATION: {
    name: "Documentation",
    description: "Foco em escrita natural, diagramas e padrões",
    skills: ["git-workflow", "humanizer", "archify", "code-search"]
  },
  AI_ENGINEERING: {
    name: "AI Engineering",
    description: "Foco em sistemas de IA, memória de longo prazo e MCP",
    skills: ["code-search", "git-workflow", "ai-memory", "prism-coder", "frankxai-skills"]
  }
};

export function recommendSkills(targetDir = process.cwd(), options = {}) {
  const dir = path.resolve(targetDir);
  const detected = detectProject(dir);
  const installedRes = listInstalledSkills(dir, options);
  const installedIds = new Set((installedRes.data?.installed || []).map(i => i.id));

  const { data } = loadCatalog();
  const allSkills = data.skills;

  const profileKey = options.profile ? options.profile.toUpperCase() : null;
  const recommendations = [];

  function addRec(skillId, reason, priority = "HIGH") {
    if (installedIds.has(skillId)) return;
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;

    // Checar se conflita com algo já instalado
    let hasConflictNotice = null;
    const conflicts = skill.conflicts || [];
    for (const conf of conflicts) {
      if (installedIds.has(conf.id)) {
        hasConflictNotice = `Nota: sobreposição com '${conf.id}' já instalado (${conf.reason})`;
      }
    }

    recommendations.push({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      type: skill.type,
      source: skill.source,
      reviewStatus: skill.reviewStatus,
      priority,
      reason,
      conflictNotice: hasConflictNotice,
      license: skill.license,
      description: skill.description
    });
  }

  // Se um perfil específico foi solicitado
  if (profileKey && PROFILES[profileKey]) {
    const prof = PROFILES[profileKey];
    for (const sId of prof.skills) {
      addRec(sId, `Recomendado pelo perfil de instalação [${prof.name}]`, "HIGH");
    }
  } else {
    // Recomendações contextuais da stack detectada
    addRec("code-search", "Busca rápida determinística de símbolos e texto reduzindo tokens", "HIGH");
    addRec("humanizer", "Opcional da comunidade: remove clichês de IA para escrita natural em documentação e commits", "MEDIUM");

    if (detected.git && detected.git.initialized) {
      addRec("git-workflow", "Fluxo padronizado de commits semânticos e conferência de árvore limpa", "HIGH");
    }

    if (detected.testFramework) {
      addRec("triage-test-failure", `Suíte de testes detectada (${detected.testFramework}); isola falhas em saída compacta`, "HIGH");
      addRec("superpowers", "Toolkit de desenvolvimento disciplinado com TDD e especificação", "MEDIUM");
    }

    if (detected.database === "sqlite" || detected.database === "relational-db") {
      addRec("db-health", `Banco de dados detectado (${detected.database}); valida integridade e schemas`, "HIGH");
    }

    if (detected.desktop === "electron" || detected.desktop === "tauri" || detected.frameworks.includes("electron")) {
      addRec("performance-benchmark", "Aplicação desktop detectada; mede tempos de startup e uso de memória RSS", "HIGH");
      addRec("archify", "Gera diagramas técnicos interativos em HTML para documentar o fluxo da aplicação", "MEDIUM");
    }

    if (detected.frameworks.includes("api-backend") || detected.recommendedBlueprint === "technical/web-dev") {
      addRec("review-api-contract", "Desenvolvimento web/API detectado; checa compatibilidade e breaking changes", "MEDIUM");
      addRec("archify", "Documentação de arquitetura e contratos via diagramas interativos", "MEDIUM");
    }

    if (fs.existsSync(path.join(dir, "Dockerfile")) || fs.existsSync(path.join(dir, "docker-compose.yml"))) {
      addRec("docker-essentials", "Configuração de contêineres detectada; boas práticas e inspeção de imagens", "MEDIUM");
    }
  }

  const builtin = recommendations.filter(r => r.source === "builtin");
  const community = recommendations.filter(r => r.source === "community");

  return {
    status: "ok",
    data: {
      workspace: dir,
      activeProfile: profileKey || "AUTO_DETECTED",
      availableProfiles: Object.keys(PROFILES),
      detectedStack: {
        name: detected.name,
        runtimes: detected.runtimes,
        frameworks: detected.frameworks,
        database: detected.database,
        desktop: detected.desktop
      },
      totalRecommendations: recommendations.length,
      builtin,
      community
    },
    warnings: [],
    errors: []
  };
}
