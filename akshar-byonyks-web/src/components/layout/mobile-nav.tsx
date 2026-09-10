"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { contactCta, primaryNav } from "@/lib/navigation";

// Spec 7.2: full-screen drawer mobile nav. Needs "use client" for open/close
// state — the one interactive piece of an otherwise server-rendered header.
// Uses the native <dialog> element rather than a hand-rolled overlay: it
// gives focus trapping, Escape-to-close and backdrop dismissal for free,
// which is exactly the "native element over both" preference in spec 7.2.
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        // `size-11` (44px) rather than the 36px `size-icon` default: this is
        // the only way into the site's navigation on a phone, and it was the
        // smallest target in the bar.
        className="size-11 lg:hidden"
        aria-label="Open menu"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Menu aria-hidden="true" className="size-5" />
      </Button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-background p-0 backdrop:bg-ink/40 open:flex open:flex-col"
      >
        {/* THE WORDMARK IS A LINK NOW (10 Sep 2026). It was a <span>, and the
            drawer carries no other route to Home — so the one screen that
            lists every destination on the site was missing the destination
            every reader knows the name of. The bar's emblem goes Home, but the
            bar is behind this dialog while it is open. */}
        <div className="flex min-h-16 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            onClick={() => dialogRef.current?.close()}
            className="rounded-md py-2 text-lg font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Akshar Byonyks
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11"
            aria-label="Close menu"
            onClick={() => dialogRef.current?.close()}
          >
            <X aria-hidden="true" className="size-5" />
          </Button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => dialogRef.current?.close()}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-surface-2"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="ml-3 flex flex-col gap-1 border-l border-line pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => dialogRef.current?.close()}
                          // `min-h-11` (44px): at `py-2` a 14px line made a
                          // 37px target, and these are the deepest links in
                          // the site's only mobile navigation.
                          className="flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <Button asChild className="mt-4 h-11 w-full">
            <Link href={contactCta.href} onClick={() => dialogRef.current?.close()}>
              {contactCta.label}
            </Link>
          </Button>

          {/* THE LANGUAGE SWITCH HAS TO BE IN HERE TOO. It sits in the bar,
              and this dialog covers the bar — so for as long as a reader had
              the menu open, the one control that answers "I would rather read
              this in Hindi" did not exist. PRODUCT.md puts that reader on a
              phone, which is the only place this drawer appears. Set in
              Devanagari and marked `lang="hi"`, for the reason the bar's copy
              of it gives: a switch labelled in the language you cannot read is
              the standard way this control fails. */}
          <Link
            href="/hi"
            lang="hi"
            onClick={() => dialogRef.current?.close()}
            className="mt-2 flex min-h-11 items-center justify-center rounded-md text-base font-medium text-foreground hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            हिन्दी
          </Link>
        </nav>
      </dialog>
    </>
  );
}
