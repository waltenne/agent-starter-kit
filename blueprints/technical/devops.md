# DevOps Blueprint

## Purpose

Use this blueprint when the primary deliverable concerns software delivery, infrastructure, environments, operations, observability, reliability, or incident response. Apply [`../../rules.md`](../../rules.md) for all general rules.

## User profile and common tasks

This blueprint fits a user who maintains delivery pipelines, infrastructure definitions, environments, deployments, monitoring, reliability practices, or operational documentation. Common tasks may include CI/CD, infrastructure as code, container workflows, orchestration, configuration management, observability, incident analysis, rollback planning, and runbook maintenance.

## Tools and technologies

Possible tools include a CI/CD platform, infrastructure-as-code language, container runtime, orchestrator, cloud or hosting service, metrics and logs system, secret manager, and configuration tooling. Treat all tools as examples and use only confirmed or existing components.

## Suggested skills

Consider a skill for a recurring workflow such as pipeline review, deployment readiness, incident triage, configuration audit, or rollback verification. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create one for a one-time deployment or to automate an unapproved production change.

## Suggested subagents

When justified, consider narrowly scoped agents for pipeline analysis, observability review, incident evidence collection, or infrastructure plan review. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md). Keep production actions outside the subagent unless explicitly authorized.

## Recommended workspace structure

Follow the repository's existing conventions. A possible separation is:

```text
project/
├── application or service code
├── infrastructure/
├── pipelines/
├── configuration examples
├── runbooks/
└── observability/
```

Keep environment-specific values and secrets out of reusable documents. Do not reorganize deployment assets without authorization.

## Validation practices

- Validate configuration syntax, plans, dependency order, policy checks, and least-privilege access.
- Use dry runs, reviewable plans, staged environments, health checks, and documented rollback where available.
- Check pipeline failure paths, artifact provenance, deployment idempotence, and observability coverage.
- Inspect logs and readiness only through approved procedures; report commands and scope.
- Do not run infrastructure changes, migrations, or production operations without explicit authorization.

## Domain-specific risks

Risks include an unintended production change, privilege escalation, secret exposure, state-file loss, configuration drift, unreviewed dependencies, missing rollback, and insufficient health or observability signals.

## Domain-specific security rules

Protect credentials, state files, private endpoints, logs, and environment-specific configuration. Apply least privilege, separation of duties, safe secret handling, and change review. Treat configuration, images, dependencies, and external events as potentially untrusted. Never bypass approvals, disable security checks, or claim a deployment succeeded without runtime evidence. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- Which environments are in scope, and which are protected?
- Is the task read-only, a plan, a staged change, or an actual deployment?
- What rollback, approval, health, and incident procedures already exist?
- Which credentials, secret managers, observability systems, and access boundaries are confirmed?

## When not to use this blueprint

Do not use it when the main deliverable is application feature development, data analysis, or content creation. If operations are only a small part of a web project, use the primary domain blueprint and consult this one only for explicitly scoped operational concerns.
