# NEXUS//13 — Session Status

**Last updated:** 2026-05-19  
**Branch:** `claude/phase-3-graph`

---

## Current state

- `npm install` — clean, no flags
- `npm run typecheck` — clean
- `npm run build` — clean, zero warnings
- Routes: `/` `/nexus` `/archives` `/archives/[slug]` `/terminal` `/nexus-graph` `/_not-found`

---

## Phase 3b — Three.js Graph (this session)

### Commits

| Commit | File(s) |
|---|---|
| `chore(deps)`: three + R3F + drei | `package.json` |
| `feat(content)`: dossier stubs | `content/dossiers/_stubs.ts` |
| `feat(graph)`: topology builder | `lib/graph/topology.ts` |
| `feat(graph)`: zustand store | `lib/store/graph.ts` |
| `feat(graph)`: Node + Edge components | `components/graph/Node.tsx`, `components/graph/Edge.tsx` |
| `feat(graph)`: Scene + OrbitControls | `components/graph/Scene.tsx` |
| `feat(graph)`: InspectorPanel | `components/graph/InspectorPanel.tsx` |
| `feat(graph)`: GraphLegend + page | `components/graph/GraphLegend.tsx`, `app/(system)/nexus-graph/page.tsx` |
| `feat(graph)`: mobile guard + loading | `app/(system)/nexus-graph/loading.tsx` |
| `feat(graph)`: camera transitions | updated `Scene.tsx`, `InspectorPanel.tsx`, `lib/store/graph.ts` |

### Architecture

```
lib/graph/topology.ts     — buildGraph(): subjects (inner sphere r=2.4) + dossiers (outer r=4.5)
lib/store/graph.ts        — hoveredNodeId, selectedNodeId, cameraTarget
components/graph/
  Node.tsx                — sphere, emissive on hover, Html label
  Edge.tsx                — Line from drei, per-kind color/opacity
  Scene.tsx               — Canvas + OrbitControls + CameraController
  InspectorPanel.tsx      — right overlay, connected node navigation
  GraphLegend.tsx         — bottom-left 4-entry legend
app/(system)/nexus-graph/
  page.tsx                — full layout: canvas + overlays + mobile guard
  loading.tsx             — skeleton matching page layout
```

### Quality bar verdict

Open `/nexus-graph` — scene loads without white flash. Rotate the camera with the mouse. Nodes glow on hover. Click a node — InspectorPanel shows codename, status, summary, and a list of connected nodes. Click a connected node — camera flies (800ms ease-protocol) toward that node's position. Contradiction edges glow amber. Legend bottom-left. Counter top-right.

On mobile (<768px): `NEXUS GRAPH REQUIRES DESKTOP CONSOLE. // VIEWPORT TOO NARROW.`

---

## Deployment

### Vercel (recommended — zero config)
1. Push to GitHub
2. Import at vercel.com
3. Deploy — Next.js auto-detected, no env vars needed until Phase 4

### Netlify
1. Push to GitHub
2. Import at netlify.com — build command read from `netlify.toml`
3. Install plugin if prompted: `@netlify/plugin-nextjs`
4. No env vars needed until Phase 4

---

## Previous sessions

### Session 1 — Phase 1 + Phase 2 (14 files)
Boot, dashboard, ARIADNE dossier, all signature screen components.

### Session 2 — Repo hygiene
Peer deps fix (next 15.0.3 → 15.5.18), lockfile, SystemDock aria fix.

### Session 3 — Phase 2.5
Loading skeletons (archives, dossier), 404 page in-universe, ARIADNE prose audit (0 lazy words found).

### Session 4 — Phase 3a Terminal
Terminal page, command parser, registry (hidden: sudo, 13.4-ctrl, find ariadne), Zustand store, loading easter egg, Vercel + Netlify deploy config.

---

## Next: Phase 4 (Supabase telemetry + audio engine)

Branch: `claude/phase-4-data` from main once Phase 3b is merged.

Key items:
- Supabase anon key + project URL (env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Fake realtime activity feed on `/nexus` dashboard
- Audio engine for ARIADNE evidence items
- Operator telemetry (anonymous, opt-out in KAIROS dossier easter egg)
