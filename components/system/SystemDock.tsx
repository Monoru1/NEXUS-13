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

export function SystemDock() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <nav
        aria-label="System navigation"
        className="
          hidden lg:flex
          fixed left-0 top-6 bottom-6 z-30
          w-12 flex-col items-stretch
          bg-void-1 border-r border-void-4
        "
      >
        {MODULES.map((mod) => {
          const active = pathname === mod.href || pathname.startsWith(mod.href + '/');
          return (
            <Link
              key={mod.href}
              href={mod.href}
              aria-current={active ? 'page' : undefined}
              aria-label={`${mod.label} module${active ? ' (current)' : ''}`}
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
              <span aria-hidden>{mod.code}</span>
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

      {/* Mobile: fixed bottom navigation bar */}
      <nav
        aria-label="System navigation"
        className="
          lg:hidden
          fixed bottom-0 left-0 right-0 z-50
          flex items-stretch
          bg-void-1 border-t border-void-4
          h-14
        "
      >
        {MODULES.map((mod) => {
          const active = pathname === mod.href || pathname.startsWith(mod.href + '/');
          return (
            <Link
              key={mod.href}
              href={mod.href}
              aria-current={active ? 'page' : undefined}
              aria-label={mod.label}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-0.5
                text-mono tracking-system
                border-r border-void-4 last:border-r-0
                transition-colors duration-150
                ${active
                  ? 'bg-void-2 text-signal'
                  : 'text-text-3 hover:text-text-1 hover:bg-void-2'
                }
              `}
            >
              {active && (
                <span className="absolute top-0 left-0 right-0 h-px bg-signal" aria-hidden />
              )}
              <span aria-hidden className="text-[11px] font-medium leading-none">{mod.code}</span>
              <span aria-hidden className="text-[7px] leading-none opacity-60">{mod.label.slice(0, 4)}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
