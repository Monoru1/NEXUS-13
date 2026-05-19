import type { Dossier } from '@/types/narrative';

export const KAIROS: Dossier = {
  slug: 'n13-003-kairos',
  code: 'N13-003',
  title: 'KAIROS',
  classification: 'TOP SECRET',
  status: 'REDACTED',
  opened: '2018-03-22T00:00:00Z',

  primarySubject: {
    id: 'kairos',
    codename: 'KAIROS',
    status: 'REDACTED',
    summary: `[REDACTED] // PERSONNEL FILE // ACCESS RESTRICTED TO CTRL-13.4 AND ABOVE. Subject held clearance level 4. Assignment history redacted. Current status: unknown.`,
  },

  relatedSubjects: [],

  summary: `Personnel file. Most content removed by directive 13.4-CTRL. Subject held clearance level 4 — two levels above current user. Assignment history redacted. Operational record redacted. File access restricted to CTRL-13.4 authorisation and above. The fragments that remain suggest the subject was, or is, an internal asset whose existence presents a classification problem.`,

  timeline: [
    {
      id: 'kairos-t1',
      date: '2018-03-22T00:00:00Z',
      title: 'Recruitment — clearance level 2',
      description: `[REDACTED] recruited to NEXUS operations. Standard intake procedure. Initial clearance: level 2. Background verification: passed. Assigned to [REDACTED] division.`,
      evidenceIds: ['kairos-e1'],
    },
    {
      id: 'kairos-t2',
      date: '2019-11-08T00:00:00Z',
      title: 'First documented operation',
      description: `Operation [REDACTED]. Subject role: [REDACTED]. Duration: [REDACTED]. Outcome: classified successful. Post-operation assessment filed under directive 13.4-CTRL. No public record.`,
      evidenceIds: ['kairos-e2'],
    },
    {
      id: 'kairos-t3',
      date: '2021-06-14T00:00:00Z',
      title: 'Reclassification — clearance level 4, file TOP SECRET',
      description: `Dossier upgraded to TOP SECRET. Clearance upgraded from level 2 to level 4. Reason: [REDACTED]. Effective immediately. All prior records retroactively reclassified under directive 13.4-CTRL.`,
      evidenceIds: ['kairos-e3', 'kairos-e4'],
    },
  ],

  evidence: [
    {
      id: 'kairos-e1',
      type: 'document',
      title: 'Personnel intake form — form 17-A',
      date: '2018-03-22T00:00:00Z',
      summary: `Standard recruitment documentation. Majority of fields redacted by directive 13.4-CTRL.`,
      redacted: true,
      content: `NEXUS PERSONNEL INTAKE // FORM 17-A
DATE: 2018-03-22

FULL NAME:            [REDACTED]
DATE OF BIRTH:        [REDACTED]
NATIONALITY:          [REDACTED]
PRIOR CLEARANCE:      [REDACTED]
PRIOR ASSIGNMENTS:    [REDACTED]
RECRUITER:            [REDACTED]
SUPERVISOR:           [REDACTED]
DIVISION:             [REDACTED]

CLEARANCE GRANTED:    LEVEL 2
EFFECTIVE DATE:       2018-03-22
REVIEW DATE:          2021-03-22

NOTES:
[REDACTED]
[REDACTED]
[REDACTED]

AUTHORISED BY: [REDACTED] // CTRL-13.4`,
    },
    {
      id: 'kairos-e2',
      type: 'transcript',
      title: 'Post-operation debrief — 2019-11-08',
      date: '2019-11-08T00:00:00Z',
      summary: `Debrief following first documented operation. Heavily redacted under directive 13.4-CTRL.`,
      redacted: true,
      content: `DEBRIEF SESSION // 2019-11-08
OPERATION: [REDACTED]
SUBJECT CODENAME: KAIROS
INTERVIEWER: [REDACTED]
CLASSIFICATION: TOP SECRET // CTRL-13.4

Q: Describe the contact.
A: [REDACTED]

Q: Was the primary objective achieved?
A: Yes. [REDACTED] as instructed. No deviation from protocol.

Q: Were you observed?
A: [REDACTED]

Q: Condition of the target?
A: [REDACTED]

Q: Do you believe this can be traced back to [REDACTED]?
A: No. [REDACTED] was not present. The [REDACTED] is irrelevant.

Q: Assessment of KAIROS's readiness for level 3 assignments?
A: [REDACTED]

CLASSIFICATION: TOP SECRET
ASSESSMENT: [REDACTED]
FILED BY: [REDACTED]`,
    },
    {
      id: 'kairos-e3',
      type: 'photo',
      title: 'NEXUS access badge — level 4',
      date: '2021-06-14T00:00:00Z',
      summary: `NEXUS clearance badge issued following level 4 upgrade. Identity field redacted.`,
      redacted: true,
      content: `[PHOTO: NEXUS access badge. Black matte finish, gold border indicating level 4 clearance. Name field: REDACTED. Employee number: REDACTED. Photograph: REDACTED (classified). Valid through: 2026-06-14. Badge serial: [REDACTED]. Access zones: ALL // CTRL-13.4 DISCRETION.]`,
    },
    {
      id: 'kairos-e4',
      type: 'document',
      title: 'Clearance upgrade directive',
      date: '2021-06-14T00:00:00Z',
      summary: `Formal authorisation for level 4 clearance and TOP SECRET file reclassification.`,
      redacted: true,
      content: `DIRECTIVE 13.4-CTRL // CLEARANCE UPGRADE
DATE: 2021-06-14

SUBJECT CODENAME: KAIROS
CLEARANCE FROM: LEVEL 2
CLEARANCE TO:   LEVEL 4
REASON:         [REDACTED]
AUTHORISED BY:  [REDACTED]
EFFECTIVE:      2021-06-14

LEVEL 4 ACCESS INCLUDES:
- [REDACTED]
- [REDACTED]
- Full NEXUS database read access
- Full NEXUS database write access (restricted tables: [REDACTED])
- [REDACTED]
- [REDACTED]

ALL PRIOR RECORDS: Retroactively reclassified TOP SECRET // 13.4-CTRL.

NOTE: Subject identity to be treated as CLASSIFIED at level 4. Access to subject identity restricted to CTRL-13.4 and above. Any request for disclosure must be routed through [REDACTED].`,
    },
  ],

  contradictions: [],
};
