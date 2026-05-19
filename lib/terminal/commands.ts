import type { CommandHandler, TerminalLine, TerminalOutput } from '@/lib/terminal/types';
import { ARIADNE } from '@/content/dossiers/n13-001-ariadne';

// ── Dossier index (stubs for N13-002/003/004) ──────────────────────────────

type DossierStub = {
  slug: string;
  code: string;
  title: string;
  classification: string;
  status: string;
  summary: string;
};

const DOSSIER_INDEX: DossierStub[] = [
  {
    slug: 'n13-001-ariadne',
    code: 'N13-001',
    title: 'ARIADNE',
    classification: 'SECRET',
    status: 'OPEN',
    summary: ARIADNE.summary,
  },
  {
    slug: 'n13-002-vesper',
    code: 'N13-002',
    title: 'VESPER',
    classification: 'SECRET',
    status: 'OPEN',
    summary: `Intercepted transmissions on an unregistered frequency. Source unresolved. The band does not appear on any civilian or military allocation chart. Either someone is broadcasting through a gap in the spectrum, or the gap was put there for exactly this purpose.`,
  },
  {
    slug: 'n13-003-kairos',
    code: 'N13-003',
    title: 'KAIROS',
    classification: 'TOP SECRET',
    status: 'REDACTED',
    summary: `Personnel file. Content removed under directive 13.4-CTRL. The remaining fragments suggest subject was, or is, an internal asset. The distinction between past and present tense is not a clerical error.`,
  },
  {
    slug: 'n13-004-meridian',
    code: 'N13-004',
    title: 'MERIDIAN',
    classification: 'SECRET',
    status: 'CLOSED',
    summary: `Case closed 2023-01-30 by order of review board. An anonymous query reopened it in the internal audit log on 2024-08-14. No authorising officer is named. The case is now simultaneously closed and open, depending on which system you ask.`,
  },
];

const SUBJECT_INDEX = [
  { codename: 'ARIADNE',    status: 'UNKNOWN',  dossier: 'N13-001' },
  { codename: 'LOOM',       status: 'ACTIVE',   dossier: 'N13-001' },
  { codename: 'CARTWRIGHT', status: 'DECEASED', dossier: 'N13-001' },
  { codename: 'VESPER',     status: 'UNKNOWN',  dossier: 'N13-002' },
  { codename: 'KAIROS',     status: 'REDACTED', dossier: 'N13-003' },
  { codename: 'MERIDIAN',   status: 'UNKNOWN',  dossier: 'N13-004' },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function pad(s: string, n: number): string {
  return s.padEnd(n, ' ');
}

function ok(text: string): TerminalLine { return { text, tone: 'ok' }; }
function dim(text: string): TerminalLine { return { text, tone: 'dim' }; }
function warn(text: string): TerminalLine { return { text, tone: 'warn' }; }
function alert(text: string): TerminalLine { return { text, tone: 'alert' }; }
function cipher(text: string): TerminalLine { return { text, tone: 'cipher' }; }
function serif(text: string): TerminalLine { return { text, tone: 'serif' }; }
function plain(text: string): TerminalLine { return { text }; }

function lines(texts: TerminalLine[]): TerminalOutput {
  return { lines: texts };
}

// ── Documented commands ────────────────────────────────────────────────────

const helpHandler: CommandHandler = async () => ({
  lines: [
    plain(''),
    plain('Documented commands:'),
    plain(''),
    dim('  help                   show this message'),
    dim('  ls dossiers            list active dossiers'),
    dim('  cat dossier <id>       read dossier summary'),
    dim('  subjects               list known subjects'),
    dim('  whoami                 identify operator'),
    dim('  clear                  clear terminal output'),
    dim('  exit                   terminate session'),
    dim('  nexus                  navigate to overview'),
    plain(''),
    { text: '  some commands are not in this list.', tone: 'serif' },
    plain(''),
  ],
});

const lsHandler: CommandHandler = async (_args) => {
  const subcommand = _args[0];
  if (subcommand !== 'dossiers') {
    return lines([
      alert(`ls: unknown target '${subcommand ?? ''}'. try: ls dossiers`),
    ]);
  }
  return {
    lines: [
      plain(''),
      dim('  CODE     TITLE       CLASSIFICATION  STATUS'),
      dim('  ──────────────────────────────────────────'),
      ...DOSSIER_INDEX.map((d) =>
        plain(`  ${pad(d.code, 8)} ${pad(d.title, 11)} ${pad(d.classification, 15)} ${d.status}`)
      ),
      plain(''),
    ],
  };
};

const catHandler: CommandHandler = async (_args) => {
  const subcommand = _args[0];
  const slug = _args[1];

  if (subcommand !== 'dossier') {
    return lines([
      alert(`cat: unknown subcommand '${subcommand ?? ''}'. try: cat dossier <id>`),
    ]);
  }
  if (!slug) {
    return lines([alert('cat dossier: missing id. try: cat dossier n13-001-ariadne')]);
  }

  const dossier = DOSSIER_INDEX.find(
    (d) => d.slug === slug.toLowerCase() || d.code.toLowerCase() === slug.toLowerCase()
  );

  if (!dossier) {
    return lines([
      alert(`dossier '${slug}' not found in index.`),
      dim('  available: n13-001-ariadne  n13-002-vesper  n13-003-kairos  n13-004-meridian'),
    ]);
  }

  if (dossier.status === 'REDACTED') {
    return lines([
      plain(''),
      warn(`${dossier.code} // ${dossier.title}`),
      warn(`CLASSIFICATION: ${dossier.classification}  STATUS: REDACTED`),
      plain(''),
      alert('  [CONTENT REDACTED // 13.4-CTRL]'),
      plain(''),
    ]);
  }

  const summaryLines = dossier.summary
    .split('\n\n')
    .flatMap((para) => [serif(para), plain('')]);

  return {
    lines: [
      plain(''),
      ok(`${dossier.code} // ${dossier.title}`),
      dim(`CLASSIFICATION: ${dossier.classification}  STATUS: ${dossier.status}`),
      plain(''),
      ...summaryLines,
    ],
  };
};

const subjectsHandler: CommandHandler = async () => ({
  lines: [
    plain(''),
    dim('  CODENAME      STATUS     DOSSIER'),
    dim('  ─────────────────────────────────'),
    ...SUBJECT_INDEX.map((s) =>
      plain(`  ${pad(s.codename, 13)} ${pad(s.status, 10)} ${s.dossier}`)
    ),
    plain(''),
    dim(`  ${SUBJECT_INDEX.length} subjects indexed. access to individual files requires clearance.`),
    plain(''),
  ],
});

const whoamiHandler: CommandHandler = async () => ({
  lines: [
    plain(''),
    alert('UNAUTHORIZED OPERATOR // SESSION ANOMALY-ESCALATED'),
    dim('origin: unresolved'),
    dim('clearance: none on record'),
    dim('this session has been logged.'),
    plain(''),
  ],
});

const clearHandler: CommandHandler = async () => ({
  lines: [],
  effect: 'clear',
});

const exitHandler: CommandHandler = async () => ({
  lines: [
    plain(''),
    dim('ACCESS RECORDED. CONNECTION HELD.'),
    { text: 'you cannot close this. it was never yours to close.', tone: 'serif' },
    plain(''),
  ],
});

const nexusHandler: CommandHandler = async () => ({
  lines: [dim('navigating to overview...')],
  effect: 'route',
  routeTo: '/nexus',
});

// ── Hidden commands ────────────────────────────────────────────────────────

const ctrlHandler: CommandHandler = async () => ({
  lines: [
    plain(''),
    alert('BACKDOOR ECHO. WHO TOLD YOU.'),
    plain(''),
  ],
  effect: 'hard-glitch',
});

const findHandler: CommandHandler = async (args, _flags, ctx) => {
  const target = args[0]?.toLowerCase();

  if (target !== 'ariadne') {
    if (!target) return lines([dim('find: missing search target.')]);
    return lines([
      dim(`find: no record matching '${target}' at current clearance.`),
    ]);
  }

  // Time-gated: 22:00-04:59 local
  const isNightWatch = ctx.hour >= 22 || ctx.hour < 5;
  if (!isNightWatch) {
    return lines([
      plain(''),
      warn('> SEARCH WINDOW CLOSED. RETRY DURING NIGHT WATCH.'),
      dim(`> local hour: ${ctx.hour}:00  window: 22:00-05:00`),
      plain(''),
    ]);
  }

  return {
    lines: [
      plain(''),
      cipher('> ARCHIVE SEARCH: SUBJECT ARIADNE'),
      cipher('> RECORD 34-F: TRANSCRIPT FRAGMENT // 2020-06-17T14:31:44Z'),
      cipher('> LOCATION: TALLINN // SOURCE CLASSIFICATION: SIGINT'),
      plain(''),
      dim('> [REDACTED 00:14 — 00:38]'),
      serif('"...they moved the records before anyone looked. that is the point. that is always the point."'),
      dim('> [END OF RECOVERED FRAGMENT]'),
      plain(''),
      dim('> original recording: clearance L-5 required.'),
      plain(''),
    ],
  };
};

const sudoHandler: CommandHandler = async () => ({
  lines: [
    plain(''),
    { text: 'you are already operating beyond clearance.', tone: 'serif' },
    plain(''),
  ],
});

// ── Registry ───────────────────────────────────────────────────────────────

export const DOCUMENTED_COMMANDS = [
  'help', 'ls', 'cat', 'subjects', 'whoami', 'clear', 'exit', 'nexus',
] as const;

const REGISTRY: Record<string, CommandHandler> = {
  help:       helpHandler,
  ls:         lsHandler,
  cat:        catHandler,
  subjects:   subjectsHandler,
  whoami:     whoamiHandler,
  clear:      clearHandler,
  exit:       exitHandler,
  nexus:      nexusHandler,
  // hidden
  '13.4-ctrl': ctrlHandler,
  find:       findHandler,
  sudo:       sudoHandler,
};

export async function dispatch(
  cmd: string,
  args: string[],
  flags: Record<string, string | boolean>,
  ctx: import('@/lib/terminal/types').TerminalContext,
): Promise<TerminalOutput> {
  const handler = REGISTRY[cmd];
  if (!handler) {
    return {
      lines: [dim(`command not recognized: ${cmd}. type 'help'.`)],
    };
  }
  return handler(args, flags, ctx);
}
