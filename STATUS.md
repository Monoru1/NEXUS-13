# NEXUS//13 — Session Status

**Last updated:** 2026-05-19 (session 2)  
**Branch:** `main` — all phases merged, production-ready

---

## Build status

- `npm run typecheck` — clean ✅
- `npm run build` — clean ✅
- All routes resolved and prerendered

---

## All PRs merged — main is complete

PRs #1 (setup/phase-2), #2 (terminal), #3 (graph/phase-4/boost) all merged to main.
Hotfixes and 3D projection applied directly on main.

---

## Routes

| Route | Status |
|---|---|
| `/` | Boot sequence + auth |
| `/nexus` | Dashboard — 4 dossier cards, activity feed |
| `/archives` | Dossier index |
| `/archives/n13-001-ariadne` | ARIADNE — 5 events, 7 evidence, 2 contradictions |
| `/archives/n13-002-vesper` | VESPER — 4 events, 6 evidence, 1 contradiction |
| `/archives/n13-003-kairos` | KAIROS — 3 events, 4 evidence (all redacted), 0 contradictions |
| `/archives/n13-004-meridian` | MERIDIAN — 5 events, 8 evidence, 2 contradictions |
| `/nexus-graph` | Three.js 3D fibonacci sphere relationship graph |
| `/subjects` | 9-subject registry with status filters |
| `/subjects/[id]` | Subject detail (9 generated paths) |
| `/terminal` | Interactive agency shell (8 documented + 3 hidden commands) |
| `/transmissions` | 8 intercepted signals |
| `/transmissions/[id]` | Transmission detail (8 generated paths) |
| `/manifest` | Hidden page — not in nav |

---

## Critical bugs fixed (this session)

### Desktop — ScanReveal text visibility
- **Root cause:** `ScanReveal trigger="view"` starts with `clip-path: inset(0 100% 0 0)`. IntersectionObserver at `threshold: 0.15` could fail to fire for elements already in viewport on mount (IO checks DOM position, not animated clip state).
- **Fix:** Immediate activation if element is in viewport on mount via `getBoundingClientRect`. Threshold lowered to 0. `rootMargin: '0px 0px 80px 0px'` pre-triggers before element reaches viewport bottom.
- **Secondary:** Forced explicit `text-text-1` on timeline event descriptions, evidence summaries, and subject summary in header (were inheriting `text-text-2` which is `#8a8a86` — too light).

### Mobile — Layout not responsive
- **Root cause:** `grid-cols-12` with `col-span-8/4` — no mobile breakpoints. SystemDock `fixed left-0` permanently covers left side of content.
- **Fix — grid:** `grid-cols-1 lg:grid-cols-12` with `lg:col-span-8` / `lg:col-span-4`. Borders adjusted.
- **Fix — SystemDock:** Desktop sidebar stays (`hidden lg:flex`). Mobile bottom nav added (`lg:hidden`, fixed bottom, 6-module bar).
- **Fix — layout:** `pl-16` only on `lg:pl-16`. Mobile: `pl-2 sm:pl-4`. `pb-20` on mobile for bottom nav clearance.
- **Fix — DossierHeader:** Title row stacks on mobile. Metadata `grid-cols-2` → `grid-cols-1 sm:grid-cols-2`.

---

## 3D Projection feature (this session)

`components/dossier/DossierProjection.tsx` — desktop-only (hidden lg:block), lazy-loaded (ssr: false):
- Wireframe cube, edge color keyed to classification: TOP SECRET=alert (#ff3636), SECRET=warn (#ffb020)
- Inner octahedron cage (1.5×1.5×1.5, 45° Y offset), lower opacity
- Orbiting data particles — count = min(timeline + evidence + contradictions, 12), distributed on Fibonacci sphere
- Pulsing octahedron core
- Footer: EVENTS / EVIDENCE / CONTRADICT count from actual dossier data
- Scanline overlay for visual cohesion with the rest of the UI

---

## Easter eggs (4 active)

1. **Console** — open devtools: styled log with NEXUS branding + unique session ref
2. **Page source** — HTML comment: N13-004 audit log fragment (internal system log)
3. **Konami code** — ↑↑↓↓←→←→BA → CTRL-PRIME overlay (clearance L-7)
4. **`/manifest`** — direct URL only, 6 assets listed including CTRL-PRIME

---

## Delivered this session (session 2)

### fix/mobile-responsive
- `nexus/page.tsx`: outer grid `grid-cols-12` → `grid-cols-1 lg:grid-cols-12`
- Dossier card rows: replaced `grid-cols-12` sub-layout with `flex-col sm:flex-row`
- Header: stacks on mobile, text 32px → 42px at sm

### feat/3d-projections — large 3D hero banners on ALL pages
- `components/projections/NexusProjection.tsx` — orbital command lattice, 3 torus rings, animated nodes, signal green
- `components/projections/ArchivesProjection.tsx` — 4 stacked document planes, warn amber + alert red for KAIROS
- `components/projections/SubjectsProjection.tsx` — 9-node Fibonacci sphere, status-colored, connection lines
- `components/projections/TransmissionsProjection.tsx` — animated composite waveform, scanning particle, anomaly markers
- `components/projections/TerminalProjection.tsx` — torus knot (p=2 q=3) with 80 streaming particles
- All pages wired: nexus, archives, subjects, transmissions, terminal (above shell)
- All dossiers now linked from archives index (VESPER/KAIROS/MERIDIAN accessible)

### feat/multimedia-evidence
- `types/narrative.ts`: added `imageUrl?`, `audioUrl?`, `transcript?` to Evidence type
- `EvidencePanel`: PhotoPanel renders `<img>` when imageUrl set; AudioPanel renders `<audio>` when audioUrl set; DocumentPanel uses transcript? for type:transcript
- 4 classified SVG images in `public/evidence/`:
  - `n13-001-photo-surveillance.svg`: surveillance photo with crosshair HUD + metadata overlay
  - `n13-001-doc-autopsy.svg`: leaked autopsy report with redaction bars + classification stamp
  - `n13-002-spectrum-anomaly.svg`: frequency spectrum with 17.3 MHz anomaly spike
  - `n13-004-casefile.svg`: MERIDIAN reopening directive with audit log anomaly
- Dossier content enriched with imageUrl/transcript on relevant evidence items

---

## Phase 5 — Next

When Ryad is ready, branch from main.

Key items:
- Supabase fake realtime activity feed on `/nexus` dashboard
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Netlify env vars
- Anonymous operator telemetry (opt-out via KAIROS easter egg)
- Audio on VESPER transmission pages (decode animation)
