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
data/skills.js   ALL content → window.SKILLS, window.JT_STRANDS, window.JP_YEARS,
                 window.JP_CHUNKS, plus window.BANDS/BAND_META/CATEGORIES/
                 CATEGORY_META/POOLS (labels for reports and chips)
lever.js         the shared language lever + four-form text → window.HubLever
tasktypes.js     task-type registry → window.TASK_TYPES
engine.js        timeline, drill loop, mastery rounds, scoring, report.
                 Content-agnostic; hands its own strings to lever.js.
```

Not loaded by the app:

```
data/script-bank.js  the parked Script strand (5 nodes, 40 items) →
                     window.SCRIPT_BANK. Grammar hub is grammar only; this
                     is the seed bank for a future stand-alone script app.
apps/                stand-alone proof-of-concept apps (word-lab, oral,
                     writing-wall, level-up), each an index.html plus its
                     own copy of lever.js, so a folder can be deleted or
                     handed over whole. They share the design tokens and
                     the lever, but none of the hub's other JS.
```

The lane rule in DESIGN_RULES.md §0 applies: a commit touches one of these
lanes only.

## 3. The year timeline (the select view)

The select screen is a **Prep→Year 12 timeline**: one row per grammatical
system (strand), a column per year, and each teaching step drawn as a block
spanning the years it is taught across. Read a row left to right and you are
watching one skill get harder — the same shape as the non-EAL year view in
Liam's English hub. (This replaced the earlier category × band grid; the
band vocabulary survives only as report/export labels, below.)

- `window.JP_YEARS = ["F","1",…,"12"]` — the year axis. Index 0 is Prep.
- `window.JT_STRANDS[strand] = [kanji, kana, romaji, English]` — the 13
  strand row labels, one entry per language-lever stage (§7). Keys are the
  English names and must match `SKILLS[].category`.
- `window.JP_CHUNKS[strand] = [chunk, …]` — the strand's teaching steps in
  year order. Chunk schema:

  ```js
  {
    title: "Classroom requests: 〜てください",   // canonical English (aria, tooltips)
    t: [kanji, kana, romaji, English],          // lever forms of the title
    y0: 3, y1: 4,                               // first/last year index (inclusive)
    years: "3–4",                               // display label
    covers: ["greet-y34"],                      // skill-node ids this step drills
    needs: ["Verb Forms: Making the て-form"],  // optional cross-strand prerequisites,
  }                                             // surfaced in the tooltip
  ```

- Clicking a chunk selects every item of every node in `covers`; selecting a
  chunk also pulls in the previous chunk of the strand **as review**. Chunks
  with no items render greyed ("まだなし") but are never locked.
- Curriculum colour axis: grouped bars above the rows mark Prep–10 as
  Victorian Curriculum (`--vic`) and 11–12 as VCE (`--vce`); the encoding is
  lightness + fill + a word, never hue (DESIGN_RULES §4 — the warm hues
  belong to correctness). `window.CATEGORY_META[category] = { prescribedBy }`
  (`"VCE"` or `"PROGRAM"`) still drives the per-row VCE-list/school chip.
- Because chunks address nodes **by id**, two skill nodes may now share a
  `category`+`band` pair — the old grid's one-cell-per-pair constraint is
  retired. Reports group by node id, so nothing collides.
- `window.BANDS` / `window.BAND_META[id] = { head, long, teacher, cur, show }`
  are **retained for reporting only**: `teacher` is the curriculum label
  written to CSV/TSV exports, `head` appears in the drill-screen skill tag.
  Nothing renders a band column any more.
- `window.POOLS = ["Reading Practice","Topic Vocabulary"]` — card lists
  below the timeline, not year-tracked.

Full grounding, evidence and the coverage map (which step belongs at which
years, and why) is `collab/research/DESIGN_BAND_LADDER.md`. Placement is
best-effort against the VIC F–10 sequence and the VCE study design, cross-
checked against Andrew's own files — not his ratification. **[DECISION
NEEDED]**: Q2/Q3/Q15 in `collab/QUESTIONS_FOR_ANDREW.md` stay open (is the
F–10 or 7–10 sequence the right one; do the strand names read right to
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
- **Language lever (Japanese-first chrome):** every page of the hub is
  Japanese-led and every piece of interface text carries four forms
  (kanji / kana / romaji / English). The mechanism lives in **`lever.js`**,
  one shared file included by every page (landing, grammar, and each app),
  which injects its own CSS and needs no build step. A page calls
  `HubLever.init({strings, ruby, onChange})` with its own dictionary; the
  component then mounts the page lever, discovers section levers, wires tap
  bumps, and swaps text on every `[data-jt]` element. `HubLever.apply(root)`
  re-applies after a page redraws its own markup.

  - **Page lever** (mounted automatically as `#pageLever`): a plate fixed in
    the margin beside the card, vertically centred, following you down the
    page. Notches are labelled 漢字/かな/abc/EN with the live one in accent.
    `stepMs` ~845 ms.
  - **Section levers**: any element with `data-scope="#id"` becomes a small
    lever governing just that section. They are deliberately **more
    forgiving**: `stepMs` ~4000 ms, they are floored at the page stage so
    they can never show *less* support than the page, and while the pointer
    is inside their section the spring **pauses entirely** (`.resting`)
    rather than counting down while you read.
  - **The recoil** is a spring-loaded catch, not a slide: each stop holds
    while the wobble settles (28% of `stepMs`), creeps a third of the way
    back under tension (72%), then snaps onto the notch and wobbles. The
    stage changes on the snap, because that is when the mechanism moves.
  - Keyboard: arrows step, End pulls to full English, Home/Escape releases
    straight to the floor (accessibility escape hatch, not the spring).
    `prefers-reduced-motion` drops the creep and the wobble.
  - Individual labels can be tapped (`.jt-tap`) for a one-stop bump with the
    same elastic decay, and English is always one hover away (`title`).
  - Google Translate is blocked site-wide (`translate="no"`, `notranslate`):
    machine translation of the interface would silently break the mechanic.
  - Item content and analytical explanations stay English for now (J11);
    the lever governs chrome.

## 8. Content that exists outside the app (not yet wired in)

- `audio/qa-01.mp3 … qa-47.mp3` + `generate-audio.js`: TTS audio for a
  47-question Oral Exam Q&A set (Tier 1: 1–15, Tier 2: 16–30, Tier 3: 31–47).
  The question text lives in `generate-audio.js`. The grammar hub itself
  does not play these; `apps/oral/` is a stand-alone PoC player for the set
  (tiers, per-question audio, self-check boxes). Whether it merges into the
  hub or stays separate is Q1 in `collab/QUESTIONS_FOR_ANDREW.md`.
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

Also check: every id in every chunk's `covers` (§3) resolves to a skill
node, and every non-pool skill node is covered by some chunk — an uncovered
node is unreachable from the timeline:

```bash
node -e 'global.window={};require("./data/skills.js");
const ids=new Set(window.SKILLS.map(s=>s.id));const covered=new Set();let bad=0;
Object.entries(window.JP_CHUNKS).forEach(([st,cs])=>cs.forEach(c=>c.covers.forEach(id=>{
covered.add(id);if(!ids.has(id)){bad++;console.log("DANGLING",st,c.title,id)}})));
window.SKILLS.filter(s=>!window.POOLS.includes(s.category)&&!covered.has(s.id))
.forEach(s=>{bad++;console.log("UNCOVERED",s.id)});
console.log("cover problems",bad)'
```

Must print `cover problems 0`. (The old "no duplicate category+band" rule is
retired — chunks address nodes by id, §3.)

## 10. Roadmap

Lives in `collab/PROPOSAL.md` (phases) and `collab/JOBS_FOR_LIAM.md`
(actionable build queue). This file stays descriptive: update it **in the same
commit** as any change to a schema, token, or interface it describes.
