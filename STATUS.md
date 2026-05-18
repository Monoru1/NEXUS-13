# NEXUS//13 — Session Status

**Session date:** 2026-05-18  
**Branch:** `claude/setup-project-verification-ZSh4Z`

---

## What shipped

### Phase 1 — Foundation (verified running)
- Boot sequence, dashboard, design system, all shell components
- **Fixed:** `typedRoutes` removed from `next.config.mjs` (Turbopack incompatible)
- **Fixed:** Font `@import` rules moved from `globals.css` to `<head>` link tags in `app/layout.tsx` — Tailwind v4 expands `@import 'tailwindcss'` to ~830 lines before subsequent `@import` rules, violating the CSS spec; font CDN links now load via `<link>` in the root layout

### Phase 2 — Signature screen (complete)
| File | Status |
|---|---|
| `lib/utils/cn.ts` | ✓ shipped |
| `types/narrative.ts` | ✓ shipped |
| `lib/store/narrative.ts` | ✓ shipped |
| `lib/persistence/indexed-db.ts` | ✓ shipped |
| `content/dossiers/n13-001-ariadne.ts` | ✓ shipped — 5 timeline events, 12 evidence items, 2 contradictions, 3 subjects. Prose register: Ben Macintyre. Reads as an actual leaked document. |
| `components/primitives/RedactedText.tsx` | ✓ shipped |
| `components/primitives/DataLine.tsx` | ✓ shipped |
| `components/dossier/DossierHeader.tsx` | ✓ shipped |
| `components/dossier/DossierTimeline.tsx` | ✓ shipped |
| `components/dossier/ContradictionMarker.tsx` | ✓ shipped |
| `components/dossier/EvidencePanel.tsx` | ✓ shipped |
| `components/dossier/SubjectCard.tsx` | ✓ shipped |
| `app/(system)/archives/page.tsx` | ✓ shipped |
| `app/(system)/archives/[slug]/page.tsx` | ✓ shipped — signature screen with 8/4 grid, clearance meter, observer log |

**All routes respond 200. `npm run typecheck` clean.**

---

## What is blocked / not built

- N13-002 VESPER, N13-003 KAIROS, N13-004 MERIDIAN dossier data files (not in scope for Phase 2 — only ARIADNE was required)
- Phase 3: Three.js network graph, terminal page (deliberately deferred)
- Phase 4: Supabase telemetry, audio engine, WebSockets (deliberately deferred)

---

## Next file to write

If continuing Phase 2 polish:
- `components/system/SystemDock.tsx` — add active state for `/archives` route (currently only `NX` is highlighted)
- Add `loading.tsx` files to `app/(system)/archives/` for skeleton states

If starting Phase 3:
- `app/(system)/graph/page.tsx` — Three.js subject relationship network
- `app/(system)/terminal/page.tsx` — interactive terminal with NEXUS command set

---

## Known issues

- The `package-lock.json` is not committed (add to repo if deploying to Netlify/Vercel for reproducible installs)
- `npm install` requires `--legacy-peer-deps` due to React 19 / Next.js 15.0.3 peer dep mismatch in package.json — update `react` peer dep range or pin Next to 15.1+ when upgrading
