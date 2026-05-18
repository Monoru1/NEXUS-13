'use client';

import type { TimelineEvent, Contradiction } from '@/types/narrative';
import { ScanReveal } from '@/components/primitives/ScanReveal';
import { ContradictionMarker } from '@/components/dossier/ContradictionMarker';

type Props = {
  events: TimelineEvent[];
  contradictions: Contradiction[];
  flaggedContradictions: Set<string>;
  onFlagContradiction: (id: string) => void;
};

function formatDate(iso: string) {
  return iso.replace('T', ' ').replace('.000Z', 'Z');
}

export function DossierTimeline({
  events,
  contradictions,
  flaggedContradictions,
  onFlagContradiction,
}: Props) {
  const contradictionsByEvent = new Map<string, Contradiction[]>();
  for (const c of contradictions) {
    for (const evId of c.between) {
      const existing = contradictionsByEvent.get(evId) ?? [];
      existing.push(c);
      contradictionsByEvent.set(evId, existing);
    }
  }

  return (
    <section aria-label="Case timeline">
      <h2 className="text-mono text-[10px] tracking-system text-text-3 mb-5">
        TIMELINE · {events.length} EVENTS
      </h2>

      <div className="relative">
        {/* Vertical spine */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px bg-void-5"
          aria-hidden
        />

        <ol className="space-y-0 list-none">
          {events.map((event, idx) => {
            const linkedContradictions = contradictionsByEvent.get(event.id) ?? [];
            const hasContradiction = linkedContradictions.length > 0;

            return (
              <li key={event.id} className="relative pl-8">
                {/* Node */}
                <div
                  className={`
                    absolute left-0 top-3 w-3.5 h-3.5 border
                    ${hasContradiction
                      ? 'border-warn bg-void-0'
                      : 'border-void-5 bg-void-1'
                    }
                  `}
                  aria-hidden
                />

                <ScanReveal trigger="view" delay={80 * idx}>
                  <div
                    className={`
                      mb-1 pb-6
                      ${idx < events.length - 1 ? 'border-b border-void-4' : ''}
                    `}
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <time
                        dateTime={event.date}
                        className="text-mono text-[10px] tabular-nums text-text-3 shrink-0"
                      >
                        {formatDate(event.date)}
                      </time>
                      {hasContradiction && (
                        <span
                          className="text-mono text-[9px] tracking-system text-warn shrink-0"
                          aria-label="This event is involved in a contradiction"
                        >
                          ▲ INCONSISTENCY
                        </span>
                      )}
                    </div>

                    <h3
                      className={`
                        font-display text-base font-medium mb-2
                        ${hasContradiction ? 'text-warn' : 'text-text-0'}
                      `}
                    >
                      {event.title}
                    </h3>

                    <p className="text-[13px] text-text-2 leading-relaxed max-w-2xl">
                      {event.description}
                    </p>

                    {event.evidenceIds.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.evidenceIds.map((id) => (
                          <span
                            key={id}
                            className="text-mono text-[9px] tracking-system text-cipher border border-cipher/30 px-1.5 py-0.5"
                          >
                            {id}
                          </span>
                        ))}
                      </div>
                    )}

                    {linkedContradictions.map((c) => (
                      <div key={c.id} className="mt-4">
                        <ContradictionMarker
                          contradiction={c}
                          flagged={flaggedContradictions.has(c.id)}
                          onFlag={onFlagContradiction}
                        />
                      </div>
                    ))}
                  </div>
                </ScanReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
