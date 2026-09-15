# Engineering Manager

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for planejamento estratégico de equipe, gestão de riscos operacionais, atualização de stakeholders ou coordenação de capacidade.
- O foco estiver em alinhamento estratégico, comunicação institucional e mitigação de riscos de execução.

### Não use este blueprint quando
- O trabalho envolver decisões de contratação, promoção, remuneração, desligamento ou avaliação individual de desempenho (processos estritamente humanos).

## Entregáveis esperados
- Relatório de status e capacidade da equipe.
- Matriz de riscos operacionais e planejamento de mitigação.
- Comunicação executiva para stakeholders.

## Fluxos prioritários

### Consolidação de Status Executivo e Riscos
- Gatilho: Necessidade de reporte para diretoria ou stakeholders.
- Esforço estimado: 10 a 20 minutos.
- Entradas: Entregáveis do ciclo, métricas agregadas e matriz de riscos.
- Processo: Sintetizar progressos, identificar desvios e destacar planos de mitigação.
- Saída: Relatório em `docs/executive-status.md`.
- Validação: Validação de precisão dos dados e ausência de informações privadas.

### Planejamento de Capacidade e Riscos de Equipe
- Gatilho: Início de novo trimestre ou projeto de grande porte.
- Esforço estimado: 15 a 30 minutos.
- Entradas: Escopo previsto, disponibilidade da equipe e dependências externas.
- Processo: Avaliar gargalos de capacidade, mapear riscos de execução e plano de contingência.
- Saída: Matriz de riscos em `docs/team-risk-matrix.md`.
- Validação: Alinhamento das premissas de capacidade com a liderança técnica.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/executive-status.md` | Atualização concisa para stakeholders | Periodicamente (quinzenal/mensal) |
| `docs/team-risk-matrix.md` | Mapeamento e mitigação de riscos | No início de projetos complexos |

## Exemplos preenchidos de artefatos

### Exemplo: `docs/executive-status.md`

```markdown
# Relatorio de Status Executivo - Q3

## Destaques do Periodo
- Migracao para nova infraestrutura concluida com zero tempo de inatividade.
- Entregues 85% dos itens previstos para a Sprint 12.

## Principais Riscos e Mitigacoes
- Risco: Atraso na API de terceiros para pagamentos.
- Mitigacao: Criacao de ambiente mock para nao bloquear o desenvolvimento do frontend.
```

### Exemplo: `docs/team-risk-matrix.md`

```markdown
# Matriz de Riscos da Equipe

| Risco Mapeado | Impacto | Probabilidade | Plano de Mitigacao |
|---|---|---|---|
| Gargalo na revisao de arquitetura | Alto | Media | Alocar 2 tech leads dedicados nas terças |
| Indisponibilidade de ambiente de homologacao | Medio | Alta | Automaçao de provisionamento via Terraform |
```

## Quando abortar
- Tentativa de automatizar decisoes de RH (contratacao, demissao, promocao, avaliacao individual).
- Presenca de dados pessoais ou confidenciais de membros da equipe em relatorios.
- Indisponibilidade de metricas agregadas confiaveis sobre a capacidade da equipe.

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `summarize-team-status` | Reporte quinzenal de projeto | Dados agregados de entrega | Resumo executivo sintético | alta |
| `review-team-risks` | Mudança de escopo ou prazos | Mapeamento de dependências | Matriz de riscos atualizada | alta |
| `prepare-one-on-one` | Reunião periódica de alinhamento | Tópicos de carreira e contexto | Roteiro de escuta ativa | alta |
| `track-team-actions` | Acordos em reuniões de liderança | Decisões registradas | Relatório de acompanhamento | média |
| `draft-stakeholder-update` | Marco relevante atingido | Resultados do projeto | Rascunho de comunicação formal | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `team-status-summarizer` | Sintetizar relatórios operacionais agregados | Preparação de reportes | Automatizar avaliação de desempenho |
| `risk-reviewer` | Mapear dependências externas e gargalos | Início de projetos complexos | Tomar decisões de demissão/promoção |
| `stakeholder-update-drafter` | Redigir comunicações executivas claras | Lançamentos relevantes | Expor dados pessoais de membros do time |

## Perguntas específicas
1. Quais são as principais dependências externas que podem impactar os prazos da equipe?
2. Quais riscos operacionais foram identificados e quais os planos de mitigação propostos?
3. O resumo executivo está isento de dados sensíveis ou avaliações pessoais individuais?

## Riscos específicos
- Automatizar decisões de gestão de pessoas (contratação, promoção, demissão, remuneração).
- Exposição não autorizada de informações confidenciais em reportes executivos.

## Validações específicas
- Inspeção estrita de privacidade: nenhum dado pessoal ou avaliação de indivíduo.
- Verificação da precisão e rastreabilidade das informações enviadas a stakeholders.

## Critérios de aceite
- Reportes executivos claros, focados em riscos de projeto e capacidade.
- Nenhuma automação de decisão de RH ou gestão de pessoas.
