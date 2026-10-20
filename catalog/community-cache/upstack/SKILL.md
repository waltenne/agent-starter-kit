---
name: upstack
description: Suite leve de Test-Driven Development (TDD Red-Green-Refactor) para coding agents.
license: Apache-2.0
compatibility: generic
metadata:
  author: Upsolve-Labs
  revision: main
---

# Toolkit: upstack

Fonte original: [`https://github.com/Upsolve-Labs/upstack`](https://github.com/Upsolve-Labs/upstack).

## Objetivo

Implementar rotinas concisas e determinísticas de TDD (Test-Driven Development) para agentes de código em Node.js, TypeScript e Python.

## Quando usar

- Ao criar novas regras de negócio em domínios existentes.
- Ao corrigir falhas de teste sem adicionar código especulativo.

## Procedimento

1. Identifique o arquivo de teste correspondente ao serviço em `src/<domain>/service.test.ts`.
2. Adicione o caso de teste falho que delimita o novo comportamento.
3. Execute `agent-tool check test` para verificar a falha isolada.
4. Implemente a regra no service até que o teste passe com sucesso.

