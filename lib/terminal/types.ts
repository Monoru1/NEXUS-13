export type TerminalLine = {
  text: string;
  tone?: 'ok' | 'warn' | 'alert' | 'cipher' | 'dim' | 'serif';
  isCommand?: boolean; // user echo — prefixed with prompt
};

export type TerminalOutput = {
  lines: TerminalLine[];
  effect?: 'clear' | 'hard-glitch' | 'route';
  routeTo?: string;
};

export type TerminalContext = {
  clearance: number;
  hour: number; // 0-23 local
};

export type CommandHandler = (
  args: string[],
  flags: Record<string, string | boolean>,
  ctx: TerminalContext,
) => Promise<TerminalOutput>;
