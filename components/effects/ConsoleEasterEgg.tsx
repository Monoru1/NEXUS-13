'use client';

import { useEffect } from 'react';

export function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = {
      banner: [
        'color: #c5ff3c',
        'background: #060607',
        'font-family: monospace',
        'font-size: 11px',
        'font-weight: 600',
        'padding: 6px 12px',
        'border-left: 2px solid #c5ff3c',
        'letter-spacing: 0.12em',
      ].join(';'),
      dim: [
        'color: #56565a',
        'background: #060607',
        'font-family: monospace',
        'font-size: 10px',
        'padding: 2px 12px',
      ].join(';'),
      alert: [
        'color: #ff3636',
        'background: #060607',
        'font-family: monospace',
        'font-size: 10px',
        'padding: 2px 12px',
      ].join(';'),
      warn: [
        'color: #ffb020',
        'background: #060607',
        'font-family: monospace',
        'font-size: 10px',
        'padding: 2px 12px',
      ].join(';'),
    };

    console.log('%cNEXUS//13 — CLASSIFIED INTERFACE', styles.banner);
    console.log('%c ', styles.dim);
    console.log('%cYou are being observed.', styles.alert);
    console.log('%cThis session has been logged. Reference: ' + generateSessionRef(), styles.dim);
    console.log('%c ', styles.dim);
    console.log('%cACCESS LEVEL: OBSERVER', styles.warn);
    console.log('%cCLEARANCE REQUIRED FOR FULL ACCESS: L-4', styles.dim);
    console.log('%c ', styles.dim);
    console.log('%cIf you are reading this, you found the audit trail.', styles.dim);
    console.log('%cFile a report under directive 13.4-CTRL.', styles.dim);
    console.log('%cOr don\'t. We already know.', styles.dim);
    console.log('%c ', styles.dim);
    console.log('%c[NEXUS-CTRL-13 // TECHNICAL DIVISION // AUDIT LOG END]', styles.dim);
  }, []);

  return null;
}

function generateSessionRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'NX-';
  for (let i = 0; i < 4; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  ref += '-';
  for (let i = 0; i < 4; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}
