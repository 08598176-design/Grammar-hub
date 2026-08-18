# Jobs for Liam's Claude

The build queue for big jobs. Liam has heavy model capacity (Fable/Opus on a
5× Max plan) for roughly a month from mid-Aug 2026 — jobs queued here get
picked up when Liam runs a session against this repo.

Each job carries a **Model** hint for Liam's side: *Opus* for engine/
multi-file/architecture work, *Sonnet* for content batches and mechanical
ports against an existing spec. The hint is advice, not a rule.

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

### J1. Recover or rebuild the Oral Exam Q&A section   PoC SHIPPED, NEEDS-INFO (Q1)
Status: Stand-alone PoC player shipped 2026-08-18 (`apps/oral/`, live at
`/oral/` with the 47 MP3s) — tiers, per-question audio, self-check boxes,
honest no-fake-grading banner. Still NEEDS-INFO (Q1): if Andrew has a newer
local build with his own Oral section, that build wins and this PoC yields.
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
Deploys to: `/oral/` on the live site, plus a card on the landing page
(see DEPLOYING.md) — it's a sibling tool, not a screen bolted into the
grammar app, unless Andrew's existing build already has it inside.
Model: Opus (new screen + task type). If Andrew's newer build already has
it, Sonnet can do the merge.
Size: M

### J2. Port the advanced engine from Bone-Sparrow's GrammarHuboffline   STAGE 1 DONE
Status: Stage 1 DONE (2026-08-18, commits 199d37f/57c2f6f/78af3e2) —
`order` + `transform` task types with Japanese answer normalisation
(normJa), per-item `tags` with per-tag report/CSV sub-rows, CSV / TSV /
text teacher exports, content-derived task filter, build tag, produce
fallback stub, 6 seeded demo items, browser smoke test passed.
Stage 2: NEEDS-INFO (Q2, Q4) — adaptive band−1/band/band+1 placement with
plain-English routing messages, over the agreed band ladder. Reference in
Bone-Sparrow's GrammarHuboffline (`skillWeakness`, placement routing).
Model: Opus (stage 2 is engine-heavy; the reference code makes it a
guided port rather than a design job).
Done when (stage 2): a student can take a placement run on any category and
get routed with the four plain-English outcomes; sanity check passes.
Size: M (stage 2)

### J3. Restructure the matrix to the Prep-12 band ladder   DONE, awaiting ratification (commits eae5f48, 227286e)
Status: Shipped live 2026-08-18 (Liam: "don't be shy about pushing live stuff,
we aren't showing kids yet") — built ahead of Q2/Q3/Q15 rather than blocked
on them, on the reasoning that Andrew reacting to something concrete beats
another round of questions. **Still needs his read before real classroom
use.**
What shipped: `window.BANDS` is now the 7-id ladder (script/words/sentences/
choices/links/paragraphs/argument) from `collab/research/DESIGN_BAND_LADDER.md`,
grounded in `VIC_F10_JAPANESE.md` + `VCE_STUDY_DESIGN.md`; every existing row
moved to the single band its content best matches per that design's SD-page
citations (not a blind rename — the worst mislabel is fixed: Sentence-Final
Particles and basic Conjunctions were sitting in the old top band despite
being Year 7-10 material); Core Particles now genuinely spans two bands
(choices→links) via the free merge the design identified; two new rows
(Polite Finite Forms, Plain Finite Forms) fill the conjugation prerequisite
gap the design flagged as blocking 48 existing items' diagnostics; VIC/VCE
colour coding, dual-chips, sticky labels, and the "show F-2/3-4 columns"
toggle are all live. See engine commit 227286e for the full list.
What's deliberately NOT done: splitting a row's existing items across
multiple bands (e.g. Conjunctions' が/から vs ので/のに/けれども) — see J10.
Done when (ratification): Andrew looks at the live matrix and the coverage
map in DESIGN_BAND_LADDER.md §6.4, and answers Q2/Q3/Q15 — confirming,
correcting, or overriding the placements. Nothing here is locked to his
answer; it's a starting point he can argue with directly instead of in the
abstract.
Model: Sonnet for any corrections once he rules.

### J10. Split existing rows across the bands they actually span   DONE (commit 83c73e3)
Status: DONE 2026-08-18. 13 rows split; live cells 19 -> 33; every grammar
row except the three entry rows (Polite Finite Forms, Plain Finite Forms,
ない-form) now spans 2-3 bands. Done by script — item objects copied by
reference, with an assertion that all 280 originals survive exactly once —
so no Japanese was rewritten in the process. 12 new items added for cells
the split left too thin: the potential-form paradigm (う-verb / る-verb /
irregular + the を→が shift), plus か and のほう.
Follow-up worth doing, not urgent: the three single-band rows could each
justify a second cell (ない-form's ないほうがいい vs なければならない split by
register; Polite Finite Forms extending into `choices` for polite-vs-plain
register choice). Left alone deliberately — those are judgement calls about
sequence, which is Andrew's (Q3), not mechanical re-sorting.

### J11. Japanese-first item content (prompts in four forms)   NEEDS-INFO (Andrew)
Status: NEEDS-INFO — needs Andrew's ruling on wording and scope
What: The chrome now cycles kanji/kana/romaji/English (engine commit
911351d) and the mechanism (UI_STRINGS + data-jt + applyLang) is ready for
item content. The job: author the 400 items' prompts (and possibly option
labels) in the four forms, so questions themselves read Japanese-first,
per Liam's 'get em used to japanese... for all questions'. This reverses
the recorded 'instructions in English' convention, so Andrew must rule:
which bands get Japanese-first prompts, whether romaji belongs in the
chain for his students (many teachers ban it early), and the standard
wording for each prompt pattern ('Fill in the correct particle' ->
ただしい助詞を入れましょう etc — one ruling per pattern, ~20 patterns,
not 400 separate rulings).
Inputs in repo: engine.js UI_STRINGS block (the shape to follow),
data/skills.js prompt patterns.
Model: Sonnet once Andrew supplies the pattern wordings; the mechanical
application is scriptable.
Size: M

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
Model: Opus for the template; Sonnet for stamping out later topics.
Size: L

### J5. Kanji component workbench prototype   PoC SHIPPED, awaiting verdict (Q5)
Status: PoC shipped 2026-08-18 (`apps/word-lab/`, live at `/words/`) —
three families (食・費・調) from the 給食 unit's own vocab: meet the family
(tap-reveal with elastic decay) → build each word from part tiles → derive
its meaning, mastery loop, first-try report. Morpheme roles colour-bound
(head kanji vs other parts). Awaiting Andrew's build/kill verdict and
accuracy check on readings/glosses (Q5). If "build": next steps are more
families, his chosen list (VCE vs Obento), and possibly radical-level
decomposition.
Why: Possibly the only kanji angle the app stores don't already own — tied to
Andrew's exact lists and his morphology-style teaching.
Done when: Andrew looks at the prototype and says build/kill.
Model: Opus (novel module design).
Size: M (prototype)

### J6. WAGOLL wall for VCE Japanese writing   PoC SHIPPED, NEEDS-INFO (Q9)
Status: Read-only PoC shipped 2026-08-18 (`apps/writing-wall/`, live at
`/writing/`) — one model evaluative text marked up by three colour-bound
rhetorical moves (examples / balance / judgement), each annotation naming
the grammar powering the move. The full port (teacher mark-up tool, `#ex=`
sharing, assemble-your-own) stays NEEDS-INFO until Andrew supplies model
answers per form (Q9).
What: Port the writing-wall pattern (teacher marks up a model answer with
colour-bound features, shares via `#ex=` URL, students collect examples and
assemble their own from sentence-level moves) for one VCE writing form.
Teacher-written models only.
Done when: Andrew can mark up and share one model 400-ji piece.
Model: Opus (port of a complex reference app).
Size: M

### J12. Levelled WAGOLL ladder ("bump it up") for Japanese writing   PoC SHIPPED (2026-08-18)
Status: **Wall + print view shipped** — `apps/level-up/`, live at `/levelup/`.
The task chosen is 自己しょうかい, because it is the one task the program asks
for in every year: nine rungs (F–2, 3–4, 5–6, then each year 7 to 12), four
set phrases at the bottom and a hedged argument at the top. Five proposed
criteria, each on three channels (colour, underline style, glyph); compare
mode against the rung above; ふりがな and English toggles; print gives one
rung per A4 page. Content is a fictional composite, and both the criteria
(Q17) and the model answers await Andrew.
Still open from the original spec: the teacher-facing mark-up tool (a
teacher pasting their own model and tagging phrases), `#ex=` URL sharing,
and the assemble-your-own task built from collected moves.
What: Port the pattern Liam already runs in Year 7 Humanities and in the ELC
analytical-writing WAGOLL — **the same task answered at every level of a
ladder**, so a student sees the rung they are on and the rung above, and
what exactly changes between them. Two views over ONE content file:
1. **The wall** (`bump-it-up.html` pattern): every level's worked answer on
   one scrolling page, marked up phrase by phrase.
2. **Level anchor sheets** (`level-sheets.html` pattern): one printable A4
   sheet per level — worked example, "what each marked phrase proves", and
   that level's continuum descriptors, with the type auto-scaled so a short
   level still fills its page.
Reference implementations (Liam's, public):
- https://liaminhawai-cmd.github.io/Year-7-Humanities-Pages/history/batman/bump-it-up.html
- https://liaminhawai-cmd.github.io/Year-7-Humanities-Pages/history/batman/level-sheets.html
- Bone-Sparrow: `EAL analytical writing WAGOLL .pdf` (the analytical-writing
  version of the same idea, on paper).
Data contract to copy verbatim (from the humanities `content.js`), because
both views and any future view read it and nothing else:
```js
WALL = { title, task/inquiry, expected: "<the year level this class is in>", foot }
CRITERIA = [{ key, glyph, name, row }]      // glyph is the second channel
LEVELS = ["Grade 5","Year 6",…]             // the continuum's own columns
EARLY_LEVELS = [...]                        // optional access rungs below it
EXAMPLES[level]      = "prose with {key|marked phrase} spans"
EXPLANATIONS[level]  = { key: "what that marked phrase proves" }
CONTINUUM[key][level]= "the I-can descriptor at that level"
```
Hard requirements:
- **Two channels, never colour alone**: each criterion gets a colour AND a
  line style (solid/dashed/dotted/double/wavy) AND a glyph — the humanities
  sheet does all three, and DESIGN_RULES §2 requires it here too.
- Criterion colours must not collide with the hub's correctness hues or the
  VIC/VCE curriculum axis.
- Zero dependencies, one self-contained file per view plus the shared
  content file, same tokens as the rest of the suite, print CSS that
  actually paginates (`break-after:page`, `print-color-adjust:exact`).
- Japanese-side additions the humanities version has no need for: the
  worked examples are Japanese prose, so the marked spans must survive the
  hub's furigana conventions, and the level ladder is **Prep→Year 12**, i.e.
  it should share `JP_YEARS`/strand vocabulary rather than inventing a
  second ladder.
Decisions this depends on: **Q9** (which writing form first, and 2–3
teacher-written models per form — no student work), **Q3/Q15** (which
continuum wording the level rows quote), plus a new question worth asking
when this starts: what *is* the criterion set for Japanese writing? The
humanities four (origin/context/interpretations/reliability) do not
transfer; the VCE Japanese equivalent is likely something like task
fulfilment / structure / range of language / accuracy / register, and that
list is Andrew's to name, not ours to invent.
Why: This is the single most requested pattern from Liam's own teaching —
it makes "what does better look like" concrete instead of abstract, and it
is the natural home for the `apps/writing-wall/` PoC's move annotations
once there is more than one level of them.
Done when: both views render one full ladder from one content file, the
print output paginates one level per page, and Andrew can see his own level
descriptors down the side.
Model: **Opus** — Liam's explicit call. Port of two linked reference apps
plus a genuine pedagogy design decision (the criterion set).
Size: L

### J7. Purge flagged files from git history   NEEDS-INFO (Q10)
Status: NEEDS-INFO (Q10) — do not do this without Andrew's explicit go-ahead
What: Three files are already deleted from the tree but remain in history:
the two student-scan PDFs (commit 0841177) and "Senior Japanese.html"
(GitHub secret scanning flagged a Google API key at L14 — likely the Google
Sites frontend's own browser key from a saved page, but treat as live).
After Andrew confirms: rewrite history (git filter-repo) to drop all three,
force-push, everyone re-clones, then resolve the GitHub secret-scanning
alert. Coordinate timing with Andrew. Confirming the repo is set to Private
covers the risk in the meantime. Andrew should also skim Google Cloud
Console → Credentials for any key of his starting AIzaSyChg3 and rotate it
if — unexpectedly — it's his.
Model: Sonnet (mechanical, but follow the coordination steps exactly).
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
Model: Sonnet.
Size: S

### J9. Content batch: extend existing skills with order/transform items   QUEUED
Status: QUEUED — can run now
What: The `order` and `transform` types are live with 6 demo items. Extend
them through the existing bank: order items for Core Particles (both bands)
and た/たら/たり; transform items for て-form I/II, ない-form, Verb Stem
forms — roughly 8–12 per skill node, tagged by sub-skill (verb class for
conjugations, particle for order). Follow SPEC §6 shapes and the existing
bank's register; every Japanese sentence must stay within the vocabulary
level already used in that node. Run the sanity check; click through a
sample in the browser.
Why: Two task types with 3 items each is a demo, not a resource.
Decisions made: none needed — same skills, same schema, same conventions.
Watch for: word-order items must be genuinely unambiguous, or carry accept[]
for every valid ordering (see SPEC §6). When unsure whether an ordering is
acceptable, use fewer tiles rather than guessing — or queue a question.
Model: Sonnet (schema and conventions are fully specified). Opus if Sonnet's
Japanese feels shaky — and anything doubtful goes to QUESTIONS, not into the bank.
Done when: sanity check `problems 0`; every extended node has ≥8 items of
the new type; a browser click-through of one node of each type.
Size: M

---

## Done

*(move completed jobs here with commit hash and date)*

- **2026-08-18 · Scoping session (Liam's Claude, this branch):** repo survey,
  SPEC.md reconstruction, collab/ workflow docs, CLAUDE.md, README rewrite.
- **2026-08-18 · J2 stage 1 (Liam's Claude):** order/transform task types,
  normJa answer normalisation, tags + per-tag report rows, CSV/TSV/text
  exports, content-derived filter, build tag, 6 demo items. Browser smoke
  test passed. Commits 199d37f, 57c2f6f, 78af3e2.
- **2026-08-18 · Student-scan PDFs deleted from tree** (commit 0841177);
  history purge remains as J7.
- **2026-08-18 · Live site deployed** (`liaminhawai-cmd/japanese-hub`, public,
  GitHub Pages): hub landing page at `/`, grammar app at `/grammar/`, one
  folder per future tool. See DEPLOYING.md. One canonical URL from day one.
- **2026-08-18 · J3 (Prep-12 band ladder) built and deployed live** ahead of
  Andrew's ratification, per Liam's explicit go-ahead — see the Decision Log.
  280 items, 17 rows, 7-band ladder with VIC/VCE colour coding. Dev commits
  eae5f48/227286e, live commit 084b302. Design doc:
  collab/research/DESIGN_BAND_LADDER.md. J10 (per-item band splits) queued
  as the natural follow-up.
- **2026-08-18 · Student-scan PDF history purge still pending** (J7) — the
  files are out of the tree; the purge itself needs Andrew's go-ahead on
  timing, not a Liam-side decision, so it's not listed as "done" above.
