"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  enquiryByValue,
  enquiryTypes,
  type ContactInput,
  type EnquiryType,
} from "@/lib/contact";
import { siteContact } from "@/lib/site-config";
import type { ContactResponse } from "@/app/api/contact/route";

// Spec §9.8. Field order and required/optional status come straight from the
// field table there, including City — the frontend sketch omits it, which the
// spec calls a gap in the sketch rather than a scope decision.
//
// Controls: shadcn `Field` primitives carry the label / description / error
// structure. The enquiry type is a native `<select>` and consent a native
// checkbox, per CLAUDE.md's "native element over both where it does the job" —
// a six-option picker is better as the platform picker on this audience's
// phones, and neither control needs anything a custom one would add.

type Status = "idle" | "submitting" | "success" | "error";

const fieldOrder = [
  "enquiryType",
  "name",
  "organisation",
  "email",
  "phone",
  "city",
  "message",
  "consent",
] as const;

type FieldName = (typeof fieldOrder)[number];

const fieldLabels: Record<FieldName, string> = {
  enquiryType: "What best describes you",
  name: "Name",
  organisation: "Organisation",
  email: "Email",
  phone: "Phone",
  city: "City",
  message: "Message",
  consent: "Consent",
};

export function ContactForm({ initialEnquiry }: { initialEnquiry?: EnquiryType }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [sentAs, setSentAs] = useState<EnquiryType | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  // Bumped whenever a submit attempt produces errors. Focus has to move in an
  // effect rather than a callback: the summary does not exist in the DOM until
  // React commits the render that adds it, so a requestAnimationFrame fired
  // from the submit handler lands before there is anything to focus.
  const [summaryTick, setSummaryTick] = useState(0);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    // react-hook-form focuses the first invalid control by default, which
    // competes with the error summary and wins — it runs after our effect.
    // The summary is the better destination: it says how many fields failed
    // and links to each, where the field alone drops the reader into the form
    // with no overview of what went wrong.
    shouldFocusError: false,
    defaultValues: {
      enquiryType: initialEnquiry,
      name: "",
      organisation: "",
      email: "",
      phone: "",
      city: "",
      message: "",
      consent: false,
    } as unknown as ContactInput,
  });

  const { errors } = form.formState;

  const chosen = form.watch("enquiryType");
  const errorList = fieldOrder.filter((f) => errors[f]);

  // Depends on the summary actually existing, not just on the submit attempt:
  // this component's state update and react-hook-form's error state do not
  // always land in the same commit, so an effect keyed on the tick alone can
  // run one render before there is anything to focus. The ref makes it fire
  // once per attempt rather than again every time an error is cleared.
  const focusedTick = useRef(0);
  useEffect(() => {
    if (summaryTick > focusedTick.current && errorList.length > 0) {
      focusedTick.current = summaryTick;
      summaryRef.current?.focus();
    }
  }, [summaryTick, errorList.length]);
  const fieldId = (name: string) => `${uid}-${name}`;

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    setServerMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as ContactResponse;

      if (data.ok) {
        setSentAs(values.enquiryType);
        setStatus("success");
        form.reset();
        return;
      }

      if (data.kind === "validation") {
        for (const [name, messages] of Object.entries(data.fieldErrors)) {
          if (messages?.[0]) {
            form.setError(name as FieldName, { message: messages[0] });
          }
        }
        setStatus("idle");
        setSummaryTick((n) => n + 1);
        return;
      }

      setServerMessage(data.message);
      setStatus("error");
    } catch {
      setServerMessage("We could not reach our server.");
      setStatus("error");
    }
  }

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  if (status === "success") {
    const type = sentAs ? enquiryByValue(sentAs) : null;
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-line bg-card p-6 focus:outline-2 focus:outline-offset-2 focus:outline-ring sm:p-8"
      >
        <div className="inline-flex size-11 items-center justify-center rounded-full bg-[color-mix(in_oklch,var(--color-teal),white_88%)] text-teal">
          <CheckCircle2 className="size-5.5" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-ink">Your message is on its way</h2>
        <p className="mt-3 text-muted-foreground">{type?.acknowledgement}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          If you need to add anything, write to us directly at{" "}
          <a
            className="rounded-sm font-semibold text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            href={`mailto:${siteContact.email}`}
          >
            {siteContact.email}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 h-auto min-h-11 shrink min-w-0 px-6 py-2.5 text-base whitespace-normal"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit, () => setSummaryTick((n) => n + 1))}
      className="rounded-xl border border-line bg-card p-6 sm:p-8"
    >
      {/* Error summary. Focus moves here on a failed submit, so a screen-reader
          or keyboard user is told what happened at the top rather than having
          to hunt field by field. Each entry links to its own control. */}
      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-lg border border-destructive/40 bg-destructive/5 p-4 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {errorList.length === 1
              ? "One field needs your attention"
              : `${errorList.length} fields need your attention`}
          </p>
          <ul className="mt-2 ml-6 list-disc space-y-1 text-sm text-foreground">
            {errorList.map((f) => (
              <li key={f}>
                <a
                  href={`#${fieldId(f)}`}
                  className="rounded-sm underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {fieldLabels[f]}: {errors[f]?.message as string}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <FieldGroup>
        {/* The hinge field, first. */}
        <Field data-invalid={!!errors.enquiryType}>
          <FieldLabel htmlFor={fieldId("enquiryType")} className="max-w-full flex-wrap">
            What best describes you? <RequiredMark />
          </FieldLabel>
          <div className="relative">
            <select
              id={fieldId("enquiryType")}
              aria-invalid={!!errors.enquiryType}
              aria-describedby={`${fieldId("enquiryType")}-desc`}
              className="h-11 w-full appearance-none rounded-lg border border-input bg-transparent px-2.5 py-1 pr-10 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
              {...form.register("enquiryType")}
            >
              <option value="">Choose one</option>
              {enquiryTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          <FieldDescription id={`${fieldId("enquiryType")}-desc`}>
            {chosen
              ? enquiryByValue(chosen).acknowledgement
              : "This decides who reads your message first."}
          </FieldDescription>
          <FieldError errors={[errors.enquiryType]} />
        </Field>

        <TextField
          name="name"
          label="Name"
          required
          autoComplete="name"
          form={form}
          fieldId={fieldId}
          error={errors.name?.message}
        />
        <TextField
          name="organisation"
          label="Organisation"
          autoComplete="organization"
          description="Clinic, company or institution, if you are writing on behalf of one."
          form={form}
          fieldId={fieldId}
          error={errors.organisation?.message}
        />
        <TextField
          name="email"
          label="Email"
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          form={form}
          fieldId={fieldId}
          error={errors.email?.message}
        />
        {/* Phone and City became required on 1 Sep 2026, on client
            instruction. `required` here only draws the asterisk and sets
            `aria-required`; the rule itself lives in `contactSchema`, which
            the Route Handler parses against as well — so the two cannot
            disagree the way a hand-marked form and a server check do. */}
        <TextField
          name="phone"
          label="Phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          description="Include your country code if you are outside India."
          form={form}
          fieldId={fieldId}
          error={errors.phone?.message}
        />
        <TextField
          name="city"
          label="City"
          required
          autoComplete="address-level2"
          form={form}
          fieldId={fieldId}
          error={errors.city?.message}
        />

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor={fieldId("message")} className="max-w-full flex-wrap">
            Message <RequiredMark />
          </FieldLabel>
          <Textarea
            id={fieldId("message")}
            rows={6}
            aria-invalid={!!errors.message}
            {...form.register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        {/* DPDP Act 2023: consent is unchecked by default, required, and says
            what is collected and why before it asks. Spec §10 fixes the Phase 1
            posture — nothing is stored at rest beyond the email itself. */}
        <Field data-invalid={!!errors.consent}>
          <div className="flex items-start gap-3">
            <input
              id={fieldId("consent")}
              type="checkbox"
              aria-invalid={!!errors.consent}
              aria-describedby={`${fieldId("consent")}-desc`}
              className="mt-0.5 size-6 shrink-0 rounded-sm border border-input accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              {...form.register("consent")}
            />
            <div className="min-w-0">
              <FieldLabel htmlFor={fieldId("consent")} className="max-w-full flex-wrap font-normal">
                I agree that Akshar Byonyks may use these details to reply to my
                enquiry. <RequiredMark />
              </FieldLabel>
              <FieldDescription id={`${fieldId("consent")}-desc`}>
                Your message reaches us by email and is not kept in any database.
                Read the{" "}
                <Link
                  href="/privacy-policy"
                  className="rounded-sm font-semibold text-primary underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  privacy policy
                </Link>
                .
              </FieldDescription>
            </div>
          </div>
          <FieldError errors={[errors.consent]} />
        </Field>
      </FieldGroup>

      {status === "error" && serverMessage ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 p-4"
        >
          <p className="flex items-start gap-2 text-sm font-semibold text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {serverMessage}
          </p>
          <p className="mt-2 ml-6 text-sm text-foreground">
            Nothing was sent. You can write to us directly at{" "}
            <a
              className="rounded-sm font-semibold text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={`mailto:${siteContact.email}`}
            >
              {siteContact.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-8 h-auto min-h-11 shrink min-w-0 px-6 py-2.5 text-base whitespace-normal"
      >
        {status === "submitting" ? (
          <>
            <Loader2
              className="size-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>
      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your message." : ""}
      </p>
    </form>
  );
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-destructive">
        *
      </span>
      <span className="sr-only">(required)</span>
    </>
  );
}

function OptionalMark() {
  return <span className="text-sm font-normal text-muted-foreground">(optional)</span>;
}

function TextField({
  name,
  label,
  required,
  type = "text",
  description,
  form,
  fieldId,
  error,
  ...inputProps
}: {
  name: FieldName;
  label: string;
  required?: boolean;
  description?: string;
  form: UseFormReturn<ContactInput>;
  fieldId: (n: string) => string;
  error?: string;
} & Omit<React.ComponentProps<"input">, "form" | "name">) {
  const id = fieldId(name);
  const describedBy = description ? `${id}-desc` : undefined;
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id} className="max-w-full flex-wrap">
        {label} {required ? <RequiredMark /> : <OptionalMark />}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...inputProps}
        {...form.register(name)}
      />
      {description ? <FieldDescription id={`${id}-desc`}>{description}</FieldDescription> : null}
      <FieldError errors={error ? [{ message: error }] : []} />
    </Field>
  );
}
