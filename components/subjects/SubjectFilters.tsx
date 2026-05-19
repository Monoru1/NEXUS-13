'use client';

import type { Subject } from '@/types/narrative';

type FilterValue = Subject['status'] | 'ALL';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'ALL', label: 'ALL' },
  { value: 'ACTIVE', label: 'ACTIVE' },
  { value: 'DECEASED', label: 'DECEASED' },
  { value: 'UNKNOWN', label: 'UNKNOWN' },
  { value: 'REDACTED', label: 'REDACTED' },
];

type Props = {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
};

export function SubjectFilters({ active, onChange, counts }: Props) {
  return (
    <div
      className="flex items-center gap-6 px-6 py-3 border-b"
      style={{ borderColor: '#2e2e35', fontFamily: 'var(--font-mono, monospace)' }}
    >
      {FILTERS.map((f) => {
        const isActive = active === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className="relative text-xs tracking-widest uppercase pb-1 transition-colors duration-150"
            style={{
              color: isActive ? '#f4f4f2' : '#56565a',
            }}
          >
            {f.label}
            {counts[f.value] !== undefined && (
              <span className="ml-1.5" style={{ color: '#56565a', fontSize: '10px' }}>
                {counts[f.value]}
              </span>
            )}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: '#c5ff3c' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
