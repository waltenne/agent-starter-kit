# Technical Product Owner (TPO)

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for refinamento técnico de histórias de usuário, critérios de aceite detalhados, dependências de arquitetura e trade-offs técnicos.
- O foco estiver em traduzir requisitos de produto em especificações executáveis para engenharia.

### Não use este blueprint quando
- O entregável for descoberta de produto estratégica de alto nível ou implementação direta de código.

## Entregáveis esperados
- Backlog refinado com histórias de usuário e critérios de aceite técnicos.
- Mapeamento de dependências técnicas e riscos de integração.
- Matriz de trade-offs técnicos para auxílio na tomada de decisão.

## Fluxos prioritários

### Refinamento Técnico e Critérios de Aceite
- Gatilho: Entrada de novos requisitos de produto para ciclo de desenvolvimento.
- Esforço estimado: 15 a 30 minutos.
- Entradas: Visão da funcionalidade, restrições de arquitetura e contratos de API.
- Processo: Especificar regras de borda, contratos de dados, falhas esperadas e critérios de aceite.
- Saída: Histórias refinadas em `docs/technical-backlog.md`.
- Validação: Validação de clareza e completude com a equipe de engenharia.

### Análise de Dependências e Trade-Offs
- Gatilho: Identificação de conflito ou dependência técnica entre módulos.
- Esforço estimado: 15 a 30 minutos.
- Entradas: Arquitetura atual, estimativas de esforço e limitações de componentes.
- Processo: Analisar alternativas técnicas, listar prós/contras e mapear dependências.
- Saída: Relatório de trade-offs em `docs/technical-tradeoffs.md`.
- Validação: Parecer técnico alinhado com as diretrizes de arquitetura.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/technical-backlog.md` | Especificação técnica de histórias e aceite | Antes da sprint de implementação |
| `docs/technical-tradeoffs.md` | Análise comparativa de alternativas técnicas | Em decisões complexas de engenharia |

## Exemplos preenchidos de artefatos

### Exemplo: `docs/technical-backlog.md`

```markdown
# Backlog Tecnico - Historia US-104

## Titulo
Implementacao de Rate Limiting na API Publica.

## Critarios de Aceite Tecnicos
- Retornar status HTTP `429 Too Many Requests` quando limite excedido (100 req/min por IP).
- Cabecalho `X-RateLimit-Remaining` deve ser enviado em todas as respostas HTTP.
- Armazenar contadores de requisicoes em cache Redis com TTL de 60 segundos.
```

### Exemplo: `docs/technical-tradeoffs.md`

```markdown
# Matriz de Trade-offs Tecnicos: Armazenamento de Sessao

| Opcao | Pros | Contras | Recomendacao |
|---|---|---|---|
| JWT Stateless | Sem consumo de memoria no servidor | Impossibilidade de revogacao imediata | Nao recomendada |
| Redis Centralizado | Revogacao instantanea e alta velocidade | Dependencia de servico externo | Recomendada |
```

## Quando abortar
- Requisitos de historia com criterios de aceite ambiguos ou incompletos.
- Dependencias tecnicas nao resolvidas que bloqueiem a arquitetura principal.
- Divergencia critica de arquitetura sem consenso entre os lideres tecnicos.

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `review-acceptance-criteria` | Escrita de nova história | Rascunho da história | Critérios de aceite sem ambiguidade | alta |
| `analyze-technical-dependencies` | Início de grande funcionalidade | Arquitetura e módulos | Grafo e riscos de dependências | alta |
| `review-release-readiness` | Encerramento de ciclo técnico | Lista de débitos e aceite | Checklist de prontidão técnica | alta |
| `check-backlog-quality` | Prévia de refinamento | Itens do backlog | Relatório de qualidade do backlog | média |
| `summarize-technical-tradeoffs` | Impasse em escolha técnica | Propostas concorrentes | Matriz comparativa de trade-offs | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `acceptance-criteria-reviewer` | Verificar completude e clareza de critérios | Refinamento de histórias | Escrever testes automatizados |
| `dependency-analyzer` | Mapear acoplamento e riscos entre APIs | Planejamento de alterações de código | Modificar código fonte |
| `tradeoff-summarizer` | Estruturar matrizes comparativas de opções | Impasses de decisão de arquitetura | Decidir pelo time de liderança |

## Perguntas específicas
1. Quais são as restrições não funcionais (desempenho, segurança, escalabilidade) da história?
2. Quais APIs, contratos ou dependências técnicas precisam ser modificados?
3. Quais são as regras de tratamento de erros e exceções esperadas no aceite?

## Riscos específicos
- Critérios de aceite ambíguos que geram retrabalho na fase de testes.
- Subestimar dependências técnicas entre módulos ou serviços legados.

## Validações específicas
- Verificação de rastreabilidade entre requisitos de produto e aceite técnico.
- Análise de completude nos cenários de exceção das histórias de usuário.

## Critérios de aceite
- Histórias de usuário contêm critérios de aceite testáveis e sem ambiguidades.
- Dependências técnicas mapeadas e alinhadas com a arquitetura.
