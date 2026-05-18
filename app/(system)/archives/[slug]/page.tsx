'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ScanReveal } from '@/components/primitives/ScanReveal';
import { DossierHeader } from '@/components/dossier/DossierHeader';
import { DossierTimeline } from '@/components/dossier/DossierTimeline';
import { EvidencePanel } from '@/components/dossier/EvidencePanel';
import { SubjectCard } from '@/components/dossier/SubjectCard';
import { DataLine } from '@/components/primitives/DataLine';
import { useNarrativeStore } from '@/lib/store/narrative';
import { ARIADNE } from '@/content/dossiers/n13-001-ariadne';
import type { Dossier } from '@/types/narrative';

const DOSSIERS: Record<string, Dossier> = {
  'n13-001-ariadne': ARIADNE,
};

export default function DossierPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const dossier = DOSSIERS[slug];

  const {
    clearance,
    viewedEvidence,
    flaggedContradictions,
    hydrated,
    _hydrate,
    viewEvidence,
    flagContradiction,
  } = useNarrativeStore();

  useEffect(() => {
    _hydrate();
  }, [_hydrate]);

  if (!dossier) {
    return (
      <div className="py-20 text-center">
        <p className="text-mono text-[11px] tracking-system text-alert mb-2">
          DOSSIER NOT FOUND
        </p>
        <p className="text-mono text-[10px] text-text-3">
          FILE {slug?.toUpperCase()} DOES NOT EXIST AT THIS CLEARANCE LEVEL
        </p>
      </div>
    );
  }

  const now = new Date().toISOString();

  return (
    <div className="py-10 max-w-7xl">
      {/* Breadcrumb */}
      <ScanReveal>
        <nav className="mb-6 text-mono text-[10px] tracking-system text-text-3" aria-label="Breadcrumb">
          <span>AR-CTRL</span>
          <span className="mx-2 text-void-5">·</span>
          <span>ARCHIVES</span>
          <span className="mx-2 text-void-5">·</span>
          <span className="text-text-1">{dossier.code}</span>
        </nav>
      </ScanReveal>

      {/* Header */}
      <ScanReveal delay={80}>
        <DossierHeader dossier={dossier} clearance={clearance} />
      </ScanReveal>

      {/* Main grid */}
      <div className="mt-0 grid grid-cols-12 gap-0 border border-t-0 border-void-4">
        {/* Left column */}
        <div className="col-span-8 border-r border-void-4 px-8 py-8 space-y-12">
          {/* Summary */}
          <ScanReveal delay={160}>
            <section aria-label="Case summary">
              <h2 className="text-mono text-[10px] tracking-system text-text-3 mb-4">
                SUMMARY
              </h2>
              <div className="text-serif-italic text-[15px] text-text-1 leading-[1.8] max-w-2xl space-y-4">
                {dossier.summary.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          </ScanReveal>

          {/* Timeline */}
          <ScanReveal delay={240}>
            {hydrated && (
              <DossierTimeline
                events={dossier.timeline}
                contradictions={dossier.contradictions}
                flaggedContradictions={flaggedContradictions}
                onFlagContradiction={flagContradiction}
              />
            )}
          </ScanReveal>

          {/* Evidence grid */}
          <section aria-label="Evidence catalogue">
            <h2 className="text-mono text-[10px] tracking-system text-text-3 mb-5">
              EVIDENCE · {dossier.evidence.length} ITEMS
            </h2>
            <div className="grid grid-cols-1 gap-px">
              {dossier.evidence.map((ev, idx) => (
                <EvidencePanel
                  key={ev.id}
                  evidence={ev}
                  viewed={viewedEvidence.has(ev.id)}
                  onView={viewEvidence}
                  index={idx}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="col-span-4 px-6 py-8 space-y-6" aria-label="Dossier sidebar">
          {/* Clearance meter */}
          <ScanReveal delay={200}>
            <div className="border border-void-4 bg-void-1 p-4">
              <p className="text-mono text-[9px] tracking-system text-text-3 mb-3">
                CLEARANCE METER
              </p>
              <div className="space-y-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                  <div key={level} className="flex items-center gap-2">
                    <span className="text-mono text-[9px] text-text-3 tabular-nums w-4">
                      L-{level}
                    </span>
                    <div className="flex-1 h-1.5 bg-void-3">
                      <div
                        className={`h-full transition-all duration-800 ${
                          level <= clearance ? 'bg-signal' : 'bg-void-4'
                        }`}
                        style={{ width: level <= clearance ? '100%' : '0%' }}
                      />
                    </div>
                    {level === clearance && (
                      <span className="text-mono text-[8px] tracking-system text-signal pulse-signal">
                        CURRENT
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScanReveal>

          {/* Primary subject */}
          <ScanReveal delay={280}>
            <SubjectCard subject={dossier.primarySubject} variant="primary" />
          </ScanReveal>

          {/* Related subjects */}
          {dossier.relatedSubjects.length > 0 && (
            <ScanReveal delay={360}>
              <div>
                <p className="text-mono text-[9px] tracking-system text-text-3 mb-3">
                  RELATED SUBJECTS
                </p>
                <div className="space-y-2">
                  {dossier.relatedSubjects.map((s) => (
                    <SubjectCard key={s.id} subject={s} variant="related" />
                  ))}
                </div>
              </div>
            </ScanReveal>
          )}

          {/* Classification audit log */}
          <ScanReveal delay={440}>
            <div className="border border-void-4 bg-void-1 p-4">
              <p className="text-mono text-[9px] tracking-system text-text-3 mb-3">
                CLASSIFICATION AUDIT
              </p>
              <div className="space-y-0">
                <DataLine label="OPENED" value={dossier.opened.split('T')[0] ?? ''} />
                <DataLine label="CLASSIFICATION" value={dossier.classification} tone="warn" />
                <DataLine label="LAST REVIEWED" value="2024-03-23" />
                <DataLine label="AUTHORITY" value="NEXUS-CTRL-13" tone="dim" />
                <DataLine label="COMPARTMENT" value="NOFORN" tone="alert" />
              </div>
            </div>
          </ScanReveal>

          {/* Session observer note */}
          <ScanReveal delay={520}>
            <div className="border border-alert/20 bg-void-1 p-4">
              <p className="text-mono text-[9px] tracking-system text-alert mb-2">
                OBSERVER LOG
              </p>
              <div className="space-y-0">
                <DataLine
                  label="SESSION VIEWED"
                  value={`${viewedEvidence.size} / ${dossier.evidence.length} ITEMS`}
                  tone={viewedEvidence.size > 0 ? 'signal' : 'dim'}
                />
                <DataLine
                  label="CONTRADICTIONS FLAGGED"
                  value={`${flaggedContradictions.size} / ${dossier.contradictions.length}`}
                  tone={flaggedContradictions.size > 0 ? 'warn' : 'dim'}
                />
                <DataLine label="LAST ACCESS" value={now.split('T')[0] ?? ''} />
              </div>
              <p className="mt-3 text-[10px] text-serif-italic text-text-3 leading-relaxed">
                &ldquo;This system notes what you read. It does not judge. It observes.&rdquo;
              </p>
            </div>
          </ScanReveal>
        </aside>
      </div>
    </div>
  );
}
