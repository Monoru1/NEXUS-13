'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function OrbitalSystem() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const SIGNAL = '#c5ff3c';
  const SIGNAL_DIM = '#6a8f1f';

  // Orbital nodes — 6 on outer ring, 4 on mid, 3 on inner
  const outerNodes = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      phase: (i / 6) * Math.PI * 2,
      radius: 2.8,
    })), []);

  const midNodes = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      angle: (i / 4) * Math.PI * 2 + Math.PI / 4,
      phase: (i / 4) * Math.PI * 2,
      radius: 1.8,
    })), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRingRef.current) outerRingRef.current.rotation.z = t * 0.12;
    if (midRingRef.current) midRingRef.current.rotation.z = -t * 0.19;
    if (innerRingRef.current) innerRingRef.current.rotation.z = t * 0.31;
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 1.1) * 0.12;
      coreRef.current.scale.setScalar(scale);
      (coreRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.4 + Math.abs(Math.sin(t * 0.6)) * 0.35;
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.18;
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer orbital ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.8, 0.008, 4, 128]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.35} />
      </mesh>

      {/* Mid orbital ring */}
      <mesh ref={midRingRef} rotation={[Math.PI * 0.15, 0, 0]}>
        <torusGeometry args={[1.8, 0.008, 4, 96]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.25} />
      </mesh>

      {/* Inner orbital ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI * 0.35, Math.PI * 0.1, 0]}>
        <torusGeometry args={[1.1, 0.006, 4, 64]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.2} />
      </mesh>

      {/* Outer orbital nodes */}
      {outerNodes.map((node, i) => (
        <OrbitalNode key={`outer-${i}`} {...node} color={SIGNAL} size={0.06} />
      ))}

      {/* Mid orbital nodes */}
      {midNodes.map((node, i) => (
        <OrbitalNode key={`mid-${i}`} {...node} color={SIGNAL_DIM} size={0.04} speed={-0.19} />
      ))}

      {/* Core octahedron */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshBasicMaterial color={SIGNAL} wireframe transparent opacity={0.6} />
      </mesh>

      {/* Core inner solid */}
      <mesh>
        <octahedronGeometry args={[0.15, 0]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function OrbitalNode({
  angle,
  phase,
  radius,
  color,
  size,
  speed = 0.12,
}: {
  angle: number;
  phase: number;
  radius: number;
  color: string;
  size: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initialAngle = angle;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const a = initialAngle + t * speed;
    ref.current.position.x = Math.cos(a) * radius;
    ref.current.position.y = Math.sin(a) * radius;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.5 + Math.abs(Math.sin(t * 0.4 + phase)) * 0.4;
  });

  return (
    <mesh ref={ref} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

export function NexusProjection() {
  return (
    <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-void-0">
      {/* Label */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-3">
        <p className="text-mono text-[9px] tracking-system text-text-3">
          NX · COMMAND LATTICE · OPERATIONAL
        </p>
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 bg-signal pulse-signal" />
          <span className="text-mono text-[9px] tracking-system text-signal">LIVE</span>
        </span>
      </div>

      {/* Top-right stats */}
      <div className="absolute top-3 right-4 z-10 text-right">
        <p className="text-mono text-[9px] tracking-system text-text-3">
          4 DOSSIERS · 6 ANOMALIES
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-hidden
      >
        <OrbitalSystem />
      </Canvas>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-void-4" />

      {/* Scanline overlay */}
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
