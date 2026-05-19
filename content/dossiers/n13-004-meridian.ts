import type { Dossier } from '@/types/narrative';

export const MERIDIAN: Dossier = {
  slug: 'n13-004-meridian',
  code: 'N13-004',
  title: 'MERIDIAN',
  classification: 'SECRET',
  status: 'CLOSED',
  opened: '2019-07-03T00:00:00Z',

  primarySubject: {
    id: 'meridian',
    codename: 'MERIDIAN',
    status: 'ACTIVE',
    summary: `Subject of a closed investigation. Current status unclear. Activity detected eleven months before case was formally reopened. The reopening was not documented in the public audit log.`,
  },

  relatedSubjects: [
    {
      id: 'witness-17',
      codename: 'WITNESS-17',
      status: 'UNKNOWN',
      summary: `Individual whose report triggered the initial investigation. Cooperated briefly with field operatives in 2019. Location unconfirmed since 2020. No contact attempted since case closure.`,
    },
  ],

  summary: `Case officially closed 2021-03-18. Subject confirmed inactive. Final report: no further action required. Dossier silently reopened 2024-08-14 without documentation in the public audit log. Classification upgraded SECRET to TOP SECRET. Reason for reopening: not recorded. Subject activity was detected at the original incident site on 2023-11-02 — eleven months before the case was reopened. This detection was logged but not escalated, as protocol requires no action on closed files.`,

  timeline: [
    {
      id: 'meridian-t1',
      date: '2019-07-03T00:00:00Z',
      title: 'Case opened — referral from WITNESS-17',
      description: `Investigation opened following report from WITNESS-17: individual identified as MERIDIAN observed at restricted site without authorisation. Security log shows no registered entry. Subject departed before intercept was possible. Referral assessed credible.`,
      evidenceIds: ['meridian-e1'],
    },
    {
      id: 'meridian-t2',
      date: '2019-11-22T00:00:00Z',
      title: 'Primary investigation — field interview',
      description: `Field operative AGENT-04 conducted interview with subject. Subject denied presence at incident site. Denied knowledge of the site's purpose. Security footage from 2019-07-03 shows individual with 87% facial match confidence at perimeter fence. Subject's denial is inconsistent with visual evidence. No arrest or detention — insufficient grounds.`,
      evidenceIds: ['meridian-e2', 'meridian-e3'],
    },
    {
      id: 'meridian-t3',
      date: '2020-08-15T00:00:00Z',
      title: 'Monitoring concluded — low threat assessment',
      description: `Eight months of continuous monitoring produced no evidence of hostile activity. Subject's daily pattern: consistent with stated civilian occupation. Background verification: no anomalies. Associates: no persons of interest. Financial records: no irregular transactions. Threat assessment revised to low. Monitoring concluded.`,
      evidenceIds: ['meridian-e4', 'meridian-e5'],
    },
    {
      id: 'meridian-t4',
      date: '2021-03-18T00:00:00Z',
      title: 'Case officially closed — RESOLVED',
      description: `Final report filed. Investigation duration: 20 months. Outcome: no hostile activity confirmed. Initial incident reclassified as probable misidentification. Recommendation: no further action required. Classification maintained at SECRET pending standard review cycle.`,
      evidenceIds: ['meridian-e6'],
      contradictionIds: ['meridian-c1', 'meridian-c2'],
    },
    {
      id: 'meridian-t5',
      date: '2024-08-14T00:00:00Z',
      title: 'Case silently reopened — no documentation',
      description: `Dossier status changed from CLOSED to OPEN. Classification upgraded SECRET to TOP SECRET. No explanation recorded in public audit log. No authorising officer logged. No reason stated. The change is visible only in the internal system log, not in the case management system. Subject activity had been detected at the original incident site eleven months prior — 2023-11-02. That detection was logged but not escalated per closed-file protocol.`,
      evidenceIds: ['meridian-e7', 'meridian-e8'],
      contradictionIds: ['meridian-c1', 'meridian-c2'],
    },
  ],

  evidence: [
    {
      id: 'meridian-e1',
      type: 'document',
      title: 'Initial incident report — WITNESS-17',
      date: '2019-07-03T00:00:00Z',
      summary: `Report submitted by WITNESS-17 triggering investigation. Location details redacted.`,
      content: `INCIDENT REPORT // 2019-07-03
REPORTER: WITNESS-17
LOCATION: [coordinates withheld]
TIME: 23:41 local

STATEMENT:
I was [REDACTED] when I observed an individual I can identify as MERIDIAN. They approached the perimeter from the [REDACTED] side and appeared to pass through without triggering the sensor array. I observed them for approximately four minutes before they left. They moved with purpose. They knew where to go.

The security log shows no registered entry for that time window.

I am submitting this under section 7.4 of the internal reporting protocol. I am aware of the implications.

WITNESS-17
LOCATION AT TIME OF FILING: [withheld]`,
    },
    {
      id: 'meridian-e2',
      type: 'transcript',
      title: 'Field interview — subject MERIDIAN',
      date: '2019-11-22T00:00:00Z',
      summary: `Interview conducted by AGENT-04. Subject denied incident.`,
      content: `INTERVIEW TRANSCRIPT // 2019-11-22
INTERVIEWER: AGENT-04
SUBJECT: MERIDIAN
LOCATION: [redacted]

AGENT-04: Were you at [location redacted] on the night of 2019-07-03?
MERIDIAN: No. I was home that evening.

AGENT-04: Can you verify that?
MERIDIAN: I was alone. But check the transport records if you like.

AGENT-04: Security footage from that site shows someone who matches your description.
MERIDIAN: Then someone looks like me. I wasn't there.

AGENT-04: The match confidence is 87%.
MERIDIAN: What does the other 13% say?

AGENT-04: Your transport records show no trips to that area.
MERIDIAN: Then I wasn't there.

[interview concludes 47 minutes later with no admission]

ASSESSMENT: Subject cooperative. Denial consistent across questioning. No incriminating statements. Alibi: unverifiable but not impossible. Insufficient grounds for further action at this stage.`,
    },
    {
      id: 'meridian-e3',
      type: 'photo',
      title: 'Security footage still — 2019-07-03',
      date: '2019-07-03T23:41:00Z',
      summary: `Security camera capture from incident site. 87% facial match confidence.`,
      content: `[PHOTO: Grainy monochrome security camera image, timestamp 2019-07-03 23:41:08. Individual at perimeter fence. Facial analysis overlay: partial obstruction, match confidence 87%. Height estimate: consistent with subject profile. Gait analysis: INSUFFICIENT DATA. Image has not been enhanced — enhancement classified SECRET under this dossier.]`,
    },
    {
      id: 'meridian-e4',
      type: 'log',
      title: 'Surveillance activity log — 2020',
      date: '2020-08-15T00:00:00Z',
      summary: `Summary of eight months of continuous monitoring. No anomalies detected.`,
      content: `MONITORING SUMMARY // 2020-01 to 2020-08
SUBJECT: MERIDIAN
DURATION: 32 weeks
METHOD: [redacted]

WEEK 01-08:  Routine civilian activity. Employment consistent with stated occupation.
WEEK 09-16:  No deviation. Social contacts: known, vetted, no persons of interest.
WEEK 17-24:  Travel: domestic only. No flagged destinations.
WEEK 25-32:  Digital activity: standard. No encrypted communications detected.

FINANCIAL:    No irregular transactions. Consistent with stated income.
ASSOCIATES:   No persons of interest identified.
THREAT LEVEL: LOW

RECOMMENDATION: Conclude monitoring.
FILED BY: SURVEILLANCE-04
DATE: 2020-08-15`,
    },
    {
      id: 'meridian-e5',
      type: 'document',
      title: 'Background verification report',
      date: '2020-08-15T00:00:00Z',
      summary: `Comprehensive background check. No anomalies.`,
      content: `BACKGROUND VERIFICATION // MERIDIAN
DATE: 2020-08-15

EMPLOYMENT: Verified. Consistent with stated occupation and timeline.
EDUCATION:  Verified. No gaps.
FINANCIAL:  No irregular activity. Tax records consistent.
TRAVEL:     Domestic only, past 5 years. No international travel flagged.
DIGITAL:    Standard footprint. No encrypted services beyond commercial norm.
CRIMINAL:   No record. No sealed records detected.
ASSOCIATES: Cross-referenced against persons-of-interest database. No matches.

CONCLUSION:
Subject profile consistent with civilian status. Initial incident likely misidentification, exacerbated by witness proximity to restricted site.

FILED BY: VERIFICATION-12`,
    },
    {
      id: 'meridian-e6',
      type: 'document',
      title: 'Final case report — case closure',
      date: '2021-03-18T00:00:00Z',
      summary: `Official closure document. Case RESOLVED, no further action.`,
      content: `FINAL REPORT // N13-004 MERIDIAN
DATE: 2021-03-18

INVESTIGATION PERIOD: 2019-07-03 to 2021-03-18 (20 months)
OUTCOME: No hostile activity confirmed

FINDINGS:
1. Initial incident: probable misidentification.
2. Monitoring (32 weeks): no anomalous activity.
3. Background verification: civilian status confirmed.
4. Subject interview: no incriminating statements.

RESOLUTION: FALSE POSITIVE.

RECOMMENDATION: Case CLOSED. No further action required. Subject removed from active monitoring.

CLASSIFICATION: SECRET
STATUS: RESOLVED

Signed: [AGENT-04] // 2021-03-18`,
    },
    {
      id: 'meridian-e7',
      type: 'log',
      title: 'Automated system alert — 2023-11-02',
      date: '2023-11-02T14:37:22Z',
      summary: `Subject activity detected at original incident site. Alert not escalated — file was closed.`,
      content: `AUTOMATED ALERT // NEXUS MONITORING SYSTEM
TIMESTAMP: 2023-11-02 14:37:22Z

SUBJECT: MERIDIAN
ALERT TYPE: Geolocation cross-reference
LOCATION: [coordinates match 2019-07-03 incident site, ±40m]
DWELL TIME: Estimated 6 minutes.

FILE STATUS AT TIME OF ALERT: CLOSED (N13-004)

SYSTEM NOTE: Alert generated by pattern-matching against historical incident coordinates. No operator action taken — standing protocol: no escalation on closed files.

ALERT FILED: AUTOMATICALLY
ESCALATED: NO
REASON: CLOSED FILE PROTOCOL`,
    },
    {
      id: 'meridian-e8',
      type: 'document',
      title: 'Reopening directive — 2024-08-14',
      date: '2024-08-14T00:00:00Z',
      summary: `Status and classification upgrade. Reason not documented. No authorising officer logged.`,
      content: `[INTERNAL SYSTEM LOG // NEXUS CASE MANAGEMENT]
TIMESTAMP: 2024-08-14 03:17:09Z

DOSSIER: N13-004 MERIDIAN
ACTION: STATUS CHANGE
FROM: CLOSED
TO: OPEN

CLASSIFICATION CHANGE:
FROM: SECRET
TO: TOP SECRET

AUTHORISING OFFICER: [NONE LOGGED]
REASON: [NOT DOCUMENTED]
AUDIT TRAIL: INTERNAL LOG ONLY — NOT REFLECTED IN CASE MANAGEMENT SYSTEM

NOTE: The above change was recorded in the internal audit log but does not appear in the standard case management interface. The dossier is simultaneously CLOSED (case management) and OPEN (audit log). Neither system has been corrected.`,
    },
  ],

  contradictions: [
    {
      id: 'meridian-c1',
      between: ['meridian-t4', 'meridian-t5'],
      note: `Case marked RESOLVED 2021-03-18. Subject confirmed inactive. Final report: no further action required. // Subject activity detected at original incident site 2023-11-02 — eleven months before case reopening 2024-08-14. Activity was not escalated because closed-file protocol prevents action. The detection exists in the log. The closure exists in the record. Neither has been amended.`,
    },
    {
      id: 'meridian-c2',
      between: ['meridian-t4', 'meridian-t5'],
      note: `Final report 2021: classification SECRET, threat assessment low, outcome false positive. // Reopening directive 2024: classification upgraded SECRET to TOP SECRET. Reason not documented. No authorising officer recorded. If the 2021 closure was correct, the 2024 upgrade has no documented basis. If the 2024 upgrade was justified, the 2021 closure was premature.`,
    },
  ],
};
