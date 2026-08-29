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
