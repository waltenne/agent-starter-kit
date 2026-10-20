import { test } from "node:test";
import assert from "node:assert";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { loadCatalog, getSkillInfo } from "../src/skills/catalog.mjs";
import { listInstalledSkills, installSkill, removeSkill } from "../src/skills/manager.mjs";
import { checkConflicts } from "../src/skills/conflicts.mjs";
import { recommendSkills, PROFILES } from "../src/skills/recommend.mjs";
import { runDoctor } from "../src/skills/doctor.mjs";
import { browseCatalog } from "../src/skills/browse.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kitRoot = path.resolve(__dirname, "../..");

test("catalog classifies skill, toolkit, and integration correctly", () => {
  const cat = loadCatalog();
  assert.strictEqual(cat.status, "ok");

  const humanizer = cat.data.skills.find(s => s.id === "humanizer");
  assert.strictEqual(humanizer.type, "skill");

  const superpowers = cat.data.skills.find(s => s.id === "superpowers");
  assert.strictEqual(superpowers.type, "toolkit");

  const aiMemory = cat.data.skills.find(s => s.id === "ai-memory");
  assert.strictEqual(aiMemory.type, "integration");

  const prismCoder = cat.data.skills.find(s => s.id === "prism-coder");
  assert.strictEqual(prismCoder.type, "integration");
});

test("checkConflicts identifies declared OVERLAP between toolkits and integrations", () => {
  const tempDir = path.join(kitRoot, "scratch-conflict-test");
  try {
    fs.mkdirSync(tempDir, { recursive: true });

    // Instalar superpowers
    installSkill(tempDir, "superpowers");

    // Checar conflito com upstack
    const conflictCheck = checkConflicts(tempDir, "upstack");
    assert.strictEqual(conflictCheck.status, "warning");
    assert.ok(conflictCheck.issues.some(i => i.type === "OVERLAP" && i.targetId === "superpowers"));

    // Checar conflito DUPLICATE com ele mesmo
    const duplicateCheck = checkConflicts(tempDir, "superpowers");
    assert.strictEqual(duplicateCheck.status, "warning");
    assert.ok(duplicateCheck.issues.some(i => i.type === "DUPLICATE"));
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("recommendSkills filters by profile", () => {
  assert.ok(PROFILES.DEVELOPER);
  assert.ok(PROFILES.DOCUMENTATION);
  assert.ok(PROFILES.AI_ENGINEERING);

  const devRecs = recommendSkills(kitRoot, { profile: "DEVELOPER" });
  assert.strictEqual(devRecs.status, "ok");
  assert.strictEqual(devRecs.data.activeProfile, "DEVELOPER");
  assert.ok(devRecs.data.community.some(s => s.id === "superpowers" || s.id === "archify"));

  const docRecs = recommendSkills(kitRoot, { profile: "DOCUMENTATION" });
  assert.ok(docRecs.data.community.some(s => s.id === "humanizer"));
});

test("browseCatalog returns categories and profiles summary", () => {
  const browse = browseCatalog();
  assert.strictEqual(browse.status, "ok");
  assert.ok(browse.data.totalCategories >= 7);
  assert.ok(browse.data.totalComponents >= 12);
  assert.ok(browse.data.categories.development);
  assert.ok(browse.data.categories.memory);
});

test("runDoctor diagnoses healthy workspace and reports missing files or conflicts", () => {
  const tempDir = path.join(kitRoot, "scratch-doctor-test");
  try {
    fs.mkdirSync(tempDir, { recursive: true });

    // 1. Instalar duas skills com sobreposição declarada
    installSkill(tempDir, "superpowers");
    installSkill(tempDir, "upstack", { force: true });

    // Rodar doctor
    const docRes = runDoctor(tempDir);
    assert.strictEqual(docRes.data.installedCount, 2);
    // Deve apontar sobreposição ativa
    assert.ok(docRes.data.issues.some(i => i.type === "active_overlap"));

    // Simular arquivo removido manualmente
    const spFile = path.join(tempDir, ".agents", "skills", "superpowers", "SKILL.md");
    if (fs.existsSync(spFile)) fs.rmSync(spFile);

    const docAfterMissing = runDoctor(tempDir);
    assert.ok(docAfterMissing.data.issues.some(i => i.type === "missing_file"));
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

