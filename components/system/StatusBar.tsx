'use client';

import { useEffect, useState, useCallback } from 'react';
import { setAudioEnabled, getAudioEnabled } from '@/lib/audio/ui-sounds';
import { startAmbient, stopAmbient } from '@/lib/audio/ambient-engine';

export function StatusBar() {
  const [utc, setUtc] = useState('--:--:--');
  const [sessionId, setSessionId] = useState('────-────-────');
  const [signal, setSignal] = useState(3);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    setAudioOn(getAudioEnabled());

    const id = Array.from({ length: 3 }, () =>
      Math.random().toString(36).slice(2, 6),
    ).join('-').toUpperCase();
    setSessionId(id);

    const tick = () => {
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, '0');
      const m = String(d.getUTCMinutes()).padStart(2, '0');
      const s = String(d.getUTCSeconds()).padStart(2, '0');
      setUtc(`${h}:${m}:${s}Z`);
    };
    tick();
    const interval = setInterval(tick, 1000);

    const signalInterval = setInterval(() => {
      setSignal(2 + Math.floor(Math.random() * 3));
    }, 4200);

    return () => {
      clearInterval(interval);
      clearInterval(signalInterval);
    };
  }, []);

  const toggleAudio = useCallback(() => {
    const next = !audioOn;
    setAudioOn(next);
    setAudioEnabled(next);
    if (next) {
      startAmbient();
    } else {
      stopAmbient();
    }
  }, [audioOn]);

  return (
    <div
      className="
        hidden lg:flex
        fixed bottom-6 right-0 z-40
        items-center gap-4 px-4 py-1.5
        text-[10px] tracking-system text-mono text-text-2
        border-t border-l border-void-4 bg-void-1/80 backdrop-blur-sm
      "
      aria-label="System status bar"
    >
      <span>
        <span className="text-text-3">UTC</span>{' '}
        <span className="text-signal">{utc}</span>
      </span>

      <span className="text-void-5">|</span>

      <span>
        <span className="text-text-3">SESSION</span>{' '}
        <span className="text-text-1">{sessionId}</span>
      </span>

      <span className="text-void-5">|</span>

      <span className="flex items-center gap-1">
        <span className="text-text-3">LINK</span>
        <span className="flex items-end gap-px">
          {[1, 2, 3, 4].map((bar) => (
            <span
              key={bar}
              className={`w-0.5 transition-colors duration-300 ${
                bar <= signal ? 'bg-signal' : 'bg-void-4'
              }`}
              style={{ height: `${bar * 2 + 2}px` }}
            />
          ))}
        </span>
      </span>

      <span className="text-void-5">|</span>

      <button
        onClick={toggleAudio}
        className={`
          text-[9px] tracking-system transition-colors duration-200
          focus-visible:outline focus-visible:outline-1 focus-visible:outline-signal
          ${audioOn ? 'text-signal hover:text-signal/70' : 'text-text-3 hover:text-text-2'}
        `}
        aria-label={audioOn ? 'Disable ambient audio' : 'Enable ambient audio'}
        title={audioOn ? 'AUDIO ON — click to disable' : 'AUDIO OFF — click to enable'}
      >
        {audioOn ? 'AUDIO ■' : 'AUDIO ○'}
      </button>
    </div>
  );
}
