'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { TRANSMISSIONS } from '@/content/transmissions/index';
import { TransmissionRow } from '@/components/transmissions/TransmissionRow';

const TransmissionsProjection = dynamic(
  () => import('@/components/projections/TransmissionsProjection').then((m) => ({ default: m.TransmissionsProjection })),
  { ssr: false },
);

type FilterValue = 'ALL' | 'ANOMALOUS' | 'DECRYPTED' | 'PENDING';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'ALL', label: 'ALL' },
  { value: 'ANOMALOUS', label: 'ANOMALOUS' },
  { value: 'DECRYPTED', label: 'DECRYPTED' },
  { value: 'PENDING', label: 'PENDING' },
];

export default function TransmissionsPage() {
  const [filter, setFilter] = useState<FilterValue>('ALL');

  const filtered = useMemo(() => {
    switch (filter) {
      case 'ANOMALOUS': return TRANSMISSIONS.filter((t) => t.bandAnomaly);
      case 'DECRYPTED': return TRANSMISSIONS.filter((t) => t.audioStatus === 'available');
      case 'PENDING': return TRANSMISSIONS.filter((t) => t.audioStatus === 'decryption-pending');
      default: return TRANSMISSIONS;
    }
  }, [filter]);

  const anomalousCount = TRANSMISSIONS.filter((t) => t.bandAnomaly).length;
  const decryptedCount = TRANSMISSIONS.filter((t) => t.audioStatus === 'available').length;

  return (
    <div
      className="min-h-screen"
      style={{ background: '#060607', fontFamily: 'var(--font-mono, monospace)' }}
    >
      {/* 3D Projection hero */}
      <TransmissionsProjection
        transmissionCount={TRANSMISSIONS.length}
        anomalousCount={anomalousCount}
      />

      {/* Page header */}
      <div
        className="flex items-start justify-between px-6 py-4 border-b"
        style={{ borderColor: '#2e2e35' }}
      >
        <div>
          <span className="text-xs tracking-widest uppercase" style={{ color: '#56565a' }}>
            TX · INTERCEPTS · 13.4
          </span>
          <p
            className="mt-1 text-sm italic"
            style={{ color: '#56565a', fontFamily: 'var(--font-serif, serif)' }}
          >
            Two of these transmissions originate from a frequency that does not officially exist.
          </p>
        </div>
        <div className="text-right text-xs" style={{ color: '#56565a' }}>
          <span style={{ color: '#a0a0a4' }}>INTERCEPTED</span>{' '}
          <span style={{ color: '#5bc0eb' }}>{TRANSMISSIONS.length}</span>
          {' · '}
          <span style={{ color: '#a0a0a4' }}>DECRYPTED</span>{' '}
          <span style={{ color: '#c5ff3c' }}>{decryptedCount}</span>
          {' · '}
          <span style={{ color: '#a0a0a4' }}>ANOMALOUS</span>{' '}
          <span style={{ color: '#ffb020' }}>{anomalousCount}</span>
        </div>
      </div>

      {/* Sticky filters */}
      <div
        className="sticky top-0 z-10 flex items-center gap-6 px-6 py-3 border-b"
        style={{ borderColor: '#2e2e35', background: '#060607' }}
      >
        {FILTERS.map((f) => {
          const isActive = filter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="relative text-xs tracking-widest uppercase pb-1 transition-colors duration-150"
              style={{ color: isActive ? '#f4f4f2' : '#56565a' }}
            >
              {f.label}
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

      {/* Column headers */}
      <div
        className="flex items-center gap-4 px-6 py-2 border-b"
        style={{ borderColor: '#1a1a1e' }}
      >
        {['TIMESTAMP', 'BAND', 'DURATION', '▶'].map((h) => (
          <span
            key={h}
            className={h === '▶' ? 'w-6 text-center' : h === 'TIMESTAMP' ? 'w-44' : h === 'DURATION' ? 'w-20' : 'w-20'}
            style={{ fontSize: '10px', color: '#2e2e35', letterSpacing: '0.1em' }}
          >
            {h}
          </span>
        ))}
      </div>

      <div className="divide-y" style={{ borderColor: '#1a1a1e' }}>
        {filtered.map((tx) => (
          <TransmissionRow key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}
