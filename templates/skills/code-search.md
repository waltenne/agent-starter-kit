---
name: code-search
description: Busca determinística de símbolos, arquivos e texto reduzindo consumo de tokens.
version: 1.0.0
---

# Skill: code-search

Referência de regras centrais: [`../../rules.md`](../../rules.md).

## Objetivo

Localizar arquivos, símbolos e referências sem varrer o repositório inteiro e sem despejar dezenas de arquivos no contexto da LLM.

## Quando usar

- Ao investigar referências a funções, variáveis, classes ou endpoints.
- Ao procurar arquivos por padrão de nome ou extensão.
- Quando precisar de contexto mínimo e estruturado sobre um símbolo.

## Procedimento

1. Execute a busca determinística usando `agent-tool`:
   - Para texto ou regex: `agent-tool find text "<termo>" --json`
   - Para arquivos: `agent-tool find file "<glob>" --json`
   - Para símbolos de código: `agent-tool find symbol "<nome>" --json`
2. Interprete o JSON retornado:
   - Verifique a lista condensada de arquivos e linhas (`matches`).
   - Se houver mais de 20 ocorrências, refine a busca com filtros de diretório ou extensão.
3. Leia apenas as linhas e arquivos estritamente relevantes para a tarefa atual.

## Saída esperada

- Resumo com caminho do arquivo, número da linha e trecho contextual identificado.
- Zero alucinação de caminhos inexistentes.

