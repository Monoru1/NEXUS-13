# NEXUS//13

> **An intelligence interface that should not exist on the open web.**

A premium narrative web experience disguised as a leaked government intelligence system. Every screen is a scene. Every interaction has dramatic weight. The system observes the user — not the reverse.

Built as a senior-level frontend portfolio piece: motion design, immersive UX, a complete design system, and a narrative engine with persistent state.

---

## What it is

You arrive at a URL you weren't given. The system boots. Authentication fails. Then an override fires — and you're in.

Four dossiers. Four subjects under surveillance. The records are internally inconsistent, and the system knows it. The question is whether that's a malfunction or something deliberate.

**Tone:** Mr. Robot, not Tron. Palantir terminal aesthetic, not cyberpunk neon.

---

## Live

Deployed on Netlify. Boot sequence → auth → dashboard → dossiers → graph → subjects → transmissions.

---

## Technical highlights

| Area | Decisions |
|---|---|
| **Framework** | Next.js 15, App Router, React 19, Turbopack |
| **Types** | TypeScript strict + `noUncheckedIndexedAccess` throughout |
| **Styling** | Tailwind CSS v4 beta — CSS-first `@theme` for all design tokens |
| **Motion** | Framer Motion 11 — Cold Protocol: `cubic-bezier(0.65, 0, 0.35, 1)` only, no springs |
| **3D** | Three.js + React Three Fiber + Drei — Fibonacci sphere graph with animated camera |
| **State** | Zustand 5 — narrative state (clearance, viewed evidence, flagged contradictions) |
| **Persistence** | idb-keyval — anonymous progression stored in IndexedDB, survives page refresh |
| **Fonts** | next/font for Geist Mono, Fontshare CDN for General Sans + Instrument Serif |
| **Performance** | ISR on static pages, dynamic() for the Three.js graph (no SSR) |

### Design system

All tokens declared in `app/globals.css` under Tailwind `@theme`. Nothing hardcoded.

| Token | Value | Use |
|---|---|---|
| `void-0` – `void-5` | `#060607` → `#2e2e35` | Background hierarchy |
| `text-0` – `text-3` | `#f4f4f2` → `#56565a` | Text hierarchy |
| `signal` | `#c5ff3c` | Live data, access granted |
| `alert` | `#ff3636` | Denied, hostile |
| `warn` | `#ffb020` | Classification, attention |
| `cipher` | `#5bc0eb` | Encrypted, intercepted |

Fonts: **General Sans** (UI), **Geist Mono** (data/terminals), **Instrument Serif italic** (human testimony only).

### Signature animation: ScanReveal

Every panel appearance uses `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)` — a horizontal scan-in that reads as a screen redrawing. No fades, no slides.

---

## Screens

| Route | Description |
|---|---|
| `/` | Boot sequence + auth — animated terminal, denied, overridden |
| `/nexus` | Dashboard — 4 dossier cards, live activity feed |
| `/archives` | Dossier index |
| `/archives/[slug]` | ★ Signature screen — timeline with contradiction markers, evidence panels, subject cards, clearance meter |
| `/nexus-graph` | Three.js 3D relationship graph — nodes, edges, inspector panel |
| `/subjects` | Subject registry with status filters |
| `/subjects/[id]` | Subject detail — aliases, related dossiers, chronology |
| `/transmissions` | Intercepted signals log — waveform placeholders, classification filters |
| `/transmissions/[id]` | Transmission detail — numeric sequences, origin data |
| `/manifest` | Hidden page — not linked anywhere |

---

## Run locally

```bash
git clone https://github.com/Monoru1/NEXUS-13.git
cd NEXUS-13
npm install
npm run dev
```

Open `http://localhost:3000`. Boot sequence runs — type anything as the auth token, submit. The system denies it, then overrides itself, then routes to `/nexus`.

```bash
npm run typecheck  # strict TypeScript — no any, no unchecked indexing
npm run build      # production build
```

---

## Project structure

```
app/
├── layout.tsx              # Root shell: classification bars, status bar, OG metadata
├── page.tsx                # Entry: boot sequence + auth
├── globals.css             # All design tokens (Tailwind v4 @theme)
├── opengraph-image.tsx     # OG image via next/og
├── icon.tsx                # Favicon via next/og
└── (system)/               # Post-auth: side dock + all interior screens
    ├── nexus/              # Dashboard
    ├── archives/[slug]/    # Dossier viewer (signature screen)
    ├── nexus-graph/        # Three.js graph
    ├── subjects/[id]/      # Subject registry
    ├── transmissions/[id]/ # Transmissions log
    └── manifest/           # Hidden page

components/
├── system/                 # OS shell: ClassificationBar, StatusBar, BootSequence, SystemDock
├── dossier/                # DossierHeader, DossierTimeline, EvidencePanel, SubjectCard
├── graph/                  # Scene, Node, Edge, InspectorPanel, GraphLegend
├── subjects/               # SubjectRow, SubjectFilters
├── transmissions/          # TransmissionRow, WaveformPlaceholder
├── primitives/             # ScanReveal, ClassificationTag, RedactedText, DataLine
└── effects/                # ConsoleEasterEgg, KonamiCode, ScrollProgress, AuditTrail

content/
├── dossiers/               # N13-001 ARIADNE, N13-002 VESPER, N13-003 KAIROS, N13-004 MERIDIAN
├── subjects/               # 9 subjects with aliases and dossier cross-references
└── transmissions/          # 8 intercepted transmissions

lib/
├── store/narrative.ts      # Zustand: clearance, viewed evidence, flagged contradictions
├── store/graph.ts          # Zustand: graph hover/select/camera state
├── graph/topology.ts       # Fibonacci sphere layout, edge deduplication
└── subjects/query.ts       # Subject data access functions
```

---

## Easter eggs

There are at least four things in this codebase that are not listed in the navigation.

---

## License

Personal portfolio project. All rights reserved.
