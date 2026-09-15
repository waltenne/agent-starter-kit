---
name: review-api-contract
description: Review API schema changes for breaking changes and contract violations.
version: 1.0.0
owner: agent
requires_confirmation: false
allowed_tools:
  - read_file
inputs_schema:
  schema_path: string
outputs_schema:
  report: string
timeout_seconds: 300
---

# Skill: Review API Contract

This template defines a reusable skill with a single responsibility. Follow `<central-rules-file>` for all general safety and autonomy rules.

## Objective

Analyze changes in API schemas (OpenAPI, JSON Schema, gRPC proto) to detect breaking changes or contract incompatibilities.

## When to use

Use when an API schema, interface definition, or endpoint payload contract is modified.

## Triggers

- Modification of OpenAPI/Swagger files.
- Modification of JSON Schema or gRPC proto definitions.
- Changes in request or response types in backend services.

## When not to use

Do not use for general code refactoring, database migrations without API impact, or UI layout changes.

## Inputs

- `schema_path`: Path to the API specification file.
- `diff`: Diff or previous version of the API contract.

## Preconditions

The target API specification file must exist and be readable.

## Procedure

1. Inspect the modified API specification file.
2. Compare endpoints, request parameters, response structures, and data types against the previous version.
3. Identify removed fields, changed data types, added mandatory parameters, or modified status codes.
4. Generate a contract impact report.

## Tools

- `read_file`: Inspect schema files.

## Security rules

- Follow `<central-rules-file>`.
- Do not expose credentials or internal tokens in the contract report.
- Require confirmation before modifying schema files.

## Output format

```text
Result: PASS | BREAKING_CHANGES_DETECTED
Evidence: API spec files and line numbers inspected
Uncertainties: Unconfirmed downstream client impacts if any
Next actions: Recommended fixes for contract compatibility
```

## Validation

Verify that all endpoints and fields in the spec were inspected and categorized correctly.

## Postconditions

Contract impact report generated without modifying source files.

## Rollback

Not applicable (read-only analysis skill).

## Examples

### Positive example

Input: `schema_path: "docs/openapi.yaml"` where field `user_id` was renamed to `userId`.

Expected output: `Result: BREAKING_CHANGES_DETECTED. Renamed field user_id breaks existing clients.`

### Negative example

Input: Refactoring CSS styles in frontend component.

Expected behavior: Decline execution; route to UI review.
