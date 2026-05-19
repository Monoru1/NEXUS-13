import { SUBJECTS } from '@/content/subjects/index';
import type { SubjectRecord } from '@/types/subject';
import type { Subject } from '@/types/narrative';

export function getAllSubjects(): SubjectRecord[] {
  return SUBJECTS;
}

export function getSubjectById(id: string): SubjectRecord | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getSubjectsByStatus(status: Subject['status']): SubjectRecord[] {
  return SUBJECTS.filter((s) => s.status === status);
}

export function getSubjectsForDossier(slug: string): SubjectRecord[] {
  return SUBJECTS.filter((s) => s.relatedDossiers.includes(slug));
}
