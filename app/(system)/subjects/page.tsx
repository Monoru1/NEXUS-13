'use client';

import { useState, useMemo } from 'react';
import { getAllSubjects } from '@/lib/subjects/query';
import { SubjectRow } from '@/components/subjects/SubjectRow';
import { SubjectFilters } from '@/components/subjects/SubjectFilters';
import type { Subject } from '@/types/narrative';

type FilterValue = Subject['status'] | 'ALL';

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#c5ff3c',
  DECEASED: '#56565a',
  UNKNOWN: '#ff3636',
  REDACTED: '#ff3636',
};

const STATUS_BAR_WIDTH: Record<string, number> = {
  ACTIVE: 3,
  DECEASED: 2,
  UNKNOWN: 2,
  REDACTED: 2,
};

export default function SubjectsPage() {
  const allSubjects = useMemo(() => getAllSubjects(), []);
  const [filter, setFilter] = useState<FilterValue>('ALL');

  const filtered = useMemo(
    () => (filter === 'ALL' ? allSubjects : allSubjects.filter((s) => s.status === filter)),
    [allSubjects, filter],
  );

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = {
      ALL: allSubjects.length,
      ACTIVE: 0,
      DECEASED: 0,
      UNKNOWN: 0,
      REDACTED: 0,
    };
    for (const s of allSubjects) {
      if (s.status in c) c[s.status as Subject['status']]++;
    }
    return c;
  }, [allSubjects]);

  return (
    <div
      className="min-h-screen"
      style={{ background: '#060607', fontFamily: 'var(--font-mono, monospace)' }}
    >
      {/* Page header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: '#2e2e35' }}
      >
        <div>
          <span className="text-xs tracking-widest uppercase" style={{ color: '#56565a' }}>
            SB · SUBJECTS · 13.4
          </span>
          <p
            className="mt-1 text-sm italic"
            style={{ color: '#56565a', fontFamily: 'var(--font-serif, serif)' }}
          >
            Nine identities under observation. Three are not who they claim to be.
          </p>
        </div>
        <span className="text-xs tracking-wide" style={{ color: '#56565a' }}>
          <span style={{ color: '#a0a0a4' }}>SUBJECTS</span>{' '}
          <span style={{ color: '#c5ff3c' }}>{allSubjects.length}</span>
        </span>
      </div>

      <div className="flex">
        {/* Main list — 8/12 */}
        <div className="flex-1">
          <SubjectFilters active={filter} onChange={setFilter} counts={counts} />

          {/* Column headers */}
          <div
            className="flex items-center gap-4 px-6 py-2 border-b"
            style={{ borderColor: '#1a1a1e' }}
          >
            <span className="w-36 text-xs shrink-0" style={{ color: '#2e2e35', fontSize: '10px', letterSpacing: '0.1em' }}>
              CODENAME
            </span>
            <span className="w-24 text-xs shrink-0" style={{ color: '#2e2e35', fontSize: '10px', letterSpacing: '0.1em' }}>
              STATUS
            </span>
            <span className="w-32 text-xs shrink-0" style={{ color: '#2e2e35', fontSize: '10px', letterSpacing: '0.1em' }}>
              FIRST OBSERVED
            </span>
            <span className="flex-1 text-xs" style={{ color: '#2e2e35', fontSize: '10px', letterSpacing: '0.1em' }}>
              DOSSIERS
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: '#1a1a1e' }}>
            {filtered.map((s) => (
              <SubjectRow key={s.id} subject={s} />
            ))}
          </div>
        </div>

        {/* Sidebar stats — 4/12 */}
        <aside
          className="w-64 shrink-0 border-l p-6"
          style={{ borderColor: '#2e2e35' }}
        >
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#56565a', fontSize: '10px' }}>
            STATUS BREAKDOWN
          </p>
          {(['ACTIVE', 'DECEASED', 'UNKNOWN', 'REDACTED'] as Subject['status'][]).map((status) => {
            const count = counts[status];
            const pct = Math.round((count / allSubjects.length) * 100);
            const barWidth = (count / allSubjects.length) * 100;
            return (
              <div key={status} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '10px', color: STATUS_COLOR[status] ?? '#a0a0a4', letterSpacing: '0.1em' }}>
                    {status}
                  </span>
                  <span style={{ fontSize: '10px', color: '#56565a' }}>
                    {count} · {pct}%
                  </span>
                </div>
                <div className="h-px w-full" style={{ background: '#1a1a1e' }}>
                  <div
                    className="h-px"
                    style={{
                      width: `${barWidth}%`,
                      background: STATUS_COLOR[status] ?? '#a0a0a4',
                      opacity: STATUS_BAR_WIDTH[status] ? 0.6 : 0.3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
