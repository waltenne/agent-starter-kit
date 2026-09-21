---
session_id: "{{SESSION_ID}}"
source_agent: "{{SOURCE_AGENT}}"
target_agent: "{{TARGET_AGENT}}"
status: "open"
created_at: "{{TIMESTAMP}}"
---

# Handoff: {{TASK_TITLE}}

## 1. Contexto e Objetivo
- {{OBJECTIVE_DESCRIPTION}}

## 2. Tarefas Concluídas (Evidências)
- [x] {{COMPLETED_TASK_1}} (Validado via {{VERIFICATION_COMMAND}})

## 3. Abordagens Falhas ou Descartadas (Gotchas)
- **Tentativa {{ATTEMPT_NAME}}**: {{FAILURE_REASON}} (Não repetir).

## 4. Pendências e Próximos Passos
- [ ] {{NEXT_STEP_1}}
- [ ] {{NEXT_STEP_2}}

## 5. Arquivos e Comandos Afetados
- Arquivos modificados: `{{MODIFIED_FILES}}`
- Comandos de validação: `{{VALIDATION_COMMAND}}`

