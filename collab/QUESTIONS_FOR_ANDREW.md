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
(Meanwhile a simple stand-alone player for the 47 questions is live at
https://liaminhawai-cmd.github.io/japanese-hub/oral/ — tiers, audio,
self-check boxes, deliberately no fake speech grading. If your newer build
did it differently, that build wins.)

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

### Q3. Are the 13 strands the right systems, and is the primary content usable?
**Context:** One row per grammatical system: Requests and
Politeness, Counting and Time, Sentences, Particles, Questions, Amounts
and Comparing, Verb Forms, Verb Endings, Past and If, Can and Must,
Joining Ideas, Reporting and Guessing, Analysing and Persuading.
(Script is no longer a grammar-hub row — Liam's call, "don't force
scripts onto grammar hub". Its 5 nodes/40 items are parked in
`data/script-bank.js` as the seed for a stand-alone script app.)
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
**There is now a working proof of concept to react to:**
https://liaminhawai-cmd.github.io/japanese-hub/words/ — three kanji
families (食・費・調) built from the 給食 unit's own vocabulary: meet the
family, build each word from its parts, then derive meanings. Delete-able.
**A second, deeper proof of concept is now live:**
https://liaminhawai-cmd.github.io/japanese-hub/kanji/ — the Kanji
Factory. Parts sit in a neutral bank with no colour; build a character
and they light up with the job they do IN it: blue for meaning, red for
sound, purple for both. The 門 family is the argument: 門 lights red in
問 and 聞 (it gives the reading モン/ブン) and blue in 開 (where it is
the meaning and nothing gives the sound), closing on 間 to show the
trick is a strong bet, not a law. Then you read 詩, 精 and 詠 cold.
**Also ask:** are those component splits and sound claims ones you would
teach? Is 会意兼形声 (used only for 忘) a distinction you want students
to meet, or noise at this level? And the big one: is THIS the version of
the kanji angle worth growing, or the word-level Word Lab, or neither?
**Ask:** Open the link and try one family. Does part-by-part word building
match how you'd teach kanji vocabulary, or do apps (WaniKani etc.) already
own this space? If it's worth growing: which list first — the VCE
prescribed kanji, or Obento chapter kanji by year level? Are the three
families' readings/glosses/part-glosses accurate as shipped?

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
**There is now a working proof of concept to react to:**
https://liaminhawai-cmd.github.io/japanese-hub/writing/ — one model
evaluative text (the U4O3 convenience-store piece, paraphrased) marked up
by three rhetorical moves (examples / balance / judgement), each
annotation naming the grammar that powers the move (たり〜たり, てしまう,
べきでしょう, のではなく…ことです). Delete-able.
**Ask:** Open the link. Is move-by-move markup the right way in for your
students? Which writing form first? Do you have (or can you write) 2–3
model answers per form? Teacher-written models only — no real student
work. And: is the paraphrased convenience-store text itself accurate
Japanese you'd stand behind?

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

### Q18. Unit 10 hub: is the content right, and is the shape right?
**Context:** Your Unit 10 folder has been built into a working unit hub:
https://liaminhawai-cmd.github.io/japanese-hub/unit10/ — 23 frontloaded
words, a vocabulary task per word, three grammar stages (plain form →
ことができる → 好き・とくい・下手), a job-suitability reading at three
tiers that ends by asking students to point at the sentences proving
their choice, and a first-try report. It is built FROM your materials
(the p203 verb table, your ことができる worksheets, the shape of your
reading CATs) but every sentence in it is authored fresh: the Obento page
scans are textbook images and nothing reproduces them.
**Ask:** Four things. (a) Are the 23 words the right 23, and are the
readings, groups and example sentences accurate? (b) Do the three grammar
stages match the order you actually teach them in, and is the 上手 vs
とくい note right? (c) Are the three reading profiles pitched at the right
levels, and would you accept the job each one points to? (d) **The
character builder (step 3) needs your eye most.** It breaks six kanji from
the unit's own words into their components (好 = 女 + 子, 聞 = 耳 + 門,
泳 = 氵 + 永 …) and marks each part as carrying either the MEANING or the
SOUND. Two things to rule on: are those splits and sound-part claims ones
you would teach, and are you happy with the line the app draws between a
component analysis (presented as fact) and a memory story (labelled
"memory hook, not history")? Kanji etymology is contested and the app
deliberately refuses to dress up a mnemonic as history, but you may want
to tell it different stories. Anything wrong here is a one-line fix, so
mark it up freely.

### Q11. Furigana policy
**Context:** Items currently use `<ruby>` furigana ad hoc and avoid off-list
kanji. A per-band rule would let content generation scale consistently. (The
bands are now named Sentences/Choices/Links/Paragraphs/Argument — see Q2.)
**Ask:** State the rule you already use in class, e.g. "Sentences/Choices:
furigana on everything beyond X; Links: only beyond the Year 10 list;
Paragraphs/Argument: only beyond the VCE list."

### Q17. What are the criteria for Japanese writing, in your words?
**Context:** The next writing build (J12) is a levelled WAGOLL ladder: the
same task answered at every level, each answer marked up phrase by phrase,
so a student sees the rung above theirs and exactly what changes. It needs
a criterion set — the marked-up phrase types. Liam's humanities version
uses four (origin and purpose / context / interpretations / reliability);
those don't transfer to Japanese. The VCE Japanese equivalent is probably
something like task fulfilment, structure and coherence, range of language,
accuracy, and register — but that's a guess, and guesses are exactly what
this file exists to prevent.
**There is now a working proof of concept to react to:**
https://liaminhawai-cmd.github.io/japanese-hub/levelup/ — 自己しょうかい
answered at nine rungs from Prep to Year 12, with five *proposed*
criteria: the frame (型), what you say (情報), joining ideas (つなぐ),
grammar reached for (ぶんぽう), and who you are talking to (相手).
**Ask:** Open the link and use the rung rail. Do those five name the right
things? Name the 4–6 you actually mark a piece of Japanese writing
against, in the words you'd say to a student. If you use the VCAA criteria
verbatim, say so and we'll use those; if you have a rubric sheet, drop it
in `inbox/`. Second question while you are there: are the nine model
answers accurate, and is each one pitched at the right year?

### Q16. The language lever: does any student need English that *stays*?
**Context:** The whole site is now Japanese-first. Any text can be pulled
toward English with an elastic lever (page lever and per-section levers) —
it holds where you hold it, then recoils stop by stop back to Japanese
(kanji ← kana ← romaji ← English). Pedagogically the recoil is the point:
English is scaffolding you reach for, not a mode you live in. But it means
no student can *set* the interface to English and leave it there, and a
student who genuinely needs sustained English support (learning-support
adjustment, new arrival, low vision + screen reader) has to keep pulling.
Hover always shows English, and the lever is keyboard-accessible, but
that's not the same as a persistent setting.
**Ask:** Do you teach anyone for whom the recoil is a genuine barrier
rather than healthy friction? If yes, we'll add a quiet "hold at English"
teacher setting; if no, we keep the mechanic pure.

---

## Decision log

*(newest first — record: date · question · Andrew's decision)*

- **2026-08-18 (Liam):** **Units get their own hub, and the tools join
  up.** Unit 10 is built end to end at `/unit10/` as the proof: a unit
  frontloads its vocabulary in the schema the future site-wide vocabulary
  hub will read (so units feed the bank rather than siloing words), and
  its grammar stages deep-link into the Grammar Hub step that owns each
  skill rather than duplicating it. Liam's brief: "give a proof of concept
  of how it will kinda connect and the report function and everything."
  Two rules of this repo overrode the Bone Sparrow original it was ported
  from: no step is locked, and the report takes an optional first name
  only, never a student ID.

- **2026-08-18 (Liam):** **Grammar hub is grammar only.** "Don't force
  scripts onto grammar hub — a word builder can be its own app." The Script
  strand's 5 nodes/40 items are parked in `data/script-bank.js` (not loaded
  by the app) as the seed bank for a future stand-alone script/word app.
  Final strand count: **13**. The live landing page gains sections beyond
  grammar (words and vocab, speaking and listening, writing).

- **2026-08-18 (Liam):** Every idea ships as a **small stand-alone proof of
  concept for Andrew to review, not a feature bolted into the hub**: "make
  demo proof of concept... andrew can delete if he doesn't like." Shipped:
  `/words/` word-lab (kanji families 食・費・調 from the 給食 unit — Q5),
  `/oral/` player for the 47 oral questions (Q1), `/writing/` writing wall
  (one marked-up model text — Q9). Each is one self-contained HTML file
  under `apps/` in this repo; deleting one deletes cleanly.

- **2026-08-18 (Liam):** The language toggle is an **elastic lever**, not a
  cycler chip (supersedes the earlier chrome decision below): a page lever
  and small section levers pull through kanji → +kana → +romaji → English;
  the handle **stays where it's held** ("that's important"), and on release
  recoils stop by stop — ~1 s per stop for the page, ~1.7 s per stop
  (readable) for sections. Applies to *everything* on the page: menus,
  strand names, chunk titles, legends, counts. Keyboard: arrows step,
  End = full English, Home/Escape = release. Google Translate is hard
  blocked (`translate="no"` + `notranslate` — it would silently destroy
  the mechanic). Accessibility caveat recorded as Q16 (sustained-English
  learners).

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
