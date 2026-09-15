# Code Separation Reference

Referência de regras gerais: [`../../../rules.md`](../../../rules.md).

Agrupe por domínio, não por camada técnica. Estrutura mínima por domínio:

- `index.ts` (API pública do domínio)
- `<dominio>.types.ts`
- `<dominio>.service.ts`
- `<dominio>.service.test.ts`

Código compartilhado entre domínios vive em `shared/` e nunca importa domínio.
