'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { buildGraph } from '@/lib/graph/topology';
import type { GraphNode } from '@/lib/graph/topology';
import { useGraphStore } from '@/lib/store/graph';
import { Node } from './Node';
import { Edge } from './Edge';

function PointLightTracker({ nodes }: { nodes: GraphNode[] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const { hoveredNodeId, selectedNodeId } = useGraphStore();
  const activeId = hoveredNodeId ?? selectedNodeId;

  useFrame(() => {
    if (!lightRef.current) return;
    const node = activeId ? nodes.find((n) => n.id === activeId) : null;
    const target = node
      ? new THREE.Vector3(...node.position)
      : new THREE.Vector3(0, 0, 0);
    lightRef.current.position.lerp(target, 0.08);
  });

  return <pointLight ref={lightRef} intensity={1.2} distance={6} color="#ffffff" />;
}

function GraphScene() {
  const { select } = useGraphStore();
  const graph = useMemo(() => buildGraph(), []);

  const nodeMap = useMemo(() => {
    const m = new Map<string, GraphNode>();
    for (const n of graph.nodes) m.set(n.id, n);
    return m;
  }, [graph.nodes]);

  const handleClick = useCallback(
    (id: string) => select(id),
    [select],
  );

  const handleCanvasClick = useCallback(() => select(null), [select]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#f4f4f2" />
      <PointLightTracker nodes={graph.nodes} />
      <fog attach="fog" args={['#060607', 10, 28]} />

      <group onClick={handleCanvasClick}>
        {graph.edges.map((edge, i) => (
          <Edge key={i} edge={edge} nodeMap={nodeMap} />
        ))}
        {graph.nodes.map((node) => (
          <Node key={node.id} node={node} onClick={handleClick} />
        ))}
      </group>
    </>
  );
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <GraphScene />
      <OrbitControls
        minDistance={3}
        maxDistance={20}
        enablePan={false}
        dampingFactor={0.08}
        enableDamping
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
