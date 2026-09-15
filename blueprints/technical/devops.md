# DevOps

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for autoria de pipelines CI/CD, IaC (Infraestrutura como Código), observabilidade ou scripts de operações.
- O foco estiver em confiabilidade de entrega, automação de build/deploy ou gestão de ambientes.

### Não use este blueprint quando
- O entregável for criação de regras de negócio de aplicação ou análise estatística de dados.

## Entregáveis esperados
- Scripts ou configurações de pipeline CI/CD validados.
- Modelos de infraestrutura como código (IaC) limpos.
- Plano de rollback e estratégias de observabilidade de ambiente.

## Fluxos prioritários

### Revisão de Pipeline de Integração Contínua
- Gatilho: Criação ou atualização de etapas de CI/CD.
- Entradas: Arquivo de definição de pipeline, scripts de build e segredos configurados.
- Processo: Inspecionar etapas de build, cache, permissões e tratamento de falhas.
- Saída: Configuração de pipeline otimizada e sem segredos expostos.
- Validação: Validação sintática do arquivo de pipeline e teste de execução local.

### Elaboração de Plano de Infraestrutura e Rollback
- Gatilho: Alterações de infraestrutura como código ou processo de release.
- Entradas: Especificações de ambiente, ferramentas IaC e requisitos de alta disponibilidade.
- Processo: Mapear recursos, validar reversibilidade de mudanças e estruturar rollback.
- Saída: Especificação IaC acompanhada de documento de rollback.
- Validação: Simulação de alteração (dry-run/plan) sem aplicação direta.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/rollback-plan.md` | Procedimento de reversão de emergência | Antes de alterar infraestrutura ou release |
| `docs/observability.md` | Mapeamento de métricas e alertas | Ao configurar novos ambientes |

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `review-ci-pipeline` | Alteração em fluxo de CI/CD | Definição do pipeline | Relatório de segurança e performance | alta |
| `triage-incident-evidence` | Falha em ambiente ou pipeline | Logs de execução e métricas | Diagnóstico de causa raiz de incidente | alta |
| `verify-deployment-readiness` | Preparação para nova versão | Artefatos e checklists | Confirmação de prontidão de deploy | alta |
| `review-infrastructure-plan` | Mudança em arquivos IaC | Diff de código IaC | Análise de impacto e riscos | média |
| `verify-rollback-plan` | Planejamento de implantação | Procedimento de reversão | Validação do plano de rollback | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `pipeline-reviewer` | Auditar segurança e eficiência de CI/CD | Alterações em scripts de integração | Modificar código de aplicação |
| `incident-evidence-collector` | Coletar logs e evidências de falhas | Incidentes em automações de deploy | Alterar permissões em nuvem |
| `observability-reviewer` | Validar alertas e telemetria de ambiente | Configuração de novos serviços | Executar migração de banco |
| `infrastructure-plan-reviewer` | Auditar planos de infraestrutura como código | Alterações de recursos em IaC | Executar comandos destrutivos |

## Perguntas específicas
1. Qual é o mecanismo de rollback confirmado em caso de falha de deploy?
2. Quais segredos ou variáveis sensíveis estão presentes nas etapas de build?
3. O plano de alteração de infraestrutura foi validado em modo simulação (plan/dry-run)?

## Riscos específicos
- Exposição não intencional de credenciais em logs de integração contínua.
- Implantação de alterações irreversíveis de infraestrutura sem plano de rollback.

## Validações específicas
- Simulação (dry-run / plan) de scripts de infraestrutura como código.
- Inspeção estática de arquivos de pipeline para prevenção de vazamento de segredos.

## Critérios de aceite
- Pipelines e scripts de automação são válidos e idempotentes.
- Plano de rollback documentado e testado antes de qualquer alteração de produção.
