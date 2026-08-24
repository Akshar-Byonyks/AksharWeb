# Akshar Byonyks website — standing rules

Full spec: `../docs/aksharbyonykswebsitespec.md` (currently v0.7). Read it before making architectural decisions this file doesn't cover.

- **Consult Context7** before writing Next.js App Router, OpenNext, Keystatic, next-intl, Pagefind or Turnstile code. All of these move fast — do not write framework code from memory.
- Run **`/impeccable audit`** on every new template before it goes to review.
- **Server Components by default,** the App Router's default rendering mode. See spec 12.9 for the client-component reference list — it's not a gate to clear (v0.7).
- No first-load-JS measurement is required before merging during frontend build (spec 11.3, deferred). That changes at the post-frontend performance pass.
- Every colour must resolve through a token from spec Section 6.1 (`--primary`, `--background`, `--foreground`, etc. in `src/app/globals.css`). **No hardcoded hex and no arbitrary Tailwind colour values in components.**
- Prefer **shadcn primitives** over hand-rolled interactive controls, and the **native element** over both where it does the job.
