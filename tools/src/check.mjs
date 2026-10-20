import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function runCheck(targetDir = process.cwd(), checkType = "all", options = {}) {
  const dir = path.resolve(targetDir);
  const pkgPath = path.join(dir, "package.json");
  const cargoPath = path.join(dir, "Cargo.toml");

  let commandToRun = null;
  let runnerType = "custom";

  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (checkType === "test") {
        if (pkg.scripts && pkg.scripts.test) {
          commandToRun = "npm test";
          runnerType = "npm";
        }
      } else if (checkType === "lint") {
        if (pkg.scripts && (pkg.scripts.lint || pkg.scripts.check)) {
          commandToRun = pkg.scripts.lint ? "npm run lint" : "npm run check";
          runnerType = "npm";
        }
      } else {
        // all
        if (pkg.scripts && pkg.scripts.test) {
          commandToRun = "npm test";
          runnerType = "npm";
        }
      }
    } catch {}
  } else if (fs.existsSync(cargoPath)) {
    if (checkType === "test" || checkType === "all") {
      commandToRun = "cargo test";
      runnerType = "cargo";
    }
  }

  if (!commandToRun) {
    return {
      status: "ok",
      data: {
        executed: false,
        message: `No ${checkType} script configured in workspace`
      },
      warnings: [`No ${checkType} runner detected`],
      errors: []
    };
  }

  const startTime = Date.now();
  let rawOutput = "";
  let exitCode = 0;

  try {
    rawOutput = execSync(commandToRun, {
      cwd: dir,
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 10 * 1024 * 1024
    }).toString();
  } catch (err) {
    exitCode = err.status || 1;
    rawOutput = (err.stdout ? err.stdout.toString() : "") + "\n" + (err.stderr ? err.stderr.toString() : "");
  }

  const durationMs = Date.now() - startTime;
  const parsed = parseTestOutput(rawOutput, exitCode);

  return {
    status: exitCode === 0 ? "ok" : "fail",
    data: {
      checkType,
      command: commandToRun,
      exitCode,
      durationMs,
      passed: parsed.passed,
      failed: parsed.failed,
      total: parsed.total,
      failures: parsed.failures
    },
    warnings: [],
    errors: exitCode !== 0 ? [`Check failed with exit code ${exitCode}`] : []
  };
}

function parseTestOutput(output, exitCode) {
  let passed = 0;
  let failed = 0;
  let total = 0;
  const failures = [];

  const lines = output.split("\n");
  let currentFailure = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Node:test format (✔ / ✖)
    if (/✔\s+(.+)/.test(line)) {
      passed++;
    } else if (/✖\s+(.+)/.test(line)) {
      failed++;
      const match = line.match(/✖\s+(.+)/);
      currentFailure = {
        name: match ? match[1].trim() : "Unknown test",
        details: []
      };
      failures.push(currentFailure);
    } else if (currentFailure && line.trim().startsWith("Error:") || line.trim().startsWith("AssertionError")) {
      currentFailure.details.push(line.trim());
    }

    // Cargo test format
    const cargoPassMatch = line.match(/test result: ok\. (\d+) passed; (\d+) failed/);
    if (cargoPassMatch) {
      passed = parseInt(cargoPassMatch[1], 10);
      failed = parseInt(cargoPassMatch[2], 10);
      total = passed + failed;
    }
  }

  if (exitCode !== 0 && failed === 0) {
    failed = 1;
    // Captura as últimas 15 linhas de erro relevante
    const tailErrors = lines.filter(l => l.trim()).slice(-15);
    failures.push({
      name: "Execution Error",
      details: tailErrors
    });
  }

  total = total || (passed + failed);

  return { passed, failed, total, failures };
}

