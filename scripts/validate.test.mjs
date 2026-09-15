import { test } from "node:test";
import assert from "node:assert/strict";
import {
  checkRelativeLinks,
  checkBlueprintPlaceholders,
  checkBlueprintSkills,
  checkSecrets
} from "./validate.mjs";

test("detects broken relative link", () => {
  const content = "[Broken Link](./non-existent-file-xyz.md)";
  const errors = checkRelativeLinks(content, "/fake/path/README.md", "/fake");
  assert.equal(errors.length, 1);
  assert.match(errors[0], /Broken relative link/);
});

test("detects residual placeholder in blueprint", () => {
  const content = "# Blueprint\n\n- Skill: <SKILL_NAME>";
  const errors = checkBlueprintPlaceholders(content, "test-bp.md");
  assert.equal(errors.length, 1);
  assert.match(errors[0], /Residual placeholder/);
});

test("detects blueprint with fewer than 3 skills", () => {
  const content = `## Skills candidatas

| Skill | Gatilho |
|---|---|
| \`skill-one\` | Trigger 1 |
| \`skill-two\` | Trigger 2 |

## Subagentes candidatos`;
  const errors = checkBlueprintSkills(content, "test-bp.md");
  assert.equal(errors.length, 1);
  assert.match(errors[0], /fewer than 3 named skills/);
});

test("detects planted secret pattern", () => {
  const content = "const token = 'ghp_123456789012345678901234567890123456';";
  const errors = checkSecrets(content, "test.md", "/fake");
  assert.equal(errors.length, 1);
  assert.match(errors[0], /Possible secret found/);
});
