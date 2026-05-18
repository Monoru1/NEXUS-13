type Variant = 'classification' | 'status';

type Props = {
  level: string;
  variant?: Variant;
};

const CLASSIFICATION_STYLES: Record<string, string> = {
  'UNCLASSIFIED': 'border-text-3 text-text-3',
  'CONFIDENTIAL': 'border-cipher text-cipher',
  'SECRET': 'border-warn text-warn',
  'TOP SECRET': 'border-alert text-alert',
  'OPEN': 'border-signal text-signal',
  'CLOSED': 'border-text-3 text-text-3',
  'REDACTED': 'border-alert text-alert bg-redacted',
};

/**
 * Inline classification badge.
 * Used in dossier headers, list rows, evidence panels.
 */
export function ClassificationTag({ level, variant = 'classification' }: Props) {
  const cls = CLASSIFICATION_STYLES[level] ?? 'border-text-3 text-text-3';

  return (
    <span
      className={`
        inline-flex items-center
        px-1.5 py-0.5
        border text-mono text-[9px] tracking-system
        ${cls}
      `}
      data-variant={variant}
    >
      {level}
    </span>
  );
}
