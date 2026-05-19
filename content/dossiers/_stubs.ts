import type { Dossier } from '@/types/narrative';

export const VESPER: Dossier = {
  slug: 'n13-002-vesper',
  code: 'N13-002',
  title: 'VESPER',
  classification: 'SECRET',
  status: 'OPEN',
  opened: '2021-03-08T00:00:00Z',
  summary: `Intercepted transmissions on an unregistered frequency. Source unresolved. The band does not appear on any civilian or military allocation chart. Either someone is broadcasting through a gap in the spectrum, or the gap was put there for exactly this purpose.`,
  primarySubject: {
    id: 'subj-vesper',
    codename: 'VESPER',
    status: 'UNKNOWN',
    summary: `Source of transmissions on band 17.3 MHz — a frequency that does not exist on any registered spectrum allocation. Identity unknown. May be a person, may be an automated system, may be neither.`,
  },
  relatedSubjects: [
    {
      id: 'subj-relay-delta',
      codename: 'RELAY-DELTA',
      status: 'UNKNOWN',
      summary: `Suspected relay node for VESPER transmissions. Geolocated to approximate 200km radius in northern Baltic. No physical identification possible.`,
    },
  ],
  timeline: [
    {
      id: 'vesper-ev-01',
      date: '2021-03-08T02:17:00Z',
      title: 'First intercept — band 17.3 MHz',
      description: `Routine sweep picks up structured transmission on a frequency not listed in ITU allocation tables. Signal has internal structure consistent with encoded data. Duration 4 minutes 11 seconds. Not repeated.`,
      evidenceIds: ['vesper-evid-01'],
    },
    {
      id: 'vesper-ev-02',
      date: '2022-11-19T02:17:00Z',
      title: 'Second intercept — same frequency, same timestamp',
      description: `Seventeen months later, an identical transmission on the same band, at precisely the same time of night. Same duration. Different content. The timestamp repetition was not accidental.`,
      evidenceIds: ['vesper-evid-02'],
      contradictionIds: ['vesper-contra-01'],
    },
  ],
  evidence: [
    { id: 'vesper-evid-01', type: 'audio', title: 'Intercept 2021-03-08', date: '2021-03-08T02:17:00Z', summary: 'First recorded transmission. Content decoded to 34%.', redacted: false },
    { id: 'vesper-evid-02', type: 'audio', title: 'Intercept 2022-11-19', date: '2022-11-19T02:17:00Z', summary: 'Second transmission. Same frequency. Different content. Same length.', redacted: false },
  ],
  contradictions: [
    { id: 'vesper-contra-01', between: ['vesper-ev-01', 'vesper-ev-02'], note: `A non-automated source would not transmit at identical intervals across seventeen months. An automated source would not vary content. The transmission is simultaneously both and neither.` },
  ],
};

export const KAIROS: Dossier = {
  slug: 'n13-003-kairos',
  code: 'N13-003',
  title: 'KAIROS',
  classification: 'TOP SECRET',
  status: 'REDACTED',
  opened: '2018-11-01T00:00:00Z',
  summary: `Personnel file. Most content removed under directive 13.4-CTRL. The fragments that survive suggest the subject was, or is, an internal asset. Whether past or present tense is the correct frame is itself classified.`,
  primarySubject: {
    id: 'subj-kairos',
    codename: 'KAIROS',
    status: 'REDACTED',
    summary: `Internal asset, designation and role redacted. The file structure implies someone inside the agency created this dossier about themselves, or about someone too close to the agency to be filed under standard procedure.`,
  },
  relatedSubjects: [],
  timeline: [
    {
      id: 'kairos-ev-01',
      date: '2018-11-01T00:00:00Z',
      title: 'File opened — authorising officer: [REDACTED]',
      description: `[CONTENT REDACTED // 13.4-CTRL]`,
      evidenceIds: ['kairos-evid-01'],
    },
  ],
  evidence: [
    { id: 'kairos-evid-01', type: 'document', title: '[REDACTED]', date: '2018-11-01T00:00:00Z', summary: '[CONTENT REDACTED // 13.4-CTRL]', redacted: true },
  ],
  contradictions: [],
};

export const MERIDIAN: Dossier = {
  slug: 'n13-004-meridian',
  code: 'N13-004',
  title: 'MERIDIAN',
  classification: 'SECRET',
  status: 'CLOSED',
  opened: '2017-06-14T00:00:00Z',
  summary: `Case officially closed January 2023 by order of review board. An anonymous query re-opened it in the internal audit log on 2024-08-14. No authorising officer is logged. The case is simultaneously closed and open, depending on which system you query.`,
  primarySubject: {
    id: 'subj-meridian',
    codename: 'MERIDIAN',
    status: 'UNKNOWN',
    summary: `Subject of a six-year investigation closed without public resolution. The case closure documentation runs to four pages. Cases of this scope typically run to several hundred. The brevity is the anomaly.`,
  },
  relatedSubjects: [
    {
      id: 'subj-anchor',
      codename: 'ANCHOR',
      status: 'DECEASED',
      summary: `Witness in the MERIDIAN investigation. Died 2022-09-17 before formal deposition was recorded. Cause of death: uncontested.`,
    },
  ],
  timeline: [
    {
      id: 'meridian-ev-01',
      date: '2017-06-14T00:00:00Z',
      title: 'Investigation opened',
      description: `File opened on referral from a third party whose identity is withheld. Nature of referral: undisclosed.`,
      evidenceIds: ['meridian-evid-01'],
    },
    {
      id: 'meridian-ev-02',
      date: '2023-01-30T00:00:00Z',
      title: 'Case closed — review board order',
      description: `Formally closed. Four-page closure document. No appeal registered.`,
      evidenceIds: ['meridian-evid-02'],
    },
    {
      id: 'meridian-ev-03',
      date: '2024-08-14T00:00:00Z',
      title: 'Audit log: anonymous re-opening query',
      description: `System log records a re-opening query against this file. No operator credential attached. The query succeeded. The case is now open again in the audit system while remaining formally closed in the case management system.`,
      evidenceIds: [],
      contradictionIds: ['meridian-contra-01'],
    },
  ],
  evidence: [
    { id: 'meridian-evid-01', type: 'document', title: 'Case opening referral', date: '2017-06-14T00:00:00Z', summary: 'Referral document. Source identity withheld.', redacted: false },
    { id: 'meridian-evid-02', type: 'document', title: 'Closure order', date: '2023-01-30T00:00:00Z', summary: '4-page closure document. Anomalously brief for a 6-year investigation.', redacted: false },
  ],
  contradictions: [
    { id: 'meridian-contra-01', between: ['meridian-ev-02', 'meridian-ev-03'], note: `The case is simultaneously closed (case management system) and open (audit log). Neither system has been corrected. This may be an error. It may not be.` },
  ],
};
