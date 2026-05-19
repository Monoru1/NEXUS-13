'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { buildGraph } from '@/lib/graph/topology';
import type { GraphNode } from '@/lib/graph/topology';
import { useGraphStore } from '@/lib/store/graph';
import { Node } from './Node';
import { Edge } from './Edge';

// Approximation of cubic-bezier(0.65, 0, 0.35, 1) for scalar t ∈ [0,1]
function easeProtocol(t: number): number {
  // Computed using de Casteljau — good enough approximation via smooth step
  const t2 = t * t;
  const t3 = t2 * t;
  return 6 * t3 * t2 - 15 * t2 * t2 + 10 * t3;
}

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

type CameraControllerProps = {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
};

function CameraController({ controlsRef }: CameraControllerProps) {
  const { camera } = useThree();
  const { cameraTarget } = useGraphStore();

  const animRef = useRef<{
    from: THREE.Vector3;
    target: THREE.Vector3;
    elapsed: number;
    duration: number;
  } | null>(null);

  const prevTarget = useRef<[number, number, number] | null>(null);

  useFrame((_state, delta) => {
    if (cameraTarget && cameraTarget !== prevTarget.current) {
      prevTarget.current = cameraTarget;
      const nodePos = new THREE.Vector3(...cameraTarget);
      // Orbit toward the node: keep current radius, reposition camera
      const dir = camera.position.clone().sub(nodePos).normalize();
      const radius = Math.max(camera.position.length() * 0.7, 5);
      const dest = nodePos.clone().add(dir.multiplyScalar(radius));
      animRef.current = {
        from: camera.position.clone(),
        target: dest,
        elapsed: 0,
        duration: 0.8, // 800ms
      };
    }

    if (!animRef.current) return;
    const anim = animRef.current;
    anim.elapsed = Math.min(anim.elapsed + delta, anim.duration);
    const t = easeProtocol(anim.elapsed / anim.duration);
    camera.position.lerpVectors(anim.from, anim.target, t);

    if (controlsRef.current) {
      controlsRef.current.update();
    }

    if (anim.elapsed >= anim.duration) {
      animRef.current = null;
    }
  });

  return null;
}

function GraphScene() {
  const { select } = useGraphStore();
  const graph = useMemo(() => buildGraph(), []);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

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
      <CameraController controlsRef={controlsRef} />

      <group onClick={handleCanvasClick}>
        {graph.edges.map((edge, i) => (
          <Edge key={i} edge={edge} nodeMap={nodeMap} />
        ))}
        {graph.nodes.map((node) => (
          <Node key={node.id} node={node} onClick={handleClick} />
        ))}
      </group>

      <OrbitControls
        ref={controlsRef}
        minDistance={3}
        maxDistance={20}
        enablePan={false}
        dampingFactor={0.08}
        enableDamping
        rotateSpeed={0.5}
      />
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
    </Canvas>
  );
}
