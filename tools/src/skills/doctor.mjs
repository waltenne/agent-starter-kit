import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { listInstalledSkills } from "./manager.mjs";
import { getSkillInfo } from "./catalog.mjs";

export function runDoctor(targetDir = process.cwd(), options = {}) {
  const dir = path.resolve(targetDir);
  const lockfilePath = path.join(dir, ".agents", ".skills-lock.json");

  const issues = [];
  let installedCount = 0;
  let healthyCount = 0;

  // 1. Checar existência e sintaxe do lockfile
  let lockExists = fs.existsSync(lockfilePath);
  let lockData = null;

  if (lockExists) {
    try {
      lockData = JSON.parse(fs.readFileSync(lockfilePath, "utf-8"));
    } catch (e) {
      issues.push({
        type: "corrupted_lockfile",
        severity: "error",
        message: `O lockfile em '${path.relative(dir, lockfilePath)}' contém JSON inválido: ${e.message}`
      });
    }
  }

  // 2. Listar skills instaladas
  const installedRes = listInstalledSkills(dir, options);
  const installed = installedRes.data?.installed || [];
  installedCount = installed.length;

  // 3. Checar cada skill instalada
  for (const item of installed) {
    let itemHealthy = true;
    const fullPath = path.join(dir, item.path);

    // Arquivo ausente
    if (!fs.existsSync(fullPath)) {
      itemHealthy = false;
      issues.push({
        skillId: item.id,
        type: "missing_file",
        severity: "error",
        message: `Arquivo da skill '${item.id}' declarado em '${item.path}' não foi encontrado no disco.`
      });
    }

    // Modificação local
    if (item.modifiedLocally) {
      issues.push({
        skillId: item.id,
        type: "modified_locally",
        severity: "info",
        message: `A skill '${item.id}' possui alterações locais em relação ao catálogo original.`
      });
    }

    // Dependências de sistema para integrations
    const infoRes = getSkillInfo(item.id);
    if (infoRes.status === "ok") {
      const deps = infoRes.data.dependencies || [];
      for (const dep of deps) {
        try {
          execSync(`command -v ${dep} || where ${dep}`, { stdio: ["ignore", "ignore", "ignore"] });
        } catch {
          itemHealthy = false;
          issues.push({
            skillId: item.id,
            type: "missing_dependency",
            severity: "warning",
            message: `A dependência '${dep}' exigida pela integração '${item.id}' não foi encontrada no PATH.`
          });
        }
      }
    }

    if (itemHealthy) healthyCount++;
  }

  // 4. Checar conflitos e sobreposições cruzadas entre todas as instaladas
  for (let i = 0; i < installed.length; i++) {
    const infoA = getSkillInfo(installed[i].id);
    if (infoA.status !== "ok") continue;

    const conflictsA = infoA.data.conflicts || [];
    for (let j = i + 1; j < installed.length; j++) {
      const conflictMatch = conflictsA.find(c => c.id === installed[j].id);
      if (conflictMatch) {
        issues.push({
          skillId: installed[i].id,
          targetId: installed[j].id,
          type: "active_overlap",
          severity: conflictMatch.type === "CONFLICT" ? "error" : "warning",
          message: `Sobreposição ativa entre '${installed[i].id}' e '${installed[j].id}': ${conflictMatch.reason}`
        });
      }
    }
  }

  const hasErrors = issues.some(i => i.severity === "error");
  const hasWarnings = issues.some(i => i.severity === "warning");
  const overallStatus = hasErrors ? "error" : (hasWarnings ? "warning" : "ok");

  return {
    status: overallStatus,
    data: {
      workspace: dir,
      lockfileExists: lockExists,
      installedCount,
      healthyCount,
      issuesCount: issues.length,
      issues
    },
    warnings: [],
    errors: []
  };
}

