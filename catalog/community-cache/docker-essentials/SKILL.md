---
name: docker-essentials
description: Procedimentos seguros de inspeção de Dockerfiles, otimização de camadas e checagem de contêineres.
license: Apache-2.0
compatibility: generic
metadata:
  author: agentskills
  revision: main
---

# Skill: docker-essentials

Fonte original: [`https://github.com/agentskills/agentskills`](https://github.com/agentskills/agentskills).

## Objetivo

Inspecionar e otimizar `Dockerfile` e fluxos de contêineres, aplicando boas práticas de segurança (non-root user), cache de camadas e redução de tamanho de imagem.

## Quando usar

- Ao criar ou revisar um `Dockerfile`.
- Ao diagnosticar falhas de compilação de imagem Docker.
- Quando o projeto demandar padronização de ambiente de deploy.

## Procedimento

1. Inspecione o `Dockerfile` existente:
   - Verifique a imagem base (`slim`, `alpine` ou `distroless` quando apropriado).
   - Ordene as instruções para maximizar o cache do Docker (ex.: copiar manifests de dependências antes do código fonte).
   - Assegure a execução com usuário sem privilégios (`USER node` ou `USER app`).
2. Garanta que `.dockerignore` esteja configurado:
   - Excluir `.git`, `node_modules`, `.env`, arquivos temporários.
3. Não embutir credenciais ou segredos em camadas da imagem.

