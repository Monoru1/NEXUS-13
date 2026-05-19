'use client';

const ENTRIES = [
  { color: '#c5ff3c', label: 'SUBJECT · ACTIVE' },
  { color: '#5bc0eb', label: 'DOSSIER NODE' },
  { color: '#ff3636', label: 'SUBJECT · UNKNOWN / REDACTED' },
  { color: '#ffb020', label: 'EDGE · CONTRADICTION' },
];

export function GraphLegend() {
  return (
    <div
      className="absolute bottom-8 left-6 pointer-events-none"
      style={{ fontFamily: 'var(--font-mono, monospace)' }}
    >
      <ul className="space-y-1">
        {ENTRIES.map((e) => (
          <li key={e.label} className="flex items-center gap-2">
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: e.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 10, color: '#56565a', letterSpacing: '0.06em' }}>
              {e.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
