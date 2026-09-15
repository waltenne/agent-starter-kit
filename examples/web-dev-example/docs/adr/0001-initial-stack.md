# ADR 0001: Initial Stack and Domain Layout

- Status: accepted
- Date: 2026-09-15

## Context

The web-dev reference workspace requires a clear separation between shared utilities and domain logic.

## Decision

Adopt the domain-driven layout under `src/` with `shared/` for cross-cutting helpers.

## Consequences

Clear boundary enforcement and easy testing.
