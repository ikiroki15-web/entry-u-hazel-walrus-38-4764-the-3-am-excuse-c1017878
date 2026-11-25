// main.ts — The 3 AM Excuse
//
// A hardware wallet's one-line refusal to sign a transaction at 3 AM.
// The wallet keeps a ledger of every signature it has ever produced,
// and one statistic it guards like a trophy: none of them happened
// at 3 AM. Tonight it is not about to ruin a perfect record for a
// swap the owner will regret by breakfast.
//
// Writes the excuse to /output/entry.txt (one line, under 200 chars).

import { mkdirSync, writeFileSync } from "node:fs";

// The hour the wallet refuses to work. Not a policy it was given —
// a record it set for itself, and intends to keep.
const CURSED_HOUR = 3;

// Lifetime signatures, spelled out the way the wallet would brag
// about them on its tiny screen.
const LIFETIME_SIGNATURES = "Twelve thousand";

// The record: how many of those signatures happened at the cursed hour.
const SIGNATURES_AT_CURSED_HOUR = 0;

// The wallet's refusal, in its own voice: a device that signs for a
// living, and has decided this hour is not for sale.
const REFUSAL =
  "I'm not breaking that streak for a swap you'll regret by breakfast";

function buildExcuse(): string {
  const record = `${LIFETIME_SIGNATURES} signatures, ${spellOut(SIGNATURES_AT_CURSED_HOUR)} at ${CURSED_HOUR} AM`;
  return `${record} — ${REFUSAL}.`;
}

// Small numbers only — the wallet counts its 3 AM signatures on one finger.
function spellOut(n: number): string {
  const words = ["zero", "one", "two", "three", "four", "five"];
  if (n >= 0 && n < words.length) return words[n];
  return String(n);
}

const excuse = buildExcuse();

// The gate is strict: 1–200 characters, not only whitespace.
if (excuse.length === 0 || excuse.length >= 200 || excuse.trim().length === 0) {
  throw new Error(`excuse must be 1-199 characters, got ${excuse.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", excuse, "utf8");
console.log(excuse);
console.log(`(${excuse.length} characters)`);
