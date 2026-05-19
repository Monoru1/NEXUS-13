'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#c5ff3c',
  DECEASED: '#56565a',
  UNKNOWN: '#ff3636',
  REDACTED: '#ff3636',
};

// 9 subjects distributed on Fibonacci sphere
const SUBJECTS = [
  { id: 'ARIADNE', status: 'ACTIVE' },
  { id: 'VESPER', status: 'UNKNOWN' },
  { id: 'KAIROS', status: 'REDACTED' },
  { id: 'MERIDIAN', status: 'DECEASED' },
  { id: 'HELIOS', status: 'ACTIVE' },
  { id: 'CYGNUS', status: 'UNKNOWN' },
  { id: 'ORACLE', status: 'DECEASED' },
  { id: 'PRISM', status: 'ACTIVE' },
  { id: 'AXIOM', status: 'REDACTED' },
];

function RegistryConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const lineGroupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const n = SUBJECTS.length;
    return Array.from({ length: n }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      const r = 2.2;
      return new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * r,
        Math.sin(theta) * Math.sin(phi) * r,
        Math.cos(phi) * r,
      );
    });
  }, []);

  // Connect active subjects with lines
  const activeIndices = SUBJECTS
    .map((s, i) => ({ ...s, i }))
    .filter((s) => s.status === 'ACTIVE')
    .map((s) => s.i);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subject nodes */}
      {SUBJECTS.map((subject, i) => {
        const pos = positions[i];
        if (!pos) return null;
        return (
          <SubjectNode
            key={subject.id}
            position={pos}
            color={STATUS_COLOR[subject.status] ?? '#56565a'}
            index={i}
          />
        );
      })}

      {/* Connection lines between active subjects */}
      {activeIndices.flatMap((ai, i) =>
        activeIndices.slice(i + 1).map((bi) => {
          const a = positions[ai];
          const b = positions[bi];
          if (!a || !b) return null;
          return <ConnectionLine key={`${ai}-${bi}`} start={a} end={b} />;
        })
      )}

      {/* Central command node */}
      <CentralNode />

      {/* Radial lines from center to active subjects */}
      {activeIndices.map((i) => {
        const pos = positions[i];
        if (!pos) return null;
        return <RadialLine key={`radial-${i}`} target={pos} />;
      })}
    </group>
  );
}

function SubjectNode({
  position,
  color,
  index,
}: {
  position: THREE.Vector3;
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const phase = (index / SUBJECTS.length) * Math.PI * 2;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.5 + Math.abs(Math.sin(t * 0.35 + phase)) * 0.45;
    if (ringRef.current) {
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.1 + Math.abs(Math.sin(t * 0.5 + phase)) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.18, 0.006, 4, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function CentralNode() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 0.8) * 0.2;
    ref.current.scale.setScalar(scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.4 + Math.abs(Math.sin(t * 0.5)) * 0.35;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.22, 0]} />
      <meshBasicMaterial color="#c5ff3c" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function ConnectionLine({
  start,
  end,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const dir = end.clone().sub(start);
  const len = dir.length();
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize(),
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.05 + Math.abs(Math.sin(t * 0.25)) * 0.1;
  });

  return (
    <mesh ref={ref} position={mid} quaternion={quaternion}>
      <cylinderGeometry args={[0.004, 0.004, len, 4]} />
      <meshBasicMaterial color="#c5ff3c" transparent opacity={0.1} />
    </mesh>
  );
}

function RadialLine({ target }: { target: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);
  const origin = new THREE.Vector3(0, 0, 0);
  const dir = target.clone().sub(origin);
  const len = dir.length();
  const mid = target.clone().multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize(),
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.03 + Math.abs(Math.sin(t * 0.3)) * 0.07;
  });

  return (
    <mesh ref={ref} position={mid} quaternion={quaternion}>
      <cylinderGeometry args={[0.003, 0.003, len, 4]} />
      <meshBasicMaterial color="#c5ff3c" transparent opacity={0.06} />
    </mesh>
  );
}

export function SubjectsProjection({ subjectCount = 9 }: { subjectCount?: number }) {
  return (
    <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-void-0">
      {/* Label */}
      <div className="absolute top-3 left-4 z-10">
        <p className="text-mono text-[9px] tracking-system text-text-3">
          SB · SUBJECT REGISTRY · {subjectCount} TRACKED
        </p>
      </div>

      {/* Status legend */}
      <div className="absolute top-3 right-4 z-10 flex gap-4">
        {Object.entries(STATUS_COLOR).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            <span className="text-mono text-[8px] tracking-system text-text-3">{status}</span>
          </div>
        ))}
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-hidden
      >
        <RegistryConstellation />
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
