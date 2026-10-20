# Glossário de Termos

- **Adapter**: Conector que formata as regras agnósticas para um agente de IA específico (ex.: Cursor, Claude Code, Windsurf).
- **agent-tool**: CLI determinística em Node.js nativo para diagnóstico de stack, execução de checagens compactas e gestão de capacidades.
- **Agnostic Layer**: Camada de regras e conteúdo neutro reutilizável por qualquer ferramenta de IA.
- **Autonomy Level (N0 a N3)**: Classificação de autonomia: N0 (somente leitura), N1 (escrita local), N2 (efeito externo), N3 (destrutivo/irreversível).
- **Blueprint**: Guia de decisões e arquitetura específico para um domínio (ex.: web-dev, devops, data-science).
- **Capability Manager**: Sistema unificado em `agent-tool skills` para descobrir, avaliar, instalar e auditar skills, toolkits e integrações.
- **Central Rules**: Conjunto único de regras de segurança e governança contido em [`rules.md`](../rules.md).
- **Integration**: Integração com ferramentas executáveis externas ou servidores MCP (ex.: AI Memory, Prism Coder).
- **Lockfile (`.skills-lock.json`)**: Registro de proveniência, versão, escopo e hash sha256 das capacidades gerenciadas no workspace.
- **Primary Blueprint**: Blueprint principal escolhido para orientar a entrega central do workspace.
- **Profiles (Perfis de Instalação)**: Conjuntos curados de capacidades para necessidades específicas (`MINIMAL`, `DEVELOPER`, `DEVOPS_SRE`, `DOCUMENTATION`, `AI_ENGINEERING`).
- **Skill**: Procedimento modular padronizado baseado na [Agent Skills Specification](https://agentskills.io/).
- **Subagent**: Papel especializado delegado para tarefas com limites claros.
- **T0 a T3**: Níveis operacionais de raciocínio: T0 (direto sem subagente), T1 (worker FAST), T2 (implementer BALANCED), T3 (advisor DEEP).
- **Toolkit**: Conjunto composto de skills e workflows integrados que trabalham de forma coordenada (ex.: Superpowers, Upstack).
- **Workspace**: Diretório de projeto configurado com regras, skills e código-fonte.
