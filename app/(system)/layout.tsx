import { SystemDock } from '@/components/system/SystemDock';

/**
 * Layout for everything inside the "system" — i.e. after the user is past auth.
 * Adds the side dock for navigation between modules.
 */
export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-6 pb-6 flex">
      <SystemDock />
      <div className="flex-1 pl-16 pr-6">{children}</div>
    </div>
  );
}
