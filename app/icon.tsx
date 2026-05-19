import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060607',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontWeight: '700',
          fontSize: '14px',
          color: '#c5ff3c',
          letterSpacing: '-0.03em',
          border: '1px solid #c5ff3c',
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
