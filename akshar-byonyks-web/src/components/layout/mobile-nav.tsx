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
        className="lg:hidden"
        aria-label="Open menu"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Menu aria-hidden="true" />
      </Button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-background p-0 backdrop:bg-ink/40 open:flex open:flex-col"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <span className="text-lg font-bold text-ink">Akshar Byonyks</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            onClick={() => dialogRef.current?.close()}
          >
            <X aria-hidden="true" />
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
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
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

          <Button asChild className="mt-4 w-full">
            <Link href={contactCta.href} onClick={() => dialogRef.current?.close()}>
              {contactCta.label}
            </Link>
          </Button>
        </nav>
      </dialog>
    </>
  );
}
