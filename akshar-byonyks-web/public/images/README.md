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
