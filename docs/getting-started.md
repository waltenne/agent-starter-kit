# Guia de Início Rápido (Getting Started)

Este guia apresenta os conceitos fundamentais do `agent-starter-kit` em linguagem simples e prática.

---

## 1. Princípio Arquitetural

O kit opera sob a hierarquia:

```text
SCRIPT  -> executa tarefas mecânicas e determinísticas sem gastar tokens (tools/agent-tool)
SKILL   -> ensina procedimentos e padrões reutilizáveis (.agents/skills/)
AGENT   -> decide, implementa e coordena (T0 direto, T1 worker, T2 implementer)
ADVISOR -> resolve exceções complexas, arquitetura e riscos (T3 deep)
```

**Regra de ouro:** se uma tarefa pode ser resolvida de forma confiável por um script ou comando local, ela não deve consumir tokens de LLM.

---

## 2. Conceitos Centrais

### O que é um Agente de IA
Um assistente de código capaz de ler arquivos, executar comandos e auxiliar na construção de projetos. Ele segue instruções em Markdown para entender como trabalhar no seu repositório.

### O que é um Workspace
O diretório configurado onde seu projeto reside, contendo código-fonte, testes e documentação. Ele possui um arquivo central de regras ([`rules.md`](../rules.md) e `AGENTS.md`) que orienta a IA.

### O que é uma Skill
Um procedimento modular e padronizado baseado na [Agent Skills Specification](https://agentskills.io/). Cada skill reside em `.agents/skills/<nome>/SKILL.md` e possui gatilhos, passos definidos e saídas previsíveis.

### O que é um Toolkit
Uma suíte composta de skills e workflows integrados que trabalham em conjunto (ex.: Superpowers para TDD e especificação, Upstack para Red-Green-Refactor).

### O que é uma Integração
Uma ponte para ferramentas executáveis externas ou servidores de protocolo MCP (ex.: AI Memory para persistência em SQLite FTS5 ou Prism Coder).

### O que é um Subagente
Um papel delegado especializado para resolver uma tarefa isolada. Classificado em **Worker** (T1 - FAST), **Implementer** (T2 - BALANCED) e **Advisor** (T3 - DEEP).

---

## 3. Duas Formas de Iniciar

1. **Via CLI Determinística (Recomendado para velocidade):**
   ```bash
   ./tools/agent-tool setup /caminho/do/projeto --json
   ```
   Detecta a stack automaticamente, instala os subagentes e skills recomendadas e configura o `AGENTS.md` sem consumir tokens de LLM.

2. **Via Wizard Conversacional (Interativo no chat):**
   Abra [`wizard.md`](../wizard.md) no seu agente de IA preferido e responda às perguntas da entrevista guiada.
