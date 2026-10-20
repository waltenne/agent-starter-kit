---
name: db-health
description: Diagnóstico determinístico de integridade, schema e tabelas de banco de dados SQLite.
version: 1.0.0
---

# Skill: db-health

Referência de regras centrais: [`../../rules.md`](../../rules.md).

## Objetivo

Checar saúde, integridade física, índices e contagem de registros em bancos de dados sem exigir scripts manuais ou consultas ad-hoc da LLM.

## Quando usar

- Ao trabalhar com projetos desktop, Electron, Node ou Rust que utilizem SQLite.
- Após executar migrations ou alterações de schema.
- Quando houver suspeita de corrupção ou travamento de banco.

## Procedimento

1. Identifique o arquivo do banco SQLite no projeto ou informe via argumento.
2. Execute a checagem determinística:
   - `agent-tool db health --file <caminho-do-banco> --json`
3. Verifique o resultado retornado:
   - `integrity`: confirma se `PRAGMA integrity_check` retornou `ok`.
   - `tables`: lista de tabelas e contagem estimada de linhas.
   - `warnings`: alertas sobre índices ausentes ou tabelas sem chave primária.
4. Para inspecionar schemas de tabelas:
   - `agent-tool db schema --file <caminho-do-banco> --json`

## Saída esperada

- Relatório com status de integridade, lista de tabelas e contagem de registros.

