type Props = {
  label: string;
  value: React.ReactNode;
  tone?: 'default' | 'signal' | 'warn' | 'alert' | 'cipher' | 'dim';
  className?: string;
};

const VALUE_TONE: Record<NonNullable<Props['tone']>, string> = {
  default: 'text-text-1',
  signal: 'text-signal',
  warn: 'text-warn',
  alert: 'text-alert',
  cipher: 'text-cipher',
  dim: 'text-text-3',
};

export function DataLine({ label, value, tone = 'default', className = '' }: Props) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-1.5 border-b border-void-4 last:border-0 ${className}`}>
      <span className="text-mono text-[10px] tracking-system text-text-3 shrink-0">
        {label}
      </span>
      <span className="flex items-center gap-1.5 min-w-0">
        <span className="text-text-3 text-mono text-[10px]" aria-hidden>·</span>
        <span className={`text-mono text-[11px] tabular-nums truncate ${VALUE_TONE[tone]}`}>
          {value}
        </span>
      </span>
    </div>
  );
}
