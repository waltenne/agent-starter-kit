import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { getSkillInfo } from "./catalog.mjs";
import { checkConflicts } from "./conflicts.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kitRoot = path.resolve(__dirname, "../../..");

const ID_REGEX = /^[a-z0-9][a-z0-9-]*$/;

function computeFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

function resolveScopeDirs(targetDir, options = {}) {
  const isGlobal = !!options.global;
  const baseDir = isGlobal ? path.join(os.homedir(), ".agents") : path.join(path.resolve(targetDir), ".agents");
  return {
    isGlobal,
    baseDir,
    skillsDir: path.join(baseDir, "skills"),
    integrationsDir: path.join(baseDir, "integrations"),
    lockfile: path.join(baseDir, ".skills-lock.json")
  };
}

function readLockfile(lockfilePath) {
  if (!fs.existsSync(lockfilePath)) {
    return { lockfileVersion: 2, installed: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(lockfilePath, "utf-8"));
  } catch {
    return { lockfileVersion: 2, installed: {} };
  }
}

function writeLockfile(lockfilePath, lockData) {
  fs.mkdirSync(path.dirname(lockfilePath), { recursive: true });
  fs.writeFileSync(lockfilePath, JSON.stringify(lockData, null, 2), "utf-8");
}

export function listInstalledSkills(targetDir = process.cwd(), options = {}) {
  const { isGlobal, skillsDir, lockfile } = resolveScopeDirs(targetDir, options);
  const lock = readLockfile(lockfile);
  const result = [];

  for (const [id, entry] of Object.entries(lock.installed || {})) {
    const fullPath = path.isAbsolute(entry.path) ? entry.path : path.join(path.dirname(lockfile), entry.path);
    const exists = fs.existsSync(fullPath);
    let modifiedLocally = false;

    if (exists && entry.hash) {
      const currentHash = computeFileHash(fullPath);
      if (currentHash !== entry.hash) {
        modifiedLocally = true;
      }
    }

    result.push({
      id,
      name: entry.name || id,
      type: entry.type || "skill",
      source: entry.source || "unknown",
      reviewStatus: entry.reviewStatus || "BUILTIN",
      version: entry.version || "unknown",
      scope: entry.scope || (isGlobal ? "global" : "project"),
      path: entry.path,
      exists,
      modifiedLocally,
      installedAt: entry.installedAt
    });
  }

  return {
    status: "ok",
    data: {
      scope: isGlobal ? "global" : "project",
      skillsDir,
      total: result.length,
      installed: result
    },
    warnings: [],
    errors: []
  };
}

export function planInstallation(targetDir = process.cwd(), skillId = "", options = {}) {
  if (!skillId || !ID_REGEX.test(skillId)) {
    return {
      status: "error",
      errors: [`ID de skill inválido: '${skillId}'. Use apenas letras minúsculas, números e hífens.`]
    };
  }

  const skillInfo = getSkillInfo(skillId);
  if (skillInfo.status === "error") return skillInfo;
  const skill = skillInfo.data;

  const { isGlobal, skillsDir, integrationsDir, lockfile } = resolveScopeDirs(targetDir, options);
  const isIntegration = skill.type === "integration" || skill.type === "tool_integration";

  const targetFolder = isIntegration
    ? path.join(integrationsDir, skillId)
    : path.join(skillsDir, skillId);
  const targetMainFile = isIntegration
    ? path.join(targetFolder, "README.md")
    : path.join(targetFolder, "SKILL.md");

  const conflictsRes = checkConflicts(targetDir, skillId, options);
  const fileExists = fs.existsSync(targetMainFile);

  return {
    status: "ok",
    data: {
      skillId,
      name: skill.name,
      type: skill.type,
      source: skill.source,
      reviewStatus: skill.reviewStatus,
      scope: isGlobal ? "global" : "project",
      targetDirectory: targetFolder,
      targetMainFile,
      fileExists,
      dependencies: skill.dependencies || [],
      conflicts: conflictsRes.issues || [],
      securityStatus: skill.reviewNotes || "Skill interna auditada pelo kit."
    }
  };
}

export function installSkill(targetDir = process.cwd(), skillId = "", options = {}) {
  const isDryRun = !!options.dryRun;
  const force = !!options.force;

  const planRes = planInstallation(targetDir, skillId, options);
  if (planRes.status === "error") return planRes;
  const plan = planRes.data;

  const skillInfo = getSkillInfo(skillId);
  const skill = skillInfo.data;

  const { isGlobal, lockfile } = resolveScopeDirs(targetDir, options);

  // Localizar template ou cache
  let sourceDirOrFile = null;
  if (skill.source === "builtin") {
    const templateDir = path.join(kitRoot, "templates", "skills", skillId);
    const templateFile = path.join(kitRoot, "templates", "skills", `${skillId}.md`);
    if (fs.existsSync(path.join(templateDir, "SKILL.md"))) {
      sourceDirOrFile = templateDir;
    } else if (fs.existsSync(templateFile)) {
      sourceDirOrFile = templateFile;
    }
  } else {
    // community
    const cacheDir = path.join(kitRoot, "catalog", "community-cache", skillId);
    if (fs.existsSync(path.join(cacheDir, "SKILL.md")) || fs.existsSync(path.join(cacheDir, "README.md"))) {
      sourceDirOrFile = cacheDir;
    }
  }

  if (!sourceDirOrFile || !fs.existsSync(sourceDirOrFile)) {
    return {
      status: "error",
      data: null,
      errors: [`Conteúdo da skill '${skillId}' não disponível localmente no kit para instalação offline.`]
    };
  }

  const lock = readLockfile(lockfile);
  const existingLockEntry = lock.installed[skillId];

  if (plan.fileExists && !force) {
    if (existingLockEntry && existingLockEntry.hash) {
      const currentHash = computeFileHash(plan.targetMainFile);
      if (currentHash !== existingLockEntry.hash) {
        return {
          status: "error",
          data: null,
          errors: [`A skill '${skillId}' foi modificada localmente pelo usuário. Use --force para sobrescrever com a versão do catálogo.`]
        };
      }
    } else {
      return {
        status: "error",
        data: null,
        errors: [`Arquivo de skill já existe em '${plan.targetMainFile}'. Use --force para sobrescrever.`]
      };
    }
  }

  if (isDryRun) {
    return {
      status: "ok",
      data: {
        dryRun: true,
        skillId,
        action: plan.fileExists ? "overwrite" : "create",
        scope: plan.scope,
        targetPath: plan.targetMainFile,
        type: skill.type,
        reviewStatus: skill.reviewStatus,
        conflicts: plan.conflicts
      },
      warnings: ["Operação em modo --dry-run: nenhuma alteração gravada."],
      errors: []
    };
  }

  // Execução Real
  const isDirectory = fs.statSync(sourceDirOrFile).isDirectory();
  if (isDirectory) {
    fs.mkdirSync(plan.targetDirectory, { recursive: true });
    copyFolderRecursive(sourceDirOrFile, plan.targetDirectory);
  } else {
    fs.mkdirSync(plan.targetDirectory, { recursive: true });
    fs.copyFileSync(sourceDirOrFile, plan.targetMainFile);
  }

  // Atualizar lockfile
  const mainFileHash = computeFileHash(plan.targetMainFile);
  const relPath = path.isAbsolute(targetDir) && !isGlobal
    ? path.relative(targetDir, plan.targetMainFile)
    : plan.targetMainFile;

  lock.installed[skillId] = {
    name: skill.name,
    type: skill.type,
    source: skill.source,
    reviewStatus: skill.reviewStatus,
    version: skill.revision || "1.4.0",
    repository: skill.repository,
    scope: plan.scope,
    path: relPath,
    hash: mainFileHash,
    installedAt: new Date().toISOString()
  };

  writeLockfile(lockfile, lock);

  return {
    status: "ok",
    data: {
      skillId,
      installedPath: relPath,
      scope: plan.scope,
      type: skill.type,
      source: skill.source,
      reviewStatus: skill.reviewStatus,
      version: lock.installed[skillId].version,
      conflicts: plan.conflicts
    },
    warnings: [],
    errors: []
  };
}

export function removeSkill(targetDir = process.cwd(), skillId = "", options = {}) {
  const isDryRun = !!options.dryRun;
  const force = !!options.force;

  if (!skillId || !ID_REGEX.test(skillId)) {
    return {
      status: "error",
      data: null,
      errors: [`ID de skill inválido: '${skillId}'.`]
    };
  }

  const { isGlobal, skillsDir, integrationsDir, lockfile } = resolveScopeDirs(targetDir, options);
  const lock = readLockfile(lockfile);
  const entry = lock.installed[skillId];

  const skillFolder = path.join(skillsDir, skillId);
  const integrationFolder = path.join(integrationsDir, skillId);
  const singleFile = path.join(skillsDir, `${skillId}.md`);

  const hasSkillFolder = fs.existsSync(skillFolder);
  const hasIntegrationFolder = fs.existsSync(integrationFolder);
  const hasSingleFile = fs.existsSync(singleFile);

  if (!hasSkillFolder && !hasIntegrationFolder && !hasSingleFile && !entry) {
    return {
      status: "error",
      data: null,
      errors: [`Skill '${skillId}' não está instalada no escopo especificado (${isGlobal ? "global" : "project"}).`]
    };
  }

  // Proteção se não estiver no lockfile
  if (!entry && !force) {
    return {
      status: "error",
      data: null,
      errors: [`Skill '${skillId}' não é gerenciada pelo starter kit neste escopo. Use --force para remover manualmente.`]
    };
  }

  // Proteção contra exclusão de alterações locais não confirmadas
  if (entry && entry.hash) {
    const checkFile = hasSkillFolder
      ? path.join(skillFolder, "SKILL.md")
      : (hasIntegrationFolder ? path.join(integrationFolder, "README.md") : singleFile);
    if (fs.existsSync(checkFile)) {
      const currentHash = computeFileHash(checkFile);
      if (currentHash !== entry.hash && !force) {
        return {
          status: "error",
          data: null,
          errors: [`A skill '${skillId}' contém alterações locais não versionadas. Use --force para confirmar a remoção.`]
        };
      }
    }
  }

  if (isDryRun) {
    return {
      status: "ok",
      data: {
        dryRun: true,
        skillId,
        action: "remove",
        scope: isGlobal ? "global" : "project"
      },
      warnings: ["Operação em modo --dry-run: nenhum arquivo foi excluído."],
      errors: []
    };
  }

  if (hasSkillFolder) fs.rmSync(skillFolder, { recursive: true, force: true });
  if (hasIntegrationFolder) fs.rmSync(integrationFolder, { recursive: true, force: true });
  if (hasSingleFile) fs.rmSync(singleFile, { force: true });

  if (entry) {
    delete lock.installed[skillId];
    writeLockfile(lockfile, lock);
  }

  return {
    status: "ok",
    data: {
      skillId,
      removed: true,
      scope: isGlobal ? "global" : "project"
    },
    warnings: [],
    errors: []
  };
}

export function updateSkill(targetDir = process.cwd(), skillId = "", options = {}) {
  return installSkill(targetDir, skillId, options);
}

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
