import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { detectProject } from "./detector.mjs";

export function getProjectInfo(targetDir = process.cwd()) {
  const detected = detectProject(targetDir);
  return {
    status: "ok",
    data: {
      name: detected.name,
      path: detected.path,
      runtimes: detected.runtimes,
      languages: detected.languages,
      frameworks: detected.frameworks,
      packageManager: detected.packageManager,
      testFramework: detected.testFramework,
      lintFramework: detected.lintFramework,
      database: detected.database,
      desktop: detected.desktop,
      recommendedBlueprint: detected.recommendedBlueprint,
      recommendedSkills: detected.recommendedSkills,
      recommendedSubagents: detected.recommendedSubagents,
      importantPaths: detected.importantPaths
    },
    warnings: [],
    errors: []
  };
}

export function getProjectStatus(targetDir = process.cwd()) {
  const dir = path.resolve(targetDir);
  const data = {
    git: {
      initialized: false,
      branch: "unknown",
      clean: true,
      modified: [],
      untracked: [],
      recentCommits: []
    },
    checks: {
      configuredTests: false,
      configuredLint: false
    }
  };

  const gitDir = path.join(dir, ".git");
  if (fs.existsSync(gitDir)) {
    try {
      const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: dir, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
      const statusRaw = execSync("git status --porcelain", { cwd: dir, stdio: ["ignore", "pipe", "ignore"] }).toString();
      const commitsRaw = execSync("git log -5 --oneline", { cwd: dir, stdio: ["ignore", "pipe", "ignore"] }).toString();

      const modified = [];
      const untracked = [];

      for (const line of statusRaw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const code = trimmed.substring(0, 2);
        const file = trimmed.substring(3).trim();
        if (code === "??" || code === "??") {
          untracked.push(file);
        } else {
          modified.push(file);
        }
      }

      data.git = {
        initialized: true,
        branch,
        clean: modified.length === 0 && untracked.length === 0,
        modifiedCount: modified.length,
        untrackedCount: untracked.length,
        modified: modified.slice(0, 25),
        untracked: untracked.slice(0, 25),
        recentCommits: commitsRaw.split("\n").filter(Boolean).slice(0, 5)
      };
    } catch (e) {
      data.git.error = e.message;
    }
  }

  const pkgPath = path.join(dir, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      data.checks.configuredTests = !!(pkg.scripts && pkg.scripts.test);
      data.checks.configuredLint = !!(pkg.scripts && (pkg.scripts.lint || pkg.scripts.check));
    } catch {}
  }

  return {
    status: "ok",
    data,
    warnings: [],
    errors: []
  };
}

