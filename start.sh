#!/bin/sh
set -e

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
PYTHON="$ROOT_DIR/backend/.venv/bin/python"

cd "$ROOT_DIR/backend"

"$PYTHON" -m app.db.seed

"$PYTHON" -m uvicorn app.main:create_app \
  --factory \
  --host 127.0.0.1 \
  --port 8000 &

BACKEND_PID=$!

trap 'kill $BACKEND_PID 2>/dev/null || true' EXIT

cd "$ROOT_DIR/frontend"

npm start -- --hostname 0.0.0.0 --port "${PORT:-3000}"
