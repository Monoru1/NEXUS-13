import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubjectById, getAllSubjects } from '@/lib/subjects/query';
import { RedactedText } from '@/components/primitives/RedactedText';
import { ClassificationTag } from '@/components/primitives/ClassificationTag';

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#c5ff3c',
  DECEASED: '#56565a',
  UNKNOWN: '#ff3636',
  REDACTED: '#ff3636',
};

const DOSSIER_TITLES: Record<string, { title: string; code: string }> = {
  'n13-001-ariadne': { title: 'ARIADNE', code: 'N13-001' },
  'n13-002-vesper': { title: 'VESPER', code: 'N13-002' },
  'n13-003-kairos': { title: 'KAIROS', code: 'N13-003' },
  'n13-004-meridian': { title: 'MERIDIAN', code: 'N13-004' },
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SubjectDetailPage({ params }: Props) {
  const { id } = await params;
  const subject = getSubjectById(id);
  if (!subject) notFound();

  const allSubjects = getAllSubjects();
  const associations = allSubjects.filter(
    (s) =>
      s.id !== subject.id &&
      s.relatedDossiers.some((d) => subject.relatedDossiers.includes(d)),
  );

  const color = STATUS_COLOR[subject.status] ?? '#a0a0a4';
  const isRedacted = subject.status === 'REDACTED';

  return (
    <div
      className="min-h-screen"
      style={{ background: '#060607', fontFamily: 'var(--font-mono, monospace)' }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-6 py-5 border-b"
        style={{ borderColor: '#2e2e35' }}
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1
              className="text-2xl tracking-widest uppercase"
              style={{ color, letterSpacing: '0.2em' }}
            >
              {subject.codename}
            </h1>
            <span
              className="text-xs px-2 py-0.5 border tracking-widest"
              style={{ color, borderColor: color, fontSize: '10px' }}
            >
              {subject.status}
            </span>
          </div>
          {subject.aliases && subject.aliases.length > 0 && (
            <p className="text-xs" style={{ color: '#56565a' }}>
              A.K.A.{' '}
              {subject.aliases.map((a, i) => (
                <span key={a}>
                  {i > 0 && ' · '}
                  {a.startsWith('[REDACTED]') ? (
                    <span style={{ color: '#2e2e35' }}>[REDACTED]</span>
                  ) : (
                    a
                  )}
                </span>
              ))}
            </p>
          )}
        </div>
        <span className="text-xs" style={{ color: '#56565a' }}>
          SB · SUBJECTS · 13.4
        </span>
      </div>

      <div className="flex gap-0">
        {/* Left column */}
        <div className="flex-1 border-r px-6 py-6" style={{ borderColor: '#2e2e35' }}>
          {/* Summary */}
          <div className="mb-8">
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: '#56565a', fontSize: '10px' }}
            >
              SUMMARY
            </p>
            {isRedacted ? (
              <RedactedText><span className="text-sm italic" style={{ fontFamily: 'var(--font-serif, serif)', color: '#a0a0a4' }}>{subject.summary}</span></RedactedText>
            ) : (
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: '#a0a0a4', fontFamily: 'var(--font-serif, serif)' }}
              >
                {subject.summary}
              </p>
            )}
          </div>

          {/* Observed in */}
          <div className="mb-8">
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: '#56565a', fontSize: '10px' }}
            >
              OBSERVED IN
            </p>
            <div className="space-y-2">
              {subject.relatedDossiers.map((slug) => {
                const meta = DOSSIER_TITLES[slug];
                if (!meta) return null;
                return (
                  <Link
                    key={slug}
                    href={`/archives/${slug}`}
                    className="flex items-center justify-between px-4 py-3 border transition-colors duration-150 hover:border-text-3 group"
                    style={{ borderColor: '#2e2e35' }}
                  >
                    <div>
                      <span
                        className="text-xs tracking-widest mr-3"
                        style={{ color: '#56565a', fontSize: '10px' }}
                      >
                        {meta.code}
                      </span>
                      <span
                        className="text-xs tracking-widest uppercase group-hover:text-white transition-colors duration-150"
                        style={{ color: '#a0a0a4' }}
                      >
                        {meta.title}
                      </span>
                    </div>
                    <span style={{ color: '#2e2e35' }} className="group-hover:text-text-3 transition-colors duration-150">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Associations */}
          {associations.length > 0 && (
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: '#56565a', fontSize: '10px' }}
              >
                ASSOCIATIONS · {associations.length}
              </p>
              <div className="space-y-1">
                {associations.map((a) => (
                  <Link
                    key={a.id}
                    href={`/subjects/${a.id}`}
                    className="flex items-center gap-3 py-1.5 group"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: STATUS_COLOR[a.status] ?? '#a0a0a4' }}
                    />
                    <span
                      className="text-xs tracking-widest uppercase group-hover:text-white transition-colors duration-150"
                      style={{ color: STATUS_COLOR[a.status] ?? '#a0a0a4', fontSize: '11px' }}
                    >
                      {a.codename}
                    </span>
                    <span className="text-xs" style={{ color: '#56565a', fontSize: '10px' }}>
                      {a.status}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column — audit log */}
        <aside className="w-64 shrink-0 px-6 py-6">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: '#56565a', fontSize: '10px' }}
          >
            AUDIT LOG
          </p>
          <div className="space-y-3">
            <div className="text-xs" style={{ color: '#56565a' }}>
              <span style={{ color: '#2e2e35' }}>FIRST OBSERVED</span>
              <br />
              {subject.firstObserved}
            </div>
            <div className="text-xs" style={{ color: '#56565a' }}>
              <span style={{ color: '#2e2e35' }}>STATUS</span>
              <br />
              <span style={{ color }}>{subject.status}</span>
            </div>
            <div className="text-xs" style={{ color: '#56565a' }}>
              <span style={{ color: '#2e2e35' }}>DOSSIER LINKS</span>
              <br />
              {subject.relatedDossiers.length}
            </div>
            <div className="text-xs" style={{ color: '#56565a' }}>
              <span style={{ color: '#2e2e35' }}>SUBJECT ID</span>
              <br />
              {subject.id}
            </div>
            {subject.aliases && subject.aliases.length > 0 && (
              <div className="text-xs" style={{ color: '#56565a' }}>
                <span style={{ color: '#2e2e35' }}>KNOWN ALIASES</span>
                <br />
                {subject.aliases.join(' · ')}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllSubjects } = await import('@/lib/subjects/query');
  return getAllSubjects().map((s) => ({ id: s.id }));
}
