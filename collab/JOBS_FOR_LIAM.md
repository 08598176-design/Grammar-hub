# Jobs for Liam's Claude

The build queue for big jobs. Liam has heavy model capacity (Fable/Opus on a
5× Max plan) for roughly a month from mid-Aug 2026 — jobs queued here get
picked up when Liam runs a session against this repo.

## Protocol

**Andrew's assistant adds a job here when** the work is any of:
- engine.js / tasktypes.js / index.html changes (anything outside the content
  lane — see DESIGN_RULES.md §0);
- a new module, task type, or prototype;
- a content batch bigger than ~30 items, or one needing a new schema;
- anything that will take sustained multi-file work.

Small stuff (≤30 items in an existing skill, fixing a typo in skills.js,
filing an inbox/ upload, answering a question) — Andrew's assistant just does
it in the content lane and runs the sanity check (SPEC §9).

**Job entry format** — copy this template; a job missing "Decisions made"
gets bounced back as NEEDS-INFO:

```
### J<n>. <title>            <STATUS>
Status: QUEUED | NEEDS-INFO (Q<x>, Q<y>) | IN-PROGRESS (<who>, <date>) | DONE (<commit>)
What: one paragraph, concrete.
Why: the pedagogical goal, in Andrew's terms.
Inputs in repo: files the builder should read first.
Decisions made: link the Decision Log entries this relies on.
Done when: the acceptance check a non-coder (Andrew) can run.
Size: S / M / L
```

**Liam's Claude:** work top-down but skip NEEDS-INFO jobs; mark IN-PROGRESS
when you claim one; commit per the lane rules; flip to DONE with the commit
hash; append new questions to QUESTIONS_FOR_ANDREW.md rather than guessing.

---

## Queue

### J1. Recover or rebuild the Oral Exam Q&A section   NEEDS-INFO (Q1)
Status: NEEDS-INFO (Q1)
What: The repo has `audio/qa-01..47.mp3` and the generating script (question
text + tier structure included in `generate-audio.js`) but no UI that plays
them. If Andrew's newer local build (`vce-grammar-hub-test_18+`) already has
the section, merge it in. Only if it doesn't exist: build a `listen` task
type + an Oral Exam practice screen following the checklist pattern in
DESIGN_PHILOSOPHY.md ("Teacher heard me…" human-in-the-loop; the computer
never judges speech).
Why: The VCE external oral is high-stakes and hard to practise alone; tiered
listen-and-respond drills with native-ish audio are the highest-value unwired
asset in the repo.
Inputs in repo: `generate-audio.js` (QUESTIONS array + tiers), `audio/`,
DESIGN_PHILOSOPHY.md feedback-loop section.
Decisions made: pending Q1 (and Q8 for priority).
Done when: opening index.html shows an Oral Exam entry; each question plays
its mp3; tiers 1–3 selectable; nothing else in the app broke.
Size: M

### J2. Port the advanced engine from Bone-Sparrow's GrammarHuboffline   QUEUED (partially unblocked)
Status: QUEUED — export + task types can start now; adaptive placement waits on Q2
What: Liam's `Bone-Sparrow/GrammarHuboffline.html` contains a later-generation
engine: CSV / TSV-row / plain-text teacher exports with sub-skill tag rows,
`order`, `transform`, `match`, `clickword` task types, per-item `tags`, and
adaptive band−1/band/band+1 placement with plain-English routing messages.
Port these into this repo's modular files (engine.js/tasktypes.js), keeping
the lane structure — do NOT collapse back into a single file. Stage 1 (now):
exports + `order`/`transform` types (order = particle/word-order tiles,
transform = conjugation drills) + `tags` support. Stage 2 (after Q2): adaptive
placement over the agreed bands.
Why: `order` and `transform` fit Japanese better than gapfill alone; sub-skill
tags let the report say *which* conjugation family failed; adaptive placement
is the mechanism that lets one combined 10/11/12 class share the tool.
Inputs in repo: this repo's engine.js/tasktypes.js/SPEC.md; the reference
implementation lives in Liam's Bone-Sparrow repo (Liam's Claude has access).
Decisions made: none needed for stage 1; stage 2 needs Q2, Q4.
Done when: sanity check passes; a demo skill using `order` and `transform`
works; report offers Copy text / Copy row / Download CSV; existing 246 items
unaffected.
Size: L

### J3. Restructure the matrix to the agreed band ladder   NEEDS-INFO (Q2, Q3)
Status: NEEDS-INFO (Q2, Q3)
What: Rename/extend BANDS per Andrew's mapping (F–10 levels ↔ VCE units),
re-band existing skill nodes, add greyed placeholder cells for the rows Andrew
wants filled downward first, and write the column names students will see.
Why: This is the "one matrix for three year levels" backbone.
Inputs in repo: data/skills.js, SPEC §3, Decision Log.
Done when: matrix renders the new ladder; every existing skill still
reachable; no duplicate category×band cells.
Size: S (code) — the real work is Andrew's mapping.

### J4. First topic module: digitise the Unit 10 pattern   NEEDS-INFO (Q6, Q7)
Status: NEEDS-INFO (Q6, Q7)
What: Take the `Unit 10 Abilities and preferences/` materials (tiered reading
CATs at MODIFIED/INTERMEDIATE/ADVANCED, plain-form grammar, jobs/sports
vocab) and build the template topic module: a vocab frontloading drill
(spaced, notranslate), a tiered quick-read task (Bone-Sparrow FIND_TASKS
pattern: click the phrase that answers X), and grammar items tagged to the
topic. The template then gets stamped out for whichever topic Andrew's
calendar needs next.
Why: Topic modules are where "extend the strong, support the low, same room"
happens; Unit 10 already shows Andrew's tiering instincts on paper.
Inputs in repo: `Unit 10 .../` folder, DESIGN_PHILOSOPHY.md ladders section.
Decisions made: pending Q6 (topic map + which next), Q7 (paraphrase policy).
Done when: one full topic module runs end-to-end for a class Andrew is about
to teach; he field-tests it and the next topic takes <1 day to stamp out.
Size: L

### J5. Kanji component workbench prototype   NEEDS-INFO (Q5)
Status: NEEDS-INFO (Q5)
What: A small prototype porting the morpheme-matrix idea to kanji: component
families (semantic radical + phonetic component), colour-bound like
prefix/root/suffix in Liam's word builder, with build-from-parts as the
first-attempt rule. One family from Andrew seeds it; VCE prescribed list
scopes it.
Why: Possibly the only kanji angle the app stores don't already own — tied to
Andrew's exact lists and his morphology-style teaching.
Done when: Andrew looks at a 1-family prototype and says build/kill.
Size: M (prototype)

### J6. WAGOLL wall for VCE Japanese writing   NEEDS-INFO (Q9)
Status: NEEDS-INFO (Q9)
What: Port the writing-wall pattern (teacher marks up a model answer with
colour-bound features, shares via `#ex=` URL, students collect examples and
assemble their own from sentence-level moves) for one VCE writing form.
Teacher-written models only.
Done when: Andrew can mark up and share one model 400-ji piece.
Size: M

### J7. Purge student-scan PDFs from git history   NEEDS-INFO (Q10)
Status: NEEDS-INFO (Q10) — do not do this without Andrew's explicit go-ahead
What: After Andrew confirms: delete the two `Unit 10 ... student scans` PDFs,
then rewrite history (git filter-repo) and force-push so they're gone from
history too; everyone re-clones after. Coordinate timing with Andrew.
Size: S, but disruptive — schedule it, don't spring it.

### J8. Split teacher archive from app (repo tidy)   QUEUED (low priority)
Status: QUEUED — after J2/J3, and only with Andrew's blessing per folder
What: The repo root mixes the app (5 files) with inherited EAL materials from
Liam's original hub and Andrew's teaching archive. Move app files to `/app`
(or archive non-app materials into `/archive/eal-inherited` and
`/archive/teaching-materials`), update README. Nothing gets deleted without
Andrew naming it.
Why: Lowers the "what is this repo" confusion and shrinks the privacy surface
area Andrew has to reason about.
Size: S

---

## Done

*(move completed jobs here with commit hash and date)*

- **2026-08-18 · Scoping session (Liam's Claude, this branch):** repo survey,
  SPEC.md reconstruction, collab/ workflow docs, CLAUDE.md, README rewrite.
