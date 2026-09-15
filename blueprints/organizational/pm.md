# Product Manager Blueprint

## Purpose

Use this blueprint when the primary deliverable is product discovery, prioritization, roadmap planning, outcome definition, or alignment between user needs and product delivery. Apply [`../../rules.md`](../../rules.md) for all general rules.

## User profile and common tasks

This blueprint fits a Product Manager or product practitioner who turns evidence and strategy into clear product decisions. Common tasks include problem discovery, user research synthesis, opportunity framing, goal definition, prioritization, roadmap communication, requirements, experiment planning, stakeholder alignment, and outcome review.

## Tools and technologies

Possible tools include research notes, analytics, feedback repositories, roadmaps, planning boards, documents, prototypes, experiment trackers, and communication tools. Treat all tools as examples and use them only when confirmed by the user or present in the workspace.

## Suggested skills

Consider a skill for a recurring workflow such as opportunity-brief creation, evidence synthesis, prioritization review, experiment design, or roadmap update. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create a skill to make an unreviewed product decision automatically or to turn a one-off opinion into policy.

## Suggested subagents

When useful, consider narrowly scoped agents for research synthesis, requirements consistency, opportunity comparison, metric-definition review, or stakeholder-update drafting. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md). The principal owner remains responsible for product decisions.

## Recommended workspace structure

Follow existing conventions. A possible separation is:

```text
workspace/
├── strategy/
├── research/
├── opportunities/
├── requirements/
├── roadmap/
└── decision records/
```

Keep assumptions, evidence, decisions, and open questions distinguishable. Do not overwrite an approved roadmap or requirement without authorization.

## Validation practices

- Trace important decisions to user evidence, business goals, constraints, or an explicitly labeled hypothesis.
- Define outcomes, measures, baselines, guardrails, and review dates before proposing experiments.
- Check requirements for ambiguity, acceptance conditions, dependencies, non-functional needs, and accessibility.
- Record alternatives considered, trade-offs, decision owners, and unresolved risks.
- Validate that stakeholder summaries preserve important caveats and do not overstate certainty.

## Domain-specific risks

Risks include building from unverified assumptions, optimizing a proxy metric, scope churn, unclear ownership, inaccessible requirements, stakeholder misalignment, and presenting forecasts or research as facts.

## Domain-specific security rules

Minimize personal and confidential research data, restrict access, and anonymize examples. Do not expose customer feedback, private strategy, or internal decisions in reusable artifacts. Do not make commitments, publish roadmaps, or contact stakeholders without confirmation. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- Which user, problem, outcome, product area, and decision are in scope?
- What evidence, constraints, goals, measures, and deadlines are confirmed?
- Who owns the decision, who must review it, and what can be shared?
- Is the requested output a discovery artifact, requirement, recommendation, roadmap, or approved decision?

## When not to use this blueprint

Do not use it when the main deliverable is technical implementation, test execution, Scrum facilitation, or people management. If the work is specifically technical product ownership, use [`tpo.md`](tpo.md) instead.
