# Japanese Grammar Hub

A practice hub for secondary Japanese (Years 7–12 / VCE), forked from the ELC
Grammar Hub and being rebuilt around Japanese content. Students pick cells
from a skills × bands matrix, drill them in a mastery loop (missed items come
back until correct), and get a first-try report with a copy-to-teacher
export. Plain HTML + JS: no server, no accounts, no dependencies — open
`index.html` by double-clicking it.

**Status:** working app with 246 validated items across 19 skills (mostly
VCE-band grammar: particles, て-form, plain form, ない-form, nominalisers,
analytical expressions) plus reading and topic-vocab pools. Being extended
down the year levels and out into oral, topic, writing and (maybe) kanji
layers — see `collab/PROPOSAL.md`.

## If you're a model working in this repo

Read `CLAUDE.md` first. It routes you to everything else and tells you which
role you're playing.

## If you're Andrew

- New files go in `inbox/` (see its README — includes the privacy checklist).
- Your assistant will work through `collab/QUESTIONS_FOR_ANDREW.md` with you
  in normal conversation; your answers drive the build queue.
- The plan is `collab/PROPOSAL.md`.

## Repo map

```
index.html          the app (markup + styling + design tokens)
data/skills.js      ALL content: skills, bands, categories, pools, items
tasktypes.js        task-type registry (identify, gapfill; more coming)
engine.js           matrix, mastery loop, scoring, report — content-agnostic
SPEC.md             architecture + schemas. Read before touching code.
DESIGN_RULES.md     lane rules, colour tokens, hard constraints
CLAUDE.md           orientation + roles for AI assistants
collab/             how this project runs:
  PROPOSAL.md         the plan and build layers
  DESIGN_PHILOSOPHY.md  the design principles (from the ELC/Bone-Sparrow tools)
  QUESTIONS_FOR_ANDREW.md  open questions + decision log
  JOBS_FOR_LIAM.md    the build queue for heavy-model work
  UPLOAD_GUIDE.md     what to upload and how to scrub it
inbox/              drop box for new files (assistants file them)
audio/              oral exam Q&A mp3s (qa-01..47) — not yet wired into the app
Unit 10 .../        a tiered Year 9–10 topic unit (source material for topic modules)
(everything else)   teaching materials inherited from the fork or uploaded since;
                    a tidy-up is queued as job J8
```

## Adding content (no code needed)

1. Open `data/skills.js`, find the skill node (e.g. `te-form-b2-core`).
2. Add items to its `items:[]` array using the shapes in `SPEC.md` §6
   (identify, gapfill, transform, order).
3. Run the sanity check (`SPEC.md` §9) — it must print `problems 0`.
4. Reload `index.html` and click through your new items before committing.

## Adding a task type or touching the engine

That's a `collab/JOBS_FOR_LIAM.md` job unless you know exactly what you're
doing — and either way, the lane rules in `DESIGN_RULES.md` §0 apply.
