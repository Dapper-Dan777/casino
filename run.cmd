@echo off
cd /d "%~dp0"

where npm >nul 2>nul || (
  echo Node.js / npm wurde nicht gefunden.
  echo Installiere Node.js LTS und starte die Datei danach erneut.
  pause
  exit /b 1
)

npm install
npm run dev
