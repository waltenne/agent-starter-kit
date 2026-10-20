# Multi-Agent Workspace Instructions

This workspace demonstrates a single orchestrator delegating one bounded task to a generic worker.

## Format and sources

- Kit format version: 1.1.0
- Primary blueprint: technical/web-dev
- Secondary blueprints: organizational/qa
- Central rules file: AGENTS.md
- Artifact index: .agents/memory/index.md

## Operating procedure

1. Read `AGENTS.md` before acting.
2. Resolve simple tasks directly and load a domain skill only when its procedure applies.
3. Delegate a bounded, independent task to `.agents/subagents/worker.md` only when the runtime supports it and delegation saves effort.
4. Do not delegate the same task to multiple workers or allow nested delegation.
5. The orchestrator decides, implements, validates, and maintains durable decisions in `.agents/memory/index.md` when needed.
