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

Every blueprint must explain purpose, user profile, possible tools, suggested skills and subagents, workspace structure, validation, domain risks, domain security rules, additional questions, when not to use it, and a reference to [`rules.md`](rules.md). Tools are examples and must not be presented as mandatory.

Use one primary blueprint per deliverable. Secondary blueprints are allowed only when they directly support that deliverable. Avoid overlapping responsibilities and do not load every blueprint by default.

## Skills and subagents

Use [`templates/skill-template.md`](templates/skill-template.md) for a recurring, multi-step task with one responsibility and predictable output. Use [`templates/subagent-template.md`](templates/subagent-template.md) only when isolation, parallelism, or specialization provides a clear benefit. Do not create skills or subagents for one-off work, and never duplicate or weaken central rules.

Generated skills and subagents must replace `<central-rules-file>` with the configured workspace path. They must not retain kit-relative links that break after copying.

## Naming and language

- Use lowercase kebab-case for filenames, except conventional files such as `README.md`, `AGENTS.md`, and `CHANGELOG.md`.
- Use clear, stable names that describe the domain or responsibility.
- Keep the kit's documentation in English unless a file explicitly defines another artifact language.
- Do not use a role acronym without defining it in the document.

## Validation

Run:

```sh
bash scripts/validate.sh
```

The validation must pass before requesting review. Also manually inspect the complete diff, links, duplication, security boundaries, and whether the README and wizard indexes match the files on disk.

## Pull requests

Explain the problem, the files changed, compatibility impact, validation performed, and any manual checks still pending. Do not include secrets or generated personal data. Do not change the license, publish content, or introduce a breaking template contract without clearly documenting the impact.
