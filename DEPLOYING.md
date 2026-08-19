# DEPLOYING.md — how the live site gets updated

There is exactly **one** student/classroom-facing copy of every tool, served
from the public repo `liaminhawai-cmd/japanese-hub` via GitHub Pages:

| URL | What |
|---|---|
| https://liaminhawai-cmd.github.io/japanese-hub/ | hub landing page |
| https://liaminhawai-cmd.github.io/japanese-hub/grammar/ | Japanese Grammar Hub |
| https://liaminhawai-cmd.github.io/japanese-hub/words/ | Word Lab (kanji families) — PoC, Q5 |
| https://liaminhawai-cmd.github.io/japanese-hub/oral/ | Oral practice player (47 questions + audio) — PoC, Q1 |
| https://liaminhawai-cmd.github.io/japanese-hub/writing/ | Writing Wall (marked-up model text) — PoC, Q9 |
| https://liaminhawai-cmd.github.io/japanese-hub/levelup/ | Level Up Wall (one task, nine rungs) — PoC, Q17 |
| https://liaminhawai-cmd.github.io/japanese-hub/unit10/ | Unit 10 hub (a whole unit end to end) — PoC, Q18 |
| https://liaminhawai-cmd.github.io/japanese-hub/kanji/ | Kanji Factory (parts light up with their role) — PoC, Q5 |

The repo is named for the whole suite, not just grammar: each new tool gets
its **own folder** (`/oral/`, `/topics/`, `/writing/`, `/kanji/`) plus a card
on the landing page. Never move a tool's folder once students have the link.

Everything else — this repo, local folders like `vce-grammar-hub-test_*`,
downloads on classroom machines — is a working copy. The build tag in the
app's bottom-left corner says which build you're looking at; if it doesn't
match the live site, it's stale. This is the answer to version confusion:
when in doubt, the URL wins.

## Split of responsibilities

- **This repo (private):** all development, all content, all teaching
  materials, all discussion. Nothing student-facing links here.
- **The live repo (public):** the running apps only — the landing page, and
  one folder per tool (`grammar/` holds `index.html`, `engine.js`,
  `tasktypes.js`, `data/skills.js`; the PoC folders `words/`, `oral/`
  (+ its `audio/`), `writing/` are each a single `index.html` copied from
  this repo's `apps/`; `levelup/` likewise). Because it's public: no
  teaching materials, no textbook scans, no
  student anything, no internal links, ever. Item content itself must be
  original or paraphrased, not copied from copyrighted texts (see Q7).

## Deploy procedure (any Claude session with access to both repos)

1. In this repo, run the sanity check (SPEC §9) — `problems 0` required, and
   click through the change in a browser.
2. Bump the build tag date in `index.html` (`JGH build YYYY-MM-DD`) if this
   deploy changes anything a teacher could notice.
3. Copy `index.html`, `engine.js`, `lever.js`, `tasktypes.js`, `data/skills.js` verbatim
   into the live repo's **`grammar/`** folder (keeping `data/skills.js`
   under it). Relative paths inside the app don't change, so no rewriting.
4. Commit there with a one-line summary + the build tag, push to `main`.
   Pages redeploys automatically within a minute or two.
5. Spot-check the live URL (hard refresh) and confirm the build tag.

PoC apps deploy the same way: copy `apps/<name>/index.html` **and its
`lever.js`** verbatim to the matching live folder (`words/`, `oral/`,
`writing/`, `levelup/`, `unit10/`, `kanji/`), and keep a copy of `lever.js` at the live root for
the landing page.

**`lever.js` is one file with several copies on purpose.** The canonical
copy is this repo's root; `apps/*/lever.js` are copies of it, so that each
app stays a folder you can delete or hand over whole. After editing the
canonical one, redistribute and check they match:

```bash
for d in apps/*/; do cp lever.js "$d"; done
md5sum lever.js apps/*/lever.js | awk '{print $1}' | sort -u | wc -l   # must print 1
```

The oral player also needs `audio/qa-01.mp3 … qa-47.mp3` copied to
`oral/audio/` once (they rarely change).

Deploy from the dev repo's default branch once work is merged; don't deploy
half-finished branches. Content-only updates (new items) are safe to deploy
any time the sanity check passes.

## One-time setup

- ✅ Public repo `liaminhawai-cmd/japanese-hub` created and the first deploy
  pushed to `main` (landing page + `grammar/`).
- ⬜ **Enable Pages** (Liam, one click): repo → Settings → Pages → Source:
  "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save. The URL
  goes live a minute later.
- ⬜ Add Andrew as a collaborator on the live repo so his side can deploy
  too (Settings → Collaborators).
