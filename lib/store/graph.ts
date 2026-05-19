import { create } from 'zustand';

type GraphStore = {
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  cameraTarget: [number, number, number] | null;
  hover: (id: string | null) => void;
  select: (id: string | null) => void;
  jumpTo: (id: string, position: [number, number, number]) => void;
  clear: () => void;
};

export const useGraphStore = create<GraphStore>((set) => ({
  hoveredNodeId: null,
  selectedNodeId: null,
  cameraTarget: null,
  hover: (id) => set({ hoveredNodeId: id }),
  select: (id) =>
    set((s) => ({ selectedNodeId: s.selectedNodeId === id ? null : id, cameraTarget: null })),
  jumpTo: (id, position) => set({ selectedNodeId: id, cameraTarget: position }),
  clear: () => set({ hoveredNodeId: null, selectedNodeId: null, cameraTarget: null }),
}));
