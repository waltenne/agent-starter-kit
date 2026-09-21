# <workspace-name>

> [!NOTE]
> Este workspace foi gerado utilizando o [`agent-starter-kit`](https://github.com/waltenne/agent-starter-kit).

## Visão Geral

- **Objetivo**: `<workspace-objective>`
- **Blueprint Primário**: `<primary-blueprint>`
- **Agente de IA Configurado**: `<agent-type>`
- **Idioma dos Artefatos**: `<artifact-language>`

## Estrutura do Workspace

```text
<workspace-name>/
├── AGENTS.md                  # Instruções centrais do agente
├── ARCHITECTURE.md            # Arquitetura e decisões técnicas
├── ADR.md                     # Registro de Decisões de Arquitetura (Índice)
├── .agents/
│   ├── skills/                # Skills aprovadas
│   └── subagents/             # Subagentes aprovados
├── memory/                    # Memória Karpathy LLM Wiki e handoffs (log.md, sessions/, handoff.md)
├── docs/                      # Documentação técnica e ADRs
└── src/                       # Código fonte do projeto
```

## Como Usar

1. Consulte [`AGENTS.md`](AGENTS.md) para as instruções do agente de IA.
2. Execute a validação do workspace periodicamente.

