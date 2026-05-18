import type { Dossier } from '@/types/narrative';

export const ARIADNE: Dossier = {
  slug: 'n13-001-ariadne',
  code: 'N13-001',
  title: 'ARIADNE',
  classification: 'SECRET',
  status: 'OPEN',
  opened: '2019-04-12T00:00:00Z',

  summary: `Operational file opened following the reported death of primary subject on 2019-04-11. Cause of death recorded as accidental drowning, Bosporus strait, Istanbul. Body recovered, identified by dental comparison, cremated at the request of next of kin — a relative the agency has no prior record of.

Fourteen months later, a signals intercept in Tallinn placed the subject's voice signature at 94.7% confidence in a background recording at the Estonian Foreign Intelligence Service. The file was not closed. It was not escalated. It was left open, which the agency never does by accident.`,

  primarySubject: {
    id: 'subj-ariadne',
    codename: 'ARIADNE',
    status: 'UNKNOWN',
    summary: `Former signals analyst, NATO secondment 2014-2017. Resigned under undisclosed terms. Reported deceased April 2019, Istanbul. Three confirmed acoustic matches to living subjects in 2020, 2022, and 2024. Facial recognition returns 0 matches — consistent with surgical alteration or dataset poisoning.`,
  },

  relatedSubjects: [
    {
      id: 'subj-loom',
      codename: 'LOOM',
      status: 'ACTIVE',
      summary: `The officer who signed the Istanbul death report. Transferred to a post in Tbilisi four days after filing. Has not responded to internal correspondence since Q3 2019. Salary continues to be deposited.`,
    },
    {
      id: 'subj-cartwright',
      codename: 'CARTWRIGHT',
      status: 'DECEASED',
      summary: `Independent forensic pathologist contracted to verify dental comparison. Died 2020-02-03, ruled cardiac event. No autopsy was requested. He was 41.`,
    },
  ],

  timeline: [
    {
      id: 'ev-death-report',
      date: '2019-04-11T03:14:22Z',
      title: 'Death reported — Istanbul, Bosporus strait',
      description: `Turkish maritime police recovered a body from the Bosporus at 03:14 local time. Subject's identification documents were present. The current assigned to the strait runs south at approximately 4 knots at that hour; the body was found 200 metres north of where it entered the water, which is hydrodynamically inconsistent with the reported entry point. LOOM filed the death report from Ankara that same morning. He was not in Istanbul.`,
      evidenceIds: ['evid-police-report', 'evid-currents-analysis'],
    },
    {
      id: 'ev-cremation',
      date: '2019-04-14T11:00:00Z',
      title: 'Cremation authorised — 72-hour accelerated process',
      description: `Turkish law requires a 30-day waiting period for foreign nationals before cremation can proceed without consular review. This waiting period was waived under a provision last used in 1987. The authorising official is listed as "ADMIN-CTRL". No such designation appears in the Turkish Interior Ministry's published directory. Ashes were collected by a woman giving her name as Elena Vasic; no record of this person exists in any government database we have access to.`,
      evidenceIds: ['evid-cremation-auth', 'evid-vasic-cctv'],
      contradictionIds: ['contra-001'],
    },
    {
      id: 'ev-tallinn-intercept',
      date: '2020-06-17T14:32:00Z',
      title: 'Voice match — Tallinn, Estonian FIS facility',
      description: `A routine signals sweep of communications adjacent to the Estonian Foreign Intelligence Service headquarters picked up a voice on a non-secure frequency. The speaker was discussing meeting logistics in English with a slight mid-Atlantic accent. The NEXUS acoustic analysis pipeline returned a 94.7% match to the subject's archived voice samples from her NATO secondment period. The recording lasted eleven seconds. The frequency was not logged again.`,
      evidenceIds: ['evid-tallinn-recording', 'evid-acoustic-report'],
      contradictionIds: ['contra-001'],
    },
    {
      id: 'ev-bratislava-photo',
      date: '2022-09-04T09:18:00Z',
      title: 'Possible sighting — Bratislava, old town',
      description: `A contact in Slovak intelligence forwarded a photograph taken by their surveillance team targeting an unrelated subject. In the background, partially occluded by a newspaper kiosk, is a woman matching the subject's pre-death physical profile. Gait analysis software returns 81% confidence — above threshold for person-of-interest flagging, below threshold for positive identification. The contact has since retired. The original surveillance file has been transferred to an archive not accessible through standard channels.`,
      evidenceIds: ['evid-bratislava-photo', 'evid-gait-analysis'],
    },
    {
      id: 'ev-london-signal',
      date: '2024-03-22T22:00:00Z',
      title: 'Encrypted transmission — London, attributed origin',
      description: `A transmission using an encryption schema that matches the subject's known personal cipher preferences was intercepted on a civilian radio band in the London area. The content could not be decrypted with available keys. The transmission lasted 43 seconds and included a header string identical to one used by the subject during her NATO posting in 2016. The header should not be known outside a group of seven individuals, six of whom are accounted for. The seventh is the subject.`,
      evidenceIds: ['evid-london-transmission', 'evid-cipher-match'],
      contradictionIds: ['contra-002'],
    },
  ],

  evidence: [
    {
      id: 'evid-police-report',
      type: 'document',
      title: 'Turkish Maritime Police — Incident Report No. 2019-BOS-0441',
      date: '2019-04-11T06:00:00Z',
      summary: `Official incident report. Entry point coordinates do not match recovery coordinates given known Bosporus current patterns for the date and time. Discrepancy noted in internal review; review was subsequently closed without explanation.`,
      redacted: false,
    },
    {
      id: 'evid-currents-analysis',
      type: 'document',
      title: 'Hydrodynamic drift analysis — Bosporus, April 2019',
      date: '2019-05-03T00:00:00Z',
      summary: `Commissioned analysis from the agency's maritime unit. Conclusion: at the recorded entry point and time, a body of the subject's mass would have been carried approximately 1.4 kilometres south, not 200 metres north. The analyst's name has been redacted from this copy of the report.`,
      redacted: false,
      content: `Mean southward current velocity at recorded coordinates (41.028N, 28.974E) on 2019-04-11 between 02:00-04:00Z: 3.8 knots. Projected drift over 90-minute window from reported entry: 8.55 km south. Actual recovery location is 0.2 km north of stated entry point. Probability of natural drift producing observed result: less than 0.3%.`,
    },
    {
      id: 'evid-cremation-auth',
      type: 'document',
      title: 'Cremation authorisation — Interior Ministry waiver',
      date: '2019-04-13T00:00:00Z',
      summary: `The waiver document authorising accelerated cremation. The authorising designation "ADMIN-CTRL" does not correspond to any published ministry role. Document metadata shows it was created on a machine with a hostname registered to a server farm in Luxembourg.`,
      redacted: true,
    },
    {
      id: 'evid-vasic-cctv',
      type: 'photo',
      title: 'CCTV capture — crematorium reception, Istanbul',
      date: '2019-04-14T11:22:00Z',
      summary: `Single frame from crematorium reception CCTV. The woman identifying herself as Elena Vasic. Face partially obscured by collar. No match returned by facial recognition against any known database. Image resolution is consistent with deliberate positioning relative to the camera.`,
      redacted: false,
    },
    {
      id: 'evid-tallinn-recording',
      type: 'audio',
      title: 'Acoustic intercept — frequency 156.8 MHz, Tallinn',
      date: '2020-06-17T14:32:00Z',
      summary: `Eleven-second audio fragment. Speaker discusses logistics in English. Background noise consistent with indoor environment. Acoustic fingerprint matches archived samples at 94.7% confidence. Audio classified SECRET upon receipt; this summary is the only portion of the file outside secure compartment.`,
      redacted: false,
    },
    {
      id: 'evid-acoustic-report',
      type: 'document',
      title: 'Acoustic Analysis — NEXUS-AA-2020-0044',
      date: '2020-06-24T00:00:00Z',
      summary: `Formal acoustic analysis report. Match confidence: 94.7%. Threshold for positive ID in field operations: 92%. The report recommends escalation. No escalation was initiated. The analyst who prepared the report transferred to a different division seven days later.`,
      redacted: false,
    },
    {
      id: 'evid-bratislava-photo',
      type: 'photo',
      title: 'Surveillance photograph — Bratislava, Stare Mesto',
      date: '2022-09-04T09:18:00Z',
      summary: `Background figure in a Slovak intelligence surveillance photograph. The primary surveillance target is unrelated to this file. The figure is partially occluded; full biometric analysis is not possible. Gait analysis confidence: 81%. The photograph was forwarded informally and is not formally logged in the Slovak system.`,
      redacted: false,
    },
    {
      id: 'evid-gait-analysis',
      type: 'document',
      title: 'Gait Analysis Report — NEXUS-GA-2022-0019',
      date: '2022-09-14T00:00:00Z',
      summary: `Biometric gait comparison against subject's archived movement data from NATO facility footage, 2015-2017. Confidence: 81%. Below formal identification threshold. Above person-of-interest threshold. No action was taken.`,
      redacted: false,
    },
    {
      id: 'evid-london-transmission',
      type: 'audio',
      title: 'Encrypted transmission — 27.185 MHz, Greater London area',
      date: '2024-03-22T22:00:00Z',
      summary: `Forty-three second encrypted transmission on civilian HF band. Header string matches format used exclusively by subject during NATO posting 2016. Content unreadable without key. Source triangulated to a radius of approximately 4 kilometres centred on Marylebone. No follow-up signal detected.`,
      redacted: false,
    },
    {
      id: 'evid-cipher-match',
      type: 'log',
      title: 'Cipher schema comparison — NEXUS-CS-2024-0007',
      date: '2024-03-23T09:00:00Z',
      summary: `Technical comparison of transmission encryption schema against known subject cipher preferences. Match on structural parameters: 7/7. Match on header formatting: confirmed. The specific header format was generated by a tool the subject wrote herself and never formally shared with the agency. How it persists is unknown.`,
      redacted: false,
      content: `CIPHER SCHEMA COMPARISON LOG
File: NEXUS-CS-2024-0007
Date: 2024-03-23T09:00:00Z
Analyst: [REDACTED // 13.4-CTRL]

Parameter 1 - Block structure: MATCH
Parameter 2 - IV generation method: MATCH
Parameter 3 - Key schedule variant: MATCH
Parameter 4 - Header format (field 1): MATCH
Parameter 5 - Header format (field 2): MATCH
Parameter 6 - Padding scheme: MATCH
Parameter 7 - Terminator signature: MATCH

Probability of independent convergence on all 7 parameters: less than 0.001%

Note: Header string format is not documented in any agency technical
specification. Its existence as operational procedure was known only to
the subject and, presumably, the author of the original encryption tool.
Subject claimed to have deleted the tool in 2017.

Recommendation: [REDACTED // 13.4-CTRL]`,
    },
    {
      id: 'evid-dental-comparison',
      type: 'document',
      title: 'Forensic dental comparison — Dr. A. Cartwright',
      date: '2019-04-12T00:00:00Z',
      summary: `The identification document upon which the entire Istanbul death determination rests. Prepared by Dr. A. Cartwright, independent contractor. Dr. Cartwright died February 2020. His original working notes were not preserved. This document is the only record of his findings.`,
      redacted: true,
    },
    {
      id: 'evid-loom-transfer',
      type: 'log',
      title: 'Personnel transfer log — LOOM, 2019-04-15',
      date: '2019-04-15T00:00:00Z',
      summary: `Internal personnel log recording the transfer of officer LOOM from Istanbul station to Tbilisi four days after filing the death report. Transfer authorised by a superior whose identity is redacted in the copy accessible at this clearance level. No stated reason.`,
      redacted: false,
      content: `PERSONNEL TRANSFER LOG
Date: 2019-04-15
Subject: LOOM
From: Istanbul station (SIGINT)
To: Tbilisi field office (unspecified role)
Authorised by: [REDACTED // 13.4-CTRL]
Effective: immediate
Reason: [REDACTED // 13.4-CTRL]

Note appended 2019-09-01: LOOM has not responded to station communications
since taking post. Tbilisi office confirms presence on site. No further
information available at this classification level.`,
    },
  ],

  contradictions: [
    {
      id: 'contra-001',
      between: ['ev-death-report', 'ev-tallinn-intercept'],
      note: `The official record states the subject died on 2019-04-11. Agency acoustic analysis places her voice in Tallinn with 94.7% confidence in June 2020. One of these two facts is wrong. The agency has not formally reconciled them. The file remains open.`,
    },
    {
      id: 'contra-002',
      between: ['ev-cremation', 'ev-london-signal'],
      note: `The subject was cremated in 2019. The 2024 London transmission used a cipher header she personally authored and, according to her own statement in 2017, deleted. If she is dead, someone else has access to a tool that should not exist. If she is alive, the cremation was staged. The agency has not formally stated which it believes.`,
    },
  ],
};
