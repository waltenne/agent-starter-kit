@echo off
node "%~dp0validate.mjs" %*
if %ERRORLEVEL% NEQ 0 (
  echo Validation failed.
  exit /b %ERRORLEVEL%
)
