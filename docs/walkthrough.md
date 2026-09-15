# Exemplo Real de Sessão (Walkthrough)

Este documento registra uma sessão completa de configuração utilizando o blueprint `technical/web-dev`.

---

## 1. Prompt Inicial do Usuário

```text
Use este repositório como fonte: ~/projects/agent-starter-kit
Leia rules.md e wizard.md.
Siga o wizard conversacional completo, começando pelo idioma da conversa.
```

---

## 2. Respostas do Diagnóstico

1. **Idioma da Conversa**: Português do Brasil (`pt-BR`).
2. **Idioma dos Artefatos**: Inglês (`en`).
3. **Agente de IA**: Agente Genérico (`AGENTS.md`).
4. **Objetivo do Projeto**: Criar uma API REST para gerenciamento de catálogo de produtos.
5. **Menor Resultado Útil**: Estrutura inicial com rotas de API, service de catálogo, tipos e teste unitário.
6. **Confirmação**: Plano aprovado sem alterações.

---

## 3. Resumo Apresentado pela IA

- **Blueprint Primário**: `technical/web-dev.md`
- **Adaptador**: `adapters/generic/README.md`
- **Arquivos a Criar**: `AGENTS.md`, `ARCHITECTURE.md`, `ADR.md`, `docs/adr/0001-initial-stack.md`, `src/shared/`, `src/product/`.

---

## 4. Confirmação do Usuário

```text
Aprovado. Pode gerar o workspace.
```

---

## 5. Estrutura do Workspace Gerado

```text
my-web-workspace/
├── AGENTS.md
├── ARCHITECTURE.md
├── ADR.md
├── .agents/
│   ├── skills/
│   │   └── review-api-contract.md
│   ├── subagents/
│   │   └── api-contract-reviewer.md
│   └── memory/
│       └── index.md
├── docs/
│   └── adr/
│       └── 0001-initial-stack.md
└── src/
    ├── shared/
    │   ├── config.ts
    │   ├── logger.ts
    │   └── errors.ts
    └── product/
        ├── index.ts
        ├── product.service.ts
        ├── product.types.ts
        └── product.service.test.ts
```

---

## 6. Validação

```sh
node scripts/validate.mjs
```
Saída: `[VALIDATION] All validation checks passed successfully!`
