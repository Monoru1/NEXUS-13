'use client';

import dynamic from 'next/dynamic';

const NexusProjection = dynamic(
  () => import('@/components/projections/NexusProjection').then((m) => ({ default: m.NexusProjection })),
  { ssr: false },
);

export function NexusProjectionClient() {
  return <NexusProjection />;
}
