# Design philosophy for the Japanese Hub

Distilled from Liam's ELC-Pages and Bone-Sparrow repos (especially
`AGENTS.md` in ELC-Pages, `GrammarHuboffline.html`, `bonesparrowtrainer`,
`wordbuilderoffline`, and the writing wall). This is the *why* behind
DESIGN_RULES.md. Any model writing content or code for this repo reads this
once and follows it. Where a principle needs a Japanese-specific ruling,
it's tagged with the question number from `collab/QUESTIONS_FOR_ANDREW.md`.

## Core principles (Liam's constitution, adopted here)

1. **No fluff. Ever.** No streaks, points, badges, confetti, "keep going!"
   banners. If a line of text does not teach something, instruct something,
   or report a real state, delete it.
2. **Teach the rule, with the example — not the example alone.** Every item's
   `explain` names the pattern, points at the specific words, and states the
   limits. This is why the bank's explains say "Verbs ending in む・ぬ・ぶ
   become んで" rather than just "correct!".
3. **Never lock anyone out of content.** Sequence is a suggestion. Bands and
   progress ticks guide; they never gate. Every cell is always clickable.
4. **Annotate generously.** The density of a well-made PowerPoint, not a bare
   demo. A student should be able to read the screen without the teacher
   narrating.
5. **Say the honest thing.** If the computer is guessing (TTS audio, an
   auto-check that can't judge nuance), the UI says so and lets the human
   overrule. Speech is never machine-judged: the pattern is a checklist that
   ends with "Teacher heard me say it clearly" — the computer's checkbox
   stays disabled until the human steps are done. Use exactly this pattern
   for oral exam practice.
6. **Plain instructions.** Short sentences, common words, one instruction per
   line. (In this repo: English instructions, Japanese content — see SPEC §6.)
7. **No accounts, no tracking, no analytics.** localStorage only, versioned
   keys (`jgh.v1`), a try/catch loader so corrupt state can't brick the page,
   and the UI honest about what is stored where.

## Colour carries meaning, never decoration

Every colour in Liam's tools is bound to a named category that appears in a
legend: word-class colours on sentence-builder tiles, morpheme colours
(prefix/root/suffix), the analytical trio (evidence-blue, purpose-green,
ideas-orange) that runs identically through rubrics, model answers and
filters. Correctness (green/red/amber) is always a *separate* axis from
category colour, and never colour alone — always paired with ✓/✗ and text.

For Japanese, the natural category axes to colour-bind (Andrew to confirm the
set, Q3/Q5):
- **Sentence-role tiles**: topic/subject, particle, object, verb, adverbial —
  the direct analogue of the word-class sentence builder, and the foundation
  of a future `order` task type (particle ordering is Japanese's version of
  syntax drilling).
- **Kanji components**: semantic radical vs phonetic component vs the rest —
  the analogue of prefix/root/suffix, if Q5 says build it.
- Keep the current suite palette (`:root` in index.html) as the frame;
  category colours get their own tokens with a legend, dark-mode aware.

## Progression structures that work

- **One matrix, many entry points.** The two-axis grid (skill rows × band
  columns) is the whole answer to the combined 10/11/12 class: everyone
  drills from the same wall, at different columns, with no stigma because
  nothing is locked and column names are neutral (Q2).
- **Adaptive placement exists and is proven** in Bone-Sparrow's
  `GrammarHuboffline.html`: a session drills band−1 / band / band+1, then
  routes — master all three → jump two; master target only → up one; fail
  below → *drop down and strengthen*; else stay with a refresher, each with a
  plain-English message. Port this once bands are settled (Q2). It converts
  the matrix from a menu into a placement engine.
- **Ladders inside a task**: gradual release (I do → we do on rails → you do
  with support → you do), and difficulty rungs per item (recognise → fix →
  build-from-parts → produce). Rule worth keeping from the word builder: a
  word's first-ever attempt always requires building it from parts; every
  card is an active attempt, never a self-report.
- **Differentiation is structural, not labelled.** Liam's tools never say
  mild/medium/spicy; the band column, the rung, and adaptive routing do the
  work. Andrew's existing MODIFIED / INTERMEDIATE / ADVANCED reading CATs map
  onto this cleanly as bands of the same topic module.

## Feedback loops that work

- **Mastery loop with honest scoring**: everything is eventually mastered
  (wrong items come back around, and the feedback says so), but the score
  that reaches the teacher is first-try only. Never conflate the two.
- **Reteach differently, then re-test on a parallel set**: below threshold →
  a *second, different* explanation of the same rule plus a fresh item bank,
  scored separately. (bonesparrowtrainer's `reteach`/`itemsB` pattern —
  a strong candidate for VCE grammar points, and a natural big-model job:
  writing the second explanation is exactly what Andrew shouldn't have to do
  by hand.)
- **Route after the core**: clean run → extension items; misses → a
  consolidation round of only the missed items. Extension for the strong kids
  and support for the low kids inside one activity — Andrew's stated need.
- **Teacher export in three formats**: Copy teacher text (plain block with
  per-skill first-try + full item log), Copy row for sheet (TSV), Download
  CSV with sub-skill tag rows. The Japanese hub currently has only the first;
  port the rest with the engine upgrade.
- **Share-with-class links, no backend**: state base64-encoded into a URL
  (`#ex=...`), landing permanently on the student's device. This is how the
  WAGOLL wall and assignment links work with zero accounts. Use the same
  trick for assigning Japanese skill selections (`?skills=te-form-b2-core,...`).

## Task-type patterns to reuse (not reinvent)

The registry contract (render/wire/collect/check/mark) already exists here.
The proven types worth porting or adapting, roughly in order of value for
Japanese: `order` (scrambled tiles — particle/word order), `transform`
(conjugation: dictionary form → て/た/ない/stem), `match` (same sentence,
different particle → different meaning), `clickword` (click the particle/
conjugation in a sentence), tile-bank sentence builder with per-criterion
feedback, find-the-evidence in a passage (for reading-section training:
click the phrase that tells you X — Bone-Sparrow's Edward Scissorhands
FIND_TASKS pattern), and the checklist-based oral practice described above.

## Engineering conventions (copy verbatim)

Self-contained HTML, offline-first, zero dependencies, no build step. Content
in a marked data block; engine knows nothing about grammar. AU spelling in
English text. `aria-live="polite"` on feedback, visible focus, ≥40px targets,
`prefers-reduced-motion` respected, dark mode via semantic tokens only.
`meta name="google" content="notranslate"` on vocab drills (don't let a
student one-click-translate the word being recalled). Print stylesheet with
`.noprint` on controls for anything a teacher might print. A visible build
tag. Check what already exists before building — two AIs once shipped the
same tool twice in one day.
