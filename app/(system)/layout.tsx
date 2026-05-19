import { SystemDock } from '@/components/system/SystemDock';
import { KonamiCode } from '@/components/effects/KonamiCode';
import { CursorTrace } from '@/components/effects/CursorTrace';

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-4 pb-20 lg:pt-6 lg:pb-6 flex">
      <SystemDock />
      {/* pl-0 on mobile (no left dock), pl-16 on desktop (dock = 48px + gap) */}
      <div className="flex-1 pl-2 pr-2 sm:pl-4 sm:pr-4 lg:pl-16 lg:pr-6 min-w-0">
        {children}
      </div>
      <KonamiCode />
      <CursorTrace />
    </div>
  );
}
