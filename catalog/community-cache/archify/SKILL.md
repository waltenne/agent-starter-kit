---
name: archify
description: Converte estruturas de código e especificações em diagramas técnicos interativos em HTML.
license: MIT
compatibility: generic
metadata:
  author: tt-a1i
  revision: main
---

# Skill: archify

Fonte original: [`https://github.com/tt-a1i/archify`](https://github.com/tt-a1i/archify).

## Objetivo

Gerar diagramas técnicos interativos e auto-contidos em HTML para visualizar arquitetura de sistemas, fluxos de dados, sequência e limites de domínio a partir do código fonte.

## Quando usar

- Ao documentar novas fronteiras de serviços ou domínios em `ARCHITECTURE.md`.
- Ao desenhar fluxos de autenticação, mensageria ou chamadas assíncronas.
- Ao apresentar um mapa visual de componentes antes de refatorações complexas.

## Procedimento

1. Inspecione os domínios e contratos em `src/domain/` ou diretórios equivalentes.
2. Identifique os nós (serviços, filas, bancos, clientes) e as arestas de comunicação.
3. Produza o payload de diagrama estruturado com metadados de tecnologia e sentido do fluxo.
4. Renderize o arquivo de visualização em `docs/diagrams/` sem embutir credenciais ou dados sensíveis.

