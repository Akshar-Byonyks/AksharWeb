// The leadership roster.
//
// CUT FROM FIFTEEN TO FOUR ON 1 SEP 2026, on client instruction: "get rid of
// all Byonyks leadership cards and only add new ones for Akshar Byonyks
// specifically", with "Senthil Kumar stays". Thirteen transcribed Byonyks
// records were removed — Farrukh Usman, Rod Kenley, Salahuddin Khan, Doug
// Wilkerson, Annie Usman, Frank Rudolph, Eric Flachbart, Andrew King, Michael
// Wollowitz, Mary Hoffman, Hassan Abrar, Nauman Tarif and Ahmed Muzmmal —
// together with their portraits' use on this site.
//
// WHAT THAT REMOVAL ALSO SETTLED. Three launch-gate problems this file carried
// since 29 Aug 2026 are closed by it rather than by anyone answering them:
//
//   • Four biographies named Lahore or Pakistan and two job titles read "South
//     Asia", against spec F-1's attribution decision of 20 Aug 2026. All four
//     are gone. `namesALocation` stays on the type because the next supplied
//     biography may need it.
//   • Portrait rights for fourteen named individuals photographed on another
//     company's website. One remains — Senthil Kumar's — so the written
//     permission Byonyks USA has only given verbally is still a launch gate,
//     but over one photograph rather than fourteen. The other three portraits
//     are the client's own, supplied directly, and carry no rights question.
//   • Spec §9.5's "same backdrop, crop and lighting" was unmeetable across a
//     set assembled from someone else's website. All four portraits are now
//     published and all four are normalised to the same 900×1125 frame, so
//     what is left is backdrop: white, white, a brown studio ground and a city
//     skyline. A single shoot closes it; nothing else honestly can, because
//     the remaining fix is editing photographs of real people.
//
// FOUR RECORDS, THREE OF THEM THIS COMPANY'S OWN. Dr. Vishnu Patel, Dr. Ronak
// C. Shah and Sahil are Akshar Byonyks; Senthil Kumar is Byonyks and stays on
// the client's explicit instruction. The list is still ONE list (client
// instruction, 29 Aug 2026: "Dont make Akshar Byonyks and Byonyks 2 seperate
// lists. Should be one in the same.").
//
// WHICH KEEPS `organisation` LOAD-BEARING, and arguably more so than before.
// It is on every record, printed on every card, printed on every profile, and
// in the JSON-LD's `worksFor`. Spec §3.1's first non-negotiable is that the
// two companies are never blurred; with one Byonyks person among three of
// ours, the per-card label is the only thing that says which is which. It is
// not optional metadata. Do not remove it without a written client decision
// recorded in deviations.md.
//
// ─── TWO THINGS THAT NEED THE CLIENT BEFORE LAUNCH ──────────────────────────
//
// (Portraits for Dr. Shah and Sahil were the third. Both were supplied on
// 1 Sep 2026, hours after these records first shipped with `portraitPending`,
// and both are now published. `portraitPending` stays on the type because the
// next supplied record may need it.)
//
// 1. **NO JOB TITLE WAS SUPPLIED FOR DR. SHAH OR FOR SAHIL.** `role` is
//    optional for exactly this reason and both records omit it, so the page
//    prints "Title to be confirmed" rather than a title this project invented
//    for a real person. Two titles could have been read out of the supplied
//    text — "nephrologist" for Dr. Shah, and nothing at all for Sahil — and
//    guessing the second would have been fabrication. One line each closes it.
//    **This is now the only gap on two otherwise complete cards**, which makes
//    it more visible than it was, not less.
//
// 2. **DR. SHAH'S BIOGRAPHY IS ABOUT BYONYKS, AND HIS CARD SAYS AKSHAR
//    BYONYKS.** This is the one thing in this file that could mislead a
//    reader, so it is written down rather than left in the data. The supplied
//    text says "This belief led to the creation of Byonyks", then describes
//    Byonyks' mission for four paragraphs and closes on "Byonyks' goal".
//    Placing him on the Akshar Byonyks roster is the client's instruction and
//    is followed; what this project cannot do is silently rewrite a real
//    person's biography to say "Akshar Byonyks" where he said "Byonyks", so
//    the text is carried exactly as given. A reader who opens the profile
//    therefore meets an Akshar Byonyks label above a Byonyks biography. Either
//    the title clarifies it (see 1) or the biography needs a line about his
//    Akshar Byonyks role — the client's call, and their words either way.
//
// ─── THE CONTRACT ───────────────────────────────────────────────────────────
//
// Spec §9.5 wants bios of 150 to 250 words. That rule is enforced below for
// biographies this project authors, and deliberately not for ones carried
// verbatim: padding a 124-word bio to 150 means inventing facts about a real
// person, and cutting a 517-word one means deciding which half of someone's
// career matters. Verbatim records answer to a different contract —
// provenance — and that is the one enforced on them. All four records here
// are verbatim, so none is length-checked and every one carries a date.

export type Executive = {
  readonly slug: string;
  readonly name: string;
  /** Post-nominals, kept separate so the grid can set them at a lighter weight. */
  readonly postNominals?: string;
  /**
   * The job title. OPTIONAL, AND THAT IS DELIBERATE (1 Sep 2026): two supplied
   * records came with a biography and no title, and a leadership page is the
   * last place to invent one for a named individual. Where it is absent the
   * card and the profile print a pending marker, the page metadata drops the
   * title from its description, and the JSON-LD omits `jobTitle` rather than
   * asserting a guess to a crawler.
   */
  readonly role?: string;
  /**
   * Which company this person is an executive of. Printed on every card and
   * every profile, and never inferred from the site it appears on.
   */
  readonly organisation: "Akshar Byonyks" | "Byonyks";
  /** 150–250 words when authored here; verbatim when transcribed or supplied. */
  readonly bio: string;
  readonly portrait?: string;
  readonly portraitAlt: string;
  readonly linkedin?: string;
  /** Where a transcribed record came from. Required for transcribed records. */
  readonly sourceUrl?: string;
  /**
   * Who supplied a verbatim record that has no public page to cite — the
   * client's own copy about its own people. Carries the same obligation as
   * `sourceUrl`: a `retrieved` date is required either way, and the profile
   * prints the attribution. A biography of a real person with no stated origin
   * is the same defect as an uncited statistic, whether it came off a website
   * or out of an email.
   */
  readonly suppliedBy?: string;
  readonly retrieved?: string;
  /**
   * No photograph provided yet. The record publishes with a placeholder that
   * says so on the page, rather than sitting in a branch until one arrives.
   * Deliberately explicit: a missing `portrait` alone still fails the build,
   * so a portrait can only go missing on purpose.
   */
  readonly portraitPending?: boolean;
  /**
   * WHAT THIS PERSON DOES FOR INDIA, in the client's own words, rendered on
   * the profile under its own heading below the biography.
   *
   * Added 1 Sep 2026 on client instruction — "Senthil Kumar stays but add a
   * blurb on India part". It is a separate field rather than an edit to `bio`
   * because `bio` is somebody else's text carried word for word, and appending
   * a sentence to it would break the one promise the profile makes about it.
   *
   * `indiaNotePending` marks a record the client has asked to carry one that
   * has not arrived. Senthil Kumar's is the only such record today: his
   * biography is transcribed from byonyks.com and describes a career in the
   * United States, which on an India-market roster leaves the obvious question
   * unanswered. The page states that rather than answering it with a sentence
   * this project made up about a real person's job.
   */
  readonly indiaNote?: string;
  readonly indiaNotePending?: boolean;
  /**
   * Spec F-1 flag: this biography names a country or city that the 20 Aug 2026
   * attribution decision keeps off this site. Present so the conflict is
   * visible in the data. No current record sets it — the four that did were
   * removed on 1 Sep 2026 — and it is kept for the next supplied biography.
   */
  readonly namesALocation?: readonly string[];
};

export const executives: readonly Executive[] = [
  {
    // THE FIRST AKSHAR BYONYKS EXECUTIVE ON THE SITE. Supplied by the client,
    // 29 Aug 2026, and carried verbatim but for a missing full stop at the end
    // of the last sentence.
    //
    // He leads the roster on client instruction. The list is one list — Akshar
    // Byonyks and Byonyks together — also on client instruction, 29 Aug 2026.
    // The `organisation` on every record is what now carries the distinction
    // spec §3.1 requires, so it is printed on every card and every profile and
    // in the JSON-LD's `worksFor`.
    slug: "vishnu-patel",
    name: "Vishnu Patel",
    postNominals: "MD",
    role: "Vice President",
    organisation: "Akshar Byonyks",
    // Supplied by the client 29 Aug 2026, separately from the biography.
    //
    // ORIGINAL FILE, UNMODIFIED. Client instruction, 29 Aug 2026, reverting
    // the backdrop replacement and reframe that had been applied earlier that
    // day. It keeps its brown backdrop and its own 0.878 ratio; the 4:5 grid
    // frame crops it, top-anchored. See public/images/README.md for what was
    // done and then undone.
    portrait: "/images/leadership/vishnu-patel.jpg",
    portraitAlt:
      "Portrait of Vishnu Patel, MD, Vice President at Akshar Byonyks.",
    suppliedBy: "Akshar Byonyks",
    retrieved: "29 August 2026",
    bio: "Dr. Vishnu Patel is Vice President of Akshar Byonyks International (ABI), bringing extensive experience in nephrology, dialysis care, healthcare leadership, and business development. As a practicing nephrologist and physician executive, he provides clinical and strategic insight to ABI’s mission of expanding access to innovative, patient-centered peritoneal dialysis technology.\n\nAt Akshar Byonyks, Dr. Patel focuses on strategic partnerships, clinical integration, and the development of manufacturing and distribution capabilities in India and international markets. His work is guided by a commitment to making high-quality home dialysis solutions more accessible, affordable, and scalable for patients worldwide.\n\nDr. Patel also serves in physician leadership and healthcare business roles in the United States, giving him a practical perspective on translating medical innovation into sustainable solutions that improve patient care.",
  },
  {
    // SUPPLIED BY THE CLIENT, 1 SEP 2026, and carried word for word.
    //
    // NO TITLE AND NO PHOTOGRAPH CAME WITH IT. See points 1 and 2 in the file
    // header. "Nephrologist" was available from the first sentence and is not
    // used: it is what he is, not what he does for this company, and the role
    // line on a leadership card is read as the second.
    //
    // AND THE BIOGRAPHY IS ABOUT BYONYKS — see point 3, which is the one thing
    // in this file a reader could be misled by. It is carried unedited anyway,
    // because the alternative is rewriting a real person's account of his own
    // career to name a different company.
    //
    // The one departure from the supplied text is a single "and" restored in
    // the last line's list; nothing else is touched, including the American
    // spellings and the em-dash style, which are his.
    slug: "ronak-shah",
    name: "Ronak C. Shah",
    postNominals: "MD",
    organisation: "Akshar Byonyks",
    // Supplied by the client, 1 Sep 2026, hours after the record shipped with
    // `portraitPending`. Normalised to the set's 900×1125 — a `cover` crop
    // anchored north, flattened onto white, JPEG q88 — which is the same
    // treatment the eleven original transcribed portraits had. Only the frame
    // was changed: no retouching, no backdrop replacement.
    portrait: "/images/leadership/ronak-shah.jpg",
    portraitAlt:
      "Portrait of Dr. Ronak C. Shah, in a navy suit and blue tie against a white background.",
    suppliedBy: "Akshar Byonyks",
    retrieved: "1 September 2026",
    bio: "Dr. Ronak C. Shah is a nephrologist with more than two decades of experience caring for patients with kidney disease, hypertension, dialysis, and kidney transplantation. He completed his nephrology fellowship at the University of Florida and has extensive experience across all forms of renal replacement therapy, including hemodialysis, peritoneal dialysis, and continuous renal replacement therapy.\n\nWith a career grounded in clinical care, education, research, and service, the focus has increasingly become clear: kidney care should be centered around the patient’s life—not the other way around. This belief led to the creation of Byonyks, a home-dialysis-focused organization dedicated to making home dialysis more accessible, personalized, and sustainable for people living with end-stage kidney disease.\n\nByonyks is built around the belief that where a patient lives, their socioeconomic circumstances, or their access to traditional dialysis infrastructure should not determine the quality of care they receive. The mission is particularly focused on expanding access to home dialysis in underserved and traditionally overlooked communities, while providing the education, clinical support, technology, and confidence patients and families need to succeed at home.\n\nThe vision extends beyond dialysis itself. Through prevention, early identification of kidney disease, patient education, community outreach, and philanthropic initiatives, Byonyks seeks to help people prevent or delay kidney failure whenever possible—and, when dialysis becomes necessary, make home therapy a realistic and empowering option.\n\nThroughout the career, work has included research and publications in kidney transplantation, dialysis, endothelial dysfunction, and critical care nephrology, along with extensive experience caring for complex kidney patients. That experience now serves as the foundation for a different kind of dialysis organization: one that combines clinical excellence with compassion, innovation, accessibility, and a commitment to community.\n\nByonyks’ goal is simple: bring dialysis home, put patients first, and make high-quality kidney care accessible to more people—especially those who need it most.",
  },
  {
    // SUPPLIED BY THE CLIENT, 1 SEP 2026, as a quotation, and carried word for
    // word inside it.
    //
    // ONE NAME, NO SURNAME, NO TITLE, NO PHOTOGRAPH. The slug and the record
    // use the name exactly as given rather than completing it, which would
    // mean inventing part of a real person's name. All three gaps are the
    // client's to close and all three are visible on the page rather than
    // papered over — the profile prints "Title to be confirmed" and the grid
    // frame prints "Photograph pending".
    //
    // THIS IS THE ONLY RECORD ON THE SITE WRITTEN IN THE THIRD PERSON BY
    // SOMEBODY ELSE ABOUT ITS SUBJECT, and the profile's attribution line
    // therefore matters more here than anywhere: it says the words were
    // supplied by Akshar Byonyks rather than written by him.
    slug: "sahil",
    name: "Sahil",
    organisation: "Akshar Byonyks",
    // Supplied by the client, 1 Sep 2026. Same normalisation as Dr. Shah's —
    // 900×1125, `cover` anchored north, q88 — applied to a 2656×3984 original,
    // so the crop is doing real work here: north-anchoring keeps the head
    // where the grid's `object-top` frame expects it and spends the crop on
    // the bottom of a three-quarter-length shot.
    portrait: "/images/leadership/sahil.jpg",
    portraitAlt:
      "Portrait of Sahil, in a tan sweater over an open-collared shirt, with a city skyline behind him.",
    suppliedBy: "Akshar Byonyks",
    retrieved: "1 September 2026",
    bio: "Sahil is a former banker inspired to help expand access to effective and affordable dialysis treatments. Growing up around dialysis patients and clinicians, it was clear to him that providers were doing their best with outdated tools. Now, he is committed to offering a modern PD solution to the Indian healthcare provider and patient.",
  },
  {
    // Supplied by the client, 8 Sep 2026, with the instruction to treat the
    // record as Akshar Byonyks personnel. Carried verbatim.
    //
    // NO POST-NOMINALS, AND THAT IS A DECISION RATHER THAN AN OMISSION. Both
    // other physicians on this roster carry "MD". This biography says he
    // "complet[ed] his medical education in India" and then did a US residency
    // and fellowship — and an Indian medical degree is an MBBS, not an MD. So
    // the letters that would make his card match his colleagues' are the ones
    // most likely to be wrong for him specifically. A qualification is not a
    // formatting detail to be made consistent; it is a claim about a named
    // physician on a medical-device site. Asked, not guessed.
    //
    // The visible cost is real and is the reason this is written down: his
    // card reads "Rohit Pankhaniya" beside "Vishnu Patel, MD" and "Ronak C.
    // Shah, MD", which a reader could take as a difference in credentials
    // rather than in what was supplied. One line from the client closes it.
    //
    // NO ROLE, following the precedent set for Dr. Shah and Sahil on 1 Sep
    // 2026: "board-certified nephrologist practicing in Port Charlotte,
    // Florida" describes his clinical practice, not his job at this company,
    // and reading a title out of a description is how a leadership page ends
    // up asserting something nobody said. The page prints the pending marker.
    //
    // `namesALocation` is deliberately NOT set. It exists for the locations
    // spec F-1's attribution decision keeps off this site; Florida, India and
    // the two US hospitals are not those, and marking them would drain the
    // flag of the meaning it was created to carry.
    slug: "rohit-pankhaniya",
    name: "Rohit Pankhaniya",
    organisation: "Akshar Byonyks",
    // PLACEHOLDER ALT, and it must not ship as one. The pending branch of
    // `ExecutivePortrait` renders a dashed marker and never reads this string,
    // so it is unused today — but the moment a photograph is added this
    // becomes the alt text on a real image of a real person, and alt text
    // describes what is actually in the frame. Replace it when the file
    // arrives; do not let a portrait land on top of a guess.
    portraitPending: true,
    portraitAlt: "Portrait of Rohit Pankhaniya of Akshar Byonyks.",
    suppliedBy: "Akshar Byonyks",
    retrieved: "8 September 2026",
    bio: "Dr. Rohit Pankhaniya is a board-certified nephrologist practicing in Port Charlotte, Florida.\n\nAfter completing his medical education in India, he pursued advanced training in the United States, completing an Internal Medicine residency at Wayne State University and a Nephrology fellowship at Henry Ford Hospital. He has been providing specialized kidney care in Florida since 2008.\n\nIn addition to his clinical work, Dr. Pankhaniya is involved in commercial real estate development and biotech startup investments.\n\nHis passion for nephrology is deeply personal. Early in life, he witnessed a close family member navigate the significant challenges of peritoneal dialysis in India. This experience inspired his involvement with Byonyks USA beginning in 2024. Working alongside Dr. Patel and the ABI team, he is committed to advancing innovative, life-saving treatments and making them accessible to patients in his home country.",
  },
  {
    // THE ONE BYONYKS RECORD THAT STAYS, on the client's explicit instruction
    // of 1 Sep 2026 — "Senthil Kumar stays" — given in the same breath as the
    // instruction to remove the other thirteen. Still transcribed from
    // byonyks.com, still carried word for word, still labelled Byonyks on
    // every card and every profile, because that is where he works.
    //
    // HIS INDIA BLURB WAS ASKED FOR AND HAS NOT ARRIVED. `indiaNotePending`
    // marks it. The biography below runs 35 years through Viisage, PeakPoint
    // and Oasis and mentions India nowhere; on a roster of four for an
    // India-market company, "what does he do here" is the question his card
    // raises and the page had better not answer it by guessing. See the field
    // documentation on `indiaNote`.
    slug: "senthil-kumar",
    name: "Senthil Kumar",
    role: "VP Business Development",
    organisation: "Byonyks",
    portrait: "/images/leadership/senthil-kumar.jpg",
    portraitAlt:
      "Portrait of Senthil Kumar, VP Business Development at Byonyks.",
    linkedin: "https://www.linkedin.com/in/senthilsenthil/",
    sourceUrl: "https://byonyks.com/senthil-kumar/",
    retrieved: "29 August 2026",
    indiaNotePending: true,
    bio: "Senthil Kumar is a visionary serial entrepreneur whose career spans more than 35 years of building innovative, impactful companies. His entrepreneurial journey is marked by a unique distinction: every one of his ventures has been self-funded, a testament to his business acumen and resourcefulness. The solutions developed by Senthil’s companies and customers are used by numerous U.S. states and federal agencies, reflecting his commitment to quality and reliability.\n\nSenthil’s educational foundation in Computer Science was laid at the University of Illinois Chicago, where he earned his Master of Science degree. Soon after, he embarked on a remarkable decades long tenure at Viisage Technology, contributing to the company’s growth and technological advancements.\n\nDriven by a passion for leadership and innovation, Senthil went on to found PeakPoint Technologies, Inc. and ran the company for over 26 years. Under his guidance, PeakPoint became known for its forward-thinking solutions and industry leadership. Senthil also brought his expertise to Oasis Systems as Vice President, where he played a pivotal role in expanding the company’s capabilities.\n\nIn December 2019, Senthil joined Byonyks Medical Devices as Vice President of Business Development. In this role, he has been instrumental in forging strategic partnerships and driving the company’s growth in the hi-tech and medical sectors. His ability to balance multiple executive roles showcases his versatility and unwavering dedication.\n\nThroughout his career, Senthil Kumar has demonstrated a relentless commitment to innovation, community service, and excellence. His leadership continues to shape the future of technology and healthcare, making a positive impact on the communities and industries he serves.",
  },
];

/**
 * The licensor's staff. The leadership page renders one combined list (client
 * instruction, 29 Aug 2026), so this is not used to split the grid — it is
 * used where prose needs to say how many of these people work for Byonyks
 * rather than for Akshar Byonyks. One, since 1 Sep 2026.
 */
export const byonyksExecutives = executives.filter(
  (executive) => executive.organisation === "Byonyks",
);

/** This company's own people. Three, since 1 Sep 2026. */
export const aksharExecutives = executives.filter(
  (executive) => executive.organisation === "Akshar Byonyks",
);

export function getExecutive(slug: string): Executive | undefined {
  return executives.find((executive) => executive.slug === slug);
}

export function bioWordCount(bio: string): number {
  return bio.split(/\s+/).filter(Boolean).length;
}

/** Records whose biography names a place spec F-1 keeps off this site. */
export const locationFlagged = executives.filter(
  (executive) =>
    executive.namesALocation && executive.namesALocation.length > 0,
);

// Enforced at module load, so a violation fails the build rather than shipping.
// Two contracts, because there are two kinds of record here.
const MIN_BIO_WORDS = 150;
const MAX_BIO_WORDS = 250;

// THE ROSTER MUST BE MOSTLY OURS. Added 1 Sep 2026 with the cut from fifteen
// to four. The roster was fourteen Byonyks executives to one of this
// company's for two days, and a reader counting faces under this masthead
// completed that into "Akshar Byonyks' leadership" — which is exactly what
// spec §3.1's first non-negotiable exists to stop. The per-card
// `organisation` label is still the defence; this is the shape that stops the
// defence from having to work that hard again.
if (byonyksExecutives.length >= aksharExecutives.length) {
  throw new Error(
    `leadership: ${byonyksExecutives.length} Byonyks records against ${aksharExecutives.length} Akshar Byonyks. ` +
      "A roster under this masthead that is mostly the licensor's staff answers the wrong question. " +
      "Add the Akshar Byonyks people, or get a written client decision before changing this rule.",
  );
}

for (const executive of executives) {
  if (!executive.portraitAlt) {
    throw new Error(
      `leadership: "${executive.name}" has no alt text for a portrait.`,
    );
  }

  // A portrait can be absent, but only on purpose. Spec §9.5 requires one for
  // every executive, and a grid where some faces are quietly missing reads as
  // a company with something to hide — so the omission has to be declared, and
  // the page then says out loud that the photograph is pending.
  if (!executive.portrait && !executive.portraitPending) {
    throw new Error(
      `leadership: "${executive.name}" has no portrait and has not declared \`portraitPending\`. ` +
        "Add the photograph, or mark it pending so the page can say so.",
    );
  }

  // A ROLE CAN BE ABSENT, BUT NOT BLANK. An empty string would sail past the
  // optional type and render as a missing line rather than as a stated gap,
  // which is the failure `portraitPending` exists to prevent for photographs.
  if (executive.role !== undefined && !executive.role.trim()) {
    throw new Error(
      `leadership: "${executive.name}" has an empty role. Omit the field so the page can say the title is pending, or give the title.`,
    );
  }

  // An India note is either written or declared pending, never both. Both set
  // would render the client's own sentence and a marker saying it is missing.
  if (executive.indiaNote && executive.indiaNotePending) {
    throw new Error(
      `leadership: "${executive.name}" has an India note and is also marked pending. Clear the flag.`,
    );
  }

  if (executive.sourceUrl || executive.suppliedBy) {
    // Not authored here. The contract is provenance, not length — see the
    // header. Applies equally to a biography lifted from a public page and one
    // handed over by the client: both are somebody else's words about a real
    // person, and neither may be padded or cut to hit a word count.
    if (!executive.retrieved) {
      throw new Error(
        `leadership: "${executive.name}" is carried verbatim from ${executive.sourceUrl ?? executive.suppliedBy} with no date. ` +
          "A quoted biography without a date is a claim about someone that nobody can check against its source.",
      );
    }
    continue;
  }

  // Authored here. Spec §9.5's range applies.
  const words = bioWordCount(executive.bio);
  if (words < MIN_BIO_WORDS || words > MAX_BIO_WORDS) {
    throw new Error(
      `leadership: "${executive.name}" has a ${words}-word bio. Spec §9.5 requires ${MIN_BIO_WORDS}–${MAX_BIO_WORDS} for bios written for this site. ` +
        "Edit the bio rather than the rule.",
    );
  }
}
