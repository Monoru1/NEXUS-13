import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TRANSMISSIONS } from '@/content/transmissions/index';
import { WaveformPlaceholder } from '@/components/transmissions/WaveformPlaceholder';

const DOSSIER_TITLES: Record<string, { title: string; code: string }> = {
  'n13-001-ariadne': { title: 'ARIADNE', code: 'N13-001' },
  'n13-002-vesper': { title: 'VESPER', code: 'N13-002' },
  'n13-003-kairos': { title: 'KAIROS', code: 'N13-003' },
  'n13-004-meridian': { title: 'MERIDIAN', code: 'N13-004' },
};

// Render transcript with [REDACTED ...] spans styled as redacted blocks
function TranscriptBlock({ text }: { text: string }) {
  const parts = text.split(/(\[REDACTED[^\]]*\])/g);
  return (
    <p
      className="text-xs leading-relaxed"
      style={{ color: '#a0a0a4', fontFamily: 'var(--font-mono, monospace)' }}
    >
      {parts.map((part, i) => {
        if (part.startsWith('[REDACTED')) {
          return (
            <span
              key={i}
              className="inline-block px-1 mx-0.5 align-baseline cursor-default"
              style={{
                background: '#1a1a1e',
                border: '1px solid #2e2e35',
                color: '#2e2e35',
                fontSize: '10px',
                letterSpacing: '0.08em',
              }}
              title="REDACTED // 13.4-CTRL"
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TransmissionDetailPage({ params }: Props) {
  const { id } = await params;
  const tx = TRANSMISSIONS.find((t) => t.id === id);
  if (!tx) notFound();

  const dossierMeta = tx.linkedDossier ? DOSSIER_TITLES[tx.linkedDossier] : null;
  const dateStr = tx.timestamp.replace('T', ' ').slice(0, 19) + ' UTC';

  return (
    <div
      className="min-h-screen"
      style={{ background: '#060607', fontFamily: 'var(--font-mono, monospace)' }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-6 py-5 border-b"
        style={{ borderColor: '#2e2e35' }}
      >
        <div className="space-y-1">
          <h1 className="text-xs tracking-widest uppercase" style={{ color: '#56565a' }}>
            TX · INTERCEPTS · 13.4
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm tracking-wide" style={{ color: '#a0a0a4' }}>
              {dateStr}
            </span>
            <span
              className="text-xs tracking-wide"
              style={{ color: tx.bandAnomaly ? '#ffb020' : '#5bc0eb' }}
            >
              {tx.band}
              {tx.bandAnomaly && <span className="ml-1 text-xs" style={{ fontSize: '9px' }}>◆ ANOMALOUS BAND</span>}
            </span>
            <span className="text-xs" style={{ color: '#56565a' }}>
              {tx.duration}
            </span>
          </div>
        </div>
        <span
          className="text-xs px-2 py-1 border tracking-widest uppercase"
          style={{
            color: tx.audioStatus === 'available' ? '#5bc0eb' : '#ffb020',
            borderColor: tx.audioStatus === 'available' ? '#5bc0eb' : '#ffb020',
            fontSize: '10px',
          }}
        >
          {tx.audioStatus === 'available' ? 'DECRYPTED' : tx.audioStatus === 'decryption-pending' ? 'PENDING' : 'UNAVAILABLE'}
        </span>
      </div>

      <div className="px-6 py-6 max-w-3xl space-y-8">
        {/* Waveform */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#56565a', fontSize: '10px' }}>
            SIGNAL WAVEFORM
          </p>
          <WaveformPlaceholder id={tx.id} height={80} anomaly={tx.bandAnomaly} />
        </div>

        {/* Play button stub */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 border text-xs tracking-widest uppercase cursor-not-allowed"
              style={{
                borderColor: '#2e2e35',
                color: '#2e2e35',
                fontFamily: 'var(--font-mono, monospace)',
              }}
              aria-label="Audio playback unavailable"
            >
              <span>▶</span>
              <span>PLAY AUDIO</span>
            </button>
            <span
              className="absolute bottom-full left-0 mb-2 px-2 py-1 text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
              style={{
                background: '#1a1a1e',
                border: '1px solid #2e2e35',
                color: '#ff3636',
                fontSize: '10px',
              }}
            >
              decryption pending // 13.4-CTRL
            </span>
          </div>
          <span className="text-xs" style={{ color: '#2e2e35', fontSize: '10px' }}>
            ID: {tx.id.toUpperCase()} · {tx.band} · {tx.duration}
          </span>
        </div>

        {/* Transcript */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#56565a', fontSize: '10px' }}>
            TRANSCRIPT
          </p>
          {tx.transcript === '[REDACTED]' ? (
            <span
              className="inline-block px-2 py-1 text-xs"
              style={{ background: '#1a1a1e', border: '1px solid #2e2e35', color: '#2e2e35' }}
            >
              [REDACTED]
            </span>
          ) : (
            <TranscriptBlock text={tx.transcript} />
          )}
        </div>

        {/* Linked dossier */}
        {dossierMeta && tx.linkedDossier && (
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#56565a', fontSize: '10px' }}>
              LINKED DOSSIER
            </p>
            <Link
              href={`/archives/${tx.linkedDossier}`}
              className="flex items-center justify-between px-4 py-3 border group transition-colors duration-150"
              style={{ borderColor: '#2e2e35', maxWidth: '320px' }}
            >
              <div>
                <span className="text-xs tracking-widest mr-3" style={{ color: '#56565a', fontSize: '10px' }}>
                  {dossierMeta.code}
                </span>
                <span
                  className="text-xs tracking-widest uppercase group-hover:text-white transition-colors duration-150"
                  style={{ color: '#a0a0a4' }}
                >
                  {dossierMeta.title}
                </span>
              </div>
              <span className="text-xs group-hover:opacity-100 opacity-40 transition-opacity duration-150" style={{ color: '#a0a0a4' }}>→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { TRANSMISSIONS } = await import('@/content/transmissions/index');
  return TRANSMISSIONS.map((t) => ({ id: t.id }));
}
