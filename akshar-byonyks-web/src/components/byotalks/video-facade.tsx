import { YouTubeEmbed } from "@next/third-parties/google";
import { Captions } from "lucide-react";

import { PendingNote } from "@/components/common/pending-note";
import type { ByoTalksSession } from "@/lib/byotalks";

// The ByoTalks player. Spec §7.2: "Video card + player — Facade-loaded, no
// third-party script until click."
//
// WHY `@next/third-parties` AND NOT A shadcn OR React Bits COMPONENT. The
// requirement here is not a player, it is a *facade* — a poster and a play
// button that look like an embedded player and are not one, so nothing from
// the video host is requested until somebody deliberately asks for it. Most
// component-library video players are the opposite: they mount the vendor
// script or a full `react-player` on render, which is the exact cost spec §7.2
// exists to refuse. React Bits' registry is animation components and has no
// player at all; the shadcn-ecosystem players found all load on mount.
//
// `YouTubeEmbed` wraps Paul Irish's `lite-youtube-embed`, is maintained by the
// Next.js team, and is a facade by construction rather than by configuration —
// so the property this page depends on cannot be switched off by a later prop
// change. It is also about 3 kB against several hundred for a real embed, and
// PRODUCT.md describes this site's audience as majority mobile and often
// bandwidth-constrained.
//
// This is a **server component**. The whole point of the facade is that no
// client JavaScript of ours is involved: `lite-youtube-embed` ships its own
// tiny custom element and takes over on click. The hand-rolled `useState`
// facade this replaced was a client component for no reason once a maintained
// one existed.
//
// WHAT THE FACADE DOES AND DOES NOT COST, STATED ACCURATELY. Nothing from the
// video host — youtube.com, ytimg.com, googlevideo.com — is requested until
// the play button is pressed: no iframe, no player script, no cookie. What
// `@next/third-parties` does load before the click is `lite-yt-embed.js` and
// `lite-yt-embed.css` from jsDelivr, at idle. That is a CDN, not the video
// host, and it sets no cookies and sees no video-watching behaviour, but it is
// a third-party origin and this comment should not pretend otherwise. The
// poster below is served from this origin, so the pre-click page makes no
// image request off-site at all.
//
// THE POSTER IS OURS, AND THAT IS ALSO THE LAYOUT FIX. Left to itself
// `lite-youtube` paints `https://i.ytimg.com/vi/<id>/hqdefault.jpg` as its
// background. Passing our own local session card instead does three things at
// once: it removes that third-party image request, it puts Byonyks' designed
// card — headshots, credentials, session date — in front of the reader as the
// preview rather than a black rectangle, and it matches the index page so a
// click does not change the picture under the cursor.
//
// AND THE ONE THAT ACTUALLY BIT US: `lite-yt-embed.css` sets
// `lite-youtube { max-width: 720px }`, and that stylesheet arrives from
// jsDelivr *unlayered*. Tailwind v4 emits every utility inside
// `@layer utilities`, and in the CSS cascade any unlayered declaration beats
// every layered one regardless of selector specificity — so the obvious
// `[&_lite-youtube]:max-w-none` was silently dead, the player rendered 720px
// wide inside a 894px container, and the container's ink background showed as
// a blue band running to the right border. A class cannot win this argument.
// An inline style can: it sits above every layer and every sheet. Hence the
// geometry below travels on the element itself rather than in a utility.
const posterStyle = (thumbnail: string) =>
  [
    `background-image: url('${thumbnail}')`,
    "background-size: cover",
    "background-position: center",
    // Overrides the vendor sheet's 720px clamp. See the note above.
    "max-width: none",
    "width: 100%",
  ].join("; ");

// CAPTIONS. Spec §7.3 makes captions on all eight "a hard requirement, not an
// enhancement", and all eight currently carry YouTube ASR tracks rather than
// human-authored ones. The component does two things about that rather than
// one: it forces the caption track on by default via `cc_load_policy=1`, and
// it states the caption quality *above* the player, where a deaf or
// hard-of-hearing reader meets it before deciding to watch rather than after.
// Saying "captions available" without saying "machine-generated" would be the
// dishonest version of accessibility.
function CaptionNote({ captions }: { captions: ByoTalksSession["captions"] }) {
  if (captions === "verified") {
    return (
      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Captions className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>Captions on this session have been checked by a person.</span>
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-dashed border-pending/40 bg-surface-2 px-4 py-3">
      <p className="flex items-center gap-1.5 font-mono text-xs tracking-wide text-pending">
        <Captions className="size-3 shrink-0" aria-hidden="true" />
        <span>Captions are machine-generated</span>
      </p>
      <p className="mt-1 text-sm text-foreground">
        This session plays with YouTube&rsquo;s automatic captions, which are
        turned on by default. They have not been checked by a person, and
        automatic transcription is unreliable on clinical terms and across
        accents. Checked captions are being prepared.
      </p>
    </div>
  );
}

export function VideoFacade({ session }: { session: ByoTalksSession }) {
  if (session.captions === "none") {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface-2 p-8 sm:p-12">
        <PendingNote
          label={`“${session.title}” has a recording but no caption track of any kind, so it is not published here.`}
          note="Captions pending — required before this video can ship"
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <CaptionNote captions={session.captions} />
      {/* `bg-ink` is the colour under the player for the moment before the
          vendor stylesheet lands, not a frame around it — once the element is
          full width nothing of it is visible. */}
      <div className="overflow-hidden rounded-2xl border border-line bg-ink">
        <YouTubeEmbed
          videoid={session.videoId}
          playlabel={`Play the session: ${session.title}, with ${session.speaker}`}
          params="cc_load_policy=1&rel=0&modestbranding=1"
          style={posterStyle(session.thumbnail)}
        />
      </div>
    </div>
  );
}
