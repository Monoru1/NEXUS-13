export type ParsedCommand = {
  cmd: string;
  args: string[];
  flags: Record<string, string | boolean>;
};

export type ParseResult = ParsedCommand | { error: string };

export function isParsedCommand(r: ParseResult): r is ParsedCommand {
  return 'cmd' in r;
}

export function parse(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) return { error: 'empty' };

  if (trimmed.includes('|')) {
    return { error: 'pipes are not supported in this shell.' };
  }

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return { error: 'empty' };

  const [first, ...rest] = tokens;
  if (!first) return { error: 'empty' };

  const cmd = first.toLowerCase();
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (const token of rest) {
    if (token.startsWith('--')) {
      const eqIdx = token.indexOf('=');
      if (eqIdx > 2) {
        flags[token.slice(2, eqIdx)] = token.slice(eqIdx + 1);
      } else {
        flags[token.slice(2)] = true;
      }
    } else if (/^-[a-zA-Z]$/.test(token)) {
      flags[token.slice(1)] = true;
    } else {
      args.push(token);
    }
  }

  return { cmd, args, flags };
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inQuote: '"' | "'" | null = null;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === undefined) continue;

    if (inQuote !== null) {
      if (ch === inQuote) {
        inQuote = null;
      } else {
        current += ch;
      }
    } else if (ch === '"' || ch === "'") {
      inQuote = ch;
    } else if (ch === ' ' || ch === '\t') {
      if (current) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += ch;
    }
  }

  if (current) tokens.push(current);
  return tokens;
}
