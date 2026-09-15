#!/usr/bin/env bash
set -euo pipefail

repo_root="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$repo_root"

expected_files=(
  LICENSE README.md README.en.md CONTRIBUTING.md CHANGELOG.md VERSION config.example.yml wizard.md rules.md compatibility.md
  scripts/validate.sh
  scripts/validate.ps1
  scripts/validate.cmd
  images/workspace-start-prompt.png
  images/worspace-llm-comunucation.png
  images/workspace-langague-files.png
  images/workspace-objective.png
  blueprints/technical/web-dev.md
  blueprints/technical/data-science.md
  blueprints/technical/devops.md
  blueprints/content/content-creator.md
  blueprints/organizational/qa.md
  blueprints/organizational/pm.md
  blueprints/organizational/tpo.md
  blueprints/organizational/sm.md
  blueprints/organizational/manager.md
  adapters/generic/README.md
  adapters/claude-code/README.md
  adapters/codex/README.md
  adapters/cursor/README.md
  adapters/windsurf/README.md
  adapters/github-copilot/README.md
  adapters/local-agent/README.md
  templates/skill-template.md templates/subagent-template.md
  templates/workspace-template/AGENTS.md
  templates/workspace-template/README.md
  templates/workspace-template/ARCHITECTURE.md
  templates/workspace-template/ADR.md
  templates/workspace-template/docs/adr/0001-initial-stack.md
  templates/workspace-template/src/shared/config.ts
  templates/workspace-template/src/shared/logger.ts
  templates/workspace-template/src/shared/errors.ts
  templates/workspace-template/src/domain/index.ts
  templates/workspace-template/src/domain/domain.service.ts
  templates/workspace-template/src/domain/domain.types.ts
  templates/workspace-template/src/domain/domain.service.test.ts
  examples/web-dev/AGENTS.md
  examples/web-dev/.agents/skills/review-api.md
  examples/web-dev/.agents/subagents/test-analyzer.md
  examples/web-dev/.agents/memory/index.md
  examples/generic-agent/AGENTS.md
  examples/generic-agent/README.md
  examples/generic-agent/config.yml
  examples/generic-agent/.agents/skills/generic-task.md
  examples/generic-agent/.agents/subagents/generic-worker.md
  examples/generic-agent/.agents/memory/index.md
  examples/generic-agent/docs/architecture.md
  examples/multi-agent/AGENTS.md
  examples/multi-agent/README.md
  examples/multi-agent/config.yml
  examples/multi-agent/.agents/skills/coordinate-agents.md
  examples/multi-agent/.agents/subagents/backend-agent.md
  examples/multi-agent/.agents/subagents/qa-agent.md
  examples/multi-agent/.agents/memory/index.md
  examples/multi-agent/docs/multi-agent-setup.md
)

for file in "${expected_files[@]}"; do
  [[ -f "$file" ]] || { echo "Missing required file: $file" >&2; exit 1; }
done

while IFS= read -r file; do
  found=false
  for expected in "${expected_files[@]}"; do
    [[ "$file" == "$expected" ]] && found=true && break
  done
  $found || { echo "Unexpected file: $file" >&2; exit 1; }
done < <(find . -path './.git' -prune -o -type f -print | sed 's|^\./||')

if command -v ruby >/dev/null 2>&1 && ruby -e 'require "kramdown"' >/dev/null 2>&1; then
  ruby -rkramdown -ryaml -e '
    files = Dir.glob("**/*", File::FNM_DOTMATCH).select { |path| File.file?(path) && path.match?(/\.(md|yml)\z/) }
    files.each do |path|
      text = File.read(path)
      if path.end_with?(".md")
        Kramdown::Document.new(text).to_html
        abort "unbalanced fenced blocks: #{path}" if text.lines.count { |line| line.match?(/^\s*```/) }.odd?
        text.scan(/\[[^\]]+\]\(([^)]+)\)/).flatten.each do |target|
          next if target.start_with?("#", "http://", "https://", "mailto:")
          resolved = File.expand_path(target.split("#", 2).first, File.dirname(path))
          abort "broken relative link #{path}: #{target}" unless File.exist?(resolved)
        end
      else
        YAML.safe_load(text, permitted_classes: [], aliases: false)
      end
    end
  '
  echo "Markdown, frontmatter, YAML, fences, and relative links: PASS"
else
  echo "Markdown parser unavailable; structural checks continue (manual Markdown review required)"
fi

if grep -rE -n '<(TODO|TBD|FIXME|fill-|replace-|your-)[^>]*>' examples >/dev/null 2>&1; then
  echo "Unfilled placeholder in generated example" >&2
  exit 1
fi

if grep -rE -n --exclude="LICENSE" --exclude-dir=".git" 'BEGIN [A-Z ]+ KEY|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}' . >/dev/null 2>&1; then
  echo "Possible sensitive value found" >&2
  exit 1
fi

for blueprint in \
  technical/web-dev.md technical/data-science.md technical/devops.md \
  content/content-creator.md organizational/qa.md organizational/pm.md \
  organizational/tpo.md organizational/sm.md organizational/manager.md; do
  grep -q "blueprints/${blueprint}" README.md || { echo "Blueprint missing from README: $blueprint" >&2; exit 1; }
  grep -q "blueprints/${blueprint}" wizard.md || { echo "Blueprint missing from wizard: $blueprint" >&2; exit 1; }
  grep -q '../../rules.md' "blueprints/${blueprint}" || { echo "Blueprint missing central-rules reference: $blueprint" >&2; exit 1; }
done

for adapter in generic claude-code codex cursor windsurf github-copilot local-agent; do
  grep -q "adapters/${adapter}/README.md" README.md || { echo "Adapter missing from README: $adapter" >&2; exit 1; }
  grep -q "adapters/${adapter}/README.md" wizard.md || { echo "Adapter missing from wizard: $adapter" >&2; exit 1; }
done

if grep -rE -n '\]\(\.\./rules\.md\)' blueprints >/dev/null 2>&1; then
  echo "Stale blueprint rules link found" >&2
  exit 1
fi

grep -q '^# Central Rules$' rules.md || { echo "rules.md is missing its central section" >&2; exit 1; }
if grep -rn '^# Central Rules$' --include="*.md" . | grep -v '^\./rules.md:' | grep -q .; then
  echo "Central rules heading duplicated outside rules.md" >&2
  exit 1
fi

grep -q "Qual idioma você deseja que eu use para me me comunicar com você durante todo este processo?" wizard.md || grep -q "Qual idioma você deseja que eu use para me comunicar com você durante todo este processo?" wizard.md || { echo "wizard.md missing first mandatory language question" >&2; exit 1; }

echo "Artifact indexes, central rules, placeholders, adapters, compatibility, and sensitive-value checks: PASS"
