import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function detectProject(targetDir = process.cwd()) {
  const dir = path.resolve(targetDir);
  const result = {
    path: dir,
    name: path.basename(dir),
    runtimes: [],
    languages: [],
    frameworks: [],
    packageManager: null,
    testFramework: null,
    lintFramework: null,
    database: null,
    desktop: null,
    git: null,
    recommendedBlueprint: "technical/web-dev",
    recommendedSkills: ["code-search", "git-workflow"],
    recommendedSubagents: ["worker", "implementer", "advisor"],
    importantPaths: []
  };

  // 1. Git inspection
  const gitDir = path.join(dir, ".git");
  if (fs.existsSync(gitDir)) {
    try {
      const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: dir, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
      const lastCommit = execSync("git log -1 --pretty=format:'%h - %s (%cr)'", { cwd: dir, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
      const statusOutput = execSync("git status --porcelain", { cwd: dir, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
      const changedFiles = statusOutput ? statusOutput.split("\n").length : 0;
      result.git = {
        initialized: true,
        branch,
        lastCommit,
        dirty: changedFiles > 0,
        changedFilesCount: changedFiles
      };
    } catch {
      result.git = { initialized: true, branch: "unknown", dirty: false };
    }
  } else {
    result.git = { initialized: false };
  }

  // 2. Node / JS / TS inspection
  const pkgPath = path.join(dir, "package.json");
  if (fs.existsSync(pkgPath)) {
    result.runtimes.push("node");
    result.packageManager = "npm";
    if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) result.packageManager = "pnpm";
    else if (fs.existsSync(path.join(dir, "yarn.lock"))) result.packageManager = "yarn";
    else if (fs.existsSync(path.join(dir, "bun.lockb"))) result.packageManager = "bun";

    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.name) result.name = pkg.name;

      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {})
      };

      if (fs.existsSync(path.join(dir, "tsconfig.json")) || allDeps.typescript) {
        result.languages.push("typescript");
      } else {
        result.languages.push("javascript");
      }

      if (allDeps.electron) {
        result.desktop = "electron";
        result.frameworks.push("electron");
      }
      if (allDeps.react) result.frameworks.push("react");
      if (allDeps.vue) result.frameworks.push("vue");
      if (allDeps.next) result.frameworks.push("next");
      if (allDeps.express || allDeps.fastify || allDeps.koa || allDeps.hono) {
        result.frameworks.push("api-backend");
      }

      // Database
      if (allDeps["better-sqlite3"] || allDeps.sqlite3 || allDeps.sqlite) {
        result.database = "sqlite";
      } else if (allDeps.pg || allDeps["pg-promise"] || allDeps.typeorm || allDeps.prisma) {
        result.database = "relational-db";
      }

      // Tests
      if (allDeps.vitest) result.testFramework = "vitest";
      else if (allDeps.jest) result.testFramework = "jest";
      else if (allDeps.mocha) result.testFramework = "mocha";
      else if (pkg.scripts && pkg.scripts.test) {
        result.testFramework = pkg.scripts.test.includes("node --test") ? "node:test" : "npm-test";
      }

      // Linters
      if (allDeps.eslint) result.lintFramework = "eslint";
      else if (allDeps["@biomejs/biome"]) result.lintFramework = "biome";

    } catch {
      // Ignorar erro de parse em package.json malformatado
    }
  }

  // 3. Rust inspection
  const cargoPath = path.join(dir, "Cargo.toml");
  if (fs.existsSync(cargoPath)) {
    result.runtimes.push("rust");
    result.languages.push("rust");
    if (!result.packageManager) result.packageManager = "cargo";
    if (!result.testFramework) result.testFramework = "cargo test";

    try {
      const cargoContent = fs.readFileSync(cargoPath, "utf-8");
      if (cargoContent.includes("rusqlite")) result.database = "sqlite";
      if (cargoContent.includes("tauri")) result.desktop = "tauri";
    } catch {}
  }

  // 4. Python inspection
  if (fs.existsSync(path.join(dir, "pyproject.toml")) || fs.existsSync(path.join(dir, "requirements.txt"))) {
    result.runtimes.push("python");
    result.languages.push("python");
    if (!result.packageManager) result.packageManager = "pip";
    result.testFramework = result.testFramework || "pytest";
  }

  // 5. Database file check
  try {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.endsWith(".sqlite") || f.endsWith(".db") || f.endsWith(".sqlite3")) {
        result.database = "sqlite";
        result.importantPaths.push(f);
      }
    }
  } catch {}

  // 6. Important paths
  for (const p of ["src", "lib", "tests", "docs", "scripts", "public", ".agents"]) {
    if (fs.existsSync(path.join(dir, p))) {
      result.importantPaths.push(p);
    }
  }

  // 7. Deduplicate languages
  result.languages = [...new Set(result.languages)];
  result.runtimes = [...new Set(result.runtimes)];
  result.frameworks = [...new Set(result.frameworks)];

  // 8. Recomendar Blueprint e Skills
  if (result.frameworks.includes("electron") || result.desktop === "tauri") {
    result.recommendedBlueprint = "technical/web-dev";
    result.recommendedSkills.push("performance-benchmark");
  } else if (result.runtimes.includes("python") && (fs.existsSync(path.join(dir, "notebooks")) || result.frameworks.includes("pandas"))) {
    result.recommendedBlueprint = "technical/data-science";
  } else if (fs.existsSync(path.join(dir, "Dockerfile")) || fs.existsSync(path.join(dir, ".github/workflows"))) {
    if (result.languages.length === 0) {
      result.recommendedBlueprint = "technical/devops";
    }
  }

  if (result.testFramework) {
    result.recommendedSkills.push("triage-test-failure");
  }

  if (result.frameworks.includes("api-backend") || result.recommendedBlueprint === "technical/web-dev") {
    result.recommendedSkills.push("review-api-contract");
  }

  if (result.database === "sqlite") {
    result.recommendedSkills.push("db-health");
  }

  result.recommendedSkills = [...new Set(result.recommendedSkills)];

  return result;
}

