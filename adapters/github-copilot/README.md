# Adaptador GitHub Copilot

## Status de compatibilidade

- Nível: parcial
- Última revisão: 2026-09-15
- Fonte: Documentação oficial do GitHub Copilot / Copilot Workspace

## Arquivo de instruções

`.github/copilot-instructions.md` ou `AGENTS.md`.

## Skills

Skills documentadas em `.agents/skills/` e anexadas via contexto de prompt no GitHub Copilot Chat.

## Subagentes

Compatibilidade não verificada. Consulte a documentação do agente antes de instalar.

## Memória

Índice em `.agents/memory/index.md` referenciado no arquivo de instruções principal.

## Ferramentas

Extensão do VS Code / JetBrains ou ambiente Copilot Workspace.

## Limitações

O Copilot possui limitações quanto à execução autônoma de scripts sem intervenção do desenvolvedor no editor.

## Procedimento de adaptação

1. Leia `rules.md`.
2. Leia o blueprint selecionado.
3. Gere o workspace genérico.
4. Aplique o formato específico deste adaptador (crie `.github/copilot-instructions.md` incluindo ou referenciando `AGENTS.md`).
5. Ajuste caminhos e referências.
6. Valide o resultado com `bash scripts/validate.sh`.

