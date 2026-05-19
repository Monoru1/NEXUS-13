import { SystemDock } from '@/components/system/SystemDock';
import { KonamiCode } from '@/components/effects/KonamiCode';
import { CursorTrace } from '@/components/effects/CursorTrace';

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-6 pb-6 flex">
      <SystemDock />
      <div className="flex-1 pl-16 pr-6">{children}</div>
      <KonamiCode />
      <CursorTrace />
    </div>
  );
}
