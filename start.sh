#!/bin/sh
set -e

ROOT_DIR="$(pwd)"

if [ -x "$ROOT_DIR/backend/.venv/bin/python" ]; then
  PYTHON="$ROOT_DIR/backend/.venv/bin/python"
else
  PYTHON="python3"
fi

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
