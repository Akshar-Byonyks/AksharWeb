"use client";

import { useEffect, useRef } from "react";

// THE TURNSTILE WIDGET — the client half that never existed.
//
// Built 4 Sep 2026. `lib/turnstile.ts` has carried a complete server-side
// verifier since the form was built, and `contactSchema` has carried an
// optional `turnstileToken` field, but nothing ever rendered a challenge or
// set that token. The server half was therefore not "spam protection waiting
// to be switched on" — it was a loaded trap: setting TURNSTILE_SECRET_KEY on
// its own made every submission arrive tokenless and 403. This closes it, and
// `verifyTurnstile` now refuses to arm itself without this component's key.
//
// EXPLICIT RENDERING (`?render=explicit`) rather than the implicit
// `class="cf-turnstile"` scan. The implicit mode looks for its targets once,
// when the script loads, which loses every widget React mounts afterwards —
// and this form is a client component reached by client-side navigation. The
// explicit call happens in an effect, so it runs whenever the element exists.
//
// THE SCRIPT LOADS ONCE PER PAGE LIFETIME, guarded by a module-level promise
// rather than by `next/script`. `next/script`'s `onLoad` does not re-fire for
// a script it has already injected, so returning to /contact a second time
// leaves the callback silent and the widget unrendered.

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  var turnstile: TurnstileApi | undefined;
}

let scriptLoad: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile is browser-only."));
  }
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptLoad) return scriptLoad;

  scriptLoad = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error("Turnstile loaded without exposing its API."));
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        // Let a later mount try again rather than caching the failure
        // forever: this is the one thing standing between a patient on a bad
        // connection and the enquiry form.
        scriptLoad = null;
        reject(new Error("Turnstile script failed to load."));
      },
      { once: true },
    );
    document.head.appendChild(script);
  });

  return scriptLoad;
}

export function TurnstileWidget({
  siteKey,
  onToken,
  resetSignal,
}: {
  siteKey: string;
  /** Called with a fresh token, or `null` whenever the token stops being valid. */
  onToken: (token: string | null) => void;
  /**
   * Bumped by the form after any completed submit. A Turnstile token is
   * single-use and expires after 300s, so a second enquiry sent from the same
   * page without resetting would be verified against a spent token and
   * rejected — the failure looks exactly like spam blocking to the person it
   * happens to.
   */
  resetSignal: number;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // The callback is read through a ref so that a re-render of the form does
  // not tear the widget down and rebuild it. Turnstile re-runs its challenge
  // on every render() call, and the form re-renders on every keystroke.
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !holder.current || widgetId.current) return;
        widgetId.current = turnstile.render(holder.current, {
          sitekey: siteKey,
          theme: "light",
          action: "contact",
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "timeout-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch(() => {
        // No token. The Route Handler decides what that means — and
        // `verifyTurnstile` already fails open on an unreachable verifier, on
        // the same reasoning.
        if (!cancelled) onTokenRef.current(null);
      });

    return () => {
      cancelled = true;
      const id = widgetId.current;
      if (id && window.turnstile) {
        window.turnstile.remove(id);
        widgetId.current = null;
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetSignal === 0) return;
    const id = widgetId.current;
    if (id && window.turnstile) {
      window.turnstile.reset(id);
      onTokenRef.current(null);
    }
  }, [resetSignal]);

  // No heading and no explanatory copy. The widget states its own purpose and
  // carries Cloudflare's mark; a label above it saying "Security check" would
  // be the site restating what the control already says, which is the kind of
  // furniture the rest of this form does without.
  return <div ref={holder} className="mt-8" />;
}
