import { ScanReveal } from '@/components/primitives/ScanReveal';

export const metadata = {
  title: 'MANIFEST',
  robots: { index: false, follow: false },
};

const ENTRIES = [
  { id: 'NX-ASSET-001', codename: 'ARIADNE', status: 'ACTIVE', clearance: 2, note: 'Identity unresolved. Declared deceased 2019. Sightings continue.' },
  { id: 'NX-ASSET-002', codename: 'VESPER-PRIME', status: 'UNKNOWN', clearance: 3, note: 'Non-terrestrial transmission origin. Investigation ongoing.' },
  { id: 'NX-ASSET-003', codename: 'KAIROS', status: 'REDACTED', clearance: 4, note: '[REDACTED BY DIRECTIVE 13.4-CTRL]' },
  { id: 'NX-ASSET-004', codename: 'MERIDIAN', status: 'ACTIVE', clearance: 2, note: 'Case closure disputed. Reopening not logged in official system.' },
  { id: 'NX-ASSET-005', codename: 'LOOM', status: 'ACTIVE', clearance: 1, note: 'Field operative. Dossier N13-001 primary handler.' },
  { id: 'NX-ASSET-006', codename: 'CTRL-PRIME', status: 'REDACTED', clearance: 7, note: '[ACCESS DENIED // CLEARANCE L-7 REQUIRED]' },
];

export default function ManifestPage() {
  return (
    <div className="py-10 max-w-4xl">
      <ScanReveal>
        <nav className="mb-6 text-mono text-[10px] tracking-system text-text-3">
          <span>AR-CTRL</span>
          <span className="mx-2 text-void-5">·</span>
          <span className="text-text-1">MANIFEST</span>
        </nav>
      </ScanReveal>

      <ScanReveal delay={80}>
        <div className="border border-alert/30 bg-void-1 p-4 mb-8">
          <p className="text-mono text-[9px] tracking-system text-alert mb-1">
            RESTRICTED ACCESS — NOT INDEXED
          </p>
          <p className="text-mono text-[9px] text-text-3">
            This page does not appear in the navigation. Access implies prior knowledge of its existence.
            Session reference logged under directive 13.4-CTRL.
          </p>
        </div>
      </ScanReveal>

      <ScanReveal delay={160}>
        <h1 className="text-mono text-[11px] tracking-system text-text-2 mb-6">
          NEXUS//13 — ASSET MANIFEST // PARTIAL DISCLOSURE
        </h1>
      </ScanReveal>

      <div className="border border-void-4">
        <div className="grid grid-cols-12 px-4 py-2 border-b border-void-4 bg-void-1">
          <span className="col-span-2 text-mono text-[9px] tracking-system text-text-3">ASSET ID</span>
          <span className="col-span-2 text-mono text-[9px] tracking-system text-text-3">CODENAME</span>
          <span className="col-span-1 text-mono text-[9px] tracking-system text-text-3">STATUS</span>
          <span className="col-span-1 text-mono text-[9px] tracking-system text-text-3">CLR</span>
          <span className="col-span-6 text-mono text-[9px] tracking-system text-text-3">NOTE</span>
        </div>

        {ENTRIES.map((entry, i) => (
          <ScanReveal key={entry.id} delay={200 + i * 60}>
            <div className="grid grid-cols-12 px-4 py-3 border-b border-void-4/50 hover:bg-void-2/30 transition-colors">
              <span className="col-span-2 text-mono text-[10px] text-text-3 tabular-nums">{entry.id}</span>
              <span className="col-span-2 text-mono text-[10px] text-text-1 font-medium">{entry.codename}</span>
              <span
                className={`col-span-1 text-mono text-[9px] tabular-nums ${
                  entry.status === 'ACTIVE' ? 'text-signal' :
                  entry.status === 'UNKNOWN' ? 'text-cipher' :
                  entry.status === 'REDACTED' ? 'text-text-3' : 'text-warn'
                }`}
              >
                {entry.status}
              </span>
              <span className="col-span-1 text-mono text-[10px] text-text-3 tabular-nums">L-{entry.clearance}</span>
              <span className="col-span-6 text-mono text-[9px] text-text-2 leading-[1.6]">{entry.note}</span>
            </div>
          </ScanReveal>
        ))}
      </div>

      <ScanReveal delay={700}>
        <div className="mt-8 border border-void-4 bg-void-1 p-4">
          <p className="text-mono text-[9px] tracking-system text-text-3 mb-2">MANIFEST STATUS</p>
          <p className="text-mono text-[9px] text-text-3">
            ENTRIES SHOWN: {ENTRIES.length} of [REDACTED] total assets.
            Full manifest requires clearance L-5 and above.
            Partial disclosure authorised under directive 13.4-CTRL for observer monitoring purposes.
          </p>
        </div>
      </ScanReveal>
    </div>
  );
}
