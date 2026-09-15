# PowerShell validation script wrapper for Windows
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

node scripts/validate.mjs $args
