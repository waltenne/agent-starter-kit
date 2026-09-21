# Matriz e Guia de Compatibilidade com Agentes de IA

Este documento descreve como o `agent-starter-kit` se adapta a diferentes agentes de código e ferramentas agênticas de IA, fornecendo uma camada de configuração agnóstica e adaptadores por agente.

---

## Conceito da Arquitetura em Duas Camadas

O kit utiliza uma arquitetura separada em duas camadas:

1. **Camada Agnóstica (Núcleo)**: Regras centrais ([`rules.md`](rules.md)), wizard conversacional ([`wizard.md`](wizard.md)), blueprints de domínio, templates de workspace e estruturas de memória.
2. **Camada de Adaptação (Adaptadores)**: Mapeamento específico das regras e artefatos agnósticos para os formatos, convenções e restrições de cada agente de IA.

---

## Tipos de Compatibilidade

A compatibilidade é classificada em seis dimensões:

| Nível de Compatibilidade | Descrição |
| --- | --- |
| **Compatibilidade Conceitual** | O agente aceita instruções em linguagem natural (Markdown) e regras de controle de fluxo. |
| **Compatibilidade de Arquivos** | O agente lê arquivos de instrução centrais (ex.: `AGENTS.md`, `.clauderc`, `.cursorrules`). |
| **Compatibilidade de Skills** | O agente suporta execução ou importação de habilidades/skills modulares. |
| **Compatibilidade de Subagentes** | O agente suporta invocação de subagentes ou delegação isolada de tarefas. |
| **Compatibilidade de Ferramentas** | O agente suporta integração com ferramentas (CLI, MCP - Model Context Protocol, APIs). |
| **Compatibilidade de Execução** | O agente executa comandos diretamente no terminal ou em sandbox sob supervisão. |

---

## Tabela de Compatibilidade de Agentes

| Tipo de Agente | Arquivo Principal | Skills | Subagentes | Suporte ai-memory | Status de Compatibilidade | Observação |
| --- | --- | --- | --- | --- | --- | --- |
| **Agente Genérico (Markdown)** | `AGENTS.md` | `.agents/skills` | `.agents/subagents` | CLI / MCP Server | Verificado (Padrão) | Usa o formato agnóstico e comandos de CLI/MCP do `ai-memory`. |
| **Claude Code** | `CLAUDE.md` com `@AGENTS.md` | Diretório de skills | Subagentes nativos | Hooks (`.claude/hooks`) + MCP | Verificado | Captura automática de ciclo de vida via hooks locais ou MCP Server. |
| **Codex** | `AGENTS.md` | Skills compatíveis | Subagentes compatíveis | Hooks nativos (`SessionEnd`) / MCP | Verificado | Suporte nativo a encerramento de sessão e handoff *claim-once*. |
| **Antigravity CLI** | `AGENTS.md` / `GEMINI.md` | Skills nativas | Subagentes nativos | MCP Server / CLI | Verificado | Suporte total via servidor MCP e comando `ai-memory finalize-session`. |
| **Cursor** | `.cursorrules` / `AGENTS.md` | Conforme suporte | Conforme suporte | MCP Server (`.cursor/mcp.json`) | Parcial | Integração via servidor MCP de busca e retenção de memória. |
| **Windsurf** | `.windsurfrules` / `AGENTS.md` | Conforme suporte | Conforme suporte | MCP Server | Parcial | Integração via servidor MCP. |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Conforme suporte | Conforme suporte | MCP Server (Copilot) | Parcial | Adaptar instruções para o escopo do Copilot Workspace/Chat. |
| **Agente Local** | Configuração do usuário | Diretório local | Diretório local | CLI / MCP local | Conceitual | Evitar dependências externas proprietárias. |

> [!IMPORTANT]
> **Aviso sobre integrações não verificadas:**
> Quando a compatibilidade com determinado recurso ou agente não puder ser confirmada através de testes ou documentação oficial, o kit declarará:
> ```text
> Compatibilidade não verificada. Consulte a documentação do agente antes de instalar.
> ```

---

## Procedimento Geral de Adaptação

1. **Escolha o agente** durante a execução do [`wizard.md`](wizard.md).
2. **Gere a camada agnóstica** contendo `AGENTS.md`, `.agents/skills/`, `.agents/subagents/` e `docs/`.
3. **Selecione o adaptador apropriado** em `adapters/`.
4. **Aplique as conversões** descritas no README do adaptador (como criação de `.cursorrules`, `.clauderc` ou `.github/copilot-instructions.md`).
5. **Ajuste os caminhos relativos** e referências para apontar para os arquivos finais.
6. **Execute a validação** através de `bash scripts/validate.sh`.

