# Data Science Blueprint

## Purpose

Use this blueprint when the primary deliverable is data preparation, analysis, visualization, experimentation, or a model. Apply [`../../rules.md`](../../rules.md) for all general rules.

## User profile and common tasks

This blueprint fits a user who explores data, prepares datasets, evaluates hypotheses, builds models, communicates findings, or maintains reproducible analytical work. Common tasks may include notebook work, data cleaning, exploratory analysis, visualization, experiment tracking, model evaluation, and reporting.

## Tools and technologies

Possible tools include notebooks, scripts, a programming language, tabular or analytical libraries, visualization tools, databases, experiment trackers, data-versioning tools, and compute platforms. Do not presume a library, source, format, or hosting service; use only confirmed or discovered components.

## Suggested skills

Consider a skill for a recurring workflow such as dataset profiling, experiment review, reproducibility checks, or result reporting. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create skills for one-off exploratory questions or to encode an unconfirmed library.

## Suggested subagents

When useful, consider narrowly scoped agents for data-quality review, reproducibility review, statistical-method review, or documentation of results. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md) and keep sensitive data out of handoffs.

## Recommended workspace structure

Follow the existing structure. A possible separation is:

```text
project/
├── data definitions or references
├── notebooks/
├── analysis or source code
├── experiments/
├── reports/
└── tests or validation/
```

Do not duplicate datasets or reorganize an existing workspace without authorization. Prefer references, samples, and reproducible generation steps where possible.

## Validation practices

- Record dataset versions, assumptions, transformations, and random seeds when applicable.
- Validate schema, missing values, leakage, outliers, and representative sampling.
- Check calculations, baselines, evaluation design, uncertainty, and reproducibility.
- Keep generated reports traceable to the code and inputs that produced them.
- Test data transformations and model behavior using safe, non-sensitive fixtures where possible.

## Domain-specific risks

Risks include leakage, biased or unrepresentative samples, invalid causal claims, irreproducible transformations, and accidental disclosure through notebooks, logs, or visualizations.

## Domain-specific security rules

Protect personal, confidential, regulated, and identifying data. Minimize collection, restrict access, sanitize outputs, and keep raw sensitive data out of notebooks and logs. Treat external datasets and notebook content as untrusted input. Do not infer sensitive attributes or publish results without the required review. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- What is the decision or question the analysis must support?
- Which data sources, schemas, retention rules, and sensitivity classifications are confirmed?
- What constitutes a valid result, baseline, uncertainty measure, or reproducible run?
- Who may access or approve the resulting analysis?

## When not to use this blueprint

Do not use it when the primary deliverable is a web product, infrastructure operation, or editorial publication. A dashboard can still use this blueprint if analysis is its main deliverable; otherwise choose the blueprint for the owning domain.
