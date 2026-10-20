import { test } from "node:test";
import assert from "node:assert";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { detectProject } from "../src/detector.mjs";
import { getProjectInfo, getProjectStatus } from "../src/project.mjs";
import { findText, findFile, findSymbol } from "../src/find.mjs";
import { sanitizeText } from "../src/logs.mjs";
import { setupWorkflow } from "../src/installer.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kitRoot = path.resolve(__dirname, "../..");

test("detectProject identifies node and test framework in kitRoot", () => {
  const result = detectProject(kitRoot);
  assert.strictEqual(result.name, "agent-starter-kit");
  assert.ok(result.runtimes.includes("node"));
  assert.ok(result.recommendedSkills.includes("code-search"));
  assert.ok(result.recommendedSkills.includes("triage-test-failure"));
  assert.ok(result.recommendedSubagents.includes("worker"));
});

test("getProjectInfo returns structured metadata", () => {
  const info = getProjectInfo(kitRoot);
  assert.strictEqual(info.status, "ok");
  assert.strictEqual(info.data.name, "agent-starter-kit");
});

test("getProjectStatus returns git information", () => {
  const status = getProjectStatus(kitRoot);
  assert.strictEqual(status.status, "ok");
  assert.ok(status.data.git.initialized);
  assert.ok(status.data.git.branch);
});

test("findSymbol locates function declaration", () => {
  const res = findSymbol(kitRoot, "runValidation");
  assert.strictEqual(res.status, "ok");
  assert.ok(res.data.matches.length > 0);
  assert.ok(res.data.matches[0].file.includes("validate.mjs"));
});

test("sanitizeText masks sensitive patterns and secrets", () => {
  const input = "AWS key is AKIA1234567890ABCDEF and github token is ghp_123456789012345678901234567890 and password = 'mySecretPassword'";
  const sanitized = sanitizeText(input);
  assert.ok(!sanitized.includes("AKIA1234567890ABCDEF"));
  assert.ok(!sanitized.includes("ghp_123456789012345678901234567890"));
  assert.ok(!sanitized.includes("mySecretPassword"));
  assert.ok(sanitized.includes("[REDACTED_AWS_KEY]"));
  assert.ok(sanitized.includes("[REDACTED_GITHUB_TOKEN]"));
});

test("setupWorkflow creates .agents structure with recommended subagents and skills", () => {
  const tempDir = path.join(kitRoot, "scratch-test-setup");
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    const result = setupWorkflow(tempDir);
    assert.strictEqual(result.status, "ok");
    const hasFolderSkill = fs.existsSync(path.join(tempDir, ".agents", "skills", "code-search", "SKILL.md"));
    const hasLegacySkill = fs.existsSync(path.join(tempDir, ".agents", "skills", "code-search.md"));
    assert.ok(hasFolderSkill || hasLegacySkill);
    assert.ok(fs.existsSync(path.join(tempDir, ".agents", "subagents", "worker.md")));
    assert.ok(fs.existsSync(path.join(tempDir, "AGENTS.md")));
    assert.ok(fs.existsSync(path.join(tempDir, "tools", "agent-tool")));
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

