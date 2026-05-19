'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const CIPHER = '#5bc0eb';

function SignalWaveform() {
  const waveRef = useRef<THREE.Points>(null);
  const particleTrailRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const WAVE_POINTS = 180;
  const TRAIL_POINTS = 40;

  const waveGeom = useMemo(() => {
    const positions = new Float32Array(WAVE_POINTS * 3);
    return positions;
  }, []);

  const trailGeom = useMemo(() => {
    const positions = new Float32Array(TRAIL_POINTS * 3);
    return positions;
  }, []);

  const wavePositions = useRef(waveGeom);
  const trailPositions = useRef(trailGeom);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Animate wave
    if (waveRef.current) {
      const positions = wavePositions.current;
      for (let i = 0; i < WAVE_POINTS; i++) {
        const x = (i / WAVE_POINTS - 0.5) * 7.0;
        // Composite waveform: base + modulated carrier + noise-like interference
        const carrier = Math.sin(x * 3.5 + t * 1.8) * 0.5;
        const envelope = Math.exp(-Math.abs(x) * 0.3);
        const burst = Math.sin(x * 1.2 + t * 0.6) * 0.25 * envelope;
        const anomaly = x > 1 && x < 2.5 ? Math.sin(x * 12 + t * 4) * 0.2 : 0;
        const y = (carrier + burst + anomaly) * envelope;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;
      }
      (waveRef.current.geometry as THREE.BufferGeometry)
        .attributes['position']!.needsUpdate = true;
    }

    // Animate scanning particle trail
    if (particleTrailRef.current) {
      const positions = trailPositions.current;
      const scanX = ((t * 0.6) % 1.0 - 0.5) * 7.0;
      for (let i = 0; i < TRAIL_POINTS; i++) {
        const lag = (i / TRAIL_POINTS) * 0.8;
        const x = scanX - lag * 0.5;
        const carrierA = Math.sin(x * 3.5 + (t - lag) * 1.8) * 0.5;
        const envelopeA = Math.exp(-Math.abs(x) * 0.3);
        const burstA = Math.sin(x * 1.2 + (t - lag) * 0.6) * 0.25 * envelopeA;
        const y = (carrierA + burstA) * envelopeA;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;
      }
      (particleTrailRef.current.geometry as THREE.BufferGeometry)
        .attributes['position']!.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.08;
    }
  });

  const waveBuffer = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(wavePositions.current, 3));
    return geo;
  }, []);

  const trailBuffer = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(trailPositions.current, 3));
    return geo;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main waveform */}
      <points ref={waveRef} geometry={waveBuffer}>
        <pointsMaterial color={CIPHER} size={0.04} transparent opacity={0.6} />
      </points>

      {/* Scanning trail — brighter */}
      <points ref={particleTrailRef} geometry={trailBuffer}>
        <pointsMaterial color="#ffffff" size={0.06} transparent opacity={0.85} />
      </points>

      {/* Anomaly zone markers */}
      <AnomalyMarker x={1.75} />
      <AnomalyMarker x={-2.1} />

      {/* Horizontal baseline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[7.2, 0.005, 0.005]} />
        <meshBasicMaterial color={CIPHER} transparent opacity={0.15} />
      </mesh>

      {/* Frequency bands */}
      {[-0.8, -0.4, 0.4, 0.8].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[7.2, 0.003, 0.003]} />
          <meshBasicMaterial color={CIPHER} transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  );
}

function AnomalyMarker({ x }: { x: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.3 + Math.abs(Math.sin(t * 1.5 + x)) * 0.5;
  });

  return (
    <group position={[x, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.004, 1.4, 0.004]} />
        <meshBasicMaterial color="#ffb020" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ref} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshBasicMaterial color="#ffb020" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export function TransmissionsProjection({ transmissionCount = 8, anomalousCount = 2 }: {
  transmissionCount?: number;
  anomalousCount?: number;
}) {
  return (
    <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-void-0">
      {/* Label */}
      <div className="absolute top-3 left-4 z-10">
        <p className="text-mono text-[9px] tracking-system text-text-3">
          TX · SIGNAL INTERCEPT · {transmissionCount} TRANSMISSIONS
        </p>
      </div>

      {/* Anomaly count */}
      <div className="absolute top-3 right-4 z-10 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-warn opacity-70" />
          <span className="text-mono text-[9px] tracking-system text-warn">
            {anomalousCount} ANOMALOUS
          </span>
        </div>
      </div>

      {/* Frequency band label */}
      <div className="absolute bottom-5 left-4 z-10">
        <p className="text-mono text-[8px] tracking-system text-text-3 opacity-50">
          BAND · 17.3 MHz → 44.6 GHz · UNDEFINED RANGE DETECTED
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-hidden
      >
        <SignalWaveform />
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
