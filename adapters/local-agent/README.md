# Adaptador Agente Local (Local Agent Adapter)

## Status de compatibilidade

- Nível: conceitual
- Última revisão: 2026-09-15
- Fonte: Modelos locais (Ollama, LM Studio, Llama.cpp, vLLM, etc.)

## Arquivo de instruções

`AGENTS.md` ou arquivo de instrução de sistema fornecido ao runtime local.

## Skills

Skills mantidas em `.agents/skills/*.md` e carregadas dinamicamente se o runtime local suportar.

## Subagentes

Subagentes executados como instâncias locais separadas ou threads de contexto isoladas.

## Memória

Estrutura local em `.agents/memory/index.md`.

## Ferramentas

APIs locais REST/gRPC, chamadas de terminal shell e conectores configurados localmente.

## Limitações

Desempenho e capacidade de seguir instruções complexas em Markdown dependem do tamanho e capacidade do modelo local (LLM). Evitar dependências externas de rede.

## Procedimento de adaptação

1. Leia `rules.md`.
2. Leia o blueprint selecionado.
3. Gere o workspace genérico.
4. Aplique o formato específico deste adaptador (adicione `AGENTS.md` ao contexto do modelo local).
5. Ajuste caminhos e referências.
6. Valide o resultado com `bash scripts/validate.sh`.

