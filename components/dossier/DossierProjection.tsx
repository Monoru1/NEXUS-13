'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import type { Dossier } from '@/types/narrative';

type Props = { dossier: Dossier };

const CLASSIFICATION_COLOR: Record<string, string> = {
  'TOP SECRET': '#ff3636',
  SECRET: '#ffb020',
  CONFIDENTIAL: '#5bc0eb',
  UNCLASSIFIED: '#56565a',
};

function WireframeCube({ dossier }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const color = CLASSIFICATION_COLOR[dossier.classification] ?? '#ffb020';

  // Inner orbiting particles — represent data nodes
  const particleCount = Math.min(
    dossier.timeline.length + dossier.evidence.length + dossier.contradictions.length,
    12,
  );

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      return {
        x: Math.cos(theta) * Math.sin(phi) * 1.6,
        y: Math.sin(theta) * Math.sin(phi) * 1.6,
        z: Math.cos(phi) * 1.6,
        phaseOffset: (i / particleCount) * Math.PI * 2,
      };
    });
  }, [particleCount]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Slow, meditative rotation
    groupRef.current.rotation.x = t * 0.06;
    groupRef.current.rotation.y = t * 0.10;
    groupRef.current.rotation.z = t * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Main wireframe cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial
          wireframe
          color={color}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Second cube — rotated 45° on Y, slightly smaller, dimmer */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial
          wireframe
          color={color}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Orbiting data points */}
      {particles.map((p, i) => (
        <DataPoint key={i} {...p} color={color} />
      ))}

      {/* Center — pulsing core */}
      <CorePulse color={color} />
    </group>
  );
}

function DataPoint({
  x, y, z, phaseOffset, color,
}: {
  x: number; y: number; z: number; phaseOffset: number; color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Each point orbits slightly
    const wobble = Math.sin(t * 0.4 + phaseOffset) * 0.08;
    ref.current.scale.setScalar(0.6 + wobble);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.3 + Math.abs(Math.sin(t * 0.3 + phaseOffset)) * 0.4;
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

function CorePulse({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 0.7) * 0.15;
    ref.current.scale.setScalar(scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.1 + Math.abs(Math.sin(t * 0.7)) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
    </mesh>
  );
}

export function DossierProjection({ dossier }: Props) {
  const color = CLASSIFICATION_COLOR[dossier.classification] ?? '#ffb020';

  return (
    <div className="hidden lg:block border border-void-4 bg-void-1 relative overflow-hidden">
      {/* Header label */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <p className="text-mono text-[9px] tracking-system text-text-3">
          DOSSIER PROJECTION
        </p>
        <p className="text-mono text-[9px] tracking-system" style={{ color }}>
          {dossier.classification}
        </p>
      </div>

      {/* Three.js canvas */}
      <div className="h-52 w-full">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          aria-hidden
        >
          <WireframeCube dossier={dossier} />
        </Canvas>
      </div>

      {/* Footer stats */}
      <div className="px-4 pb-3 grid grid-cols-3 gap-2 border-t border-void-4 pt-2">
        {[
          { label: 'EVENTS', value: dossier.timeline.length },
          { label: 'EVIDENCE', value: dossier.evidence.length },
          { label: 'CONTRADICT', value: dossier.contradictions.length },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-mono tabular-nums text-[14px] font-medium" style={{ color }}>
              {stat.value}
            </div>
            <div className="text-mono text-[8px] tracking-system text-text-3">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scanline overlay for cohesion with the rest of the UI */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.008) 3px, transparent 4px)',
        }}
        aria-hidden
      />
    </div>
  );
}
