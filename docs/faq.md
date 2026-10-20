# Perguntas Frequentes (FAQ)

### Funciona no ChatGPT, Claude Web ou agentes sem terminal?
Sim. Você pode fornecer o conteúdo de [`rules.md`](../rules.md) e [`wizard.md`](../wizard.md) diretamente no chat para que a IA siga o fluxo de configuração em Markdown puro.

### Preciso obrigatoriamente instalar uma CLI externa?
Não. O kit funciona 100% em Markdown puro agnóstico. Porém, ele inclui opcionalmente a CLI determinística [`tools/agent-tool`](../tools/agent-tool) em Node.js nativo (sem dependências extras no npm) para quem deseja automatizar diagnósticos, gerenciar skills e economizar tokens.

### Qual a diferença entre uma Skill interna (Builtin) e da Comunidade?
- **Builtin**: Mantida diretamente pelo kit em `templates/skills/`, com testes contínuos e focada em operações determinísticas.
- **Comunidade**: Desenvolvida por terceiros e catalogada em [`catalog/community.json`](../catalog/community.json) após revisão documentada (`COMMUNITY_REVIEWED`). A instalação é 100% opcional pelo usuário.

### O setup sobrescreve minhas alterações locais?
Não. O comando `agent-tool setup` é estritamente idempotente. Ele identifica arquivos já existentes e preserva suas customizações. Para forçar uma substituição, é necessário passar a flag `--force`.

### O que faz o comando `skills doctor`?
Executa um health check completo no workspace: valida a integridade do lockfile (`.agents/.skills-lock.json`), detecta arquivos ausentes, alerta sobre modificações manuais locais e aponta sobreposições ativas entre componentes instalados.

### E se meu agente de IA não estiver na lista de adaptadores?
Utilize o adaptador genérico em [`adapters/generic/README.md`](../adapters/generic/README.md). Ele fornece uma estrutura agnóstica baseada em `AGENTS.md` compatível com qualquer modelo.

### O que é o nível de autonomia N2?
N2 indica que ações com efeitos externos (como instalar dependências ou chamar APIs remotas) exigem sua confirmação prévia antes de serem executadas.
