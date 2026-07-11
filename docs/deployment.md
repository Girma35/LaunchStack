# Deployment Guide

## Local Development

1. Start infrastructure:
   - docker compose up -d
2. Install dependencies:
   - pnpm install
3. Generate Prisma client:
   - pnpm db:generate
4. Run migrations and seed:
   - pnpm db:migrate
   - pnpm db:seed
5. Start apps:
   - pnpm dev

## Production Targets

- apps/web: Vercel or containerized Next.js runtime
- apps/docs: Vercel or static docs deployment
- PostgreSQL: managed cloud provider
- Object storage: S3 compatible (AWS S3, Cloudflare R2, MinIO)

## Required Services

- PostgreSQL 15+
- Object storage
- Stripe
- Resend
- AI provider keys

## Security Checklist

- Set BETTER_AUTH_SECRET to a 32+ char random value
- Restrict CORS and callback URLs per environment
- Rotate API keys and webhook secrets regularly
- Enable database backups and point-in-time recovery
- Enable structured logs and audit retention
