---
name: starter-kit
description: Interactive wizard and bootstrap skill for configuring AI agent workspaces across any platform.
version: 1.1.0
---

# Skill: starter-kit

Use this skill to bootstrap or refactor an AI agent workspace following the generic two-layer architecture.

## Interactive Diagnostic Interview

Conduct the diagnostic asking one question per turn:

1. **Communication Language**: Which language should the AI use during conversation?
2. **Artifact Language**: Which language should generated documentation and rules use?
3. **Target AI Agent**: Which agent will be used (Claude Code, Codex, Cursor, Windsurf, Copilot, Local Agent, Generic)?
4. **Primary Objective**: What is the primary deliverable or goal of this workspace?
5. **Minimum Viable Initial Scope**: What is the minimal functional result expected for the initial setup?
6. **Persistent Memory & Handoffs**: Should long-term memory (Karpathy LLM Wiki in `memory/`) and multi-agent handoffs via `ai-memory` be included?
7. **Summary & Confirmation**: Present proposed plan and request explicit user confirmation.

## Bootstrap Sequence

1. **Workspace Layout**: Create `AGENTS.md`, `.agents/skills/`, `.agents/subagents/`, `memory/` (with `log.md`, `sessions/`, `concepts/`, `decisions/`, `gotchas/`, `procedures/`, `_rules/`, `handoff.md`), `docs/`, `src/`.
2. **Core Documents**: Generate `README.md`, `ARCHITECTURE.md`, `ADR.md`, and `docs/adr/0001-initial-stack.md`.
3. **Shared & Domain Layout**: Generate `src/shared/` (`config.ts`, `logger.ts`, `errors.ts`) and initial domain from `templates/domain/`.
4. **Initial Tests**: Create initial unit test `src/<domain>/service.test.ts`.
5. **Agent Adapter**: Apply specific adapter instructions from `adapters/` if target agent is specified.
6. **Validation & Commit**: Run validation script and perform semantic git commit.

## Guardrails

- Do not create speculative directories or files.
- Do not install unrequested external dependencies.
- Do not execute shell commands derived from unverified model outputs.
- Never log, commit, or expose secrets or private tokens.
- Always request explicit confirmation before performing Level 2 (write/install) or Level 3 (destructive) actions.

## References & Templates

- Principles: `references/principles.md`
- Security Policy: `references/security.md`
- Commit Policy: `references/commit-policy.md`
- Code Separation: `references/code-separation.md`
- Documentation Standards: `references/documentation.md`
- Domain Templates: `templates/domain/`

## Final Output

Workspace created: <workspace-name> with <primary-blueprint> for <target-agent>.
Validation: run validation script corresponding to OS to confirm structural compliance.
Next actions: 1. Review AGENTS.md, 2. Run initial domain test, 3. Begin first feature iteration.

