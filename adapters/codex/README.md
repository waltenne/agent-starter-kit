# Adaptador OpenAI Codex

## Status de compatibilidade

- Nível: conceitual
- Última revisão: 2026-09-15
- Fonte: Especificação genérica de contexto e prompt de código

## Arquivo de instruções

`AGENTS.md` ou arquivo de instrução de sistema injetado no prompt.

## Skills

Compatibilidade não verificada. Consulte a documentação do agente antes de instalar.

## Subagentes

Compatibilidade não verificada. Consulte a documentação do agente antes de instalar.

## Memória e Handoffs

Suporte aos hooks nativos do Codex (`SessionEnd`) e servidor MCP do `ai-memory`. Permite salvar o estado da sessão e emitir handoffs *claim-once* para transição direta com Claude Code, Antigravity e outros agentes.

## Ferramentas

Execuções via chamadas de função (function calling) ou ambiente de execução fornecido.

## Limitações

Não presumir nomes de arquivos proprietários ou capacidades de agentes sem verificação prévia.

## Procedimento de adaptação

1. Leia `rules.md`.
2. Leia o blueprint selecionado.
3. Gere o workspace genérico.
4. Aplique o formato específico deste adaptador (vincule `AGENTS.md` ao prompt do sistema).
5. Ajuste caminhos e referências.
6. Valide o resultado com `bash scripts/validate.sh`.

