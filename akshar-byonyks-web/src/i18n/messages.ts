import en from "../../messages/en.json";
import hi from "../../messages/hi.json";

// THE KEY-DRIFT CONTRACT, in the manner of `leadership.ts`, `news-data.ts` and
// `claims-ledger.ts`.
//
// The failure this prevents is specific and quiet. next-intl renders a missing
// key by falling back to the key path — so a Hindi page missing
// `home.indiaPosition` does not crash and does not warn. It renders the string
// `home.indiaPosition` where the sentence about India's regulatory position
// should be, and the page still builds, still deploys, and still looks roughly
// right to anyone who does not read Hindi.
//
// On this site that is not a typo. It is the regulatory sentence going missing
// from the patient-facing page, in the language of the audience least able to
// cross-check it against the English. So the keys are compared at module load
// and the build fails instead.
//
// It also catches the likelier version: a reviewer edits `hi.json`, renames or
// drops a key while rewording, and nobody notices until a patient does.

type Tree = { [key: string]: string | Tree };

function paths(tree: Tree, prefix = ""): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    // Keys beginning `_` are notes to the human reviewer, not messages, and
    // the two files are allowed to carry different ones.
    if (key.startsWith("_")) return [];
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? [path] : paths(value, path);
  });
}

const enPaths = paths(en as Tree);
const hiPaths = paths(hi as Tree);

const missingInHi = enPaths.filter((p) => !hiPaths.includes(p));
const extraInHi = hiPaths.filter((p) => !enPaths.includes(p));

if (missingInHi.length > 0 || extraInHi.length > 0) {
  const lines = [
    "i18n: messages/en.json and messages/hi.json have drifted.",
    ...(missingInHi.length
      ? [`  Missing from hi.json: ${missingInHi.join(", ")}`]
      : []),
    ...(extraInHi.length ? [`  Only in hi.json: ${extraInHi.join(", ")}`] : []),
    "  next-intl renders a missing key as the key path, so this would ship a",
    "  Hindi page with an English key where a sentence should be. Fix the",
    "  catalogue rather than the check.",
  ];
  throw new Error(lines.join("\n"));
}

// An empty string passes the key check and fails the reader.
for (const [file, tree] of [
  ["en.json", en],
  ["hi.json", hi],
] as const) {
  for (const path of paths(tree as Tree)) {
    const value = path
      .split(".")
      .reduce<unknown>((node, key) => (node as Tree)[key], tree);
    if (typeof value === "string" && value.trim() === "") {
      throw new Error(`i18n: ${file} has an empty string at "${path}".`);
    }
  }
}

export const messageKeyCount = enPaths.length;
