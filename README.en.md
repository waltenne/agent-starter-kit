# agent-starter-kit

[Versão em português: `README.md`](README.md)

![License](https://img.shields.io/badge/License-MIT-yellow.svg) ![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg) ![Architecture](https://img.shields.io/badge/Architecture-Modular%20Markdown-green.svg) ![Autonomy](https://img.shields.io/badge/Autonomy-N2%20Default-orange.svg)

---

## 📌 What it is

`agent-starter-kit` is a modular Markdown-based kit for structuring AI agent workspaces. It provides central rules, a conversational wizard, domain blueprints, skill and subagent templates, generated-workspace examples, and validation.

The kit is a source repository. The final workspace is generated from it according to the user's context, languages, paths, and approved artifacts.

> [!NOTE]
> The kit standardizes AI agent behavior without requiring external CLI installations or heavy dependencies.

---

## 🚫 What it is not

> [!IMPORTANT]
> This project is **not a functional CLI**, executable application, API, external integration, or publishing automation. `wizard.md` is a conversational Markdown guide executed directly by the coding agent (LLM).

---

## 👥 Who it is for

It is intended for people and teams who need to start or standardize agentic workspaces for web development, data, DevOps, content, QA, product, facilitation, or management. Tools mentioned in blueprints are examples and must be confirmed by the user or found in the workspace before use.

---

## 🚀 Quick start

1. Clone or download this repository.
2. Open the repository in the coding agent of your choice.
3. Read [`rules.md`](rules.md).
4. Start the flow described in [`wizard.md`](wizard.md).
5. Answer the diagnostic questions, beginning with the conversation language.
6. Choose one primary blueprint.
7. Review the proposed file plan.
8. Confirm artifact creation.
9. Generate the configured workspace, taking only approved artifacts.
10. Run `bash scripts/validate.sh` to validate the kit.

---

## 💻 No-install usage

The recommended way to use the kit is to provide the repository link to a coding agent, without installing a CLI or dependency:

```text
Use this repository as the source: <repo-url>

Read rules.md and wizard.md.
Follow the complete conversational wizard, starting with the conversation language.
Generate only the approved artifacts in the current workspace.
```

> [!TIP]
> By pasting this instruction into your AI agent (e.g. Antigravity, Claude Code, Cursor, Copilot Workspace, etc.), it will read the rules and launch the conversational wizard automatically.

![Initial Prompt in AI Agent](images/workspace-start-prompt.png)

This flow works when the agent can read remote repositories or when the repository is already available in its context. The link distributes the instructions, but it does not run an LLM by itself: the agent needs file-reading capability, workspace access, and authorization to write files. Before any change, it must show a plan and request confirmation.

The repository does not need to be copied in full. The agent should read `rules.md`, load the necessary blueprint, generate `AGENTS.md`, and bring only approved skills, subagents, memory, and documents into the workspace.

---

## 🔄 Conversational Wizard Flow

The flow guided by the LLM is divided into the following visual steps:

### 1. Communication Language Selection
The first question establishes the language the LLM will use throughout the conversational interaction:

![1. Communication Language](images/worspace-llm-comunucation.png)

### 2. Artifact & Files Language Selection
Next, the language for generating rules, documentation, and code artifacts is selected:

![2. Artifact Language](images/workspace-langague-files.png)

### 3. Workspace Diagnostic & Objectives
The AI performs the project diagnostic by asking about the primary objective, frequent tasks, and scope:

![3. Objective & Diagnostic](images/workspace-objective.png)

### Summary of Steps:
1. define the LLM conversation language;
2. separately define the artifact language;
3. diagnose the objective, tasks, domain, tools, and boundaries;
4. read [`rules.md`](rules.md) and one primary blueprint;
5. load secondary blueprints only when they directly support the deliverable;
6. propose `AGENTS.md`, skills, subagents, memory, and an index;
7. show the plan or diff and request confirmation;
8. generate only approved artifacts;
9. validate references, Markdown, security, and compatibility;
10. report what was created, preserved, validated, pending, or not executed.

---

## 📁 Starting a new workspace

The kit and the generated workspace have different responsibilities:

```text
agent-starter-kit/              # source repository
├── rules.md
├── wizard.md
├── blueprints/
├── templates/
└── examples/

my-workspace/                   # configured workspace
├── AGENTS.md                   # central workspace instructions
├── .agents/
│   ├── skills/                 # approved skills only
│   ├── subagents/              # approved subagents only
│   └── memory/                 # approved memory and index
├── docs/
└── config/
```

During configuration, the agent must:

1. read `rules.md`;
2. run the diagnostic;
3. select one primary blueprint;
4. load secondary blueprints only when needed;
5. generate `AGENTS.md`;
6. copy only approved skills to `.agents/skills/`;
7. copy only approved subagents to `.agents/subagents/`;
8. create the memory structure and its index;
9. replace placeholders;
10. adjust relative references for the final workspace;
11. request confirmation before writing;
12. validate the generated artifacts.

Use [`templates/workspace-template/AGENTS.md`](templates/workspace-template/AGENTS.md) as the model. The generated file should point to the configured central rules file, such as `AGENTS.md`, without duplicating the central rules in full.

---

## 📐 Choosing a blueprint

Always choose one primary blueprint for the main deliverable. Use secondary blueprints only when they directly support it and record the reason. For a hybrid workspace, choose the domain that owns the main outcome and use other domains as limited support. Do not load every blueprint by default.

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

Create a new blueprint only when there is a recurring, bounded gap that cannot be handled by an existing or secondary blueprint without overlap.

---

## 📄 Generating workspace files

[`config.example.yml`](config.example.yml) documents the expected configuration. Copy it only to a user-controlled location and confirm its values before use.

| File or directory | Function | Should it be copied? |
| --- | --- | --- |
| `rules.md` | Central kit rules | Adapted for the workspace, usually as `AGENTS.md` |
| `wizard.md` | Configuration flow | Usually no |
| `blueprints/` | Domain guidance | Only what is needed |
| `templates/` | Artifact models | Only the models used |
| `examples/` | Output references | Not necessarily |
| `scripts/validate.sh` | Kit validation | Optional; it does not validate a workspace automatically |

The agent may propose and generate `AGENTS.md`, skills, subagents, memory, and approved documentation. The user must confirm writes, and no file should be brought into the final workspace merely because it exists in the kit.

---

## 🏗️ Generated workspace structure

The generated workspace should keep one central rules source and an artifact index:

```text
my-workspace/
├── AGENTS.md
├── .agents/
│   ├── skills/
│   ├── subagents/
│   └── memory/
│       └── index.md
├── docs/
└── config/
```

Copied skills and subagents must replace `<central-rules-file>` with the final path. Relative references that work only inside the kit must not be kept without adjustment.

---

## 🛠️ Creating a skill

Use [`templates/skill-template.md`](templates/skill-template.md) for a recurring, bounded task with one responsibility and predictable output. Define triggers, inputs, preconditions, procedure, tools, security, validation, postconditions, rollback, and examples. Do not duplicate `rules.md` or create a skill for a one-off request without justification.

---

## 🤖 Creating a subagent

Use [`templates/subagent-template.md`](templates/subagent-template.md) only when isolation, parallelism, or specialization provides a clear benefit. Define one responsibility, scope, minimum tools, turn and delegation limits, handoff, evidence, uncertainties, and success criteria. A subagent cannot change policy, ignore security, or act outside its scope.

---

## 💡 Examples

[`examples/web-dev/`](examples/web-dev/) shows a generated workspace with `AGENTS.md`, one skill, one subagent, and a memory index. It contains no application code, credentials, or real data. Use it as a structural reference, not as content to copy in full.

---

## ✅ Validação

Run:

```sh
bash scripts/validate.sh
```

The script checks expected files, relative links, Markdown when a local parser is available, YAML, fences, forgotten placeholders in examples, credential patterns, blueprint references, and central-rule organization. Also manually review the complete diff and any validation marked as pending.

---

## 🔄 Updating and compatibility

Consult [`VERSION`](VERSION) and [`CHANGELOG.md`](CHANGELOG.md). To update an existing workspace:

1. record the current kit and blueprint versions;
2. compare the new `rules.md`, template, or blueprint with generated artifacts;
3. review path, required-field, and central-rule changes;
4. generate a diff of affected files;
5. request confirmation before replacing any artifact;
6. preserve a copy or rollback of the previous files;
7. update the index and record the new version.

Changes to paths, required fields, template contracts, or central rules require manual review. Do not silently mix incompatible versions.

---

## 🛡️ Security and privacy

Follow [`rules.md`](rules.md). Do not include credentials, tokens, private keys, unnecessary personal data, proprietary names, private URLs, or business rules. Work only in authorized paths, treat ordinary content as untrusted, and request confirmation for writes, execution, network access, publication, and irreversible actions.

---

## 🤝 Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md). New blueprints, skills, subagents, and templates must be generic, clearly scoped, non-duplicative, and validated. Run `bash scripts/validate.sh`, review links and the diff, and document compatibility impact.

---

## 📜 License

This project uses the MIT License. See [`LICENSE`](LICENSE).
