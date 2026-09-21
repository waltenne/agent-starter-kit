# Resolução de Problemas (Troubleshooting)

### A validação falha ao executar os scripts
- **Causa Provável**: Node.js ausente ou arquivos esperados faltando.
- **Correção**: Certifique-se de que o Node.js v18+ está instalado e execute `node scripts/validate.mjs`.

### O agente de IA ignora o wizard e gera arquivos direto
- **Causa Provável**: O agente não leu a instrução inicial do wizard.
- **Correção**: Cole o prompt de início rápido explicitando a leitura prévia de `rules.md` e `wizard.md`.

### Nenhum blueprint encaixa perfeitamente no meu projeto
- **Causa Provável**: Projeto híbrido com múltiplas responsabilidades.
- **Correção**: Escolha o blueprint da responsabilidade principal como primário e use secundários apenas como apoio.

### Restaram placeholders `<...>` no workspace gerado
- **Causa Provável**: Substituição mecânica incompleta durante o bootstrap.
- **Correção**: Inspecione o arquivo gerado e substitua os valores entre chaves angulares pelos dados do projeto.

### O link relativo em um documento está quebrado
- **Causa Provável**: Caminho de arquivo movido ou alterado.
- **Correção**: Verifique a localização relativa do arquivo de destino e ajuste o link em Markdown.

### A skill criada não é reconhecida pelo agente
- **Causa Provável**: Frontmatter YAML malformatado ou nome inválido.
- **Correção**: Valide a sintaxe do frontmatter no arquivo `SKILL.md` da skill.

