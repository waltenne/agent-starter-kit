import { listInstalledSkills } from "./manager.mjs";
import { getSkillInfo } from "./catalog.mjs";

export function checkConflicts(targetDir = process.cwd(), candidateSkillId = "", options = {}) {
  const installedRes = listInstalledSkills(targetDir, options);
  const installed = installedRes.data?.installed || [];

  const candidateRes = getSkillInfo(candidateSkillId);
  if (candidateRes.status === "error") {
    return { status: "error", issues: [], errors: candidateRes.errors };
  }

  const candidate = candidateRes.data;
  const issues = [];

  // 1. Checar se já está instalada exatamente com o mesmo ID (DUPLICATE)
  const exactMatch = installed.find(s => s.id === candidate.id);
  if (exactMatch) {
    issues.push({
      targetId: exactMatch.id,
      type: "DUPLICATE",
      severity: "warning",
      reason: `A skill '${candidate.id}' já está instalada neste escopo.`
    });
  }

  // 2. Checar a lista explícita de conflitos do catálogo
  const declaredConflicts = candidate.conflicts || [];
  for (const conf of declaredConflicts) {
    const conflictInstalled = installed.find(s => s.id === conf.id);
    if (conflictInstalled) {
      issues.push({
        targetId: conf.id,
        type: conf.type || "OVERLAP",
        severity: conf.type === "CONFLICT" || conf.type === "INCOMPATIBLE" ? "error" : "warning",
        reason: conf.reason || `Conflito ou sobreposição detectada com '${conf.id}'.`
      });
    }
  }

  // 3. Checar conflitos bidirecionais (se alguma instalada declara conflito com a candidata)
  for (const item of installed) {
    const itemInfo = getSkillInfo(item.id);
    if (itemInfo.status === "ok") {
      const itemConflicts = itemInfo.data.conflicts || [];
      const backConflict = itemConflicts.find(c => c.id === candidate.id);
      if (backConflict && !issues.some(i => i.targetId === item.id)) {
        issues.push({
          targetId: item.id,
          type: backConflict.type || "OVERLAP",
          severity: backConflict.type === "CONFLICT" || backConflict.type === "INCOMPATIBLE" ? "error" : "warning",
          reason: backConflict.reason || `A skill instalada '${item.id}' declara sobreposição com '${candidate.id}'.`
        });
      }
    }
  }

  return {
    status: issues.some(i => i.severity === "error") ? "conflict" : (issues.length > 0 ? "warning" : "clean"),
    issues
  };
}

