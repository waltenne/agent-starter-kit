import { test } from "node:test";
import assert from "node:assert";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { setupWorkflow } from "../src/installer.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const kitRoot = path.resolve(__dirname, "../..");

test("setupWorkflow with --dry-run does not write any file", () => {
  const tempDir = path.join(kitRoot, "scratch-dry-run-test");
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    const result = setupWorkflow(tempDir, { dryRun: true });
    assert.strictEqual(result.status, "ok");
    assert.strictEqual(result.data.dryRun, true);
    assert.strictEqual(fs.existsSync(path.join(tempDir, ".agents")), false);
    assert.strictEqual(fs.existsSync(path.join(tempDir, "AGENTS.md")), false);
    assert.strictEqual(fs.existsSync(path.join(tempDir, "tools")), false);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("setupWorkflow is idempotent across repeated executions", () => {
  const tempDir = path.join(kitRoot, "scratch-idempotent-test");
  try {
    fs.mkdirSync(tempDir, { recursive: true });

    // Primeira execução
    const res1 = setupWorkflow(tempDir);
    assert.strictEqual(res1.status, "ok");
    const agentsMdContent1 = fs.readFileSync(path.join(tempDir, "AGENTS.md"), "utf-8");

    // Segunda execução
    const res2 = setupWorkflow(tempDir);
    assert.strictEqual(res2.status, "ok");
    const agentsMdContent2 = fs.readFileSync(path.join(tempDir, "AGENTS.md"), "utf-8");

    // Não deve duplicar seções no AGENTS.md
    assert.strictEqual(agentsMdContent1, agentsMdContent2);

    // Deve pular subagentes e skills já instalados se não forçado
    assert.ok(res2.data.skippedSubagents.length > 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("setupWorkflow preserves user-customized skill without --force", () => {
  const tempDir = path.join(kitRoot, "scratch-customization-test");
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    setupWorkflow(tempDir);

    // Usuário customiza uma skill
    const skillPath = path.join(tempDir, ".agents", "skills", "code-search", "SKILL.md");
    const legacyPath = path.join(tempDir, ".agents", "skills", "code-search.md");
    const targetFile = fs.existsSync(skillPath) ? skillPath : legacyPath;

    fs.writeFileSync(targetFile, "# Custom User Code Search\nDo not overwrite!", "utf-8");

    // Reexecuta setup sem --force
    const res2 = setupWorkflow(tempDir, { force: false });
    assert.strictEqual(res2.status, "ok");

    // Verifica que o arquivo customizado pelo usuário foi 100% preservado
    const afterContent = fs.readFileSync(targetFile, "utf-8");
    assert.ok(afterContent.includes("# Custom User Code Search"));

    // Com --force, atualiza
    const res3 = setupWorkflow(tempDir, { force: true });
    assert.strictEqual(res3.status, "ok");
    const forcedContent = fs.readFileSync(targetFile, "utf-8");
    assert.ok(!forcedContent.includes("# Custom User Code Search"));
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

