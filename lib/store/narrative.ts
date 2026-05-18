import { create } from 'zustand';
import { nsGet, nsSet } from '@/lib/persistence/indexed-db';

const PERSIST_KEY = 'narrative-state';

type NarrativeState = {
  clearance: number;
  viewedEvidence: Set<string>;
  flaggedContradictions: Set<string>;
  hydrated: boolean;
};

type NarrativeActions = {
  viewEvidence: (id: string) => void;
  flagContradiction: (id: string) => void;
  _hydrate: () => Promise<void>;
};

type PersistedShape = {
  clearance: number;
  viewedEvidence: string[];
  flaggedContradictions: string[];
};

export const useNarrativeStore = create<NarrativeState & NarrativeActions>((set, get) => ({
  clearance: 2,
  viewedEvidence: new Set(),
  flaggedContradictions: new Set(),
  hydrated: false,

  viewEvidence(id) {
    const next = new Set(get().viewedEvidence);
    next.add(id);
    set({ viewedEvidence: next });
    void _persist(get());
  },

  flagContradiction(id) {
    const next = new Set(get().flaggedContradictions);
    next.add(id);
    set({ flaggedContradictions: next });
    void _persist(get());
  },

  async _hydrate() {
    try {
      const saved = await nsGet<PersistedShape>(PERSIST_KEY);
      if (saved) {
        set({
          clearance: saved.clearance,
          viewedEvidence: new Set(saved.viewedEvidence),
          flaggedContradictions: new Set(saved.flaggedContradictions),
        });
      }
    } finally {
      set({ hydrated: true });
    }
  },
}));

async function _persist(state: NarrativeState): Promise<void> {
  const shape: PersistedShape = {
    clearance: state.clearance,
    viewedEvidence: Array.from(state.viewedEvidence),
    flaggedContradictions: Array.from(state.flaggedContradictions),
  };
  await nsSet(PERSIST_KEY, shape);
}
