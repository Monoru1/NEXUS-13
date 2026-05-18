import { BootSequence } from '@/components/system/BootSequence';

/**
 * Root page = the entry point.
 * The user lands here from a URL they "shouldn't have".
 * Boot sequence runs, then access prompt asks for credentials they don't have.
 * Whatever they type, the system processes it and lets them in — but logs it.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen pt-6 pb-6 flex items-center justify-center">
      <BootSequence />
    </div>
  );
}
