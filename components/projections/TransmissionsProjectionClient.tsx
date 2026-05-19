'use client';

import dynamic from 'next/dynamic';

const TransmissionsProjection = dynamic(
  () => import('@/components/projections/TransmissionsProjection').then((m) => ({ default: m.TransmissionsProjection })),
  { ssr: false },
);

export function TransmissionsProjectionClient({
  transmissionCount,
  anomalousCount,
}: {
  transmissionCount?: number;
  anomalousCount?: number;
}) {
  return <TransmissionsProjection transmissionCount={transmissionCount} anomalousCount={anomalousCount} />;
}
