# CLAUDE.md — Handoff brief for Claude Code

> Read this **first and entirely** before writing any code on this project.

This file is the canonical context for working on NEXUS//13. It supersedes any other documentation when they conflict.

---

## 1. The project in one paragraph

NEXUS//13 is a premium narrative web experience designed as a senior-level frontend portfolio piece. It masquerades as a leaked classified intelligence interface that the user "wasn't supposed to access". The experience is built like a thriller film, not a website — every screen is a scene, every interaction has dramatic weight, the system observes the user rather than the reverse. The visual language is administrative coldness (think Palantir, real CIA/NSA-style dashboards, Bloomberg terminals) — explicitly **NOT cyberpunk neon**.

**Owner:** Ryad Saka (full-stack dev, alternance France, GitHub: `Monoru1`).
**Repo:** https://github.com/Monoru1/NEXUS-13
**Stated goal:** Demonstrate senior-level frontend craft to land a senior frontend role.

---

## 2. Critical context Ryad has shared

- Ryad is a strategic builder with **a known pattern of dispersion** across many ambitious projects (Arcanum Empire, Latinum Quest, Builder Obscur portfolio, La Maison des Pyjamas, audit_ai_ui, Ryad Agence, IdeaForge, Veeam monitoring, etc.). When working on NEXUS//13, **stay focused on shipping this project to a high bar** rather than spawning side-quests.
- His stated 30-day income target is €10K. NEXUS//13 itself is **not** revenue-generating — it is positioned as a job-hunting portfolio piece. If you notice scope creep that would delay shipping, **call it out**.
- He uses **Sublime Text**. Do not suggest VS Code.
- He prefers **direct file delivery** in chat (path + full code, copy-paste ready). In Claude Code context this just means: clean file outputs, no Cursor-style partials.
- He has been explicit that he wants me (Claude) to **challenge his ideas**, not flatter them. Honest pushback is welcomed when scope or design choices are weak.

## 3. Technical decisions already made (DO NOT CHANGE WITHOUT REASON)

### Stack — locked
- **Next.js 15** with App Router, Turbopack, React 19
- **TypeScript strict** with `noUncheckedIndexedAccess`
- **Tailwind CSS v4 beta** with **CSS-first `@theme`** (`app/globals.css`)
  - ⚠️ **Critical lesson from a previous project (La Maison des Pyjamas / Netlify):** Tailwind v4 requires `@theme` declarations in `globals.css` for custom tokens. Without them, custom utilities (fonts, colors) break on Netlify even when local builds succeed. **All design tokens must be declared in `@theme`.**
- **Framer Motion 11** for component transitions
- **Zustand 5** for narrative state (planned Phase 2)
- **idb-keyval** for anonymous local progression persistence (Phase 2)
- **Supabase** for telemetry + fake realtime feed (Phase 4 — not Phase 2)

### Design tokens (already declared in `app/globals.css`)
```
Void scale:   #060607 → #2e2e35  (6 steps, administrative blacks)
Text scale:   #f4f4f2 → #56565a  (4 steps)
Signal:       #c5ff3c  (acid lime — live data, granted access)
Alert:        #ff3636  (denied, hostile)
Warn:         #ffb020  (classification, attention)
Cipher:       #5bc0eb  (encrypted, intercepted)
```

**Typography:**
- `--font-display`: General Sans (Fontshare CDN)
- `--font-mono`: Geist Mono (Google Fonts)
- `--font-serif`: Instrument Serif italic only (for human voice)

⚠️ **Do not introduce Inter, Roboto, or Space Grotesk.** These were explicitly rejected for being generic AI-default choices.

### Motion language — "Cold Protocol"
- **No springs, no bounce.** Only `cubic-bezier(0.65, 0, 0.35, 1)` and `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Durations:** 120ms (micro), 320ms (panels), 800ms (reveals), 2400ms (cinematic).
- **Signature animation:** scan-reveal (horizontal clip-path inset) — see `components/primitives/ScanReveal.tsx`. Use it for any panel/row appearance. Do not replace with fade-in.

### Architecture conventions
- `app/(system)/` route group = the post-auth interior of the OS. Has its own layout with the `SystemDock` left navigation.
- `app/page.tsx` is the entry — boot sequence + auth. Routes to `/nexus` on submit.
- `components/system/` = OS shell pieces (ClassificationBar, StatusBar, BootSequence, SystemDock, future Window/Modal).
- `components/primitives/` = small reusable atoms (ScanReveal, ClassificationTag, future RedactedText, DataLine, Glyph).
- `components/dossier/` = pieces for the signature screen (to be built in Phase 2).
- `content/dossiers/*.mdx` = narrative content versioned in Git. No CMS.

---

## 4. What is already built (Phase 1 — DO NOT REDO)

| File | Role |
|---|---|
| `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs` | Project config — lockstep with the stack above |
| `.gitignore`, `.env.example` | Standard |
| `app/globals.css` | **The DA heart.** All design tokens, grain overlay, scanline, scan-reveal keyframes, utilities |
| `app/layout.tsx` | Root layout — classification bars + status bar wrap every page |
| `app/page.tsx` | Entry page |
| `app/(system)/layout.tsx` | Post-auth shell — adds SystemDock |
| `app/(system)/nexus/page.tsx` | Dashboard with 4 dossier cards + activity feed |
| `components/system/ClassificationBar.tsx` | Top/bottom banners with shifting hue + pulse signal |
| `components/system/StatusBar.tsx` | UTC clock, session ID, fake link strength |
| `components/system/BootSequence.tsx` | **First-impression component.** Streams 15 boot lines, then auth panel, then denied → override → routes to /nexus |
| `components/system/SystemDock.tsx` | Left-side fixed dock with 6 module glyphs (NX/AR/SB/GR/TR/TX) |
| `components/primitives/ScanReveal.tsx` | Signature motion primitive |
| `components/primitives/ClassificationTag.tsx` | Inline badge for SECRET/TOP SECRET/OPEN/REDACTED |
| `README.md` | Public-facing project description |

**Verify Phase 1 works before adding to it:**
```bash
npm install
npm run dev
# Visit http://localhost:3000 → boot sequence → type anything → routes to /nexus
```

If `npm run dev` fails due to Tailwind v4 beta drift, fallback to Tailwind v3.4 — but **update `globals.css` accordingly** (replace `@import 'tailwindcss'` and `@theme` with the v3 directives and a `tailwind.config.ts` that mirrors the same tokens).

---

## 5. What to build next (Phase 2 — your job)

**Goal:** Ship the signature screen — `/archives/[slug]` — and make it the strongest single piece of the project. This is what a recruiter will judge.

### Phase 2 file list (in dependency order)

1. **`lib/utils/cn.ts`** — `clsx` + `tailwind-merge` helper.
2. **`types/narrative.ts`** — Type definitions:
   ```ts
   export type Classification = 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
   export type DossierStatus = 'OPEN' | 'CLOSED' | 'REDACTED';
   export type EvidenceType = 'document' | 'audio' | 'transcript' | 'photo' | 'log';

   export type Evidence = {
     id: string;
     type: EvidenceType;
     title: string;
     date: string;       // ISO
     summary: string;
     redacted?: boolean;
     content?: string;   // MDX body or fragment
   };

   export type TimelineEvent = {
     id: string;
     date: string;       // ISO
     title: string;
     description: string;
     evidenceIds: string[];
     contradictionIds?: string[];
   };

   export type Contradiction = {
     id: string;
     between: [string, string];  // two TimelineEvent ids
     note: string;
   };

   export type Subject = {
     id: string;
     codename: string;
     status: 'ACTIVE' | 'DECEASED' | 'UNKNOWN' | 'REDACTED';
     summary: string;
   };

   export type Dossier = {
     slug: string;
     code: string;          // N13-001
     title: string;
     classification: Classification;
     status: DossierStatus;
     opened: string;        // ISO date
     primarySubject: Subject;
     relatedSubjects: Subject[];
     timeline: TimelineEvent[];
     evidence: Evidence[];
     contradictions: Contradiction[];
     summary: string;       // 1-2 paragraphs
   };
   ```

3. **`lib/store/narrative.ts`** — Zustand store:
   - `clearance: number` (0–7, persisted to IndexedDB)
   - `viewedEvidence: Set<string>`
   - `flaggedContradictions: Set<string>`
   - Actions: `viewEvidence(id)`, `flagContradiction(id)`, `_hydrate()` (load from IndexedDB on mount)
   - Use `idb-keyval` for persistence. Key: `nexus-13:narrative-state`.

4. **`lib/persistence/indexed-db.ts`** — Typed wrapper around `idb-keyval` with namespace `nexus-13:`.

5. **`content/dossiers/n13-001-ariadne.mdx`** — The signature narrative. Write it like a thriller. The hook: "Subject reported deceased 2019-04-11. Multiple subsequent sightings." Construct a frontmatter-typed Dossier object with at least:
   - 5 timeline events (2 of which contradict each other)
   - 7 evidence items (at least 1 audio, 1 photo, 1 redacted document)
   - 2 contradictions explicitly defined
   - Primary subject ARIADNE + 2 related subjects
   - Atmospheric tone — read Ben Macintyre or John le Carré for register, not techno-thriller.

   File format suggestion: frontmatter + MDX body, or simpler — a `.ts` file exporting a typed `Dossier` const with MDX fragments inline. Pick whichever ships faster; readability of the narrative matters more than file format purity.

6. **`components/primitives/RedactedText.tsx`** — Renders blacked-out text bars (`bg-redacted` block) at the size of the underlying text. Hover reveals a tooltip saying "REDACTED // 13.4-CTRL".

7. **`components/primitives/DataLine.tsx`** — A reusable horizontal data row (label left, value right, dot separator). Used everywhere in dossier headers.

8. **`components/dossier/DossierHeader.tsx`** — Top of the dossier page. Code, title, classification, status, opened date, primary subject, clearance gate.

9. **`components/dossier/DossierTimeline.tsx`** — Vertical timeline of events. Each event is a `ScanReveal trigger="view"`. Contradicting events get a visual link (vertical line in `warn` color connecting them, with a `ContradictionMarker` between).

10. **`components/dossier/ContradictionMarker.tsx`** — Small inline component (yellow triangle + "CONTRADICTION FLAGGED"). On click, opens an inline note.

11. **`components/dossier/EvidencePanel.tsx`** — Card for an evidence item. Different visual treatment per type (audio = waveform placeholder + play button stub; transcript = monospace block; photo = `bg-void-3` thumbnail with classification overlay; document = paper-style; log = terminal-style).

12. **`components/dossier/SubjectCard.tsx`** — Profile chip (codename, status, summary, photo placeholder).

13. **`app/(system)/archives/page.tsx`** — List view of all dossiers (reuse the cards from `nexus/page.tsx` — extract into a shared component if it makes sense).

14. **`app/(system)/archives/[slug]/page.tsx`** — ★ **The signature screen.** Layout:
    ```
    [DossierHeader]                                   [ClearanceMeter]
    ────────────────────────────────────────────────────────────
    Left column (8/12):                Right column (4/12):
      Summary (serif italic)             Primary subject card
      Timeline                           Related subjects (stack)
        Event                            Classification audit log
        Event ←→ Contradiction           "Last viewed by..."
        Event
      Evidence grid (3 cols)
    ```
    Loads dossier data from `content/dossiers/*` based on slug. 404 on unknown slug.
    Use `<ScanReveal trigger="view">` on each timeline event and evidence card so the page reveals progressively as the user scrolls.

### Quality bar for Phase 2
- Every Phase 2 file must respect the Cold Protocol motion language.
- No new fonts. No new colors. If you need a color, derive it from existing tokens or argue for a new one in the diff message.
- TypeScript strict — no `any`, no unchecked indexing.
- Accessibility: every interactive element has visible focus state and aria-label where icon-only.

### Anti-goals for Phase 2 (DO NOT BUILD YET)
- ❌ Three.js graph — Phase 3
- ❌ Terminal page — Phase 3
- ❌ Supabase integration — Phase 4
- ❌ Audio engine — Phase 4
- ❌ AI conversational characters — Phase 4 or later
- ❌ WebSockets — Phase 4

Resist the urge to scaffold all the modules. Ship Phase 2 deep before going wide.

---

## 6. Working style preferences

- **Commit often, small diffs.** Conventional Commits format (`feat(dossier): ...`, `fix(boot): ...`, `chore: ...`).
- **One PR-sized concern per commit.** Don't mix refactor + feature.
- **Run `npm run typecheck` before each commit.**
- **If you find a bug in Phase 1 code, fix it and note it in the commit.** Don't leave broken code behind.
- **If the brief is ambiguous, choose the option that ships fastest at the same quality bar.** Document the choice in the commit message.
- **When in doubt about design, lean colder, sparser, more administrative.** When in doubt about narrative, lean ambiguous over explicit.

---

## 7. The narrative bible (compressed)

The world of NEXUS//13:

- An unnamed intelligence agency operates a system called NEXUS//13 (the "13" is a clearance designation, not a serial).
- The system tracks subjects — individuals whose actions or existence challenge the official narrative.
- The user is unknown to the system but has somehow accessed it. The system's response is to **observe what they look at** while pretending to be unguarded.
- Every dossier contains contradictions that the system itself has flagged but not resolved. This is the central tension: the agency knows its own records are inconsistent and is letting the user see it.
- The deeper the user goes, the more they realize the system might not be defective — it might be **intentionally leaky**.

The four seed dossiers (only ARIADNE is being built in Phase 2):
- **N13-001 ARIADNE** — Reported dead 2019-04-11. Confirmed sightings 2020, 2022, 2024. Identity may or may not be stable. *This is the signature dossier.*
- **N13-002 VESPER** — Transmissions on a frequency that doesn't exist. Either a phantom band or someone is broadcasting through metadata gaps.
- **N13-003 KAIROS** — Personnel file mostly redacted. The fragments that remain suggest Kairos is or was an internal asset.
- **N13-004 MERIDIAN** — Closed case, then quietly reopened. Why?

---

## 8. Operating instructions for Claude Code

1. **Pull the repo, install, verify Phase 1 runs.**
2. **Read this file end to end.** Then `app/globals.css` and `components/system/BootSequence.tsx` — these two files define the project's voice.
3. **Build Phase 2 in the order listed in §5.** Commit after each meaningful file.
4. **Do not invent new dependencies** beyond those in `package.json` without explicit reason in a commit message.
5. **When the ARIADNE dossier MDX is written, ship the prose like it matters.** It is not filler content. A recruiter reading the dossier should feel they are reading actual classified material that leaked.
6. **At the end of your session, push, then write a short status note** in `STATUS.md` (or comment on the latest commit) describing: what shipped, what's blocked, what's the next file to write.

---

## 9. Tone and voice in copy

- System messages: ALL CAPS, mono, terse. `ACCESS DENIED.` not `Sorry, you don't have permission.`
- Agency labels: tracking-system uppercase. `OPEN DOSSIERS · 4` not `Open Dossiers (4)`.
- Narrative quotes: serif italic, lowercase. `"the records do not match what i saw."`
- Timestamps: always UTC, ISO-like. `2019-04-11T03:14:22Z` or `03:14:22Z` in lists.
- Never use 😊 emoji or marketing-positive language anywhere in the UI or copy.

---

Good luck. The bar is: **a senior frontend engineer on a hiring panel should stop scrolling and read the README twice.**
