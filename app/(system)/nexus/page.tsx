import Link from 'next/link';
import { ScanReveal } from '@/components/primitives/ScanReveal';
import { ClassificationTag } from '@/components/primitives/ClassificationTag';

const RECENT_ACTIVITY = [
  { ts: '03:14:22Z', code: 'N13-001', event: 'Subject ARIADNE — location update', tone: 'signal' },
  { ts: '02:58:11Z', code: 'N13-004', event: 'Document declassified by operator UNKNOWN', tone: 'warn' },
  { ts: '02:41:07Z', code: 'N13-002', event: 'Transmission intercepted — band 17.3 MHz', tone: 'cipher' },
  { ts: '02:19:55Z', code: 'N13-001', event: 'Contradiction flagged in timeline', tone: 'alert' },
  { ts: '01:54:30Z', code: 'N13-003', event: 'Subject KAIROS — entered domain', tone: 'signal' },
  { ts: '01:32:18Z', code: 'N13-001', event: 'Evidence E-117 reviewed', tone: 'text-2' },
] as const;

const OPEN_DOSSIERS = [
  {
    slug: 'n13-001-ariadne',
    code: 'N13-001',
    title: 'ARIADNE',
    classification: 'SECRET',
    status: 'OPEN',
    contradictions: 3,
    evidence: 17,
    primary: 'Subject reported deceased 2019-04-11. Multiple subsequent sightings.',
  },
  {
    slug: 'n13-002-vesper',
    code: 'N13-002',
    title: 'VESPER',
    classification: 'SECRET',
    status: 'OPEN',
    contradictions: 1,
    evidence: 8,
    primary: 'Intercepted transmissions originating from a frequency that does not exist on any registered band.',
  },
  {
    slug: 'n13-003-kairos',
    code: 'N13-003',
    title: 'KAIROS',
    classification: 'TOP SECRET',
    status: 'REDACTED',
    contradictions: 0,
    evidence: 2,
    primary: 'Personnel file. Most content removed by directive 13.4-CTRL.',
  },
  {
    slug: 'n13-004-meridian',
    code: 'N13-004',
    title: 'MERIDIAN',
    classification: 'SECRET',
    status: 'CLOSED',
    contradictions: 0,
    evidence: 23,
    primary: 'Case officially closed. Why was it reopened in audit log 2024-08-14?',
  },
] as const;

const toneColor = (t: string) => {
  switch (t) {
    case 'signal': return 'text-signal';
    case 'warn': return 'text-warn';
    case 'alert': return 'text-alert';
    case 'cipher': return 'text-cipher';
    default: return 'text-text-2';
  }
};

export default function NexusOverviewPage() {
  return (
    <div className="py-10 max-w-7xl">
      <ScanReveal>
        <header className="mb-12 flex items-baseline justify-between">
          <div>
            <p className="text-mono text-[10px] tracking-system text-text-3 mb-2">
              NX-CTRL · OVERVIEW · 13.4
            </p>
            <h1 className="font-display text-[42px] leading-none font-medium text-text-0">
              Operational status
            </h1>
            <p className="mt-4 text-text-2 max-w-xl leading-relaxed">
              <span className="text-serif-italic text-text-1">
                Four open dossiers. Six anomalies under monitoring. One subject who should not exist.
              </span>
            </p>
          </div>

          <div className="text-right text-mono text-[11px] tracking-system">
            <div className="text-text-3">CLEARANCE</div>
            <div className="text-signal text-2xl tabular-nums">L-2</div>
          </div>
        </header>
      </ScanReveal>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-8">
          <h2 className="text-mono text-[10px] tracking-system text-text-3 mb-4">
            OPEN DOSSIERS · {OPEN_DOSSIERS.length}
          </h2>

          <div className="space-y-2">
            {OPEN_DOSSIERS.map((d, idx) => (
              <ScanReveal key={d.slug} delay={120 * idx}>
                <Link
                  href={`/archives/${d.slug}`}
                  className="
                    block group border border-void-4
                    bg-void-1 hover:bg-void-2 hover:border-void-5
                    transition-colors duration-200
                  "
                >
                  <div className="px-6 py-5 grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 text-mono text-[11px] tracking-system text-text-3 group-hover:text-signal transition-colors">
                      {d.code}
                    </div>

                    <div className="col-span-7">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-xl text-text-0">
                          {d.title}
                        </h3>
                        <ClassificationTag level={d.classification} />
                        <ClassificationTag level={d.status} variant="status" />
                      </div>
                      <p className="mt-1 text-sm text-text-2 leading-relaxed">
                        {d.primary}
                      </p>
                    </div>

                    <div className="col-span-3 text-mono text-[10px] tracking-system text-right">
                      <div className="text-text-3">
                        EVIDENCE <span className="text-text-1 tabular-nums">{d.evidence}</span>
                      </div>
                      {d.contradictions > 0 && (
                        <div className="text-warn mt-1">
                          CONTRADICTIONS <span className="tabular-nums">{d.contradictions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </ScanReveal>
            ))}
          </div>
        </section>

        <aside className="col-span-4">
          <h2 className="text-mono text-[10px] tracking-system text-text-3 mb-4">
            ACTIVITY · LAST 4H
          </h2>

          <div className="border border-void-4 bg-void-1">
            <div className="px-4 py-3 border-b border-void-4 flex items-center justify-between">
              <span className="text-mono text-[10px] tracking-system text-text-2">
                LIVE FEED
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-signal pulse-signal" />
                <span className="text-mono text-[10px] tracking-system text-signal">
                  ACTIVE
                </span>
              </span>
            </div>

            <div className="divide-y divide-void-4">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="px-4 py-3 text-[12px]">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-mono text-[10px] text-text-3 tabular-nums">
                      {a.ts}
                    </span>
                    <span className={`text-mono text-[10px] ${toneColor(a.tone)}`}>
                      {a.code}
                    </span>
                  </div>
                  <p className="text-text-1 leading-snug">{a.event}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-text-3 text-serif-italic leading-relaxed">
            &ldquo;The activity feed is read-only. You cannot delete events.
            Whoever is watching, knows you read this.&rdquo;
          </p>
        </aside>
      </div>
    </div>
  );
}
