# Content Creator

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for conteúdo editorial, artigos técnicos, documentação, posts de blog ou material publicitário.
- O foco estiver em redação, tom de voz, clareza, fontes e acessibilidade do texto.

### Não use este blueprint quando
- O entregável principal for implementação de software, APIs ou pipelines de dados.

## Entregáveis esperados
- Briefing editorial alinhado aos objetivos de comunicação.
- Artigo ou documento redigido com revisão técnica e estilística.
- Checklist de verificação de fontes, fatos e acessibilidade de conteúdo.

## Fluxos prioritários

### Elaboração de Briefing Editorial
- Gatilho: Necessidade de nova publicação ou documento técnico.
- Esforço estimado: 10 a 20 minutos.
- Entradas: Público-alvo, objetivo de comunicação, tom de voz e diretrizes.
- Processo: Definir tese principal, tópicos chave, fontes de pesquisa e estrutura.
- Saída: Documento de briefing em `docs/editorial-brief.md`.
- Validação: Alinhamento com os objetivos de comunicação definidos.

### Revisão e Adaptação de Tom
- Gatilho: Finalização da primeira versão de rascunho de conteúdo.
- Esforço estimado: 10 a 20 minutos.
- Entradas: Rascunho do texto, guia de estilo e fontes citadas.
- Processo: Inspecionar clareza, tom de voz, veracidade das fontes e formatação.
- Saída: Conteúdo revisado e pronto para publicação.
- Validação: Verificação estrita de ausência de plágio e validação de links citados.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `docs/editorial-brief.md` | Diretrizes e estrutura de conteúdo | Antes de iniciar a redação |
| `docs/style-guide.md` | Guia de estilo e tom de voz | Na configuração do projeto editorial |

## Exemplos preenchidos de artefatos

### Exemplo: `docs/editorial-brief.md`

```markdown
# Briefing Editorial - Guia de Agentes de IA

## Publico-Alvo
Desenvolvedores de software e arquitetos de sistemas de nivel pleno/senior.

## Objetivo
Explicar a diferenca entre arquiteturas mono-agente e multi-agente com exemplos praticos.

## Estrutura do Artigo
1. Introducao: A evolucao dos assistentes para agentes autonomos.
2. Conceito de Mono-agente vs Multi-agente.
3. Casos de Uso Praticos e padroes de projeto.
4. Conclusao e proximos passos.
```

### Exemplo: `docs/style-guide.md`

```markdown
# Guia de Estilo de Conteudo

## Tom de Voz
- Tecnico, objetivo, pragmatico e acessivel.
- Evitar linguagem bajuladora, exagero de adjetivos e travessoes (em dashes).

## Formatacao
- Utilizar GitHub Flavored Markdown padrao.
- Titulos curtos e hierarquia clara (H1 para titulo, H2 para secoes, H3 para subsecoes).
- Codigos em blocos cercados com especificacao da linguagem (`ts`, `bash`, `python`).
```

## Quando abortar
- Identificacao de plagio ou trechos copiados de fontes nao autorizadas.
- Presenca de afirmacoes faticas sem comprovacao ou fontes confiaveis.
- Incompatibilidade direta com o guia de tom de voz ou valores institucionais.

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `create-editorial-brief` | Solicitação de novo conteúdo | Requisitos e público-alvo | Briefing estruturado | alta |
| `review-content` | Conclusão de rascunho de texto | Texto em Markdown | Relatório de clareza e gramática | alta |
| `adapt-content-tone` | Mudança de canal de publicação | Texto e tom de voz alvo | Texto adaptado ao novo público | alta |
| `check-content-accessibility` | Preparação para publicação | Artigo ou documento | Diagnóstico de acessibilidade de leitura | média |
| `verify-content-sources` | Inclusão de fatos ou citação | Links e afirmações no texto | Relatório de checagem de fontes | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `source-verifier` | Checar procedência e validade de citações | Artigos que citam fontes externas | Redigir opiniões do autor |
| `copy-editor` | Revisar gramática, tom de voz e fluidez | Rascunhos concluídos | Alterar fatos técnicos |
| `accessibility-reviewer` | Avaliar legibilidade e contraste de mídia | Publicações finais | Publicar conteúdo diretamente |
| `content-structure-reviewer` | Auditar hierarquia de tópicos e cabeçalhos | Documentação extensa | Alterar o idioma original |

## Perguntas específicas
1. Qual é o público-alvo principal e o tom de voz desejado?
2. Quais são as fontes primárias autorizadas para fundamentar as afirmações do texto?
3. O conteúdo requer formatação de acessibilidade (ex.: descrição de imagens)?

## Riscos específicos
- Citação de fontes não verificadas ou dados imprecisos no conteúdo final.
- Inconsistência no tom de voz entre diferentes capítulos ou artigos.

## Validações específicas
- Checagem estrita de links externos para evitar referências quebradas.
- Validação de alt-text em imagens e estrutura de cabeçalhos H1-H4.

## Critérios de aceite
- Conteúdo revisado sem erros ortográficos e com fontes devidamente citadas.
- Estrutura de tópicos clara e acessível para o leitor.
