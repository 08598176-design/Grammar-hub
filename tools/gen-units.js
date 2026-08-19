#!/usr/bin/env node
/* ============================================================
   gen-units.js — assembles the generated apps from templates
   and data. No runtime build step: this runs at AUTHORING time
   and its outputs are committed whole, so every app folder stays
   a standalone thing you can delete or hand over.

     inputs   tools/walk-template.html, tools/vocab-template.html
              apps/word-builder/index.html   (VCE word lists + kanji dict: canonical)
              apps/unit10/index.html         (U10_VOCAB, folded into the vocab hub)
              data/units/spine.json          (Y7-10 curriculum spine)
              data/units/y7..y10.json        (unit content drafts, audited)
              data/units/vce-content.json    (VCE QA/craft, audited)
              data/units/gap.json            (gap checks per unit; optional)
     outputs  apps/unit-walk/index.html
              apps/vocab-hub/index.html

   Run from the repo root:  node tools/gen-units.js
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const readJson = (p) => JSON.parse(read(p));

/* ---- pull literals out of the canonical apps ---- */
function grabLiteral(src, name) {
  const startTag = "const " + name + " = ";
  const i = src.indexOf(startTag);
  if (i < 0) throw new Error(name + " not found");
  const open = src[i + startTag.length];
  const close = open === "[" ? "]" : "}";
  const j = src.indexOf("\n" + close + ";", i);
  if (j < 0) throw new Error(name + " end not found");
  return src.slice(i + startTag.length, j + 1 + close.length);
}
const wb = read("apps/word-builder/index.html");
const wbKanji = eval("(" + grabLiteral(wb, "KANJI") + ")");
const wbUnits = eval("(" + grabLiteral(wb, "UNITS") + ")");
const u10src = read("apps/unit10/index.html");
const u10Vocab = eval("(" + grabLiteral(u10src, "U10_VOCAB") + ")");

/* ---- data ---- */
const spine = readJson("data/units/spine.json");
const vceContent = readJson("data/units/vce-content.json");
let gap = {};
try { gap = readJson("data/units/gap.json"); } catch (e) { console.log("note: no gap.json yet, gap checks omitted"); }
const juniorFiles = { 7: "y7.json", 8: "y8.json", 9: "y9.json", 10: "y10.json" };
const juniorByKey = {};
for (const [year, f] of Object.entries(juniorFiles)) {
  const arr = readJson("data/units/" + f);
  arr.forEach((u) => { juniorByKey[u.key] = u; });
}

/* ---- merged kanji dict: word-builder is canonical (audited caps);
   junior glosses fill the gaps WITHOUT a cap (colour only where the
   classification has actually been audited) ---- */
const KANJI = JSON.parse(JSON.stringify(wbKanji));
let addedKanji = 0;
spine.units.forEach((su) => {
  const jd = juniorByKey[su.key];
  if (!jd || !jd.kanjiGloss) return;
  for (const [k, v] of Object.entries(jd.kanjiGloss)) {
    if (!KANJI[k]) { KANJI[k] = { g: v.g, r: v.r }; addedKanji++; }
  }
});

/* ---- walk UNITS: junior (spine order) then VCE ---- */
const problems = [];
const juniorUnits = spine.units.map((su) => {
  const jd = juniorByKey[su.key];
  if (!jd) { problems.push("missing draft for " + su.key); return null; }
  (jd.words || []).forEach((w) => {
    (w.parts || []).forEach((p) => {
      if (!KANJI[p]) problems.push(su.key + ": no kanji gloss for " + p + " (word " + w.w + ")");
    });
  });
  return {
    key: su.key, year: su.year, grp: String(su.year), title: su.title,
    topic: su.topic, blurb: su.blurb, mode: su.buildMode, prior: su.prior,
    words: jd.words, payoff: jd.payoff,
  };
}).filter(Boolean);
const vceUnits = wbUnits.map((u) => Object.assign({}, u, { grp: "VCE", mode: "kanji" }));
const UNITS = juniorUnits.concat(vceUnits);

/* ---- CONTENT ---- */
const CONTENT = {};
UNITS.forEach((u) => {
  const jd = juniorByKey[u.key];
  const base = jd ? { qa: jd.qa, craft: jd.craft, extension: jd.extension }
                  : (vceContent[u.key] ? { qa: vceContent[u.key].qa, craft: vceContent[u.key].craft } : null);
  if (!base) { problems.push("no content for " + u.key); return; }
  if (gap[u.key]) base.gap = gap[u.key];
  CONTENT[u.key] = base;
});

/* ---- GMAP_JR from the spine ---- */
const GMAP_JR = {};
spine.units.forEach((su) => { GMAP_JR[su.key] = su.gram; });

if (problems.length) {
  problems.forEach((p) => console.error("PROBLEM: " + p));
  process.exit(1);
}

/* ---- splice the walk ---- */
function splice(template, marks) {
  let out = template;
  for (const [mark, text] of Object.entries(marks)) {
    if (!out.includes(mark)) throw new Error(mark + " missing from template");
    out = out.replace(mark, text);
  }
  return out;
}
const walk = splice(read("tools/walk-template.html"), {
  "/*__KANJI__*/": JSON.stringify(KANJI),
  "/*__UNITS__*/": JSON.stringify(UNITS, null, 1),
  "/*__CONTENT__*/": JSON.stringify(CONTENT, null, 1),
  "/*__GMAP_JR__*/": JSON.stringify(GMAP_JR, null, 1),
});
fs.writeFileSync(path.join(root, "apps/unit-walk/index.html"), walk);

/* ---- vocab hub: merge every unit's words into one warehouse.
   Identity = written form + reading; a word met in two units gets
   both doors on its card. grp = the first (lowest) group to meet it. ---- */
const VWORDS = [];
const VUNITS = [];
const wordIndex = new Map();
function addUnit(meta, words, mapWord) {
  const entry = { key: meta.key, title: meta.title, grp: meta.grp, app: meta.app, words: [] };
  words.forEach((raw) => {
    const w = mapWord(raw);
    const id = w.w + "|" + (w.r || w.w);
    let idx;
    if (wordIndex.has(id)) {
      idx = wordIndex.get(id);
      const existing = VWORDS[idx];
      if (!existing.units.includes(meta.key)) existing.units.push(meta.key);
      if (!existing.kp && w.kp) existing.kp = w.kp;
      if (!existing.ex && w.ex) { existing.ex = w.ex; existing.exGloss = w.exGloss; }
    } else {
      idx = VWORDS.length;
      w.units = [meta.key];
      w.grp = meta.grp;
      VWORDS.push(w);
      wordIndex.set(id, idx);
    }
    entry.words.push(idx);
  });
  VUNITS.push(entry);
}
juniorUnits.forEach((u) => addUnit(
  { key: u.key, title: u.title, grp: u.grp, app: "walk" },
  u.words,
  (w) => ({ w: w.w, r: w.r || w.w, def: w.def, kp: w.kp || undefined, parts: w.parts || undefined })
));
vceUnits.forEach((u) => addUnit(
  { key: u.key, title: u.title, grp: "VCE", app: "walk" },
  u.words,
  (w) => ({ w: w.w, r: w.r, def: w.def, parts: w.parts })
));
addUnit(
  { key: "unit10", title: "ユニット10 · Abilities and Preferences", grp: "10", app: "unit10" },
  u10Vocab,
  (w) => ({ w: w.jp, r: w.read, def: w.gloss, ex: w.ex, exGloss: w.exGloss })
);

const vocab = splice(read("tools/vocab-template.html"), {
  "/*__VWORDS__*/": JSON.stringify(VWORDS, null, 1),
  "/*__VUNITS__*/": JSON.stringify(VUNITS, null, 1),
  "/*__VKANJI__*/": JSON.stringify(KANJI),
});
fs.mkdirSync(path.join(root, "apps/vocab-hub"), { recursive: true });
fs.writeFileSync(path.join(root, "apps/vocab-hub/index.html"), vocab);

/* ---- summary ---- */
const shared = VWORDS.filter((w) => w.units.length > 1);
console.log("walk: " + UNITS.length + " units (" + juniorUnits.length + " junior + " + vceUnits.length + " VCE)");
console.log("vocab: " + VWORDS.length + " words across " + VUNITS.length + " unit shelves; " +
  shared.length + " words live in 2+ units; +" + addedKanji + " junior kanji glosses");
console.log("gap checks: " + Object.keys(gap).length + " units");
console.log("problems 0");
