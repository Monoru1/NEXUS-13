'use client';

export function AuditTrail() {
  // Injects an HTML comment visible in page source — part of the in-fiction experience.
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `
<!--
  NEXUS//13 — AUDIT TRAIL
  SESSION: OBSERVER_ACCESS
  TIMESTAMP: [generated server-side]

  INTERNAL LOG FRAGMENT — DO NOT DISTRIBUTE
  ──────────────────────────────────────────
  2024-08-14 03:17:09Z  DOSSIER N13-004 STATUS CHANGED: CLOSED → OPEN
  2024-08-14 03:17:09Z  CLASSIFICATION UPGRADE: SECRET → TOP SECRET
  2024-08-14 03:17:09Z  AUTHORISING OFFICER: [NONE LOGGED]
  2024-08-14 03:17:09Z  REASON: [NOT DOCUMENTED]
  ──────────────────────────────────────────
  If you are reading this, you are in the audit log.
  Reference: NEXUS-CTRL-13 // DIRECTIVE 13.4-CTRL
-->`,
      }}
      style={{ display: 'none' }}
    />
  );
}
