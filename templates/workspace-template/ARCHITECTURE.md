# Arquitetura do Workspace `<workspace-name>`

## Princípios de Arquitetura

1. **Separação de Responsabilidades**: Domínios isolados com interfaces explícitas.
2. **Modularidade**: Código genérico em `shared/` e lógica de negócios nos domínios.
3. **Agente de IA Assistido**: Operação sob controle de regras configuradas em `AGENTS.md`.

## Diagrama da Estrutura

```text
src/
├── shared/             # Utilitários globais, tratamento de erros e logs
└── <domain>/           # Módulo de domínio principal
    ├── index.ts        # Ponto de entrada do domínio
    ├── service.ts      # Lógica de serviços
    ├── types.ts        # Interfaces e contratos
    └── service.test.ts # Testes unitários do serviço
```

