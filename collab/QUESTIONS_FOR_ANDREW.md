# Questions for Andrew

This file is the interview queue and the decision log. It exists because the
two people building this hub (Andrew, and Liam with his Claude) are rarely in
the same room, and because most of what blocks the build is **Japanese
pedagogy knowledge that only Andrew has**. Neither Liam nor any model should
guess these answers.

## How this file works

- **Andrew's assistant:** work through Open Questions conversationally — one
  or two at a time, not a wall of twelve. Give Andrew the context line so he
  knows why it matters. Record his answer under Decision Log with the date,
  in his words (tidied, not paraphrased into something he didn't say). Then
  delete the question from the open list. If an answer unblocks a job in
  `JOBS_FOR_LIAM.md`, update that job's status.
- **Liam's Claude:** when you hit something only Andrew can rule on, add a
  question here (next Q-number), mark the dependent job NEEDS-INFO, and move
  on. Never invent an answer to a curriculum or language question.
- Nobody deletes entries from the Decision Log. It is the project's memory.

---

## Open questions

### Q1. Is there a newer build on your machine? (ask this first)
**Context:** The repo's app came from a folder called `vce-grammar-hub-test_17`.
The repo also has 47 oral-exam MP3s (`audio/`) and the script that made them —
but nothing in the committed app plays them. The "Oral Exam Q&A" section they
belong to seems to exist only in a later local build.
**Ask:** Is there a `vce-grammar-hub-test_18` (or later) with the Oral Exam
section — or any other sections — that isn't in the repo? If yes, zip the whole
folder into `inbox/` before anyone rebuilds it from scratch.

### Q2. What should the bands mean?
**Context:** The matrix columns are currently "Band 1–4", roughly early → VCE
Units 3&4. Liam's suggestion is a skill-based ladder that runs the whole way
down, so the combined 10/11/12 class can drill from **one matrix at different
columns** — that's the tool's answer to the two-curriculums problem.
**Ask:** How should the columns map onto F–10 levels and VCE units? Do four
bands cover it, or do you want five or six (e.g. reaching down to Years 7–8)?
What would you *call* the columns so students self-select the right one
without stigma? (Liam's EAL hub uses curriculum codes; yours could use
"Foundations / Building / VCE 1&2 / VCE 3&4" or similar.)

### Q3. Are the 16 category rows the right spine?
**Context:** Current rows (particles, て-form I/II, た/たら/たり, plain form,
ない-form, nominalisers, …) are VCE-shaped. That's fine for the top bands, but
a Year 7–10 student reads that left column too. Worth knowing: right now
**every row has content in exactly one band**, so the "matrix" is really a
staircase — a list of 16 topics, each pinned to one level. The wall only
starts doing its job (same skill, harder version, one row) when at least a
few rows exist at two or three bands. Your answer to this and Q2 decides
which rows get that treatment first.
**Ask:** Keep this spine and extend rows downward? Merge/rename any rows?
Which three rows would you fill at the lower bands *first* — i.e. where do
your Year 10s actually bleed marks when they hit VCE?

### Q4. Typed answers: kana, kanji, romaji?
**Context:** Gapfill items accept typed answers; the bank currently accepts
kana and common kanji spellings. Younger students may not have Japanese IME
set up on school devices, or may be slow with it.
**Ask:** At which band is typing in Japanese a fair expectation? Below that,
should the app accept romaji (and auto-check it against the kana answer), or
should lower bands lean on tap-to-choose task types instead of typing?

### Q5. Kanji: is a "radical matrix" worth prototyping?
**Context:** Liam's EAL hub teaches morphology with morpheme matrices
(prefix + root + suffix families). The analogue: build kanji families from
shared components/radicals (e.g. 日 → 明・時・曜, semantic radical + phonetic
component patterns). You've said kana isn't worth building (apps abound) —
kanji may be different because it could tie to *your* prescribed lists.
**Ask:** Would a component-based kanji module actually help your students, or
do apps (WaniKani etc.) already own this space too? If yes: which list first —
the VCE prescribed kanji, or Obento chapter kanji by year level? One
worked example from you (a component family you'd teach) would seed the
prototype.

### Q6. Topic map: what does each year level do, roughly when?
**Context:** The plan's second layer is topic modules (vocab frontloading +
tiered reading + writing scaffolds), like your Unit 10 jobs folder but
digital. To sequence them we need your topic map.
**Ask:** A rough table, dot points fine: year level → term → topic → textbook
chapter → the 3–5 grammar points that topic carries. Which topic is coming up
next on your actual teaching calendar? (That one gets built first so you can
field-test with a real class.)

### Q7. Textbooks and copyright comfort
**Context:** The repo has Obento workbook page scans in the Unit 10 folder.
Fine for a private repo shared between colleagues; not fine if the hub ever
deploys to a public URL.
**Ask:** Which textbook/edition does each year level use? Are you happy with
the rule "repo private, textbook scans never in anything deployed"? Should
the app's items paraphrase rather than quote textbook sentences?

### Q8. Where do your students actually lose marks?
**Context:** Build order should follow pain, not neatness. VCE Japanese SL
assesses listening, reading, and writing plus the external oral.
**Ask:** Rank where your seniors bleed: oral exam fluency? reading section
stamina? script recognition speed? conjugation accuracy under pressure?
particle choice in writing? This ranking sets the order of the job queue.

### Q9. WAGOLL wall for Japanese writing?
**Context:** You liked the Bone Sparrow WAGOLL wall builder and
build-analysis-from-evidence tasks. The Japanese analogue would be model
answers for VCE writing (e.g. the 400-ji letter/article/story) annotated by
feature — students see *what good looks like*, then assemble their own from
sentence-level moves.
**Ask:** Which writing form first? Do you have (or can you write) 2–3 model
answers per form? Teacher-written models only — no real student work.

### Q10. Privacy state of the repo
**Context:** Two PDFs in `Unit 10 Abilities and preferences/` contained
scanned student work with feedback. They are now **deleted from the current
files** (Liam's side, Aug 18), but git keeps old versions in history, so
they're recoverable until a one-time "history purge" is run. Also: the app
now deploys to a public URL from a separate repo, so this repo can and
should be fully private.
**Ask:** (a) Please set this repo to Private: Settings → General → Danger
Zone → Change visibility. (b) OK for Liam's Claude to run the history purge?
It rewrites the repo's history and everyone re-clones afterwards — a small
one-time disruption, best done early. Pick a day; nothing else should be
mid-flight when it runs.

### Q13. Which year levels actually run?
**Context:** The school learning continuum (Languages tab) carries Japanese
"I can" statements for Years 6–11 only. The hub's student view will be
organised by year level, so we need the real span.
**Ask:** Which year levels do you actually teach Japanese at (does it start
in primary? does Year 12 = VCE Units 3&4 only)? Should the hub's year view
run 7–12, 6–12, or F–12?

### Q14. Continuum accuracy check
**Context:** The hub's student view quotes the school continuum's Japanese
"I can" statements per year level. A few look aspirational rather than
realistic (e.g. Year 11 Translating: "…legal texts, and technical manuals").
The hub will quote the continuum as-is, so errors there become errors in the
app.
**Ask:** Skim `collab/research/SCHOOL_CONTINUUM_JAPANESE.md` and mark any
statement you'd rewrite. If you update the master sheet, tell your assistant
so the hub copy follows.

### Q15. VC1 or VC2 strand labels in the student view?
**Context:** The school continuum's Japanese strands are Victorian Curriculum
**1.0** names (Socialising, Informing, Creating, Translating, Reflecting…).
The current F–10 Japanese curriculum is **Version 2.0**, which restructures
those into 5 sub-strands (Interacting / Mediating meaning / Creating text /
Understanding systems of language / Understanding the interrelationship of
language and culture). The hub's year-level view quotes the continuum, so it
inherits whichever naming the continuum uses. Grammar sits in "systems of
language" under both versions, so nothing is blocked — this is about labels.
**Ask:** Is the school updating the continuum to VC2? Should the hub's year
view show the continuum's current VC1 strand names as-is, or the VC2
sub-strand names? (VCAA's own mapping is in `collab/research/VC2_COMPARISON.md`.)

### Q11. Furigana policy
**Context:** Items currently use `<ruby>` furigana ad hoc and avoid off-list
kanji. A per-band rule would let content generation scale consistently.
**Ask:** State the rule you already use in class, e.g. "Band 1–2: furigana on
everything beyond X; Band 3: only beyond the Year 10 list; Band 4: only
beyond the VCE list."

---

## Decision log

*(newest first — record: date · question · Andrew's decision)*

- **2026-08-18 (Liam):** The **student-facing view is organised by year
  level**, framed by the school Learning Continuum's Japanese "I can"
  statements (see `collab/research/SCHOOL_CONTINUUM_JAPANESE.md`) — not by
  curriculum band codes. The skills-matrix view stays as the teacher/deep
  view. Rows should span levels where a Year 12 does the same kind of thing
  as a Year 9 with more sophisticated construction (the EAL-hub pattern).

- **2026-08-18 (Liam):** The app deploys to one public live URL from day one
  (`liaminhawai-cmd/japanese-hub` via GitHub Pages) so there's a
  single canonical version — see DEPLOYING.md. Consequence: everything in the
  *app* is public (original/paraphrased content only), and this dev repo goes
  fully private (Q10). This replaces former Q12 ("classroom-only or URL?").
- **2026-08-18 (Liam):** The live site is a **hub**, not one app: landing
  page at `/`, each tool in its own folder (`/grammar/` first, then
  `/oral/`, `/topics/`, `/writing/`). Named for the whole suite so later
  tools don't force a URL change.

- **2026-08 (pre-existing, inferred from the bank):** Instructional text in
  English, Japanese only in sentences/particles/cues; accept kana and kanji
  spellings in gapfill; avoid or furigana-annotate off-list kanji. Recorded
  here so it doesn't get relitigated — Andrew can amend via Q11.
- **2026-08 (from Liam):** Kana (hiragana/katakana) drilling is out of scope —
  existing apps cover it. Kanji undecided, see Q5.
