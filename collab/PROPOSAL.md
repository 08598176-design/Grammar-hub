# Proposal: the Japanese Hub — where it is, where it could go

*Written Aug 2026 by Liam's Claude after surveying this repo, ELC-Pages and
Bone-Sparrow. For Andrew (decisions) and both assistants (context). Nothing
here is a commitment — it's the menu. Andrew rules on everything
Japanese-pedagogical; Liam on pedagogy-mechanics; the models build.*

## 1. Where you actually are (better than you think)

The forked app is not a struggling prototype. As committed it is a **working
VCE Japanese grammar hub**: 19 skill nodes across a 16-row × 4-band matrix
plus two pools, **246 items that all pass the automated sanity check**, clean
adherence to the "English instructions, Japanese content" rule, kana+kanji
accept lists, furigana where kanji is off-list, and a mastery loop with
first-try reporting. That is a real tool a class could use tomorrow.

What's actually missing is not competence — it's **structure around the
work**: a spec (the original didn't survive the fork — now reconstructed in
`SPEC.md`), a way to route big jobs to big models, a decision log, and a plan
for the layers beyond grammar drills. That's what the `collab/` folder now
provides.

Loose ends found in the survey:
- 47 oral-exam MP3s + generator script are in the repo but **nothing plays
  them** — the section that uses them appears to live only in a newer build
  on Andrew's machine (Q1 — highest-priority question).
- Two PDFs contain **scanned student work** and should come out (Q10).
- README described the ELC hub, not this one (now rewritten).

## 2. The one-sentence vision

**One skill matrix from beginner to VCE 3&4, so the combined 10/11/12 class
drills from the same wall at different columns — wrapped by topic modules
that frontload vocab, tier the reading, and scaffold the writing.**

The combined-class problem (two curricula, hard to link) is the design
driver, not an inconvenience: the F–10 sequence and the VCE study design
become two *labels on the same columns* (Q2), and Bone-Sparrow's proven
adaptive placement (drill band−1/band/band+1, then route up/down with a
plain-English message) turns the matrix into the differentiation engine.
Extension for the strong, foundations for the low, one room, one tool.

## 3. The layers (build order follows Andrew's pain ranking, Q8)

1. **Grammar drill layer** — exists. Grows by: extending rows down the bands
   (Q2/Q3), porting `order` (particle/word-order tiles) and `transform`
   (conjugation) task types which fit Japanese better than MCQ+gapfill alone,
   sub-skill tags so reports say *which* verb family failed, and richer
   teacher exports. → Jobs J2, J3.
2. **Oral/listening layer** — the audio is already made. Tiered Q&A practice
   with the human-in-the-loop checklist pattern (the computer never judges
   speech; "Teacher heard me say it clearly" is the top rung). → Job J1.
3. **Topic modules** — the Unit 10 folder digitised as a template: vocab
   frontloading drills (spaced repetition lives here), tiered quick-reads
   (click-the-evidence, from Bone-Sparrow's FIND_TASKS pattern), topic-tagged
   grammar. Then stamp the template for whatever Andrew teaches next, so it
   gets field-tested immediately. → Job J4.
4. **Writing layer** — WAGOLL wall for VCE writing forms: teacher-marked
   model answers, colour-bound features, share-by-link, assemble-your-own.
   → Job J6.
5. **Kanji workbench (maybe)** — morpheme matrices ported to kanji component
   families. Kana is out (apps own it — agreed); kanji *might* be worth one
   prototype because it can bind to Andrew's exact prescribed lists, which
   generic apps don't. Andrew decides after seeing a one-family prototype.
   → Job J5, gated on Q5.

Spaced repetition vs integrated tasks (Liam's lens): drills and vocab are the
spaced layer; quick-reads, sentence building and WAGOLL assembly are the
integrated layer. The report's "Practise next" hook already joins them —
when topic modules exist, weak drill results link straight to the relevant
integrated task.

## 4. How the collaboration runs

- **Andrew** answers questions (conversationally, via his assistant), scrubs
  and drops files into `inbox/`, and field-tests builds with real classes.
  He never needs to touch code or git beyond uploading.
- **Andrew's assistant** interviews from `QUESTIONS_FOR_ANDREW.md`, keeps the
  Decision Log, files inbox uploads, does small content-lane edits (with the
  sanity check), and writes job specs into `JOBS_FOR_LIAM.md` for anything
  big. It never guesses Japanese-curriculum answers and never touches the
  engine.
- **Liam's Claude** (heavy models, ~a month of capacity) pulls the queue
  top-down, builds, and pushes. It adds questions rather than guessing.
- **The repo is the only channel.** Decisions live in the decision log, work
  lives in the queue, files arrive via inbox. No side-channel state.

## 5. Right now / next fortnight / this term

**Already done (this branch):** SPEC reconstructed; collab workflow docs;
README rewritten; CLAUDE.md so any Claude session self-orients.

**Next fortnight (mostly Andrew-independent):** J2 stage 1 (exports + order/
transform task types) can run on Liam's capacity immediately. J1 runs the
moment Q1 is answered — possibly zero build needed if the newer local build
has the section. Andrew answers Q1, Q2, Q8, Q10 and uploads P1 items from
`UPLOAD_GUIDE.md`.

**This term:** band restructure (J3), first topic module for whatever Andrew
teaches next (J4), then kanji prototype and WAGOLL wall behind their
decisions. Liam's heavy capacity lasts about a month — the jobs that *need*
big models (engine port, topic-module template, content batches at scale)
should land in that window; content top-ups can happen on smaller models
after.

## 6. Privacy stance (short version)

Private repo, scrub-before-upload (Andrew's own hands, per his preference,
checklist in `UPLOAD_GUIDE.md`), no student work ever, textbook scans never
in anything deployed, and a one-time history purge of the two student-scan
PDFs once Andrew gives the word (J7/Q10).
