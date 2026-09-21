# Adaptador Agente Genérico (Generic Agent Adapter)

## Status de compatibilidade

- Nível: verificado (Padrão Universal)
- Última revisão: 2026-09-15
- Fonte: Especificação genérica Markdown do kit

## Arquivo de instruções

`AGENTS.md` na raiz do workspace.

## Skills

Armazenadas em `.agents/skills/*.md` e referenciadas a partir de `AGENTS.md`.

## Subagentes

Armazenados em `.agents/subagents/*.md` e definidos por templates padronizados.

## Memória e Handoffs

Estrutura em `memory/` seguindo a taxonomia Karpathy LLM Wiki (`log.md`, `sessions/`, `concepts/`, `decisions/`, `gotchas/`, `procedures/`, `_rules/`). Integração agnóstica via comandos de consulta de memória e protocolo de handoff tipado.

## Ferramentas

Ferramentas genéricas orientadas por instruções de terminal, comandos shell padrão e especificações abertas (ex.: MCP).

## Limitações

Requer que o agente de IA seja capaz de ler e interpretar arquivos Markdown no contexto do repositório.

## Procedimento de adaptação

1. Leia `rules.md`.
2. Leia o blueprint selecionado.
3. Gere o workspace genérico.
4. Aplique o formato específico deste adaptador (`AGENTS.md` como arquivo central).
5. Ajuste caminhos e referências relativas.
6. Valide o resultado com `bash scripts/validate.sh`.

