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
//     company's website. One remained — Senthil Kumar's — which left the
//     written permission Byonyks USA had only given verbally as a launch gate
//     over one photograph rather than fourteen. The other three portraits are
//     the client's own, supplied directly, and carry no rights question.
//
//     CLOSED 10 SEP 2026, and not by the permission arriving: the client
//     decided verbal confirmation is all this project needs from Byonyks, so
//     the gate was retired rather than met. `pending-trademark` came out of
//     the claims ledger the same day and the note it fed on `/terms-of-use`
//     came off with it. Senthil Kumar's portrait is covered by that decision.
//
//     THE ROSTER IS CLOSED TO BYONYKS PEOPLE from the same instruction: no
//     Byonyks staff go into this site, and he stays only as the standing
//     1 Sep exception. A new record must be `organisation: "Akshar Byonyks"`.
//     The union keeps `"Byonyks"` because his record still needs it — it is
//     not an invitation to add a second.
//   • Spec §9.5's "same backdrop, crop and lighting" was unmeetable across a
//     set assembled from someone else's website. All four portraits are now
//     published and all four are normalised to the same 900×1125 frame, so
//     what is left is backdrop: white, white, a brown studio ground and a city
//     skyline. A single shoot closes it; nothing else honestly can, because
//     the remaining fix is editing photographs of real people.
//
// SEVEN RECORDS, SIX OF THEM THIS COMPANY'S OWN (11 Sep 2026). Sahil
// Pankhaniya, Dr. Vishnu Patel, Dr. Ronak C. Shah, Dr. Rohit Pankhaniya,
// Dr. Rashmin Gandhi and Dr. Yogesh Tank are Akshar Byonyks; Senthil Kumar is
// Byonyks and stays on the client's explicit instruction. The list is still
// ONE list (client instruction, 29 Aug 2026: "Dont make Akshar Byonyks and
// Byonyks 2 seperate lists. Should be one in the same.").
//
// THE COUNTS IN THIS HEADER ARE MAINTAINED, and that is not housekeeping.
// Deviation 30 records what happened the last time they were not: four client
// instructions landed on these records across a week, nobody re-read the prose
// describing them, and the site's own transparency register ended up
// publishing a statement about this company's leadership that the leadership
// page contradicted. If you change the roster, change the sentences that count
// it — here, in `leadershipStatus` below in about.ts, and in the ledger.
//
// WHICH KEEPS `organisation` REQUIRED, THOUGH IT STOPPED BEING PRINTED ON
// 12 SEP 2026. The client asked for the per-person company tag to come off the
// roster cards and the profile heroes, and it did — see deviation 38. The
// field did not go with it, and the distinction between the two companies did
// not either; what changed is that no sighted reader is now shown it beside a
// face.
//
// WHAT STILL READS THIS FIELD: the counts sentence on the roster page, the
// per-profile meta description, and the JSON-LD's `worksFor`. Spec §3.1's
// first non-negotiable is that the two companies are never blurred, and those
// three are what hold it now. Deleting the field would break all three at
// once and would be a far larger change than the one that was asked for.
//
// The old note here read "Do not remove it without a written client decision
// recorded in deviations.md." That is exactly what happened, so the sentence
// did its job. Keep the same bar for the field itself.
//
// ─── ONE THING THAT NEEDS THE CLIENT BEFORE LAUNCH ──────────────────────────
//
// (Portraits for Dr. Shah and Sahil were one of the original three. Both were
// supplied on 1 Sep 2026, hours after those records first shipped with
// `portraitPending`, and both are now published. `portraitPending` stays on
// the type because the next supplied record may need it.)
//
// 1. **JOB TITLES — CLOSED, 8 Sep 2026.** Every card on this roster now names
//    an office. The client supplied the officer schedule and confirmed it is
//    current, which answered in one line what this file had spent a week
//    refusing to guess: Sahil Pankhaniya is President and Chief Executive
//    Officer, Dr. Shah is Secretary, Dr. Rohit Pankhaniya is Assistant
//    Secretary, and Dr. Patel holds two offices — Vice President, and Chief
//    Financial Officer and Treasurer.
//
//    Kept here rather than deleted, because the shape of the fix is the point:
//    "nephrologist" was sitting in Dr. Shah's own biography the whole time and
//    would have been wrong. He is Secretary. A title read out of a description
//    is a guess that happens to be well-informed, and this is what it would
//    have cost. `role` stays optional for the next record that arrives without
//    one.
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
//    therefore meets an Akshar Byonyks label above a Byonyks biography.
//
//    **PARTLY ANSWERED, 8 Sep 2026.** His card now reads "Secretary" under
//    "Akshar Byonyks", which is the clarification option 1 anticipated: a
//    named office at this company is a much harder fact than an organisation
//    label, and a reader meeting it above a Byonyks biography can now see that
//    both are true rather than that one contradicts the other. What is still
//    open is the biography itself, which describes Byonyks' mission and not
//    his work here. That needs a line in his own words, not this project's.
//
// ─── THE CONTRACT ───────────────────────────────────────────────────────────
//
// Spec §9.5 wants bios of 150 to 250 words. That rule is enforced below for
// biographies this project authors, and deliberately not for ones carried
// verbatim: padding a 124-word bio to 150 means inventing facts about a real
// person, and cutting a 517-word one means deciding which half of someone's
// career matters. Verbatim records answer to a different contract —
// provenance — and that is the one enforced on them. Six of the seven records
// here are verbatim, so none of those is length-checked and every one carries
// a date. The seventh, Dr. Yogesh Tank's, has a title but no biography yet
// and declares `bioPending`; see that field.

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
   * Which company this person is an executive of. Never inferred from the site
   * it appears on.
   *
   * NO LONGER PRINTED ON THE CARD OR THE PROFILE (12 Sep 2026, client
   * instruction, deviation 38). Still required, and still read by the roster's
   * counts sentence, the profile meta description and the JSON-LD
   * `worksFor` — so a wrong value here is now a wrong value a reader cannot
   * see and correct for, which makes it more dangerous than it was, not less.
   */
  readonly organisation: "Akshar Byonyks" | "Byonyks";
  /**
   * 150-250 words when authored here; verbatim when transcribed or supplied.
   *
   * OPTIONAL SINCE 11 SEP 2026, and only in the same way `role` is: a record
   * may arrive as a name, a title and a photograph with the words still to
   * come, and holding the whole person off the roster until a paragraph
   * exists is the wrong trade. What is NOT optional is saying so — a record
   * without a bio must set `bioPending`, or the contract at the foot of this
   * file throws.
   *
   * Do not write a placeholder biography. That is the one failure this field
   * being optional exists to prevent: a sentence composed here about a real
   * person, to fill a page, reading as though they had supplied it.
   */
  readonly bio?: string;
  /**
   * No biography provided yet. The record publishes and the profile page says
   * the biography is to come, in the same grammar the portrait frame uses for
   * "Photograph pending" and the card uses for "Title to be confirmed".
   *
   * Deliberately explicit, like `portraitPending`: a missing `bio` alone
   * fails the build, so a biography can only go missing on purpose.
   */
  readonly bioPending?: boolean;
  readonly portrait?: string;
  readonly portraitAlt: string;
  /**
   * A LinkedIn profile URL, if the person has one and the client has given it.
   *
   * RENDERED IN TWO PLACES, DIFFERENTLY. The profile page has a labelled text
   * link; the roster card, since 12 Sep 2026, has the LinkedIn mark pinned to
   * the corner of the portrait. Both are optional per record and the card
   * simply has no mark where this is absent, which is why it must never be
   * filled with a guessed or searched-for profile: a wrong LinkedIn is a link
   * to a different real person under this person's name and face.
   */
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
    // The `organisation` on every record still carries the distinction spec
    // §3.1 requires, but since 12 Sep 2026 it is no longer printed on the card
    // or the profile — only in the roster's counts sentence, the profile meta
    // description and the JSON-LD's `worksFor`. See deviation 38.
    slug: "vishnu-patel",
    name: "Vishnu Patel",
    postNominals: "MD",
    // TWO OFFICES, ONE PERSON, AND THE SEMICOLON IS DOING REAL WORK. The
    // client's officer schedule (8 Sep 2026) lists him twice: "Vice President:
    // Vishnu Patel" and "Chief Financial Officer and Treasurer: Vishnu Patel".
    // Client instruction was to carry both, combined.
    //
    // The separator is a semicolon rather than a comma because the second
    // office already contains an "and" — "Vice President, Chief Financial
    // Officer and Treasurer" reads as one three-part title held by one person,
    // which is a different claim from two distinct offices held concurrently.
    // The semicolon is the only punctuation here that keeps them countable.
    role: "Vice President; Chief Financial Officer and Treasurer",
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
    // Supplied by the client 12 Sep 2026. Second record on this roster to
    // carry one, after Senthil Kumar's, which was transcribed from
    // byonyks.com in August.
    linkedin: "https://www.linkedin.com/in/vishnu-patel-b07b4232a/",
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
    // From the client's officer schedule, 8 Sep 2026, confirmed current. This
    // closes one of the two title gaps this file has carried since 1 Sep.
    role: "Secretary",
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
    // A SURNAME AND A SLUG CHANGE, from the client's officer schedule of
    // 8 Sep 2026: "President and Chief Executive Officer: Sahil Pankhaniya."
    // He had shipped as "Sahil" alone since 1 Sep because that is all the
    // supplied biography gave.
    //
    // THE OLD SLUG IS REDIRECTED, NOT ABANDONED. `/about-us/leadership/sahil`
    // was live and in the published sitemap, so changing it silently would
    // 404 anything already linking to the chief executive's profile. The
    // permanent redirect is in `next.config.ts`, beside the two the site
    // already carries for retired paths.
    //
    // The portrait file was renamed with him — every other portrait in this
    // set is named for a full name, and `sahil.jpg` was the one exception.
    slug: "sahil-pankhaniya",
    name: "Sahil Pankhaniya",
    role: "President and Chief Executive Officer",
    organisation: "Akshar Byonyks",
    // Supplied by the client, 1 Sep 2026. Same normalisation as Dr. Shah's —
    // 900×1125, `cover` anchored north, q88 — applied to a 2656×3984 original,
    // so the crop is doing real work here: north-anchoring keeps the head
    // where the grid's `object-top` frame expects it and spends the crop on
    // the bottom of a three-quarter-length shot.
    portrait: "/images/leadership/sahil-pankhaniya.jpg",
    portraitAlt:
      "Portrait of Sahil Pankhaniya, in a tan sweater over an open-collared shirt, with a city skyline behind him.",
    suppliedBy: "Akshar Byonyks",
    retrieved: "1 September 2026",
    bio: "Sahil is a former banker inspired to help expand access to effective and affordable dialysis treatments. Growing up around dialysis patients and clinicians, it was clear to him that providers were doing their best with outdated tools. Now, he is committed to offering a modern PD solution to the Indian healthcare provider and patient.",
  },
  {
    // Supplied by the client, 8 Sep 2026, with the instruction to treat the
    // record as Akshar Byonyks personnel. Carried verbatim.
    //
    // "MD" IS THE CLIENT'S ANSWER, 8 Sep 2026, not this project's inference.
    // The record shipped hours earlier with no post-nominals and a note
    // explaining why: the biography says he completed his medical education in
    // India, an Indian medical degree is an MBBS rather than an MD, and the
    // letters that would have made his card match his colleagues' were the
    // ones most likely to be wrong for him specifically. A qualification on a
    // named physician is a claim, not a formatting detail. The question was
    // asked and answered, which is the only way it could have been settled.
    //
    // THE ROLE IS THE CLIENT'S, from the officer schedule of 8 Sep 2026 and
    // confirmed current. It shipped hours earlier with no title, because the
    // only title available was "board-certified nephrologist practicing in
    // Port Charlotte, Florida" — which describes his clinical practice, not
    // his job at this company, and reading a title out of a description is how
    // a leadership page ends up asserting something nobody said. Asked
    // instead, and this is the answer.
    //
    // `namesALocation` is deliberately NOT set. It exists for the locations
    // spec F-1's attribution decision keeps off this site; Florida, India and
    // the two US hospitals are not those, and marking them would drain the
    // flag of the meaning it was created to carry.
    slug: "rohit-pankhaniya",
    name: "Rohit Pankhaniya",
    postNominals: "MD",
    role: "Assistant Secretary",
    organisation: "Akshar Byonyks",
    // Supplied by the client, 8 Sep 2026, as `Rohit Headshot.png` — 1179×1186,
    // sRGB, no EXIF. Normalised the same way the other four were: 900×1125,
    // `cover` anchored north, flattened on white, q88 mozjpeg.
    //
    // THE CROP COSTS NOTHING HERE, which is worth recording because it does
    // not on every portrait. The source is 0.994 against the grid's 4:5, so
    // `cover` takes the left and right margins rather than the top of a head —
    // the same situation Dr. Shah's near-square original was in. Checked
    // against the rendered card frame before shipping, not assumed.
    //
    // ITS ORIGIN WAS QUESTIONED AND IS NOW SETTLED: the client confirmed on
    // 10 Sep 2026 that this is a real photograph, and the launch gate that
    // stood on it is closed.
    //
    // The file had arrived as a 72dpi near-square PNG with no EXIF at all,
    // which is a set of signals consistent with a generated likeness — and
    // equally consistent with a real photograph exported through an editor or
    // saved off LinkedIn, which is why it was flagged for the client rather
    // than judged here. It was the second reading. Full reasoning is kept in
    // public/images/README.md rather than deleted, because the check was right
    // to run even though the suspicion was wrong.
    //
    // `portraitAlt` needs no change. It describes what is in the frame without
    // asserting how the image was made, which is accurate either way, and
    // nothing on the site captions it as a render.
    portrait: "/images/leadership/rohit-pankhaniya.jpg",
    portraitAlt:
      "Rohit Pankhaniya, MD, in an open-collared white shirt and dark-framed glasses, against a plain grey backdrop.",
    suppliedBy: "Akshar Byonyks",
    retrieved: "8 September 2026",
    bio: "Dr. Rohit Pankhaniya is a board-certified nephrologist practicing in Port Charlotte, Florida.\n\nAfter completing his medical education in India, he pursued advanced training in the United States, completing an Internal Medicine residency at Wayne State University and a Nephrology fellowship at Henry Ford Hospital. He has been providing specialized kidney care in Florida since 2008.\n\nIn addition to his clinical work, Dr. Pankhaniya is involved in commercial real estate development and biotech startup investments.\n\nHis passion for nephrology is deeply personal. Early in life, he witnessed a close family member navigate the significant challenges of peritoneal dialysis in India. This experience inspired his involvement with Byonyks USA beginning in 2024. Working alongside Dr. Patel and the ABI team, he is committed to advancing innovative, life-saving treatments and making them accessible to patients in his home country.",
  },
  {
    // SUPPLIED BY THE CLIENT, 11 SEP 2026, AND CARRIED WORD FOR WORD. The
    // second of the two records added that day, and the opposite case to
    // Yogesh Tank directly below: a full biography, a named role, and a
    // photograph all arriving together.
    //
    // TWO SETS OF POST-NOMINALS WERE GIVEN AND BOTH ARE CARRIED. The client's
    // covering line reads "Rashmin Gandhi, MD"; the supplied profile's own
    // signature line reads "Dr. Rashmin Gandhi, FRCS (Edinburgh), FRCS
    // (Glasgow)", and the biography corroborates the second pair in prose
    // ("holds FRCS qualifications from both Edinburgh and Glasgow"). Nothing
    // in the supplied text mentions an MD.
    //
    // Publishing both is the only option here that does not involve this
    // project deciding which of a real clinician's stated credentials to drop.
    // Dropping the MD would edit the client's own line about their own person;
    // dropping the FRCS pair would discard the qualifications the biography
    // actually evidences. **If the MD is wrong, this is the field to fix, and
    // it should be fixed rather than left** — a medical degree somebody does
    // not hold is a real misstatement about a real person on a medical device
    // site, and it is flagged for that reason rather than for tidiness.
    //
    // HE IS ALSO THE GRIEVANCE OFFICER AND THE CARE-OF NAME ON THE INDIA
    // ADDRESS. Three roles, one person, across three parts of this site —
    // `grievanceOfficer` and `indiaOffice` in site-config.ts are the other
    // two. /grievance-redressal links to this profile so a complainant can
    // see who they are writing to. The roles are deliberately NOT merged:
    // "India Division Lead" is his job and "Grievance Officer" is a statutory
    // appointment under the DPDP Act, and a card that ran them together would
    // make the second look like a job title rather than a legal function.
    //
    // NO `indiaNote`. That field exists for a record whose biography does not
    // describe an India role — Senthil Kumar's is the only one. This
    // biography is about the India role from its first sentence.
    slug: "rashmin-gandhi",
    name: "Rashmin Gandhi",
    postNominals: "MD, FRCS (Edinburgh), FRCS (Glasgow)",
    role: "India Division Lead",
    organisation: "Akshar Byonyks",
    bio: "Dr. Rashmin Gandhi is a distinguished ophthalmic surgeon, healthcare leader, researcher, and medical technology innovator who serves as India Division Lead for Akshar Byonyks International (ABI). In this role, he helps guide ABI\u2019s strategy, clinical engagement, partnerships, and development initiatives across India.\n\nDr. Gandhi brings more than two decades of experience spanning clinical medicine, academic leadership, medical technology, research, and international healthcare initiatives. He currently serves in several leadership roles, including Director of Axon Medtech Pvt Ltd, Managing Director of Foresight Worldwide, Consultant and Director of Neuro-Ophthalmology at Centre for Sight in Hyderabad, and Fellowship Director and Board Member of the World Headache Society. He is also a founding member of the Indian Neuro-Ophthalmology Society and Country Director for the Davos Alzheimer\u2019s Collaborative.\n\nHis academic and research work includes investigations into ocular movement and pupil responses as potential biomarkers for dementia and Alzheimer\u2019s disease, along with collaborations involving IIT Madras, IIIT Hyderabad, and the University of Hyderabad.\n\nDr. Gandhi holds FRCS qualifications from both Edinburgh and Glasgow and completed a Fellowship in Neuro-Ophthalmology at Johns Hopkins University in the United States.\n\nThroughout his career, he has combined clinical excellence with innovation, education, and global outreach. He has led international surgical and teaching missions, participated in scientific meetings worldwide for more than 25 years, contributed to books and peer-reviewed publications, and mentored ophthalmologists and fellows.\n\nAt ABI, Dr. Gandhi brings extensive clinical, academic, technology, and healthcare leadership experience to support the organization\u2019s growth and development in India.",
    portrait: "/images/leadership/rashmin-gandhi.jpg",
    portraitAlt:
      "Rashmin Gandhi, photographed head and shoulders against a plain white background, in a navy jacket over a light blue checked shirt and dark-framed glasses.",
    suppliedBy: "Akshar Byonyks",
    retrieved: "11 September 2026",
  },
  {
    // SUPPLIED BY THE CLIENT, 11 SEP 2026 — a name, post-nominals and a
    // photograph, with the biography still to come. The first record on this
    // roster to publish with no words at all, which is what `bioPending` was
    // added for.
    //
    // THE TITLE ARRIVED ON CLIENT INSTRUCTION, 12 SEP 2026: "India Division
    // Co-Lead". It is set here rather than inferred, which is the same rule
    // that kept it blank before — nothing was ever read out of the
    // post-nominals. "MD" says he is a physician; it does not say what he does
    // at this company, and Dr. Shah's record already carries the cost of
    // guessing a title from a description (see the note at the head of this
    // file, where "nephrologist" would have been wrong, because he is
    // Secretary).
    //
    // CO-LEAD SITS BESIDE Dr. Rashmin Gandhi's "India Division Lead" directly
    // above. Two related titles on one division is what the client supplied.
    //
    // THE BIOGRAPHY IS STILL PENDING, so `bioPending` stays and the gap in
    // `about.ts` and the ledger entry `pending-tank-record` narrow to the
    // biography alone rather than closing.
    slug: "yogesh-tank",
    name: "Yogesh Tank",
    postNominals: "MD",
    role: "India Division Co-Lead",
    organisation: "Akshar Byonyks",
    bioPending: true,
    portrait: "/images/leadership/yogesh-tank.jpg",
    // The alt describes the photograph, not the person's profession. It is
    // the same discipline the products teaser's alt keeps: say what is in the
    // frame, and do not put a claim in the accessibility layer that the
    // picture cannot make.
    portraitAlt:
      "Yogesh Tank, photographed from the chest up in a brown tweed jacket over a blue checked shirt, against a softly blurred office interior.",
    // NO `suppliedBy` AND NO `retrieved`, and that is correct rather than an
    // omission. Those two fields are the provenance of a VERBATIM BIOGRAPHY,
    // and there is no biography here yet. The photograph's provenance is in
    // public/images/README.md, which is where CLAUDE.md requires it. When the
    // words arrive, both fields go on with them.
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
    // and Oasis and mentions India nowhere; on an India-market roster that is
    // otherwise entirely this company's own people, "what does he do here" is
    // the question his card raises and the page had better not answer it by
    // guessing. See the field documentation on `indiaNote`. The pending block
    // that used to state this on his profile came off on 11 Sep 2026 at the
    // client's request, so `pending-india-note` in the claims ledger is now
    // the only place the question is recorded.
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

/**
 * THE TWO PRINCIPAL OFFICERS, AND EVERYONE ELSE.
 *
 * Client instruction, 11 Sep 2026: "put President and Vice President in their
 * own row at the top. Everyone should go below." The roster page renders
 * these two first, in their own two-up row, then "otherExecutives" in the
 * three-column grid it has always used.
 *
 * MATCHED ON THE OFFICE, NOT ON A HAND-WRITTEN LIST OF SLUGS. The officer
 * schedule the client supplied on 8 Sep 2026 is the source of "role", and a
 * hardcoded ["sahil-pankhaniya", "vishnu-patel"] here would silently keep
 * showing two people as principals after an officer change. Reading the
 * titles means the row follows the schedule.
 *
 * PRESIDENT BEFORE VICE PRESIDENT, always, regardless of roster order: a row
 * of two that puts the deputy first is a worse statement than no row at all.
 * "Vice President" contains "President", so the president test excludes it
 * explicitly rather than relying on substring luck.
 *
 * ONE MORE THING THE WORD BOUNDARY IS DOING. Dr. Patel holds two offices and
 * his "role" reads "Vice President; Chief Financial Officer and Treasurer",
 * so the match has to survive a compound title. It does, because it tests for
 * the office anywhere in the string rather than for equality.
 */
const isPresident = (executive: Executive) =>
  /\bpresident\b/i.test(executive.role ?? "") &&
  !/\bvice president\b/i.test(executive.role ?? "");

const isVicePresident = (executive: Executive) =>
  /\bvice president\b/i.test(executive.role ?? "");

export const principalExecutives: readonly Executive[] = [
  ...executives.filter(isPresident),
  ...executives.filter(isVicePresident),
];

export const otherExecutives: readonly Executive[] = executives.filter(
  (executive) => !principalExecutives.includes(executive),
);

/**
 * The roster in the order the page actually renders it.
 *
 * The leadership page's JSON-LD emits an "ItemList" with a "position" on every
 * entry, and a position that disagrees with the reading order is a worse
 * statement than no position at all — it tells a crawler the deputy is first.
 * So the page reads this rather than "executives", and the two orders cannot
 * drift apart the way they did the moment the principals row was added.
 */
export const rosterOrder: readonly Executive[] = [
  ...principalExecutives,
  ...otherExecutives,
];

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

// THE TOP ROW IS A ROW OF TWO, AND THE PAGE'S LAYOUT ASSUMES IT. The roster
// renders "principalExecutives" in a two-column grid above the main list, so
// a third principal would silently produce a two-up row with a lone card
// hanging under it. If the officer schedule ever puts three people in that
// row, change the grid in the same commit that changes this rule.
if (principalExecutives.length !== 2) {
  throw new Error(
    `leadership: ${principalExecutives.length} principal officers matched, expected 2 ` +
      "(one President and one Vice President). The roster page renders them as a " +
      "two-up row above everyone else; fix the officer titles, or change the grid " +
      "and this contract together.",
  );
}

// AND NOBODY MAY BE IN BOTH HALVES OR NEITHER. Cheap to check, and it is the
// invariant the page depends on to render each person exactly once.
if (principalExecutives.length + otherExecutives.length !== executives.length) {
  throw new Error(
    "leadership: the principal/other split does not account for every record exactly once.",
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

  // A BIOGRAPHY CAN BE ABSENT, BUT ONLY ON PURPOSE — the same rule, and the
  // same reasoning, as `portraitPending` above. A record that quietly renders
  // a profile page with no words on it reads as broken; one that says the
  // biography is to come reads as deliberate, and the gap stays visible to
  // the client every time they open the page, which is how the words
  // eventually arrive.
  if (!executive.bio && !executive.bioPending) {
    throw new Error(
      `leadership: "${executive.name}" has no biography and has not declared \`bioPending\`. ` +
        "Add the biography, or mark it pending so the page can say so. Do not write one here.",
    );
  }

  // AND NEVER BOTH. A record carrying real words under a marker saying the
  // words are missing is the same contradiction `indiaNotePending` refuses
  // two checks above.
  if (executive.bio && executive.bioPending) {
    throw new Error(
      `leadership: "${executive.name}" has a biography and is also marked pending. Clear the flag.`,
    );
  }

  // Nothing below this line can run without a biography to measure.
  if (!executive.bio) continue;

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
