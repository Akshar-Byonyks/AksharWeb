# Image provenance

## x1-apd-cycler.png

- **Source:** `https://byonyks.com/wp-content/uploads/2025/07/Byonyks_X-1_APD_Cycler_Screen_On_Render_V1.1.png`, fetched 20 Aug 2026.
- **What it is:** Byonyks USA's own official product visualization of the X-1 automated peritoneal dialysis cycler (screen-on state), published on their public `/products/` page. It is a 3D render, not a photograph — the filename says so (`_Render_V1.1`) and the site copy should too; don't caption it as "photography."
- **Why it's fine to use:** Akshar Byonyks is Byonyks USA's licensed India partner for this exact device (PRODUCT.md Positioning) — this is the same product, from the manufacturer's own public marketing material, not a third party's asset.
- **Still true:** no real photography of the physical device exists yet (PRODUCT.md). If Byonyks or Akshar produces real photography later, replace this render rather than running both.

## in-center-hemodialysis.png — retired 23 Aug 2026

No longer referenced. It was the visual counterpart to the X-1 render on the
Home hero's access-geometry "in-center routine" card; that card was
retitled "Life around the clinic" and swapped to a lucide-react `Hospital`
line-art glyph (DESIGN.md's default treatment for a concept with no real,
rights-clear image), since the machine-control-panel photo read as "the
control panel" rather than "the routine" the new title is about. File left
in place in case a future revision wants the photo back.

- **Source:** `https://commons.wikimedia.org/wiki/File:Hemodialysismachine.jpg`, photo by Patrick Glanz, fetched 20 Aug 2026.
- **License:** dual-licensed CC BY-SA 3.0 Unported / GNU Free Documentation License 1.2+. This note is the required attribution, plus a record of the changes made (required by the license), for as long as the file remains in the repo.
- **What it is:** a real photograph of an in-center hemodialysis machine (a Fresenius Medical Care 4008 H, per the original file's description).
- **Edits made from the original file:** cropped to the gauge/screen control panel only (excludes the machine's visible brand/model header and a cluttered real-world background); a faint reflection of a bystander in the dark monitor's frame was patched out with a solid fill matching the screen's own dark tone (PRODUCT.md's DMR Act caution against depicting patients/people in a clinical setting applies to incidental reflections too); edges feathered to transparent via an alpha gradient. No content was added or fabricated — only cropped, redacted, and faded.

---

## Added 28 August 2026 — first photographic pass

Requested by name ("more stock/images pulled from byonyks site or general Internet would make the whole website look better"), after a scope discussion recorded in the session. Three images added; two rejected on inspection, recorded below because *why an image was not used* is the more useful half of a provenance file.

### india-rural-road.jpg

- **Source:** Pexels photo 29057956, `https://images.pexels.com/photos/29057956/pexels-photo-29057956.jpeg`, fetched 28 Aug 2026 at `w=1600`.
- **License:** Pexels License — free for commercial use, no attribution required. Retained here as a record, not as a legal obligation.
- **What it is:** a tree-lined rural road in Deeg, Uttar Pradesh, with motorcyclists and cyclists travelling it. No faces are identifiable at any rendered size.
- **Why this one:** it is the access-geometry argument as a photograph. `/innovation/market/` argues that the barrier to dialysis in India is a road, and this is that road, in India, with people on it. It carries no medical claim, depicts nobody in a clinical setting, and needs no DMR Act judgement at all.
- **Used on:** `/innovation/market/` hero, behind the mandated scrim.

### india-village-road-aerial.jpg

- **Source:** Pexels photo 17165300, same fetch and license as above.
- **What it is:** an aerial of a highway cutting through a village — houses, two temples, fields either side.
- **Why this one:** the Innovation section is about a technology that has to reach places, and this shows a place. It is also the closest this project will get to a map: `figures.ts` records why no India boundary is drawn from memory, and a photograph of one real village makes no cartographic claim at all.
- **Note:** portrait orientation (1600×2400). Cropped by `object-position` in the hero rather than re-cut, so the original file stays the original file.
- **Used on:** `/innovation/` hero, behind the mandated scrim.

### x1-in-home.jpg

- **Source:** `https://byonyks.com/wp-content/uploads/2025/07/f4bea109-c03e-4962-bde6-018ab3f36f3a.jpeg`, fetched 28 Aug 2026.
- **What it is:** Byonyks USA's own lifestyle photograph of the X-1 — the cycler on a side table in a living room, a man on the sofa beside it with a laptop and a mug.
- **Why it's fine to use:** same reasoning as `x1-apd-cycler.png` — Akshar Byonyks is Byonyks USA's licensed India partner for this exact device, and this is the manufacturer's own public marketing material for it.
- **Why it is the strongest asset available:** it shows the actual licensed device in an actual home, and it shows a person *living around* the therapy rather than receiving it. That is the entire argument of `/innovation/how-it-works/` in one frame, and no stock library can supply it because the device is not in one.
- **TWO FLAGS, BOTH FOR THE LAUNCH GATE (spec §14.4):**
  1. **The subject is not Indian.** PRODUCT.md is emphatic that content is India-specific and that material which does not transfer gets replaced rather than kept for volume. A white Western man is a visible mismatch on an India-market site. Replace with India-shot photography when it exists; until then this is the only real image of the device in a home.
  2. **It depicts a person with a medical device in a therapy context.** The Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 constrains this, and this repo has previously treated that constraint strictly enough to patch a bystander's reflection out of a monitor. Using it was an explicit client decision made on 28 Aug 2026 after the risk was raised. It needs legal sign-off before launch, not a designer's judgement.

### Rejected on inspection

- **Pexels 4148842** (`pexels-gustavo-fring-4148842`), the stock photo byonyks.com itself runs. Downloaded and viewed: a young Eastern-European family playing football in a field. Wrong continent, wrong register, and precisely the generic stock that makes a site look worse rather than better. The parent company using an image is not a reason to inherit it.
- **byonyks.com's icon set** (`Group-243` through `Group-273`). Every one carries a US-specific claim — "US Govt. pushing towards 80% home dialysis", "$50,000+ is spent every year on a patient in the US". Spec §3.2 lists those as claims that do not transfer to India.

**Standing rule, worth stating once:** every image in this directory was downloaded and *looked at* before it was used. Two of the five candidates were rejected on sight, and neither could have been rejected from its filename or its alt description.

---

## Added 28 August 2026 — ByoTalks

### clinicians-in-discussion.jpg

- **Source:** Pexels photo 5452189, `https://images.pexels.com/photos/5452189/pexels-photo-5452189.jpeg`, fetched 28 Aug 2026 at `w=1600`.
- **License:** Pexels License — free for commercial use, no attribution required.
- **What it is:** three clinicians in white coats, standing, mid-discussion. No patient present, no procedure shown, no institutional branding visible, no legible name badges.
- **Why this one:** ByoTalks is clinician-to-clinician education, and this is clinicians talking to each other. It depicts a *conversation*, not a treatment, which keeps it clear of the Drugs and Magic Remedies Act 1954 question that patient imagery raises. Nobody is identifiable as a named individual, so nothing here implies endorsement.
- **FLAG FOR THE LAUNCH GATE:** the clinicians are not Indian. Same India-specificity flag as `x1-in-home.jpg`, and the same remedy — replace when India-shot photography exists.
- **Used on:** `/byotalks/` hero, behind the mandated scrim.

### Rejected on inspection

- **Pexels 36035002**, described in search results as "team of healthcare professionals at Mayflower Clinic, Ahmedabad" — and Indian, which is exactly what this site prefers. **Rejected anyway, on sight.** The photograph shows a named institution (the Mayflower Women's Hospital logo is on the wall behind them) and four identifiable clinicians whose name badges are legible at full size. Publishing it on an Akshar Byonyks page would imply that those specific real doctors and that specific real hospital are affiliated with or endorse this company. The Pexels License bars exactly that — implying endorsement by people depicted — and it is also a fertility hospital, not a nephrology one.

  Worth recording at length because it is the case the "look at it" rule exists for: this image scored best of all candidates on every criterion available from its metadata — India-specific, Ahmedabad (one of the two named manufacturing hub cities), clinicians rather than patients — and was disqualified by two details visible only in the picture itself.

---

## byotalks/ — session cards, added 28 August 2026

Eight files, named by YouTube video id: `h7SYvliTvmY`, `tKk3PncdNIU`, `zR-FiKQaiXg`, `LoM9vcf9iFM`, `B5a4U8UPbBk`, `nYlxjJW_F4I`, `Lp0raiI-Luc`, `WlGFV4oruVM`.

- **Source:** `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`, fetched 28 Aug 2026. All eight returned 1280×720 maxres.
- **What they are:** not video stills. Byonyks produced a designed card for each session — the Byonyks wordmark, the session title, headshots of the host, guest and moderator with their credentials beneath each, and the date and time the session was originally held. They are the manufacturer's own promotional artwork for their own sessions.
- **Why it's fine to use:** same basis as `x1-apd-cycler.png` and `x1-in-home.jpg` — Akshar Byonyks is Byonyks USA's licensed India partner, and these are Byonyks' public marketing assets for content Byonyks published on its own channel.
- **On the people in them:** every face is a speaker who gave that session, on the card Byonyks made to promote it. Nobody is depicted as a patient, no treatment is shown, and there is no implied endorsement to worry about — they are credited because they spoke.
- **Edits:** none. Downloaded and served as fetched.

**Why they are downloaded rather than hotlinked.** Rendering the ByoTalks index would otherwise make eight requests to `i.ytimg.com` just to draw a listing. That is the cost the facade player on the session pages exists to refuse, and accepting it on the index while refusing it on the session page would be incoherent. Serving them from this origin also means the listing survives a video being made private, and keeps the index free of third-party requests entirely — confirmed in the rendered HTML.

**The one place a third-party image request remains** is the session page itself: `lite-youtube-embed` loads its poster from `i.ytimg.com`. Spec §7.2's requirement is "no third-party *script* until click", and that holds exactly — no script, no iframe, no cookie until the play button is pressed.

**Staleness note.** If Byonyks re-cuts a session card, these copies will not update. They are cheap to refetch; the ids are the filenames.


---

## Added 29 August 2026 — `/manufacturing/`

### Nothing was used, and that is the record

DESIGN.md's imagery rule says "no image existed" is only true after someone has
gone looking. Someone went looking. This is what was found and why none of it
shipped.

**The page cannot carry facility photography at all.** There is no Akshar
Byonyks facility, and any photograph of a factory floor, a cleanroom or an
assembly line on a page titled Manufacturing reads as *this company's* factory
floor. That is not a stylistic worry on a medical device site — it is the exact
misrepresentation spec F-1 exists to prevent, arriving through a picture instead
of a sentence.

**Byonyks' own assembly photography is barred.** `byonyks.com/manufacturing/`
runs two of them (`DSC_0800-copy-1.png`, `740A4482-copy-1.png`) under the
caption "Assembly Area". Spec §10.3: "Do not use, pending F-1: any facility or
assembly photography identifying a Pakistani location."

### The hub cards: one city verified, one not

Six Pexels candidates were downloaded and viewed for the Hyderabad and Ahmedabad
cards.

- **Pexels 11742283 — usable, and held back.** A street under the metro
  viaduct, and the reason it is usable is *inside the frame*: a bus in
  **TSRTC** livery — Telangana State Road Transport Corporation — which places
  the photograph in Hyderabad on its own evidence rather than on a search
  label. Not used, for the reason below.
- **Pexels 15371756, 17376351, 18287984 — rejected.** Returned by an
  "ahmedabad" search, and nothing in any frame confirms the city. Two are
  interiors of 15th-century mosque architecture: unverifiable *and* the wrong
  register, since a religious building is not a business hub and using one as
  brand decoration on an Indian medical site is a needless sensitivity.
- The two searches returned five of the same photo ids, which is itself the
  finding: these are generic "India" results wearing city labels.

**So: no photograph on either card.** Running one confirmed city beside one
guessed city, on the page whose entire subject is *verified versus asserted*,
would have been the page contradicting itself in pictures. The Hyderabad frame
is recorded here so the decision can be revisited the moment an Ahmedabad
equivalent can be verified — the pair has to be symmetric or it should not
exist.

**If the client can supply site photography of either hub under construction,
that replaces this entire note.** A real photograph of a real building going up,
captioned as what it is, would be the strongest asset on the page.


---

## leadership/ — executive portraits, added 29 August 2026

**Fourteen photographs of named, identifiable, living people.** They are the
most rights-sensitive assets in this directory by a wide margin, and they are
here on an explicit client instruction: *"Simply pull data from byonyks.com and
use that in the about us page."*

- **Source:** each person's own page on byonyks.com — `byonyks.com/<slug>/` —
  fetched 29 August 2026. Every filename matches the slug it came from, and
  `src/lib/leadership.ts` carries the source URL and retrieval date on each
  record.
- **What they are:** Byonyks' published executive portraits. Downloaded and
  served from this origin rather than hotlinked, so the page does not make
  fourteen third-party requests and does not break if the source moves.
- **Looked at, all fourteen** (the standing gate). They are genuine portraits
  of the people they are captioned as. Nothing was edited.

### Rights — LAUNCH GATE, unresolved

These are employees of another company, photographed for that company's
website. Byonyks USA's approval for use of its **name and marks** is verbal
only (spec F-6, Open Questions 1.5). Nothing on record covers **employee
photographs**, which is a separate permission and arguably a separate one per
person depending on their contracts.

**Needed before launch:** written permission from Byonyks USA covering the use
of these fourteen portraits and biographies on aksharbyonyks.com. This is not a
formality to tidy up later — it is the difference between a licensed partner
showcasing its licensor and a website using fourteen people's faces without
asking.

### Consistency — spec §9.5 not met, and not fixable here

§9.5 requires "consistent portrait treatment: same backdrop, crop and
lighting." The source set is not consistent and cannot be made so without
editing other people's photographs:

- Backdrops run **white cut-out, pale blue, pale green, dark grey, and outdoors
  under trees**.
- At least two are **video stills or event photographs** rather than portraits —
  one subject is mid-sentence wearing a headset microphone, another is a
  full-length shot in what appears to be a workshop.

The grid normalises what can be normalised: one aspect ratio, one `object-cover`
crop, one bordered ground. The rest needs a re-shoot, which is the honest
recommendation and the same one §9.5 already makes.

### The four biographies that name a location

Not an image issue, recorded here because it travels with this set: four of the
fourteen biographies name **Lahore or Pakistan**, and two job titles read
**"South Asia"**. Spec F-1 — the client's own decision of 20 August 2026 — keeps
country attribution off this site. They are carried verbatim per the 29 August
instruction and flagged per record in `leadership.ts` under `namesALocation`.
See `deviations.md` §10.


### Rights — CONFIRMED 29 August 2026

**The client has confirmed these portraits are cleared for use from Byonyks.**
The launch-gate item recorded above is closed. The other two items in that
section — biographies naming a location, and portrait consistency — are not
affected by it, and the second is now largely addressed below.

### Edits made, 29 August 2026

Required by this file's own rule: every edit recorded. All fourteen were
downloaded, processed and **looked at at full size** before shipping.

**Ten of fourteen — backdrop replaced.** Measured first: the background of each
image was sampled across the top band and the upper side columns, and the mean
colour distance from that sample decided the treatment. Ten came back as flat
studio backdrops (spread under 12) and were replaced with the site's own
`--color-surface-3` (#eaf1f5), so the grid reads as one set rather than
fourteen photo shoots.

- The replacement is a **border-seeded flood fill**, not a global colour match.
  Only background actually connected to the edge of the frame is removed, so a
  colour that also occurs inside the subject — grey hair against a grey
  backdrop, a white collar against white — survives.
- Mask feathered by a 1.2px blur so the join is a gradient rather than a
  staircase.
- **Mary Hoffman needed her own settings.** She is shot on dark grey, and the
  shadowed strands on the left of her hair fall inside the general tolerance:
  the first run walked through them and removed about a third of her hair.
  Tolerance dropped from 52 to 26 for her image, which stopped at the hair but
  left a rim of un-removed backdrop; a bounded 3-ring mask dilation removed the
  rim. Checked at full size afterwards.

**Four of fourteen — background kept.** Ahmed Muzammal (a street), Annie Usman
(a doorway), Frank Rudolph (trees) and Rod Kenley (an event backdrop) are
photographs of people in real places, not studio portraits. There is no safe way
to cut a subject out of these without a segmentation model, and **a bad cut-out
of a real person is worse than an honest photograph**. They keep their
backgrounds and were cropped tighter instead, so less of the setting shows and
their heads sit at the same scale as everyone else's.

**All fourteen — reframed.** Every source was the same 0.62 ratio, so the 4:5
crop takes height only, anchored at the top where the heads are. `sharp`'s
`attention` strategy was tried first and rejected: it picks the highest-entropy
region, which on a portrait is often the shirt or a busy background, and it
decapitated four of the fourteen. A top-anchored crop with a per-image nudge is
predictable and checkable, which a saliency heuristic is not.

**All fourteen — re-encoded** to 900×1125 JPEG at q88 (mozjpeg). The directory
went from **5.2 MB of PNG to 1.2 MB of JPEG**; the `.png` originals were removed
and remain in git history at commit `1e856c0`.

**Nothing was retouched.** No face, skin, colour or feature was altered on any
image. The only changes are background replacement on a flat backdrop, framing,
and format.

**Still not fully met:** spec §9.5's "same backdrop, crop and lighting". Backdrop
and crop are now consistent across the ten studio portraits and the crop is
consistent across all fourteen. **Lighting is not**, and cannot be without a
re-shoot — the four environmental photographs in particular remain visibly
different in kind. That recommendation stands.


### leadership/vishnu-patel — no photograph (29 August 2026)

The first Akshar Byonyks executive published on the site arrived without one.
There is no file in this directory for him and none is expected until the client
sends it. The page publishes a marked placeholder — initials plus "Photograph
pending" — rather than a stock portrait, a silhouette, or an empty frame.

**Do not fill this with a lookalike, an AI-generated face, or a stock
photograph.** It is a real, named, living executive of the company whose site
this is; anything other than his own photograph is a fabrication about a real
person. When the photograph arrives: process it to 900×1125 (4:5) to match the
other fourteen, add `portrait` to his record and remove `portraitPending`, and
record the edit here.


### leadership/vishnu-patel.jpg — supplied and normalised (29 August 2026)

Supplied directly by the client, separately from the biography, and confirmed by
them for use. Downloaded, **looked at at full size before use**, and processed
to the same ground and framing as the rest of the set. 900×1125, 92 KB.

**This one needed a different method from the other ten.** Its backdrop is a
graded warm-brown vignette rather than a flat colour — measured spread 25.4,
about 90 levels of swing corner to centre — and brown is close enough to his
skin that colour alone cannot tell backdrop from face. Two attempts removed
parts of him before the method was right:

- **The vignette is fitted as a quadratic surface per channel**, sampled only
  from regions bounded by the *measured* top of his head, with two rounds of
  outlier rejection. Every pixel is judged against the backdrop colour predicted
  at its own position. Residual 3.0.
- **The fill is stopped by gradient, not by colour.** The backdrop is smooth
  everywhere (gradient p99 = 4.1); his silhouette is an edge. Shadow therefore
  reads as more backdrop instead of as something to chase, and skin — which
  colour and luminance both fail to distinguish from the brown — is protected by
  the edge it sits behind.
- **Bounded clean-ups:** 3-ring dilation for the contact-shadow rim, a
  connected-component rule for stray islands, and a 28px left-edge trim for one
  patch bridged to his shoulder.
- **Framing:** full width kept, top padded with the same ground colour so his
  head sits at a scale comparable to the rest. Sides and bottom deliberately not
  padded — his shoulders reach those edges and ground beyond them would read as
  a cut-out.

**Nothing about him was retouched** — no face, skin, colour or feature altered.
The only changes are background replacement, framing and format, the same as the
rest of the set.

This closes the "no photograph" note recorded above for him. It does **not**
close §9.5's consistency item: his lighting is his own, and the four
environmental photographs in the set remain different in kind. A re-shoot is
still the answer there.


### Four portraits reverted to originals — 29 August 2026

**Client instruction:** *"Revert to original portrait photos for Vishnu Patel,
Mary Hoffman, Hassan Abrar, and Nauman Tarif."*

These four now serve **the untouched source files**. The backdrop replacement,
reframe and re-encode described above **no longer apply to them**:

| File | Source of the restored copy | Size |
| --- | --- | --- |
| `vishnu-patel.jpg` | the file the client supplied, byte for byte | 525×598, 53 KB |
| `mary-hoffman.png` | recovered from git `1e856c0` | 418×673, 437 KB |
| `hassan-abrar.png` | recovered from git `1e856c0` | 636×1024, 224 KB |
| `nauman-tarif-md.png` | recovered from git `1e856c0` | 418×673, 305 KB |

Their processed `.jpg` versions were deleted. The other eleven portraits are
unchanged and remain normalised to 900×1125 on `--color-surface-3`.

Because three of these are 0.62 and the grid frame is 4:5, the frame crops them.
The portrait component anchors the crop to the **top** so that no one loses the
top of their head; checked on all four.

**Directory weight: 1.3 MB → 2.0 MB.** The three PNGs are photographs stored in
a lossless format, which is why they are large. Re-encoding them to JPEG at
their original dimensions — no crop, no backdrop change — would recover most of
that without touching anything the client asked to keep. Left as-is deliberately:
the instruction was the original files.

---

## Added 1 September 2026 — the `/locations` register

Requested by name ("each location should have an image preview"), with the
follow-up direction to "find images of the offices using the web or on
byonyks.com" rather than use stock. All five come from Byonyks' own published
pages. Six locations ship; five have an image and the sixth is recorded below
as deliberately empty.

**Why not stock city photography.** It was offered and declined, and declining
was right. A Bengaluru skyline sitting beside "43, Residency Road" is a picture
of a city that a reader will take for a picture of the premises — and on a page
whose entire argument is which company holds which building, that is the one
image class guaranteed to mislead. Every frame here is the actual building or
the actual plan.

**Licence position, all five.** Byonyks' own marketing material, used by its
licensed India partner to show the group's premises. This is the same basis
recorded for `x1-apd-cycler.png`: the manufacturer's own public asset, not a
third party's. Flag with the trade mark permission item at §14.4 — the written
permission covering the Byonyks name and marks covers these too, and it is
still verbal.

### itasca-head-office.jpg

- **Source:** `https://byonyks.com/wp-content/uploads/2025/09/1.png` ("Our Innovation Hubs", labelled Byonyks Headquarters), fetched 31 Aug 2026.
- **What it is:** a photograph of the brick office building at Itasca, Illinois. The numerals **550** are mounted on both visible faces, which corroborates the published address `550 E. Devon Avenue, Unit 140` — the picture and the address check each other.
- **Edits:** cropped from 1080×1350 to a 4:3 landscape (top 230, height 810), resized to 1200px, re-encoded JPEG q82. No content added or removed.
- **Used on:** `/locations`.

### punjab-manufacturing.jpg

- **Source:** `https://byonyks.com/wp-content/uploads/2025/09/2-1-819x1024.png` (labelled Byonyks Manufacturing Unit), fetched 31 Aug 2026.
- **What it is:** the entrance to the manufacturing building, BYONYKS in mounted metal letters on a blue panel.
- **Edits, and the important one:** the source has an **SGS "ISO 13485 System Certification" badge composited into its top-right corner**. That badge is a graphic overlay, not part of the photograph, and it asserts a credential this project has never received a certificate number for — `compliance.ts` carries ISO 13485 as *stated*, not *record*. Shipping it would put an unverifiable certification on the page as an image, where the provenance system cannot reach it. The crop (top 330, height 614) removes it entirely; the badge is not painted over, it is simply outside the frame. Then resized to 1200px, JPEG q82.
- **Checked:** no people, no legible number plates, no faces at any rendered size.
- **Used on:** `/locations`.

### lahore-research.jpg

- **Source:** `https://byonyks.com/wp-content/uploads/2025/09/3-1-819x1024.png` (labelled Byonyks R&D Facility), fetched 31 Aug 2026.
- **What it is:** the glass-fronted commercial building carrying "Byonyks — Bloodless Dialysis" signage, consistent with the published DHA Phase 3 address.
- **Edits:** same SGS badge in the same corner, removed the same way — cropped top 300, height 614, resized 1200px, JPEG q82.
- **Checked:** parked cars are in frame; no faces and no legible plates at any rendered size.
- **Used on:** `/locations`.

### hyderabad-plan.jpg and ahmedabad-plan.jpg

- **Sources:** `https://byonyks.com/wp-content/uploads/2025/09/Hyderabad-Factory-1.png` and `https://byonyks.com/wp-content/uploads/2025/09/Gujrat-Factory-2.png`, fetched 31 Aug 2026.
- **What they are — and this is the whole point:** **architectural drawings, not photographs.** Hyderabad is an isometric cutaway of a facility interior; Ahmedabad is a wireframe of an industrial shed. Neither building exists. byonyks.com files both under "Coming soon!".
- **How the site keeps that straight:** `Location.image.kind` is `"plan drawing"` for both, the visible caption is generated from that field, and a module-load contract in `locations.ts` throws if an announced site is ever given a photograph or an operating one a drawing. CLAUDE.md's "never caption a render as a photograph" is enforced rather than remembered.
- **Ahmedabad naming:** the file is named for the city the client audit specifies; the source file is named "Gujrat", a state. The row says so.
- **Edits:** cropped to 4:3 on the densest region of each drawing (Hyderabad left 180 / w 1440; Ahmedabad left 250, top 60 / 1360×1020), flattened onto white, resized 1200px, JPEG q88. Both were test-rendered at their true display width of 220px and checked for legibility before use — the fine wireframe was the one at risk and it survives.
- **Used on:** `/locations`.

### The India office — no image, deliberately

There is no photograph of the India office. byonyks.com's `/contact/` listed an
address with no picture, `/about-us/` carries only portraits and placeholder
department blocks, and a web search returned only unrelated co-working
operators. The row therefore ships with its image slot held open and marked
"No photograph published".

**Updated 1 Sep 2026.** The Bengaluru row was removed on the client's
instruction and replaced by an India office row that names no city, because
none has been published to replace it. So this row now has neither a picture
nor an address, and states both.

**This is still the row to fix first.** It is the only Akshar Byonyks premises
on the page. One photograph of the office front, and the address, would close
it.

---

## 1 September 2026 — the client-instruction pass

### products/x2-x3-teaser.png

- **Source:** `https://byonyks.com/wp-content/uploads/2025/06/ChatGPT-Image-Jun-12-2025-05_08_31-PM-1024x683.png`, fetched 1 Sep 2026 from byonyks.com's `/products/` page, where it sits under the heading "Byonyks X2 & X3 Devices".
- **What it is:** two objects of different sizes under grey dust sheets on a deep blue ground, the smaller marked X2 and the larger X3. **Neither device is visible.** It is a picture of something being withheld.
- **It is AI-generated, and the filename says so.** `ChatGPT-Image-Jun-12-2025` is Byonyks' own naming, not an inference. It is therefore not a photograph, and not a product render either — it is a teaser illustration, and `Product.image.kind` on this record is `"teaser illustration"` so the visible caption is generated from that field rather than typed. The caption reads "Byonyks · teaser illustration. Neither device has been shown."
- **Why it is usable despite being generated:** because it depicts nothing. The objection to a generated image on a medical device site is that it invents a thing and presents it as real; this one is a covered shape, and the honest content of the picture ("we are not showing you these yet") is exactly the honest content of the section it sits in. An AI render of a *device* would not have been used.
- **The alt text describes dust sheets, not devices.** Writing "the X-2 and X-3 devices" into the alt attribute would put a claim in the accessibility layer that the picture itself refuses to make, and a screen-reader user would come away believing they had been shown two machines.
- **Why it is fine to use:** same basis as `x1-apd-cycler.png` and `x1-in-home.jpg` — Akshar Byonyks is Byonyks USA's licensed India partner, and this is the manufacturer's own public marketing asset for its own announcement.
- **Edits:** none. Downloaded and served as fetched, at the 1024×683 size byonyks.com serves.
- **Used on:** `/products`, the "X-2 and X-3" section.

### Thirteen leadership portraits removed

`ahmed-muzmmal.jpg`, `andrew-king-md.jpg`, `annie-usman.jpg`, `doug-wilkerson.jpg`, `eric-flachbart.jpg`, `farrukh-usman.jpg`, `frank-rudolph-2.jpg`, `hassan-abrar.png`, `mary-hoffman.png`, `michael-wollowitz.jpg`, `nauman-tarif-md.png`, `rod-kenley.jpg`, `salahuddin-khan.jpg`.

Deleted 1 Sep 2026, with the leadership records they belonged to, on the
client's instruction to remove every Byonyks leadership card except Senthil
Kumar's. Recoverable from git history if a record ever returns.

**Deleted rather than left unreferenced, on purpose.** These are photographs of
thirteen named individuals, taken from another company's website, for which the
written permission spec F-6 requires has never existed — only a verbal one.
Leaving them served from this origin with nothing pointing at them would have
kept the entire rights exposure while removing the only justification for it.
The launch gate is now one photograph (`senthil-kumar.jpg`) rather than
fourteen.

`lahore-research.jpg` and `punjab-manufacturing.jpg` went the same day for the
same reason: the client removed the Lahore and Punjab rows from `/locations`,
so the pictures of those two buildings have nothing to illustrate.

### Rejected on inspection — the India dialysis photography search

The client asked for "more stock images of Indians getting hemodialysis, etc.
to show catering towards Indian market". **Nothing shipped from this pass**, and
the reason is worth recording in full, because it is a gap somebody has to
close rather than one this project chose to leave.

- **Pexels and Unsplash could not be searched.** Both are the sources CLAUDE.md
  names first for rights-cleared stock, and both returned `403` / `Authorization
  required` to unauthenticated automated requests from this environment. A
  Pexels or Unsplash API key would have removed this obstacle entirely, and is
  the cheapest way to unblock the request.
- **Openverse, filtered to commercial-use and to CC0/public-domain,** was
  searched across `dialysis`, `hemodialysis`, `dialysis patient`, `dialysis
  india`, `india hospital ward`, `india nurse`, `india doctor patient` and
  `india rural health worker`. It returned 114 CC0/PDM images for `dialysis`
  and **two** for `dialysis india`.
- **"New Dialysis Centre: Kankhal"** (Flickr, Belur Math Howrah, Public Domain
  Mark, five images) was the only genuinely India-specific dialysis set found,
  and every frame was downloaded and looked at. **Rejected on sight.** One is
  the inauguration ceremony of the Ramakrishna Mission's centre at Kankhal — a
  monk at a lamp, a dozen identifiable attendees, religious imagery and a named
  organisation's event. Another is a scan of a Hindi newspaper clipping, which
  is the newspaper's copyright regardless of who uploaded it. Publishing either
  under this masthead would imply that a named religious institution and a
  dozen identifiable people are affiliated with this company, which is the same
  objection that disqualified Pexels 36035002 in the 28 Aug pass.
- **The rest of the Openverse pool** is Wellcome Collection historical archive
  material (Lady Hardinge Medical College, 1900s leper hospitals), US political
  photocalls, and Flickr `by-sa` images of identifiable patients in hospital
  beds. None of it is modern, none of it is rights-clean for this use, and the
  patient images run straight into the Drugs and Magic Remedies (Objectionable
  Advertisements) Act 1954 caution this file already applies strictly enough to
  have patched a bystander's reflection out of a monitor.

**What would actually close this.** In order of value: (1) photography shot in
India for Akshar Byonyks, which is the only thing that solves it permanently
and also fixes the two standing India-specificity flags on `x1-in-home.jpg` and
`clinicians-in-discussion.jpg`; (2) a Pexels or Unsplash API key, so the two
sanctioned libraries can be searched properly; (3) Byonyks' own India-market
asset library, if one exists.

**What must not be done to close it.** Ship a photograph of an identifiable
patient receiving treatment, or a generic South-Asian stock frame that could
have been taken anywhere. CLAUDE.md is explicit that "a photograph that could
be anywhere is worth less here than no photograph", and the DMR Act makes the
first of those a legal question rather than a design one.

---

## 1 September 2026 — the client's own files

Three files supplied directly by the client, late on the same day as the
instruction pass above. All three replace things that had shipped hours earlier
as declared gaps: two `portraitPending` frames and a `LOGO: null` slot.

**Nothing here needed a licence check.** These are the client's own assets about
the client's own company and people — the first images on this site in that
category since Dr. Patel's portrait. They carry none of the Byonyks-rights
question that governs everything in the section above.

### leadership/ronak-shah.jpg

- **Source:** supplied by the client as `Ronak Headshot.png`, 1231×1277, 1 Sep 2026.
- **What it is:** a studio headshot of Dr. Ronak C. Shah in a navy suit, white shirt and blue tie against a plain white background.
- **Edits:** resized to 900×1125 with a `cover` fit anchored **north**, flattened onto white, JPEG q88 (mozjpeg). That is the same normalisation the eleven original transcribed portraits had. **No retouching, no backdrop replacement, no reframing beyond the crop** — the original is near-square (0.964) and the site's frame is 4:5, so the crop is spent on the left and right margins, which on a centred headshot is margin only.
- **Why north-anchored:** the grid renders portraits with `object-top`, so the crop and the frame agree about where the head is. A centred crop on a portrait takes the top of the head off — the reason that rule exists is recorded on `ExecutivePortrait`.

### leadership/sahil.jpg

- **Source:** supplied by the client as `Sahil Heeadshot.jpg`, 2656×3984, 1 Sep 2026.
- **What it is:** a headshot of Sahil in a tan sweater over an open-collared white shirt, with an out-of-focus city skyline behind him.
- **Edits:** identical treatment — 900×1125, `cover` anchored north, q88. The crop does real work on this one: the original is a three-quarter-length shot at 0.667, so north-anchoring keeps the head where the frame expects it and spends the crop on the bottom of the frame rather than the top of his head.
- **The backdrop is a skyline, not a studio ground,** and that is a §9.5 note rather than a defect to fix here. Spec §9.5 asks for "same backdrop, crop and lighting" across the set; all four portraits now share a crop and none of them shares a backdrop — brown studio, white, white, skyline. **The only honest fix is a single shoot.** Editing a real person's photograph to swap the background behind them was tried once on this project, on Dr. Patel's portrait, and the client reversed it the same day (29 Aug 2026).

### brand/ — three assets, all cut from one supplied file

- **Source:** supplied by the client as `Akshar Byonyks Logo.png`, 1628×1258, opaque white background, no alpha, 1 Sep 2026.
- **What it is:** the full Akshar Byonyks International LLC lockup — a rendered globe with India picked out in gold, a gold orbital ring, the AB monogram with a kidney forming the B's counter, the script wordmark, "INTERNATIONAL LLC", and the two-line tagline "Transforming Renal Care Through Breakthrough Peritoneal Dialysis Innovation".
- **Ink bounding box measured, not eyeballed:** x 260–1371, y 60–1190 against a pure-white field, which is what every crop below is derived from.

**THE LOCKUP CANNOT BE USED WHOLE IN A NAV BAR, and that is a fact about the
artwork.** It stacks five elements into a near-square. At the 34px the nav
reserves it would be 44px wide with the tagline set at under 2px. So it is cut
into two assets by use, rather than scaled until it is a smudge.

#### brand/akshar-byonyks-emblem.png — the nav mark

- **Crop:** `extract` left 270, top 50, w 1095, h 700 from the source, then `trim` at threshold 12 → 1003×689. That box is the globe, the gold ring and the monogram, and stops above the script wordmark.
- **Output:** 360×247 PNG with a palette (`palette: true, quality: 92`). Palette rather than full colour because this is a photographic render the nav loads on **every page** — full-colour PNG cost 290KB for the same pixels, palette costs 51KB.
- **Sized for 3×:** rendered at 34px tall, so 360px wide covers the densest screen with room to spare.
- **Used on:** the site nav (`animated-nav.tsx`), where it is the home link. Its `alt` carries the company name, because it replaced a link that read "Home" and is the link's only accessible name.

#### src/app/opengraph-image.jpg — the default share card

- **Crop:** the full lockup, trimmed of its white margin, fitted `inside` 1000×520 and then `contain`ed onto a 1200×630 white canvas. 94KB, q90 mozjpeg. `opengraph-image.alt.txt` sits beside it with the alt string.
- **Contained, never cropped to fill.** 1200×630 is 1.9:1 and the trimmed lockup is roughly square; cropping it to fill would cut either the globe off the top or the tagline off the bottom.
- **It lives in `src/app/`, not `public/`,** so Next's file convention serves and fingerprints it, and Home picks it up with no metadata at all.
- **Every other route reaches it through `defaultOg` in `src/lib/seo.ts`, and that indirection is load-bearing.** Next merges route metadata shallowly per top-level key: a page exporting any `openGraph` object replaces the parent's wholesale. Declaring the image on the root layout reached exactly one route (Home), and so did the file convention on its own — both measured, both fixed by the pages importing one constant. That file carries the full reasoning.
- **Used on:** all twenty routes. The two product pages pass their own device imagery instead and should. Before this, eighteen routes shared to WhatsApp and LinkedIn as a bare title over a blank rectangle. `twitter:image` is derived from it automatically.

#### src/app/icon.png and src/app/apple-icon.png — the favicon

- **Crop:** the same trimmed emblem, `contain`ed on white and extended with a 32px margin, at 512×512 and 180×180. Palette PNG, 77KB and 12KB.
- **The margin is deliberate.** A favicon whose artwork bleeds to its own edges reads as a crop of something larger rather than as a mark.
- These use Next.js's file convention, so they are picked up automatically and no `icons` entry in `metadata` is needed. The pre-existing `src/app/favicon.ico` is left in place as the legacy fallback.

**WHY THE LOGO IS NOT IN THE FOOTER.** The footer is `bg-ink`. The supplied file
has an opaque white background and no alpha, so it would sit there as a white
rectangle. Knocking the white out is not the easy fix it sounds like: the
artwork's own highlights are white — the keyline around the AB monogram, the
silver continents — so a threshold-based knockout punches holes through the
middle of the mark, and the globe's soft drop shadow survives as a grey smudge
on dark. A border-connected flood fill would preserve the interior whites and
still leave the shadow. **The right fix is a transparent-background or
reversed-out version from whoever made the logo**, which is one request, so the
footer waits for it rather than shipping a damaged mark.

---

## 1 September 2026 — the curtain's wordmark becomes artwork

The opening curtain no longer sets type. It draws outlines, generated once and
committed as `src/lib/splash-wordmark.ts`. **No image file ships for this** —
the mark exists only as path data — but its provenance belongs here with
everything else the site draws from someone's artwork.

### Where the Byonyks half comes from

- **Source:** `https://byonyks.com/wp-content/uploads/2026/06/Byonyks-Logo-Transparent-BG-scaled.png`, fetched 1 Sep 2026. 2560×834 PNG, RGBA, genuine alpha.
- **What it is:** Byonyks' own wordmark — a rounded brush script, with a bespoke B carrying a flame flourish above it and a tail that sweeps left and underneath the whole word.
- **Rights:** Byonyks' mark, used on the site of its Indian licensee, and it sits in exactly the same category as the Byonyks photographs and press text already used here. **It is the one asset on this page that puts another company's registered wordmark on an Akshar Byonyks surface, which is a brand decision rather than a technical one** — the client asked for it directly, in writing, on 1 Sep 2026.

### Why it had to be traced

**No font can produce this mark, and that is the whole reason the curtain
changed.** The B is drawn, not set: nothing in any typeface carries that
flourish or that tail. The previous curtain approximated the letterforms with
Yellowtail; asked whether it could look like the real thing, the honest answer
was only by using the real thing.

The curtain's animation draws its wordmark as a stroke and then floods it, and
**a raster cannot be stroked** — so the mark had to become outlines to take
part in an animation the client had already approved.

### The trace, and how to redo it

Run offline, in a scratch directory, with `potrace` and `sharp`. Nothing below
is a project dependency and nothing runs at build time.

1. **Flatten the alpha, not the colour.** The artwork is one flat blue on transparency, so the colour channels carry no edge. `sharp(src).ensureAlpha().extractChannel("alpha").negate()` gives black ink on white ground, which is what a tracer wants.
2. **`potrace.trace`** at `threshold: 128, turdSize: 2, optCurve: true, optTolerance: 0.2, alphaMax: 1`. Output: 10 contours, visually indistinguishable from the source at 2400px wide — compared side by side before it was accepted.
3. **Coordinates are rounded to one decimal** and the contours split on their moveto, then **ordered by leftmost point** so the draw reads as writing rather than as the whole mark surfacing at once.

**The trace is the union outline, and that matters more than it sounds.**
potrace follows the boundary of the ink, so where the B's tail runs beneath
"yonyks" the contour goes around the merged silhouette rather than through it.
That is precisely the shape the knockout mask added earlier the same day has to
synthesise for live text — so this half arrives already clean.

### The "Akshar" half

Pacifico, converted to outlines with `opentype.js` and committed as path data.

- **Licence:** SIL Open Font License 1.1. Converting glyphs to outlines inside a design is use, not redistribution of the font.
- **Why Pacifico and not Yellowtail.** Yellowtail was chosen against the *Akshar Byonyks* lockup, which is a high-contrast, sharply slanted script. Beside Byonyks' rounded brush mark it is plainly the wrong weight and the wrong axis. The three pairings were rendered on the real ink ground and compared; Pacifico matches the artwork's roundness, weight and terminals, which is also what the 31 Aug note predicted before the lockup arrived and changed the target.
- **Sized by measurement.** Pacifico's x-height was read off a rendered `a` (473/1000em) and the face set at 723 so its x-height equals the artwork's own measured 342 units. Both halves sit on the artwork's measured baseline, y=650. The gap is 190 units, chosen by rendering 60 and 190 and looking at how much air the B's tail needs under the "r".

**Nothing rewrites path coordinates.** "Akshar" is generated at its final
origin by opentype and the artwork is placed with an SVG `transform`. The first
attempt shifted numbers with a regex and produced a viewBox three times too
tall, because a regex mis-pairs operands the moment a negative number abuts its
predecessor.

### What it replaced, and what that saved

`Yellowtail` left `src/app/layout.tsx` in the same change. **It had been loading
on all twenty-one routes to serve one decoration on one of them.** The curtain
now needs no webfont at all, renders identically on the server and in the first
paint, and can no longer show a fallback face and then jump.
