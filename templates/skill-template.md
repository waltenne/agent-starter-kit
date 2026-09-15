---
name: <skill-name>
description: <what it does and when to use it>
version: 1.0.0
owner: <agent-or-user>
requires_confirmation: true
allowed_tools: []
inputs_schema:
  context: string
outputs_schema:
  result: string
timeout_seconds: 300
---

# Skill Template

Replace every placeholder with confirmed, generic information. This template defines one reusable skill with one responsibility. The generated skill must follow the workspace's configured central rules file, such as `<central-rules-file>`. Do not assume that the kit-relative path `../rules.md` remains valid after copying.

## Objective

<short description of the single problem this skill solves>

## When to use

<specific recurring triggers and applicable situations>

## Triggers

<phrases, events, or conditions that should activate this skill>

## When not to use

<explicit boundaries, including similar tasks that belong elsewhere>

## Inputs

<required inputs, types, authorized paths, and assumptions that must be confirmed>

## Preconditions

<what must exist before the skill runs>

## Procedure

1. <inspect and confirm the relevant context>
2. <perform the bounded work>
3. <produce the fixed output>

## Tools

<minimum tools required, or state that no tools are required; do not presume a tool>

## Security rules

- Follow `<central-rules-file>` and preserve its confirmation, privacy, and evidence requirements. During generation, replace this placeholder with the final workspace path.
- Do not contain or request secrets unless a separately authorized secure mechanism exists; never place secrets in the output.
- Do not alter policy, permissions, protected files, or external systems outside this skill's scope.
- Require explicit confirmation before sensitive, destructive, irreversible, or externally visible actions.

## Output format

```text
Result: <outcome>
Evidence: <files, lines, commands, or sources>
Uncertainties: <unconfirmed points or none>
Next actions: <recommendations or none>
```

## Validation

<checks that prove the output is correct, safe, complete, and within scope>

## Postconditions

<state expected after the skill completes; distinguish proposed from actually changed>

## Rollback

<how to undo reversible changes, or “not applicable” for read-only work>

## Examples

### Positive example

Input: <a recurring request that clearly matches this skill>

Expected output: <a concise output conforming to the fixed format>

### Negative example

Input: <a one-off, out-of-scope, unsafe, or unconfirmed request>

Expected behavior: <decline, ask for missing information, or route to another skill>
