# Changelog

This file records user-visible changes to the kit format. The current format version is [`VERSION`](VERSION).

## [1.4.0] - Community Skills & Capability Manager

### Added

- **Diferenciação Estrita de Tipos**: Classificação formal no catálogo entre `skill` (procedimento Agent Skills puro), `toolkit` (suíte composta como Superpowers e Upstack) e `integration` (ferramentas externas como AI Memory e Prism Coder).
- **Catálogo Expandido de Componentes da Comunidade**: Inclusão de `archify` (diagramas técnicos interativos), `superpowers` (engenharia sênior e TDD), `upstack` (TDD Red-Green-Refactor), `prism-coder` (MCP memória cognitiva), `frankxai-skills` (arquitetura de IA) e `humanizer-aboudjem`.
- **Perfis de Instalação (`--profile`)**: Perfis contextuais `MINIMAL`, `DEVELOPER`, `DEVOPS_SRE`, `DOCUMENTATION` e `AI_ENGINEERING`.
- **Detecção de Conflitos e Sobreposições**: Sistema de checagem prévia diferenciando `DUPLICATE`, `OVERLAP`, `CONFLICT` e `INCOMPATIBLE`.
- **Comando `agent-tool skills browse`**: Interface estruturada em terminal para navegação por categorias, perfis e badges de tipo.
- **Comando `agent-tool skills doctor`**: Health check do workspace para validar integridade do lockfile, arquivos ausentes, divergência de hash, dependências e sobreposições ativas.
- **Suporte a Escopos Global e Projeto**: Flags `--global` (`~/.agents/skills/`) e `--project` (`.agents/skills/`) integradas ao instalador e lockfile.

### Fixed

- **Integridade do Lockfile**: Atualização do esquema do `.skills-lock.json` para registrar escopo, tipo, versão e hash sha256.
- **Proteção contra Symlinks e Path Traversal**: Validação aprofundada de diretórios de instalação e isolamento de caminhos.

## [1.3.0] - Catálogo de Skills da Comunidade, Idempotência e Proveniência

### Added

- **Catálogo de Skills (`catalog/`)**: Catálogo estruturado com schema formal (`catalog/schema.json`) dividindo skills em `BUILTIN`, `COMMUNITY_REVIEWED` e `COMMUNITY_UNREVIEWED`.
- **Skills da Comunidade Curadas**: Inclusão de `humanizer` ([`blader/humanizer`](https://github.com/blader/humanizer)) e `docker-essentials`, além de documentação de integração com ferramentas externas como `ai-memory` ([`akitaonrails/ai-memory`](https://github.com/akitaonrails/ai-memory)).
- **Comandos de Gerenciamento de Skills (`agent-tool skills`)**: `list`, `info`, `recommend`, `install`, `installed`, `remove` e `update` com saída compacta e `--json`.
- **Lockfile de Proveniência (`.agents/.skills-lock.json`)**: Rastreamento de origem, versão/tag, hash sha256 e arquivos gerenciados.
- **Suporte ao Padrão Agent Skills**: Estruturação de diretórios com `.agents/skills/<skill-name>/SKILL.md` preservando referências e assets.
- **Modos `--dry-run` e `--force`**: Simulação sem efeitos colaterais e proteção de arquivos customizados pelo usuário.

### Fixed

- **Idempotência no Setup**: O comando `agent-tool setup` agora verifica arquivos existentes e não duplica blocos de configuração nem sobrescreve customizações locais.
- **Portabilidade de Wrappers**: O wrapper local `tools/agent-tool` foi reestruturado para não depender de caminhos absolutos do host gerador.
- **Segurança contra Path Traversal**: Validação rigorosa de identificadores de skills e caminhos relativos.

## [1.2.0] - CLI Determinística e Automação de Workflow

### Added

- CLI determinística unificada `tools/agent-tool` em Node.js ES Modules nativo.
- Detecção automática de stack, frameworks (Electron, React, Node, Rust, SQLite) e suítes de teste.
- Comandos determinísticos `project info`, `project status`, `check`, `find`, `context`, `logs` e `db`.
- Regras centrais atualizadas com a hierarquia `SCRIPT -> SKILL -> AGENT -> ADVISOR`.

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
