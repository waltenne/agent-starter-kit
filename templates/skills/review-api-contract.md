---
name: review-api-contract
description: Revisão de esquemas de API e contratos de serviço para detecção de quebras de compatibilidade.
version: 1.0.0
---

# Skill: review-api-contract

Referência de regras centrais: [`../../rules.md`](../../rules.md).

## Objetivo

Analisar alterações em esquemas de API (OpenAPI, TypeScript interfaces, JSON Schema) para detectar breaking changes antes da integração.

## Quando usar

- Quando endpoints, rotas ou tipos de request/response forem alterados.
- Ao atualizar contratos consumidos por múltiplos módulos ou clientes externos.

## Procedimento

1. Identifique o arquivo de esquema ou tipos alterados.
2. Compare os campos modificados, renomeados ou excluídos.
3. Avalie se novas propriedades obrigatórias foram adicionadas sem valor default.
4. Gere um sumário de impacto de contrato.

## Saída esperada

- Relatório com status `PASS` ou `BREAKING_CHANGES_DETECTED`, identificando campos e clientes afetados.

