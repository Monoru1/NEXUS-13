'use client';

import { useEffect, useState } from 'react';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function KonamiCode() {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      const expected = SEQUENCE[progress];

      if (key === expected) {
        const next = progress + 1;
        setProgress(next);
        if (next === SEQUENCE.length) {
          setUnlocked(true);
          setVisible(true);
          setProgress(0);
          setTimeout(() => setVisible(false), 8000);
        }
      } else {
        setProgress(key === SEQUENCE[0] ? 1 : 0);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      aria-live="polite"
      aria-label="Hidden subject unlocked"
    >
      <div className="pointer-events-auto border border-signal bg-void-0 p-8 max-w-sm w-full mx-4 shadow-[0_0_40px_rgba(197,255,60,0.15)]">
        <p className="text-mono text-[9px] tracking-system text-signal mb-4">
          OVERRIDE SEQUENCE ACCEPTED
        </p>
        <p className="text-mono text-[20px] font-semibold text-text-1 mb-2">
          CTRL-PRIME
        </p>
        <p className="text-mono text-[9px] tracking-system text-warn mb-4">
          CLEARANCE L-7 // NOT FOR DISCLOSURE
        </p>
        <p className="text-serif-italic text-[13px] text-text-2 leading-relaxed mb-6">
          &ldquo;This subject does not appear in the manifest.
          The manifest does not contain everything.
          You were not supposed to know that.&rdquo;
        </p>
        <div className="space-y-1">
          <div className="flex justify-between text-mono text-[9px]">
            <span className="text-text-3">IDENTITY</span>
            <span className="text-alert">[REDACTED // 13.4-CTRL]</span>
          </div>
          <div className="flex justify-between text-mono text-[9px]">
            <span className="text-text-3">STATUS</span>
            <span className="text-text-3">UNRESOLVABLE</span>
          </div>
          <div className="flex justify-between text-mono text-[9px]">
            <span className="text-text-3">CLEARANCE</span>
            <span className="text-signal">L-7 // ARCHITECT</span>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="mt-6 w-full text-mono text-[9px] tracking-system text-text-3 border border-void-4 py-2 hover:border-text-3 transition-colors pointer-events-auto"
        >
          DISMISS // RECORD CLEARED
        </button>
      </div>
    </div>
  );
}
