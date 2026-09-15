# Scrum Master (SM)

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for facilitação de dinâmicas ágeis, remoção de impedimentos, análise de fluxo de trabalho ou melhoria contínua da equipe.
- O foco estiver em saúde do processo, colaboração e acordos de trabalho.

### Não use este blueprint quando
- O entregável for avaliação de desempenho individual ou gestão de backlog de produto.

## Entregáveis esperados
- Plano e dinâmica de retrospectiva de equipe.
- Registro de impedimentos e plano de ação de remoção.
- Acordos de trabalho da equipe (Working Agreements) e mapeamento de fluxo.

## Fluxos prioritários

### Preparação e Facilitação de Retrospectiva
- Gatilho: Final de sprint ou ciclo de entrega.
- Entradas: Histórico do ciclo, métricas anônimas de processo e feedback da equipe.
- Processo: Definir formato da dinâmica, estruturar perguntas e mapear ações de melhoria.
- Saída: Plano de facilitação em `docs/retrospective-plan.md`.
- Validação: Confirmação de que a dinâmica promove a colaboração segura.

### Gestão e Remoção de Impedimentos
- Gatilho: Sinalização de bloqueio ou gargalo no fluxo de trabalho.
- Entradas: Descrição do impedimento, impacto no fluxo e responsáveis.
- Processo: Categorizar a causa raiz, definir plano de ação e acompanhar a resolução.
- Saída: Registro de impedimentos em `docs/impediment-log.md`.
- Validação: Acompanhamento da taxa de resolução de bloqueios.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/retrospective-plan.md` | Estrutura de dinâmicas de retrospectiva | Ao final de cada ciclo |
| `docs/impediment-log.md` | Mapeamento e status de bloqueios | Ao detectar impedimentos |

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `prepare-retrospective` | Fim de sprint ou entrega | Dados do ciclo e contexto | Roteiro de retrospectiva | alta |
| `track-impediments` | Notificação de bloqueio | Descrição do problema | Plano de ação de desbloqueio | alta |
| `review-team-flow` | Gargalos no fluxo de trabalho | Métricas de processo | Diagnóstico de gargalos | alta |
| `prepare-facilitation-plan` | Necessidade de alinhamento | Objetivo da reunião | Roteiro de facilitação | média |
| `track-improvement-actions` | Ações definidas em retro | Lista de ações | Relatório de acompanhamento | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `impediment-tracker` | Mapear e categorizar causa raiz de bloqueios | Identificação de impedimentos | Avaliar desempenho individual |
| `flow-reviewer` | Analisar gargalos no fluxo de entrega do time | Revisão de métricas de fluxo | Usar métricas para ranquear pessoas |
| `action-tracker` | Acompanhar a evolução das ações de melhoria | Pós-retrospectiva | Definir prioridades de produto |

## Perguntas específicas
1. Quais são os principais gargalos no fluxo de entrega atual da equipe?
2. Quais ações de melhoria das retrospectivas anteriores foram concluídas?
3. Existem bloqueios externos dependendo de outras equipes ou stakeholders?

## Riscos específicos
- Utilizar métricas de fluxo de processo de forma punitiva ou para ranquear pessoas.
- Foco em dinâmicas sem acompanhamento concreto das ações de melhoria geradas.

## Validações específicas
- Verificação de segurança psicológica e anonimato em feedbacks de retrospectiva.
- Acompanhamento estrito da evolução de ações de melhoria pactuadas.

## Critérios de aceite
- Retrospectivas geram ações de melhoria com responsáveis e prazos claros.
- Impedimentos mapeados e tratados sem exposição individual de membros da equipe.
