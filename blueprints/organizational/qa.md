# Quality Assurance (QA)

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for plano de testes, estratégia de garantia de qualidade, triagem de defeitos ou avaliação de release.
- O foco estiver em confiabilidade, regressão, reprodutibilidade de falhas e cobertura de testes.

### Não use este blueprint quando
- O entregável for o desenvolvimento inicial da aplicação ou gestão de pessoas.

## Entregáveis esperados
- Plano de testes cobrindo requisitos funcionais e não funcionais.
- Relatório de triagem e reprodução de defeitos.
- Parecer de prontidão de release (release readiness).

## Fluxos prioritários

### Elaboração de Plano de Testes
- Gatilho: Início de ciclo de teste para nova funcionalidade ou release.
- Entradas: Especificação de requisitos, arquitetura e histórias de usuário.
- Processo: Mapear cenários de teste, dados de teste, riscos e tipos de testes (unitário, integração, e2e).
- Saída: Plano de testes em `docs/test-plan.md`.
- Validação: Matriz de rastreabilidade entre requisitos e cenários de teste.

### Triagem e Reprodução de Defeito
- Gatilho: Reporte de bug ou falha detectada durante a execução.
- Entradas: Descrição da falha, passos para reprodução e logs de sistema.
- Processo: Isolar ambiente, executar passos mínimos de reprodução e identificar causa provável.
- Saída: Relatório de defeito com passos determinísticos e logs anexados.
- Validação: Confirmação de reprodução consistente da falha.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/test-plan.md` | Estratégia e escopo de testes do projeto | No início de cada versão |
| `docs/bug-triage-report.md` | Registro de reprodução de defeitos | Ao identificar bugs críticos |

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `create-test-plan` | Início de novo ciclo de testes | Requisitos do projeto | Plano de testes estruturado | alta |
| `triage-defect` | Reporte de erro não confirmado | Passos e logs de erro | Relatório de reprodução detalhado | alta |
| `select-regression-scope` | Alteração em módulo existente | Diff de código | Escopo otimizado de teste regressivo | alta |
| `review-accessibility` | Avaliação de conformidade UI | Telas e componentes | Diagnóstico de falhas de acessibilidade | média |
| `assess-release-readiness` | Preparação para publicação | Resultados da suíte de teste | Parecer de prontidão de release | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `test-strategy-reviewer` | Validar cobertura e matriz de testes | Planejamento de suítes de teste | Escrever código de produto |
| `defect-reproducer` | Isolar e reproduzir falhas reportadas | Triagem de relatórios de bugs | Corrigir defeitos no fonte |
| `regression-scope-reviewer` | Mapear escopo afetado por refatorações | Mudanças estruturais de código | Aprovar deploys em produção |
| `release-readiness-reviewer` | Auditar critérios de aceite e bloqueadores | Avaliação de término de sprint | Alterar prioridade do backlog |

## Perguntas específicas
1. Quais são os cenários críticos e caminhos de exceção que precisam de testes automatizados?
2. Como os dados de teste sintéticos serão gerados sem expor informações sensíveis?
3. Quais são os critérios de bloqueio de release (showstoppers)?

## Riscos específicos
- Falsos positivos ou testes flaky que mascaram defeitos reais.
- Ausência de testes de regressão em componentes compartilhados do sistema.

## Validações específicas
- Execução determinística de testes em ambiente isolado.
- Inspeção de evidências e logs de execução para validação dos resultados.

## Critérios de aceite
- Todos os testes funcionais críticos passam sem falhas ocultas.
- Parecer de release emitido com evidências claras de execução.
