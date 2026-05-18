import type { Dossier } from '@/types/narrative';
import { ClassificationTag } from '@/components/primitives/ClassificationTag';
import { DataLine } from '@/components/primitives/DataLine';

type Props = {
  dossier: Dossier;
  clearance: number;
};

const STATUS_TONE = {
  OPEN: 'signal',
  CLOSED: 'dim',
  REDACTED: 'alert',
} as const;

const SUBJECT_STATUS_TONE = {
  ACTIVE: 'signal',
  DECEASED: 'dim',
  UNKNOWN: 'warn',
  REDACTED: 'alert',
} as const;

export function DossierHeader({ dossier, clearance }: Props) {
  const opened = new Date(dossier.opened).toISOString().split('T')[0] ?? dossier.opened;
  const subjectStatusTone = SUBJECT_STATUS_TONE[dossier.primarySubject.status];
  const statusTone = STATUS_TONE[dossier.status];

  return (
    <header className="border border-void-4 bg-void-1 mb-0">
      <div className="px-6 py-4 border-b border-void-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="text-mono text-[10px] tracking-system text-text-3">
            {dossier.code}
          </span>
          <h1 className="font-display text-3xl font-medium text-text-0 tracking-tight">
            {dossier.title}
          </h1>
          <ClassificationTag level={dossier.classification} />
          <ClassificationTag level={dossier.status} variant="status" />
        </div>

        <div className="flex items-center gap-3 text-mono text-[10px] tracking-system">
          <span className="text-text-3">CLEARANCE</span>
          <span className="text-signal tabular-nums text-lg">L-{clearance}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-void-4">
        <div className="px-6 py-4">
          <p className="text-mono text-[9px] tracking-system text-text-3 mb-3">
            FILE METADATA
          </p>
          <DataLine label="FILE CODE" value={dossier.code} />
          <DataLine label="OPENED" value={opened} />
          <DataLine
            label="STATUS"
            value={dossier.status}
            tone={statusTone}
          />
          <DataLine
            label="CLASSIFICATION"
            value={dossier.classification}
            tone={dossier.classification === 'TOP SECRET' ? 'alert' : 'warn'}
          />
          <DataLine
            label="EVIDENCE ITEMS"
            value={dossier.evidence.length}
          />
          <DataLine
            label="CONTRADICTIONS"
            value={dossier.contradictions.length}
            tone={dossier.contradictions.length > 0 ? 'warn' : 'dim'}
          />
        </div>

        <div className="px-6 py-4">
          <p className="text-mono text-[9px] tracking-system text-text-3 mb-3">
            PRIMARY SUBJECT
          </p>
          <DataLine
            label="CODENAME"
            value={dossier.primarySubject.codename}
            tone="signal"
          />
          <DataLine
            label="STATUS"
            value={dossier.primarySubject.status}
            tone={subjectStatusTone}
          />
          <div className="mt-3 pt-3 border-t border-void-4">
            <p className="text-[12px] text-text-2 leading-relaxed">
              {dossier.primarySubject.summary}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
