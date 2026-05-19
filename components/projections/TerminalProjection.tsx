'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const SIGNAL = '#c5ff3c';

function TorusKnotSystem() {
  const knotRef = useRef<THREE.Mesh>(null);
  const knotInnerRef = useRef<THREE.Mesh>(null);
  const particleRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const PARTICLE_COUNT = 80;

  // Particles that travel along the torus knot path
  const particleData = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      t: i / PARTICLE_COUNT,
      speed: 0.15 + Math.random() * 0.15,
      offset: Math.random() * 0.03,
    }));
  }, []);

  const particlePositions = useMemo(
    () => new Float32Array(PARTICLE_COUNT * 3),
    [],
  );

  const particleBuffer = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    return geo;
  }, [particlePositions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.07;
      groupRef.current.rotation.y = t * 0.11;
    }

    if (knotRef.current) {
      (knotRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.2 + Math.abs(Math.sin(t * 0.3)) * 0.08;
    }

    if (knotInnerRef.current) {
      knotInnerRef.current.rotation.z = t * 0.4;
      (knotInnerRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.abs(Math.sin(t * 0.5)) * 0.06;
    }

    // Update particle positions along torus knot parametric curve
    // Torus knot: p=2, q=3 (trefoil-like)
    if (particleRef.current) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const data = particleData[i]!;
        const u = ((data.t + t * data.speed * 0.04) % 1.0) * Math.PI * 2;
        const p = 2;
        const q = 3;
        const r = 1.4;
        const tube = 0.45;

        const cu = Math.cos(u);
        const su = Math.sin(u);
        const quOverP = (q / p) * u;
        const cs = Math.cos(quOverP);
        const x = r * (2 + cs) * 0.5 * cu + data.offset;
        const y = r * (2 + cs) * 0.5 * su;
        const z = r * Math.sin(quOverP) * 0.5;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;
      }
      (particleRef.current.geometry as THREE.BufferGeometry)
        .attributes['position']!.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Torus knot wireframe */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 12, 2, 3]} />
        <meshBasicMaterial color={SIGNAL} wireframe transparent opacity={0.25} />
      </mesh>

      {/* Inner smaller torus knot */}
      <mesh ref={knotInnerRef}>
        <torusKnotGeometry args={[0.7, 0.18, 64, 8, 2, 3]} />
        <meshBasicMaterial color={SIGNAL} wireframe transparent opacity={0.12} />
      </mesh>

      {/* Flowing particles */}
      <points ref={particleRef} geometry={particleBuffer}>
        <pointsMaterial color={SIGNAL} size={0.05} transparent opacity={0.8} />
      </points>

      {/* Central marker */}
      <CentralPulse />
    </group>
  );
}

function CentralPulse() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 1.2) * 0.3;
    ref.current.scale.setScalar(scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.1 + Math.abs(Math.sin(t * 0.9)) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color={SIGNAL} wireframe transparent opacity={0.15} />
    </mesh>
  );
}

export function TerminalProjection() {
  return (
    <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-void-0">
      {/* Label */}
      <div className="absolute top-3 left-4 z-10">
        <p className="text-mono text-[9px] tracking-system text-text-3">
          TR · AGENCY SHELL · NEXUS-CTRL v13.4
        </p>
      </div>

      {/* Command count */}
      <div className="absolute top-3 right-4 z-10">
        <p className="text-mono text-[9px] tracking-system text-signal opacity-70">
          8 + 3 HIDDEN COMMANDS
        </p>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-5 left-4 z-10">
        <p className="text-mono text-[8px] tracking-system text-text-3 opacity-40">
          TYPE <span className="text-signal">HELP</span> TO INITIALIZE SESSION
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-hidden
      >
        <TorusKnotSystem />
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
