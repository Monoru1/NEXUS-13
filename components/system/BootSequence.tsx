'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

type BootLine = {
  text: string;
  delay: number;
  tone?: 'ok' | 'warn' | 'alert' | 'cipher' | 'dim';
};

const BOOT_SEQUENCE: BootLine[] = [
  { text: '> NEXUS BOOT LOADER v13.4.7-classified', delay: 0, tone: 'dim' },
  { text: '> Initializing secure enclave...', delay: 260 },
  { text: '> Memory check: 17.3 PB allocated [OK]', delay: 420, tone: 'ok' },
  { text: '> Cipher subsystem: AES-512 / CHACHA20 [OK]', delay: 580, tone: 'ok' },
  { text: '> Establishing handshake with NODE-CTRL-13...', delay: 760 },
  { text: '> HANDSHAKE RECEIVED. ORIGIN: UNRESOLVED', delay: 1040, tone: 'warn' },
  { text: '> WARNING: client geolocation hash not in trust ring', delay: 1280, tone: 'warn' },
  { text: '> Loading classification matrix [████████████] 100%', delay: 1540 },
  { text: '> Loading subject database [████████████] 100%', delay: 1700 },
  { text: '> Loading timeline integrity layer [████░░░░░░░░] 34%', delay: 1860, tone: 'warn' },
  { text: '> TIMELINE LAYER: 3 anomalies detected. Proceeding.', delay: 2100, tone: 'warn' },
  { text: '> Anonymizing session...', delay: 2300 },
  { text: '> Session signature recorded.', delay: 2500, tone: 'dim' },
  { text: '> ', delay: 2700 },
  { text: '> AUTH REQUIRED', delay: 2900, tone: 'alert' },
];

export function BootSequence() {
  const router = useRouter();
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showAuth, setShowAuth] = useState(false);
  const [credential, setCredential] = useState('');
  const [processing, setProcessing] = useState(false);
  const [authStage, setAuthStage] = useState<'idle' | 'check' | 'denied' | 'override'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_SEQUENCE.forEach((line, idx) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((v) => Math.max(v, idx + 1));
          if (idx === BOOT_SEQUENCE.length - 1) {
            setTimeout(() => {
              setShowAuth(true);
              setTimeout(() => inputRef.current?.focus(), 240);
            }, 380);
          }
        }, line.delay),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credential.trim() || processing) return;

    setProcessing(true);
    setAuthStage('check');

    await new Promise((r) => setTimeout(r, 1200));

    setAuthStage('denied');
    await new Promise((r) => setTimeout(r, 1400));

    setAuthStage('override');
    await new Promise((r) => setTimeout(r, 1800));

    router.push('/nexus');
  };

  const toneClass = (tone?: BootLine['tone']) => {
    switch (tone) {
      case 'ok': return 'text-signal';
      case 'warn': return 'text-warn';
      case 'alert': return 'text-alert';
      case 'cipher': return 'text-cipher';
      case 'dim': return 'text-text-3';
      default: return 'text-text-1';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="text-mono text-[13px] leading-[1.7] mb-8 min-h-[420px]">
        {BOOT_SEQUENCE.slice(0, visibleLines).map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18, ease: [0.65, 0, 0.35, 1] }}
            className={toneClass(line.tone)}
          >
            {line.text || '\u00A0'}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.65, 0, 0.35, 1] }}
            className="border border-void-4 bg-void-1 p-8 nexus-grid-bg"
          >
            <div className="mb-6 flex items-baseline justify-between">
              <h1 className="text-[11px] tracking-system text-mono text-warn">
                AUTHENTICATION
              </h1>
              <span className="text-[10px] tracking-system text-mono text-text-3">
                FORM 13-A · CHALLENGE/RESPONSE
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="block mb-3">
                <span className="block text-[10px] tracking-system text-text-2 mb-2">
                  CREDENTIAL TOKEN
                </span>
                <div className="flex items-center gap-2 border-b border-void-5 focus-within:border-signal transition-colors">
                  <span className="text-mono text-signal text-sm">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    disabled={processing}
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    placeholder="enter clearance token"
                    className="
                      flex-1 bg-transparent
                      py-3 text-mono text-sm text-text-0
                      placeholder:text-text-3 placeholder:font-normal
                      outline-none
                    "
                  />
                  <span className="text-mono text-signal pulse-signal">█</span>
                </div>
              </label>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-[10px] text-mono text-text-3 max-w-md leading-relaxed">
                  Unauthorized access to this system is a federal violation.
                  All session activity is recorded under directive NEXUS-13.4-CTRL.
                </p>

                <button
                  type="submit"
                  disabled={processing || !credential.trim()}
                  className="
                    text-[11px] tracking-system text-mono
                    px-4 py-2 border border-signal text-signal
                    hover:bg-signal hover:text-void-0
                    transition-colors duration-200
                    disabled:border-void-5 disabled:text-text-3 disabled:hover:bg-transparent disabled:cursor-not-allowed
                  "
                >
                  {processing ? 'PROCESSING...' : 'SUBMIT'}
                </button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {authStage === 'check' && (
                <motion.div
                  key="check"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 pt-4 border-t border-void-4 text-mono text-[12px] text-text-2"
                >
                  <div>{'> Validating token against trust ring...'}</div>
                  <div>{'> Cross-referencing clearance matrix...'}</div>
                </motion.div>
              )}

              {authStage === 'denied' && (
                <motion.div
                  key="denied"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 pt-4 border-t border-alert/40 text-mono text-[12px] text-alert hard-glitch"
                >
                  <div>{'> TOKEN INVALID'}</div>
                  <div>{'> CLEARANCE: NONE'}</div>
                  <div>{'> ACCESS: DENIED'}</div>
                </motion.div>
              )}

              {authStage === 'override' && (
                <motion.div
                  key="override"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 pt-4 border-t border-warn/40 text-mono text-[12px] text-warn"
                >
                  <div>{'> ANOMALY: backdoor 13.4-CTRL responded'}</div>
                  <div>{'> WARNING: this access was not authorized'}</div>
                  <div className="text-signal">{'> SESSION ESCALATED. WELCOME.'}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
