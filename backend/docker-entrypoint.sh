#!/bin bash
set -e

export REFRESH_TOKEN_SECRET=3e2f0149cbcf60939644563fe37fcbdcf514db64774b0dce76ab5731aefcc6102f0843b04d6056b7d5af5750dd25ca9031f4ae2526ee076f71e69d1f9fa425ed

export POSTGRES_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_NAME}?schema=public

timestamp=$(date +%s)

rm -rf prisma/migrations/

yarn prisma db pull
mkdir -p prisma/migrations/${timestamp}_init

yarn prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma  --script > prisma/migrations/${timestamp}_init/migration.sql

yarn prisma migrate resolve --applied ${timestamp}_init
yarn prisma generate
yarn serve