'use client';

import { useMemo } from 'react';
import type { Graph, GraphNode } from '@/lib/graph/topology';
import { useGraphStore } from '@/lib/store/graph';

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#c5ff3c',
  DECEASED: '#56565a',
  UNKNOWN: '#ff3636',
  REDACTED: '#ff3636',
  OPEN: '#5bc0eb',
  CLOSED: '#56565a',
};

type Props = {
  graph: Graph;
};

export function InspectorPanel({ graph }: Props) {
  const { selectedNodeId, select } = useGraphStore();

  const nodeMap = useMemo(() => {
    const m = new Map<string, GraphNode>();
    for (const n of graph.nodes) m.set(n.id, n);
    return m;
  }, [graph.nodes]);

  const selected = selectedNodeId ? nodeMap.get(selectedNodeId) : null;

  const connected = useMemo(() => {
    if (!selectedNodeId) return [];
    const ids = new Set<string>();
    for (const e of graph.edges) {
      if (e.from === selectedNodeId) ids.add(e.to);
      if (e.to === selectedNodeId) ids.add(e.from);
    }
    return [...ids].map((id) => nodeMap.get(id)).filter(Boolean) as GraphNode[];
  }, [selectedNodeId, graph.edges, nodeMap]);

  return (
    <div
      className="absolute right-6 top-24 w-80 pointer-events-auto"
      style={{ fontFamily: 'var(--font-mono, monospace)' }}
    >
      <div
        className="border border-void-4 bg-void-0/90 backdrop-blur-sm"
        style={{ borderColor: '#2e2e35', backgroundColor: 'rgba(6,6,7,0.9)' }}
      >
        {/* Header */}
        <div
          className="px-4 py-2 border-b text-xs tracking-widest uppercase"
          style={{ borderColor: '#2e2e35', color: '#56565a' }}
        >
          NODE INSPECTOR
        </div>

        {!selected ? (
          <div className="px-4 py-6 text-xs" style={{ color: '#56565a' }}>
            {'>'} select a node to inspect
          </div>
        ) : (
          <>
            {/* Node details */}
            <div className="px-4 py-4 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs tracking-widest uppercase" style={{ color: STATUS_COLOR[selected.status] ?? '#f4f4f2' }}>
                  {selected.codename}
                </span>
                <span className="text-xs" style={{ color: '#56565a' }}>
                  {selected.type.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-xs" style={{ color: '#56565a' }}>
                <span>STATUS</span>
                <span style={{ color: STATUS_COLOR[selected.status] ?? '#a0a0a4' }}>
                  {selected.status}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed pt-1"
                style={{ color: '#a0a0a4', fontFamily: 'var(--font-serif, serif)', fontStyle: 'italic' }}
              >
                {selected.summary.length > 140
                  ? selected.summary.slice(0, 140) + '…'
                  : selected.summary}
              </p>
            </div>

            {/* Connected nodes */}
            {connected.length > 0 && (
              <div className="border-t" style={{ borderColor: '#2e2e35' }}>
                <div className="px-4 py-2 text-xs tracking-widest uppercase" style={{ color: '#56565a' }}>
                  CONNECTED · {connected.length}
                </div>
                <ul className="pb-3">
                  {connected.map((n) => (
                    <li key={n.id}>
                      <button
                        onClick={() => select(n.id)}
                        className="w-full text-left px-4 py-1.5 text-xs tracking-wide flex justify-between items-center hover:bg-void-2/30 transition-colors duration-150"
                        style={{
                          color: STATUS_COLOR[n.status] ?? '#a0a0a4',
                        }}
                      >
                        <span>{n.codename}</span>
                        <span style={{ color: '#56565a', fontSize: '10px' }}>{n.type}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
