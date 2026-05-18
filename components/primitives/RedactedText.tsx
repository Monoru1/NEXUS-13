'use client';

import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function RedactedText({ children, className = '' }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span className={`relative inline-block group ${className}`}>
      <span
        className={`
          transition-opacity duration-200
          ${revealed ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}
        `}
        aria-hidden={!revealed}
      >
        {children}
      </span>

      {!revealed && (
        <span
          className="
            absolute inset-0
            bg-redacted border border-void-5
            cursor-pointer
          "
          aria-label="REDACTED — click to reveal restriction notice"
          role="button"
          tabIndex={0}
          onClick={() => setRevealed(true)}
          onKeyDown={(e) => e.key === 'Enter' && setRevealed(true)}
        />
      )}

      {!revealed && (
        <span
          className="
            absolute bottom-full left-0 mb-1
            px-2 py-1
            bg-void-3 border border-void-5
            text-mono text-[9px] tracking-system text-alert
            opacity-0 group-hover:opacity-100
            transition-opacity duration-120
            pointer-events-none whitespace-nowrap
            z-10
          "
          role="tooltip"
        >
          REDACTED // 13.4-CTRL
        </span>
      )}
    </span>
  );
}
