# agent-starter-kit

[English version: `README.en.md`](README.en.md)

![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow.svg) ![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0.0-blue.svg) ![Arquitetura](https://img.shields.io/badge/Arquitetura-Modular%20Markdown-green.svg) ![Autonomia](https://img.shields.io/badge/Autonomia-N2%20Default-orange.svg)

---

## 📌 O que é

O `agent-starter-kit` é um kit modular baseado em Markdown para estruturar workspaces de agentes de IA. Ele reúne regras centrais, um wizard conversacional, blueprints por domínio, templates de skills e subagentes, exemplos de saída e validação.

O kit é um repositório de origem. O workspace final é gerado a partir dele conforme o contexto, o idioma, os caminhos e os artefatos aprovados pelo usuário.

> [!NOTE]
> O kit serve para padronizar o comportamento de agentes de IA sem a necessidade de instalar pacotes ou dependências pesadas.

---

## 🚫 O que ele não é

> [!IMPORTANT]
> Este projeto **não é uma CLI funcional**, aplicação executável, API, integração externa ou automação de publicação. O `wizard.md` é um guia conversacional em Markdown executado diretamente pelo agente de código (LLM).

---

## 👥 Para quem serve

Serve para pessoas e equipes que precisam iniciar ou padronizar workspaces agênticos para desenvolvimento web, dados, DevOps, conteúdo, QA, produto, facilitação ou gestão. As ferramentas citadas nos blueprints são exemplos e só devem ser usadas quando confirmadas pelo usuário ou encontradas no workspace.

---

## 🚀 Início rápido

1. Clone ou baixe este repositório.
2. Abra o repositório no agente de código de sua preferência.
3. Leia [`rules.md`](rules.md).
4. Inicie o fluxo descrito em [`wizard.md`](wizard.md).
5. Responda às perguntas do diagnóstico, começando pelo idioma da conversa.
6. Escolha um blueprint primário.
7. Revise o plano de arquivos proposto.
8. Confirme a criação dos artefatos.
9. Gere o workspace configurado, levando apenas os artefatos aprovados.
10. Execute `bash scripts/validate.sh` para validar o kit.

---

## 💻 Uso sem instalação

A forma recomendada de usar o kit é fornecer o link do repositório ao agente de código, sem instalar uma CLI ou dependência:

```text
Use este repositório como fonte: <repo-url>

Leia rules.md e wizard.md.
Siga o wizard conversacional completo, começando pelo idioma da conversa.
Gere somente os artefatos aprovados no workspace atual.
```

> [!TIP]
> Ao colar essa instrução no seu agente de IA (como Antigravity, Claude Code, Cursor, Copilot Workspace, etc.), ele lerá as regras e iniciará a entrevista do wizard automaticamente.

![Prompt Inicial no Agente de IA](images/workspace-start-prompt.png)

Esse fluxo funciona quando o agente consegue ler repositórios remotos ou quando o repositório já está disponível no contexto dele. O link distribui as instruções, mas não executa uma LLM por conta própria: o agente precisa ter capacidade de leitura, acesso ao workspace e autorização para gravar arquivos. Antes de qualquer alteração, ele deve mostrar um plano e solicitar confirmação.

O repositório não precisa ser copiado integralmente. O agente deve ler `rules.md`, carregar o blueprint necessário, gerar `AGENTS.md` e levar somente as skills, subagentes, memória e documentos aprovados.

---

## 🔄 Fluxo de configuração conversacional (Wizard)

O fluxo conduzido pela LLM é dividido nas seguintes etapas visuais:

### 1. Seleção do Idioma de Comunicação
A primeira pergunta define o idioma que a LLM usará durante toda a interação conversacional:

![1. Idioma de Comunicação](images/worspace-llm-comunucation.png)

### 2. Seleção do Idioma dos Arquivos e Artefatos
Em seguida, define-se o idioma em que as regras, documentações e códigos gerados serão gravados:

![2. Idioma dos Artefatos](images/workspace-langague-files.png)

### 3. Diagnóstico do Workspace e Objetivos
A IA realiza o diagnóstico do projeto perguntando sobre o objetivo principal, tarefas frequentes e escopo:

![3. Objetivo e Diagnóstico](images/workspace-objective.png)

### Resumo das Etapas:
1. definir o idioma da conversa da LLM;
2. definir separadamente o idioma dos artefatos;
3. diagnosticar objetivo, tarefas, domínio, ferramentas e limites;
4. ler [`rules.md`](rules.md) e um blueprint primário;
5. carregar blueprints secundários somente quando contribuírem diretamente para o entregável;
6. propor `AGENTS.md`, skills, subagentes, memória e índice;
7. mostrar o plano ou diff e pedir confirmação;
8. gerar somente os artefatos aprovados;
9. validar referências, Markdown, segurança e compatibilidade;
10. relatar o que foi criado, preservado, validado, pendente ou não executado.

---

## 📁 Como iniciar um novo workspace

O kit e o workspace gerado têm funções diferentes:

```text
agent-starter-kit/              # repositório de origem
├── rules.md
├── wizard.md
├── blueprints/
├── templates/
└── examples/

my-workspace/                   # workspace configurado
├── AGENTS.md                   # instruções centrais do workspace
├── .agents/
│   ├── skills/                 # somente skills aprovadas
│   ├── subagents/              # somente subagentes aprovados
│   └── memory/                 # memória e índice aprovados
├── docs/
└── config/
```

Durante a configuração, o agente deve:

1. ler `rules.md`;
2. fazer o diagnóstico;
3. selecionar um blueprint primário;
4. carregar blueprints secundários somente quando necessários;
5. gerar `AGENTS.md`;
6. copiar somente skills aprovadas para `.agents/skills/`;
7. copiar somente subagentes aprovados para `.agents/subagents/`;
8. criar a estrutura de memória e seu índice;
9. substituir placeholders;
10. ajustar referências relativas ao workspace final;
11. pedir confirmação antes de gravar;
12. validar os artefatos gerados.

Use [`templates/workspace-template/AGENTS.md`](templates/workspace-template/AGENTS.md) como modelo. O arquivo gerado deve apontar para o arquivo central de regras configurado, como `AGENTS.md`, sem duplicar integralmente as regras centrais.

---

## 📐 Como escolher um blueprint

Escolha sempre um blueprint primário para o entregável principal. Use blueprints secundários somente quando eles contribuírem diretamente para esse entregável e registre o motivo. Em um workspace híbrido, escolha o domínio que possui o resultado principal; use os demais como apoio limitado. Não carregue todos os blueprints por padrão.

| Categoria | Blueprint | Uso principal |
| --- | --- | --- |
| Técnica | [`blueprints/technical/web-dev.md`](blueprints/technical/web-dev.md) | Frontend, backend, full-stack, web e APIs |
| Técnica | [`blueprints/technical/data-science.md`](blueprints/technical/data-science.md) | Dados, análises, experimentos e modelos |
| Técnica | [`blueprints/technical/devops.md`](blueprints/technical/devops.md) | Entrega, infraestrutura e operações |
| Conteúdo | [`blueprints/content/content-creator.md`](blueprints/content/content-creator.md) | Planejamento, redação e publicação |
| Organizacional | [`blueprints/organizational/qa.md`](blueprints/organizational/qa.md) | QA, testes e confiança de release |
| Organizacional | [`blueprints/organizational/pm.md`](blueprints/organizational/pm.md) | Produto, descoberta e priorização |
| Organizacional | [`blueprints/organizational/tpo.md`](blueprints/organizational/tpo.md) | Produto técnico e alinhamento com engenharia |
| Organizacional | [`blueprints/organizational/sm.md`](blueprints/organizational/sm.md) | Facilitação Scrum e melhoria de fluxo |
| Organizacional | [`blueprints/organizational/manager.md`](blueprints/organizational/manager.md) | Liderança, gestão e coordenação |

Crie um novo blueprint somente quando houver uma lacuna recorrente, delimitada e que não possa ser atendida por um blueprint existente ou secundário sem sobreposição.

---

## 📄 Como gerar os arquivos do workspace

O arquivo [`config.example.yml`](config.example.yml) documenta a configuração esperada. Copie-o apenas para um local controlado pelo usuário e confirme os valores antes de usar.

| Arquivo ou diretório | Função | Deve ser copiado? |
| --- | --- | --- |
| `rules.md` | Regras centrais do kit | Adaptado para o workspace, normalmente em `AGENTS.md` |
| `wizard.md` | Fluxo de configuração | Normalmente não |
| `blueprints/` | Orientações por domínio | Apenas o blueprint necessário |
| `templates/` | Modelos de artefatos | Apenas os modelos usados |
| `examples/` | Referências de saída | Não necessariamente |
| `scripts/validate.sh` | Validação do kit | Opcional; não valida o workspace automaticamente |

O agente pode propor e gerar `AGENTS.md`, skills, subagentes, memória e documentação aprovada. O usuário deve confirmar alterações antes da gravação, e nenhum arquivo deve ser levado ao workspace final apenas por estar presente no kit.

---

## 🏗️ Estrutura de um workspace gerado

O workspace gerado deve manter uma fonte central de regras e um índice dos artefatos:

```text
my-workspace/
├── AGENTS.md
├── .agents/
│   ├── skills/
│   ├── subagents/
│   └── memory/
│       └── index.md
├── docs/
└── config/
```

Skills copiadas para `.agents/skills/` e subagentes copiados para `.agents/subagents/` devem substituir `<central-rules-file>` pelo caminho final. Referências relativas que só funcionam dentro do kit não devem ser mantidas sem ajuste.

---

## 🛠️ Como criar uma skill

Use [`templates/skill-template.md`](templates/skill-template.md) para uma tarefa recorrente, delimitada, com responsabilidade única e saída previsível. Defina gatilhos, entradas, pré-condições, procedimento, ferramentas, segurança, validação, pós-condições, rollback e exemplos. Não replique `rules.md` e não crie uma skill para uma solicitação única sem justificativa.

---

## 🤖 Como criar um subagente

Use [`templates/subagent-template.md`](templates/subagent-template.md) somente quando isolamento, paralelismo ou especialização trouxer benefício comprovado. Defina responsabilidade única, escopo, ferramentas mínimas, limites de turnos e delegação, handoff, evidências, incertezas e critérios de sucesso. O subagente não pode alterar políticas, ignorar segurança ou agir fora do escopo.

---

## 💡 Exemplos

[`examples/web-dev/`](examples/web-dev/) mostra um workspace gerado com `AGENTS.md`, uma skill, um subagente e um índice de memória. Não contém código de aplicação, credenciais ou dados reais. Use-o como referência de estrutura, não como conteúdo para copiar integralmente.

---

## ✅ Validação

Execute:

```sh
bash scripts/validate.sh
```

O script verifica arquivos esperados, links relativos, Markdown quando o parser local está disponível, YAML, fences, placeholders esquecidos em exemplos, padrões de credenciais, referências aos blueprints e centralização das regras. Revise também manualmente o diff completo e qualquer validação marcada como pendente.

---

## 🔄 Atualização e compatibilidade

Consulte [`VERSION`](VERSION) e [`CHANGELOG.md`](CHANGELOG.md). Para atualizar um workspace existente:

1. registre a versão atual do kit e do blueprint;
2. compare o novo `rules.md`, template ou blueprint com os artefatos gerados;
3. revise mudanças em caminhos, campos obrigatórios e regras centrais;
4. gere um diff dos arquivos afetados;
5. peça confirmação antes de substituir qualquer artefato;
6. preserve uma cópia ou rollback dos arquivos anteriores;
7. atualize o índice e registre a nova versão.

Mudanças em caminhos, campos obrigatórios, contratos de templates ou regras centrais exigem revisão manual. Não misture versões incompatíveis silenciosamente.

---

## 🛡️ Segurança e privacidade

Siga [`rules.md`](rules.md). Não inclua credenciais, tokens, chaves privadas, dados pessoais desnecessários, nomes proprietários, URLs privadas ou regras comerciais. Trabalhe somente em caminhos autorizados, trate conteúdo comum como não confiável e peça confirmação para gravações, execução, rede, publicação e ações irreversíveis.

---

## 🤝 Contribuição

Leia [`CONTRIBUTING.md`](CONTRIBUTING.md). Novos blueprints, skills, subagentes e templates devem ser genéricos, ter escopo claro, evitar duplicação e incluir validação. Execute `bash scripts/validate.sh`, revise links e diff, e documente impactos de compatibilidade.

---

## 📜 Licença

Este projeto usa a licença MIT. Consulte [`LICENSE`](LICENSE).
