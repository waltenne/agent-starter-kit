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

## Memória

Arquivo de índice em `.agents/memory/index.md` injetado como contexto adicional de prompt.

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

