# agent-starter-kit

[Versão em português: `README.md`](README.md)

![License](https://img.shields.io/badge/License-MIT-yellow.svg) ![Version](https://img.shields.io/badge/Version-1.1.0-blue.svg) ![Architecture](https://img.shields.io/badge/Architecture-Modular%20Multi--Agent-green.svg) ![Autonomy](https://img.shields.io/badge/Autonomy-N2%20Default-orange.svg)

---

## 📌 What it is

`agent-starter-kit` is an agnostic, portable Markdown-based starter kit for structuring AI agent workspaces. It provides central rules, a conversational wizard, a compatibility matrix ([`compatibility.md`](compatibility.md)), agent adapters ([`adapters/`](adapters/)), domain blueprints, skill/subagent templates, and initial project code layouts.

The kit uses a **two-layer architecture**:
1. **Agnostic Layer (Core)**: Neutral content and rules reusable by any AI agent.
2. **Adaptation Layer (Adapters)**: Format specific to the user's chosen AI agent.

> [!NOTE]
> The kit has a generic layer and optional adapters. If an agent does not have a known format, use the generic adapter and manually configure the instruction file accepted by the tool.

---

## ⚙️ Component Flow and Responsibilities

The kit workflow follows the sequence: `rules.md` → `wizard.md` → `blueprints/` → `templates/`.

- [`rules.md`](rules.md): Centralized general and security rules. Single source of truth.
- [`wizard.md`](wizard.md): Guides diagnostic questions, language, agent choice, and blueprint selection.
- [`blueprints/`](blueprints/): Domain-specific architectural guidance. Does not duplicate central rules. Only one primary blueprint is chosen; secondary blueprints are optional.
- [`templates/`](templates/): Reusable templates for code, skills, and subagents. Skills and subagents are proposed as needed, never created automatically.

| Component | Responsibility |
| --- | --- |
| `rules.md` | General rules and security |
| `wizard.md` | Questions and context selection |
| `blueprints/` | Domain-specific guidance |
| `templates/` | Reusable templates |
| `examples/` | Reference workspaces |
| `scripts/` | Kit validation |

---

## 🚫 What it is not

> [!IMPORTANT]
> This project is **not a functional CLI**, proprietary application, or vendor-locked AI platform. `wizard.md` is a conversational Markdown guide executable by any coding agent or LLM.

---

## 👥 Who it is for

It is intended for individuals and teams needing to standardize agentic workspaces across web development, data science, DevOps, content creation, QA, product, or management in tools like Claude Code, Codex, Cursor, Windsurf, GitHub Copilot, local agents, or multi-agent agencies.

---

## 🚀 Quick start (11-Step Workflow Example)

1. Open `agent-starter-kit` in the coding agent of your choice.
2. Start the flow described in [`wizard.md`](wizard.md).
3. Choose the conversation language (e.g., `pt-BR` or `en`).
4. Choose the artifact language (e.g., `en` or `pt-BR`).
5. Specify which AI agent will be used.
6. Answer the project diagnostic questions.
7. Confirm the summary presented by the AI.
8. Review the proposed file plan.
9. Generate the generic agnostic workspace.
10. Apply the selected AI agent adapter.
11. Run the validation script corresponding to your operating system (`bash scripts/validate.sh` on Linux/macOS or `.\scripts\validate.ps1` / `scripts\validate.cmd` on Windows).

---

## 💻 No-install usage

The recommended way to use the kit is to provide the repository link to a coding agent without installing external dependencies:

```text
Use this repository as the source: <repo-url>

Read rules.md, compatibility.md, and wizard.md.
Follow the complete conversational wizard, starting with the conversation language.
Generate only the approved artifacts in the current workspace.
```

---

## 🧩 Using as an Executable Skill

The recommended pathway for beginners is using the executable skill included in the kit:

```text
skills/starter-kit/SKILL.md
```

When loading the `starter-kit` skill, the AI conducts the interactive diagnostic and launches the automatic bootstrap and workspace validation sequence.

> [!TIP]
> By pasting this instruction into your AI agent (e.g., Antigravity, Claude Code, Cursor, Copilot Workspace, etc.), it will read the rules and launch the conversational wizard automatically.

![Initial Prompt in AI Agent](images/workspace-start-prompt.png)

---

## 🔄 Conversational Wizard Flow

The flow guided by the LLM is divided into the following visual steps:

### 1. Communication Language Selection
The first question establishes the language the LLM will use throughout the conversational interaction:

![1. Communication Language](images/worspace-llm-comunucation.png)

### 2. Artifact & Files Language Selection
Next, the language for generating rules, documentation, and code artifacts is selected:

![2. Artifact Language](images/workspace-langague-files.png)

### 3. Diagnostic & AI Agent Choice
The AI performs the project diagnostic by asking about the target AI agent, primary objective, and scope:

![3. Objective & Diagnostic](images/workspace-objective.png)

---

## 🤖 Multi-Agent Adapters & Compatibility

Consult [`compatibility.md`](compatibility.md) to review the compatibility matrix.

Adapters available in [`adapters/`](adapters/) guide setup for each platform:

- [`adapters/generic/README.md`](adapters/generic/README.md) - Universal Standard Adapter (Agnostic)
- [`adapters/claude-code/README.md`](adapters/claude-code/README.md) - Claude Code Adapter
- [`adapters/codex/README.md`](adapters/codex/README.md) - OpenAI Codex Adapter
- [`adapters/cursor/README.md`](adapters/cursor/README.md) - Cursor Editor Adapter
- [`adapters/windsurf/README.md`](adapters/windsurf/README.md) - Windsurf IDE Adapter
- [`adapters/github-copilot/README.md`](adapters/github-copilot/README.md) - GitHub Copilot Adapter
- [`adapters/local-agent/README.md`](adapters/local-agent/README.md) - Local Agent Adapter (Ollama/LM Studio/vLLM)

---

## 📁 Starting a new workspace

The kit and the generated workspace have separate responsibilities:

```text
agent-starter-kit/              # source repository
├── rules.md
├── compatibility.md
├── wizard.md
├── blueprints/
├── templates/
├── adapters/
└── examples/

my-workspace/                   # configured workspace
├── AGENTS.md                   # central workspace instructions
├── ARCHITECTURE.md
├── ADR.md
├── .agents/
│   ├── skills/                 # approved skills only
│   ├── subagents/              # approved subagents only
│   └── memory/                 # approved memory and index
├── docs/
└── src/                        # initial project source code
```

---

## 📐 Choosing a blueprint

Choose one primary blueprint for the main deliverable:

| Category | Blueprint | Main use |
| --- | --- | --- |
| Technical | [`blueprints/technical/web-dev.md`](blueprints/technical/web-dev.md) | Frontend, backend, full-stack, web, and APIs |
| Technical | [`blueprints/technical/data-science.md`](blueprints/technical/data-science.md) | Data, analysis, experiments, and models |
| Technical | [`blueprints/technical/devops.md`](blueprints/technical/devops.md) | Delivery, infrastructure, and operations |
| Content | [`blueprints/content/content-creator.md`](blueprints/content/content-creator.md) | Planning, writing, and publishing |
| Organizational | [`blueprints/organizational/qa.md`](blueprints/organizational/qa.md) | QA, testing, and release confidence |
| Organizational | [`blueprints/organizational/pm.md`](blueprints/organizational/pm.md) | Product, discovery, and prioritization |
| Organizational | [`blueprints/organizational/tpo.md`](blueprints/organizational/tpo.md) | Technical product and engineering alignment |
| Organizational | [`blueprints/organizational/sm.md`](blueprints/organizational/sm.md) | Scrum facilitation and flow improvement |
| Organizational | [`blueprints/organizational/manager.md`](blueprints/organizational/manager.md) | Leadership, management, and coordination |

---

## 📄 Generating workspace files

[`config.example.yml`](config.example.yml) documents the expected configuration to control file generation, paths, and adapters.

---

## 🛠️ Creating a skill

Use [`templates/skill-template.md`](templates/skill-template.md) for recurring tasks with a single responsibility and predictable output.

---

## 🤖 Creating a subagent

Use [`templates/subagent-template.md`](templates/subagent-template.md) when isolation or specialization provides proven benefit.

---

## 📚 Documentation for Beginners

- [`docs/getting-started.md`](docs/getting-started.md) - Quick start guide and core concepts.
- [`docs/glossary.md`](docs/glossary.md) - Kit terms glossary in alphabetical order.
- [`docs/faq.md`](docs/faq.md) - Frequently asked questions and quick answers.
- [`docs/troubleshooting.md`](docs/troubleshooting.md) - Diagnostics and problem resolution.
- [`docs/walkthrough.md`](docs/walkthrough.md) - Step-by-step example of a real setup session.

---

## 💡 Examples

- [`examples/generic-agent/`](examples/generic-agent/) - Generic agnostic workspace example.
- [`examples/web-dev/`](examples/web-dev/) - Web development workspace example.
- [`examples/multi-agent/`](examples/multi-agent/) - Multi-agent orchestration workspace example.

---

## ✅ Validation and Operating System Specific Guidance

The kit and validation scripts work natively across Linux, macOS, and Windows:

### 🐧 Linux
- **Shell**: Bash (`bash`) or Zsh (`zsh`).
- **Validation Command**:
  ```sh
  bash scripts/validate.sh
  ```
- **Permissions (optional)**:
  ```sh
  chmod +x scripts/validate.sh
  ./scripts/validate.sh
  ```

---

### 🍏 macOS
- **Shell**: Native Terminal, iTerm2, or VS Code Terminal (`zsh` / `bash`).
- **Validation Command**:
  ```sh
  bash scripts/validate.sh
  ```
- **Compatibility**: Uses POSIX-compliant syntax compatible with native macOS (BSD) `find` and `sed`.

---

### 🪟 Windows
- **PowerShell (Recommended)**:
  ```powershell
  .\scripts\validate.ps1
  ```
  *(If execution policy error occurs: `powershell -ExecutionPolicy Bypass -File scripts/validate.ps1`)*

- **Command Prompt (CMD)**:
  ```cmd
  scripts\validate.cmd
  ```

- **WSL (Windows Subsystem for Linux)**:
  ```sh
  bash scripts/validate.sh
  ```

---

## 🔄 Updating and compatibility

Consult [`VERSION`](VERSION) and [`CHANGELOG.md`](CHANGELOG.md) before updating existing workspaces.

---

## 🛡️ Security and privacy

Follow [`rules.md`](rules.md). Never include credentials, tokens, or sensitive data in artifacts.

---

## 🤝 Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 📜 License

This project uses the MIT License. See [`LICENSE`](LICENSE).
