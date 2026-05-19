'use client';

import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { GraphEdge, GraphNode } from '@/lib/graph/topology';

const EDGE_COLOR: Record<string, string> = {
  primary: '#a0a0a4',    // text-2
  related: '#56565a',    // text-3
  contradiction: '#ffb020', // warn
  mention: '#5bc0eb',    // cipher
};

const EDGE_OPACITY: Record<string, number> = {
  primary: 0.7,
  related: 0.45,
  contradiction: 0.85,
  mention: 0.3,
};

const EDGE_WIDTH: Record<string, number> = {
  primary: 1.0,
  related: 0.6,
  contradiction: 1.2,
  mention: 0.5,
};

type EdgeProps = {
  edge: GraphEdge;
  nodeMap: Map<string, GraphNode>;
};

export function Edge({ edge, nodeMap }: EdgeProps) {
  const from = nodeMap.get(edge.from);
  const to = nodeMap.get(edge.to);

  const points = useMemo(() => {
    if (!from || !to) return null;
    return [new THREE.Vector3(...from.position), new THREE.Vector3(...to.position)];
  }, [from, to]);

  if (!points) return null;

  const color = EDGE_COLOR[edge.kind] ?? '#56565a';
  const opacity = EDGE_OPACITY[edge.kind] ?? 0.4;
  const lineWidth = EDGE_WIDTH[edge.kind] ?? 0.6;

  return (
    <Line
      points={points}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
    />
  );
}
