# NEXUS//13

> **An intelligence interface that should not exist on the open web.**

A premium narrative web experience disguised as a leaked government-style classified system. Built as a senior-level frontend portfolio piece — exploring motion design, immersive interaction, custom visual systems, and narrative state machines.

**Status:** Phase 1 complete — foundation, entry sequence, and dashboard shipped. Phase 2 in progress (dossier viewer, narrative engine, content).

---

## What it is

NEXUS//13 is not a website. It's an interactive thriller masquerading as a classified intelligence platform. The user lands on a URL they "shouldn't have", witnesses a boot sequence, is denied authentication — then granted access by an apparent backdoor. From that point on, the system observes them.

Inspirations: Mr. Robot · Black Mirror · Blade Runner 2049 · Control · Observer · ARG culture · real-world intelligence dashboards (Palantir-style, never cyberpunk).

## Stack

- **Next.js 15** (App Router, RSC, Turbopack)
- **TypeScript** strict (`noUncheckedIndexedAccess`)
- **Tailwind CSS v4** beta (CSS-first `@theme`)
- **Framer Motion 11**
- **Zustand** (narrative state)
- **idb-keyval** (anonymous progression persistence)
- **Supabase** (Phase 2 — telemetry & realtime fake)

## Design system

| Token | Purpose |
|---|---|
| `void-0` → `void-5` | Background scale (administrative black, not pure black) |
| `text-0` → `text-3` | Text hierarchy |
| `signal` `#C5FF3C` | Live data, scans, access granted |
| `alert` `#FF3636` | Denied, hostile |
| `warn` `#FFB020` | Classification, attention |
| `cipher` `#5BC0EB` | Encrypted, intercepted |

**Typography:**
- General Sans (display / UI)
- Geist Mono (data, timestamps, terminals)
- Instrument Serif italic (human voice — quotes, testimony)

**Motion language: "Cold Protocol"** — no springs, no bounce. Cubic-bezier easing, scan-reveal animations, 120/320/800/2400ms durations.

## Run locally

```bash
git clone https://github.com/Monoru1/NEXUS-13.git
cd NEXUS-13
npm install
npm run dev
```

Open `http://localhost:3000`. The boot sequence runs, then the auth prompt. Type anything as a token and submit — the system will refuse, then "override" itself, then route you to `/nexus`.

## Project structure

```
nexus-13/
├── app/
│   ├── layout.tsx              # Root: classification bars + status bar
│   ├── page.tsx                # Entry: boot sequence + auth
│   ├── globals.css             # Design tokens (Tailwind v4 @theme)
│   └── (system)/               # Post-auth shell with side dock
│       ├── layout.tsx
│       ├── nexus/page.tsx      # Dashboard
│       └── archives/[slug]/    # ★ Signature screen (Phase 2)
├── components/
│   ├── system/                 # OS shell components
│   └── primitives/             # Reusable UI atoms
└── content/dossiers/           # MDX narrative content (Phase 2)
```

## Roadmap

- [x] **Phase 1** — Foundation, boot, auth, dashboard, dock
- [ ] **Phase 2** — Dossier viewer (signature screen), narrative engine, ARIADNE storyline
- [ ] **Phase 3** — Three.js relationship graph, terminal, transmissions
- [ ] **Phase 4** — Supabase telemetry, time-gated content, ARG mechanics

## License

Personal portfolio project. All rights reserved.
