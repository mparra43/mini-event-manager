#!/bin/sh
set -e

echo "[entrypoint] waiting for database to be ready..."

# Wait until Prisma can pull the DB schema (means DB is reachable)
until npx prisma db pull >/dev/null 2>&1; do
  echo "[entrypoint] database not ready, retrying in 2s..."
  sleep 2
done

echo "[entrypoint] database reachable. Applying migrations (deploy -> fallback to db push)..."

# Try to apply migrations (preferred in deployed environments)
if npx prisma migrate deploy >/dev/null 2>&1; then
  echo "[entrypoint] migrations applied (deploy)."
else
  echo "[entrypoint] migrate deploy failed or no migrations found — running db push as fallback..."
  npx prisma db push
fi

echo "[entrypoint] starting app: $@"
exec "$@"
