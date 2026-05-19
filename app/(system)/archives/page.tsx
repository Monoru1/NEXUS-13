import Link from 'next/link';
import { ScanReveal } from '@/components/primitives/ScanReveal';
import { ClassificationTag } from '@/components/primitives/ClassificationTag';

export const revalidate = 3600;

const ALL_DOSSIERS = [
  {
    slug: 'n13-001-ariadne',
    code: 'N13-001',
    title: 'ARIADNE',
    classification: 'SECRET' as const,
    status: 'OPEN' as const,
    contradictions: 2,
    evidence: 12,
    opened: '2019-04-12',
    primary: 'Subject reported deceased 2019-04-11. Multiple subsequent sightings confirmed by acoustic and photographic analysis.',
  },
  {
    slug: 'n13-002-vesper',
    code: 'N13-002',
    title: 'VESPER',
    classification: 'SECRET' as const,
    status: 'OPEN' as const,
    contradictions: 1,
    evidence: 8,
    opened: '2021-03-08',
    primary: 'Transmissions intercepted on a frequency that does not appear on any registered band. Source unknown. Content partially decoded.',
  },
  {
    slug: 'n13-003-kairos',
    code: 'N13-003',
    title: 'KAIROS',
    classification: 'TOP SECRET' as const,
    status: 'REDACTED' as const,
    contradictions: 0,
    evidence: 2,
    opened: '2018-11-01',
    primary: 'Personnel file. Most content removed by directive 13.4-CTRL. Nature of subject unknown at this clearance level.',
  },
  {
    slug: 'n13-004-meridian',
    code: 'N13-004',
    title: 'MERIDIAN',
    classification: 'SECRET' as const,
    status: 'CLOSED' as const,
    contradictions: 0,
    evidence: 23,
    opened: '2017-06-14',
    primary: 'Case officially closed 2023-01-30. Internal audit log records an anonymous re-opening query on 2024-08-14. No authorising officer logged.',
  },
] as const;

export default function ArchivesPage() {
  return (
    <div className="py-10 max-w-7xl">
      <ScanReveal>
        <header className="mb-10 flex items-baseline justify-between">
          <div>
            <p className="text-mono text-[10px] tracking-system text-text-3 mb-2">
              AR-CTRL · DOSSIER ARCHIVE · 13.4
            </p>
            <h1 className="font-display text-[42px] leading-none font-medium text-text-0">
              Archives
            </h1>
            <p className="mt-4 text-serif-italic text-text-1 leading-relaxed">
              &ldquo;Every file here was opened for a reason. The reason is not always the one on record.&rdquo;
            </p>
          </div>

          <div className="text-right text-mono text-[11px] tracking-system">
            <div className="text-text-3">TOTAL DOSSIERS</div>
            <div className="text-signal text-2xl tabular-nums">{ALL_DOSSIERS.length}</div>
          </div>
        </header>
      </ScanReveal>

      <div className="mb-4 grid grid-cols-12 px-6 text-mono text-[9px] tracking-system text-text-3">
        <span className="col-span-2">CODE</span>
        <span className="col-span-5">SUBJECT</span>
        <span className="col-span-2">OPENED</span>
        <span className="col-span-3 text-right">EVIDENCE · CONTRADICTIONS</span>
      </div>

      <div className="space-y-px">
        {ALL_DOSSIERS.map((d, idx) => (
          <ScanReveal key={d.slug} delay={100 * idx}>
            <Link
              href={d.slug === 'n13-001-ariadne' ? `/archives/${d.slug}` : '#'}
              aria-label={`Open dossier ${d.code} — ${d.title}`}
              className={`
                block group border border-void-4
                bg-void-1 transition-colors duration-200
                ${d.slug === 'n13-001-ariadne'
                  ? 'hover:bg-void-2 hover:border-void-5'
                  : 'cursor-not-allowed opacity-60'
                }
              `}
            >
              <div className="px-6 py-5 grid grid-cols-12 gap-4 items-start">
                <div className="col-span-2 text-mono text-[11px] tracking-system text-text-3 group-hover:text-signal transition-colors pt-0.5">
                  {d.code}
                </div>

                <div className="col-span-5">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-display text-lg text-text-0">
                      {d.title}
                    </h2>
                    <ClassificationTag level={d.classification} />
                    <ClassificationTag level={d.status} variant="status" />
                  </div>
                  <p className="text-[12px] text-text-2 leading-relaxed">
                    {d.primary}
                  </p>
                </div>

                <div className="col-span-2 text-mono text-[10px] tabular-nums text-text-3 pt-0.5">
                  {d.opened}
                </div>

                <div className="col-span-3 text-mono text-[10px] tracking-system text-right pt-0.5">
                  <div className="text-text-2">
                    {d.evidence} ITEMS
                  </div>
                  {d.contradictions > 0 && (
                    <div className="text-warn mt-0.5">
                      {d.contradictions} CONTRADICT.
                    </div>
                  )}
                  {d.slug !== 'n13-001-ariadne' && (
                    <div className="text-text-3 mt-0.5 text-[9px]">
                      ACCESS RESTRICTED
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </ScanReveal>
        ))}
      </div>

      <ScanReveal delay={500}>
        <p className="mt-6 text-mono text-[10px] tracking-system text-text-3 text-center">
          SHOWING 4 OF 4 DOSSIERS · CLEARANCE L-2 · 3 DOSSIERS REQUIRE HIGHER ACCESS
        </p>
      </ScanReveal>
    </div>
  );
}
