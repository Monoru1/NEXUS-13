'use client';

import { useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { GraphNode } from '@/lib/graph/topology';
import { useGraphStore } from '@/lib/store/graph';

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#c5ff3c',
  DECEASED: '#56565a',
  UNKNOWN: '#ff3636',
  REDACTED: '#ff3636',
  OPEN: '#5bc0eb',
  CLOSED: '#56565a',
};

function resolveColor(node: GraphNode): string {
  if (node.type === 'dossier') return '#5bc0eb';
  return STATUS_COLOR[node.status] ?? '#f4f4f2';
}

type NodeProps = {
  node: GraphNode;
  onClick: (id: string) => void;
};

export function Node({ node, onClick }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { hoveredNodeId, selectedNodeId, hover } = useGraphStore();
  const { camera } = useThree();

  const isHovered = hoveredNodeId === node.id;
  const isSelected = selectedNodeId === node.id;
  const isActive = isHovered || isSelected;

  const color = resolveColor(node);
  const radius = node.type === 'dossier' ? 0.24 : 0.14;
  const targetScale = isActive ? 1.15 : 1.0;

  useFrame(() => {
    if (!meshRef.current) return;
    const s = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(s + (targetScale - s) * 0.12);
  });

  const camDist = camera.position.distanceTo(
    new THREE.Vector3(...node.position),
  );
  const showLabel = isActive || camDist < 6;

  const handlePointerOver = useCallback(() => hover(node.id), [hover, node.id]);
  const handlePointerOut = useCallback(() => hover(null), [hover]);
  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onClick(node.id);
    },
    [onClick, node.id],
  );

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : 0.2}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {showLabel && (
        <Html
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none' }}
          zIndexRange={[0, 10]}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10px',
              letterSpacing: '0.08em',
              color: color,
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              marginTop: node.type === 'dossier' ? '-28px' : '-22px',
              textShadow: `0 0 8px ${color}66`,
              opacity: isActive ? 1 : 0.7,
            }}
          >
            {node.codename}
          </div>
        </Html>
      )}
    </group>
  );
}
