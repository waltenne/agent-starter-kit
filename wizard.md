# Wizard de Configuração do Workspace

## Objetivo

Este wizard é um processo conversacional em Markdown para configurar um workspace agêntico compatível com múltiplos agentes de IA. Ele não é uma CLI executável. O agente deve ler [`rules.md`](rules.md) e [`compatibility.md`](compatibility.md) antes de agir, seguir o idioma escolhido pelo usuário, selecionar o adaptador do agente de IA e pedir confirmação explícita antes de gravar artefatos.

---

## Regras de Execução

1. A primeira pergunta deve ser **exclusivamente** sobre o idioma de comunicação da LLM.
2. A segunda pergunta deve ser sobre o idioma dos artefatos gerados.
3. A terceira pergunta deve ser sobre o agente de IA que será utilizado.
4. Faça **uma pergunta por mensagem** e aguarde cada resposta antes de prosseguir.
5. Realize no máximo **seis perguntas** ao longo de todo o diagnóstico inicial.
6. Se o usuário responder "ainda não sei" ou "outro", sugira o adaptador genérico ([`adapters/generic/README.md`](adapters/generic/README.md)).
7. Não carregue adaptadores desnecessários.
8. Não presuma que o agente informado suporta skills ou subagentes sem verificação (consulte a matriz em [`compatibility.md`](compatibility.md)).
9. Informe claramente quais recursos foram confirmados e quais não foram verificados.
10. Gere primeiro o workspace genérico e aplique o adaptador do agente somente após a aprovação do plano.
11. Peça confirmação explícita mostrando o plano de arquivos ou diff antes de qualquer gravação.

---

## Ordem Obrigatória do Fluxo

```text
Idioma da conversa
  → Idioma dos artefatos
  → Agente de IA escolhido
  → Objetivo do projeto
  → Menor resultado útil da versão inicial
  → Resumo e Proposta do Plano
  → Confirmação Explícita
  → Geração da Camada Agnóstica
  → Aplicação do Adaptador do Agente
  → Validação Estrutural
```

---

## Perguntas Obrigatórias do Diagnóstico

### Rodada 1 (Primeira Pergunta Obrigatória):
> Qual idioma você deseja que eu use para me comunicar com você durante todo este processo?

Exemplos de opções:
- Português do Brasil (`pt-BR`)
- Português de Portugal (`pt-PT`)
- Inglês (`en`)
- Espanhol (`es`)
- Outro idioma

---

### Rodada 2 (Segunda Pergunta):
> Em qual idioma os arquivos gerados devem ser escritos?

Exemplos de opções:
- Português do Brasil (`pt-BR`)
- Inglês (`en`)
- Espanhol (`es`)
- Mesmo idioma da conversa

---

### Rodada 3 (Terceira Pergunta):
> Qual agente de IA você pretende usar neste workspace?

Opções disponíveis:
- Claude Code
- Codex
- Cursor
- Windsurf
- GitHub Copilot
- Agente local (ex.: Ollama, LM Studio, vLLM)
- Outro
- Ainda não sei (Utilizar Adaptador Genérico)

---

### Rodada 4 (Quarta Pergunta):
> Qual é o objetivo principal do projeto ou entregável deste workspace?

---

### Rodada 5 (Quinta Pergunta):
> Qual é o menor resultado útil esperado para a versão inicial do workspace?

---

## Seleção do Adaptador do Agente

Após a resposta da Rodada 3, consulte o repositório em `adapters/` para carregar as convenções do agente:

| Agente Escolhido | Adaptador a Carregar |
| --- | --- |
| Agente Genérico / Ainda não sei / Outro | [`adapters/generic/README.md`](adapters/generic/README.md) |
| Claude Code | [`adapters/claude-code/README.md`](adapters/claude-code/README.md) |
| OpenAI Codex | [`adapters/codex/README.md`](adapters/codex/README.md) |
| Cursor Editor | [`adapters/cursor/README.md`](adapters/cursor/README.md) |
| Windsurf IDE | [`adapters/windsurf/README.md`](adapters/windsurf/README.md) |
| GitHub Copilot | [`adapters/github-copilot/README.md`](adapters/github-copilot/README.md) |
| Agente Local | [`adapters/local-agent/README.md`](adapters/local-agent/README.md) |

---

## Seleção de blueprint

1. Leia [`rules.md`](rules.md).
2. Faça as perguntas gerais.
3. Escolha um blueprint primário pelo objetivo principal.
4. Carregue somente o blueprint primário.
5. Carregue blueprints secundários apenas quando justificado.
6. Use as skills candidatas do blueprint como sugestões.
7. Não crie skills nem subagentes automaticamente.
8. Peça confirmação antes de criar qualquer skill ou subagente.
9. Informe por que cada artefato foi proposto.

O blueprint define possibilidades do domínio. Ele não obriga a criação de qualquer skill, subagente ou artefato. Proponha somente o que for justificado pelas respostas do usuário.

| Trabalho Principal | Blueprint Primário |
| --- | --- |
| Web, Frontend, Backend, APIs ou Full-stack | [`blueprints/technical/web-dev.md`](blueprints/technical/web-dev.md) |
| Dados, análises, IA/ML ou modelos | [`blueprints/technical/data-science.md`](blueprints/technical/data-science.md) |
| DevOps, Infraestrutura, CI/CD ou Operações | [`blueprints/technical/devops.md`](blueprints/technical/devops.md) |
| Conteúdo editorial, mídia ou artigos | [`blueprints/content/content-creator.md`](blueprints/content/content-creator.md) |
| Garantia da Qualidade, testes ou QA | [`blueprints/organizational/qa.md`](blueprints/organizational/qa.md) |
| Gestão de Produto, descoberta ou roadmap | [`blueprints/organizational/pm.md`](blueprints/organizational/pm.md) |
| Technical Product Owner / backlog técnico | [`blueprints/organizational/tpo.md`](blueprints/organizational/tpo.md) |
| Scrum Master, facilitação ou fluxo | [`blueprints/organizational/sm.md`](blueprints/organizational/sm.md) |
| Liderança, pessoas ou coordenação | [`blueprints/organizational/manager.md`](blueprints/organizational/manager.md) |

---

## Fluxo de Proposta e Geração

1. **Apresentar o Resumo**: Informe o idioma da conversa, idioma dos artefatos, agente escolhido, blueprint selecionado e plano de arquivos a serem criados.
2. **Pedir Confirmação Explícita**: Aguarde o aceite do usuário antes de criar ou modificar qualquer arquivo.
3. **Gerar Workspace Agnóstico**:
   - `AGENTS.md` (utilizando [`templates/workspace-template/AGENTS.md`](templates/workspace-template/AGENTS.md))
   - `.agents/skills/` e `.agents/subagents/` (conforme aprovados)
   - `.agents/memory/index.md`
   - `docs/` e estrutura inicial de código em `src/` (conforme templates)
4. **Aplicar Adaptador**: Ajustar convenções específicas do agente (ex.: `.cursorrules`, `CLAUDE.md`, `.windsurfrules` ou `.github/copilot-instructions.md`).
5. **Validar**: Executar `bash scripts/validate.sh` e apresentar o relatório final.
