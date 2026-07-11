# LaunchStack Architecture

## Monorepo Topology

- apps/web: Product application (Next.js App Router, auth, dashboard, API endpoints)
- apps/docs: Developer documentation portal
- packages/*: Isolated feature modules with strict boundaries

## Architectural Principles

- Clean architecture by package
- Domain interfaces separated from infrastructure adapters
- Shared configuration and error handling across modules
- Organization-first multi-tenant data model

## Package Layering

- packages/shared: Cross-cutting concerns (env validation, error primitives)
- packages/database: Prisma schema, client lifecycle, migrations, seed
- packages/auth: Better Auth integration + session and organization orchestration
- packages/permissions: RBAC service and repositories
- packages/ui: Shared design-system components
- packages/ai, billing, storage, email: Infrastructure adapters for external providers

## Runtime Request Flow

1. Request enters apps/web route handler or server action
2. Auth context is resolved from Better Auth session
3. RBAC service checks org-scoped permission
4. Use-case writes/reads via package repositories
5. Response returns typed payload validated at boundaries

## Security Model

- Session-based app auth via Better Auth
- API key auth for machine-to-machine API access
- Hash-only API key storage
- Organization-scoped role/permission matrix
- Audit-ready log tables for mutation trails

## Data Model Highlights

- Users, sessions, OAuth accounts
- Organizations, memberships, invitations
- Role permissions and API keys
- Feature flags and per-user overrides
- Conversations/messages/prompt templates/documents for AI workflows

## Extensibility

- Add new module by creating package with domain interfaces and adapters
- Expose package API via exports in package.json
- Compose in app layer without cross-importing internal module files
