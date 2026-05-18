import type { Subject } from '@/types/narrative';
import { DataLine } from '@/components/primitives/DataLine';

type Props = {
  subject: Subject;
  variant?: 'primary' | 'related';
};

const STATUS_TONE = {
  ACTIVE: 'signal',
  DECEASED: 'dim',
  UNKNOWN: 'warn',
  REDACTED: 'alert',
} as const;

const STATUS_DOT = {
  ACTIVE: 'bg-signal',
  DECEASED: 'bg-text-3',
  UNKNOWN: 'bg-warn',
  REDACTED: 'bg-alert',
} as const;

export function SubjectCard({ subject, variant = 'related' }: Props) {
  const isPrimary = variant === 'primary';

  return (
    <article
      className={`
        border border-void-4 bg-void-1
        ${isPrimary ? 'border-void-5' : ''}
      `}
      aria-label={`Subject: ${subject.codename}`}
    >
      <div className="px-4 py-3 border-b border-void-4 flex items-center gap-3">
        {/* Photo placeholder */}
        <div
          className="w-10 h-10 bg-void-3 border border-void-5 flex items-center justify-center shrink-0"
          aria-hidden
        >
          <span className="text-mono text-[8px] tracking-system text-text-3">
            {subject.codename.slice(0, 2)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 ${STATUS_DOT[subject.status]} shrink-0`}
              aria-hidden
            />
            <h3 className="text-mono text-[11px] tracking-system text-text-0 truncate">
              {subject.codename}
            </h3>
          </div>
          {isPrimary && (
            <p className="text-mono text-[9px] tracking-system text-text-3 mt-0.5">
              PRIMARY SUBJECT
            </p>
          )}
        </div>
      </div>

      <div className="px-4 py-3">
        <DataLine
          label="STATUS"
          value={subject.status}
          tone={STATUS_TONE[subject.status]}
        />
        <p className="mt-3 text-[11px] text-text-2 leading-relaxed">
          {subject.summary}
        </p>
      </div>
    </article>
  );
}
