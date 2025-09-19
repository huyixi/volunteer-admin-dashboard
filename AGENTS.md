# Repository Guidelines

## Project Structure & Module Organization
- `app/` hosts Next.js App Router routes; `app/(auth)` contains sign-in/up flows and `app/dashboard` renders analytics sourced from `app/dashboard/data.json`.
- Shared UI lives in `components/`, with design-system primitives under `components/ui/` (generated via shadcn). Feature-specific logic sits in `hooks/` and `lib/`, while Supabase clients are isolated in `lib/supabase/`.
- Global styles load from `app/globals.css`; static assets (logos, icons) belong in `public/`. Request/session handling is centralized in `middleware.ts`.

## Build, Test, and Development Commands
- `pnpm install` synchronizes dependencies; please commit the resulting `pnpm-lock.yaml` changes.
- `pnpm dev` runs the app with Turbopack at `http://localhost:3000`; verify key dashboards and auth flows here before opening a PR.
- `pnpm build` produces a production bundle; run it before releases. Use `pnpm start` to serve the optimized build locally.
- `pnpm lint` runs the Next.js + TypeScript rule set—fix issues before pushing (`pnpm lint --fix` handles most formatting problems).

## Coding Style & Naming Conventions
- TypeScript is required; prefer typed server actions and React components. Use 2-space indentation, `PascalCase` for components, and `camelCase` for utilities.
- Re-export shared helpers from `lib/utils.ts` when possible. Keep Supabase access within `lib/supabase/*` to preserve a single integration point.
- Tailwind CSS v4 powers styling; keep variants in `class-variance-authority` factories and co-locate component-specific classes.
- Import local modules via the configured aliases (`@/components`, `@/lib`, `@/hooks`) to preserve predictable paths.

## Testing Guidelines
- No automated test runner is wired up yet. When introducing one, prefer Vitest + Testing Library, add a `pnpm test` script, and place specs beside the code (`component.test.tsx` or `__tests__/`).
- Until automated coverage lands, document manual test steps in each PR (e.g., "✅ pnpm dev → visited /dashboard and /signin").

## Commit & Pull Request Guidelines
- Follow Conventional Commit prefixes observed in history (`feat:`, `chore`, `fix:`). Keep subject lines under 72 characters and focus on observable behavior.
- Every PR must include: purpose summary, linked issue or ticket, screenshots/GIFs for UI updates, and a checklist of commands run (`pnpm lint`, manual QA).
- Keep PRs scoped to a single feature or fix; split large changes into reviewable chunks.

## Environment & Configuration Tips
- Define `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` in `.env.local`; never commit secrets.
- When adding new environment variables, reference them via `process.env` only inside server files or `lib/supabase/` helpers to avoid accidental client exposure.
