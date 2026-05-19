type Props = {
  id: string;
  height?: number;
  anomaly?: boolean;
};

// Seeded pseudo-random — stable per transmission id
function seededRand(seed: string, index: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  h = (Math.imul(17, h) + index) | 0;
  return (((h >>> 0) % 1000) / 1000);
}

export function WaveformPlaceholder({ id, height = 40, anomaly = false }: Props) {
  const BAR_COUNT = 80;
  const bars: number[] = [];

  for (let i = 0; i < BAR_COUNT; i++) {
    let v = seededRand(id, i);
    if (anomaly) {
      // Irregular amplitude with sudden spikes
      const spike = seededRand(id + 'spike', i);
      v = spike > 0.82 ? Math.min(1, v * 2.4) : v * 0.6;
    } else {
      // Smooth envelope — quieter edges
      const env = Math.sin((i / BAR_COUNT) * Math.PI);
      v = v * env * 0.85 + 0.08;
    }
    bars.push(v);
  }

  const barW = 2;
  const gap = 1;
  const totalW = BAR_COUNT * (barW + gap) - gap;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${height}`}
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height }}
      aria-hidden="true"
    >
      {bars.map((v, i) => {
        const barH = Math.max(2, v * height);
        const x = i * (barW + gap);
        const y = (height - barH) / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            fill={anomaly ? '#ffb020' : '#a0a0a4'}
            opacity={anomaly ? 0.7 : 0.5}
          />
        );
      })}
    </svg>
  );
}
