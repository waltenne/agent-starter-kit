---
name: review-api
description: Review a confirmed API change for contract, error, security, and compatibility concerns.
version: 1.0.0
requires_confirmation: true
allowed_tools: []
---

# API Review Skill Example

## Scope

This example reviews a proposed API change and produces findings. It does not modify code, call external services, approve a release, or replace human security review.

## Central rules

Consult the configured workspace rules file at `../../AGENTS.md`. This path is specific to this example; generated skills must replace it with the workspace's configured `<central-rules-file>`.

## Procedure

1. Inspect the confirmed contract and compatibility constraints.
2. Check inputs, outputs, errors, authentication, authorization, versioning, and documentation.
3. Return evidence, uncertainties, and recommendations in a fixed report.

## Output

```text
Result: <findings or no findings>
Evidence: <confirmed files or sources>
Uncertainties: <unconfirmed points>
Recommendations: <next actions>
```
