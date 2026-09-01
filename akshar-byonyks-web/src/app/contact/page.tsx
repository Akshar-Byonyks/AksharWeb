import type { Metadata } from "next";

import { DirectionContract } from "@/components/common/direction-contract";
import { PendingNote } from "@/components/common/pending-note";
import { ContactForm } from "@/components/contact/contact-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SilhouetteEdge } from "@/components/layout/silhouette-edge";
import { defaultOg } from "@/lib/seo";
import { enquiryFromParam } from "@/lib/contact";
import { siteContact } from "@/lib/site-config";
import { Mail, MapPin, Phone } from "lucide-react";

const path = "/contact";

const description =
  "Contact Akshar Byonyks. Patient, clinician, investor or distributor enquiries about the X-1 automated peritoneal dialysis cycler are routed to the right person.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: path, languages: { "en-IN": path } },
  openGraph: {
    title: "Contact | Akshar Byonyks",
    description,
    url: path,
    type: "website",
    images: defaultOg,
  },
  twitter: { card: "summary" },
};

// §9.8 `/contact/` — the site's only conversion path, and the last of the six
// Phase 1 template screens (§15).
//
// Surface rhythm: ink header, then the form on background, then the silhouette
// edge into the ink footer. Two ink moments, the same as every other page. No
// CTA band: this *is* the conversion page, and a "talk to us" band beneath the
// contact form would be absurd. `SilhouetteEdge` is rendered directly instead,
// so the closing ink mass still arrives across the same transition.
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ enquiry?: string }>;
}) {
  const { enquiry } = await searchParams;
  const initialEnquiry = enquiryFromParam(enquiry);

  return (
    <>
      <DirectionContract>{`
THESIS: the persuading already happened on Home and the X-1 page. By the time
someone reaches this form they have decided, so the only job is to let them
finish without friction. Operate, not Persuade.
OWN-WORLD: the enquiry type is the hinge, not a dropdown. It is the one field
that turns one form into four audiences, it sets the subject prefix that keeps
the inbox sortable, and when someone arrives on /contact?enquiry=clinician the
page says back what it understood. That is the only idea on the page; the rest
stays deliberately quiet.
STORY: who are you → how do we reach you → what do you need → consent.
FIRST VIEWPORT: compact ink header, breadcrumb, one line of orientation, then
the form itself. No hero ceremony in front of a task.
FORM: two columns from lg — the form takes the wider share, a narrow column
carries the real contact details and what happens next.
FINISH: 16px inputs that never drop to 14px, persistent visible labels, an
error summary that takes focus, consent unchecked and explained before it is
asked. Nothing invented: the India office reads "coming soon" because there is
no address to print, and the phone — real and staffed since 1 Sep 2026 — says
which country it rings in.
`}</DirectionContract>

      <section aria-labelledby="contact-heading" className="bg-ink">
        <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-14 sm:px-6 lg:px-8">
          <Breadcrumbs tone="dark" items={[{ name: "Contact" }]} />
          <h1
            id="contact-heading"
            className="mt-10 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Talk to Akshar Byonyks
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            One form, read by a person. Tell us which of you is writing and we
            will route it to whoever can actually answer.
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-form-heading" className="bg-background">
        <h2 id="contact-form-heading" className="sr-only">
          Send an enquiry
        </h2>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              {/* The form is a client island and does nothing without
                  JavaScript — the deliberate cost of the shadcn + react-hook-form
                  architecture (deviations.md). Rather than fail silently for a
                  reader on a blocked or broken bundle, say so and give them the
                  address. One sentence, not a duplicated form. */}
              <noscript>
                <div className="mb-6 rounded-lg border border-dashed border-pending/40 bg-surface-2 p-4">
                  <p className="text-sm text-foreground">
                    This form needs JavaScript to send. With it switched off,
                    please email{" "}
                    <a
                      className="font-semibold text-primary underline underline-offset-2"
                      href={`mailto:${siteContact.email}`}
                    >
                      {siteContact.email}
                    </a>{" "}
                    and tell us whether you are writing as a patient, a
                    clinician, an investor or a distributor.
                  </p>
                </div>
              </noscript>

              <ContactForm initialEnquiry={initialEnquiry} />
            </div>

            <aside aria-labelledby="contact-direct-heading" className="lg:sticky lg:top-24">
              <h2 id="contact-direct-heading" className="text-lg font-semibold text-ink">
                Reach us directly
              </h2>

              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Mail className="size-4.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <a
                      className="rounded-sm text-sm text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      href={`mailto:${siteContact.email}`}
                    >
                      {siteContact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Phone className="size-4.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">Phone</p>
                    {/* DIALLABLE, NOT JUST PRINTED. This was a `<p>` for as
                        long as the number was a placeholder — there was
                        nothing to ring. It is a real staffed line now, and
                        this audience reads it on a phone. */}
                    <a
                      className="rounded-sm text-sm text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      href={`tel:${siteContact.phoneTel}`}
                    >
                      {siteContact.phone}
                    </a>
                    {/* A +1 NUMBER ON AN INDIA-FACING SITE. Said out loud
                        rather than left for the reader to discover from their
                        call log: an unmarked country code costs a patient
                        money and costs this company the enquiry. */}
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {siteContact.phoneRegion} — an international call from
                      India.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <MapPin className="size-4.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">
                      India office
                    </p>
                    {/* "Coming soon" IS THE CLIENT'S OWN WORDING (1 Sep 2026),
                        replacing a pending note that said the address was
                        unconfirmed. It is a row on the list now rather than a
                        marker under it, because a reader scanning for an
                        address should find the answer where they look for it
                        — and the answer is that there is not one yet. */}
                    <p className="text-sm text-muted-foreground">Coming soon</p>
                  </div>
                </li>
              </ul>

              {/* One genuine gap, marked rather than invented — the same
                  treatment the X-1 specification table uses. The phone is no
                  longer among them: a real, staffed line replaced the
                  placeholder on 1 Sep 2026, closing that §14.4 launch gate. */}
              <PendingNote
                className="mt-4"
                note="Address pending"
                label="The India registered office address is not yet confirmed, so none is published here. Enquiries reach the same people by email and phone in the meantime."
              />

              <div className="mt-8 border-t border-line pt-6">
                <h3 className="text-sm font-semibold text-ink">What happens next</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your message goes by email to a named person, not a ticketing
                  system. Nothing you send is kept in a database.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  This site is educational. It cannot give medical advice, and
                  decisions about your treatment stay with your nephrologist.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SilhouetteEdge />
    </>
  );
}
