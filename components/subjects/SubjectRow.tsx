import Link from 'next/link';
import type { SubjectRecord } from '@/types/subject';

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#c5ff3c',
  DECEASED: '#56565a',
  UNKNOWN: '#ff3636',
  REDACTED: '#ff3636',
};

type Props = {
  subject: SubjectRecord;
};

export function SubjectRow({ subject }: Props) {
  const color = STATUS_COLOR[subject.status] ?? '#a0a0a4';
  const dateShort = subject.firstObserved.slice(0, 10);

  return (
    <Link
      href={`/subjects/${subject.id}`}
      className="group flex items-center gap-4 px-6 py-3 transition-colors duration-150"
      style={{ fontFamily: 'var(--font-mono, monospace)' }}
    >
      {/* Codename */}
      <span
        className="w-36 text-xs tracking-widest uppercase shrink-0 group-hover:text-signal transition-colors duration-150"
        style={{ color }}
      >
        {subject.codename}
      </span>

      {/* Status badge */}
      <span
        className="w-24 text-xs tracking-wide shrink-0"
        style={{ color, fontSize: '10px', letterSpacing: '0.12em' }}
      >
        {subject.status}
      </span>

      {/* First observed */}
      <span className="w-32 text-xs shrink-0" style={{ color: '#56565a' }}>
        {dateShort}
      </span>

      {/* Dossier count */}
      <span className="flex-1 text-xs" style={{ color: '#56565a' }}>
        {subject.relatedDossiers.length === 1
          ? `${subject.relatedDossiers.length} dossier`
          : `${subject.relatedDossiers.length} dossiers`}
      </span>

      {/* Arrow */}
      <span
        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
        style={{ color: '#a0a0a4' }}
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}
