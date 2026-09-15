#!/bin/sh
set -eu
cd /workspace
node scripts/preview.mjs stop || true
for port in 8090 8080 8091 8081; do
  if curl -sf -o /dev/null --max-time 2 "http://127.0.0.1:${port}/"; then
    exit 0
  fi
done
npm run dev >>/tmp/app-startup.log 2>&1 &
