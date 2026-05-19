import { create } from 'zustand';
import { parse, isParsedCommand } from '@/lib/terminal/parser';
import { dispatch } from '@/lib/terminal/commands';
import { nsGet, nsSet } from '@/lib/persistence/indexed-db';
import type { TerminalLine, TerminalOutput } from '@/lib/terminal/types';

const HISTORY_KEY = 'terminal-history';
const HISTORY_LIMIT = 100;

type TerminalState = {
  history: string[];
  output: TerminalLine[];
  historyCursor: number;
  hydrated: boolean;
};

type TerminalActions = {
  execute: (input: string) => Promise<TerminalOutput>;
  clear: () => void;
  cursorUp: () => void;
  cursorDown: () => void;
  _hydrate: () => Promise<void>;
};

export const useTerminalStore = create<TerminalState & TerminalActions>((set, get) => ({
  history: [],
  output: [],
  historyCursor: -1,
  hydrated: false,

  async execute(input: string): Promise<TerminalOutput> {
    const trimmed = input.trim();
    const echoLine: TerminalLine = { text: trimmed, isCommand: true };

    if (!trimmed) {
      set((s) => ({ output: [...s.output, echoLine], historyCursor: -1 }));
      return { lines: [] };
    }

    const parsed = parse(trimmed);
    const ctx = { clearance: 2, hour: new Date().getHours() };

    let result: TerminalOutput;
    if (!isParsedCommand(parsed)) {
      result = { lines: [{ text: parsed.error, tone: 'dim' }] };
    } else {
      result = await dispatch(parsed.cmd, parsed.args, parsed.flags, ctx);
    }

    const newHistory = [trimmed, ...get().history].slice(0, HISTORY_LIMIT);

    set((s) => ({
      history: newHistory,
      historyCursor: -1,
      output: result.effect === 'clear'
        ? []
        : [...s.output, echoLine, ...result.lines],
    }));

    await nsSet(HISTORY_KEY, newHistory);
    return result;
  },

  clear() {
    set({ output: [] });
  },

  cursorUp() {
    const { historyCursor, history } = get();
    if (history.length === 0) return;
    const next = Math.min(historyCursor + 1, history.length - 1);
    set({ historyCursor: next });
  },

  cursorDown() {
    const { historyCursor } = get();
    const next = Math.max(historyCursor - 1, -1);
    set({ historyCursor: next });
  },

  async _hydrate() {
    try {
      const saved = await nsGet<string[]>(HISTORY_KEY);
      if (saved && Array.isArray(saved)) {
        set({ history: saved.slice(0, HISTORY_LIMIT) });
      }
    } finally {
      set({ hydrated: true });
    }
  },
}));
