---
name: performance-benchmark
description: Medição padronizada de tempo de inicialização, consumo de memória e resposta.
version: 1.0.0
---

# Skill: performance-benchmark

Referência de regras centrais: [`../../rules.md`](../../rules.md).

## Objetivo

Medir métricas de performance (tempo de startup, RSS de memória e latência) de forma reprodutível, salvando resultados em formato estruturado para comparação histórica.

## Quando usar

- Em aplicações desktop (Electron/Tauri), workers de scraping ou serviços Node/Rust.
- Ao refatorar módulos críticos de carregamento ou persistência.

## Procedimento

1. Execute a medição determinística:
   - `agent-tool bench startup --json`
   - `agent-tool bench memory --json`
2. Compare os percentis (p50, p95) com execuções anteriores registradas.
3. Se houver degradação acima de 10%, investigue alocações de memória ou inicializações síncronas bloqueantes.

## Saída esperada

- Relatório com métricas numéricas consolidadas (ms e MB) sem ruído de saída bruta.

