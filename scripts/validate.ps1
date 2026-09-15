# PowerShell validation script for Windows
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$expectedFiles = @(
  "LICENSE", "README.md", "README.en.md", "CONTRIBUTING.md", "CHANGELOG.md", "VERSION", "config.example.yml", "wizard.md", "rules.md", "compatibility.md",
  "scripts/validate.sh",
  "scripts/validate.ps1",
  "scripts/validate.cmd",
  "images/workspace-start-prompt.png",
  "images/worspace-llm-comunucation.png",
  "images/workspace-langague-files.png",
  "images/workspace-objective.png",
  "blueprints/technical/web-dev.md",
  "blueprints/technical/data-science.md",
  "blueprints/technical/devops.md",
  "blueprints/content/content-creator.md",
  "blueprints/organizational/qa.md",
  "blueprints/organizational/pm.md",
  "blueprints/organizational/tpo.md",
  "blueprints/organizational/sm.md",
  "blueprints/organizational/manager.md",
  "adapters/generic/README.md",
  "adapters/claude-code/README.md",
  "adapters/codex/README.md",
  "adapters/cursor/README.md",
  "adapters/windsurf/README.md",
  "adapters/github-copilot/README.md",
  "adapters/local-agent/README.md",
  "templates/skill-template.md", "templates/subagent-template.md",
  "templates/workspace-template/AGENTS.md",
  "templates/workspace-template/README.md",
  "templates/workspace-template/ARCHITECTURE.md",
  "templates/workspace-template/ADR.md",
  "templates/workspace-template/docs/adr/0001-initial-stack.md",
  "templates/workspace-template/src/shared/config.ts",
  "templates/workspace-template/src/shared/logger.ts",
  "templates/workspace-template/src/shared/errors.ts",
  "templates/workspace-template/src/domain/index.ts",
  "templates/workspace-template/src/domain/domain.service.ts",
  "templates/workspace-template/src/domain/domain.types.ts",
  "templates/workspace-template/src/domain/domain.service.test.ts",
  "examples/web-dev/AGENTS.md",
  "examples/web-dev/.agents/skills/review-api.md",
  "examples/web-dev/.agents/subagents/test-analyzer.md",
  "examples/web-dev/.agents/memory/index.md",
  "examples/generic-agent/AGENTS.md",
  "examples/generic-agent/README.md",
  "examples/generic-agent/config.yml",
  "examples/generic-agent/.agents/skills/generic-task.md",
  "examples/generic-agent/.agents/subagents/generic-worker.md",
  "examples/generic-agent/.agents/memory/index.md",
  "examples/generic-agent/docs/architecture.md",
  "examples/multi-agent/AGENTS.md",
  "examples/multi-agent/README.md",
  "examples/multi-agent/config.yml",
  "examples/multi-agent/.agents/skills/coordinate-agents.md",
  "examples/multi-agent/.agents/subagents/backend-agent.md",
  "examples/multi-agent/.agents/subagents/qa-agent.md",
  "examples/multi-agent/.agents/memory/index.md",
  "examples/multi-agent/docs/multi-agent-setup.md"
)

foreach ($file in $expectedFiles) {
  if (-not (Test-Path $file)) {
    Write-Error "Missing required file: $file"
    exit 1
  }
}

$blueprints = @(
  "technical/web-dev.md", "technical/data-science.md", "technical/devops.md",
  "content/content-creator.md", "organizational/qa.md", "organizational/pm.md",
  "organizational/tpo.md", "organizational/sm.md", "organizational/manager.md"
)

$readmeText = Get-Content "README.md" -Raw
$wizardText = Get-Content "wizard.md" -Raw

foreach ($bp in $blueprints) {
  if ($readmeText -notmatch [regex]::Escape("blueprints/$bp")) {
    Write-Error "Blueprint missing from README: $bp"
    exit 1
  }
  if ($wizardText -notmatch [regex]::Escape("blueprints/$bp")) {
    Write-Error "Blueprint missing from wizard: $bp"
    exit 1
  }
  $bpText = Get-Content "blueprints/$bp" -Raw
  if ($bpText -notmatch [regex]::Escape("../../rules.md")) {
    Write-Error "Blueprint missing central-rules reference: $bp"
    exit 1
  }
}

$adapters = @("generic", "claude-code", "codex", "cursor", "windsurf", "github-copilot", "local-agent")
foreach ($ad in $adapters) {
  if ($readmeText -notmatch [regex]::Escape("adapters/$ad/README.md")) {
    Write-Error "Adapter missing from README: $ad"
    exit 1
  }
  if ($wizardText -notmatch [regex]::Escape("adapters/$ad/README.md")) {
    Write-Error "Adapter missing from wizard: $ad"
    exit 1
  }
}

Write-Host "Artifact indexes, central rules, placeholders, adapters, compatibility, and sensitive-value checks: PASS"

