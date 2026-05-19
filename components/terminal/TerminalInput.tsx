'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTerminalStore } from '@/lib/store/terminal';
import { DOCUMENTED_COMMANDS } from '@/lib/terminal/commands';
import type { TerminalOutput } from '@/lib/terminal/types';

type Props = {
  onOutput: (result: TerminalOutput) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export function TerminalInput({ onOutput, containerRef }: Props) {
  const [value, setValue] = useState('');
  const [savedDraft, setSavedDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { execute, cursorUp, cursorDown, history, historyCursor } = useTerminalStore();

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Click anywhere in the terminal container to refocus
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const refocus = (e: MouseEvent) => {
      if (e.target !== inputRef.current) {
        inputRef.current?.focus();
      }
    };
    container.addEventListener('click', refocus);
    return () => container.removeEventListener('click', refocus);
  }, [containerRef]);

  // Sync input value when historyCursor changes
  useEffect(() => {
    if (historyCursor === -1) {
      setValue(savedDraft);
    } else {
      const entry = history[historyCursor];
      if (entry !== undefined) setValue(entry);
    }
  }, [historyCursor, history, savedDraft]);

  const handleSubmit = useCallback(async () => {
    const trimmed = value.trim();
    setValue('');
    setSavedDraft('');
    const result = await execute(trimmed || '');
    onOutput(result);
  }, [value, execute, onOutput]);

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        await handleSubmit();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyCursor === -1) setSavedDraft(value);
        cursorUp();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        cursorDown();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        handleTabComplete();
        return;
      }

      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        // Append ^C line and clear input
        await execute('^C');
        setValue('');
        setSavedDraft('');
        return;
      }

      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        useTerminalStore.getState().clear();
        return;
      }
    },
    [historyCursor, value, cursorUp, cursorDown, handleSubmit, execute],
  );

  const handleTabComplete = useCallback(() => {
    const parts = value.split(' ');
    const prefix = parts[0]?.toLowerCase() ?? '';

    // Only complete the first token (command name)
    if (parts.length > 1) return;

    const matches = DOCUMENTED_COMMANDS.filter((cmd) =>
      cmd.startsWith(prefix) && prefix.length > 0,
    );

    if (matches.length === 0) return;

    if (matches.length === 1) {
      setValue(matches[0] + ' ');
      return;
    }

    // Multiple matches — display inline as dim completion hint
    // We do this by executing a synthetic output (won't go into history)
    const matchLine = matches.join('  ');
    useTerminalStore.setState((s) => ({
      output: [
        ...s.output,
        { text: matchLine, tone: 'dim' as const },
      ],
    }));
  }, [value]);

  return (
    <div className="flex items-center gap-2 px-4 py-3 border-t border-void-4 bg-void-1 shrink-0">
      <span
        className="text-mono text-[13px] text-signal shrink-0 select-none"
        aria-hidden
      >
        nx-13:~$
      </span>

      <div className="flex-1 relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSavedDraft(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="terminal command input"
          className="
            w-full bg-transparent
            text-mono text-[13px] text-text-0
            outline-none caret-transparent
            selection:bg-signal selection:text-void-0
          "
        />
        {/* Block cursor after text content */}
        <span
          className="text-mono text-[13px] text-signal pulse-signal ml-px select-none pointer-events-none"
          aria-hidden
        >
          █
        </span>
      </div>
    </div>
  );
}
