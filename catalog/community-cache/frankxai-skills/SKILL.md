---
name: frankxai-skills
description: Práticas de arquitetura para sistemas de IA, observabilidade e fluxos de criação.
license: MIT
compatibility: generic
metadata:
  author: FrankX (@frankxai)
  revision: main
---

# Toolkit: frankxai-skills

Fonte original: [`https://github.com/frankxai/skills`](https://github.com/frankxai/skills) (FrankX).

## Objetivo

Fornecer padrões de arquitetura de software para sistemas integrados com IA generativa, pipelines de avaliação e engenharia de contexto.

## Quando usar

- Ao estruturar novas aplicações de IA generativa ou pipelines multi-provedores.
- Ao auditar o isolamento de prompts e consumo de contexto.

## Procedimento

1. Analise os pontos de contato entre os modelos de IA e a base de dados.
2. Aplique padrões de isolamento de contexto para evitar contaminação de prompt.
3. Adicione métricas de observabilidade para chamadas e latência de inferência.

