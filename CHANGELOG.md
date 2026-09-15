# Changelog

This file records user-visible changes to the kit format. The current format version is [`VERSION`](VERSION).

## [1.1.0] - Multi-Agent Agnostic Architecture & Adapters

### Added

- Platform-agnostic two-layer architecture (Core Agnostic Content + Agent Adapters).
- Central Agent Compatibility Matrix ([`compatibility.md`](compatibility.md)).
- Platform adapters in `adapters/` for Generic Agent, Claude Code, OpenAI Codex, Cursor, Windsurf, GitHub Copilot, and Local Agents.
- Project starter code templates in `templates/workspace-template/src/` (`shared/` and domain templates) along with `ARCHITECTURE.md`, `ADR.md`, and initial ADR documentation.
- Multi-agent and generic workspace examples in `examples/generic-agent/` and `examples/multi-agent/`.
- Agent choice step in [`wizard.md`](wizard.md) (third mandatory question in diagnostic flow) supporting up to 6 total questions with 1 question per turn.
- Agent and bootstrap configuration schemas in [`config.example.yml`](config.example.yml).

### Compatibility

Workspaces created with version `1.1.0` support selecting AI agent adapters post-generation. Upgrading existing `1.0.0` workspaces requires adding the agent adapter metadata in `config.yml` and reviewing instructions in [`compatibility.md`](compatibility.md).

## [1.0.0] - Initial documented format

### Added

- Central rules, diagnostic wizard, categorized domain blueprints, and reusable skill and subagent templates.
- Configurable generated-workspace paths through `config.example.yml`.
- Workspace, web-development, skill, and subagent examples.
- Repository validation script and contribution guidance.

### Compatibility

Generated workspaces using this format should record `1.0.0`. Changes to central rules, required template fields, blueprint paths, or generated artifact paths require reviewing affected workspaces before adoption.
