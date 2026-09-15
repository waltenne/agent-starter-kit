# Web Development Blueprint

## Purpose

Use this blueprint when the primary deliverable is a website, web application, web service, or API. Apply [`../../rules.md`](../../rules.md) for all general safety, autonomy, evidence, memory, skill, and subagent rules.

## User profile and common tasks

This blueprint fits a user who designs, builds, tests, documents, or operates web-facing software. Common tasks may include frontend work, backend work, API design, integration, debugging, documentation, dependency review, container work, and release preparation.

## Backend and full-stack pathways

Select the narrowest pathway that matches the user's main responsibility:

- **Frontend:** browser interfaces, interaction, accessibility, performance, and client-side state.
- **Backend:** APIs, domain logic, persistence, authentication and authorization, asynchronous work, integrations, observability, and server-side performance.
- **Full-stack:** vertical slices across frontend and backend, shared contracts, end-to-end behavior, data flow, deployment coordination, and cross-layer debugging.

Do not infer a pathway from a job title alone. Confirm which layers the user owns and whether the expected output is a client, service, API, shared contract, or complete feature.

## Tools and technologies

Possible tools include a frontend or backend framework, a programming language, an API client, a database, a queue, a cache, a test runner, a linter, a version-control system, containers, and a hosting platform. Treat every tool as optional and use it only when confirmed by the user or found in the repository.

## Suggested skills

Consider a skill for a recurring, bounded workflow such as API contract review, accessibility review, test triage, or release validation. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create a skill for a single feature, an unconfirmed stack, or work already covered by an existing skill.

## Suggested subagents

When there is a demonstrated benefit, consider narrowly scoped agents for frontend accessibility, backend/API contract analysis, persistence and performance review, full-stack integration diagnosis, test diagnosis, or dependency/security review. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md). Keep each agent's scope separate and preserve the central rules.

## Recommended workspace structure

Follow the existing repository structure. A possible separation is:

```text
project/
├── frontend/ or client code
├── backend/ or service code
├── shared contracts or schemas
├── tests/
├── documentation/
├── configuration/
└── scripts/
```

Use the repository's established names and do not reorganize files without authorization.

## Validation practices

- Run the repository's documented unit, integration, build, lint, type, and accessibility checks when applicable.
- For backend work, validate API contracts, authentication and authorization, input validation, persistence behavior, concurrency, timeouts, retries, and error paths—not only successful requests.
- For full-stack work, validate the complete user or API journey, client-server contract compatibility, loading and failure states, migrations when applicable, and observability across layers.
- Check keyboard access, focus behavior, semantics, responsive behavior, and reduced-motion behavior when UI changes.
- Review dependency changes and avoid exposing secrets in logs, client bundles, configuration, or examples.
- Validate containers and runtime health only when the repository defines a safe procedure and the user authorizes execution.

## Domain-specific risks

Pay particular attention to authentication and authorization failures, CSRF, XSS, injection, unsafe file handling, dependency vulnerabilities, secret exposure, insecure defaults, and accidental public deployment.

## Domain-specific security rules

Never assume that a client-side check replaces a server-side authorization rule. Do not alter infrastructure or publish externally without explicit authorization. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- What is the primary interface: browser, API, or both?
- Is the primary pathway frontend, backend, or full-stack, and which layers are actually in scope?
- Which language, framework, runtime, database, and deployment target are confirmed?
- What authentication, authorization, accessibility, compatibility, and performance requirements apply?
- Which contracts, persistence rules, integrations, and runtime environments must remain compatible?
- Which environments and external integrations are in scope?

## When not to use this blueprint

Do not use it when the main deliverable is data analysis, infrastructure operations, quality assurance, product management, Scrum facilitation, people management, or editorial content. If web technology is only a minor supporting tool, select the blueprint for the primary deliverable instead.
