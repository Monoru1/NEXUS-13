'use client';

import { useState, useCallback } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function RedactedText({ children, className = '' }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [glitching, setGlitching] = useState(false);

  const handleReveal = useCallback(() => {
    setGlitching(true);
    setTimeout(() => {
      setGlitching(false);
      setRevealed(true);
    }, 320);
  }, []);

  return (
    <span className={`relative inline-block group ${className}`}>
      <span
        className={`transition-opacity duration-200 ${
          revealed ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'
        }`}
        aria-hidden={!revealed}
      >
        {children}
      </span>

      {!revealed && (
        <span
          className={`
            absolute inset-0 cursor-pointer
            border border-void-5
            transition-all duration-120
            group-hover:border-void-4 group-hover:brightness-125
            ${glitching ? 'bg-alert/20 animate-pulse' : 'bg-redacted'}
          `}
          aria-label="REDACTED — click to attempt access"
          role="button"
          tabIndex={0}
          onClick={handleReveal}
          onKeyDown={(e) => e.key === 'Enter' && handleReveal()}
        />
      )}

      {!revealed && (
        <span
          className="
            absolute bottom-full left-0 mb-1.5
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
