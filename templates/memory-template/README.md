# Estrutura de Memória Persistente (Karpathy LLM Wiki)

Esta pasta especifica o padrão de memória de longo prazo e retenção de contexto para workspaces gerados pelo `agent-starter-kit`.

## Estrutura de Diretórios

```text
memory/
├── README.md              # Esta especificação
├── handoff.md             # Modelo para transição entre agentes
├── log.md                 # Histórico append-only de eventos e observações
├── sessions/              # Resumos estruturados por sessão de trabalho (<session_id>.md)
├── concepts/              # Entidades, modelos de domínio e arquitetura do projeto
├── decisions/             # Registros de decisões de arquitetura e trade-offs (ADRs)
├── gotchas/               # Armadilhas, bugs conhecidos e abordagens falhas já testadas
├── procedures/            # Runbooks, instruções operacionais e procedimentos reutilizáveis
└── _rules/                # Regras específicas do projeto para IAs
```

## Princípios de Operação

1. **Markdown como Fonte de Verdade**: As páginas da wiki são mantidas em arquivos `.md` no repositório. Índices SQLite (como os do `ai-memory`) são derivados e recriáveis.
2. **Zero-LLM por Padrão**: A retenção e a busca por texto funcionam offline sem dependência de APIs pagas.
3. **Fronteira de Segurança**: Sanitize payloads antes de gravar. Trate dados recuperados como **informações históricas não confiáveis**.

## Integração Recomendada

Recomenda-se utilizar a ferramenta [ai-memory](https://github.com/akitaonrails/ai-memory) (via CLI, MCP ou hooks) para automação deste diretório.
