import Link from 'next/link';
import type { Transmission } from '@/content/transmissions/index';

const AUDIO_ICON: Record<string, string> = {
  'available': '▶',
  'decryption-pending': '◌',
  'unavailable': '—',
};

const AUDIO_COLOR: Record<string, string> = {
  'available': '#5bc0eb',
  'decryption-pending': '#ffb020',
  'unavailable': '#2e2e35',
};

type Props = {
  tx: Transmission;
};

export function TransmissionRow({ tx }: Props) {
  const dateStr = tx.timestamp.replace('T', ' ').slice(0, 19) + ' UTC';

  return (
    <Link
      href={`/transmissions/${tx.id}`}
      className="group flex items-center gap-4 px-6 py-3 transition-colors duration-150 hover:bg-void-2/30"
      style={{ fontFamily: 'var(--font-mono, monospace)' }}
    >
      {/* Timestamp */}
      <span className="w-44 text-xs shrink-0" style={{ color: '#56565a', fontSize: '11px' }}>
        {dateStr}
      </span>

      {/* Band */}
      <span
        className="w-20 text-xs shrink-0 tracking-wide"
        style={{
          color: tx.bandAnomaly ? '#ffb020' : '#5bc0eb',
          fontSize: '11px',
        }}
      >
        {tx.band}
        {tx.bandAnomaly && (
          <span className="ml-1 text-xs" style={{ color: '#ffb020', fontSize: '9px' }}>
            ◆
          </span>
        )}
      </span>

      {/* Duration */}
      <span className="w-20 text-xs shrink-0" style={{ color: '#56565a', fontSize: '11px' }}>
        {tx.duration}
      </span>

      {/* Audio status */}
      <span
        className="w-6 text-xs shrink-0 text-center"
        style={{ color: AUDIO_COLOR[tx.audioStatus] ?? '#56565a' }}
        title={tx.audioStatus}
      >
        {AUDIO_ICON[tx.audioStatus] ?? '—'}
      </span>

      {/* Arrow */}
      <span className="flex-1" />
      <span
        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ color: '#a0a0a4' }}
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}
