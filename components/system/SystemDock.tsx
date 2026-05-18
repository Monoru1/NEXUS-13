'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MODULES = [
  { href: '/nexus', code: 'NX', label: 'OVERVIEW' },
  { href: '/archives', code: 'AR', label: 'ARCHIVES' },
  { href: '/subjects', code: 'SB', label: 'SUBJECTS' },
  { href: '/nexus-graph', code: 'GR', label: 'GRAPH' },
  { href: '/terminal', code: 'TR', label: 'TERMINAL' },
  { href: '/transmissions', code: 'TX', label: 'INTERCEPTS' },
] as const;

/**
 * Left-side persistent navigation.
 * Looks like a hardware dock — fixed glyphs, not a sidebar with words.
 */
export function SystemDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="System navigation"
      className="
        fixed left-0 top-6 bottom-6 z-30
        w-12 flex flex-col items-stretch
        bg-void-1 border-r border-void-4
      "
    >
      {MODULES.map((mod) => {
        const active = pathname === mod.href || pathname.startsWith(mod.href + '/');
        return (
          <Link
            key={mod.href}
            href={mod.href}
            className={`
              group relative flex items-center justify-center
              h-12 border-b border-void-4
              text-mono text-[10px] tracking-system
              transition-colors duration-150
              ${active
                ? 'bg-void-2 text-signal'
                : 'text-text-2 hover:text-text-0 hover:bg-void-2'
              }
            `}
          >
            <span aria-hidden="true">{mod.code}</span>

            {active && (
              <span className="absolute left-0 top-0 bottom-0 w-px bg-signal" />
            )}

            <span
              className="
                absolute left-full ml-2 px-2 py-1
                bg-void-2 border border-void-4
                text-[10px] tracking-system text-text-1
                opacity-0 pointer-events-none
                group-hover:opacity-100
                transition-opacity duration-150
                whitespace-nowrap z-10
              "
            >
              {mod.label}
            </span>
          </Link>
        );
      })}

      <div className="flex-1" />
      <div className="h-12 flex items-center justify-center border-t border-void-4 text-mono text-[9px] text-text-3">
        13.4
      </div>
    </nav>
  );
}
