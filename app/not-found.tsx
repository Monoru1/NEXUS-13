import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="text-mono text-[13px] leading-[1.8] mb-10 space-y-0">
          <p className="text-text-3">{'> NEXUS//13 — INDEX QUERY'}</p>
          <p className="text-text-3">{'> Resolving requested resource...'}</p>
          <p className="text-text-3">{'> '}&nbsp;</p>
          <p className="text-alert">{'> ERROR 404 — DOSSIER NOT FOUND IN INDEX'}</p>
          <p className="text-text-3">{'> '}&nbsp;</p>
          <p className="text-text-2 text-serif-italic">
            {'> THIS RESOURCE DOES NOT EXIST.'}
          </p>
          <p className="text-text-2 text-serif-italic">
            {'> OR DOES NOT EXIST YET.'}
          </p>
          <p className="text-text-2 text-serif-italic">
            {'> OR HAS BEEN REDACTED.'}
          </p>
          <p className="text-text-3">{'> '}&nbsp;</p>
          <p className="text-text-3">
            {'> SESSION ANOMALY LOGGED. THIS QUERY HAS BEEN RECORDED.'}
          </p>
        </div>

        <div className="border border-void-4 bg-void-1 p-6 nexus-grid-bg">
          <p className="text-mono text-[10px] tracking-system text-text-3 mb-4">
            RETURN TO ACTIVE SYSTEM
          </p>
          <Link
            href="/nexus"
            className="
              inline-flex items-center gap-3
              text-mono text-[11px] tracking-system
              px-4 py-2 border border-signal text-signal
              hover:bg-signal hover:text-void-0
              transition-colors duration-200
              focus-visible:outline focus-visible:outline-1 focus-visible:outline-signal
            "
          >
            <span aria-hidden>→</span>
            NEXUS OVERVIEW
          </Link>
        </div>
      </div>
    </div>
  );
}
