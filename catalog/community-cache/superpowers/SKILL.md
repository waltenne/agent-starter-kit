---
name: superpowers
description: Toolkit de engenharia de software disciplinada para agentes (especificação, TDD e subagentes).
license: MIT
compatibility: generic
metadata:
  author: Jesse Vincent (@obra)
  revision: main
---

# Toolkit: superpowers

Fonte original: [`https://github.com/obra/superpowers`](https://github.com/obra/superpowers) (Jesse Vincent).

## Objetivo

Fornecer disciplina de engenharia sênior a agentes de IA através de fluxo estruturado: esclarecimento de requisitos, redação de especificação prévia, desenvolvimento guiado por testes (TDD) e coordenação de subagentes.

## Quando usar

- Ao desenvolver features de média/alta complexidade que necessitem de contrato explícito antes de codificar.
- Em tarefas onde o ciclo Red-Green-Refactor evita bugs de regressão.

## Procedimento

1. **Esclarecimento:** Antes de criar arquivos de código, defina o menor resultado útil e critérios de aceite.
2. **Especificação:** Crie o teste inicial que reproduz a ausência da funcionalidade (fase Red).
3. **Implementação:** Escreva a menor quantidade de código suficiente para fazer o teste passar (fase Green).
4. **Refatoração:** Limpe a estrutura preservando a aprovação dos testes.

