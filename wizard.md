# Wizard de Configuração do Workspace

## Objetivo

Este wizard é um processo conversacional em Markdown para configurar um workspace agêntico. Ele não é uma CLI executável. O agente deve ler [`rules.md`](rules.md) antes de agir, seguir o idioma escolhido pelo usuário e pedir confirmação antes de gravar artefatos.

## Regras de execução

1. A primeira pergunta deve ser exclusivamente sobre o idioma de comunicação da LLM.
2. Pergunte separadamente o idioma da conversa e o idioma dos artefatos.
3. Faça no máximo três perguntas por rodada.
4. Use o idioma escolhido nas perguntas, confirmações e relatório seguintes.
5. Registre respostas incompletas como ausentes; não adivinhe silenciosamente.
6. Leia somente o blueprint selecionado e os blueprints secundários justificados.
7. Mostre o plano ou diff antes de qualquer gravação e peça confirmação explícita.
8. Após a confirmação, gere somente os arquivos aprovados dentro dos caminhos autorizados.
9. Substitua placeholders e ajuste referências relativas ao workspace final.
10. Valide links, Markdown, escopo, segurança, índice e compatibilidade antes do relatório.

## Primeira pergunta obrigatória

A primeira rodada deve conter somente esta pergunta:

> Qual idioma você deseja que eu use para me comunicar com você durante todo este processo?

Exemplos de resposta:

- Português do Brasil (`pt-BR`)
- Português de Portugal (`pt-PT`)
- Inglês (`en`)
- Espanhol (`es`)
- Outro idioma

Depois que o usuário responder, pergunte separadamente:

> Em qual idioma os arquivos, regras, skills, subagentes e documentação gerados devem ser escritos?

Se o usuário não quiser um idioma diferente, o wizard pode sugerir o idioma da conversa, mas deve pedir confirmação. Nunca altere o idioma silenciosamente.

## Ordem obrigatória do fluxo

O wizard deve seguir esta ordem. A ordem dos itens não muda o limite de três perguntas por rodada.

1. idioma de comunicação;
2. idioma dos artefatos;
3. objetivo principal;
4. tarefas mais frequentes;
5. domínio principal;
6. ferramentas e tecnologias;
7. estrutura do workspace;
8. caminhos autorizados e protegidos;
9. autonomia e confirmações;
10. memória;
11. skills existentes;
12. subagentes existentes;
13. seleção de blueprint;
14. proposta de artefatos;
15. confirmação;
16. geração;
17. validação;
18. relatório final.

## Perguntas do diagnóstico

Faça as perguntas seguintes na ordem, agrupando no máximo três por rodada depois da primeira pergunta:

1. Qual idioma devo usar para me comunicar com você durante todo o processo?
2. Em qual idioma os arquivos, regras, skills, subagentes e documentação devem ser escritos?
3. Qual é o objetivo principal do workspace?
4. Quais tarefas são executadas com maior frequência?
5. Qual é o domínio principal do entregável?
6. Quais ferramentas, linguagens e tecnologias estão confirmadas?
7. Como os projetos e repositórios estão organizados?
8. Quais caminhos estão autorizados e quais diretórios ou tipos de arquivo estão protegidos?
9. Qual nível de autonomia é autorizado (`N0` a `N4`) e quais ações exigem confirmação?
10. A memória entre sessões está habilitada? Onde o índice deve ficar?
11. Quais skills já existem e podem ser reutilizadas?
12. Quais subagentes já existem e podem ser reutilizados?

Se uma resposta crítica estiver ausente, faça uma pergunta priorizada em uma rodada posterior. Não gere arquivos enquanto objetivo, escopo, idiomas, caminhos autorizados, caminhos protegidos, autonomia e política de confirmação não estiverem claros o suficiente.

## Regras de idioma

- A conversa deve seguir o idioma escolhido no primeiro passo.
- O idioma dos artefatos é uma configuração separada e deve ser registrado.
- Nomes de arquivos, campos YAML e identificadores podem permanecer em inglês quando fizerem parte da estrutura técnica.
- Texto, exemplos e comentários dos artefatos devem seguir o idioma dos artefatos.
- Se houver conflito entre idioma da conversa e idioma dos artefatos, pergunte ao usuário.
- Nunca mude de idioma silenciosamente.

Exemplo:

```text
Usuário: Português do Brasil para a conversa e inglês para os arquivos.

Wizard: Perfeito. Vou me comunicar em pt-BR e gerar os artefatos em inglês.
```

## Seleção de blueprint

Leia [`config.example.yml`](config.example.yml) como referência de configuração e selecione um blueprint primário para o entregável principal:

| Trabalho principal | Blueprint |
| --- | --- |
| Websites, APIs, backend ou full-stack | [`blueprints/technical/web-dev.md`](blueprints/technical/web-dev.md) |
| Dados, análises, experimentos ou modelos | [`blueprints/technical/data-science.md`](blueprints/technical/data-science.md) |
| Entrega, infraestrutura ou operações | [`blueprints/technical/devops.md`](blueprints/technical/devops.md) |
| Conteúdo editorial ou publicação | [`blueprints/content/content-creator.md`](blueprints/content/content-creator.md) |
| Qualidade, testes ou release | [`blueprints/organizational/qa.md`](blueprints/organizational/qa.md) |
| Produto, descoberta ou roadmap | [`blueprints/organizational/pm.md`](blueprints/organizational/pm.md) |
| Produto técnico e backlog | [`blueprints/organizational/tpo.md`](blueprints/organizational/tpo.md) |
| Scrum, facilitação ou fluxo | [`blueprints/organizational/sm.md`](blueprints/organizational/sm.md) |
| Liderança, pessoas ou coordenação | [`blueprints/organizational/manager.md`](blueprints/organizational/manager.md) |

Sempre escolha um blueprint primário. Carregue blueprints secundários somente quando contribuírem diretamente para o entregável e registre o motivo. Em um workspace híbrido, escolha como primário o domínio responsável pelo resultado principal; não carregue todos por padrão.

## Fluxo após selecionar o blueprint

1. Leia [`rules.md`](rules.md).
2. Leia somente o blueprint primário escolhido.
3. Leia blueprints secundários apenas quando forem necessários.
4. Resuma perfil, idioma, objetivo, escopo, caminhos, autonomia e memória.
5. Proponha `AGENTS.md`, skills, subagentes, memória, índice e documentação necessários.
6. Use [`templates/workspace-template/AGENTS.md`](templates/workspace-template/AGENTS.md) para o arquivo central.
7. Use [`templates/skill-template.md`](templates/skill-template.md) e [`templates/subagent-template.md`](templates/subagent-template.md) quando aplicável.
8. Substitua `<central-rules-file>` pelos caminhos finais do workspace.
9. Mostre o plano ou diff, arquivos preservados, riscos e rollback.
10. Peça confirmação explícita antes de gravar.
11. Gere somente os artefatos aprovados em `AGENTS.md`, `.agents/skills/`, `.agents/subagents/`, `.agents/memory/` e `docs/`, conforme configurado.
12. Atualize o índice de artefatos sem armazenar segredos.
13. Valide referências, Markdown, placeholders, segurança e compatibilidade.
14. Entregue um relatório no idioma da conversa, identificando também o idioma dos artefatos.

## Workspace gerado

O kit de origem não deve ser copiado integralmente. O workspace gerado normalmente terá:

```text
my-workspace/
├── AGENTS.md
├── .agents/
│   ├── skills/
│   ├── subagents/
│   └── memory/
├── docs/
└── config/
```

Skills e subagentes copiados devem usar o arquivo central de regras configurado pelo workspace. Referências relativas válidas dentro do kit devem ser ajustadas durante a geração quando não forem válidas no destino.

## Confirmação e atualização

Antes de gravar, apresente os arquivos a criar ou modificar, os arquivos preservados, a finalidade de cada artefato, os riscos, o rollback e as validações. Para atualizar um workspace existente, compare a versão em [`VERSION`](VERSION), o [`CHANGELOG.md`](CHANGELOG.md), o blueprint, os templates e `rules.md`; gere um diff, peça confirmação, preserve os arquivos anteriores e atualize o índice.

## Relatório final

O relatório deve usar o idioma da conversa e informar:

- arquivos criados, modificados e preservados;
- blueprint primário e secundários usados;
- idioma da conversa e idioma dos artefatos;
- validações executadas e não executadas;
- evidências, incertezas, pendências e recomendações;
- confirmação de que nenhum dado sensível foi incluído.
