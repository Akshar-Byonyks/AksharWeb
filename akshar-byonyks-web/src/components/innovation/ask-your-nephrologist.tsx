import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { notMedicalAdvice } from "@/lib/claims";

// India's Drugs and Magic Remedies (Objectionable Advertisements) Act 1954
// requires patient-facing copy to route treatment decisions to a physician,
// and PRODUCT.md carries that through as a standing constraint. Every other
// page discharges it with a sentence. This section makes it the point.
//
// The reason is not compliance theatre. A patient who has just understood the
// therapy for the first time now has a decision they cannot make on this site
// and a conversation they may not know how to open — this is the page's actual
// exit, and a list of questions is more use to them than one more paragraph
// telling them to ask.
//
// An ordered list, numbers set in primary blue at display weight. Blue is the
// right accent here precisely because none of the three meaning-carrying
// accents applies (DESIGN.md: "use primary blue for a peer group that has no
// such meaning") — these questions are not about home/India, clinical
// evidence, or institutions.
//
// Deliberately no answers. Answering "am I a candidate" on a company website
// would be the exact thing the Act exists to prevent, and every one of these
// has a different answer per patient.
const questions = [
  "Given my medical history, am I a candidate for peritoneal dialysis at all?",
  "Would exchanges by hand through the day, or a cycler overnight, suit my situation better?",
  "What would my prescription look like: how many exchanges, and how long would each one dwell?",
  "What does having the catheter placed involve, and how long before it can be used?",
  "What signs of infection should we watch for, and who do we call at night?",
  "What training would my family and I get, and who supports us after it?",
  "How would the supplies reach us, and what happens if a delivery is late?",
];

export function AskYourNephrologist() {
  return (
    <section aria-labelledby="ask-nephrologist-heading" className="bg-surface-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2
              id="ask-nephrologist-heading"
              className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl"
            >
              Questions worth asking your nephrologist
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Whether this therapy suits a particular person is a clinical
              decision, and it is not one ABI can make. These are the questions
              suited for your nephrologist. Take them to the appointment.
            </p>
          </div>
        </ScrollReveal>

        <ol className="mt-12 max-w-3xl">
          {questions.map((question, index) => (
            <ScrollReveal
              key={question}
              as="li"
              delayMs={index * 60}
              className="flex gap-5 border-t border-line py-5 first:border-t-0 first:pt-0"
            >
              <span
                aria-hidden="true"
                className="w-8 shrink-0 text-xl font-bold text-primary tabular-nums"
              >
                {index + 1}
              </span>
              <span className="min-w-0 text-lg text-foreground">
                {question}
              </span>
            </ScrollReveal>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
          {notMedicalAdvice}
        </p>
      </div>
    </section>
  );
}
