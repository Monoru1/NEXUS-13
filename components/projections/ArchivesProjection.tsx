'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const DOSSIER_COLORS = ['#ffb020', '#ffb020', '#ff3636', '#ffb020'] as const;
const DOSSIER_CODES = ['N13-001', 'N13-002', 'N13-003', 'N13-004'] as const;

function DocumentStack() {
  const groupRef = useRef<THREE.Group>(null);
  const planeRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.12;
    }

    planeRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const offset = (i / 4) * Math.PI * 2;
      const wobble = Math.sin(t * 0.3 + offset) * 0.06;
      const baseY = (i - 1.5) * 0.55;
      ref.current.position.y = baseY + wobble;
      ref.current.rotation.z = Math.sin(t * 0.15 + offset) * 0.05;
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.abs(Math.sin(t * 0.2 + offset)) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Stacked document planes — each tilted slightly */}
      {planeRefs.map((ref, i) => (
        <mesh
          key={i}
          ref={ref}
          position={[0, (i - 1.5) * 0.55, 0]}
          rotation={[0, 0, (i % 2 === 0 ? 1 : -1) * 0.04]}
        >
          <planeGeometry args={[2.8, 3.6]} />
          <meshBasicMaterial
            color={DOSSIER_COLORS[i] ?? '#ffb020'}
            wireframe
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Edge lines per document (top and bottom) */}
      {[0, 1, 2, 3].map((i) => (
        <EdgeLines key={i} index={i} />
      ))}

      {/* Central spine */}
      <mesh>
        <boxGeometry args={[0.02, 2.6, 0.02]} />
        <meshBasicMaterial color="#ffb020" transparent opacity={0.3} />
      </mesh>

      {/* Corner nodes */}
      {[-1.4, 1.4].flatMap((x) =>
        [-1.8, 1.8].map((y) => (
          <CornerNode key={`${x}-${y}`} x={x} y={y} />
        ))
      )}
    </group>
  );
}

function EdgeLines({ index }: { index: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const phase = (index / 4) * Math.PI * 2;
    const baseY = (index - 1.5) * 0.55;
    ref.current.position.y = baseY + Math.sin(t * 0.3 + phase) * 0.06;
  });

  const color = DOSSIER_COLORS[index] ?? '#ffb020';

  return (
    <group ref={ref}>
      {/* Top edge */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[2.8, 0.008, 0.008]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
      {/* Bottom edge */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[2.8, 0.008, 0.008]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function CornerNode({ x, y }: { x: number; y: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.3 + Math.abs(Math.sin(t * 0.4 + x + y)) * 0.4;
  });

  return (
    <mesh ref={ref} position={[x, y, 0]}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color="#ffb020" transparent opacity={0.5} />
    </mesh>
  );
}

export function ArchivesProjection() {
  return (
    <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-void-0">
      {/* Label */}
      <div className="absolute top-3 left-4 z-10">
        <p className="text-mono text-[9px] tracking-system text-text-3">
          AR · DOSSIER ARCHIVE · CLASSIFIED
        </p>
      </div>

      {/* Dossier codes top-right */}
      <div className="absolute top-3 right-4 z-10 flex gap-3">
        {DOSSIER_CODES.map((code, i) => (
          <span
            key={code}
            className="text-mono text-[9px] tracking-system"
            style={{ color: DOSSIER_COLORS[i] ?? '#ffb020', opacity: 0.7 }}
          >
            {code}
          </span>
        ))}
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-hidden
      >
        <DocumentStack />
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-void-4" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.006) 3px, transparent 4px)',
        }}
        aria-hidden
      />
    </div>
  );
}
