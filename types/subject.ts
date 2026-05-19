import type { Subject } from '@/types/narrative';

export type SubjectRecord = Subject & {
  firstObserved: string; // ISO UTC
  relatedDossiers: string[]; // dossier slugs
  aliases?: string[];
};
