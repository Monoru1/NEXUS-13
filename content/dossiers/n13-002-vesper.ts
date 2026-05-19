import type { Dossier } from '@/types/narrative';

export const VESPER: Dossier = {
  slug: 'n13-002-vesper',
  code: 'N13-002',
  title: 'VESPER',
  classification: 'SECRET',
  status: 'OPEN',
  opened: '2022-08-14T00:00:00Z',

  primarySubject: {
    id: 'vesper-prime',
    codename: 'VESPER-PRIME',
    status: 'UNKNOWN',
    summary: `Origin of band 17.3 transmissions. No physical signature. No confirmed location. Source consistent with neither ground-based nor standard aerial emission.`,
  },

  relatedSubjects: [
    {
      id: 'ctrl-analyst-09',
      codename: 'CTRL-ANALYST-09',
      status: 'ACTIVE',
      summary: `Signal analysis specialist. Filed the non-terrestrial origin assessment for VESPER transmissions. Currently assigned to NEXUS technical division.`,
    },
  ],

  summary: `Transmissions detected on frequency band 17.3 MHz. Band does not appear in the ITU Radio Regulations frequency allocation table. Equipment calibration verified across three independent receiving stations. Triangulation placed origin at altitude 47 kilometres — no known aerial platform at coordinates, no satellite match. Second triangulation: no source detected. Transmissions continue at irregular intervals. Content: numeric sequences, no linguistic pattern identified. Classification upgraded SECRET following directive 13.4-CTRL.`,

  timeline: [
    {
      id: 'vesper-t1',
      date: '2022-08-14T03:22:00Z',
      title: 'First interception — band 17.3 MHz',
      description: `Station NORTH-7 detected unregistered signal at 17.3 MHz during routine atmospheric sweep. Duration 4 minutes 18 seconds. Structured encoding consistent with compressed numeric data. Not immediately flagged — equipment fault assumed.`,
      evidenceIds: ['vesper-e1', 'vesper-e2'],
    },
    {
      id: 'vesper-t2',
      date: '2022-08-22T11:47:00Z',
      title: 'Technical analysis completed',
      description: `Spectrum analysis confirmed frequency outside any registered allocation. Band 17.3 MHz falls between ITU fixed-mobile (16.4–17.1) and aeronautical (17.9–18.0) allocations — gap is not assigned. Equipment fault ruled out after cross-verification across three independent stations. Signal strength: −47 dBm average. Modulation type: unclassified, matches no standard AM/FM/SSB/QAM profile.`,
      evidenceIds: ['vesper-e3'],
    },
    {
      id: 'vesper-t3',
      date: '2023-02-11T19:03:00Z',
      title: 'Multi-station triangulation — anomalous result',
      description: `Coordinated triangulation across NORTH-7, EAST-14, and SOUTH-3 stations. Result: 41.2847°N, 12.5104°E, altitude 47.2 km. Coordinate confidence 94%. No known aerial platform at that position — no registered balloon, drone, or satellite trajectory matches. Second triangulation attempt two weeks later detected no source at all. Transmissions continued during both sessions.`,
      evidenceIds: ['vesper-e4'],
      contradictionIds: ['vesper-c1'],
    },
    {
      id: 'vesper-t4',
      date: '2024-01-09T00:00:00Z',
      title: 'Classification upgraded — directive 13.4-CTRL',
      description: `Dossier reclassified SECRET following directive 13.4-CTRL. Reason stated: transmissions ongoing, origin unresolved, content purpose unknown, potential security implication if adversarial origin confirmed. Monitoring authorised to continue indefinitely.`,
      evidenceIds: ['vesper-e5', 'vesper-e6'],
    },
  ],

  evidence: [
    {
      id: 'vesper-e1',
      type: 'audio',
      title: 'First transmission recording — 2022-08-14',
      date: '2022-08-14T03:22:00Z',
      summary: `Raw capture, 17.3 MHz, duration 4:18. Numeric sequences confirmed. No voice component.`,
      content: `[AUDIO CAPTURE — STATION NORTH-7 — 17.3 MHz]
Duration: 04:18
Signal quality: −47 dBm
Content: numeric sequences (automated transcription appended)
Decryption status: PENDING`,
    },
    {
      id: 'vesper-e2',
      type: 'transcript',
      title: 'Signal content transcript — 2022-08-14',
      date: '2022-08-14T03:22:22Z',
      summary: `Automated transcription of numeric sequences from first interception.`,
      content: `> VESPER TRANSMISSION 001 // 2022-08-14 03:22:22Z
> STATION: NORTH-7 // FREQUENCY: 17.3 MHz
> TRANSCRIPTION (automated, confidence 91%)

7739 4421 0018 9562 3307 1148
2214 8853 6601 4429 7736 0982
5541 3308 9920 1174 6623 8819
[sequence repeats × 47]
[18-second silence]
0000 0000 0001

> PATTERN TYPE: UNKNOWN
> LINGUISTIC MATCH: NONE
> CRYPTOGRAPHIC MATCH: NONE
> NOTE: Numeric structure inconsistent with known encoding standards.`,
    },
    {
      id: 'vesper-e3',
      type: 'document',
      title: 'Spectrum analysis report',
      date: '2022-08-22T11:47:00Z',
      summary: `Technical analysis confirming anomalous frequency and ruling out equipment fault.`,
      content: `SPECTRUM ANALYSIS REPORT // NEXUS TECHNICAL DIVISION
DATE: 2022-08-22
ANALYST: CTRL-ANALYST-09

FREQUENCY: 17.3 MHz
ITU ALLOCATION: Unregistered (gap between 17.1 and 17.9)
NEAREST REGISTERED: 17.9–18.0 MHz (aeronautical radio navigation)

EQUIPMENT CHECK:
Station NORTH-7: calibration verified ✓
Station EAST-14: calibration verified ✓
Station SOUTH-3: calibration verified ✓
Equipment fault: RULED OUT

SIGNAL CHARACTERISTICS:
- Average strength: −47 dBm (consistent, not degrading)
- Bandwidth: 3.2 kHz
- Modulation: Unknown — does not match AM, FM, SSB, LSB, USB, DSB, QAM profiles
- Spectral shape: symmetrical, artificially clean

CONCLUSION: Signal is real. Origin is unknown. Band does not exist by current registration.`,
    },
    {
      id: 'vesper-e4',
      type: 'log',
      title: 'Triangulation session log',
      date: '2023-02-11T19:03:00Z',
      summary: `Multi-station triangulation results. Origin altitude physically impossible.`,
      content: `TRIANGULATION SESSION LOG // 2023-02-11

PARTICIPATING STATIONS: NORTH-7, EAST-14, SOUTH-3
TARGET FREQUENCY: 17.3 MHz
SESSION DURATION: 47 minutes

--- RESULT ---
LATITUDE:  41.2847°N
LONGITUDE: 12.5104°E
ALTITUDE:  47.2 km
CONFIDENCE: 94%

--- ANALYSIS ---
Ground transmission: IMPOSSIBLE at calculated altitude.
Standard aerial: No registered balloon, UAV, or aircraft at coordinates.
Satellite:         No satellite trajectory match within 200 km.

FOLLOW-UP SESSION // 2023-02-24
Triangulation attempted during active transmission.
Result: NO SOURCE DETECTED.
Signal confirmed received by all three stations simultaneously.

--- CONCLUSION ---
Source origin: UNRESOLVED
Anomaly status: CONFIRMED`,
    },
    {
      id: 'vesper-e5',
      type: 'photo',
      title: 'Station NORTH-7 receiver configuration',
      date: '2022-08-14T00:00:00Z',
      summary: `Receiver array and spectrum analyser display from first interception.`,
      content: `[PHOTO: Wideband receiver array, exterior mount. Spectrum analyser display visible in background — spike at 17.3 MHz with no adjacent registered traffic. Logged as equipment anomaly at time of capture. Reclassified as evidence 2022-09-03.]`,
    },
    {
      id: 'vesper-e6',
      type: 'document',
      title: 'Classification directive — 2024-01-09',
      date: '2024-01-09T00:00:00Z',
      summary: `Formal upgrade to SECRET classification under directive 13.4-CTRL.`,
      content: `DIRECTIVE 13.4-CTRL // CLASSIFICATION UPGRADE
DATE: 2024-01-09
DOSSIER: N13-002 VESPER

PREVIOUS CLASSIFICATION: CONFIDENTIAL
NEW CLASSIFICATION: SECRET

REASON: Transmissions continue. Origin unresolved after 18 months. Content purpose unknown. Triangulation data inconclusive or contradictory. If adversarial, disclosure risk is non-trivial.

MONITORING: ONGOING — indefinite
DISSEMINATION: NEXUS INTERNAL CHANNELS ONLY
AUTHORISED BY: [REDACTED] // CTRL-13.4`,
    },
  ],

  contradictions: [
    {
      id: 'vesper-c1',
      between: ['vesper-t3', 'vesper-t4'],
      note: `Triangulation placed signal origin at altitude 47.2 km — no platform, no satellite. Second triangulation two weeks later detected no source at all. Both sessions occurred during active transmission. The signal has no locatable origin and no detectable origin simultaneously.`,
    },
  ],
};
