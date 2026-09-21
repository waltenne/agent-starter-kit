# Adaptador Windsurf

## Status de compatibilidade

- Nível: parcial
- Última revisão: 2026-09-15
- Fonte: Documentação oficial do Windsurf IDE (Codeium)

## Arquivo de instruções

`.windsurfrules` ou `AGENTS.md` na raiz do projeto.

## Skills

Skills mantidas em `.agents/skills/` e anexadas como contexto de regras no Cascade/Windsurf.

## Subagentes

Definidos através de Workflows ou fluxos de sub-tarefas configurados no editor.

## Memória e Handoffs

Estrutura mantida em `memory/` ou `.ai-memory/`. Integração via servidor MCP do `ai-memory` ou comandos CLI de consulta e handoff.

## Ferramentas

Cascade terminal execution, ferramentas do sistema de arquivos e suporte a extensões do editor.

## Limitações

Regras customizadas dependem da versão do editor Windsurf instalada.

## Procedimento de adaptação

1. Leia `rules.md`.
2. Leia o blueprint selecionado.
3. Gere o workspace genérico.
4. Aplique o formato específico deste adaptador (crie `.windsurfrules` apontando para `AGENTS.md`).
5. Ajuste caminhos e referências.
6. Valide o resultado com `bash scripts/validate.sh`.

