# Volunteer Admin Frontend

A Next.js 15 dashboard for managing volunteer operations. It ships with Supabase-driven auth, data tables, and a shadcn/ui-based component system.

## Tech Stack
- Next.js App Router with React 19 and Turbopack development server
- Supabase for authentication and data access
- Tailwind CSS v4 and shadcn/ui for styling
- TypeScript with ESLint (Next.js preset) for type-safety and linting

## Getting Started
1. Install dependencies (requires Node 18+ and pnpm):
   ```bash
   pnpm install
   ```
2. Copy `.env.example` to `.env.local` and fill in project credentials (never commit `.env.local`):
   ```bash
   cp .env.example .env.local
   ```
   Required variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=... # optional, only for server routes needing elevated access
   ```
3. Launch the dev server:
   ```bash
   pnpm dev
   ```
   The app is available at `http://localhost:3000`.

## Available Scripts
- `pnpm dev` – Run the Turbopack dev server with hot reload.
- `pnpm build` – Produce the optimized production bundle.
- `pnpm start` – Serve the production build locally.
- `pnpm lint` – Run ESLint using the Next.js + TypeScript ruleset.

## Project Structure
```
app/              # App Router routes and layouts
components/       # Reusable UI, shadcn/ui primitives under components/ui
hooks/            # React hooks for auth and responsive helpers
lib/              # Shared utilities and Supabase clients
public/           # Static assets
middleware.ts     # Edge middleware hook (wire it to Supabase session helper)
```

## Supabase Notes
- Client-side auth lives in `@/lib/supabase/client`; server routes should create clients via `@/lib/supabase/server` to keep cookies in sync.
- For API routes that need privileged queries, prefer `SUPABASE_SERVICE_ROLE_KEY` and limit selected columns to avoid leaking PII.
- Hook up `lib/supabase/middleware.ts` in `middleware.ts` to keep sessions refreshed, or remove the unused helper.

## Contributing
Refer to [`AGENTS.md`](./AGENTS.md) for coding standards, commit/PR expectations, and environment tips specific to this repository.
