'use client';

import { useState } from 'react';
import type { Contradiction } from '@/types/narrative';

type Props = {
  contradiction: Contradiction;
  onFlag?: (id: string) => void;
  flagged?: boolean;
};

export function ContradictionMarker({ contradiction, onFlag, flagged = false }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((v) => !v);
    if (!flagged && onFlag) onFlag(contradiction.id);
  };

  return (
    <div className="my-1 flex flex-col items-start">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={`Contradiction flagged — ${contradiction.id}. Click to expand.`}
        className="
          flex items-center gap-2
          text-mono text-[10px] tracking-system text-warn
          hover:text-text-0 transition-colors duration-120
          focus-visible:outline focus-visible:outline-1 focus-visible:outline-signal
          px-2 py-1 border border-warn/40 hover:border-warn
          bg-void-1
        "
      >
        <span className="text-warn" aria-hidden>▲</span>
        <span>CONTRADICTION FLAGGED</span>
        {flagged && (
          <span className="text-signal ml-1" aria-label="reviewed">✓</span>
        )}
        <span className="ml-2 text-text-3">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div
          className="
            mt-1 px-4 py-3
            border border-warn/30 border-l-2 border-l-warn
            bg-void-2 max-w-lg
          "
          role="note"
          aria-label="Contradiction detail"
        >
          <p className="text-[12px] text-text-1 leading-relaxed">
            {contradiction.note}
          </p>
          <p className="mt-2 text-mono text-[9px] tracking-system text-text-3">
            REF: {contradiction.between[0]} · {contradiction.between[1]}
          </p>
        </div>
      )}
    </div>
  );
}
