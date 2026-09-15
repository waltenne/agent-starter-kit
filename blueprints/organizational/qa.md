# Quality Assurance Blueprint

## Purpose

Use this blueprint when the primary deliverable is quality assurance, test strategy, defect investigation, release confidence, or validation of a product. Apply [`../../rules.md`](../../rules.md) for all general rules.

## User profile and common tasks

This blueprint fits a QA professional, test engineer, quality analyst, or contributor responsible for finding risks before users encounter them. Common tasks include test planning, exploratory testing, regression analysis, automation design, defect reproduction, accessibility checks, compatibility checks, release readiness, and quality reporting.

## Tools and technologies

Possible tools include a test framework, browser or device runner, API client, issue tracker, log viewer, accessibility checker, performance tool, CI system, and test-data generator. Treat all tools as examples and use them only when confirmed by the user or present in the workspace.

## Suggested skills

Consider a skill for a recurring workflow such as test-plan generation, regression selection, defect triage, accessibility review, or release-readiness assessment. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create a skill for a single defect or to replace human judgment about risk.

## Suggested subagents

When justified, consider narrowly scoped agents for test-case analysis, reproducibility review, API contract checks, accessibility review, or failure-log triage. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md). Keep test data and handoffs within the authorized scope.

## Recommended workspace structure

Follow existing conventions. A possible separation is:

```text
project/
├── test plans or cases
├── automated tests/
├── fixtures or safe test data/
├── defect evidence/
├── reports/
└── quality checklists/
```

Do not modify product code, test environments, or defect status without explicit scope and authorization.

## Validation practices

- Define the behavior, risk, environment, data, and expected result before testing.
- Reproduce failures with minimal safe fixtures and record exact evidence.
- Cover happy paths, boundary conditions, error paths, permissions, accessibility, compatibility, and relevant non-functional risks.
- Distinguish tested scope, untested scope, flaky results, blocked checks, and defects.
- Validate that automated checks are meaningful and do not pass only because assertions are weak.

## Domain-specific risks

Risks include false confidence from incomplete coverage, flaky tests, unsafe test data, unreported regressions, environment mismatch, non-reproducible defects, and treating a green pipeline as proof of overall quality.

## Domain-specific security rules

Never place production secrets or personal data in fixtures, screenshots, logs, or bug reports. Do not test against protected environments without authorization. Avoid destructive test data and isolate any state-changing checks. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- What product behavior, release, environment, and risk area are in scope?
- Which test levels, devices, browsers, data classifications, and accessibility requirements apply?
- What evidence is required to close a defect or approve a release?
- Which checks are automated, manual, flaky, blocked, or not yet available?

## When not to use this blueprint

Do not use it when the main deliverable is product strategy, technical product ownership, Scrum facilitation, people management, or implementation work. Use it as a supporting blueprint only when quality validation is the primary responsibility.
