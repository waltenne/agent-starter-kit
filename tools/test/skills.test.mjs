import { test } from "node:test";
import assert from "node:assert";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { loadCatalog, getSkillInfo } from "../src/skills/catalog.mjs";
import { listInstalledSkills, installSkill, removeSkill } from "../src/skills/manager.mjs";
import { recommendSkills } from "../src/skills/recommend.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kitRoot = path.resolve(__dirname, "../..");

test("catalog load returns valid internal and community skills", () => {
  const cat = loadCatalog();
  assert.strictEqual(cat.status, "ok");
  assert.ok(cat.data.total >= 8);
  assert.ok(cat.data.internalCount >= 6);
  assert.ok(cat.data.communityCount >= 2);

  const humanizer = cat.data.skills.find(s => s.id === "humanizer");
  assert.ok(humanizer);
  assert.strictEqual(humanizer.reviewStatus, "COMMUNITY_REVIEWED");
  assert.strictEqual(humanizer.license, "MIT");

  const aiMemory = cat.data.skills.find(s => s.id === "ai-memory");
  assert.ok(aiMemory);
  assert.ok(aiMemory.type === "integration" || aiMemory.type === "tool_integration");
});

test("getSkillInfo returns detail or error on invalid ID", () => {
  const valid = getSkillInfo("code-search");
  assert.strictEqual(valid.status, "ok");
  assert.strictEqual(valid.data.id, "code-search");

  const invalid = getSkillInfo("non-existent-skill-xyz");
  assert.strictEqual(invalid.status, "error");
});

test("installSkill rejects path traversal and malicious IDs", () => {
  const tempDir = path.join(kitRoot, "scratch-security-test");
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    const res1 = installSkill(tempDir, "../../../etc/passwd");
    assert.strictEqual(res1.status, "error");

    const res2 = installSkill(tempDir, "skill/with/slash");
    assert.strictEqual(res2.status, "error");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("installSkill with dryRun does not write files", () => {
  const tempDir = path.join(kitRoot, "scratch-skill-dryrun");
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    const res = installSkill(tempDir, "humanizer", { dryRun: true });
    assert.strictEqual(res.status, "ok");
    assert.strictEqual(res.data.dryRun, true);
    assert.strictEqual(fs.existsSync(path.join(tempDir, ".agents")), false);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("installSkill and removeSkill lifecycle with lockfile tracking", () => {
  const tempDir = path.join(kitRoot, "scratch-skill-lifecycle");
  try {
    fs.mkdirSync(tempDir, { recursive: true });

    // 1. Instalar community skill 'humanizer'
    const installRes = installSkill(tempDir, "humanizer");
    assert.strictEqual(installRes.status, "ok");

    // Verificar padrão Agent Skills: pasta com SKILL.md
    const skillPath = path.join(tempDir, ".agents", "skills", "humanizer", "SKILL.md");
    assert.ok(fs.existsSync(skillPath));

    // Verificar Lockfile
    const lockfile = JSON.parse(fs.readFileSync(path.join(tempDir, ".agents", ".skills-lock.json"), "utf-8"));
    assert.ok(lockfile.installed.humanizer);
    assert.strictEqual(lockfile.installed.humanizer.source, "community");
    assert.ok(lockfile.installed.humanizer.hash);

    // Listar instaladas
    const listRes = listInstalledSkills(tempDir);
    assert.strictEqual(listRes.data.total, 1);
    assert.strictEqual(listRes.data.installed[0].id, "humanizer");
    assert.strictEqual(listRes.data.installed[0].modifiedLocally, false);

    // Modificar localmente e tentar remover sem --force (deve bloquear)
    fs.appendFileSync(skillPath, "\n# Modified by user");
    const removeBlocked = removeSkill(tempDir, "humanizer", { force: false });
    assert.strictEqual(removeBlocked.status, "error");
    assert.ok(removeBlocked.errors[0].includes("alterações locais"));

    // Remover com --force
    const removeRes = removeSkill(tempDir, "humanizer", { force: true });
    assert.strictEqual(removeRes.status, "ok");
    assert.strictEqual(fs.existsSync(skillPath), false);

    // Lockfile atualizado
    const updatedLock = JSON.parse(fs.readFileSync(path.join(tempDir, ".agents", ".skills-lock.json"), "utf-8"));
    assert.strictEqual(updatedLock.installed.humanizer, undefined);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("recommendSkills suggests contextual skills without duplicate recommendations", () => {
  const recs = recommendSkills(kitRoot);
  assert.strictEqual(recs.status, "ok");
  assert.ok(recs.data.totalRecommendations > 0);
  assert.ok(recs.data.builtin.some(s => s.id === "code-search"));
  assert.ok(recs.data.community.some(s => s.id === "humanizer"));
});

