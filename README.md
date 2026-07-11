# LaunchStack

Build AI SaaS products faster with a production-grade starter kit engineered for scale.

LaunchStack is a commercial-quality Turborepo platform for teams who want real architecture, modular packages, and enterprise-ready defaults from day one.

## Why LaunchStack

- Built for paid products, not demos
- Strict modular package boundaries
- Multi-tenant auth and organizations
- RBAC and API key primitives included
- AI-ready data model with pgvector support
- Docker-first local development experience

## Features

- Next.js App Router + TypeScript + Tailwind
- Better Auth with email/password and OAuth-ready setup
- PostgreSQL + Prisma + pgvector
- Stripe-ready billing package
- S3-compatible storage package
- Vercel AI SDK package with provider abstraction
- OpenAPI endpoint and API key routes
- Shared UI package and reusable cross-cutting modules

## GIFs

Add product motion previews here.

![Dashboard Walkthrough](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXR1b2k3N2J6YjJ4M2l2cWlyb2JkNDQ2a2h4c3R6dHg1ZmZmaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/coxQHKASG60HrHtvkt/giphy.gif)
![Auth + Onboarding Flow](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzl1dnVibGNtZnB4cXN5cDhidTBvMzFhaW9vYzRrODNhOWI5aGxjMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7aD2saalBwwftBIY/giphy.gif)

## Screenshots

Add polished product screenshots here.

![Landing](https://placehold.co/1600x900/0f172a/ffffff/png?text=LaunchStack+Landing)
![Dashboard](https://placehold.co/1600x900/111827/ffffff/png?text=LaunchStack+Dashboard)
![API Keys](https://placehold.co/1600x900/1f2937/ffffff/png?text=LaunchStack+API+Keys)

## Playground

- Web app local playground: http://localhost:3000
- Docs app local playground: http://localhost:3001
- API schema playground: http://localhost:3000/api/openapi

## Documentation

- Architecture: ./docs/architecture.md
- Deployment: ./docs/deployment.md
- Live docs app (local): http://localhost:3001

## Copy Command

```bash
git clone https://github.com/Girma35/LaunchStack.git && cd LaunchStack && cp .env.example .env && docker compose up -d && pnpm install && pnpm db:generate && pnpm db:migrate && pnpm db:seed && pnpm dev
```

## Quick Start

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Monorepo Structure

```text
apps/
  web/
  docs/
packages/
  ui/
  auth/
  database/
  billing/
  storage/
  ai/
  email/
  analytics/
  permissions/
  shared/
  config/
  tooling/
```

## Roadmap

- [x] Monorepo foundation and strict TypeScript baseline
- [x] Multi-tenant auth, organizations, and RBAC core
- [x] API keys, OpenAPI route, and rate-limit primitive
- [ ] Stripe checkout + customer portal end-to-end flows
- [ ] AI chat UI with streaming, tool calling, and persistence UX
- [ ] RAG ingestion pipeline with vector search retrieval chain
- [ ] Admin panel for feature flags, audit logs, and user management
- [ ] End-to-end test matrix (unit, integration, contract, e2e)

## Changelog

### 0.1.0 - 2026-07-11

- Initial production-oriented monorepo scaffold
- Added core packages: auth, database, permissions, shared, ui, tooling
- Added extension packages: ai, billing, storage, email, analytics
- Implemented auth routes, signup/signin forms, and protected dashboard
- Added API key management endpoint and OpenAPI JSON route
- Added Docker Compose stack for Postgres (pgvector) and MinIO
- Added architecture and deployment documentation

## License

Proprietary or commercial license (update this section based on your distribution model).
