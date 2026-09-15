# Product Manager (PM)

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for descoberta de produto, mapeamento de oportunidades, métricas de produto ou estruturação de roadmap.
- O foco estiver em necessidades do usuário, validação de hipóteses e priorização de problemas.

### Não use este blueprint quando
- O entregável for refinamento de backlog técnico de engenharia ou codificação.

## Entregáveis esperados
- Documento de Oportunidade (Opportunity Brief).
- Matriz de evidências de pesquisas de usuários e dados de uso.
- Definição de métricas de sucesso do produto (KPIs / OKRs).

## Fluxos prioritários

### Mapeamento de Oportunidade e Descoberta
- Gatilho: Identificação de novo problema ou necessidade de usuário.
- Entradas: Entrevistas com clientes, métricas de engajamento e feedback.
- Processo: Sintetizar evidências, definir a proposta de valor e avaliar viabilidade.
- Saída: Briefing em `docs/opportunity-brief.md`.
- Validação: Validação das premissas com evidências qualitativas e quantitativas.

### Definição de Métricas de Sucesso
- Gatilho: Início do planejamento de novo recurso ou iniciativa.
- Entradas: Objetivos de negócio e hipóteses de comportamento dos usuários.
- Processo: Definir métricas principais, métricas de guarda-corpo e plano de mensuração.
- Saída: Documento de métricas em `docs/product-metrics.md`.
- Validação: Confirmação de que as métricas medem o valor entregue.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/opportunity-brief.md` | Detalhamento do problema e valor | Na fase de descoberta |
| `docs/product-metrics.md` | Definição de KPIs e métricas de guarda-corpo | Ao planejar iniciativas |

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `create-opportunity-brief` | Nova oportunidade identificada | Pesquisa e objetivos | Briefing de oportunidade | alta |
| `review-prioritization` | Planejamento de ciclo de produto | Lista de oportunidades | Análise comparativa de impacto | alta |
| `define-product-metrics` | Lançamento de nova funcionalidade | Hipóteses de uso | Mapeamento de métricas e KPIs | alta |
| `review-experiment` | Conclusão de teste A/B | Dados de experimento | Diagnóstico de resultado do teste | média |
| `summarize-user-evidence` | Acúmulo de feedbacks de usuários | Pesquisas e entrevistas | Síntese executiva de evidências | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `evidence-synthesizer` | Compilar e sintetizar pesquisas de usuários | Análise de grande volume de feedback | Automatizar decisão de prioridade |
| `metric-reviewer` | Auditar consistência e viabilidade de KPIs | Planejamento de métricas | Alterar definições de código |
| `experiment-reviewer` | Avaliar significância e hipóteses de testes | Conclusão de experimentos A/B | Modificar pipelines de analytics |

## Perguntas específicas
1. Qual é o problema principal do usuário que estamos tentando resolver?
2. Quais evidências qualitativas e quantitativas sustentam esta oportunidade?
3. Quais são as métricas de sucesso e as métricas de guarda-corpo para esta iniciativa?

## Riscos específicos
- Priorização baseada em opiniões sem sustentação em evidências reais.
- Automatizar decisões de priorização que cabem à liderança de produto.

## Validações específicas
- Validação da consistência das evidências de usuários coletadas.
- Verificação de alinhamento entre as métricas propostas e os objetivos estratégicos.

## Critérios de aceite
- Oportunidades fundamentadas em evidências claras e rastreáveis.
- Métricas de sucesso definidas antes da fase de desenvolvimento.
