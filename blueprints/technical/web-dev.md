# Web Development

Referência de regras gerais: [`../../rules.md`](../../rules.md).

## Seleção

### Use este blueprint quando
- O entregável principal for um aplicativo web, site, serviço backend ou API HTTP/gRPC.
- O foco estiver em interfaces de navegação, lógica de API, persistência de dados ou integração cliente-servidor.

### Não use este blueprint quando
- O entregável for análise estatística de dados, pipeline de infraestrutura isolado ou conteúdo editorial sem código.

## Entregáveis esperados
- Endpoints de API REST/gRPC documentados.
- Componentes de interface de usuário funcionais e acessíveis.
- Suíte de testes unitários e de integração de web.

## Fluxos prioritários

### Implementação de Endpoint de API
- Gatilho: Necessidade de novo contrato de serviço ou funcionalidade backend.
- Entradas: Requisitos de negócio, esquema de tipos e especificações de banco de dados.
- Processo: Criar rotas, validar entrada/saída no service, tratar exceções e conectar à persistência.
- Saída: Endpoint implementado em `src/domain/service.ts` com testes unitários.
- Validação: Teste de integração de API e verificação de contratos HTTP.

### Refatoração de Interface Web
- Gatilho: Alteração de layout, correção de acessibilidade ou melhoria de performance no frontend.
- Entradas: Protótipo de interface, árvore de componentes existentes e diretrizes de acessibilidade.
- Processo: Atualizar estrutura HTML/DOM, aplicar regras de acessibilidade (ARIA) e ajustar estado local.
- Saída: Componente web atualizado sem alterar contratos externos.
- Validação: Navegação por teclado, leitor de tela e verificação de foco.

## Artefatos específicos

| Artefato | Finalidade | Quando criar |
|---|---|---|
| `src/domain/index.ts` | API pública exportada do domínio | Ao criar novo módulo de web/API |
| `src/domain/domain.service.ts` | Lógica de negócio e integração de serviços | Ao implementar regras de endpoints ou UI |

## Skills candidatas

| Skill | Gatilho | Entrada | Saída | Prioridade |
|---|---|---|---|---|
| `review-api-contract` | Alteração de esquema de API | OpenAPI/JSON Schema ou tipos | Diagnóstico de quebra de contrato | alta |
| `review-frontend-accessibility` | Modificação de componente UI | Código de componente HTML/JSX/TSX | Relatório de conformidade WCAG | alta |
| `analyze-fullstack-impact` | Mudança na camada de dados | Diff de código ou migração | Relatório de impacto em cascata | média |
| `triage-web-test-failure` | Falha em suíte de testes web | Log de execução de teste | Diagnóstico de causa raiz da falha | alta |
| `review-dependency-change` | Atualização em package.json | Arquivo de dependências | Análise de vulnerabilidade e quebra | média |

## Subagentes candidatos

| Subagente | Responsabilidade | Quando delegar | Não faz |
|---|---|---|---|
| `frontend-reviewer` | Auditar acessibilidade e estado no cliente | Mudanças complexas de UI | Modificar rotas de backend |
| `api-contract-reviewer` | Validar compatibilidade de esquema HTTP/gRPC | Alterações de assinaturas de endpoints | Escrever código de UI |
| `integration-diagnostician` | Diagnosticar falhas de comunicação cliente-servidor | Erros intermitentes em fluxos e2e | Alterar esquemas de banco |
| `web-test-analyzer` | Analisar e corrigir testes de renderização e API | Falhas em suítes de testes de web | Alterar regras de negócios |

## Perguntas específicas
1. Qual a camada principal alterada: frontend, backend ou ambos?
2. Quais contratos de API ou esquemas de dados serão impactados pela alteração?
3. Quais os requisitos de acessibilidade e navegabilidade aplicáveis?

## Riscos específicos
- Quebra de compatibilidade em APIs consumidas por clientes legados.
- Falhas de acessibilidade (WCAG) em componentes visuais de interface.
- Exposição não intencional de dados ou tokens no bundle público de frontend.

## Validações específicas
- Validação de rotas de API com payloads válidos e inválidos.
- Navegação por teclado e semântica HTML em componentes de interface.

## Critérios de aceite
- Endpoints e componentes passam na suíte de testes automatizados sem erros.
- Nenhum segredo ou token exposto no código público.
