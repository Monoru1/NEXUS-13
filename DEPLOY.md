# DEPLOY.md — Deployment guide for NEXUS//13

## Platform

Deployed on **Netlify** via the `@netlify/plugin-nextjs` adapter (auto-detected — no explicit plugin declaration needed in `netlify.toml`).

## Requirements

- Node 20 (set in `netlify.toml` via `NODE_VERSION = "20"`)
- The Netlify Next.js plugin auto-installs at build time
- No environment variables required for the base build (no external services in active phases)

## netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--no-audit --no-fund"

[[headers]]
  for = "/*"
  [headers.values]
    X-Nexus-Classification = "NEXUS//SECRET//NOFORN"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
```

**Critical:** Do NOT add a `[[plugins]]` block. Netlify auto-detects Next.js and installs the adapter. Explicit plugin declaration without a matching `package.json` entry causes build failure.

## Branch strategy

```
main                         ← production (auto-deploys to Netlify)
claude/setup-project-...     ← Phase 1+2 (merged to main)
claude/phase-3-graph         ← Phase 3+4 — merge to main when ready
```

Always merge to `main` via PR — Netlify deploy triggers on push to `main`.

## Build verification

Before merging to `main`:

```bash
npm run typecheck     # must pass with 0 errors
npm run build         # must succeed — check for type errors and missing imports
```

## Known issues and fixes

### Tailwind v4 + next/font
Tailwind v4 `@import 'tailwindcss'` expands inline at parse time. Font `@import` statements inside `globals.css` violate CSS spec ordering and break the font load on production. **Fix:** All font `<link>` tags are declared in `app/layout.tsx` `<head>`, not in CSS.

### next/font variable wiring
`Geist_Mono` from `next/font/google` exposes `--font-geist-mono` as a CSS variable on `<html>`. `globals.css` picks it up via `var(--font-geist-mono, 'Geist Mono')` — the fallback handles the edge case where the variable isn't available (SSR first render, font blocked).

### Three.js graph (nexus-graph)
The graph scene (`Scene.tsx`) is loaded with `dynamic(() => import(...), { ssr: false })`. Do not remove the `ssr: false` flag — Three.js requires `window` and `document` at import time and will crash on SSR.

### OrbitControls TypeScript
`three-stdlib` typings are accessed via `import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'` for the ref type. The `@react-three/drei` `OrbitControls` component uses this internally.

## Phases and what ships when

| Phase | Content | Status |
|---|---|---|
| 1 | Foundation, boot sequence, auth, dashboard | Shipped |
| 2 | Dossier viewer (signature screen), 4 dossiers, narrative state | Shipped |
| 3 | Three.js graph, subjects, transmissions, terminal stub | Shipped |
| 4 | OG metadata, favicon, font optimisation, easter eggs, scroll progress | Shipped |
| 5 | Supabase telemetry, fake realtime feed, audio engine | Planned |

## Supabase (Phase 5)

When Phase 5 is ready, the following environment variables will be needed in Netlify UI:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not add these to the repo. Use Netlify environment variable settings.
