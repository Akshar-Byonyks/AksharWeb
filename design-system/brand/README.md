# Brand assets

## Logo

**Not yet in this folder.** The client shared the Akshar Byonyks logo as a pasted chat attachment on 20 August 2026, and there is no tool in this session that can pull a binary out of a chat attachment and write it to disk — so it was described and reasoned about, but never actually saved here.

**To finish this:** save the original file as `akshar-byonyks-logo.png` (or `.pdf`/`.svg` if a vector source exists — ask the client, since a vector master would matter for the favicon and print use in spec §6's "Document templates" row) in this folder.

What's known about it without the file in hand (from visual description only — treat any colour value here as unverified until the real file is run through `extract-design-system` or picked by hand):

- Full company name: **Akshar Byonyks International LLC**
- Tagline: "Transforming Renal Care Through Breakthrough Peritoneal Dialysis Innovation"
- Mark: globe (India highlighted in gold) wrapped by a gold ring through a 3D "AB" monogram, a red kidney icon overlaid on the B, gold-and-blue script wordmark below, small-caps "INTERNATIONAL LLC" underneath
- Palette: a more saturated, gradient-heavy blue than spec §6.1's flat `#0d5d8d`, plus gold and red — neither gold nor red exists anywhere in the current token system
- Typography: script/cursive for the wordmark, italic serif for the tagline — neither is Noto Sans, which is expected for a logo lockup (logos aren't held to body-copy type rules) as long as neither typeface leaks into actual UI text

**Colour decision, resolved 20 August 2026:** blue stays the dominant, functional UI colour — text, links, buttons, backgrounds, unchanged from spec §6.1. Gold enters the token system as `--color-accent-gold` (`#b08d2f`, `src/app/globals.css`), a single sparing accent restricted to large display type and non-text graphics only, same rule as `--color-brand-accent`. This also fills the "India-specific accent" requirement in §6's asset table, which nothing had claimed until now — gold is already doing that job in the logo, where it highlights India on the globe, so the token ties directly to the real mark rather than being an arbitrary addition. Red does **not** enter the token system: it stays confined to the logo's kidney icon, since a second UI red would collide with the `--destructive` error token already in `globals.css` and read as alarm on a patient-facing site. See spec §6 and §6.1 for the full reasoning.

The gold hex above was picked by hand, in the same hue family as the logo's gold, since the actual logo file still isn't saved in this folder (see above) — re-verify once it's extracted for real.
