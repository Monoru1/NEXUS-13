import { create } from 'zustand';

type GraphStore = {
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  hover: (id: string | null) => void;
  select: (id: string | null) => void;
  clear: () => void;
};

export const useGraphStore = create<GraphStore>((set) => ({
  hoveredNodeId: null,
  selectedNodeId: null,
  hover: (id) => set({ hoveredNodeId: id }),
  select: (id) => set((s) => ({ selectedNodeId: s.selectedNodeId === id ? null : id })),
  clear: () => set({ hoveredNodeId: null, selectedNodeId: null }),
}));
