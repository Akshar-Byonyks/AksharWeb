// The eight ByoTalks sessions.
//
// Spec §9.3 keeps this section "as-is per the audit" — an index listing eight
// sessions, each linking to a session page with video and speaker credentials
// — and attaches four requirements to the migration: captions on all eight,
// the "Klemen Meyers" spelling fixed, speaker credentials shown prominently,
// and `VideoObject` structured data.
//
// THE RECORDINGS WERE FOUND, 28 AUG 2026. The first build of this file had
// `videoId: null` on all eight, because byonyks.com's `/learn/` page describes
// the sessions without linking any of them — no iframe, no embed URL, nothing
// in the raw HTML but a link to a YouTube channel. Spec §12.1's asset-gathering
// step ("all eight recordings at source quality") had not run, so the honest
// render was a pending state.
//
// They are on Byonyks USA's own channel, @Byonyks-Official, all eight, public.
// Every id below was read off that channel and confirmed against YouTube's
// oEmbed endpoint title by title; every duration is the video's own
// `lengthSeconds`; every upload date is the video's own. Nothing here is
// inferred from a filename or guessed from a search result.
//
// Two of the channel's ten videos are NOT in this list, deliberately. Spec §9.3
// enumerates these eight and says the section is "kept as-is per the audit," so
// "Life with Automated Peritoneal Dialysis" (Ashliee Shankle) and "Exploring
// Nephrology" (Dr Nauman Tarif with Dr Muhammad Mohsin Riaz) are recorded here
// as available rather than added on this file's own authority. The first in
// particular is a patient-experience session and would be the strongest
// addition to a page that is otherwise entirely clinician-to-clinician.
//
// WHAT IS REAL HERE: every title, speaker, and summary is transcribed from
// byonyks.com/learn/ as published. Every credential is either from that page
// or from the speaker's own page on byonyks.com, and where a credential could
// not be verified the field says so rather than inventing a title.
//
// One thing the YouTube titles confirmed: two of them read "Dr. Klemen Meyers,"
// the exact misspelling spec §9.3 flags for correction. It is corrected here,
// in both places, to the physician's real name.
//
// SPEAKER CREDENTIALS ARE THE POINT OF THIS PAGE, NOT DECORATION. Spec F-5
// removed the Scientific Advisory Board from the site, which would have taken
// nine named nephrologists with it, and named this page as the compensating
// route: "surface the advisory names inside ByoTalks, where they appear
// naturally as session speakers with their credentials. No extra page, no
// roster, credibility retained at zero cost." That is why `credentials` is a
// required field and why the components give it the same prominence as the
// session title rather than setting it as a byline.
//
// INTERIM SHAPE. When Keystatic arrives (spec §12.10) this becomes a content
// collection and this file goes away. The field names deliberately match that
// schema so the migration is a move rather than a rewrite.

export type ByoTalksSession = {
  readonly slug: string;
  readonly title: string;
  readonly speaker: string;
  /** Required. See the note above on F-5 — this is the page's whole value. */
  readonly credentials: readonly string[];
  readonly summary: string;
  /** YouTube id on Byonyks USA's own channel, @Byonyks-Official. */
  readonly videoId: string;
  /** Seconds, read from the video itself rather than rounded by hand. */
  readonly durationSeconds: number;
  /**
   * Caption state, and the reason this is an enum rather than a URL.
   *
   * Every one of the eight carries exactly one caption track and every one
   * of those is YouTube's automatic speech recognition — an ASR track,
   * checked against each video's own player response. Not one of the eight
   * has a human-authored track.
   *
   * That matters more here than it would on most sites. WCAG 2.1 AA success
   * criterion 1.2.2 asks for captions that are accurate and synchronised,
   * and ASR output on clinical speech — Kt/V, ultrafiltration, icodextrin,
   * peritonitis, across several accents — is reliably neither. Spec §7.3
   * calls captions on these eight "a hard requirement, not an enhancement."
   *
   * So "auto" is not "verified". The components say which one a session has,
   * where a deaf or hard-of-hearing reader sees it before pressing play
   * rather than after, and the gap is recorded as a launch-gate item rather
   * than quietly passed off as compliance.
   */
  readonly captions: "none" | "auto" | "verified";
  /** Upload date on YouTube. Not the date the session was recorded. */
  readonly publishedAt: string;
  /**
   * Byonyks' own session card, downloaded rather than hotlinked — see
   * public/images/README.md. Local, so rendering the index costs eight
   * requests to this origin instead of eight to a third party.
   */
  readonly thumbnail: string;
};

export const byotalksSessions: readonly ByoTalksSession[] = [
  {
    slug: "helping-pd-patients",
    title: "Helping PD Patients",
    speaker: "Joanna Lee Neumann",
    credentials: [
      "RN, CNN",
      "Senior Director, Clinical Services, Home Quality, Satellite Healthcare",
    ],
    summary:
      "Nursing leadership and the support structures around a patient on peritoneal dialysis: what a home programme actually has to provide for the therapy to hold.",
    videoId: "h7SYvliTvmY",
    durationSeconds: 7052,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/h7SYvliTvmY.jpg",
  },
  {
    slug: "pd-catheter-insertion",
    title: "PD Catheter Insertion",
    speaker: "Dr Rashid Sharaf",
    // byonyks.com/learn/ gives no post-nominals or affiliation for this
    // speaker and there is no speaker page for him. The array is left with
    // the one credential the source states rather than padded with a guessed
    // specialty or institution.
    credentials: ["Nephrologist"],
    summary:
      "Clinical insights, procedural considerations and best practice for peritoneal dialysis access.",
    videoId: "tKk3PncdNIU",
    durationSeconds: 4649,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/tKk3PncdNIU.jpg",
  },
  {
    slug: "cardio-renal-benefits-of-peritoneal-dialysis",
    title: "Cardio Renal Benefits of Peritoneal Dialysis",
    speaker: "Dr Madhukar Misra",
    credentials: ["MD", "Byonyks Scientific Advisory Board"],
    summary:
      "Why peritoneal dialysis may be the heart-friendlier option in kidney care, and what the clinical picture behind that looks like.",
    videoId: "zR-FiKQaiXg",
    durationSeconds: 3773,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/zR-FiKQaiXg.jpg",
  },
  {
    slug: "not-kt-v",
    title: "Not Kt/V",
    speaker: "Prof. Isaac Teitelbaum",
    credentials: [
      "MD",
      "Professor of Medicine, Division of Renal Diseases and Hypertension, University of Colorado Denver",
      "Former President, International Society for Peritoneal Dialysis",
      "Byonyks Scientific Advisory Board",
    ],
    summary:
      "The case against treating Kt/V as the measure of an adequate peritoneal dialysis prescription, and what to weigh instead.",
    videoId: "LoM9vcf9iFM",
    durationSeconds: 3695,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/LoM9vcf9iFM.jpg",
  },
  {
    slug: "pd-catheter-related-issues-during-drainage",
    title: "PD Catheter-Related Issues During Drainage",
    speaker: "Dr Rashid Sharaf",
    credentials: ["Nephrologist"],
    summary:
      "Common drainage problems on peritoneal dialysis, and how to work through them.",
    videoId: "B5a4U8UPbBk",
    durationSeconds: 4760,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/B5a4U8UPbBk.jpg",
  },
  {
    slug: "a-difficult-case-of-pd-related-peritonitis",
    title: "A Difficult Case of PD-Related Peritonitis",
    // Spec §9.3, required on migration: 'Fix "Dr. Klemen Meyers" to "Klemens
    // Meyer, MD".' The name is a real physician's and the old site had it
    // wrong in both parts. Fixed here, at the only place it is written down.
    speaker: "Dr Klemens Meyer",
    credentials: ["MD", "Byonyks Scientific Advisory Board"],
    summary:
      "A complex peritonitis case walked through end to end, with the decisions taken at each point.",
    videoId: "nYlxjJW_F4I",
    durationSeconds: 3897,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/nYlxjJW_F4I.jpg",
  },
  {
    slug: "a-discussion-on-pd-prescription",
    title: "A Discussion on PD Prescription",
    speaker: "Dr Anjali B. Saxena",
    credentials: ["MD", "Byonyks Scientific Advisory Board"],
    summary:
      "How a peritoneal dialysis prescription is personalised, and the standards of care that shape it.",
    videoId: "Lp0raiI-Luc",
    durationSeconds: 2884,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/Lp0raiI-Luc.jpg",
  },
  {
    slug: "a-discussion-on-pd",
    title: "A Discussion on PD",
    speaker: "Dr Klemens Meyer",
    credentials: ["MD", "Byonyks Scientific Advisory Board"],
    summary:
      "A wide-ranging conversation on where peritoneal dialysis is going and what it asks of the people delivering it.",
    videoId: "WlGFV4oruVM",
    durationSeconds: 4845,
    captions: "auto",
    publishedAt: "2026-03-16",
    thumbnail: "/images/byotalks/WlGFV4oruVM.jpg",
  },
];

export function getSession(slug: string): ByoTalksSession | undefined {
  return byotalksSessions.find((session) => session.slug === slug);
}

/**
 * Runtime for display: "1h 57m", or "48m" under the hour.
 *
 * These sessions run 48 to 118 minutes, which is the single most useful thing
 * a clinician can know before opening one — "62m" and "118m" are different
 * decisions on a working day. Formatted from the video's own `lengthSeconds`
 * rather than stored pre-rounded, so the data keeps what the source said.
 */
export function formatDuration(seconds: number): string {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

/** ISO 8601 duration, for `VideoObject`. Schema.org wants PT1H57M, not "117". */
export function isoDuration(seconds: number): string {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `PT${hours > 0 ? `${hours}H` : ""}${minutes}M`;
}

/**
 * The distinct speakers, in the order they first appear.
 *
 * Exists because F-5's compensating route only works if the names are legible
 * as a group somewhere. Read one session at a time, four Scientific Advisory
 * Board nephrologists are four separate bylines; gathered, they are the
 * credential that opens a conversation with a clinician.
 */
export function distinctSpeakers(): { speaker: string; credentials: readonly string[]; sessionCount: number }[] {
  const order: string[] = [];
  const byName = new Map<string, { credentials: readonly string[]; sessionCount: number }>();

  for (const session of byotalksSessions) {
    const existing = byName.get(session.speaker);
    if (existing) {
      byName.set(session.speaker, {
        credentials: existing.credentials,
        sessionCount: existing.sessionCount + 1,
      });
      continue;
    }
    order.push(session.speaker);
    byName.set(session.speaker, {
      credentials: session.credentials,
      sessionCount: 1,
    });
  }

  return order.map((speaker) => ({ speaker, ...byName.get(speaker)! }));
}
