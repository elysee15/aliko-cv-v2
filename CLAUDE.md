# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`create-t3-turbo` monorepo (Turborepo) with three apps (Next.js 15, TanStack Start, Expo 54) sharing a tRPC v11 API, Better Auth, and Drizzle/Postgres. All internal packages are namespaced `@aliko/*`.

**Package manager is Bun (`bun@1.3.9`), not pnpm.** There is no `pnpm-workspace.yaml`: workspaces *and* dependency catalogs live in the root `package.json` under `workspaces.packages`, `workspaces.catalog` and `workspaces.catalogs.react19`. Dependencies pinned with `"catalog:"` / `"catalog:react19"` in a workspace resolve from there — bump the version in the root catalog, never in the leaf package.

## Commands

Run from repo root (Turbo fans out to workspaces):

```bash
bun install
bun run dev              # all apps, watch mode
bun run dev:next         # Next.js app + its deps only
bun run build
bun run typecheck
bun run lint             # bun run lint:fix to autofix
bun run format           # bun run format:fix to write
bun run lint:ws          # sherif — monorepo dependency consistency
bun run db:push          # drizzle-kit push (interactive)
bun run db:studio
bun run auth:generate    # regenerate packages/db/src/auth-schema.ts
bun run ui-add           # interactive shadcn/ui component add into packages/ui
bunx turbo gen init      # scaffold a new workspace package
```

Scope a task to one workspace with Turbo filters: `turbo -F @aliko/db push`, `turbo run typecheck -F @aliko/api`. Trailing `...` includes dependencies (`-F @aliko/nextjs...`).

There is no test runner configured in this repo.

## Environment

Single root `.env` (copy from `.env.example`). App/package scripts that need it wrap themselves in `with-env` = `dotenv -e ../../.env --`; when adding a script that touches the DB or auth, do the same. Env vars are validated per-app/package through `@t3-oss/env-*` in `apps/*/src/env.ts` and `packages/auth/env.ts`; new vars must also be declared in `turbo.json` `globalEnv` or Turbo will not pass them through and will not invalidate its cache on change.

## Architecture

**Data flow:** app route handler → `createTRPCContext({ headers, auth })` → `appRouter` → Drizzle `db`. Each app owns its own auth instance and its own tRPC entrypoints; `packages/api` stays app-agnostic.

- `packages/api` — tRPC root router (`src/root.ts`), routers in `src/router/*`, and `src/trpc.ts` which defines the context plus `publicProcedure` / `protectedProcedure` (the protected one narrows `ctx.session.user` to non-null). superjson transformer; Zod errors are flattened into `shape.data.zodError`.
- `packages/auth` — `initAuth()` factory, not a singleton. Each app calls it with its own `baseUrl` / `productionUrl` and app-specific `extraPlugins` (`nextCookies()` for Next.js). Includes `oAuthProxy` (so preview deployments and Expo can share a stable OAuth callback) and the `expo()` plugin. `packages/auth/script/auth-cli.ts` is a CLI-only config kept out of `src/` deliberately — never import it at runtime; `src/index.ts` is the runtime config.
- `packages/db` — Drizzle on `@vercel/postgres` (edge-bound), `casing: "snake_case"`. Subpath exports `./client` (the `db` instance), `./schema`, and root (re-exports drizzle SQL helpers). `src/auth-schema.ts` is **generated** by `bun run auth:generate` — edit the Better Auth config, not that file.
- `packages/validators` — Zod schemas shared between client and server. Backend-only code must stay in `@aliko/api`, which is a prod dependency of the Next.js/TanStack apps only and a dev dependency everywhere else.
- `packages/ui` — shadcn/ui components, one subpath export per component (`@aliko/ui/button`). Adding a component means adding its export entry.
- `tooling/*` — shared eslint presets (`@aliko/eslint-config/base|react|nextjs`), prettier config, Tailwind v4 theme (`@aliko/tailwind-config/theme`), tsconfigs (`base.json`, `compiled-package.json`).

**App wiring parallels:** `src/auth/server.ts` + `src/auth/client.ts`, a tRPC client module, and catch-all handlers — Next.js `src/app/api/{auth/[...all],trpc/[trpc]}/route.ts`; TanStack Start `src/routes/api/{auth.$,trpc.$}.ts`; Expo talks to the deployed Next.js app via `src/utils/base-url.ts`.

**Compiled vs source packages:** `api`, `db`, `validators` extend `@aliko/tsconfig/compiled-package.json` and export `dist/*.d.ts` for types with `src/*.ts` as the runtime entry, so `build`/`dev` run `tsc` to emit declarations. `auth` and `ui` are source-only. Turbo's `lint`/`typecheck` depend on `^build`, so a stale `dist` surfaces as type errors in downstream apps.

ESLint runs flat configs written in TypeScript and requires `--flag unstable_native_nodejs_ts_config` (already in every `lint` script).

CI (`.github/workflows/ci.yml`) runs lint + `lint:ws`, format, and typecheck on Bun via `tooling/github/setup`.

## Design tooling (Impeccable)

The [Impeccable](https://impeccable.style) skill is installed globally (`~/.claude/skills/impeccable`, agents in `~/.claude/agents/impeccable-*.md`), so it is available in every session here without project-level install.

Use it for any frontend/UI work in `apps/*` and `packages/ui` — new surfaces, redesigns, UI audits, accessibility, typography, layout, color, motion. It is not for backend-only work (`packages/api`, `packages/db`, `packages/auth`).

```
/impeccable audit [target]   # review an existing surface
/impeccable shape [target]   # design/redesign a surface
/impeccable polish|harden|animate|typeset|colorize|layout [target]
/impeccable doctor           # report drift between PRODUCT.md / DESIGN.md and the code
```

`/impeccable init` has already been run. Project design context lives in:

- `PRODUCT.md` — product truth, audience, surfaces.
- `DESIGN.md` — the design system (frontmatter tokens + narrative rules). Sidecar: `.impeccable/design.json`.
- `.impeccable/config.json`, `.impeccable/hook.cache.json` — skill config and detector hook cache.

**Read `DESIGN.md` before touching UI.** Its non-negotiables, in short:

- North star "la table de travail": white paper, 1px hairlines, cards flat at rest. The v1 glass/`backdrop-filter` direction is *abandoned*, not toned down — no translucency, no blurred ambience.
- One accent only (`sauge`, `--primary`), under ~10% of a screen: one filled button per view, everything else outline/ghost.
- CV/letter pages use `--document` / `--document-foreground` / `--document-border` and stay white and opaque in dark mode — never themed.
- The five candidature status hues (`--status-{draft,sent,interview,offer,rejected}` + `-soft`) never leave the candidature object, and a colored pill always carries its text label.
- Instrument Sans for everything read; JetBrains Mono only for ≤12px uppercase micro-labels. Both are wired in `apps/nextjs/src/app/layout.tsx` via `next/font/google` as `--font-manrope` / `--font-jetbrains-mono`.
- Any value that can change without a reload is in tabular numerals.
- No gradients, no colored shadows, no bounce/elastic easing.

Token and component locations:

- Design tokens: `tooling/tailwind/theme.css` (`@aliko/tailwind-config/theme`, Tailwind v4 `@theme`) — light and dark blocks. Change them there, never per app.
- Components: `packages/ui` (shadcn/ui, one subpath export each). Change them there, never duplicated per app.

Upgrade the skill with `npx impeccable@latest install --global --providers=claude-code --force`.
