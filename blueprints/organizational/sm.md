# Scrum Master Blueprint

## Purpose

Use this blueprint when the primary responsibility is Scrum facilitation, team flow improvement, impediment removal, or support for continuous improvement. Apply [`../../rules.md`](../../rules.md) for all general rules.

## User profile and common tasks

This blueprint fits a Scrum Master, agile facilitator, or delivery facilitator who helps a team inspect and adapt its way of working. Common tasks include facilitating events, clarifying working agreements, visualizing flow, removing impediments, improving collaboration, supporting retrospectives, and making process risks visible.

## Tools and technologies

Possible tools include a planning board, workflow metrics, meeting notes, decision records, retrospective formats, documentation, and communication tools. Treat all tools as examples and use them only when confirmed by the user or present in the workspace.

## Suggested skills

Consider a skill for a recurring workflow such as retrospective synthesis, impediment tracking, flow review, working-agreement review, or facilitation-plan preparation. Use [`../../templates/skill-template.md`](../../templates/skill-template.md). Do not create a skill to automate team judgment, rank individuals, or create meetings without need.

## Suggested subagents

When beneficial, consider narrowly scoped agents for anonymized trend synthesis, impediment categorization, action-item tracking, or agenda drafting. Use [`../../templates/subagent-template.md`](../../templates/subagent-template.md). Keep the team and accountable leaders responsible for decisions.

## Recommended workspace structure

Follow existing conventions. A possible separation is:

```text
workspace/
├── working agreements/
├── event agendas/
├── impediments/
├── improvement actions/
├── flow observations/
└── decision records/
```

Keep observations, commitments, and outcomes separate. Do not turn process artifacts into individual surveillance records.

## Validation practices

- Confirm that events have a clear purpose, participants, time boundary, and expected outcome.
- Track impediments to ownership and resolution without hiding systemic causes.
- Review improvement actions for a concrete owner, next step, and follow-up date.
- Use flow measures as conversation prompts, not as isolated proof of individual performance.
- Validate that working agreements and process changes are understood by the people affected.

## Domain-specific risks

Risks include ceremony without outcomes, hidden impediments, action items without ownership, misuse of metrics, process changes without consent, and confusing facilitation with line management.

## Domain-specific security rules

Protect personal feedback, conflict details, health information, and individual performance data. Prefer aggregated or anonymized observations. Do not publish retrospective content, assign blame, or make personnel decisions from automated summaries. Apply the general security rules in [`../../rules.md`](../../rules.md).

## Additional questions

- Which team, workflow, events, impediments, or improvement goal are in scope?
- What working agreements, roles, metrics, and decision rights already exist?
- Which information may be shared, anonymized, or kept private?
- Is the requested output an agenda, synthesis, action plan, facilitation guide, or decision?

## When not to use this blueprint

Do not use it when the primary responsibility is product strategy, technical product ownership, QA execution, or people management. Use [`manager.md`](manager.md) when the work concerns personnel decisions or line-management accountability.
