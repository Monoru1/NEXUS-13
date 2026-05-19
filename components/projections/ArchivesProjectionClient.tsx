'use client';

import dynamic from 'next/dynamic';

const ArchivesProjection = dynamic(
  () => import('@/components/projections/ArchivesProjection').then((m) => ({ default: m.ArchivesProjection })),
  { ssr: false },
);

export function ArchivesProjectionClient() {
  return <ArchivesProjection />;
}
