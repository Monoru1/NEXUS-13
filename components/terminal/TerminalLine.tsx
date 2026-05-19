import type { TerminalLine as TerminalLineType } from '@/lib/terminal/types';

type Props = {
  line: TerminalLineType;
};

const TONE_CLASS: Record<NonNullable<TerminalLineType['tone']>, string> = {
  ok:     'text-signal',
  warn:   'text-warn',
  alert:  'text-alert',
  cipher: 'text-cipher',
  dim:    'text-text-3',
  serif:  'text-text-1 text-serif-italic',
};

export function TerminalLine({ line }: Props) {
  const toneClass = line.tone ? TONE_CLASS[line.tone] : 'text-text-1';

  if (line.isCommand) {
    // User echo: nx-13:~$ <command>
    return (
      <div
        className="flex items-start gap-2 text-mono text-[13px] leading-[1.7]"
        style={{ animation: 'scan-reveal 120ms cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        <span className="text-signal shrink-0 select-none">nx-13:~$</span>
        <span className="text-text-2">{line.text}</span>
      </div>
    );
  }

  if (!line.text) {
    // Empty line — spacer
    return (
      <div
        className="h-[1.7em] text-mono text-[13px]"
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`text-mono text-[13px] leading-[1.7] ${toneClass}`}
      style={{ animation: 'scan-reveal 120ms cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      {!line.isCommand && !line.tone?.includes('serif') && (
        <span className="text-text-3 select-none">{'> '}</span>
      )}
      {line.text}
    </div>
  );
}
