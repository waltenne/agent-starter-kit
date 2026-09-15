# Data Science

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for análise de dados, modelo preditivo, pipeline de amostragem ou relatório exploratório (EDA).
- O trabalho envolver experimentos estatísticos, validação de hipóteses ou avaliação de métricas.

### Não use este blueprint quando
- O entregável for um produto web transacional ou automação pura de infraestrutura.

## Entregáveis esperados
- Relatório de perfilamento e qualidade de dados.
- Código de pipeline de transformação de dados limpo e reprodutível.
- Avaliação estatística de modelo ou experimento com métricas claras.

## Fluxos prioritários

### Análise Exploratória e Perfilamento
- Gatilho: Recebimento de novo conjunto de dados ou problema analítico.
- Esforço estimado: 15 a 30 minutos.
- Entradas: Dataset bruto, dicionário de dados e perguntas de negócio.
- Processo: Inspecionar tipos de dados, valores ausentes, distribuições e inconsistências.
- Saída: Relatório estatístico de qualidade do dataset.
- Validação: Verificação de cobertura e nulos no conjunto de dados.

### Validação de Experimento e Modelo
- Gatilho: Conclusão de treinamento ou ajuste de modelo estatístico.
- Esforço estimado: 20 a 40 minutos.
- Entradas: Código de treinamento, conjunto de teste e métricas alvo.
- Processo: Executar avaliação de baseline, verificar vazamento de dados (data leakage) e validar sementes aleatórias.
- Saída: Relatório de métricas de desempenho e reprodutibilidade.
- Validação: Re-execução da pipeline com semente fixada produzindo resultados idênticos.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/data-profile.md` | Diagnóstico de integridade do dataset | Ao receber novos dados |
| `reports/experiment-summary.md` | Resultados estatísticos do modelo | Ao finalizar validação de hipótese |

## Exemplos preenchidos de artefatos

### Exemplo: `docs/data-profile.md`

```markdown
# Relatorio de Perfilamento de Dados

## Resumo do Dataset
- Total de registros: 50.000 linhas
- Total de colunas: 12 variaveis (8 numericas, 4 categoricas)
- Data da amostragem: 2026-09-15

## Diagnostico de Qualidade
- Valores nulos: 1.2% na coluna `user_age` (imputacao mediana recomendada).
- Duplicadas: 0 registros duplicados encontrados.
- Inconsistencias: Coluna `signup_date` possui 5 datas com formato invalido.

## Recomendacoes
- Remover registros com datas invalidas antes do treino.
```

### Exemplo: `reports/experiment-summary.md`

```markdown
# Resumo de Experimento de Modelo

## Configuracao do Modelo
- Algoritmo: Random Forest Classifier
- Semente Aleatoria: `42`
- Split Treino/Teste: 80% / 20%

## Metricas de Desempenho
- Acuracia: 0.89
- Precisao: 0.86
- Revocacao (Recall): 0.84
- ROC-AUC: 0.92

## Conclusao
O modelo supera a baseline de regras em +12% de F1-Score sem evidencias de overfitting.
```

## Quando abortar
- Deteccao de data leakage entre os conjuntos de treino e validacao/teste.
- Presenca de dados pessoais identificaveis (PII) sem anonimizacao no dataset.
- Resultados nao reprodutiveis apos fixacao de sementes aleatorias e dependencias.

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `profile-dataset` | Ingestão de novos dados | Conjunto de dados ou amostra | Relatório de integridade e nulos | alta |
| `review-experiment` | Conclusão de treino de modelo | Métricas e hiperparâmetros | Avaliação de baseline e viés | alta |
| `check-reproducibility` | Alteração na pipeline de ML/EDA | Script de execução e sementes | Confirmação de reprodutibilidade | alta |
| `generate-analysis-report` | Finalização de estudo exploratório | Resultados analíticos | Documentação executiva clara | média |
| `validate-data-quality` | Alteração no esquema de dados | Esquema e regras de validação | Diagnóstico de inconsistências | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `data-quality-reviewer` | Verificar vazamento de dados e nulos | Ingestão ou preparação de dados | Decidir modelo de produção |
| `experiment-reviewer` | Auditar baselines e métricas estatísticas | Conclusão de validação de modelos | Alterar infraestrutura |
| `reproducibility-reviewer` | Validar sementes aleatórias e pipelines | Revisão de scripts de análise | Modificar datasets brutos |
| `statistical-method-reviewer` | Avaliar rigor de testes estatísticos | Hipóteses complexas ou amostragem | Escrever código de produção web |

## Perguntas específicas
1. Quais métricas e baselines definem o sucesso da análise ou modelo?
2. Como a reprodutibilidade dos experimentos é garantida (sementes, dados de teste)?
3. Existem restrições de privacidade ou dados sensíveis no dataset?

## Riscos específicos
- Vazamento de dados (data leakage) entre conjuntos de treino e teste.
- Conclusões estatísticas fundamentadas em amostras enviesadas ou não representativas.

## Validações específicas
- Verificação de sementes aleatórias e determinismo de pipelines.
- Sanitize de dados pessoais ou confidenciais nas saídas de visualização.

## Critérios de aceite
- Pipelines de análise executam de forma reproduzível com resultados idênticos.
- Nenhum dado pessoal ou sensível exposto em visualizações ou logs.
