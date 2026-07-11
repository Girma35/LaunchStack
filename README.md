# LaunchStack

Commercial-grade AI SaaS starter kit built as a Turborepo monorepo.

## What is implemented in this phase

- Monorepo foundation with strict TypeScript, Turbo pipeline, shared config package
- Production data model with PostgreSQL, Prisma, and pgvector extension
- Better Auth integration package with org bootstrap and invitation acceptance flows
- RBAC package with repository-backed permission checks
- Next.js App Router web app with signup/signin and protected dashboard
- API key management endpoint and OpenAPI route
- Database-backed API rate limiting primitive
- Docker Compose for local PostgreSQL + MinIO
- Documentation app and architecture/deployment docs

## Quick Start

1. Copy environment config:
   - cp .env.example .env
2. Start local infrastructure:
   - docker compose up -d
3. Install dependencies:
   - pnpm install
4. Generate Prisma client and apply migration:
   - pnpm db:generate
   - pnpm db:migrate
   - pnpm db:seed
5. Start apps:
   - pnpm dev

## Monorepo Structure

- apps/web
- apps/docs
- packages/ui
- packages/auth
- packages/database
- packages/billing
- packages/storage
- packages/ai
- packages/email
- packages/analytics
- packages/permissions
- packages/shared
- packages/config
- packages/tooling
