# SPEC.md — Japanese Grammar Hub (reconstructed)

> The original SPEC.md from the ELC Grammar Hub did not survive the fork, but
> README.md and DESIGN_RULES.md still refer to it. This is a reconstruction
> written **from the actual code as it stands** (index.html, engine.js,
> tasktypes.js, data/skills.js as of Aug 2026). Where the Japanese hub has
> diverged from the ELC original, this document describes the Japanese hub.
> Open questions that need Andrew's decision are marked **[DECISION NEEDED]**
> and mirrored in `collab/QUESTIONS_FOR_ANDREW.md`.

---

## 1. What this is

A zero-dependency, offline-capable practice hub for Japanese grammar.
Students pick cells from a progression matrix, drill them in a mastery loop,
and get a first-try report they can copy to the teacher. Plain HTML + JS,
`window` globals, no build step, opens by double-click.

Screen flow: **select → task → report** (three `<section class="screen">`
blocks in index.html; the engine toggles `.active`).

## 2. File architecture (load order matters)

```
index.html       markup + all CSS + design tokens. Loads the three scripts in order:
data/skills.js   ALL content → window.SKILLS, window.BANDS, window.CATEGORIES, window.POOLS
tasktypes.js     task-type registry → window.TASK_TYPES
engine.js        matrix, drill loop, mastery rounds, scoring, report. Content-agnostic.
```

The lane rule in DESIGN_RULES.md §0 applies: a commit touches one of these
lanes only.

## 3. The grid (current state)

- `window.BANDS = ["script","words","sentences","choices","links","paragraphs","argument"]`
  — matrix columns, internal ids (stable, no spaces — survive URLs, CSS
  selectors, localStorage, CSV). **Never render an id directly** — always go
  through `window.BAND_META[id]`.
- `window.BAND_META[id] = { head, long, teacher, cur, show }`:
  `head` = one-word student-facing column heading (e.g. "Choices"); `long` =
  the legend's fuller form ("Choosing the right structure"); `teacher` = the
  real curriculum label written to teacher exports ("Levels 7 and 8"), never
  shown to students; `cur` = `"VIC"` or `"VCE"`, drives the colour axis (§4
  below); `show` = whether the column renders by default (`script` and
  `words` — VIC F–2 and 3–4 — are defined but hidden: the F–10 curriculum
  names no grammar at those bands, so there's nothing honest to put there
  yet. A "Show Foundation–Level 6 columns too" toggle reveals them).
- `window.CATEGORIES` — 17 matrix rows. `window.CATEGORY_META[category] =
  { prescribedBy }`, `"VCE"` (on the VCE Japanese SL prescribed grammar
  list) or `"PROGRAM"` (school-designed, not on that list — still valid
  content, just not externally prescribed). Drives the dual-chip / "school"
  chip on a cell when a row's prescribing document differs from its
  column's curriculum (e.g. a VCE-prescribed row sitting in a VIC-curriculum
  column shows a small "VCE" chip).
- `window.POOLS = ["Reading Practice","Topic Vocabulary"]` — rendered as card
  lists **below** the matrix, not band-tracked.
- The engine renders one cell per `category × band`; it finds **the first**
  skill matching both (`SKILLS.find`), so **do not create two skill nodes with
  the same category and band** — the second is unreachable from the matrix.
  A category *can* and often should have skill nodes at more than one band —
  that's a row spanning bands (e.g. "Core Particles" has nodes at `choices`
  and `links`), the intended shape, not a bug.
- A cell with no matching skill, or a skill with `introduced:false`, renders
  greyed with a dash and a `title`/`aria-label` explaining why (e.g. "This
  row starts at Choices"). A skill with `items:[]` renders as `0` (exists, no
  content yet). Never locked — every band is always clickable.

Full grounding, evidence and the coverage map (which row belongs at which
band, and why) is `collab/research/DESIGN_BAND_LADDER.md`. Placement there is
best-effort against the VIC F–10 sequence and the VCE study design, cross-
checked against Andrew's own files — not his ratification. **[DECISION
NEEDED]**: Q2/Q3/Q15 in `collab/QUESTIONS_FOR_ANDREW.md` stay open (is the
F–10 or 7–10 sequence the right one; do the seven column names read right to
a Year 7 and a Year 12; may "VCE" appear on a student's screen; per-item
splitting within a row, e.g. Conjunctions' が/から vs ので/のに, is queued as
a follow-up rather than rushed).

## 4. Skill node schema

```js
{
  id: "te-form-b2-core",        // unique, kebab-case, stable once published
  category: "て-form I",        // must match an entry in CATEGORIES or POOLS
  band: "Band 2",               // must match an entry in BANDS (pools may use any label)
  name: "Sequence, Request, Progressive",   // shown in the cell and reports
  example: "手を洗って、ご飯を食べます。",     // representative sentence (not currently rendered)
  introduced: true,             // false → greyed cell
  mode: "progression",          // informational; pools vs progression is decided by category
  assessed: true,               // informational
  resources: null,              // or { video:"url", sheets:[{name,url}] } → live links in report
  items: [ ... ]                // the question bank for this cell
}
```

## 5. Task-type interface

Each entry in `window.TASK_TYPES` implements:

```
render(item)          -> html string for #taskArea (reuse existing CSS classes)
wire(area)            -> attach listeners; dispatch "gh:ready" (bubbles) once an
                         answer exists, "gh:submit" on Enter
collect(area)         -> the current response, or null if nothing entered
check(item, response) -> { correct: bool, expected: string }
mark(area, item, res) -> paint correct/incorrect state onto the inputs
label                 -> string used by the task-type filter buttons
```

Implemented: **identify** (MCQ; options shuffled per render), **gapfill**
(typed answer), **transform** (typed conjugation/rewrite), **order**
(word/particle tiles into sequence), and a **produce** stub (the engine's
fallback for unknown types — renders a note instead of crashing; must keep
existing).

Typed answers (gapfill, transform) are compared via `normJa()`: NFKC
normalisation, all spaces removed (incl. full-width), trailing punctuation
forgiven, Latin lowercased. Kana vs kanji is **not** unified — `accept`
lists still spell out both.

The select screen's filter row is **derived from the content**: any type
that appears in an item and exists in the registry gets a filter button
automatically. Adding a task type no longer requires an engine edit.

Planned/possible types: `choose`, `listen` (play an mp3 from `audio/`,
answer a question — see J1), `match`, `clickword` (reference implementations
in Bone-Sparrow's GrammarHuboffline).

## 6. Item schemas (the two live types)

```js
// identify — MCQ over a highlighted feature in a sentence
{ type:"identify",
  prompt:"What is て doing here?",
  sentence:"手を<b>洗って</b>、ご飯を食べます。",   // <b> = the target; <ruby> allowed for furigana
  options:["sequence (do X, then Y)", ...],        // exactly one defensible answer
  answer:"sequence (do X, then Y)",                // must appear verbatim in options
  explain:"て links two actions in order..." }

// gapfill — type the missing form
{ type:"gapfill",
  prompt:"Change to the te-form",
  before:"まどを", after:"ください。",              // rendered around the input
  cue:"あける",                                    // dictionary-form cue under the gap
  accept:["あけて"],                               // EVERY valid answer: kana AND common kanji forms
  explain:"る-verbs drop る and add て。..." }

// transform — type the whole transformed form from a source stimulus
{ type:"transform",
  prompt:"Change to the て-form",
  sentence:"たべる (to eat)",                      // the source form shown large
  accept:["たべて","食べて"],
  explain:"る-verbs (ichidan) drop る and add て。たべる → たべて" }

// order — tap tiles into sequence (particle placement, verb-final order)
{ type:"order",
  prompt:"Build the sentence: (I) read a book.",
  words:["ほん","を","よみます"],                  // tiles, listed in A correct order; display shuffles
  answer:"ほんをよみます",                          // spacing never matters (normJa strips it)
  accept:[],                                       // optional: other orderings Japanese genuinely allows
  explain:"The object takes を and the verb goes last: ほんを よみます。" }
```

Any item may also carry `tags:["sub-skill"]`. In a bundled cell, tag which
sub-skill each item targets; when a skill's items span more than one tag,
the teacher exports break the skill's score down per tag.

```js
```

Conventions already in the bank (keep them):
- Instructional text (prompts, options, explanations) in **English**; Japanese
  only in sentences, particles and cues. "Hints in English, language content
  in Japanese."
- `accept` lists both kana and kanji spellings where students could reasonably
  type either (e.g. `["よんで","読んで"]`).
- Kanji beyond the prescribed VCE list is avoided or given furigana via
  `<ruby>…<rt>…</rt></ruby>`; where a kanji is off-list, the explain note says
  so (see を通して item).
- AU spelling in English text. No em dashes in learner-facing text.

**[DECISION NEEDED]** Typed-input policy: must students type in Japanese IME,
or should romaji input be auto-converted/accepted at lower bands? Affects
`gapfill.accept` and possibly a helper in tasktypes.js.

## 7. Engine behaviour (what content authors can rely on)

- **Mastery loop:** round 1 runs every selected item shuffled; items answered
  wrong queue for mastery rounds until each item has been correct once.
- **Scoring:** first-ever attempt per item is the score (`firstPass`); total
  attempts tracked separately.
- **Report:** big first-try stat, per-skill breakdown (100% green / ≥50%
  amber / else red), "Practise next" list of sub-100% skills with links if
  `resources` is populated, and three teacher exports: **Copy teacher
  results** (plain text incl. full item log), **Download CSV**
  (name,date,category,band,skill,sub_skill,first_try,out_of — with per-tag
  sub-rows; UTF-8 BOM so Excel renders the Japanese), and **Copy row for
  sheet** (TSV header+row for pasting into a marks spreadsheet). An optional
  name field feeds the exports; nothing is stored.
- No persistence. Closing the tab loses the run. (localStorage is allowed on
  the deployed site only — DESIGN_RULES.md §7 — but is not implemented.)

## 8. Content that exists outside the app (not yet wired in)

- `audio/qa-01.mp3 … qa-47.mp3` + `generate-audio.js`: TTS audio for a
  47-question Oral Exam Q&A set (Tier 1: 1–15, Tier 2: 16–30, Tier 3: 31–47).
  The question text lives in `generate-audio.js`. **Nothing in the app plays
  these yet** — the Oral Exam section they belong to exists only in a newer
  local build (`vce-grammar-hub-test_17` lineage). See
  `collab/QUESTIONS_FOR_ANDREW.md` before rebuilding it from scratch.
- `Unit 10 Abilities and preferences/` — a fully differentiated Year 9-10
  topic unit (readings at MODIFIED / INTERMEDIATE / ADVANCED tiers, plain-form
  grammar, jobs vocab). Prime source material for future topic modules.
- `2019JapaneseSLSD.pdf` — VCE Japanese SL study design (prescribed grammar &
  kanji lists live here).
- `Japanese F–10 Sequence...docx` — the other curriculum the combined class
  straddles.

## 9. Sanity check (run before every content commit)

```bash
node -e 'global.window={};require("./data/skills.js");require("./tasktypes.js");
const S=window.SKILLS,T=window.TASK_TYPES;let n=0,bad=0;
S.forEach(s=>s.items.forEach((it,i)=>{n++;
const p=(it.answer!==undefined)?it.answer:it.accept[0];
if(!T[it.type].check(it,p).correct){bad++;console.log("BAD",s.id,i,it.type)}}));
console.log("items",n,"problems",bad)'
```

(The model answer is `answer` where the item has one — identify, order —
otherwise `accept[0]`.) Must print `problems 0`.

Also check: no duplicate `category`+`band` pair across skill nodes (§3).

## 10. Roadmap

Lives in `collab/PROPOSAL.md` (phases) and `collab/JOBS_FOR_LIAM.md`
(actionable build queue). This file stays descriptive: update it **in the same
commit** as any change to a schema, token, or interface it describes.
