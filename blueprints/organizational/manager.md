# Manager Blueprint

## Purpose

Use this blueprint when the primary responsibility is team leadership, people management, capacity planning, feedback, risk ownership, or coordination across teams. Apply [`../../rules.md`](../../rules.md) for all general rules.

## User profile and common tasks

This blueprint fits a people manager, engineering manager, delivery manager, or similar leader responsible for supporting people and coordinating outcomes. Common tasks include planning, prioritization alignment, staffing discussions, coaching, feedback preparation, risk management, stakeholder communication, dependency coordination, and operational follow-up.

## Tools and technologies

Possible tools include planning documents, staffing or capacity views, project reports, one-to-one notes, feedback templates, risk registers, decision records, and communication tools. Treat all tools as examples and use them only when confirmed by the user or present in the workspace.

## Suggested skills

Consider a skill for a recurring workflow such as status synthesis, risk-register review, meeting preparation, decision-log maintenance, or feedback-structure drafting. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create a skill that makes hiring, performance, compensation, promotion, or disciplinary decisions automatically.

## Suggested subagents

When useful, consider narrowly scoped agents for anonymized status synthesis, dependency mapping, risk review, agenda drafting, or action-item tracking. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md). Keep people decisions, sensitive judgments, and approvals with authorized humans.

## Recommended workspace structure

Follow existing conventions. A possible separation is:

```text
workspace/
├── goals and planning/
├── risks and dependencies/
├── decision records/
├── team operating agreements/
├── meeting outputs/
└── feedback templates/
```

Separate team-level delivery information from private personnel records. Do not create shadow performance files or copy sensitive HR information into general project documents.

## Validation practices

- Separate observed facts, reported concerns, inferences, and decisions.
- Confirm ownership, constraints, dependencies, risks, dates, and follow-up actions.
- Check status reports for balanced context, material blockers, and uncertainty rather than unsupported certainty.
- Review communications for clarity, audience, accessibility, and appropriate confidentiality.
- Validate that automated summaries preserve nuance and receive human review before distribution.

## Domain-specific risks

Risks include privacy violations, biased evaluations, over-surveillance, unclear accountability, hidden delivery risks, communication gaps, and treating incomplete status data as a complete picture of team performance.

## Domain-specific security rules

Protect personnel, compensation, health, feedback, and employment information. Minimize access and retention, use anonymized examples, and never expose private one-to-one or HR content in general workspace artifacts. Do not automate or delegate employment decisions. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- Which team, outcome, planning horizon, risk, or coordination issue is in scope?
- Which information is public to the team, restricted to management, or confidential?
- What decision rights, approval paths, constraints, and follow-up mechanisms exist?
- Is the requested output a plan, status summary, risk review, communication draft, or personnel-related artifact?

## When not to use this blueprint

Do not use it for product discovery, technical product ownership, Scrum facilitation, QA execution, or direct software implementation. Use [`sm.md`](sm.md) for team-process facilitation and [`pm.md`](pm.md) for product strategy.
