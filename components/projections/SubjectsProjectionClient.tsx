'use client';

import dynamic from 'next/dynamic';

const SubjectsProjection = dynamic(
  () => import('@/components/projections/SubjectsProjection').then((m) => ({ default: m.SubjectsProjection })),
  { ssr: false },
);

export function SubjectsProjectionClient({ subjectCount }: { subjectCount?: number }) {
  return <SubjectsProjection subjectCount={subjectCount} />;
}
