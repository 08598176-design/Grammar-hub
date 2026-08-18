# DEPLOYING.md — how the live site gets updated

There is exactly **one** student/classroom-facing copy of the app:

**https://liaminhawai-cmd.github.io/japanese-grammar-hub/**
(repo: `liaminhawai-cmd/japanese-grammar-hub`, public, GitHub Pages)

Everything else — this repo, local folders like `vce-grammar-hub-test_*`,
downloads on classroom machines — is a working copy. The build tag in the
app's bottom-left corner says which build you're looking at; if it doesn't
match the live site, it's stale. This is the answer to version confusion:
when in doubt, the URL wins.

## Split of responsibilities

- **This repo (private):** all development, all content, all teaching
  materials, all discussion. Nothing student-facing links here.
- **The live repo (public):** the running app only — `index.html`,
  `engine.js`, `tasktypes.js`, `data/skills.js` (plus app audio once the
  oral module lands). Because it's public: no teaching materials, no
  textbook scans, no student anything, no internal links, ever. Item
  content itself must be original or paraphrased, not copied from
  copyrighted texts (see Q7).

## Deploy procedure (any Claude session with access to both repos)

1. In this repo, run the sanity check (SPEC §9) — `problems 0` required.
2. Bump the build tag date in `index.html` (`JGH build YYYY-MM-DD`) if this
   deploy changes anything a teacher could notice.
3. Copy `index.html`, `engine.js`, `tasktypes.js`, `data/skills.js` verbatim
   into the live repo (preserving the `data/` path).
4. Commit there with a one-line summary + the build tag, push to `main`.
   Pages redeploys automatically within a minute or two.
5. Spot-check the live URL (hard refresh) and confirm the build tag.

Deploy from the dev repo's default branch once work is merged; don't deploy
half-finished branches. Content-only updates (new items) are safe to deploy
any time the sanity check passes.

## One-time setup still pending

- Liam creates the public repo `japanese-grammar-hub` on GitHub (the app
  integration can't create repos) and enables Pages:
  Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, `/ (root)` → Save.
- First push is already prepared and lands the moment the repo exists.
- Andrew should be added as a collaborator on the live repo so his side can
  deploy too (repo Settings → Collaborators).
