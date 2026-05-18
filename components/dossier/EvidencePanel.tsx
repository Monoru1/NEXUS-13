'use client';

import { useState } from 'react';
import type { Evidence } from '@/types/narrative';
import { ClassificationTag } from '@/components/primitives/ClassificationTag';
import { RedactedText } from '@/components/primitives/RedactedText';
import { ScanReveal } from '@/components/primitives/ScanReveal';

type Props = {
  evidence: Evidence;
  onView?: (id: string) => void;
  viewed?: boolean;
  index: number;
};

const TYPE_LABEL: Record<Evidence['type'], string> = {
  document: 'DOC',
  audio: 'AUDIO',
  transcript: 'TRANSCRIPT',
  photo: 'PHOTO',
  log: 'LOG',
};

function AudioPanel({ evidence }: { evidence: Evidence }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mt-3">
      <div className="flex items-center gap-3 p-3 bg-void-2 border border-void-5">
        <button
          type="button"
          aria-label={playing ? 'Pause audio' : 'Play audio (stub — no actual audio)'}
          onClick={() => setPlaying((v) => !v)}
          className="
            w-7 h-7 border border-cipher/50 text-cipher
            flex items-center justify-center
            hover:border-cipher hover:bg-cipher/10
            transition-colors duration-120
            text-[10px]
            focus-visible:outline focus-visible:outline-1 focus-visible:outline-signal
          "
        >
          {playing ? '■' : '▶'}
        </button>

        {/* Waveform placeholder */}
        <div className="flex-1 flex items-center gap-px h-6" aria-hidden>
          {Array.from({ length: 48 }).map((_, i) => {
            const h = Math.sin(i * 0.7 + 1.2) * 0.5 + 0.5;
            return (
              <div
                key={i}
                className={`w-px transition-colors ${playing ? 'bg-cipher' : 'bg-void-5'}`}
                style={{ height: `${Math.max(4, h * 20)}px` }}
              />
            );
          })}
        </div>

        <span className="text-mono text-[9px] text-text-3 tabular-nums shrink-0">
          {playing ? 'PLAYING' : '00:11'}
        </span>
      </div>
      <p className="mt-1 text-mono text-[9px] text-text-3 tracking-system">
        CLASSIFIED AUDIO — PLAYBACK STUB
      </p>
    </div>
  );
}

function PhotoPanel() {
  return (
    <div className="mt-3 relative bg-void-3 border border-void-5 h-32 flex items-center justify-center overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 nexus-grid-bg opacity-40" aria-hidden />
      <div className="relative z-10 text-center">
        <div className="text-mono text-[9px] tracking-system text-text-3 mb-1">
          IMAGE WITHHELD
        </div>
        <div className="text-mono text-[8px] text-text-3">
          CLASSIFICATION OVERLAY ACTIVE
        </div>
      </div>
      <div
        className="absolute top-2 right-2 px-1.5 py-0.5 bg-void-0 border border-warn/50"
        aria-hidden
      >
        <span className="text-mono text-[8px] tracking-system text-warn">SECRET</span>
      </div>
    </div>
  );
}

function LogPanel({ content }: { content: string }) {
  return (
    <div className="mt-3 bg-void-0 border border-void-4 p-3 overflow-x-auto max-h-48">
      <pre className="text-mono text-[10px] text-text-2 leading-relaxed whitespace-pre-wrap break-words">
        {content}
      </pre>
    </div>
  );
}

function DocumentPanel({ content, redacted }: { content?: string; redacted?: boolean }) {
  if (!content && !redacted) return null;
  return (
    <div className="mt-3 bg-void-1 border border-void-4 border-l-2 border-l-text-3 p-4">
      {redacted ? (
        <div className="space-y-2">
          <div className="h-2.5 bg-redacted w-full" />
          <div className="h-2.5 bg-redacted w-4/5" />
          <div className="h-2.5 bg-redacted w-full" />
          <div className="h-2.5 bg-redacted w-3/4" />
          <div className="mt-2 text-mono text-[9px] tracking-system text-alert">
            CONTENT REDACTED // 13.4-CTRL
          </div>
        </div>
      ) : (
        <p className="text-[12px] text-text-2 leading-relaxed font-serif-italic whitespace-pre-line">
          {content}
        </p>
      )}
    </div>
  );
}

export function EvidencePanel({ evidence, onView, viewed, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const date = evidence.date.split('T')[0] ?? evidence.date;

  const handleExpand = () => {
    setExpanded((v) => !v);
    if (!viewed && onView) onView(evidence.id);
  };

  const hasDetail =
    evidence.type === 'audio' ||
    evidence.type === 'photo' ||
    evidence.content ||
    evidence.redacted;

  return (
    <ScanReveal trigger="view" delay={60 * index}>
      <article
        className={`
          border border-void-4 bg-void-1
          ${viewed ? 'border-void-5' : ''}
          transition-colors duration-200
        `}
        aria-label={`Evidence: ${evidence.title}`}
      >
        <div className="px-4 py-3 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-mono text-[9px] tracking-system text-cipher border border-cipher/30 px-1.5 py-0.5">
                {TYPE_LABEL[evidence.type]}
              </span>
              {evidence.redacted && (
                <ClassificationTag level="REDACTED" />
              )}
              {viewed && (
                <span className="text-mono text-[9px] tracking-system text-text-3">
                  REVIEWED
                </span>
              )}
            </div>

            <h3 className="text-[13px] font-medium text-text-0 leading-snug mb-1">
              {evidence.redacted ? (
                <RedactedText>{evidence.title}</RedactedText>
              ) : (
                evidence.title
              )}
            </h3>

            <p className="text-[11px] text-text-2 leading-relaxed">
              {evidence.summary}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <time
              dateTime={evidence.date}
              className="text-mono text-[9px] tabular-nums text-text-3"
            >
              {date}
            </time>
            <span className="text-mono text-[9px] text-text-3 tabular-nums">
              {evidence.id}
            </span>
          </div>
        </div>

        {hasDetail && (
          <div className="px-4 pb-3">
            <button
              type="button"
              onClick={handleExpand}
              aria-expanded={expanded}
              aria-controls={`evidence-detail-${evidence.id}`}
              className="
                text-mono text-[9px] tracking-system
                text-text-3 hover:text-text-1
                transition-colors duration-120
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-signal
              "
            >
              {expanded ? '▲ COLLAPSE' : '▼ EXPAND RECORD'}
            </button>

            {expanded && (
              <div id={`evidence-detail-${evidence.id}`}>
                {evidence.type === 'audio' && (
                  <AudioPanel evidence={evidence} />
                )}
                {evidence.type === 'photo' && <PhotoPanel />}
                {evidence.type === 'log' && evidence.content && (
                  <LogPanel content={evidence.content} />
                )}
                {(evidence.type === 'document' || evidence.type === 'transcript') && (
                  <DocumentPanel
                    content={evidence.content}
                    redacted={evidence.redacted}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </article>
    </ScanReveal>
  );
}
