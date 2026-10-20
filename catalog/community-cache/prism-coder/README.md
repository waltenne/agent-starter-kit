# Integração Externa: Prism Coder (prism-mcp)

Fonte original: [`https://github.com/dcostenco/prism-mcp`](https://github.com/dcostenco/prism-mcp) (Denis Costenco).

## Natureza do Componente

> [!NOTE]
> O `prism-coder` **não é uma skill em Markdown**, mas sim uma **integração de arquitetura cognitiva e memória via MCP (Model Context Protocol)** em TypeScript/Node.js com compressão TurboQuant e Hebbian recall.

## Como Configurar no Workspace

1. **Instalação do Servidor MCP:**
   ```bash
   npm install -g prism-mcp
   ```

2. **Configuração no Cliente Agêntico (ex.: Claude Code / Cursor / Codex):**
   Adicione ao arquivo de configuração MCP correspondente:
   ```json
   {
     "mcpServers": {
       "prism": {
         "command": "prism-mcp",
         "args": []
       }
     }
   }
   ```

