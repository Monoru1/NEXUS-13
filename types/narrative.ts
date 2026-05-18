export type Classification = 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
export type DossierStatus = 'OPEN' | 'CLOSED' | 'REDACTED';
export type EvidenceType = 'document' | 'audio' | 'transcript' | 'photo' | 'log';

export type Evidence = {
  id: string;
  type: EvidenceType;
  title: string;
  date: string;
  summary: string;
  redacted?: boolean;
  content?: string;
};

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  evidenceIds: string[];
  contradictionIds?: string[];
};

export type Contradiction = {
  id: string;
  between: [string, string];
  note: string;
};

export type Subject = {
  id: string;
  codename: string;
  status: 'ACTIVE' | 'DECEASED' | 'UNKNOWN' | 'REDACTED';
  summary: string;
};

export type Dossier = {
  slug: string;
  code: string;
  title: string;
  classification: Classification;
  status: DossierStatus;
  opened: string;
  primarySubject: Subject;
  relatedSubjects: Subject[];
  timeline: TimelineEvent[];
  evidence: Evidence[];
  contradictions: Contradiction[];
  summary: string;
};
