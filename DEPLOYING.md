# DEPLOYING.md — how the live site gets updated

There is exactly **one** student/classroom-facing copy of every tool, served
from the public repo `liaminhawai-cmd/japanese-hub` via GitHub Pages:

| URL | What |
|---|---|
| https://liaminhawai-cmd.github.io/japanese-hub/ | hub landing page |
| https://liaminhawai-cmd.github.io/japanese-hub/grammar/ | Japanese Grammar Hub |

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
  `tasktypes.js`, `data/skills.js`; app audio joins it when the oral module
  lands). Because it's public: no teaching materials, no textbook scans, no
  student anything, no internal links, ever. Item content itself must be
  original or paraphrased, not copied from copyrighted texts (see Q7).

## Deploy procedure (any Claude session with access to both repos)

1. In this repo, run the sanity check (SPEC §9) — `problems 0` required, and
   click through the change in a browser.
2. Bump the build tag date in `index.html` (`JGH build YYYY-MM-DD`) if this
   deploy changes anything a teacher could notice.
3. Copy `index.html`, `engine.js`, `tasktypes.js`, `data/skills.js` verbatim
   into the live repo's **`grammar/`** folder (keeping `data/skills.js`
   under it). Relative paths inside the app don't change, so no rewriting.
4. Commit there with a one-line summary + the build tag, push to `main`.
   Pages redeploys automatically within a minute or two.
5. Spot-check the live URL (hard refresh) and confirm the build tag.

Note: the live repo's `grammar/index.html` carries a favicon line the dev
copy doesn't have. Re-add it after copying, or (better) add the same line to
the dev repo's index.html so the two stop diverging.

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
