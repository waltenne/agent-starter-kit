# Perguntas Frequentes (FAQ)

### Funciona no ChatGPT ou Claude Web?
Sim. Você pode copiar o conteúdo de `rules.md` e `wizard.md` para a conversa e pedir para o modelo seguir o fluxo de configuração.

### Preciso instalar alguma ferramenta ou CLI?
Não. O kit é baseado inteiramente em arquivos Markdown e funciona nativamente no seu agente de código preferido sem dependências de instalação.

### E se meu agente de IA não estiver na lista de adaptadores?
Utilize o adaptador genérico em `adapters/generic/README.md`. Ele fornece uma estrutura agnóstica baseada em `AGENTS.md` compatível com qualquer modelo.

### E se eu não souber responder às perguntas do wizard?
Se você responder que não sabe, o wizard sugerirá as opções padrão seguras, como o adaptador genérico e o blueprint primário web-dev.

### O que é o nível de autonomia N2?
N2 indica que ações com efeitos externos (como instalar pacotes ou chamar APIs remotas) exigem sua confirmação prévia antes de serem executadas.

### Posso usar o kit sem o Git?
Sim. O controle de versão Git é recomendado para rastreabilidade, mas o kit funciona normalmente em diretórios locais simples.

### Como atualizo um workspace existente?
Compare a versão em `VERSION` e `CHANGELOG.md` com a do seu workspace e aplique as atualizações mantendo seu arquivo `AGENTS.md`.

