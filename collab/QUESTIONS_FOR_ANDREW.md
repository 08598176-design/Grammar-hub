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

### Q2. Does the Prep-to-12 year timeline look right?
**Context:** The app is **live** — https://liaminhawai-cmd.github.io/japanese-hub/grammar/
— and has moved twice since this question was first written; ignore older
descriptions. It is now a **year timeline**: Prep to Year 12 across the top,
13 strand rows (one per grammatical system), each block a teaching step
placed on the years it is usually taught, VIC and VCE marked by the two
bars on the axis. Built ahead of your answer on Liam's call — see the
Decision Log.
**Ask:** Open the link. Are the year placements roughly right for how your
program actually runs? Do your students start Japanese in Year 7 rather
than primary (if so, VCAA's separate 7–10 Sequence, not the F–10 one, is
the governing document and the placements shift — we don't have that file)?
May the word "VCE" stay visible on a student's screen?

### Q3. Are the 14 strands the right systems, and is the primary content usable?
**Context:** One row per grammatical system: Script, Requests and
Politeness, Counting and Time, Sentences, Particles, Questions, Amounts
and Comparing, Verb Forms, Verb Endings, Past and If, Can and Must,
Joining Ideas, Reporting and Guessing, Analysing and Persuading.
Two design calls to check: (a) Requests and Politeness is the
directive/register ladder — greetings (F–2) → 〜てください as a set
phrase (3–4) → introductions (5–6) → てもいい・てはいけない (8), with the
て-form itself analysed in Verb Forms at 7–8 and the tooltip naming the
formulaic-to-analytic link. (b) Counting and Time treats counters and
temporal expressions as one classifier/temporal system. Three
tag-alongs also need your eye: とき sits in Reporting and Guessing,
というNoun in Past and If, の・こと nominalising in Can and Must. The
Prep–Year 8 cells (108 items: script, greetings, これはXです, numbers,
counters) are proposed content — only the Script strand's sequence is
directly curriculum-backed, and every item there needs your accuracy
check before a class sees it.
**Ask:** Would you merge, split, rename or re-order any strand? Are the
primary items accurate and pitched right? Which strand would you extend
first — where do your Year 10s actually bleed marks when they hit VCE?

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
kanji. A per-band rule would let content generation scale consistently. (The
bands are now named Sentences/Choices/Links/Paragraphs/Argument — see Q2.)
**Ask:** State the rule you already use in class, e.g. "Sentences/Choices:
furigana on everything beyond X; Links: only beyond the Year 10 list;
Paragraphs/Argument: only beyond the VCE list."

---

## Decision log

*(newest first — record: date · question · Andrew's decision)*

- **2026-08-18 (Liam):** "Everyday Language is not a grammar category" —
  dissolved into **Counting and Time** (numeral classifiers + temporal
  system) and **Requests and Politeness** (directives/register, absorbing
  てもいい・てはいけない from Verb Forms). Every strand is now a grammatical
  system; chunks may carry cross-strand `needs` links shown in tooltips
  ("where a skill builds naturally we should show that"). 14 strands.

- **2026-08-18 (Liam):** Strands consolidated to **13 grammatical systems**
  (one row per system, the English hub's Tenses/Modality/Questions logic):
  Script, Everyday Language, Sentences, Particles, Questions, Comparing,
  Verb Forms, Verb Endings, Past and If, Can and Must, Joining Ideas,
  Reporting and Guessing, Analysing and Persuading. Three node-granularity
  tag-alongs need Andrew's eye when he reviews Q3: とき sits in Reporting
  and Guessing, というNoun in Past and If, and の・こと nominalising in Can
  and Must.
- **2026-08-18 (Liam):** The site chrome is **Japanese-first** with a
  four-form cycle: kanji, then hiragana, then romaji, then English — a
  global cycler chip, plus per-label tap on static text. English is always
  one hover away. Item content (the 400 prompts/options/explanations) stays
  English for now; converting it is queued as J11 and needs Andrew's ruling
  on wording and on romaji's place in the chain.

- **2026-08-18 (Liam):** Build-then-ratify, not ratify-then-build, for the
  Prep-12 band ladder (Q2/Q3): "don't be shy about live pushing stuff cos we
  aren't showing kids yet." So the ladder, the row placements and the two new
  finite-forms rows are live at the URL in Q2 as a concrete proposal Andrew
  can react to directly, rather than an abstract question waiting on him
  first. Nothing here overrides his answers when he gives them — see J3 in
  JOBS_FOR_LIAM.md for exactly what shipped and why each placement was made.

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
