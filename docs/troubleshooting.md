# Resolução de Problemas (Troubleshooting)

### A validação falha ao executar os scripts
- **Causa Provável**: Node.js ausente ou arquivos esperados faltando.
- **Correção**: Certifique-se de que o Node.js v18+ está instalado e execute `npm test` e `node scripts/validate.mjs`.

### O comando `agent-tool skills doctor` reporta sobreposição (active_overlap)
- **Causa Provável**: Dois toolkits ou skills instalados compartilham o mesmo propósito (ex.: `superpowers` e `upstack` para TDD, ou `ai-memory` e `prism-coder` para persistência).
- **Correção**: O alerta é informativo. Se desejar manter apenas um deles, execute `agent-tool skills remove <id>` no componente não utilizado.

### O instalador rejeita atualizar uma skill modificada localmente
- **Causa Provável**: O arquivo foi editado manualmente e seu hash difere do catálogo.
- **Correção**: Se quiser sobrescrever com a versão do catálogo, passe a flag `--force`: `agent-tool skills install <id> --force`. Caso queira manter suas alterações, não utilize `--force`.

### O agente de IA ignora o wizard e gera arquivos direto
- **Causa Provável**: O agente não leu a instrução inicial do wizard.
- **Correção**: Cole o prompt de início rápido explicitando a leitura prévia de [`rules.md`](../rules.md) e [`wizard.md`](../wizard.md), ou utilize a CLI determinística `./tools/agent-tool setup`.

### Restaram placeholders `<...>` no workspace gerado
- **Causa Provável**: Substituição mecânica incompleta durante o bootstrap manual.
- **Correção**: Inspecione o arquivo gerado e substitua os valores entre chaves angulares pelos dados do projeto.

### O link relativo em um documento está quebrado
- **Causa Provável**: Caminho de arquivo movido ou alterado.
- **Correção**: Verifique a localização relativa do arquivo de destino e execute `node scripts/validate.mjs` para checagem automática.
