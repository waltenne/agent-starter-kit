@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0validate.ps1"
if %ERRORLEVEL% NEQ 0 (
  echo Validation failed.
  exit /b %ERRORLEVEL%
)
