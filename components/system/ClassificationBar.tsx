'use client';

import { useEffect, useState } from 'react';

type Props = {
  position: 'top' | 'bottom';
};

/**
 * Classification banner — appears at top and bottom of every page.
 * This is the single strongest "this is real" signal in the entire site.
 * Real classified systems mandate visible classification at all times.
 */
export function ClassificationBar({ position }: Props) {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((h) => (h + 1) % 360);
    }, 11_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="banner"
      aria-label={`Classification banner ${position}`}
      className={`
        fixed left-0 right-0 z-50
        flex items-center justify-between
        h-6 px-4
        text-[10px] tracking-system text-mono
        bg-void-0 border-warn/60
        ${position === 'top' ? 'top-0 border-b' : 'bottom-0 border-t'}
      `}
      style={{
        color: `hsl(${40 + (hue % 4)}, 100%, 56%)`,
      }}
    >
      <span className="select-none">NEXUS//SECRET // NOFORN</span>

      <span className="select-none flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 bg-current pulse-signal" />
        HANDLE VIA NEXUS CHANNELS ONLY
      </span>

      <span className="select-none">
        {position === 'top' ? 'CTRL-13.4' : 'PAGE 01 OF 01'}
      </span>
    </div>
  );
}
