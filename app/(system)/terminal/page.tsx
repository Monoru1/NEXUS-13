'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const TerminalProjection = dynamic(
  () => import('@/components/projections/TerminalProjection').then((m) => ({ default: m.TerminalProjection })),
  { ssr: false },
);
import { useTerminalStore } from '@/lib/store/terminal';
import { TerminalLine } from '@/components/terminal/TerminalLine';
import { TerminalInput } from '@/components/terminal/TerminalInput';
import type { TerminalOutput } from '@/lib/terminal/types';

const BOOT_LINES = [
  { text: 'nx-shell v4.1.2', tone: 'dim' as const },
  { text: "type 'help' for documented commands.", tone: 'dim' as const },
  { text: 'some commands are not documented.', tone: 'serif' as const },
];

export default function TerminalPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [glitching, setGlitching] = useState(false);

  const { output, _hydrate, hydrated } = useTerminalStore();

  // Hydrate history from IndexedDB once
  useEffect(() => {
    _hydrate();
  }, [_hydrate]);

  // Seed boot lines into store output on first mount
  useEffect(() => {
    useTerminalStore.setState({ output: BOOT_LINES });
  }, []);

  // Scroll output to bottom whenever it changes
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [output]);

  const handleOutput = useCallback(
    (result: TerminalOutput) => {
      if (result.effect === 'hard-glitch') {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 240);
      }
      if (result.effect === 'route' && result.routeTo) {
        setTimeout(() => router.push(result.routeTo!), 400);
      }
    },
    [router],
  );

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 3rem)' }}>
      {/* 3D Projection banner */}
      <div className="shrink-0 border border-void-4 border-b-0">
        <TerminalProjection />
      </div>

      {/* Terminal shell */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col bg-void-1 border border-void-4 cursor-text min-h-0"
      >
      {/* Header */}
      <div className="shrink-0 px-4 py-2 border-b border-void-4 flex items-center justify-between bg-void-0">
        <span className="text-mono text-[10px] tracking-system text-text-3">
          TR · TERMINAL · 13.4
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-signal pulse-signal" aria-hidden />
          <span className="text-mono text-[10px] tracking-system text-signal">
            ACTIVE
          </span>
        </div>
      </div>

      {/* Output zone */}
      <div
        ref={outputRef}
        className={`flex-1 overflow-y-auto px-4 py-4 space-y-0 ${glitching ? 'hard-glitch' : ''}`}
        aria-live="polite"
        aria-label="Terminal output"
        role="log"
      >
        {output.map((line, i) => (
          <TerminalLine key={i} line={line} />
        ))}

        {/* Spacer so content doesn't press against input */}
        <div className="h-2" aria-hidden />
      </div>

      {/* Input — fixed at bottom of flex container */}
      {hydrated && (
        <TerminalInput
          onOutput={handleOutput}
          containerRef={containerRef}
        />
      )}
      {!hydrated && (
        <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-t border-void-4 bg-void-1">
          <span className="text-mono text-[13px] text-signal">nx-13:~$</span>
          <span className="text-mono text-[13px] text-text-3 pulse-signal">█</span>
        </div>
      )}
      </div>
    </div>
  );
}
