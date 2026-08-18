# REFERENCE_PATTERNS.md

Patterns to port into the Japanese hub, read out of Liam's two reference repos.
Every line number below is a real citation you can open. Code sketches are
adapted for `data/skills.js` / `engine.js` / `tasktypes.js` as they stand
(SPEC.md §2), not copied verbatim.

Sources read:

- `/home/user/Bone-Sparrow/GrammarHuboffline.html` (5109 lines, single file:
  content + task types + engine + CSS all inline)
- `/home/user/ELC-Pages/` — `AGENTS.md`, `index.html`, `writing-wall.html`,
  `pronunciation-core.html`, `feeling-wheel.html`, `ballads.html`

Conventions in this file: **PORT** = take it as-is; **ADAPT** = the shape is
right but a Japanese-specific decision is needed (those are collected in
§7 Open questions); **DO NOT PORT** = present in the reference but wrong here.

---

# PART A — GrammarHuboffline.html

## A0. Where things live in the reference file

| Region | Lines | What |
|---|---|---|
| CSS tokens, matrix + cascade states | 55–99 | `.matrix-cell` states, `.vic-*` timeline |
| Report rubric CSS | 352–375 | `.rpt-*` states + reveal animation |
| Translate bar CSS | 382–430 | `.tbar`, `body.tr-on/.tr-word/.tr-block` |
| Print stylesheet | 445–451 | 7 lines total |
| Markup: all six screens | 463–615 | select / preteach / placement / task / report / progress |
| Content bank (SKILLS) | ~630–1921 | skills + glossary |
| `VIC_CHUNKS`, `VIC_MAP` | 1925–2240 | the two curriculum overlays |
| Task types | 2241–2860 | identify, gapfill, transform, order, choose, edit, produce |
| Engine state + select screen | 2860–3310 | matrix, timeline, toggles |
| Session + preteach | 3313–3800 | teaching cycle |
| Placement (routing) | 4020–4180 | the four outcomes |
| Report + rubric + exports | 4179–4500 | `cellStatusFor`, CSV/TSV |
| Persistence + smart review | 4384–4470 | `STORE_KEY`, `skillWeakness()` |
| Glossary auto-link | 4566–4600 | click-a-term popover |
| Translate engine | 4604–4886 | tap-to-translate |
| Progress screen | 4887–4970 | report-anytime + print |

---

## A1. THE YEAR-LEVEL TIMELINE / SEQUENCE VIEW (the key pattern)

### A1.1 The architectural idea, stated plainly

The app has **one** pedagogical spine: `window.CATEGORIES` (strands) ×
`window.BANDS` (levels). That spine never moves. A *curriculum view* is a
**relabelling and re-layout of the same cells** — it changes what the student
reads and how the cells are positioned, and changes nothing about what gets
drilled, scored, or reported.

The reference states this in three places, and it is worth quoting because it
is the design decision, not an implementation detail (lines 1938–1943):

> PRINCIPLE: the app's own sequence is the pedagogical spine, justified by
> grammar acquisition research. VC codes are best-fit labels for reporting;
> they never reshape the sequence, and a label is dropped or marked approx
> before it is allowed to hurt pedagogy or clarity.

And (lines 1929–1936):

> The two schemes chunk grammar differently and are deliberately NOT aligned
> … So a C1 cell may carry a Level 4 code and three cells may share one code.
> **That is honest, not a bug.**

And the mechanical guarantee (lines 3010–3013):

> The non-EAL view drives the SAME selection state as the EAL grid
> (`rowLevel`/`drillTarget`), so review/stretch, placement and report logic
> are identical in both views **by construction**.

That last sentence is the whole trick. There is no second engine. The timeline
view writes into the identical two state variables the matrix view writes into.

### A1.2 `window.VIC_CHUNKS` — the data shape (line 1969)

```js
window.VIC_CHUNKS = {
  "Sentence Structure": [                       // key = a CATEGORIES entry
    { title:"Simple sentences",                 // student-facing chunk name
      y0:0, y1:1,                               // year span, integer indices on a shared axis
      years:"F–1",                              // the printed label for that span
      codes:["VC2EFLA06","VC2E1LA06"],          // NEVER RENDERED — documentation only
      covers:["sentence-c1"] },                 // skill ids this chunk contains
    { title:"Compound sentences", y0:2, y1:3, years:"2–3", codes:["VC2E2LA06"], covers:["sentence-c2"] },
    ...
  ],
  "Verb Tenses": [ ... ],
};
```

Key properties, each of which is deliberate:

1. **One chunk per teaching step, not one chunk per band.** A strand can have
   4 chunks or 3 (`"Passive Voice"` has 3, line 1994; `"Relative Clauses"` has
   3, line 1999). Chunks are not columns.
2. **`covers` is an array**, so one chunk may bundle several cells. The UI
   prints `"N steps inside"` when it does (line 3094).
3. **`y0`/`y1` are integers on a shared axis** (0 = Foundation … 10 = Year 10)
   and `years` is the human string. They are separate fields because the
   integers drive CSS grid placement and the string is what the student reads.
   Don't derive one from the other.
4. **`codes` never reach the DOM.** Grep the render function: `ch.codes` is
   never referenced. The comment at 1965–1967 makes this a rule:
   *"No curriculum codes are shown in the student UI (either view). The `codes`
   arrays are the documentation/reporting record."*
5. `VIC_MAP` (line 2018) is a **separate, per-skill-id** map of
   `{ code, label, approx? }` for reporting/sign-off. `approx:true` marks a
   judgement call where the curriculum has no explicit description. In this
   build `VIC_MAP` is data only — no code path reads it. It exists so a
   rationale table can be generated for teacher sign-off.

### A1.3 The timeline renderer — `buildVicMatrix(wrap)` (lines 3026–3102)

This is the piece to port most carefully. Two ideas: a **shared year axis as a
CSS grid**, and **lane packing** so overlapping chunks stack instead of
colliding.

```js
function buildVicMatrix(wrap) {
  const YEAR_TICKS = ["F","1","2","3","4","5","6","7","8","9","10"];   // 11 columns

  // header row: an empty strand-label cell, then one tick per year
  const head = document.createElement("div");
  head.className = "vic-row vic-yearhead";
  head.innerHTML = `<div class="matrix-cell rowlabel"></div>` +
    YEAR_TICKS.map(y => `<div class="vic-tick">${y}</div>`).join("");
  wrap.appendChild(head);

  window.CATEGORIES.forEach((cat) => {
    const chunks = vicChunkList(cat);
    if (!chunks.length) return;                       // strand with no chunks is skipped
    const row = document.createElement("div");
    row.className = "vic-row";

    // ---- LANE PACKING ----
    // Chunks whose year spans overlap stack in extra lanes under the same
    // strand label instead of wrapping into orphan grid rows.
    const laneOf = {}, laneEnd = [];
    chunks.map((ch, i) => i)
      .sort((a, b) => (chunks[a].y0 || 0) - (chunks[b].y0 || 0))   // earliest first
      .forEach((i) => {
        const y0 = chunks[i].y0 != null ? chunks[i].y0 : 0;
        const y1 = chunks[i].y1 != null ? chunks[i].y1 : 10;
        let l = 0;
        while (l < laneEnd.length && y0 <= laneEnd[l]) l++;        // first lane that's free
        laneOf[i] = l;
        laneEnd[l] = y1;
      });

    // strand label spans every lane
    const label = document.createElement("div");
    label.className = "matrix-cell rowlabel";
    label.textContent = cat;
    label.style.gridRow = "1 / span " + (laneEnd.length || 1);
    row.appendChild(label);

    chunks.forEach((ch, idx) => {
      const skills = chunkSkills(ch);                              // resolve covers -> skill objects
      const n = skills.reduce((t, s) => t + s.items.length, 0);    // question count
      const bi = chunkBandIndex(ch);                               // band index of first covered cell
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "matrix-cell vic-chunk" + (n ? " has-items" : " no-items");

      /* ... selection semantics, identical to the grid — see A1.4 ... */

      // year F is grid column 2 (column 1 is the strand label)
      const y0 = ch.y0 != null ? ch.y0 : 0, y1 = ch.y1 != null ? ch.y1 : 10;
      cell.style.gridColumn = (y0 + 2) + " / " + (y1 + 3);
      cell.style.gridRow    = String(laneOf[idx] + 1);

      cell.innerHTML =
        `<span class="vic-years">Years ${escapeHtmlE(ch.years)}</span>` +
        `<span class="cell-name">${escapeHtmlE(ch.title)}</span>` +
        (skills.length > 1 ? `<span class="vic-covers">${skills.length} steps inside</span>` : "") +
        (tag || `<span class="cell-count">${n}</span>`);
      row.appendChild(cell);
    });
    wrap.appendChild(row);
  });

  $("matrixLegend").innerHTML =
    `Topics sit where they usually appear in mainstream English, Foundation to Year 10 — ` +
    `work left to right. The practice sequence is the same as the EAL view underneath.`;
}
```

The grid maths, restated so it can't be got wrong on the port:

- 12 columns: `grid-template-columns: 128px repeat(11, 1fr)` (CSS line 89).
- Column 1 = strand label. Year `y` = column `y + 2`.
- A chunk spanning years `y0..y1` inclusive gets
  `grid-column: (y0+2) / (y1+3)` — the end value is exclusive, hence `+3`.
- Lane index → `grid-row`, 1-based.

CSS to port (lines 86–99), verbatim shape:

```css
/* non-EAL (year-level) view: a timeline — a shared F–10 year axis; each
   chunk is a bar spanning its years, so strands read left to right.
   No band columns, no curriculum codes on screen. */
.vic-row{display:grid;grid-template-columns:128px repeat(11,1fr);gap:4px;min-width:680px;margin-bottom:4px}
.vic-row .rowlabel{grid-column:1}
.vic-yearhead .rowlabel{background:transparent;border:none}
.vic-tick{text-align:center;font-size:10px;font-weight:800;color:var(--muted);align-self:end;padding-bottom:2px}
.vic-chunk{font:inherit;color:inherit;text-align:left;cursor:pointer;align-items:flex-start;min-width:0}
.vic-chunk:hover{border-color:var(--accent)}
.vic-chunk .cell-name{overflow-wrap:break-word}
.vic-years{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.3px;color:var(--accent);white-space:nowrap}
.vic-covers{font-size:10px;color:var(--muted)}
```

Note `min-width:680px` on `.vic-row`: the timeline is horizontally scrollable
on a phone rather than reflowed. The reference also widens the body on the
select screen only — `document.body.classList.toggle("wide", name === "select")`
(line 2931).

### A1.4 How the two views stay identical — the three bridge functions

```js
function vicChunkList(cat) { return (window.VIC_CHUNKS && window.VIC_CHUNKS[cat]) || []; }

// resolve covers[] to real, drillable skill objects
function chunkSkills(ch) {
  return ch.covers.map(skillById).filter(s => s && s.introduced && s.items.length);
}

// the band index a chunk sits at — the FIRST covered cell decides
function chunkBandIndex(ch) {
  const sk = chunkSkills(ch)[0];
  return sk ? window.BANDS.indexOf(sk.band) : -1;
}
```

Then the click handlers are *literally the same calls* as the grid's:

```js
if (mode === "teaching") {
  const isDT  = drillTarget && drillTarget.category === cat && bi === drillTarget.bandIndex;
  const isInc = drillTarget && drillTarget.category === cat && n &&
                (bi === drillTarget.bandIndex - 1 || bi === drillTarget.bandIndex + 1);
  if (isDT)       { cell.classList.add("target"); tag = `<span class="drill-tag">teach ▸</span>`; }
  else if (isInc) { cell.classList.add("below");  tag = `<span class="drill-tag">included</span>`; }
  if (n && bi >= 0) cell.addEventListener("click", () => setDrillTarget(cat, bi));
} else {
  const lvl = rowLevel[cat];
  const isSel    = bi === lvl;
  const isReview = lvl !== undefined && bi === lvl - 1 && !!drillableAt(cat, lvl - 1);
  if (isSel)         { cell.classList.add("target"); tag = `<span class="drill-tag">practise ▸</span>`; }
  else if (isReview) { cell.classList.add("below");  tag = `<span class="drill-tag">review</span>`; }
  if (n && bi >= 0) cell.addEventListener("click", () => setLevel(cat, bi));
}
```

`setDrillTarget` / `setLevel` are the grid's own setters (lines 2972–2985).
Nothing else in the app knows which view is on screen.

### A1.5 Keeping curriculum codes off the student's screen

Three independent mechanisms, all of which should be ported:

1. **Codes live in a field the renderer never touches.** `ch.codes` and the
   whole of `VIC_MAP` are unreferenced by any DOM path.
2. **Band labels are indirected through one function** (lines 3018–3024):

```js
// Student-facing band label: EAL students know the C bands; non-EAL
// students see neutral step numbers. Teacher exports always keep C bands.
function bandLabel(i) { return curriculum === "vic" ? "Step " + (i + 1) : window.BANDS[i]; }
function skillBandLabel(bandName) {
  const i = window.BANDS.indexOf(bandName);
  return i < 0 ? bandName : bandLabel(i);      // pools have band "Pool" — pass through
}
```

   Every student-facing band string goes through `bandLabel`/`skillBandLabel`
   (report rubric header line 4324, placement header 4130, skill rows 4113,
   progress table 4929). **The CSV/TSV teacher exports deliberately do not** —
   `buildCsv` (line 4477) writes `s.band`, the raw canonical band. That split
   is the point: the student sees the audience label, the teacher's spreadsheet
   keeps the canonical one so columns stay stable across views.
3. **The toggle is a relabel, never a re-mechanic** (lines 3270–3288):

```js
function buildCurricToggle() {
  const wrap = $("curricToggle");
  wrap.innerHTML =
    `<button class="filter-btn${curriculum === "eal" ? " active" : ""}" data-c="eal">EAL · C levels</button>` +
    `<button class="filter-btn${curriculum === "vic" ? " active" : ""}" data-c="vic">Non-EAL · year levels</button>`;
  wrap.querySelectorAll(".filter-btn").forEach(b => {
    b.addEventListener("click", () => {
      curriculum = b.dataset.c;
      buildCurricToggle();
      buildMatrix();        // re-render the grid for the audience; persist() runs inside
      updateToolbar();
      updateTranslateBar();
    });
  });
}
```

   `buildMatrix()` branches at the top and returns early (line 3107), so the
   two renderers are siblings, not nested special cases:

```js
function buildMatrix() {
  const wrap = $("matrix");
  wrap.innerHTML = "";
  if (curriculum === "vic") {          // non-EAL student view: year-level chunks
    buildVicMatrix(wrap);
    buildPools(); refreshCount(); refreshReviewBtn(); persist();
    return;
  }
  /* ... the band grid ... */
}
```

Note `updateToolbar()` also swaps the help text per view (lines 3292–3300), so
the instructions match the metaphor on screen ("work left to right" vs "click
the cell").

### A1.6 The validation rule — HONEST STATUS

The rule is stated at lines 1961–1963:

> RULE (checked by validate.js): within a strand, the year axis must never
> contradict the teaching order.

**`validate.js` does not exist in the Bone-Sparrow repo.** I checked: no file
matching `validate*`, no `.js` files at all, and the string `validate` appears
in `GrammarHuboffline.html` exactly once — inside that comment. So the rule is
**declared but unenforced** in the reference. Treat it as a specification Liam
wrote for himself and never got to, not as a working component to port.

What the rule means and how to actually implement it: within one strand, if
chunk A's `covers` sit at a lower band index than chunk B's, then A's year span
must not start after B's. Formally, sorting a strand's chunks by
`chunkBandIndex` must produce a sequence whose `y0` values are non-decreasing.
Sketch, to run in the SPEC §9 sanity check (Node, no deps, prints and exits
non-zero):

```js
// sequence check: the year axis must not contradict the teaching order
let seqBad = 0;
Object.entries(window.VIC_CHUNKS || {}).forEach(([cat, chunks]) => {
  const rows = chunks.map(ch => {
    const first = ch.covers.map(id => window.SKILLS.find(s => s.id === id)).filter(Boolean)[0];
    return { title: ch.title, y0: ch.y0, band: first ? window.BANDS.indexOf(first.band) : -1 };
  }).filter(r => r.band >= 0)
    .sort((a, b) => a.band - b.band);          // teaching order
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].y0 < rows[i - 1].y0) {         // a later step placed EARLIER on the year axis
      seqBad++;
      console.log("SEQ", cat, `"${rows[i-1].title}" (band ${rows[i-1].band}, y${rows[i-1].y0})`,
                  "->", `"${rows[i].title}" (band ${rows[i].band}, y${rows[i].y0})`);
    }
  }
});
console.log("sequence problems", seqBad);
```

Two further checks worth adding at the same time, because they are the failure
modes the data shape invites:

- every id in every `covers` resolves to a real skill (a typo silently makes a
  chunk empty and it renders as `0` with no error);
- every skill in a `CATEGORIES` strand is covered by exactly one chunk (an
  uncovered cell becomes unreachable from the timeline view).

### A1.7 What this means for the Japanese hub

The Japanese case is *harder* than the reference in one specific way and
*easier* in another.

Harder: Liam's second view is a **single** F–10 year axis. Andrew's class
straddles **two curricula that are sequential, not parallel** — Victorian
Curriculum Japanese F–10 (Levels 7–8, 9–10) then VCE Units 1–4. Those are not
two labellings of one axis; they are two segments of one longer axis, with an
overlap year (Year 10 students doing VCE Unit 1&2). So the natural Japanese
port is a **single timeline with a mixed tick row** — e.g. ticks
`7 · 8 · 9 · 10 · U1 · U2 · U3 · U4` — rather than two toggled views. Whether
that is right, and where the boundary sits, is Andrew's call (Q-A1, Q-A2 below).

Easier: the Japanese hub has no second *audience*. There is one class. The
toggle in the reference exists because EAL and mainstream students need
different words for the same cell; the Japanese hub's toggle, if any, is
teacher-vs-student or F10-vs-VCE emphasis, not two student populations.

**Recommended port shape** (pending Andrew):

```js
// data/skills.js — new export, content lane, no engine coupling
window.SEQUENCE = {
  axis: { ticks:["7","8","9","10","U1","U2","U3","U4"] },  // shared axis, 8 columns
  strands: {
    "て-form I": [
      { title:"Joining actions", y0:0, y1:1, years:"Years 7–8",
        refs:["VC …"],            // documentation only, NEVER rendered
        covers:["te-form-b1-core"] },
      ...
    ],
  }
};
```

`refs` rather than `codes` because the Japanese hub must carry references to
*two* documents (VC Japanese F–10 content descriptions, and VCE SL study design
grammar/kanji lists) — but the field is still documentation-only and still
never rendered. Grid maths generalises: `grid-column: (y0+2) / (y1+3)` with
`repeat(N, 1fr)` where N = `ticks.length`.

---

## A2. THE MASTERY-CASCADE CELL STATES

### A2.1 Honest finding: `.achieved` is dead CSS

`.achieved` exists in the stylesheet (lines 70–72) and is **never added by any
JavaScript** in the file. I grepped the whole file: the only three hits are the
CSS rules themselves. The comment above them (lines 67–68) describes an
intended three-state cascade:

```css
/* cascade: mastered cell (bright green), levels below it (faint green),
   and the next band up — the one you'll actually drill (accent ring). */
.matrix-cell.below{background:var(--okbg);border-color:var(--line-soft)}
.matrix-cell.achieved{background:var(--correct);border-color:var(--correct)}
.matrix-cell.achieved .cell-name{color:var(--paper)}
.matrix-cell.achieved .cell-count{background:var(--okbg);color:var(--correct)}
.matrix-cell.target{border:2px solid var(--accent)}
```

So the *selector* screen ships with only two live states plus empty:

| class | who sets it | meaning on the selector |
|---|---|---|
| `.target` | grid 3159/3171, timeline 3075/3083 | the cell you clicked — 2px accent border |
| `.below` | grid 3160/3172, timeline 3076/3084 | the neighbour dragged in as review/included |
| `.empty` | 3146 | no skill, or `introduced:false` — greyed, em-dash, `opacity:.5` |
| `.no-items` | 3152 | skill exists, `items:[]` — `opacity:.65`, count renders `0` |
| `.achieved` | **nobody** | intended "mastered" green; unimplemented |

The live mastery colouring happens on a **different grid**, the report rubric,
using a `.rpt-*` family (§A5). My read: Liam started with an
achievement-cascade selector, moved the achievement display to the report, and
left the CSS behind. Port the `.rpt-*` set; port `.achieved` only if you
deliberately decide the selector should show history (see Q-A3).

### A2.2 The report rubric states — this is the live cascade

CSS (lines 352–363):

```css
.matrix-cell.rpt-mastered{background:var(--correct);border-color:var(--correct)}
.matrix-cell.rpt-mastered .cell-name{color:var(--paper)}
.matrix-cell.rpt-partial{background:#f6efda;border-color:#caa53a}
.matrix-cell.rpt-missed{background:var(--badbg);border-color:var(--wrong)}
.matrix-cell.rpt-none{opacity:.5}
.rpt-mark{position:absolute;top:4px;right:6px;font-size:12px;font-weight:800}
.rpt-mark.ok{color:var(--paper)} .rpt-mark.bad{color:var(--wrong)}
.matrix-cell.rpt-next{outline:2px solid var(--accent);outline-offset:-2px}
.rpt-subskill{font-size:9px;font-weight:700;line-height:1.3;color:#7a6310;margin-top:2px}
.rpt-next-tag{font-size:9px;font-weight:800;text-transform:uppercase;color:var(--accent)}
```

Computation (lines 4306–4315) — the whole thing:

```js
function cellStatusFor(skill, bySkill) {
  const s = bySkill[skill.id];
  if (!s) return { kind: "none" };                        // not in this round at all
  if (s.right === s.total) return { kind: "mastered" };   // 100% FIRST TRY
  const tags = Object.entries(s.tags);
  const someRight = tags.some(([, t]) => t.right === t.total);
  const someWrong = tags.some(([, t]) => t.right <  t.total);
  if (tags.length > 1 && someRight && someWrong) return { kind: "partial", tags };
  return { kind: "missed" };
}
```

Two things to notice, both worth preserving:

- **`right` is first-try count, not eventual-correct count.** `bySkill` is
  built at 4033–4044 from `firstPass[e.uid]`. "Mastered" therefore means "got
  every question right on the very first attempt", which is a much stronger
  claim than "eventually got them right". The mastery loop guarantees everyone
  ends at 100% eventually, so eventual-correct would colour everything green
  and mean nothing.
- **`partial` only exists when a cell has more than one `tags` value.** That is
  the sub-skill diagnosis: a bundled cell (て-form I = sequence + request +
  progressive) can report "sequence ✓, request ✗" instead of a flat red. The
  amber cell then prints the per-tag breakdown inside itself (line 4350):

```js
sub = `<div class="rpt-subskill">` + st.tags.map(([tag, t]) =>
  `<div><span class="${t.right === t.total ? "t" : "x"}">${t.right === t.total ? "✓" : "✗"}</span> ${escapeHtmlE(tag)}</div>`
).join("") + `</div>`;
```

This is exactly the `tags:["sub-skill"]` field SPEC §6 already reserves in the
Japanese bank. The engine port (J2) should implement `cellStatusFor` as-is.

- **`rpt-next`** is a separate axis again: an *outline*, not a background, so it
  can co-occur with any of the four states. `isNext` is read from the selection
  state, not from the score (line 4342):

```js
const isNext = (mode === "teaching")
  ? (drillTarget && drillTarget.category === cat && drillTarget.bandIndex === i)
  : (rowLevel[cat] === i);
```

  and `drillTarget`/`rowLevel` have already been advanced by `advanceSelection`
  (line 4285) before the rubric renders. So "next" is *the cell you'll drill
  next*, computed by the same rule for both views.

### A2.3 Colour-axis compliance (DESIGN_RULES §2, and the brief's hard rule)

The reference passes: `rpt-mastered/missed` use `--correct`/`--wrong`/`--badbg`
(the correctness axis), `rpt-next` uses `--accent` as an **outline** (the
selection axis), and category colour does not exist in this build at all —
strands are distinguished by row position and label, never by hue.

That is the safe pattern for the Japanese hub, and it is the pattern that
satisfies the brief's constraint. **If** the Japanese hub binds a colour to
each named category (the brief says colour carries meaning and is bound to
named categories), then the correctness colours must not be reused as category
colours, and the report rubric cannot paint cell backgrounds with correctness
green/red while the selector paints the same backgrounds with category hue.
The reference's own answer to this collision — put correctness on *background*
and selection on *outline* — leaves exactly one free channel for category. My
recommendation: **category colour lives on a left border-strip or the row
label; correctness owns the cell background; selection owns the outline.**
Three channels, three axes, no confusion. Andrew/Liam should confirm (Q-A4).

Every state is also paired with a glyph (`✓` / `✗` / the em-dash / the
`next ▸` tag), which is what DESIGN_RULES §6 requires — never colour alone.

---

## A3. ADAPTIVE PLACEMENT — band−1 / band / band+1 and the four outcomes

### A3.1 What gets drilled

`getTeachingSkills()` (lines 2987–2998):

```js
function getTeachingSkills() {
  if (!drillTarget) return [];
  const { category, bandIndex } = drillTarget;
  const skills = [];
  const below  = drillableAt(category, bandIndex - 1); if (below)  skills.push(below);
  const target = drillableAt(category, bandIndex);     if (target) skills.push(target);
  const above  = drillableAt(category, bandIndex + 1); if (above)  skills.push(above);
  return skills;
}
```

`drillableAt` (2947) returns the skill only if it exists **and** `introduced`
**and** `items.length` — so a band with no content is silently skipped rather
than producing an empty round. Sampling is `SAMPLE_PER_SKILL = 2` (line 2885)
via `sampleItems`, which prefers items not served last round (3305–3311):

```js
function sampleItems(skill, n) {
  const prev = lastServed[skill.id] || new Set();
  const indexed = skill.items.map((item, i) => ({ item, i }));
  const fresh = shuffle(indexed.filter(x => !prev.has(x.i)));
  const seen  = shuffle(indexed.filter(x =>  prev.has(x.i)));
  return fresh.concat(seen).slice(0, n);          // fresh first, then repeats
}
```

So a teaching round is ~6 questions across three levels. The mastery loop still
requeues anything missed until it is right.

### A3.2 The routing — four outcomes (lines 4046–4098)

```js
const { category, bandIndex } = drillTarget;
const belowSkill  = drillableAt(category, bandIndex - 1);
const targetSkill = drillableAt(category, bandIndex);
const aboveSkill  = drillableAt(category, bandIndex + 1);

const mastered = (skill) => skill && bySkill[skill.id] && bySkill[skill.id].right === bySkill[skill.id].total;
const belowOk  = !belowSkill || mastered(belowSkill);      // absent level counts as OK
const targetOk = mastered(targetSkill);
const aboveOk  = !aboveSkill || mastered(aboveSkill);

let nextBand = bandIndex, msg = "";

if (belowOk && targetOk && aboveOk) {                       // (1) CLEAN SWEEP -> jump 2
  const jump2 = nextDrillableAbove(category, bandIndex + 1);
  const jump1 = nextDrillableAbove(category, bandIndex);
  if (jump2 !== null) {
    nextBand = jump2;
    msg = `Outstanding! You mastered all three levels. Moving to ${bandLabel(jump2)} with a review of ${bandLabel(bandIndex + 1)} first.`;
  } else if (jump1 !== null) {
    nextBand = jump1;
    msg = `Excellent! You mastered everything. Moving up to ${bandLabel(jump1)}.`;
  } else {
    nextBand = null;
    msg = `You've mastered the whole strand! Nothing higher to practise.`;
  }
} else if (!belowOk) {                                      // (2) FOUNDATION GAP -> drop 1
  const dropTo = bandIndex - 1;
  if (dropTo >= 0 && drillableAt(category, dropTo)) {
    nextBand = dropTo;
    msg = `Let's strengthen the foundation. Dropping to ${bandLabel(dropTo)} to build up from there.`;
  } else {
    nextBand = bandIndex;
    msg = `Some tricky spots. Let's try this level again with the preteach.`;
  }
} else if (belowOk && targetOk && !aboveOk) {               // (3) SOLID -> up 1
  const up = nextDrillableAbove(category, bandIndex);
  if (up !== null) {
    nextBand = up;
    msg = `Great work on ${bandLabel(bandIndex)}! Moving to ${bandLabel(up)} — you'll get the vocabulary and skill preteach first.`;
  } else {
    nextBand = null;
    msg = `Almost there! You've reached the top of the strand.`;
  }
} else {                                                    // (4) TARGET MISSED -> stay
  nextBand = bandIndex;
  msg = `Nearly there. Let's have another go at ${bandLabel(bandIndex)} with a refresher.`;
}
```

Helper (4280):

```js
function nextDrillableAbove(cat, b) {
  for (let j = b + 1; j < window.BANDS.length; j++) if (drillableAt(cat, j)) return j;
  return null;                            // null = top of strand, no continue button
}
```

Properties worth stating because they are load-bearing:

- **Precedence is `!belowOk` before everything except a clean sweep.** Failing
  the *review* level outranks passing the target — the foundation gap is the
  diagnosis that matters most.
- **`nextBand === null` is a distinct state**, not "stay". The Continue button
  is hidden (4165) rather than looping the student on a finished strand.
- **All thresholds are 100% first-try.** There is no percentage cut-off
  anywhere. One slip on the review level drops you a band. That is aggressive
  and is a decision Andrew should see stated plainly (Q-A5).
- **Nothing is locked.** The placement screen also has "Back to selector"
  (4165/5065) — routing is a recommendation with a button, never a gate. This
  is the DESIGN_PHILOSOPHY "never lock a student out" rule holding.
- The message strings are the only place in the file that reads as praise
  ("Outstanding!", "Excellent!"). Against the no-fluff rule these are borderline
  — they do report a real state, but the Japanese hub should probably flatten
  them to plain reports of what happened and what's next (Q-A6).

Continue wiring (4156–4167):

```js
const contBtn = $("placementContinueBtn");
if (nextBand !== null) {
  contBtn.style.display = "";
  contBtn.textContent = `Continue to ${bandLabel(nextBand)}`;
  contBtn.onclick = () => {
    drillTarget = { category, bandIndex: nextBand };
    buildMatrix();
    startSession();
  };
} else { contBtn.style.display = "none"; }
```

Then, after rendering, `lastReport` is stored, exports are built, and
`recordHistory(bySkill)` writes the session into localStorage (4170–4172).

---

## A4. LOCALSTORAGE PERSISTENCE

### A4.1 Key naming and versioning (lines 2887–2896)

```js
const STORE_KEY = "grammarHub.v1";      // ONE key, version in the key AND in the payload
const BUILD = "2026-07-16.4";           // rendered faintly bottom-left; confirms which deploy is live
let history = [];                       // [{date, skillId, right, total}] across sessions
let savedName = "", savedCode = "";
let curriculum = "eal";
```

Belt and braces: the version appears in the key (`.v1`) *and* as `v: 1` in the
payload. Bumping the key orphans old data silently; bumping the payload field
lets `restoreState` reject-and-ignore. The reference uses both.

A second, separate key exists for the translate language: `"gh_tr_lang"`
(line 4857). Deliberate — a UI preference that should survive "Clear saved
progress" and is not part of the progress record.

### A4.2 Write (4385–4391)

```js
function persist() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      v: 1, name: studentName(), code: savedCode, mode, curric: curriculum,
      rowLevel, drillTarget, selectedPools, history,
    }));
  } catch (e) { /* private mode / quota — carry on without saving */ }
}
```

`persist()` is called from `buildMatrix()` (3192) — i.e. from the one function
every selection change already funnels through — plus on name/code input and
after `recordHistory`. One call site for state changes, no scattered saves.

### A4.3 Read + the corrupt-state guard (4392–4411)

This is the part to port most faithfully. It defends on four levels:

```js
function restoreState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch (e) { s = null; }
  if (!s || s.v !== 1) return;                                   // (1) unparseable or wrong version -> ignore

  if (s.mode === "teaching" || s.mode === "revision") mode = s.mode;          // (2) enum whitelist
  if (s.curric === "eal" || s.curric === "vic") curriculum = s.curric;
  if (s.rowLevel && typeof s.rowLevel === "object") rowLevel = s.rowLevel;    // (3) type check per field
  if (s.drillTarget && typeof s.drillTarget === "object") drillTarget = s.drillTarget;
  if (s.selectedPools && typeof s.selectedPools === "object") selectedPools = s.selectedPools;
  if (Array.isArray(s.history)) history = s.history;
  if (typeof s.name === "string") savedName = s.name;
  if (typeof s.code === "string") savedCode = s.code;

  // (4) drop anything that no longer matches the current rubric (content may have moved)
  Object.keys(rowLevel).forEach((cat) => {
    if (!window.CATEGORIES.includes(cat) ||
        !(rowLevel[cat] >= 0 && rowLevel[cat] < window.BANDS.length)) delete rowLevel[cat];
  });
  if (drillTarget && (!window.CATEGORIES.includes(drillTarget.category) ||
      !(drillTarget.bandIndex >= 0 && drillTarget.bandIndex < window.BANDS.length))) drillTarget = null;
  Object.keys(selectedPools).forEach((cat) => {
    if (!(window.POOLS || []).includes(cat)) delete selectedPools[cat];
  });
}
```

Level (4) is the one people forget and it matters most for a content-heavy repo
like this: **a student's saved selection is validated against the *current*
content bank on every boot.** Rename a category in `data/skills.js` and the
stale selection is dropped instead of producing a blank or crashed matrix.
Since the Japanese hub expects heavy content churn and a possible band rename
(SPEC §3 DECISION NEEDED), this guard is not optional.

`history` is *not* pruned against current skill ids on restore — it is filtered
later, at read time, in `skillWeakness()` (`skillById(x.id)` returning
undefined drops the row). That is the right split: don't destroy a student's
record because content moved; just don't act on rows you can't resolve.

### A4.4 History capping (4412–4417)

```js
function recordHistory(bySkill) {
  const date = todayStr();                                    // "YYYY-MM-DD", ISO slice(0,10)
  Object.entries(bySkill).forEach(([id, s]) =>
    history.push({ date, skillId: id, right: s.right, total: s.total }));
  if (history.length > 500) history = history.slice(-500);    // cap growth
  persist();
}
```

One row per skill per session, four short fields. 500 rows ≈ 60–100 sessions.
`slice(-500)` keeps the newest. No item-level log is persisted — the full item
log exists only in the in-memory teacher export, so localStorage never holds
what a student answered, only aggregate counts. Given the privacy rule in
CLAUDE.md that is a good default to keep.

### A4.5 `skillWeakness()` and "Review what you missed" (4428–4464)

```js
// Aggregate first-try history per skill and rank the weakest (progression
// cells that are still drillable), lowest success rate first.
function skillWeakness() {
  const agg = {};
  history.forEach((h) => {
    const a = agg[h.skillId] = agg[h.skillId] || { right: 0, total: 0 };
    a.right += h.right; a.total += h.total;
  });
  return Object.entries(agg)
    .map(([id, a]) => ({ id, ratio: a.total ? a.right / a.total : 1, total: a.total }))
    .filter((x) => {
      if (!(x.total > 0) || x.ratio >= 1) return false;      // never practised, or perfect -> not weak
      const sk = skillById(x.id);
      return sk && sk.mode === "progression" && sk.introduced && itemsFor(sk).length;
    })
    .sort((a, b) => a.ratio - b.ratio);                       // worst first
}

function refreshReviewBtn() {
  const btn = $("reviewWeakBtn");
  const n = skillWeakness().length;
  btn.style.display = n ? "" : "none";                        // hidden when there's nothing to review
  btn.textContent = `Review what you missed (${Math.min(n, 4)})`;
}

function reviewWeakest() {
  const weak = skillWeakness().slice(0, 4);
  if (!weak.length) return;
  mode = "revision"; drillTarget = null; rowLevel = {}; selectedPools = {};
  weak.forEach((w) => {
    const sk = skillById(w.id);
    const bi = window.BANDS.indexOf(sk.band);
    if (bi >= 0) rowLevel[sk.category] = bi;                  // one band per strand (revision model)
  });
  buildModeToggle(); updateToolbar(); buildMatrix();
  if (Object.keys(rowLevel).length) startSession();
}
```

Notes for the port:

- Ratios aggregate **across all sessions**, so a skill improves out of the list
  as later sessions land. It only exits when lifetime ratio hits 1.0, which is
  slow — arguably it should decay or window. Flagging rather than fixing.
- Pools are excluded (`mode === "progression"`).
- Because `rowLevel` is `category -> bandIndex`, two weak skills in the same
  strand collapse to one — the later one wins. With four picks that's rarely
  visible but it is a real limitation.
- The button hides itself when empty rather than showing a disabled control or
  a "nothing to review!" message. That is the no-fluff rule in practice.

`clearSaved()` (4418) removes the key, resets every in-memory field, blanks all
three name inputs, and rebuilds the matrix — a genuine reset, not just a
`removeItem`.

### A4.6 The rule this hub is under

DESIGN_RULES §7: localStorage **only on the deployed site**, and **never in an
artifact-previewed build**. The reference has no such guard because it is a
file:// build. The Japanese port needs the whole persistence layer behind one
capability check so a preview build degrades silently:

```js
const STORE_KEY = "jaGrammarHub.v1";
const CAN_STORE = (() => {
  try { const k = "__t"; localStorage.setItem(k, "1"); localStorage.removeItem(k); return true; }
  catch (e) { return false; }
})();
function persist()      { if (!CAN_STORE) return; /* ... */ }
function restoreState() { if (!CAN_STORE) return; /* ... */ }
```

And, per DESIGN_PHILOSOPHY's honest-UI rule, the UI should say where progress
lives — ELC's `index.html` does exactly this with a one-line privacy note
(line 64): *"This hub does not ask for your name or student ID. Activity and
goals are stored on this device only."*

---

## A5. PRINT STYLESHEET AND PROGRESS/REPORT SCREENS

### A5.1 The print stylesheet — 7 lines (445–451)

```css
@media print{
  body{background:#fff;padding:0}
  #translateBar,.noprint,.build-tag{display:none !important}
  .screen{display:none !important}
  #progressScreen.active{display:block !important}
  .container{border:none;box-shadow:none;max-width:100%;padding:0;margin:0}
}
```

The whole design: because every screen is a `.screen` toggled by `.active`,
printing is just "hide all screens, force-show the one you want". `.noprint` is
sprinkled on the buttons and hints inside the progress screen (markup lines
596–605) so the printed page carries the name, code, date and the two tables
and nothing else. No separate print template, no print-only markup.

Trigger (5046–5053):

```js
$("progressPdfBtn").addEventListener("click", () => {
  savedName = ($("studentNameR") && $("studentNameR").value.trim()) || savedName;
  savedCode = ($("studentCodeR") && $("studentCodeR").value.trim()) || savedCode;
  [$("studentName"), $("studentNameP")].forEach(el => { if (el) el.value = savedName; });
  persist();
  buildProgress();                       // re-render so the printed page shows the just-typed name
  setTimeout(() => window.print(), 60);  // let the DOM settle before the print dialog
});
```

"Save as PDF" is the browser's own print-to-PDF. No library, no dependency.

### A5.2 The three result screens, and why there are three

| Screen | When | Content |
|---|---|---|
| `#placementScreen` | end of a **teaching** cycle | score, one-strand rubric, routing message, Continue |
| `#reportScreen` | end of a **revision** session | score, whole rubric, "Practise next" with links, per-skill rows |
| `#progressScreen` | **any time**, from any screen | this session so far + lifetime history; printable |

The progress screen is the interesting one. It is reachable mid-question from a
`.reportNowBtn` present on every screen, and returning restores you to the exact
question **without touching session state** (4894, 5036–5044):

```js
let progCameFrom = "task";
function activeScreenName() {
  return Object.keys(screens).find(k => screens[k] && screens[k].classList.contains("active")) || "task";
}
function openProgress() {
  progCameFrom = activeScreenName();
  const nR = $("studentNameR"), cR = $("studentCodeR");
  if (nR) nR.value = studentName();
  if (cR) cR.value = studentCode();
  buildProgress();
  show("progress");
}
// Back also restores the translate mode the previous phase had set:
//   vocab-check -> "block", ml-/cl- phases -> "word"
```

`sessionSnapshot()` (4898) distinguishes three counts per skill —
`attempted` / `first` / `mastered` — and says so in plain words under the table
(4940): *"'First try' is questions right on the very first attempt; 'Mastered'
is questions you got right in the end."* That sentence is the honest-UI rule
doing real work: two numbers that would otherwise be confusable are defined
where they are shown.

`historyBySkill()` (4911) aggregates lifetime `right/total/sessions` per skill
for the second table, with an empty state that is informative rather than
cheerful (4959): *"Finish a session and your skills will start showing up here."*

### A5.3 Report screen extras worth porting

**"Practise next" with real links or an honest gap message** (4226–4243):

```js
const weak = Object.entries(bySkill).filter(([, s]) => s.right < s.total);
if (weak.length) {
  let html = `<h3>Practise next</h3>`;
  weak.forEach(([id, s]) => {
    const skill = skillById(id);
    html += `<div class="remed-row"><b>${linkifyGlossary(escapeHtmlE(s.name))}</b> `;
    if (skill.resources && (skill.resources.video || (skill.resources.sheets || []).length)) {
      if (skill.resources.video) html += `<a href="${skill.resources.video}" target="_blank">video</a> `;
      (skill.resources.sheets || []).forEach(sh => {
        html += `<a href="${sh.url}" target="_blank">${escapeHtmlE(resourceLabel(sh))}</a> `;
      });
    } else {
      html += `<span class="muted">no resources mapped yet — add to skills.js → resources</span>`;
    }
    html += `</div>`;
  });
  $("reportRemediation").innerHTML = html;
} else {
  $("reportRemediation").innerHTML = `<p class="muted">Every selected skill correct first try. Nothing to reteach.</p>`;
}
```

The missing-resource branch names the exact file and field to fix. That is a
small thing that makes the tool self-documenting for whoever maintains content.

**Caution — the reveal animation** (4255–4275, CSS 365–374): the report fades
in and pops mastered cells green one at a time on a ~160ms stagger, tail ~1s+.
DESIGN_RULES §6 caps animation at the existing 0.3s bar and requires
`prefers-reduced-motion` be respected. The reference does neither. **DO NOT
PORT as-is.** If Liam wants the reveal, it needs a
`@media (prefers-reduced-motion: reduce)` branch that renders the final state
immediately, and a rule change logged in DESIGN_RULES.

**Also note** the reference exports use strand/band headers
`name,date,strand,band,skill,sub_skill,first_try,out_of` (4474) while the
Japanese `engine.js` already writes `category` in that slot (SPEC §7). Keep the
Japanese header; don't import the reference's wording.

---

# PART B — ELC-Pages: translation / multilingual

## B0. Where the translation machinery actually is

Important correction to the brief's framing: **the tap-a-word-to-translate
behaviour is not in ELC-Pages.** It is in
`Bone-Sparrow/GrammarHuboffline.html`, lines 4604–4886, which is why §B1.3
below cites that file. ELC-Pages carries four *other* mechanisms:

| Mechanism | File | What it does |
|---|---|---|
| Page-chrome `data-i18n` + `COPY` | `index.html` 99–113 | translates the launcher's own UI strings |
| Parallel data values (`W()`) | `feeling-wheel.html` 263 | L1 word stored *beside* English in the data |
| Per-word popup with L1 + morphology | `ballads.html` 495–537 | tap a marked word, get meaning + parts + one L1 gloss |
| RTL per-field | `ballads.html` 529, `learning-compass.html` 405 | `dir` set on the translated element only |

None of them uses a translation service. All L1 text in ELC-Pages is
**reviewed content in the data file**, which is why AGENTS.md can demand
Traditional Chinese as a distinct reviewed value.

## B1. The mechanisms, one by one

### B1.1 `index.html` — language selector + `COPY` + `data-i18n` (lines 52–113)

Markup: a `<select>` and `data-i18n` keys on every translatable node.

```html
<select class="language-select" id="pageLanguage" aria-label="Page language">
  <option value="en">English</option>
  <option value="zh-Hans">简体中文（中国）</option>
  <option value="zh-Hant">繁體中文（台灣）</option>
</select>
<h1 data-i18n="title">🌟 ELC Hub</h1>
<a class="card" data-cat="ELC tools" data-title="Rubrics" href="rubrics.html">
  <h3 data-i18n="rubricTitle">Rubrics</h3>
  <p data-i18n="rubricText">What each band looks like, colour-coded, with worked examples.</p>
</a>
```

Engine — 15 lines, the entire i18n layer:

```js
const LANG_KEY = "elc_page_language";
const COPY = {
  en:       { title:"🌟 ELC Hub", intro:"…", rubricTitle:"Rubrics", … },
  "zh-Hans":{ title:"🌟 ELC 学习中心", …, rubricTitle:"评分标准", … },
  "zh-Hant":{ title:"🌟 ELC 學習中心", …, rubricTitle:"評分標準", … }
};
function setPageLanguage(lang){
  const copy = COPY[lang] || COPY.en;
  document.documentElement.lang = lang;                              // (a) real lang attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = copy[el.dataset.i18n] || COPY.en[el.dataset.i18n] || el.textContent;
  });                                                                 // (b) per-key English fallback
  document.getElementById("pageLanguage").value = lang;
  localStorage.setItem(LANG_KEY, lang);                               // (c) remembered
}
document.getElementById("pageLanguage")
  .addEventListener("change", e => setPageLanguage(e.target.value));
setPageLanguage(localStorage.getItem(LANG_KEY) || "en");
```

Three properties to keep: the English text is **in the HTML** (so a missing key
or a JS failure degrades to English, not to blank); the fallback chain is
per-key not per-language (a half-translated `COPY` block still works); and
`document.documentElement.lang` is genuinely updated, which is what fonts and
screen readers key off.

`zh-Hans` / `zh-Hant` (rather than `zh-CN`/`zh-TW`) are BCP-47 script subtags —
correct for choosing a font/rendering, whereas AGENTS.md's `zh-TW`/`zh-CN`
language is about *vocabulary*, not script. Both matter and they are not the
same axis.

### B1.2 `feeling-wheel.html` — the ALONGSIDE pattern (this is the one)

Data (line 263). L1 is a **field of the word**, not a replacement for it:

```js
const W = (en, zhHant, zhHans, vi) => ({ en, zhHant, zhHans, vi });
const EMOTIONS = [{
  colour:"#a7efc0",
  core: W("Happy","快樂","快乐","Vui vẻ"),
  branches:[
    [W("Playful","調皮","调皮","Tinh nghịch"), W("Aroused","興奮","兴奋","Phấn khích"), …],
    …
  ]
}];
```

Render (lines 1196–1201) — **the switch changes the headline, and adds English
back underneath; it never removes it**:

```js
const translated = language === "en" ? "" :
  `<p class="detail-english" lang="en">${escapeHtml(entry.word.en)}</p>`;
…
`<h2 class="detail-word" lang="${
    language === "en" ? "en" :
    language === "vi" ? "vi" :
    language === "zhHant" ? "zh-Hant" : "zh-Hans"
  }">${escapeHtml(entry.word[language])}</h2>
  ${translated}`
```

And the parts of the page that are the *object of study* stay English no matter
what: the morpheme chips carry a hard `lang="en"` (line 1162), and the "try it"
sentence frames use `entry.word.en` even in Chinese mode (line ~1210). The L1 is
support; it is never allowed to replace the thing being learned.

There is also an honest-UI note printed under the wheel (line 255):

> Translations are classroom-friendly equivalents: emotion words do not always
> match one-to-one across languages. Ask which word best fits the situation.

**This is the pattern to adapt for the Japanese hub, and it inverts cleanly.**
The Japanese hub is Japanese-by-default with a per-word English toggle — i.e.
the same structure with the roles swapped: the token carries `{ ja, en }`, the
default render shows `ja`, and revealing shows `en` **alongside** (not instead).
The "never replace the object of study" rule becomes: never let the English
gloss replace the Japanese token in the sentence line, and never let it appear
on an answer surface.

### B1.3 Tap-a-word-to-translate (`GrammarHuboffline.html` 4604–4886)

The single most transferable mechanism in either repo. Read the header comment
first (4604–4621) — it states the pedagogy, the safety rule and the provider
swap in one place.

**Three modes, set per screen by the render paths** (4686–4699):

```js
//   "unit"  teaching screens — tap translates a whole word/sentence
//   "word"  question / assessed screens — tap translates ONE word only, so a
//           student can't translate a whole sentence into the answer
//   "block" word-meaning test — no translation at all
function setTranslateMode(mode) {
  const b = document.body;
  b.classList.toggle("tr-block", mode === "block");
  b.classList.toggle("tr-word",  mode === "word");
  revertAll();                                   // never carry a translation across screens
  syncTranslateToggle();
  const note = $("transNote");
  if (note) note.textContent = translateHint();
}
function translateHint() {
  if (!translateOn) return "";
  const b = document.body;
  if (b.classList.contains("tr-block")) return "Translation is off for this question";
  if (b.classList.contains("tr-word"))  return "Tap a single word to translate it";
  return "Tap any word or sentence — one at a time";
}
```

`show()` resets to `"unit"` on every screen change (2928) and each render path
sets its own: vocab teach → `unit` (3479), vocab **check** → `block` (3503),
sort/clause practice → `word` (3569, 3605), question screen → `word` unless the
item says otherwise (3939):

```js
setTranslateMode(entry.item.noTranslate ? "block" : "word");
```

**Two allow/deny selector lists** (4643–4648) — the answer surfaces are named
explicitly and can never be translated:

```js
// Text a student may tap to translate. Deliberately excludes every answer
// surface (options, sort zones, clause word-chips) so it can't reveal an
// answer, and anything holding a form field (handled again at tap time).
const TR_UNIT_SEL  = ".cell-name,.vic-chunk,.rowlabel,#promptText,.stimulus,.cue," +
                     ".teach-def,.teach-example,.teach-term," +
                     ".li-text,.sc-goal,.term-chip," +
                     ".sort-prompt,.sort-help,.sort-tile,.clause-ask";
const TR_BLOCK_SEL = ".options,.choose-options,.order-bank,.edit-bank,.match-grid," +
                     ".vocab-opts,.zones,.clause-sentence,[data-no-tr]";
```

Resolution, with a second guard for form fields (4716–4730):

```js
function translatableUnit(el, wordMode) {
  let unit = el.closest(TR_UNIT_SEL);
  if (!unit) {                                   // tapping anywhere on a grid cell targets its name
    const cell = el.closest(".matrix-cell");
    if (cell) unit = cell.querySelector(".cell-name");
  }
  if (!unit) return null;
  if (unit.closest(TR_BLOCK_SEL)) return null;
  // Whole-unit mode replaces textContent, so refuse anything holding a form
  // field. Word mode only wraps the tapped word, so a blank is safe there.
  if (!wordMode && unit.querySelector("input,select,textarea")) return null;
  if (!(unit.textContent || "").trim()) return null;
  return unit;
}
```

**One-at-a-time state**, so the screen is never half in another language
(4652–4658):

```js
const trCache    = new Map();        // `${lang} ${text}` -> translation (session only)
const trOriginal = new WeakMap();    // element -> original innerHTML
let trCurrentUnit = null;            // the one translated unit (teaching screens)
let trWordSpan    = null;            // the one translated word (question screens)
```

`toggleUnit` (4733) stashes `innerHTML` in the WeakMap, sets `textContent` to
the translation, and a second tap restores. It also re-checks
`if (trCurrentUnit !== unit) return;` after the await, so a reverted-mid-fetch
translation never lands.

**Word-level surgery without any tokenisation of the source** (4765–4826). This
is the clever bit and also the bit that will not survive contact with Japanese:

```js
function wordAtPoint(x, y) {
  let range = null;
  if (document.caretRangeFromPoint) range = document.caretRangeFromPoint(x, y);
  else if (document.caretPositionFromPoint) {
    const p = document.caretPositionFromPoint(x, y);
    if (p) { range = document.createRange(); range.setStart(p.offsetNode, p.offset); }
  }
  if (!range) return null;
  const node = range.startContainer;
  if (!node || node.nodeType !== 3) return null;          // text node only
  const text = node.data;
  const isW = (c) => c != null && !/[\s.,!?;:"“”‘’()\[\]{}]/.test(c);
  let i = range.startOffset;
  if (i >= text.length) i = text.length - 1;
  if (i > 0 && !isW(text[i])) i--;
  if (i < 0 || !isW(text[i])) return null;
  let s = i, e = i + 1;
  while (s > 0 && isW(text[s - 1])) s--;                  // expand to whitespace boundaries
  while (e < text.length && isW(text[e])) e++;
  return { node, s, e, word: text.slice(s, e) };
}
// then: node.splitText(e); const mid = node.splitText(s);
//       replace `mid` with <span class="tr-word-live" data-en="…">, translate into it
// revert: span.replaceWith(document.createTextNode(span.dataset.en)); parent.normalize();
```

**`wordAtPoint` is whitespace-delimited and therefore useless for Japanese.**
Japanese has no inter-word spaces; `isW` would swallow an entire clause as one
"word". This is the single biggest adaptation required, and it is what makes
Part C (per-token markup) mandatory rather than optional: the Japanese hub must
carry explicit token boundaries in the content, because it cannot infer them
from the string. See §C4.

**Provider abstraction** (4660–4671) — swappable, and overridable by tests:

```js
async function translateProvider(text, target) {
  const url = "https://api.mymemory.translated.net/get?q=" +
              encodeURIComponent(text) + "&langpair=en|" + encodeURIComponent(target);
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  const t = data && data.responseData && data.responseData.translatedText;
  if (!t || (data.responseStatus && +data.responseStatus !== 200)) throw new Error("no translation");
  return String(t);
}
window.GH_TRANSLATE = window.GH_TRANSLATE || {};
if (!window.GH_TRANSLATE.provider) window.GH_TRANSLATE.provider = translateProvider;
```

**The Japanese hub should NOT port the provider at all.** Three reasons: (1)
DESIGN_RULES §7 forbids new dependencies and the hub must work offline;
(2) machine translation of Japanese grammar targets is exactly the case where a
wrong gloss teaches the wrong rule; (3) CLAUDE.md forbids guessing Japanese
curriculum facts, and an MT gloss is a guess presented as an authority, which
breaks the honest-UI rule. Port the **UI, modes, guards and one-at-a-time
state**; back them with **authored glosses in `data/skills.js`**, the
feeling-wheel way. Where a gloss is missing, say so ("no gloss written for this
word yet") rather than fetching one.

**Capture-phase interception** (4872–4884) — how a tap translates instead of
selecting:

```js
document.addEventListener("click", (e) => {
  if (!translateOn || document.body.classList.contains("tr-block")) return;
  if (e.target.closest("#translateBar")) return;
  const wordMode = document.body.classList.contains("tr-word");
  const unit = translatableUnit(e.target, wordMode);
  if (!unit) return;
  e.preventDefault();
  e.stopPropagation();
  if (wordMode) translateWordAt(e.clientX, e.clientY);
  else toggleUnit(unit);
}, true);          // <-- capture
```

**Affordance CSS** (398–429) — the invitation changes with the mode, so the
student can see which rules apply before tapping:

```css
body.tr-on .cell-name, …, body.tr-on .stimulus, body.tr-on .cue { cursor:help;
  text-decoration:underline dotted var(--accent); text-decoration-thickness:2px; text-underline-offset:3px }
body.tr-on.tr-word .stimulus, … { cursor:text; text-decoration-style:dashed;
  text-decoration-thickness:1px; text-decoration-color:rgba(168,50,50,.4) }
body.tr-on.tr-block .stimulus, … { cursor:default; text-decoration:none; background:none; box-shadow:none }
.tr-word-live.tr-done{background:var(--okbg);border-radius:4px;box-shadow:0 0 0 2px var(--okbg)}
.tr-loading{opacity:.55}
```

⚠️ **Colour-axis warning for the port:** `.tr-done` and `.tr-word-live.tr-done`
paint the translated token with `--okbg`, the *correct-answer* background. In a
build where the same screen shows marked answers, a glossed word would read as
a right answer. The Japanese hub must give the reveal state its own neutral
channel (a dotted underline, a small `EN` tag, or a `--line-soft` fill) — not
`--okbg`. This is a genuine defect to fix in the port, not a preference.

### B1.4 The `notranslate` meta and body attributes

`GrammarHuboffline.html` lines 6–9 and 454:

```html
<!-- Suppress the browser's own page translation (Chrome "Translate this page",
     Google Translate widget). The in-app EAL tool is the only sanctioned way to
     translate, so students can't one-click translate answers we withhold. -->
<meta name="google" content="notranslate">
…
<body translate="no" class="notranslate">
```

Three layers because they cover different agents: the `meta` stops Chrome's
offer, `translate="no"` is the HTML5 standard attribute honoured by most
engines, and the `notranslate` class is the legacy Google Translate widget hook.
Individual elements can opt out again the same way — the build tag does
(line 612): `class="build-tag notranslate" translate="no"`.

**No ELC-Pages file uses `notranslate` at all** (I checked all 15 HTML files:
zero hits). That is consistent: the ELC pages are reading/reference material
where browser translation is a legitimate support, whereas the Grammar Hub
withholds answers and must not be machine-translatable.

The Japanese hub is in the Grammar Hub category and should carry all three
layers — with a stronger reason than the EAL case: Chrome's page translation
would render Japanese stimulus sentences into English, destroying every item on
the page.

### B1.5 RTL handling

There is no global RTL mode in either repo. Direction is set **per translated
field**, at the point of insertion, never on the document:

`ballads.html` line 529:

```js
`<div class="translation" dir="${lang==='fa'?'rtl':'auto'}">${esc(w.translations?.[lang]||'—')}</div>`
```

`learning-compass.html` line 405:

```js
note.dir = ["ar","fa"].includes(e.target.value) ? "rtl" : "ltr";
```

The English page layout never flips; only the box holding the RTL text does.
`dir="auto"` is used as the non-RTL default, which lets the browser decide from
first-strong-character — safer than hardcoding `ltr` around mixed content.

**Relevance to Japanese: essentially none.** Japanese is LTR. The transferable
idea is the narrower one — *set direction/lang on the element that holds the
foreign text, not on the page* — which matters for the Japanese hub in the
`lang="ja"` form: Japanese spans should carry `lang="ja"` so the browser picks
Japanese glyph forms rather than Chinese ones for shared kanji. The
feeling-wheel already does exactly this discipline with its per-element `lang`
(lines 1162, 1201). Recommend `lang="ja"` on `.stimulus`, `.cue`, and every
Japanese token span; `lang="en"` on glosses and instructions.

### B1.6 Help text ALONGSIDE English, not replacing it — the consolidated rule

Collecting the evidence, because this is the pattern Liam wants preserved:

1. `feeling-wheel.html` 1196 — non-English selected → English is **added back**
   as `.detail-english`, never removed.
2. `feeling-wheel.html` 1162 — the morpheme chips (the object of study) are
   pinned `lang="en"` and never translate.
3. `ballads.html` 529 — the popup shows definition (EN) + context (EN) + word
   build (EN) + word story (EN) **and then** one L1 line under a label. The L1
   is a fifth panel, not a replacement for the four.
4. `ballads.html` 526 — morpheme glosses append the L1 rather than swapping:
   `<small>${p.meaning}${native ? ` · ${native}` : ''}</small>` — English
   meaning, middot, L1. Both visible, English first.
5. `GrammarHuboffline.html` 4735 — tapping a translated unit again returns it
   to English; nothing is stored; every re-render is English again (4609–4611).
6. `index.html` 108 — per-key fallback to `COPY.en`.

The invariant across all six: **English is the resting state and the L1 is a
temporary or adjacent addition.** For a Japanese-by-default hub the invariant
inverts to: *Japanese is the resting state; the English gloss is temporary or
adjacent, and reverting is always one tap away.* The mechanisms transfer
unchanged; only which language is "home" flips.

## B2. Share-by-URL, no backend

Two variants, both live.

### B2.1 Base64 payload in the hash — `writing-wall.html` (341–359, 464–479)

```js
const CLASS = "elc_class_examples";
const classEx = () => { try { return JSON.parse(localStorage.getItem(CLASS)||"[]"); } catch(e){ return []; } };

// URL-safe base64 over UTF-8 (TextEncoder handles non-Latin correctly)
const b64 = {
  enc: s => btoa(String.fromCharCode(...new TextEncoder().encode(s)))
              .replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),
  dec: s => new TextDecoder().decode(
              Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")), c => c.charCodeAt(0)))
};

function importFromLink(){
  const m = location.hash.match(/^#ex=(.+)$/);
  if (!m) return false;
  try {
    const item = JSON.parse(b64.dec(m[1]));
    const list = classEx();
    if (!list.some(x => x.x === item.x)) {              // de-dupe by payload
      list.push(item);
      localStorage.setItem(CLASS, JSON.stringify(list));
    }
    history.replaceState(null, "", location.pathname);  // scrub the URL after import
    return true;
  } catch(e) { return false; }                          // malformed link = silently ignored
}
const justImported = importFromLink();
```

Producing the link:

```js
document.getElementById("share").onclick = () => {
  const markup = toMarkup(canvas);
  if (!markup.trim()) { canvas.focus(); return; }
  const item = { t: document.getElementById("shareLabel").value.trim() || "Class example", x: markup };
  const url = location.origin + location.pathname + "#ex=" + b64.enc(JSON.stringify(item));
  urlBox.value = url;
  document.getElementById("shareOut").classList.add("show");
  urlBox.select();
  navigator.clipboard?.writeText(url)
    .then(() => hint.textContent = "Copied. Post this link for the class — they open it once and it's saved on their device.")
    .catch(() => hint.textContent = "Couldn't copy automatically — the link is selected above, press Ctrl/Cmd+C.");
  const list = classEx();
  if (!list.some(x => x.x === item.x)) { list.push(item); localStorage.setItem(CLASS, JSON.stringify(list)); renderClass(); }
};
```

Details worth keeping: **URL-safe base64** (`+/` → `-_`, padding stripped) so
the link survives chat apps and LMS pasting; **`TextEncoder`** so non-Latin
payloads encode correctly (essential for Japanese); **the hash, not the query**,
so the payload is never sent to a server; **`history.replaceState` scrubs the
URL** after import so a refresh doesn't re-import and the address bar stays
clean; **malformed → `false`, silently** so a mangled link can't break the page;
and the copy hint has a real fallback path when the clipboard API is blocked.

The failure mode to state honestly: this stores class content on **each
student's own device**. If they open it on a different browser it is gone. The
page says so (`"Saved on this device."`, line 371).

### B2.2 Query-parameter assignment links — `pronunciation-core.html` (497–535)

Lighter variant for "assign these N things" rather than shipping content:

```js
/* grammar-hub-style assignment links: ?focus=θ,s sets those sounds red on
   this device; ?assign turns the page into the teacher's link builder */
const QS = new URLSearchParams(location.search);
const ASSIGN_MODE = QS.has("assign");

(function importFocus(){
  const f = QS.get("focus"); if (!f) return;
  f.split(",").forEach(raw => {
    const sym = "/" + raw.trim().replace(/\//g,"") + "/";
    if (!find(sym)) return;                    // unknown id -> skipped, not an error
    state[sym] = state[sym] || {};
    state[sym].focus = true;
    state[sym].steps = {};
    if (state[sym].st === "done") delete state[sym].st;
  });
  save(state);
  try { history.replaceState(null, "", location.pathname); } catch(_) { /* file:// */ }
})();

// builder side (line 943)
const link = syms.length
  ? `${location.origin === "null" ? "" : location.origin}${location.pathname}?focus=${
      encodeURIComponent(syms.map(x => x.replace(/\//g,"")).join(","))}`
  : "";
```

Note `?assign` flipping the same page into a teacher link-builder — one file,
two roles, no separate teacher build. And `location.origin === "null"` handled
for `file://` use, which the Japanese hub needs since it opens by double-click.

**Which to use for the Japanese hub:** `?focus=` for "practise these cells"
homework links (short, readable, ids only, no content duplication) and `#ex=`
base64 only if a teacher needs to ship *content* (e.g. a marked-up sentence) the
student doesn't have. Since the Japanese hub ships its whole bank in
`data/skills.js`, `?focus=` covers almost every real case:

```js
// e.g. index.html?focus=te-form-b2-core,plain-form-b3
const focus = new URLSearchParams(location.search).get("focus");
if (focus) {
  focus.split(",").map(id => skillById(id.trim())).filter(Boolean).forEach(sk => {
    const bi = window.BANDS.indexOf(sk.band);
    if (bi >= 0) rowLevel[sk.category] = bi;
  });
  try { history.replaceState(null, "", location.pathname); } catch (_) {}
}
```

Neither variant collects anything or contacts a server — consistent with the
no-accounts/no-analytics rule.

## B3. `AGENTS.md` in full

Reproduced closely; this is the ELC project constitution and Liam's written
standard. (Path: `/home/user/ELC-Pages/AGENTS.md`.)

> **# Read this first (AI assistants)**
>
> **This repo is PUBLIC and LIVE.** Everything on `main` is on the internet at
> `liaminhawai-cmd.github.io/ELC-Pages/` within a minute or two of pushing.
> Students will use these pages.
>
> This is the student hub for an intensive English Language Centre. The private
> context library — source materials, house style, the roadmap, and the full AI
> brief — is the `ELC` repo. **Read `ELC/AGENTS.md` and `ELC/ROADMAP.md` before
> building anything here.** If you can't reach the private repo, ask the teacher
> to paste what you need; don't guess.
>
> **## Hard rules for a public, live repo**
>
> 1. **No student or staff names, ever** — in code, content, examples, commit
>    messages, or file metadata.
> 2. **No reproducing copyrighted works** — no textbook scans, picture-book
>    pages or page images, film scripts, subtitle files, or teacher planning
>    documents. **Short quotes inside original analytical commentary are
>    fine** — a phrase or a line, same as any published book review or the
>    writing wall already does — that's ordinary fair-dealing criticism/review,
>    not reproduction. Planning docs get rebuilt as interactive activities;
>    they are never published as-is.
> 3. **Nothing vulgar**, nothing that collects personal data. No accounts, no
>    tracking, no analytics. `localStorage` only, and the UI says so honestly.
> 4. **Traditional Chinese is required.** Whenever an ELC page offers translated
>    content, include reviewed Traditional Chinese as a distinct option and data
>    value. Traditional Chinese must use Taiwan vocabulary and terminology
>    (`zh-TW`), while Simplified Chinese must use Mainland China usage
>    (`zh-CN`). Do not treat character conversion or Simplified Chinese fallback
>    text as Traditional coverage.
> 5. **The teacher-view toggle is cosmetic.** This is a static site — never
>    present anything here as access control, and never put teacher-only content
>    behind it.
> 6. **Current publishing mode:** direct pushes to `main` are OK'd by the
>    teachers while the site isn't yet shared with students. Still run your own
>    privacy/copyright check on every file and say in the commit what you
>    checked. This mode ends when the teachers say so.
>
> **## Core principles — these override everything except the hard rules**
>
> 1. **No fluff. Ever.** Do not invent progress chatter, streaks, points,
>    badges, encouragement banners, "keep going!", "1 view left", or any other
>    filler that pretends to be teaching. If a line of text does not teach
>    something, instruct something, or report a real state, delete it. Teachers
>    notice padding instantly and it costs the tool its credibility.
> 2. **Teach the rule, with the example — not the example alone.** Showing a
>    model is not teaching. Every model must be annotated with the rule it
>    demonstrates, the way a good slide is: name the pattern, show where it
>    lives in the example, and state the range/limits so students can apply it
>    to their own work. Point at the specific words, don't just assert.
> 3. **Never lock a teacher or student out of content.** No gates, no "complete
>    this first", no forced sequences. Teachers jump around mid-lesson, re-teach
>    a slide, skip what the class already knows. Sequence is a *suggestion* —
>    show progress ticks if useful, but every part is always reachable.
> 4. **Annotate generously.** Labels, callouts, arrows, colour-coding tied to
>    meaning — the density of a well-made PowerPoint, not a bare demo. The
>    student should be able to read the screen without the teacher narrating.
> 5. **Say the honest thing.** If the computer is guessing (syllable splits,
>    accent models, synthesised sound), say so and let the human overrule it.
>    Never present a guess as an authority.
> 6. **Plain instructions.** Short sentences, common words, one instruction per
>    line. The readers are EAL learners.
>
> **## Before you build**
>
> **Check what already exists** — here, and in the other live repos (`Phonics`,
> `Grammar-hub`, `EAL-Vocabulary-Site`). Two AIs once shipped two pronunciation
> hubs in one day because neither looked. If something similar exists, extend it
> or flag the overlap; don't ship a parallel version.
>
> Current pages: `index.html` (launcher) · `writing-wall.html` ·
> `pronunciation.html` · `feeling-wheel.html` · `limericks.html` ·
> `learning-compass.html` · `report.html`.
>
> **## Conventions**
>
> - **One self-contained `.html` file per tool.** No build step, no CDNs, no
>   external fonts. Must work offline and on a phone (mobile-first).
> - **Content lives in a marked data block at the top of the file** so teachers
>   can add examples/words/twisters without touching logic.
> - Match the shared look: CSS variables, light/dark via
>   `prefers-color-scheme`, the existing card/header patterns.
> - Cross-repo links are fine (e.g. the pronunciation hub plays audio from
>   `Phonics`); hosted duplicates are not.
> - New tool → add a card in `index.html` with `data-cat`/`data-title` so the
>   activity record keeps working.
> - Sticky UI must never resize with scroll (that's what causes jank) — pin at a
>   fixed size with internal scroll, like the writing wall's rubric.
>
> **## Verify before you push**
>
> Load the page and click through what you changed — a real browser or headless
> run, not a hope. State in the commit message what you verified.

### Where AGENTS.md and this repo's CLAUDE.md/DESIGN_RULES.md differ

Mostly they agree. Four differences that matter when porting:

| Topic | ELC `AGENTS.md` | Grammar-hub |
|---|---|---|
| File layout | one self-contained `.html` per tool | four-file lane split (SPEC §2, DESIGN_RULES §0) |
| Theming | light/dark via `prefers-color-scheme` | single palette, tokens in `index.html` `:root` (§2) |
| Translation | Traditional Chinese **required** wherever translation is offered | not applicable; the L2 is Japanese and the L1 is English |
| Publishing | direct pushes to `main` OK'd | lane rule; sanity check must print `problems 0` before content commits |

So: **do not** port ELC's single-file convention or its dark-mode requirement
into this repo, and the Traditional-Chinese rule does not transfer (it exists
because ELC serves a specific cohort). Everything under "Core principles"
transfers wholesale and is already echoed in `collab/DESIGN_PHILOSOPHY.md`.

The AGENTS.md line most relevant to this task is **"Before you build: check what
already exists."** Applied here: the Japanese hub already has `order` tiles in
`tasktypes.js`; §C exists precisely so the Japanese toggle reuses that shape
rather than inventing a parallel one.

---

# PART C — existing per-token / per-word annotation shapes

Five distinct shapes exist across the two repos. They are ranked below by how
well each survives contact with Japanese.

## C1. `[[key|surface]]` inline markup + a keyed vocab table — `ballads.html`

**The best fit of the five.** Content (line 279):

```json
{"text":"It was the man from [[ironbark|Ironbark]] who [[struck|struck the Sydney town]],",
 "rhyme":"A","end":"town","voice":"Narrator"}
```

Vocab table keyed by the same key (line 403):

```json
"wandered": {
  "word":"wandered",
  "meaning":"Moved around without a clear route or purpose.",
  "context":"He walks through streets and parks but does not know what to do.",
  "contexts":{"8":"…"},                          // optional per-stanza override
  "origin":"wander + -ed (past tense).",
  "parts":[{"surface":"wander","type":"root","meaning":"move without a fixed route"},
           {"surface":"ed","type":"suffix","meaning":"past tense"}],
  "related":["wander","wanders","wandering","wanderer"],
  "translations":{"zh-Hans":"四处游荡","ja":"あちこち歩き回った","fa":"…","vi":"…","zh-Hant":"四處遊蕩"}
}
```

Parser — text → DOM fragment with real buttons (line 495):

```js
function parseLine(text, stanzaNo){
  const frag = document.createDocumentFragment();
  let at = 0;
  const re = /\[\[([^|]+)\|([^\]]+)\]\]/g;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > at) frag.append(document.createTextNode(text.slice(at, m.index)));
    const key = m[1];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vocab';
    btn.dataset.key = key;
    btn.textContent = m[2];                       // the SURFACE form, inflected in context
    btn.addEventListener('click', () => openWord(key, stanzaNo));
    frag.append(btn);
    at = re.lastIndex;
  }
  if (at < text.length) frag.append(document.createTextNode(text.slice(at)));
  return frag;
}
// stripping for plain contexts (line 541):
const stripMarkup = text => String(text||'').replace(/\[\[[^|]+\|([^\]]+)\]\]/g, '$1');
```

Popup assembly (line 526) — note how the L1 is one labelled panel among five,
and how per-morpheme L1 is *appended* to the English gloss:

```js
const parts = (w.parts||[]).length
  ? `<div class="morphs">${w.parts.map(p => {
      const native = DATA.morphemeTranslations?.[`${p.surface}|${p.meaning}`]?.[lang];
      return `<span class="morph ${esc(p.type)}"><b>${esc(p.surface)}</b>` +
             (p.variant ? `<small>≈ ${esc(p.variant)}</small>` : '') +
             `<small>${esc(p.meaning)}${native ? ` · ${esc(native)}` : ''}</small></span>`;
    }).join('')}</div>`
  : `<p class="whole">No useful modern morpheme split here — learn this word or idiom as a whole.</p>`;
```

That `else` branch is the honest-UI rule again: when the tool has nothing
useful to say about the structure, it says so instead of inventing a split.

Why this shape wins for Japanese:

- **Explicit boundaries in the content.** Solves the problem `wordAtPoint`
  can't (§B1.3). The author decides where a token starts and ends, which for
  Japanese is a *linguistic* decision only Andrew can make (は as topic particle
  vs part of では; 食べて as one token or 食べ+て).
- **Key ≠ surface.** `[[struck|struck the Sydney town]]` glosses a multi-word
  span under one key. The Japanese equivalent — glossing 〜なければならない as
  one unit while it spans five kana-runs — needs exactly this.
- **Already coexists with plain text**, so only the tokens worth glossing get
  marked up; the rest of the sentence stays a text node.
- **The `<b>`-highlight convention already in `data/skills.js`** (SPEC §6:
  `sentence:"手を<b>洗って</b>、ご飯を食べます。"`) is a degenerate case of the
  same idea — one marked span, no key. `[[…|…]]` generalises it without
  breaking it, and both can be parsed in one pass.

Adapted for Japanese, content-lane only:

```js
// data/skills.js — item field, no engine change needed to author it
{ type:"identify",
  prompt:"What is て doing here?",
  sentence:"[[te-o|手を]][[araute|洗って]]、[[gohan-o|ご飯を]][[tabemasu|食べます]]。",
  options:[…], answer:"…", explain:"…" }

// and a per-skill token gloss table (English sits ALONGSIDE, never replaces)
tokens: {
  "te-o":     { ja:"手を",   en:"hands (object)", note:"を marks the direct object" },
  "araute":   { ja:"洗って", en:"wash (て-form)", note:"う-verb: 洗う → 洗って" },
  "gohan-o":  { ja:"ご飯を", en:"rice / a meal (object)" },
  "tabemasu": { ja:"食べます", en:"eat (polite)" }
}
```

Renderer sketch for `tasktypes.js` (reuses `.stimulus`, adds one class):

```js
// Parse [[key|surface]] into tappable token buttons; plain text passes through.
// Returns an HTML string so it drops into the existing render() contract.
function jaTokens(sentence) {
  const re = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
  let out = "", at = 0, m;
  while ((m = re.exec(sentence))) {
    if (m.index > at) out += sentence.slice(at, m.index);      // <b>…</b>, 、。 etc. pass through
    out += `<button type="button" class="ja-tok" data-tok="${esc(m[1])}" lang="ja">${m[2]}</button>`;
    at = re.lastIndex;
  }
  return out + sentence.slice(at);
}
```

And the reveal, honest and reversible, with the gap stated rather than guessed:

```js
area.addEventListener("click", (e) => {
  const btn = e.target.closest(".ja-tok");
  if (!btn || !glossOn) return;
  e.preventDefault(); e.stopPropagation();          // don't let it reach the answer handler
  revealOne(btn);                                   // one at a time, like trCurrentUnit
});

function revealOne(btn) {
  if (btn.dataset.shown === "1") { btn.querySelector(".ja-gloss")?.remove(); btn.dataset.shown = ""; return; }
  document.querySelectorAll('.ja-tok[data-shown="1"]').forEach(b => {
    b.querySelector(".ja-gloss")?.remove(); b.dataset.shown = "";
  });
  const g = TOKENS[btn.dataset.tok];
  const i = document.createElement("i");
  i.className = "ja-gloss";
  i.lang = "en";
  i.textContent = g && g.en ? g.en : "no gloss written for this word yet";
  btn.appendChild(i);                               // ALONGSIDE: the Japanese stays visible
  btn.dataset.shown = "1";
}
```

The Japanese text is never replaced — the gloss is a child element under it,
which is the feeling-wheel `detail-english` rule inverted. The gloss must not
use `--okbg` (see the warning in §B1.3).

## C2. Token array + span — `clausePick` (`GrammarHuboffline.html` 787+)

```js
clausePick:{
  labels:{ main:"the MAIN CLAUSE (stands alone)", sub:"the SUBORDINATE CLAUSE (can't stand alone)" },
  hints:{ main:"The main clause makes complete sense on its own.", sub:"…" },
  modelled:[
    { words:["Although","it","was","raining",",","we","went","out"],
      find:"sub", span:[0,3],
      explain:"'Although it was raining' can't stand alone — that whole chunk is the subordinate clause." },
  ],
  items:[
    { words:["Because","it","was","hot",",","we","went","swimming"], find:"sub",  span:[0,3] },
    { words:["Because","it","was","hot",",","we","went","swimming"], find:"main", span:[5,7] },
  ],
}
```

The sentence **is** an array of tokens; punctuation is its own token; the answer
is an inclusive index range. Rendered as `.clause-word` buttons with
`.sel/.correct/.incorrect` states (CSS 265–272). Two items over the *same*
`words` array asking for different spans is a nice economy.

For Japanese this is the right shape for any "select the span" task — mark the
adverbial clause, find the relative clause modifying 人, pick the particle
phrase. It also composes with C1: `words[]` is just `[[…]]` markup pre-split.
Where they differ: C1 is for *glossing* a sentence that also does something
else; C2 is for a task whose whole answer is a span.

## C3. Token array + gaps + a bank — `edit` task type (2633+)

```js
render(item) {
  const ins = item.allowInsert;
  let row = "";
  item.tokens.forEach((w, i) => {
    if (ins) row += `<button type="button" class="edit-gap" data-pos="${i}" aria-label="add here"></button>`;
    row += `<button type="button" class="edit-token" data-i="${i}">${esc(w)}</button>`;
  });
  if (ins) row += `<button type="button" class="edit-gap" data-pos="${item.tokens.length}" aria-label="add here"></button>`;
  const bank = item.bank.map(w => `<button type="button" class="edit-word" data-w="${esc(w)}">${esc(w)}</button>`).join("");
  const hint = ins
    ? "Tap a space to add a word or comma, or tap a word to take it out. Then tap or drag in your choice."
    : "Tap the wrong word to take it out, then tap or drag in the right one.";
  return `${prompt}<div class="edit-hint">${hint}</div>
          <div class="edit-sentence" data-active="none">${row}</div>
          <div class="edit-bank">${bank}</div>`;
}
```

Interaction: tapping a token replaces it with a `.edit-slot` carrying
`data-orig` (so it can be restored), tapping a gap activates it, then tapping a
bank word fills whichever is active. `row.dataset.active` tracks which of the
two modes is live. It supports both tap and pointer-drag.

**Directly relevant to Japanese particle work**: `allowInsert` with `tokens` and
a `bank` of particles is exactly the "insert the right particle here" task —
`私___学校___行きます` with a bank of `は/を/に/で/へ`. The gap-between-tokens
model matches Japanese better than it matches English, because Japanese
particles genuinely sit *between* content words rather than modifying them.

## C4. Whitespace-split at runtime — `clickword` (`Bone sparrow vocab and grammar task.html` 616, 810)

```js
if (cfg.kind === "clickword") {
  box.innerHTML = `<div class="prompt">Click the conjunction that joins the two clauses</div>`;
  const w = document.createElement("div"); w.className = "words";
  it.q.split(/\s+/).forEach(word => {
    const clean = word.replace(/[.,!?;:'"“”]/g, "").toLowerCase();
    const b = document.createElement("button");
    b.className = "wordbtn"; b.textContent = word;
    b.onclick = () => {
      if (nextBtn.style.display === "inline-block") return;      // already answered
      const correct = clean === it.a;
      b.classList.add(correct ? "right" : "wrongpick");
      if (!correct) {                                            // reveal the right one
        w.querySelectorAll(".wordbtn").forEach(x => {
          if (x.textContent.replace(/[.,!?;:'"“”]/g,"").toLowerCase() === it.a) x.classList.add("right");
        });
      }
      finishItem(correct, it.a);
    };
    w.appendChild(b);
  });
}
```

Item shape is minimal — `{ id, q, a, explain }` with `q` a plain sentence and
`a` the target word.

**DO NOT PORT the tokenisation.** `it.q.split(/\s+/)` is the same
whitespace assumption as `wordAtPoint`, and it fails on Japanese for the same
reason. Port the *interaction* (tap a token, mark it, reveal the right one if
wrong, then lock) but feed it `words[]` from C2 or `[[…]]` from C1.

This is the concrete evidence for the brief's instruction to reuse an existing
shape: **the two runtime-tokenising shapes (C4, and `wordAtPoint` in B1.3) are
the two that break on Japanese; the three content-authored shapes (C1, C2, C3)
all transfer.** The Japanese hub should adopt exactly one authored shape and use
it everywhere — recommendation: **C1 (`[[key|surface]]`) as the storage format,
with `words[]` derivable from it** by the same regex, so C2 and C3 tasks can
consume the same authored sentence.

## C5. Morpheme chips — `feeling-wheel.html` (1160–1180)

```js
function morphChip(chunk, cls, gloss) {
  return `<span class="mo-chip ${cls}" lang="en">${escapeHtml(chunk)}` +
         (gloss ? `<i class="mo-gloss">${escapeHtml(gloss)}</i>` : "") + `</span>`;
}

function morphRow(form, fam, selectedWord) {
  const [split, meaning] = form;                       // e.g. ["dis+(gust)+ing", "causing it — it sickens you"]
  const chunks  = split.split("+");
  const rootIdx = chunks.findIndex(c => c.startsWith("("));   // the root is the one in parentheses
  const surface = chunks.map(c => c.replace(/[()]/g,"")).join("");
  const chips = chunks.map((c, i) => {
    const text = c.replace(/[()]/g,"");
    if (rootIdx === -1 || i === rootIdx) return morphChip(text, "root", "");
    const key = text.replace(/^-/,"");
    if (i < rootIdx) return morphChip(text, "prefix", (fam.affix && fam.affix[key]) || PREFIX_MEANINGS[key] || "");
    return morphChip(text, "suffix", SUFFIX_MEANINGS[key] || "");
  }).join("");
  const current = surface === selectedWord ? " current" : "";
  return `<div class="fam-row${current}"><div class="fam-chips">${chips}</div>` +
         (meaning ? `<p class="fam-meaning">${escapeHtml(meaning)}</p>` : "") + `</div>`;
}
```

Compact authoring format: `"dis+(gust)+ing"` — `+` splits, `(…)` marks the root,
position relative to the root decides prefix vs suffix, and the gloss is looked
up from shared tables with a per-family override. Three chip classes = three
morpheme roles, each with its own colour, plus a key strip that names the
colours (`renderFamily`, line 1178) so the colour coding is explained on screen
rather than assumed.

**Direct Japanese analogue: verb conjugation.** `食べ+ます`, `洗っ+て`,
`行か+なけれ+ば+なら+ない`. A `"(食べ)+ます"` format with role classes
(stem / て-form ending / auxiliary / particle) is the same machine. That is a
strong candidate for the transform and gapfill explain panels — showing *where*
the conjugation happens instead of only asserting the rule, which is
AGENTS.md core principle 2 ("Point at the specific words, don't just assert").

⚠️ The Japanese hub's `data/skills.js` uses `<ruby>…<rt>…</rt></ruby>` for
furigana (SPEC §6). Any token/chip renderer must pass `<ruby>` through
untouched — do not `escapeHtml` a surface that may contain ruby markup, and
don't let `split("+")` run across a ruby element. Safest: keep furigana in the
surface half of `[[key|surface]]` and never inside a `+`-split string.

## C6. Existing shapes already in the Japanese hub

For the "check what already exists" rule:

- `tasktypes.js` `order` — `item.words[]` tiles, tap to move between bank and
  line, `normJa()` comparison with all spaces stripped. **This is already C2's
  `words[]` shape.** A per-token gloss can hang off the same array.
- `data/skills.js` `sentence:"…<b>洗って</b>…"` — a single marked span, the
  degenerate case of C1.
- `normJa()` in `tasktypes.js` — NFKC, strips all spaces including full-width,
  forgives trailing punctuation, does **not** unify kana/kanji. Any token
  comparison should route through it rather than reimplementing.

So the Japanese hub already has one authored token array and one authored
span-marker. The recommendation in C4 (adopt `[[key|surface]]`, derive
`words[]`) extends what exists rather than replacing it, and touches only the
content lane plus one helper in `tasktypes.js`.

---

# PART D — port priority and cross-cutting cautions

## D1. Suggested order

1. **`SEQUENCE` data shape + timeline renderer** (§A1) — the headline feature,
   and the piece that must be designed before content is authored against it,
   because `covers`/`y0`/`y1` are content-lane fields.
2. **The sequence validator** (§A1.6) — into the SPEC §9 sanity check, at the
   same time as (1). It is ~25 lines and it is the thing the reference never
   built.
3. **`cellStatusFor` + `.rpt-*` rubric + tags breakdown** (§A2) — needs the
   `tags` support that SPEC §6 already reserves.
4. **Persistence with the corrupt-state guard and the `CAN_STORE` gate**
   (§A4) — small, self-contained, and the guard is what makes content churn
   safe.
5. **`[[key|surface]]` tokens + per-token English gloss toggle** (§C1, §B1.3
   UI only) — the Japanese-by-default requirement.
6. **Placement routing** (§A3) — only after Andrew rules on the thresholds.
7. **Print + progress screen** (§A5) — cheap, high teacher value, 7 lines of
   CSS plus one screen.

## D2. Things in the reference NOT to port

| Item | Reference | Why not |
|---|---|---|
| MyMemory translation provider | 4660 | new network dependency; MT glosses of Japanese grammar are guesses presented as authority |
| `wordAtPoint` whitespace tokeniser | 4765 | breaks completely on Japanese |
| `clickword` `split(/\s+/)` | vocab task 616 | same |
| Report reveal animation | 4255, CSS 365 | exceeds DESIGN_RULES §6 motion cap; no `prefers-reduced-motion` branch |
| `.tr-done` using `--okbg` | CSS 421/428 | collides the gloss state with the correct-answer colour |
| `.achieved` selector cascade | CSS 70 | dead code in the reference; port only if deliberately specified |
| Praise strings in placement | 4066–4092 | "Outstanding!"/"Excellent!" sit close to the no-fluff line |
| ELC single-file convention | AGENTS.md | conflicts with this repo's four-file lane rule |
| ELC dark mode / `prefers-color-scheme` | AGENTS.md | conflicts with DESIGN_RULES §2 single palette |

## D3. Cross-cutting: the three-axis colour discipline

Restating, because it is the constraint most likely to be violated during the
port. Three independent things need to be visible simultaneously on a cell:

| Axis | Channel in the reference | Recommendation for the Japanese hub |
|---|---|---|
| Correctness | cell **background** (`--correct`/`--badbg`) + glyph | keep |
| Selection / next | **outline** (`--accent`, `outline-offset:-2px`) | keep |
| Category | *does not exist in the reference* | a left border-strip and/or the row label — the one free channel |

Never move category colour onto the background, and never reuse
`--correct`/`--wrong` hues for a category. Pair every state with a glyph
(DESIGN_RULES §6).

---

# PART E — Open questions for Andrew

Curriculum and pedagogy calls I must not guess (CLAUDE.md). Each names what it
blocks.

- **Q-A1. What are the ticks on the sequence axis?** Liam's is `F 1 2 … 10`.
  For a class straddling VC Japanese F–10 and VCE Units 1–4, is it
  `7 8 9 10 U1 U2 U3 U4`, or two separate views, or year levels with VCE units
  as a fifth-plus column? *Blocks: the `SEQUENCE` axis shape, the grid column
  count, and every `y0`/`y1` value authored into content.*

- **Q-A2. Where do the two curricula overlap, and how is that shown honestly?**
  A Year 10 student in the combined class may be doing VCE Unit 1&2 content. Is
  a chunk allowed to span the 10→U1 boundary, and should the boundary be drawn
  on screen? *Blocks: whether `y0`/`y1` can cross the boundary; the tick row
  design.*

- **Q-A3. Should the selector show past achievement, or only the report?**
  Liam's `.achieved` green-cascade on the selector is dead code; the live
  version shows achievement only on the report rubric. Do students see a
  green-filled matrix on the landing screen from saved history? *Blocks: whether
  `.achieved` is implemented and whether the selector reads `history`.*

- **Q-A4. Which categories carry which colour, and is the four-band grid still
  the primary view?** The brief says colour is bound to named categories, but
  the reference has no category colour at all. *Blocks: the colour token block
  and the three-axis assignment in §D3.*

- **Q-A5. Are the placement thresholds right at 100% first-try?** In Liam's
  routing, one slip on the review level drops the student a band; a clean sweep
  of three levels jumps them two. Is that the right sensitivity for Japanese,
  where a wrong particle and a wrong conjugation are not equally serious?
  *Blocks: the four-outcome routing constants; possibly a per-strand threshold.*

- **Q-A6. What should the placement messages say?** The reference praises
  ("Outstanding!", "Excellent!"). Against the no-fluff rule, should these be
  flat reports of state and next step? *Blocks: the four message strings.*

- **Q-A7. What is a "token" in Japanese for gloss purposes?** Is 洗って one
  token or 洗っ+て? Is を separate from 手? Is 〜なければならない one token?
  *Blocks: the `[[key|surface]]` authoring convention, and therefore every
  sentence authored with it — this is expensive to change later.*

- **Q-A8. Which surfaces must never show an English gloss?** The reference
  blocks translation on answer options, banks, and any item flagged
  `noTranslate`, and blocks it entirely during a meaning test. For Japanese, is
  a gloss on the stimulus acceptable during a translation-style item, or does it
  hand over the answer? *Blocks: `TR_UNIT_SEL`/`TR_BLOCK_SEL` equivalents and
  the per-item `noGloss` flag.*

- **Q-A9. Are English glosses authored per skill, per item, or in one shared
  token table?** The reference's `trCache` is session-only because it fetches;
  an authored hub needs a home for glosses. A shared table risks a word meaning
  different things in different sentences (`ballads.html` solves this with a
  `contexts` override keyed by stanza). *Blocks: the `data/skills.js` schema
  addition, hence SPEC §4/§6.*

- **Q-A10. Does the timeline replace the band matrix, or sit beside it?** In
  Liam's build the toggle swaps between them and a student sees one at a time.
  Does Andrew want both visible, or is the timeline the teacher's planning view
  and the matrix the student's practice view? *Blocks: the toggle design,
  `updateToolbar` help text, and whether `bandLabel()` indirection is needed at
  all.*
