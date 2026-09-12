// GENERATE SOURCES.md — the citation record, kept off the site.
//
// WHY THIS EXISTS. On 3 Sep 2026 the client asked for the site's visible
// sourcing to come off the pages while the citations were kept elsewhere.
// "Elsewhere" is this file's output: a dossier in the repository, never
// served, holding every claim the site makes and how each one is known.
//
// WHY IT IS GENERATED RATHER THAN WRITTEN. A hand-kept sources document is a
// second copy of the facts, free to drift from the first — which is the exact
// defect `market-data.ts` opens by documenting, where byonyks.com carried
// Guatemala at 56% and the paper says 45%. A citation record that has quietly
// gone stale is worse than none, because it is consulted and believed. So this
// reads the same modules the pages read, and `npm run build` regenerates it.
//
// WHAT IT PROVES. The site stopped rendering its sources; it did not stop
// having them. `market-data.ts` still refuses to hold a figure without one,
// `getSource` still throws for an unregistered id, and `claims-ledger.ts`
// still throws at module load for a record claim with no URL. Those contracts
// run when this script imports them, so a build that produces SOURCES.md is a
// build in which they all passed.
//
// NO TIMESTAMP IN THE OUTPUT, deliberately. A generated-on date would rewrite
// the file on every build and fill the history with diffs that say nothing.
// The file changes when the evidence changes, which makes `git log` on it a
// real record of when this company's claims moved.

import * as esbuild from "esbuild";
import { mkdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(APP, "SOURCES.md");

// ---------------------------------------------------------------------------
// Load the TypeScript data modules.
//
// esbuild rather than a runtime TS loader: it is already in the tree (Next
// depends on it), it honours the `@/*` path alias straight out of tsconfig,
// and it drops the type-only imports of `@/components/common/provenance` that
// would otherwise drag React into a Node script. Bundling also means the
// module-load contracts in these files run exactly as they do in the app.
// ---------------------------------------------------------------------------
// STAGED INSIDE node_modules/.cache, not in the OS temp directory. The bundle
// keeps its React and lucide-react imports as externals, and Node resolves
// those from the importing file's location — from /tmp there is no
// node_modules above it to find, so the import fails. Under the project the
// same externals resolve normally.
const stage = path.join(APP, "node_modules", ".cache", "akshar-sources");
mkdirSync(stage, { recursive: true });
let data;
try {
  const bundle = path.join(stage, "data.mjs");
  await esbuild.build({
    stdin: {
      contents: [
        'export { ledger, ledgerCounts, ledgerOrder } from "@/lib/claims-ledger";',
        'export { marketSources } from "@/lib/market-data";',
        'export { provenanceMeta } from "@/components/common/provenance";',
      ].join("\n"),
      resolveDir: APP,
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: bundle,
    tsconfig: path.join(APP, "tsconfig.json"),
    // `provenance.tsx` is a component file. Only `provenanceMeta` is wanted
    // from it, but bundling still parses the whole module, so its runtime
    // imports have to resolve to something. They are never called.
    external: ["react", "react-dom", "lucide-react", "next", "next/*"],
    logLevel: "warning",
  });
  data = await import(pathToFileURL(bundle).href);
} finally {
  rmSync(stage, { recursive: true, force: true });
}

const { ledger, ledgerCounts, ledgerOrder, marketSources, provenanceMeta } = data;

// ---------------------------------------------------------------------------
// Render.
// ---------------------------------------------------------------------------
const out = [];
const w = (...lines) => out.push(...lines);

w(
  "# Sources",
  "",
  "**Generated file — do not edit by hand.**",
  "Run `npm run sources` (or any `npm run build`) to regenerate it from",
  "`src/lib/claims-ledger.ts` and `src/lib/market-data.ts`.",
  "",
  "This is the citation record for aksharbyonyks.com. Since 3 Sep 2026 the site",
  "does not display its sourcing: research citations, provenance status labels",
  "and retrieval dates were removed from every page at the client's request.",
  "Nothing was deleted from the data, and this file is where the evidence for",
  "each published claim now lives.",
  "",
  "Two things are still shown on the site, and both are deliberate:",
  "",
  "- **Official register links** (FDA 510(k), the Health Ministry's dialysis",
  "  programme). These back claims about a regulated medical device, where the",
  "  link is what makes the statement checkable rather than a courtesy.",
  "- **Attribution in prose** on material carried word for word — the",
  "  republished press releases and the transcribed biographies still name",
  "  their publisher and their retrieval date, without a link.",
  "",
  "`/what-we-know` also still renders all of the below. It is unlisted: no nav",
  "entry, no in-page links to it, and `robots: noindex`. It is the URL to hand",
  "someone who asks.",
  "",
  "---",
  "",
);

// -- Summary ---------------------------------------------------------------
const total = ledger.length;
w("## Summary", "", `**${total} claims.**`, "", "| How it is known | Claims |", "| --- | ---: |");
for (const status of ledgerOrder) {
  w(`| ${provenanceMeta[status].label} | ${ledgerCounts[status]} |`);
}
w("", "");
for (const status of ledgerOrder) {
  w(`**${provenanceMeta[status].label}.** ${provenanceMeta[status].meaning}`, "");
}
w("---", "");

// -- The claims ------------------------------------------------------------
w("## Every claim on the site", "");

for (const status of ledgerOrder) {
  const entries = ledger.filter((e) => e.provenance.status === status);
  if (!entries.length) continue;
  w(`### ${provenanceMeta[status].label} (${entries.length})`, "");

  for (const entry of entries) {
    const p = entry.provenance;
    w(`#### ${entry.claim}`, "");
    if (entry.detail) w(entry.detail, "");

    const rows = [];
    if (p.status === "record") {
      rows.push(["Register", `[${p.source.label}](${p.source.url})`]);
      rows.push(["Retrieved", p.retrieved]);
    } else if (p.status === "published") {
      rows.push([
        "Source",
        p.source.url ? `[${p.source.label}](${p.source.url})` : p.source.label,
      ]);
      rows.push(["Period described", p.asOf]);
    } else if (p.status === "stated") {
      if (p.statedBy) rows.push(["Stated by", p.statedBy]);
      if (p.asOf) rows.push(["Dated", p.asOf]);
      if (!p.statedBy && !p.asOf) {
        rows.push(["Stated by", "Byonyks Medical Devices (undated)"]);
      }
    } else {
      rows.push(["Missing", p.missing]);
    }
    rows.push([
      "Appears on",
      entry.appearsOn.map((page) => `${page.label} (\`${page.href}\`)`).join(", "),
    ]);
    rows.push(["Ledger id", `\`${entry.id}\``]);

    w("| | |", "| --- | --- |");
    for (const [k, v] of rows) w(`| **${k}** | ${v} |`);
    w("");
  }
}

w("---", "");

// -- The source register ---------------------------------------------------
w(
  "## Source register",
  "",
  "The full citations behind the site's sourced claims — the figures on",
  "`/innovation/market`, and since 11 Sep 2026 the therapy claims on",
  "`/innovation/how-it-works` as well. `kind` is read by the `Cite`",
  "component: `register` sources are still linked on the site, `research`",
  "sources are not, and are recorded only here.",
  "",
  "The two KDIGO entries are the reason this section is no longer only the",
  "market page's. The how-it-works page carried them as a visible References",
  "block for one day; the client asked on 11 Sep 2026 that references be kept",
  "\"in separate document with the rest of the sources\", which is this file.",
  "What each report actually concludes — narrower, on three of the four",
  "claims, than the claim it supports — is under \"Every claim on the site\"",
  "above rather than here, because it is a fact about a claim and not about a",
  "citation.",
  "",
);

for (const source of marketSources) {
  w(
    `### ${source.shortName}`,
    "",
    `${source.citation}`,
    "",
    "| | |",
    "| --- | --- |",
    `| **Publisher** | ${source.publisher} |`,
    `| **Published** | ${source.published} |`,
    `| **Describes** | ${source.describes} |`,
    `| **Kind** | ${source.kind}${source.kind === "register" ? " — still linked on the site" : " — recorded here only"} |`,
    `| **URL** | <${source.url}> |`,
    `| **Source id** | \`${source.id}\` |`,
    "",
  );
}

const rendered = out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";

// Only write when something actually changed, so a no-op build leaves the
// file's mtime — and its git status — alone.
let previous = "";
try {
  previous = readFileSync(OUT, "utf8");
} catch {
  /* first run */
}
if (previous === rendered) {
  console.log(`SOURCES.md unchanged (${total} claims, ${marketSources.length} sources)`);
} else {
  writeFileSync(OUT, rendered, "utf8");
  console.log(
    `SOURCES.md written: ${total} claims, ${marketSources.length} sources` +
      (previous ? "" : " (created)"),
  );
}
