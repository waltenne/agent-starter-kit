# Integração Opcional: AI Memory CLI

Fonte: [`https://github.com/akitaonrails/ai-memory`](https://github.com/akitaonrails/ai-memory) (Fabio Akita).

## Natureza do Componente

> [!NOTE]
> O `ai-memory` **não é uma skill em Markdown puro**, mas sim uma **ferramenta executável em Rust** para gerenciar memória persistente e handoffs entre sessões e ferramentas agênticas (Claude Code, Cursor, Codex, Zed) via SQLite FTS5 e Markdown Wiki versionada.

## Como Utilizar no Workspace

1. **Instalação do Binário (requer Rust/Cargo):**
   ```bash
   cargo install --git https://github.com/akitaonrails/ai-memory
   ```

2. **Inicialização no Repositório:**
   ```bash
   ai-memory init
   ```

3. **Integração com Hooks de Sessão:**
   - Configure o hook de encerramento de sessão no agente para chamar `ai-memory record`.
   - Consulte o histórico compilado através de `ai-memory search "<termo>"`.

