# Adaptador Claude Code

## Status de compatibilidade

- Nível: parcial
- Última revisão: 2026-09-15
- Fonte: Documentação oficial do Claude Code / CLI

## Arquivo de instruções

`CLAUDE.md` ou `AGENTS.md` na raiz do workspace.

## Skills

Skills mapeadas em `.claude/skills/` ou referenciadas no arquivo de instruções central.

## Subagentes

Subagentes executados como tarefas paralelas ou invocados via CLI/ferramentas autorizadas.

## Memória

Estrutura de memória mantida em `.agents/memory/index.md` e referenciada nas instruções do repositório.

## Ferramentas

Ferramentas CLI autorizadas pelo usuário, execuções de comandos bash e servidores MCP configurados.

## Limitações

Ações que exigem bypass de sandbox ou escrita em arquivo dependem de confirmação explícita do usuário.

## Procedimento de adaptação

1. Leia `rules.md`.
2. Leia o blueprint selecionado.
3. Gere o workspace genérico.
4. Aplique o formato específico deste adaptador (crie ou aponte `CLAUDE.md` para `AGENTS.md`).
5. Ajuste caminhos e referências.
6. Valide o resultado com `bash scripts/validate.sh`.

