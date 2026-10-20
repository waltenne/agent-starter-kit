---
name: triage-test-failure
description: Triagem e diagnóstico de falhas em suítes de testes com filtragem de saída bruta.
version: 1.0.0
---

# Skill: triage-test-failure

Referência de regras centrais: [`../../rules.md`](../../rules.md).

## Objetivo

Identificar a causa raiz de testes falhando consumindo apenas sumários estruturados, evitando o despejo de centenas de linhas de logs no contexto.

## Quando usar

- Quando uma alteração resultar em regressão ou erro de teste.
- Antes de submeter código ou abrir pull requests.

## Procedimento

1. Execute a verificação de testes via `agent-tool`:
   - `agent-tool check test --json`
2. Analise o relatório estruturado retornado:
   - Quantidade de testes aprovados vs falhos.
   - Lista isolada de testes que falharam com mensagem de erro e arquivo exato.
3. Se a causa não for óbvia pelo trecho de falha isolado, solicite detalhes específicos:
   - `agent-tool check test --failed-only`
4. Isole o teste falho e execute apenas ele para confirmar a reprodução do erro.
5. Aplique a menor correção útil e valide novamente.

## Saída esperada

- Diagnóstico direto apontando arquivo, linha da asserção com falha e valor recebido vs esperado.

