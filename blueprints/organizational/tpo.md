# Technical Product Owner Blueprint

## Purpose

Use this blueprint when the primary responsibility is technical product ownership: translating product intent into an actionable backlog while managing technical trade-offs, dependencies, and delivery readiness. Apply [`../../rules.md`](../../rules.md) for all general rules.

## User profile and common tasks

This blueprint fits a Technical Product Owner or similar role operating between product, engineering, QA, operations, and stakeholders. Common tasks include backlog refinement, acceptance criteria, technical discovery, dependency mapping, prioritization support, release readiness, trade-off documentation, and clarification of expected behavior.

## Tools and technologies

Possible tools include a backlog, documentation system, architecture records, API or schema references, test reports, release notes, dashboards, and planning tools. Treat all tools as examples and use them only when confirmed by the user or present in the workspace.

## Suggested skills

Consider a skill for a recurring workflow such as story-quality review, acceptance-criteria review, dependency mapping, release-readiness review, or technical decision summarization. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create a skill that silently prioritizes work, approves risk, or duplicates product or engineering authority.

## Suggested subagents

When justified, consider narrowly scoped agents for backlog consistency, API-contract impact analysis, dependency review, acceptance-test drafting, or release-evidence collection. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md). Keep ownership and approval with the responsible human role.

## Recommended workspace structure

Follow existing conventions. A possible separation is:

```text
workspace/
├── product context/
├── backlog/
├── acceptance criteria/
├── technical decisions/
├── dependencies/
└── release readiness/
```

Link requirements to evidence, decisions, implementation scope, and validation. Do not rewrite authoritative product or technical records without authorization.

## Validation practices

- Confirm each item has a clear user or system outcome, boundaries, acceptance criteria, dependencies, and non-functional considerations.
- Check that technical proposals preserve contracts, compatibility, security, accessibility, operability, and rollback needs.
- Validate readiness against implementation, QA, documentation, support, and operational evidence when applicable.
- Record unresolved assumptions, trade-offs, decision owners, and approval status.
- Keep estimates, risks, and delivery forecasts explicitly labeled as uncertain when they are not confirmed.

## Domain-specific risks

Risks include accidental technical commitments, hidden dependencies, scope creep, vague acceptance criteria, broken compatibility, unowned operational work, and confusing recommendation with approval.

## Domain-specific security rules

Do not bypass security review, architectural governance, permissions, or release approval to meet a delivery goal. Keep private roadmap, customer, and system details within authorized paths. Never place credentials or sensitive implementation details in backlog examples. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- Which product outcome, technical area, backlog, and release are in scope?
- What contracts, dependencies, constraints, acceptance criteria, and non-functional requirements are confirmed?
- Who owns product prioritization, technical approval, QA approval, and release approval?
- Is the requested output a draft, recommendation, refined item, or approved commitment?

## When not to use this blueprint

Do not use it when the primary work is broad product discovery, quality assurance, Scrum facilitation, people management, or implementation. Use [`pm.md`](pm.md) for product strategy and discovery, or [`../technical/web-dev.md`](../technical/web-dev.md) for web implementation.
