'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { buildGraph } from '@/lib/graph/topology';
import { useGraphStore } from '@/lib/store/graph';
import { InspectorPanel } from '@/components/graph/InspectorPanel';
import { GraphLegend } from '@/components/graph/GraphLegend';

// Canvas must be client-only — no SSR for WebGL
const Scene = dynamic(
  () => import('@/components/graph/Scene').then((m) => m.Scene),
  { ssr: false },
);

export default function NexusGraphPage() {
  const graph = useMemo(() => buildGraph(), []);
  const { selectedNodeId } = useGraphStore();

  const contradictionCount = graph.edges.filter((e) => e.kind === 'contradiction').length;

  return (
    // Mobile guard
    <>
      {/* Viewport too narrow */}
      <div className="flex md:hidden items-center justify-center h-screen px-8 text-center"
        style={{ fontFamily: 'var(--font-mono, monospace)' }}>
        <p className="text-xs tracking-widest uppercase leading-loose" style={{ color: '#56565a' }}>
          NEXUS GRAPH REQUIRES DESKTOP CONSOLE.<br />
          // VIEWPORT TOO NARROW.
        </p>
      </div>

      {/* Desktop graph view */}
      <div className="hidden md:block relative w-full" style={{ height: 'calc(100vh - 3rem)' }}>
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 pointer-events-none"
          style={{ fontFamily: 'var(--font-mono, monospace)' }}
        >
          <div>
            <h1 className="text-xs tracking-widest uppercase" style={{ color: '#a0a0a4' }}>
              NEXUS//13 · RELATION GRAPH
            </h1>
            <p className="text-xs mt-0.5" style={{ color: '#56565a' }}>
              DRAG TO ROTATE · SCROLL TO ZOOM · CLICK NODE TO INSPECT
            </p>
          </div>
          <div className="text-right text-xs tracking-wide" style={{ color: '#56565a' }}>
            <span style={{ color: '#a0a0a4' }}>NODES</span>{' '}
            <span style={{ color: '#c5ff3c' }}>{graph.nodes.length}</span>
            {' · '}
            <span style={{ color: '#a0a0a4' }}>EDGES</span>{' '}
            <span style={{ color: '#5bc0eb' }}>{graph.edges.length}</span>
            {' · '}
            <span style={{ color: '#a0a0a4' }}>CONTRADICTIONS</span>{' '}
            <span style={{ color: '#ffb020' }}>{contradictionCount}</span>
          </div>
        </div>

        {/* Three.js canvas — fills the container */}
        <div className="absolute inset-0" style={{ background: '#060607' }}>
          <Scene />
        </div>

        {/* Inspector overlay */}
        <InspectorPanel graph={graph} />

        {/* Legend overlay */}
        <GraphLegend />

        {/* Selected node hint */}
        {!selectedNodeId && (
          <div
            className="absolute bottom-8 right-6 text-xs pointer-events-none"
            style={{ color: '#2e2e35', fontFamily: 'var(--font-mono, monospace)' }}
          >
            {'>'} NO NODE SELECTED
          </div>
        )}
      </div>
    </>
  );
}
