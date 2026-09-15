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
- Esforço estimado: 10 a 20 minutos.
- Entradas: Histórico do ciclo, métricas anônimas de processo e feedback da equipe.
- Processo: Definir formato da dinâmica, estruturar perguntas e mapear ações de melhoria.
- Saída: Plano de facilitação em `docs/retrospective-plan.md`.
- Validação: Confirmação de que a dinâmica promove a colaboração segura.

### Gestão e Remoção de Impedimentos
- Gatilho: Sinalização de bloqueio ou gargalo no fluxo de trabalho.
- Esforço estimado: 10 a 20 minutos.
- Entradas: Descrição do impedimento, impacto no fluxo e responsáveis.
- Processo: Categorizar a causa raiz, definir plano de ação e acompanhar a resolução.
- Saída: Registro de impedimentos em `docs/impediment-log.md`.
- Validação: Acompanhamento da taxa de resolução de bloqueios.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/retrospective-plan.md` | Estrutura de dinâmicas de retrospectiva | Ao final de cada ciclo |
| `docs/impediment-log.md` | Mapeamento e status de bloqueios | Ao detectar impedimentos |

## Exemplos preenchidos de artefatos

### Exemplo: `docs/retrospective-plan.md`

```markdown
# Plano de Retrospectiva - Sprint 14

## Formato da Dinâmica: Starfish (Continuar, Parar, Começar, Mais, Menos)
1. Abertura (5 min): Alinhamento do objetivo e seguranca psicologica.
2. Coleta de Notas (15 min): Escrita individual de pontos anonimos.
3. Agrupamento e Votacao (15 min): Priorizacao dos 3 temas principais.
4. Plano de Acao (20 min): Definicao de 2 acoes praticas com responsaveis.

## Acoes Prioritarias Alvo
- Melhorar a documentacao de contratos de API antes da sprint.
```

### Exemplo: `docs/impediment-log.md`

```markdown
# Registro de Impedimentos

| ID | Descricao do Bloqueio | Causa Raiz | Responsavel | Status |
|---|---|---|---|---|
| IMP-01 | Falta de acesso ao banco de homologacao | Permissao pendente no IAM | SM / DevOps | Em andamento |
| IMP-02 | Indefinicao no layout da tela de login | Design nao finalizado | SM / PO | Resolvido |
```

## Quando abortar
- Uso de metricas de processo para punicao ou ranqueamento individual de membros da equipe.
- Quebra de acordos de confidencialidade e seguranca psicologica nas retrospectivas.
- Impedimentos criticos sem responsavel nomeado ou sem prazo limite de acompanhamento.

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
