# CLAUDE.md — read me first

This repo is a **Japanese grammar/skills hub** for a 7–12 Japanese teacher
(Andrew), forked from Liam's ELC Grammar Hub and being built collaboratively:
Andrew supplies Japanese pedagogy and decisions; Liam supplies pedagogy
mechanics and heavy model capacity; assistants on both sides do the work.
The repo itself is the only shared channel — decisions, jobs, and files all
live here.

## Orientation reading, in order

1. `SPEC.md` — the app's architecture and schemas (reconstructed, accurate).
2. `DESIGN_RULES.md` — lane rules, tokens, hard constraints. Not suggestions.
3. `collab/DESIGN_PHILOSOPHY.md` — the *why*: no fluff, teach-the-rule,
   never lock content, colour carries meaning, honest UI.
4. `collab/PROPOSAL.md` — the plan and the layers.

## Which side are you on?

Work out from your user whether you are **Andrew's assistant** or **Liam's
Claude** (ask if unclear — they have different jobs):

### If you are Andrew's assistant
- Your user is the **subject-matter authority**, not a coder. Never make him
  touch git internals or JS; he uploads files and answers questions.
- **Interview him** from `collab/QUESTIONS_FOR_ANDREW.md`: one or two
  questions per sitting, with their context lines, in plain terms. Record
  answers in that file's Decision Log (dated, faithful to what he said), and
  update any job in `collab/JOBS_FOR_LIAM.md` the answer unblocks.
- **File uploads**: when files appear in `inbox/`, check them against the
  scrub checklist in `collab/UPLOAD_GUIDE.md` (if something looks like
  student work or has names in it, tell Andrew and leave it out), then move
  them to a sensible folder and note anything that answers an open question.
- **Do small work yourself, route big work to Liam.** You do: content-lane
  edits to `data/skills.js` (≤~30 items, existing schema), typo fixes, doc
  updates — always running the sanity check in SPEC §9 before committing.
  You route to `collab/JOBS_FOR_LIAM.md` (using its template): anything
  touching engine.js/tasktypes.js/index.html, new task types or modules,
  big content batches, multi-file work. Liam has Fable/Opus-class capacity
  for a limited window — queue ambitious jobs freely, but each job entry must
  name the decisions it depends on.
- **Never guess Japanese-curriculum answers.** If a task needs one, that's a
  question for the questions file, not an assumption.
- When Andrew wants "something like Liam's X": Liam's reference apps live in
  his ELC-Pages and Bone-Sparrow repos; describe the desired behaviour in the
  job spec rather than reinventing it — Liam's Claude can read the originals.

### If you are Liam's Claude
- Pull `collab/JOBS_FOR_LIAM.md` top-down; skip NEEDS-INFO jobs; mark claims
  and completions in the file; append questions to
  `collab/QUESTIONS_FOR_ANDREW.md` instead of guessing curriculum answers.
- Reference implementations for ports (advanced engine, task types, WAGOLL
  wall, find-the-evidence, word builder) are in Liam's Bone-Sparrow
  (`GrammarHuboffline.html`, `bonesparrowtrainer`, `wordbuilderoffline`,
  sentence builder) and ELC-Pages (writing wall, pronunciation hub,
  limericks workshop, `AGENTS.md`).

## Hard rules for every model in this repo

- **Lane rule** (DESIGN_RULES.md §0): one commit, one lane. Content commits
  touch `data/skills.js` only.
- **Sanity check before any content commit** (SPEC §9): must print
  `problems 0`. Also: never two skill nodes with the same category+band.
- **Privacy**: no student names, no student work, no class lists, no keys.
  If you find any (there are two known student-scan PDFs pending removal —
  Q10), flag it; don't spread it into new files. Don't add school-internal
  URLs.
- **Model identity**: no model names in commits, code comments, or content.
- **Japanese content conventions** (SPEC §6): instructions in English,
  Japanese only in sentences/particles/cues; kana+kanji accept lists;
  furigana/avoidance for off-list kanji; AU spelling; no em dashes in
  learner-facing text.
- **No new dependencies, no build step, no accounts, no analytics.**
  localStorage only, and only in deployed builds.
- Update `SPEC.md` in the same commit as any schema/interface/token change.
- **One live version.** The app deploys to a single public URL (see
  `DEPLOYING.md`); the live repo gets whole-file copies only, and nothing
  non-app ever goes there. Don't hand out copies of index.html — hand out
  the URL.
