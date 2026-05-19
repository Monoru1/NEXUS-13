import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NEXUS//13 — CLASSIFIED';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060607',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top classification bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: '1px solid #2e2e35',
            paddingBottom: '24px',
            width: '100%',
          }}
        >
          <span style={{ color: '#ff3636', fontSize: '11px', letterSpacing: '0.14em' }}>
            TOP SECRET // NOFORN
          </span>
          <span style={{ color: '#2e2e35', fontSize: '10px' }}>·</span>
          <span style={{ color: '#56565a', fontSize: '10px', letterSpacing: '0.12em' }}>
            NEXUS-CTRL-13 // UNAUTHORIZED ACCESS PROHIBITED
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#c5ff3c',
                borderRadius: '50%',
              }}
            />
            <span style={{ color: '#c5ff3c', fontSize: '11px', letterSpacing: '0.18em' }}>
              SYSTEM ACTIVE
            </span>
          </div>

          <div
            style={{
              fontSize: '72px',
              fontWeight: '700',
              color: '#f4f4f2',
              letterSpacing: '-0.02em',
              lineHeight: '1',
            }}
          >
            NEXUS//13
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#8c8c94',
              letterSpacing: '0.08em',
              maxWidth: '600px',
              lineHeight: '1.5',
            }}
          >
            CLASSIFIED INTELLIGENCE INTERFACE
          </div>

          <div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
            {[
              { code: 'N13-001', status: 'ACTIVE', color: '#c5ff3c' },
              { code: 'N13-002', status: 'OPEN', color: '#5bc0eb' },
              { code: 'N13-003', status: 'REDACTED', color: '#56565a' },
              { code: 'N13-004', status: 'CLOSED', color: '#ffb020' },
            ].map((d) => (
              <div key={d.code} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: '#56565a', fontSize: '9px', letterSpacing: '0.14em' }}>{d.code}</span>
                <span style={{ color: d.color, fontSize: '10px', letterSpacing: '0.12em' }}>{d.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid #2e2e35',
            paddingTop: '24px',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#2e2e35', fontSize: '9px', letterSpacing: '0.14em' }}>
            COMPARTMENT: NOFORN // HANDLE VIA NEXUS CHANNELS ONLY
          </span>
          <span style={{ color: '#2e2e35', fontSize: '9px', letterSpacing: '0.14em' }}>
            NEXUS//SECRET//NOFORN
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
