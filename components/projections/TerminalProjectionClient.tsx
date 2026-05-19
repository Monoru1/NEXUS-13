'use client';

import dynamic from 'next/dynamic';

const TerminalProjection = dynamic(
  () => import('@/components/projections/TerminalProjection').then((m) => ({ default: m.TerminalProjection })),
  { ssr: false },
);

export function TerminalProjectionClient() {
  return <TerminalProjection />;
}
