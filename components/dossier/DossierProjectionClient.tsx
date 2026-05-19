'use client';

import dynamic from 'next/dynamic';
import type { Dossier } from '@/types/narrative';

const DossierProjection = dynamic(
  () => import('@/components/dossier/DossierProjection').then((m) => ({ default: m.DossierProjection })),
  { ssr: false },
);

export function DossierProjectionClient({ dossier }: { dossier: Dossier }) {
  return <DossierProjection dossier={dossier} />;
}
