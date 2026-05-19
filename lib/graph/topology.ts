import { ARIADNE } from '@/content/dossiers/n13-001-ariadne';
import { VESPER, KAIROS, MERIDIAN } from '@/content/dossiers/_stubs';
import type { Dossier } from '@/types/narrative';

export type GraphNode = {
  id: string;
  codename: string;
  type: 'subject' | 'dossier';
  status: string;
  summary: string;
  position: [number, number, number];
};

export type EdgeKind = 'primary' | 'related' | 'contradiction' | 'mention';

export type GraphEdge = {
  from: string;
  to: string;
  kind: EdgeKind;
  weight: number;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

const ALL_DOSSIERS: Dossier[] = [ARIADNE, VESPER, KAIROS, MERIDIAN];

// ── Fibonacci sphere layout ───────────────────────────────────────────────
// Places n points uniformly on a sphere of radius r.
function fibonacciSphere(n: number, radius: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // -1 to 1
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions.push([r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius]);
  }
  return positions;
}

export function buildGraph(): Graph {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();

  // Collect all unique subjects across all dossiers
  const subjectEntries: { id: string; codename: string; status: string; summary: string }[] = [];
  for (const dossier of ALL_DOSSIERS) {
    for (const s of [dossier.primarySubject, ...dossier.relatedSubjects]) {
      if (!seen.has(s.id)) {
        seen.add(s.id);
        subjectEntries.push({ id: s.id, codename: s.codename, status: s.status, summary: s.summary });
      }
    }
  }

  // Total nodes: subjects + dossiers
  const total = subjectEntries.length + ALL_DOSSIERS.length;
  const positions = fibonacciSphere(total, 3.2);
  let posIdx = 0;

  // Subject nodes — inner sphere (tighter radius)
  const subjectPositions = fibonacciSphere(subjectEntries.length, 2.4);
  for (let i = 0; i < subjectEntries.length; i++) {
    const s = subjectEntries[i]!;
    nodes.push({
      id: s.id,
      codename: s.codename,
      type: 'subject',
      status: s.status,
      summary: s.summary,
      position: subjectPositions[i] ?? [0, 0, 0],
    });
  }
  posIdx = subjectEntries.length;

  // Dossier nodes — outer ring
  const dossierPositions = fibonacciSphere(ALL_DOSSIERS.length, 4.5);
  for (let i = 0; i < ALL_DOSSIERS.length; i++) {
    const d = ALL_DOSSIERS[i]!;
    nodes.push({
      id: d.slug,
      codename: d.code,
      type: 'dossier',
      status: d.status,
      summary: d.summary.split('\n\n')[0] ?? d.summary,
      position: dossierPositions[i] ?? [posIdx, 0, 0],
    });
    posIdx++;

    // Primary subject → dossier edge
    edges.push({
      from: d.primarySubject.id,
      to: d.slug,
      kind: 'primary',
      weight: 1.0,
    });

    // Related subjects → dossier edges
    for (const related of d.relatedSubjects) {
      edges.push({
        from: related.id,
        to: d.slug,
        kind: 'related',
        weight: 0.6,
      });
    }

    // Contradiction edges (between timeline events that share contradiction IDs)
    // Represented as subject ↔ dossier mention edge for visual weight
    if (d.contradictions.length > 0) {
      edges.push({
        from: d.primarySubject.id,
        to: d.slug,
        kind: 'contradiction',
        weight: 0.8,
      });
    }
  }

  // Cross-dossier mention edges: LOOM filed ARIADNE's death report → links to MERIDIAN
  // (both involve cases that were officially closed then questioned)
  // This adds visual interest across the 4 dossiers
  edges.push({ from: ARIADNE.slug, to: MERIDIAN.slug, kind: 'mention', weight: 0.3 });
  edges.push({ from: VESPER.slug, to: KAIROS.slug, kind: 'mention', weight: 0.3 });

  // De-duplicate edges (keep highest weight for same from-to pair)
  const edgeMap = new Map<string, GraphEdge>();
  for (const e of edges) {
    const key = [e.from, e.to].sort().join('|');
    const existing = edgeMap.get(key);
    if (!existing || e.weight > existing.weight) {
      edgeMap.set(key, e);
    }
  }

  return { nodes, edges: Array.from(edgeMap.values()) };
}
