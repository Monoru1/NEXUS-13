export type AudioStatus = 'available' | 'decryption-pending' | 'unavailable';

export type Transmission = {
  id: string;
  timestamp: string; // ISO UTC
  band: string;
  bandAnomaly: boolean;
  duration: string; // HH:MM:SS
  transcript: string; // may contain [REDACTED] blocks
  audioStatus: AudioStatus;
  linkedDossier?: string;
};

export const TRANSMISSIONS: Transmission[] = [
  {
    id: 'tx-001',
    timestamp: '2021-03-08T02:17:00Z',
    band: '17.3 MHz',
    bandAnomaly: true,
    duration: '00:04:11',
    transcript: `First intercept on this band. Structured encoding consistent with compressed telemetry. Decode ratio: 34%. [REDACTED 00:14 — 00:38] Remaining segments suggest positional data of some kind. Origin not determined.`,
    audioStatus: 'available',
    linkedDossier: 'n13-002-vesper',
  },
  {
    id: 'tx-002',
    timestamp: '2021-09-14T11:43:00Z',
    band: '12.4 MHz',
    bandAnomaly: false,
    duration: '00:01:58',
    transcript: `Routine atmospheric sweep. Traffic on registered commercial bands. No unusual content. Filed for completeness.`,
    audioStatus: 'available',
  },
  {
    id: 'tx-003',
    timestamp: '2022-02-27T04:05:00Z',
    band: '9.1 MHz',
    bandAnomaly: false,
    duration: '00:08:22',
    transcript: `[REDACTED]`,
    audioStatus: 'unavailable',
  },
  {
    id: 'tx-004',
    timestamp: '2022-11-19T02:17:00Z',
    band: '17.3 MHz',
    bandAnomaly: true,
    duration: '00:04:11',
    transcript: `Second intercept on band 17.3 MHz. Timestamp identical to first intercept across 17 months. Duration identical. Content different. [REDACTED 00:14 — 00:38] The repetition of timestamp is not explainable by coincidence. Either the source is automated to a degree inconsistent with varying content, or the timestamp is meaningful to the source.`,
    audioStatus: 'available',
    linkedDossier: 'n13-002-vesper',
  },
  {
    id: 'tx-005',
    timestamp: '2022-12-03T19:51:00Z',
    band: '14.2 MHz',
    bandAnomaly: false,
    duration: '00:00:47',
    transcript: `Short burst. Structure consistent with authentication handshake. No payload recovered. Source unregistered but band is legitimate.`,
    audioStatus: 'decryption-pending',
  },
  {
    id: 'tx-006',
    timestamp: '2023-04-18T07:30:00Z',
    band: '7.8 MHz',
    bandAnomaly: false,
    duration: '00:12:04',
    transcript: `[REDACTED]`,
    audioStatus: 'unavailable',
  },
  {
    id: 'tx-007',
    timestamp: '2024-01-09T03:44:00Z',
    band: '17.3 MHz',
    bandAnomaly: true,
    duration: '00:04:11',
    transcript: `Third intercept on band 17.3 MHz. Timestamp has shifted by two hours from previous intercepts — the first variation. Duration identical. [REDACTED 00:14 — 00:38] If this is an automated system, something changed its schedule. If it is not automated, the author is aware of the pattern and chose to alter it.`,
    audioStatus: 'decryption-pending',
    linkedDossier: 'n13-002-vesper',
  },
  {
    id: 'tx-008',
    timestamp: '2024-06-22T22:19:00Z',
    band: '11.5 MHz',
    bandAnomaly: false,
    duration: '00:03:17',
    transcript: `Partial decode. Voice component detected, language unresolved. [REDACTED 00:52 — 01:44] Remainder matches known encrypted format from prior unattributed intercepts. No link established.`,
    audioStatus: 'available',
  },
];
