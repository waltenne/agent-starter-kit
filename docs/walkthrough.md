# Exemplo Real de Sessão (Walkthrough)

Este documento registra uma sessão completa de configuração e uso prático no blueprint `technical/web-dev`.

---

## 1. Abordagem via CLI Determinística (Recomendada)

### A. Diagnóstico da Stack
```bash
./tools/agent-tool project info --json
```
Saída estruturada com runtime (Node.js), banco (SQLite), linters e caminhos importantes.

### B. Setup com Simulação (--dry-run)
```bash
./tools/agent-tool setup /meu-projeto --dry-run
```
Verifica o plano de ações sem efetuar gravações no disco.

### C. Execução do Setup Real
```bash
./tools/agent-tool setup /meu-projeto
```
Gera `.agents/skills/`, subagentes adequados (Worker, Implementer, Advisor), lockfile de proveniência e `AGENTS.md`.

---

## 2. Abordagem Conversacional (Via Chat)

### Prompt Inicial
```text
Use este repositório como fonte: ~/projects/agent-starter-kit
Leia rules.md e wizard.md.
Siga o wizard conversacional completo, começando pelo idioma da conversa.
```

### Resumo Apresentado pela IA
- **Blueprint Primário**: `technical/web-dev.md`
- **Adaptador**: `adapters/generic/README.md`
- **Hierarquia**: SCRIPT -> SKILL -> AGENT -> ADVISOR
- **Artefatos Aprovados**: `AGENTS.md`, `ARCHITECTURE.md`, `ADR.md`, `src/shared/`, `src/product/`.

---

## 3. Gestão de Capacidades no Workspace Gerado

Após a inicialização do workspace, você pode explorar e instalar capacidades adicionais:

```bash
# Navegar no catálogo interativamente
./tools/agent-tool skills browse

# Recomendações por perfil
./tools/agent-tool skills recommend --profile DEVELOPER

# Instalar humanizador de texto opcional
./tools/agent-tool skills install humanizer

# Verificar integridade física e lógica do workspace
./tools/agent-tool skills doctor
```

---

## 4. Validação Contínua

```bash
npm test
node scripts/validate.mjs
```
Saída: `[VALIDATION] All validation checks passed successfully!`
