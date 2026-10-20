---
name: git-workflow
description: Fluxo seguro e determinístico de Git com status resumido e commits semânticos.
version: 1.0.0
---

# Skill: git-workflow

Referência de regras centrais: [`../../rules.md`](../../rules.md).

## Objetivo

Gerenciar ciclo de trabalho no Git de forma segura, evitando alterações destrutivas, visualizando diffs resumidos e garantindo mensagens de commit padronizadas.

## Quando usar

- Ao iniciar uma tarefa ou inspecionar o estado atual do repositório.
- Antes de registrar commits ou preparar pull requests.

## Procedimento

1. Obtenha o status condensado do repositório:
   - `agent-tool project status --json`
2. Valide se a árvore está limpa ou quais arquivos foram modificados/adicionados.
3. Garanta que nenhuma chave de API, arquivo temporário ou segredo esteja listado em `untracked` ou modificado.
4. Execute as checagens antes de commitar:
   - `agent-tool check all --json`
5. Escreva mensagens no formato semântico `<type>(<scope>): <subject>` conforme política central.

## Saída esperada

- Repositório com histórico limpo e commits atômicos devidamente validados.

