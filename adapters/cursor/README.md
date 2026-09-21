# Adaptador Cursor

## Status de compatibilidade

- Nível: parcial
- Última revisão: 2026-09-15
- Fonte: Documentação oficial do Cursor Editor

## Arquivo de instruções

`.cursorrules` ou `AGENTS.md` (quando suportado nativamente pelo projeto/editor).

## Skills

Skills organizadas em `.agents/skills/` e importadas/referenciadas dentro do arquivo `.cursorrules`.

## Subagentes

Representados como modos de prompt específicos ou sub-instruções no editor.

## Memória e Handoffs

Estrutura mantida em `memory/` ou `.ai-memory/`. Integração via servidor MCP do `ai-memory` configurado em `.cursor/mcp.json`.

## Ferramentas

Terminal integrado, ferramentas de edição de arquivos do Cursor e servidores MCP configurados nas opções do editor.

## Limitações

Regras muito extensas no `.cursorrules` podem ultrapassar o limite de contexto de instrução inicial.

## Procedimento de adaptação

1. Leia `rules.md`.
2. Leia o blueprint selecionado.
3. Gere o workspace genérico.
4. Aplique o formato específico deste adaptador (crie `.cursorrules` referenciando `AGENTS.md`).
5. Ajuste caminhos e referências.
6. Valide o resultado com `bash scripts/validate.sh`.

