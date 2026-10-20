# Contributing

Thank you for helping improve this Markdown-based starter kit. Contributions must remain generic, modular, auditable, and useful across workspaces. Read [`rules.md`](rules.md) before changing rules, templates, or validation behavior.

## Before proposing a change

1. Inspect the current files, repository status, and relevant documentation.
2. Identify whether the change belongs in the central rules, wizard, a blueprint, a template, an example, or validation.
3. Preserve unrelated local changes and avoid adding executable behavior unless the scope is explicitly expanded.
4. Keep examples free of real names, private URLs, credentials, customer data, and business-specific rules.

## Blueprints

Add a blueprint only for a recurring, bounded domain that cannot be covered by an existing primary or secondary blueprint. Place it in the appropriate category:

- `blueprints/technical/` for engineering, data, and operations;
- `blueprints/content/` for editorial and media work;
- `blueprints/organizational/` for product, quality, facilitation, and management work.

Every blueprint must explain purpose, user profile, possible tools, suggested skills, workspace structure, validation, domain risks, domain security rules, additional questions, when not to use it, and a reference to [`rules.md`](rules.md). Do not define domain-specific agents; explain when a generic worker may help only if useful. Tools are examples and must not be presented as mandatory.

Use one primary blueprint per deliverable. Secondary blueprints are allowed only when they directly support that deliverable. Avoid overlapping responsibilities and do not load every blueprint by default.

## Skills and subagents

Use [`templates/skill-template.md`](templates/skill-template.md) for a recurring, multi-step task with one responsibility and predictable output. Use [`templates/subagent-template.md`](templates/subagent-template.md) only for a bounded worker task when isolation or parallelism has a clear benefit. Use [`templates/advisor-template.md`](templates/advisor-template.md) only for high-impact decisions or unresolved risk. Do not create roles for one-off work or one per framework, and never duplicate or weaken central rules.

Generated skills and worker/advisor role files must replace `<central-rules-file>` with the configured workspace path. They must not retain kit-relative links that break after copying.

## Community skills and toolkits catalog

To propose adding a community skill, toolkit, or external integration to the kit:
1. Verify the component follows the open [Agent Skills Specification](https://agentskills.io/) or represents a verified integration.
2. Add the entry to [`catalog/community.json`](catalog/community.json) ensuring full compliance with [`catalog/schema.json`](catalog/schema.json).
3. Provide verified metadata: official repository, author/maintainer, license, revision/tag, description, categories, and potential conflicts.
4. Do not include executable installer scripts or remote download commands; provide cached templates under `catalog/community-cache/<id>/` for offline reliability.
5. All pull requests are checked by automated schema and unit tests (`npm test`).

## Naming and language

- Use lowercase kebab-case for filenames, except conventional files such as `README.md`, `AGENTS.md`, and `CHANGELOG.md`.
- Use clear, stable names that describe the domain or responsibility.
- Keep the kit's documentation in English unless a file explicitly defines another artifact language.
- Do not use a role acronym without defining it in the document.

## Validation

Run the validation script corresponding to your platform before requesting review:

- **Linux / macOS**: `bash scripts/validate.sh`
- **Windows (PowerShell)**: `.\scripts\validate.ps1`
- **Windows (CMD)**: `scripts\validate.cmd`

The validation must pass before requesting review. Also manually inspect the complete diff, links, duplication, security boundaries, and whether the README and wizard indexes match the files on disk.

## Pull requests

Explain the problem, the files changed, compatibility impact, validation performed, and any manual checks still pending. Do not include secrets or generated personal data. Do not change the license, publish content, or introduce a breaking template contract without clearly documenting the impact.
