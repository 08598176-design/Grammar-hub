# Band ladder and curriculum colour coding — design proposal

**Brief (Liam):** "we should have it in curriculum bands from prep to 12, we
should use a colour code to show vce skills separate from vic curric."

**Status:** proposal. Nothing here is a curriculum fact unless it carries a
citation to `VIC_F10_JAPANESE.md` or `VCE_STUDY_DESIGN.md`. Everything about
*which grammar sits at which level* is Andrew's ruling, and is marked
**[ANDREW]** where it matters. §7 is the ratification list.

Sources read first: `VIC_F10_JAPANESE.md`, `VCE_STUDY_DESIGN.md`,
`BANK_AUDIT.md`, `REFERENCE_PATTERNS.md`, `UNIT10_TOPIC_SOURCE.md`,
`SPEC.md` §3, `DESIGN_RULES.md` §2/§6, `collab/DESIGN_PHILOSOPHY.md`,
and the live `index.html` / `engine.js` matrix code.

---

## 0. The three findings that shaped everything below

1. **The two curricula supply exactly seven named bands, and only four of them
   are ours.** VIC F–10 has five (F–2, 3–4, 5–6, 7–8, 9–10); VCE has two
   (Units 1&2, Units 3&4). Andrew teaches 7–12, so the columns that carry real
   work are Levels 7–8, Levels 9–10, VCE 1&2, VCE 3&4. The primary three are
   real rungs of the ladder but they are not this hub's job (§3, §6).

2. **Hue cannot carry the VIC/VCE distinction in this palette.** I simulated
   protanopia, deuteranopia and tritanopia over every candidate pair (script:
   `/tmp/.../cvd.js`, method and numbers in §4.2). The correctness axis
   (`--correct #2f6a3e`, `--wrong #a83232`, the report's amber `#8a6d1e`)
   already occupies the entire warm half of the colour space that survives
   red-green colour blindness. Blue vs purple collapses to ΔE 1.0 under
   deuteranopia. Blue vs teal collapses to ΔE 0.7 under tritanopia. Blue vs
   ochre is a clean ΔE 50 from each other but ochre lands ΔE 4.7 from the
   report's amber. **There is no second hue available.** So the two curricula
   are separated by *lightness plus fill treatment plus a literal text tag*,
   inside one hue family (§4). That satisfies "never colour alone" by
   construction rather than by adding a glyph as an afterthought.

3. **"Populate every cell" would make the grid lie.** A filled rectangle
   asserts that every structure is taught at every level, including
   nominalisers at Foundation. The dashes are information, not absence (§6).

---

## 1. The column list

Internal ids are lowercase, stable, no spaces, so they survive URLs
(`?skills=…`), CSS attribute selectors, localStorage validation and CSV
exports. **Ids are not display strings.** The engine currently renders
`window.BANDS` entries straight into the column head; that must change to a
`bandLabel()` indirection (§5.1), exactly as Bone-Sparrow does it.

| # | id | Student-facing head | Student-facing long form (legend only) | Teacher-facing curriculum label | Curriculum | Default view |
|---|---|---|---|---|---|---|
| 1 | `script` | Script | Sounds and script | Foundation to Level 2 | VIC F–10 | off |
| 2 | `words` | Words | Words and set phrases | Levels 3 and 4 | VIC F–10 | off |
| 3 | `sentences` | Sentences | Simple sentences | Levels 5 and 6 | VIC F–10 | **on** |
| 4 | `choices` | Choices | Choosing the right structure | Levels 7 and 8 | VIC F–10 | **on** |
| 5 | `links` | Links | Joining and sequencing ideas | Levels 9 and 10 | VIC F–10 | **on** |
| 6 | `paragraphs` | Paragraphs | Explaining and recounting at length | VCE Units 1 and 2 | VCE Japanese SL | **on** |
| 7 | `argument` | Argument | Evaluating and persuading | VCE Units 3 and 4 | VCE Japanese SL | **on** |

Machine form:

```js
window.BANDS = ["script","words","sentences","choices","links","paragraphs","argument"];
window.BAND_META = {
  script:     { head:"Script",     long:"Sounds and script",                   teacher:"Foundation to Level 2", cur:"VIC", codes:["VC2LJ2"],  show:false },
  words:      { head:"Words",      long:"Words and set phrases",               teacher:"Levels 3 and 4",        cur:"VIC", codes:["VC2LJ4"],  show:false },
  sentences:  { head:"Sentences",  long:"Simple sentences",                    teacher:"Levels 5 and 6",        cur:"VIC", codes:["VC2LJ6"],  show:true  },
  choices:    { head:"Choices",    long:"Choosing the right structure",        teacher:"Levels 7 and 8",        cur:"VIC", codes:["VC2LJ8"],  show:true  },
  links:      { head:"Links",      long:"Joining and sequencing ideas",        teacher:"Levels 9 and 10",       cur:"VIC", codes:["VC2LJ10"], show:true  },
  paragraphs: { head:"Paragraphs", long:"Explaining and recounting at length", teacher:"VCE Units 1 and 2",     cur:"VCE", codes:[],          show:true  },
  argument:   { head:"Argument",   long:"Evaluating and persuading",           teacher:"VCE Units 3 and 4",     cur:"VCE", codes:[],          show:true  }
};
```

`codes` exists so a future teacher export can name a content description. It is
**never referenced by any DOM path** (REFERENCE_PATTERNS constraint: curriculum
codes must not reach the screen in either view).

### 1.1 Why these student-facing names

Every head is one word, because at 360px a column is about 96px wide (§5.2) and
a two-line head wrecks the row rhythm. Every head names a **unit of language**,
so the ladder reads as "what size of thing am I working on", not "how good am
I". No numbers, no mild/medium/spicy, no year levels, nothing a Year 12 has to
feel about clicking. This is the whole point of the tool for the combined
10/11/12 class (`DESIGN_PHILOSOPHY.md`: "column names are neutral… nothing is
locked").

Each name is also traceable to something the documents actually say, which is
what keeps it honest rather than cute:

- **Sentences** (L5–6): "a range of modelled grammatical structures", "a
  variety of vocabulary and sentence structures" (VC2LJ6U02, C05).
- **Choices** (L7–8): "**selecting** vocabulary, expressions and grammatical
  structures" (VC2LJ8C05). L7–8's hallmark in the document is choice among
  structures, not use of one.
- **Links** (L9–10): "complex sentences and structures", "a variety of tenses
  to **sequence** events", "structures and features to enhance meaning and
  **cohesion**" (Level 10 achievement standard). Three of the four grammar
  specifics in the entire F–10 document are about joining and sequencing.
- **Paragraphs** (U1&2): the study design's own cross-study statement, p.11:
  "In Units 1 and 2, the presentation focus is on… **narration, recounting and
  explaining** in an informative and engaging way."
- **Argument** (U3&4): same paragraph: "In Units 3 and 4, the focus is on
  integrating concepts… and presenting them to **persuade** an audience, to
  reflect and express ideas, explain a point of view or **evaluate**."

**Rejected alternative: "Step 1…Step 7".** Bone-Sparrow uses `Step N` for its
de-identified view and it works there. Here it re-introduces the exact ranking
language we are trying to remove: a Year 12 sitting in Step 3 is being told a
number about themselves. Word names are ordered left to right without being
scored. Recorded as an alternative because it is Andrew's call **[ANDREW]**.

**Rejected alternative: Liam's "Foundations / Building / VCE 1&2 / VCE 3&4".**
The first half is good; the second half prints "VCE" as the student-facing
label, which does two unwanted things at once: it tells a Year 10 that two
columns are not for them (soft locking, against philosophy §3), and it tells a
Year 12 that the column they need is not VCE. VCE stays visible, but as the
*curriculum tag* in the head and legend (§4.3), not as the column's name.

### 1.2 Migration from Band 1–4

| now | proposed | note |
|---|---|---|
| `Band 1` | `choices` | Core Particles only |
| `Band 2` | `links` | て-form I/II, た/たら/たり, Verb Stem, Core Particles (Harder) |
| `Band 3` | `paragraphs` | Plain Form I/II, ない-form, Extent |
| `Band 4` | `argument` | Conjunctions, Nominalisers, SFP, Miscellaneous, Persuasive, Comparative |

This is SPEC §3's own suggested mapping and it is mechanically safe (19 nodes,
one string each, content lane, sanity check must still print `problems 0`).

**But do not mistake the rename for the ratification.** `BANK_AUDIT.md`
established that the existing Band 1–4 ladder tracks *study-design page order*,
not difficulty: everything from SD pp.22–23 landed in Band 4, which is why
Sentence-Final Particles (ね/よ/か) and basic Conjunctions (が, から) currently
sit in the top band while being Year 7–8 material. A straight rename inherits
that defect and re-badges it as "VCE Units 3 and 4", which would be a *false
curriculum claim on screen*. So: rename mechanically to unblock the UI work,
then move rows per §6 once Andrew rules.

---

## 2. How many columns is right

**Answer: five rendered, seven defined, one at a time on a phone.**

- **Seven defined** so the ladder is complete Prep to 12, the teacher export can
  name a real curriculum band, and the data model never needs re-keying. This
  is how the brief's "prep to 12" is satisfied honestly.
- **Five rendered by default** (`sentences` … `argument`). This is the range
  Andrew actually teaches, plus one rung below Year 7 so a beginner or a
  catch-up student has a home whose on-screen name is "Sentences", not
  "Levels 5 and 6" and certainly not "primary".
- **Two off by default** (`script`, `words`), behind a teacher toggle, with
  the honest note that they will render as full-height grey (§6.3).

Convenient fact worth knowing before anyone edits CSS: `.matrix-row` is already
`grid-template-columns:128px repeat(5,1fr); min-width:620px`. It was written
for five columns. `window.BANDS` has four. **There is a dead 1fr column on the
right of every matrix row in the live app right now** — a real cosmetic bug,
and evidence that the hardcoded track count is fragile. Moving to the five-band
default needs no `.matrix-row` change at all; moving to seven needs the fix in
§5.1 or the header and body rows silently misalign (8 grid items into 6 defined
tracks means two implicit `auto` tracks whose width depends on each row's own
content).

---

## 3. Should F–2 and 3–4 collapse, or be a separate view?

**Neither: they stay defined, stay off, and if they are ever switched on they
need different rows, not collapsed ones.**

Collapsing F–2 + 3–4 + 5–6 into one "Primary" column is tempting for width but
is wrong three ways:

1. **It merges bands the curriculum keeps apart on the one axis it is actually
   concrete about: script.** F–2 copies hiragana with the chart; 3–4 creates
   with the chart; 5–6 applies conventions and punctuation and is the last band
   that names the chart at all (`VIC_F10_JAPANESE.md` §3). A merged column
   cannot say which of those a cell means.
2. **The row spine is the wrong spine for those bands.** Fourteen of the
   sixteen rows are VCE study-design grammar headings (`BANK_AUDIT.md`).
   "Nominalisers" and "Plain Form + Expressions" have no business at F–2 — and
   the F–10 curriculum names *no grammar at all* to put there, so there is not
   even a list to draw from. What F–2 and 3–4 need is a script and sound spine
   (kana production, the three scripts and their roles, sound combinations),
   which is a different set of rows and therefore a different view.
3. **Nobody in this project teaches primary Japanese.** Building two columns
   that will stay empty is the opposite of the honest-UI rule.

So the recommendation is: keep `script` and `words` in `BANDS` with
`show:false`, document why, and if Andrew ever wants primary content, build it
as a **separate view with its own rows** (the same way the timeline view in
Bone-Sparrow is a sibling renderer over the same selection state, not a
squeezed variant of the grid).

One thing this does buy us cheaply: a Year 7 beginner who cannot yet read a
sentence is not stranded. `sentences` is on by default and its cells hold
particle and polite-form basics.

---

## 4. Colour coding: VIC vs VCE

### 4.1 What the colour is bound to

**The colour is bound to the column, and the column's curriculum is a
documented fact, not a judgement.** Bands 1–5 are defined by the Victorian
Curriculum F–10 Japanese sequence; bands 6–7 are defined by the VCE Japanese
Second Language study design. Nothing about the *content* of a cell is being
colour-coded, because "which document prescribes this grammar point" is a
separate, judgement-laden claim that gets its own treatment (§4.5).

This matters. If colour were bound to content, every cell would need a ruling
before it could be painted. Bound to the column, the legend is true on day one
and stays true.

### 4.2 The palette, and why hue is not doing the work

Reserved and untouchable (`DESIGN_RULES.md` §2 plus the report CSS):

| token | value | axis |
|---|---|---|
| `--accent` | `#a83232` | selection / targets / links |
| `--wrong` | `#a83232` | correctness (identical to accent) |
| `--correct` | `#2f6a3e` | correctness |
| report amber | `#8a6d1e` on `#f6efda` | correctness (partial) |
| `--okbg` / `--badbg` | `#eef5ee` / `#f7ecec` | correctness surfaces |

I simulated every candidate through Viénot dichromat matrices and measured
CIE ΔE against each reserved colour and against each other. Full run:
`scratchpad/cvd.js`. Headline numbers:

| candidate pair | normal | protan | deutan | tritan | verdict |
|---|---|---|---|---|---|
| indigo `#2f4b8f` vs violet `#6a3d8f` | 23 | **3** | **8** | 29 | fails |
| indigo `#2f4b8f` vs purple `#6d3f8c` | 23 | **1** | **11** | 31 | fails |
| slate `#2f5d8f` vs teal `#12666e` | 30 | 25 | 22 | **1** | fails |
| slate `#2f5d8f` vs ochre `#8a5a10` | 80 | 76 | 86 | 50 | pair fine, **but ochre is ΔE 4.7 from report amber under deutan** — fails |
| slate `#2f5d8f` vs brown `#6b4f2a` | 59 | 58 | 65 | 41 | pair fine, **but brown is ΔE 6–9 from `--wrong` and `--correct` under protan/deutan** — fails |

That is the whole usable space. The conclusion is structural, not a matter of
taste: **the correctness axis owns every warm hue that survives red-green
colour blindness, so the curriculum axis cannot have a second hue.**

The fix is to encode the curriculum on channels that colour blindness does not
touch at all: **lightness, fill, and a word.**

```css
:root{
  /* existing tokens unchanged … */

  /* ---- curriculum axis: WHICH DOCUMENT defines this column ----
     One hue family on purpose. VIC and VCE are separated by lightness and by
     outline-vs-fill, never by hue, because the correctness axis already owns
     every colour-blind-safe warm hue. Never use these for correctness or for
     selection. Never use --accent/--correct/--wrong for a curriculum. */
  --vic:#2f6fa8;       /* VIC F-10: column rule, tag text, cell top edge */
  --vce:#16375e;       /* VCE Units 1-4: solid column head fill, cell top edge */
  --vce-ink:#fbf7ee;   /* text on the VCE fill */
  --prog:#6b6256;      /* school-designed, no curriculum claim (= --muted) */
}
```

Measured properties of that pair (light mode, `--bg #f4efe6`, `--paper #fbf7ee`):

| | `--vic #2f6fa8` | `--vce #16375e` |
|---|---|---|
| L* | 45.4 | 22.7 |
| contrast on `--bg` | 4.63 (AA normal text) | 10.52 |
| contrast on `--paper` | 4.96 | 11.27 |
| white text on it | 5.30 | 12.05 (AA large and normal) |
| ΔE to `--accent` / `--wrong` | 81 / 54 / 78 / 84 | 73 / 44 / 69 / 75 |
| ΔE to `--correct` | 63 / 60 / 61 / **15** | 59 / 54 / 51 / **17** |
| ΔE to report amber | 82 / 81 / 91 / 47 | 77 / 75 / 83 / 43 |

(four numbers = normal / protan / deutan / tritan)

**VIC vs VCE separation: ΔE 25 under all four vision types**, because the
separation is lightness-based and lightness is preserved by every form of
colour blindness. Greyscale luminance ratio 2.27:1, so it also survives a
photocopy and a print stylesheet.

The one soft number is ΔE 15–17 from `--correct` under **tritanopia** (blue-
yellow, rarest form, roughly 1 in 10,000). Mitigations are already structural:
correctness lives on the cell *background* at very low saturation
(`--okbg #eef5ee`) and always with a ✓/✗ glyph and text (`DESIGN_RULES` §6),
while the curriculum lives on the column *head* as a saturated fill or rule
plus the literal word VIC or VCE. Different channel, different location,
different shape, and one of them is a word.

### 4.3 How it renders

Component CSS, not token lane:

```css
/* column head: VIC = outline + rule, VCE = solid fill. */
.colhead[data-cur="VIC"]{ border-bottom:3px solid var(--vic); color:var(--ink); }
.colhead[data-cur="VCE"]{ background:var(--vce); color:var(--vce-ink);
                          border-bottom:3px double var(--vce); border-radius:7px 7px 0 0; }
.cur-tag{ display:block; font-size:9px; font-weight:800; letter-spacing:.4px; }
.colhead[data-cur="VIC"] .cur-tag{ color:var(--vic); }

/* cell edges: TOP edge = the column axis. Left edge stays free for the row
   (category) axis, so the two axes never share a border. */
.matrix-cell[data-cur="VIC"]{ border-top:3px solid var(--vic); }
.matrix-cell[data-cur="VCE"]{ border-top:3px double var(--vce); }

/* the handover seam: the one boundary a teacher looks for */
.matrix-cell[data-seam]{ border-left:2px solid var(--vce); }
```

Three independent channels carry the same fact: **fill** (VCE filled, VIC not),
**lightness** (L* 22.7 vs 45.4), **word** (the `VIC` / `VCE` tag under every
head). Border style (solid vs double) is a fourth, free.

The **seam** between `links` and `paragraphs` is the single most useful mark on
the grid: it is where F–10 hands over to VCE, and `VIC_F10_JAPANESE.md` §7
notes that this is the boundary the curriculum itself draws (complex sentences,
tenses, cohesion and formality all first appear at Levels 9–10).

Legend, printed once under the matrix, no em dashes, plain instruction voice:

> **Columns.** The first three columns come from the Victorian Curriculum F–10
> Japanese (**VIC**). The last two come from the VCE Japanese Second Language
> study design (**VCE**). Nothing is locked. Work in any column you like.

Plus a "What are these columns?" disclosure that lists the seven long forms
against their teacher labels. That is where a student who wants to know what
"Links" means finds out it is Levels 9 and 10. Honest, but not the headline.

### 4.4 Dark mode

The hub has **no dark mode at all today** — there is no `prefers-color-scheme`
block anywhere in `index.html` (nor in Bone-Sparrow). So the dark values below
are reserved, not shippable in isolation: a `#c9dcef` fill on a cream page
would be nonsense. Ship light-only now, land these with the app-wide dark
palette as one token-lane commit.

```css
@media (prefers-color-scheme: dark){
  :root{
    --vic:#5f97c6;      /* rule and tag on a dark card: 5.58 on #1b1a17 */
    --vce:#c9dcef;      /* fill inverts: light fill, dark text */
    --vce-ink:#16233a;  /* 11.2 contrast on that fill */
    --prog:#a49a8b;
  }
}
```

Dark-mode separation: L* 60.5 vs 86.9, luminance ratio 2.22:1, ΔE 21–25 across
all four vision types. The *treatment* also inverts consistently: in both modes
VCE is the filled one and VIC is the outlined one, so the learned rule
("filled means VCE") holds across themes.

### 4.5 When a cell belongs to both curricula

This is real and common. て-form, たら, plain form and ことができる are taught in
Years 9–10 **and** are on the VCE prescribed grammar list; the VCE lists are
common to Units 1–4 and prescribe no order (`VCE_STUDY_DESIGN.md` §2). The
grid cannot show that with the column colour, because the column is one
curriculum by definition.

**Decision: the cell keeps its column's curriculum colour and carries a small
outlined tag naming the other one.** A cell in the `links` column whose row is
VCE-prescribed shows a `VCE` chip drawn in `--vce` as an outline (never a
fill — fill is reserved for the head, so a chip can never be mistaken for a
column head).

```css
.dual-chip{ border:1px solid var(--vce); color:var(--vce);
            font-size:9px; font-weight:800; border-radius:8px; padding:0 4px; }
.prog-chip{ border:1px dotted var(--prog); color:var(--prog); /* same box */ }
```

with the honest sentence in the legend and in the cell's `title`/`aria-label`:

> Levels 9 and 10 work. This structure is also on the VCE prescribed grammar
> list.

**Data model.** Dual-ness is a property of the **row**, not the cell, because
`BANK_AUDIT.md` established that 14 of the 16 rows *are* VCE study-design
grammar section headings. So it is one flag per category, ratified once:

```js
window.CATEGORY_META = {
  "Core Particles": { prescribedBy:"VCE" },      // SD pp.21-22
  …
  "Persuasive & Evaluative Expressions": { prescribedBy:"PROGRAM" },
  "Comparative & Analytical Expressions": { prescribedBy:"PROGRAM" }
};
```

Three values, and the third is the honest degradation in the other direction:
a cell sitting in a **VCE** column whose row is in **neither** document (the two
writing-scaffold rows, which `BANK_AUDIT.md` calls the best original work in
the bank) gets the dotted `--prog` chip and the line:

> Not on the VCE prescribed grammar list. School-designed scaffold for Unit 3
> and Unit 4 writing.

That sentence is the difference between a tool a moderator trusts and a tool
that quietly over-claims. It also answers `VCE_STUDY_DESIGN.md` §10 Q4
(prescribed vs enrichment) at the UI level.

**Rejected: duplicating the skill node into both columns.** It doubles the
maintenance, double-counts in the report, and asserts two separate teaching
events where there is one. **Rejected: split-diagonal two-tone cells.** Pretty,
hue-dependent, and it competes with the correctness backgrounds.

### 4.6 One conflict this exposes, which is worth fixing while we are here

`.has-items.selected{ border-color:var(--accent); background:var(--accent) }`
— selection currently paints the **whole cell background** in accent red. That
is the same channel correctness uses in the report, and it will fight the
curriculum edge. Bone-Sparrow solved this already: selection is an
`outline:2px solid var(--accent); outline-offset:-2px`, deliberately chosen "so
it composes with any state" (`REFERENCE_PATTERNS.md`). Recommend adopting the
outline plus a light tint. Small engine/screens-lane change, and it makes all
three axes composable: **background = correctness, outline = selection, top
edge = curriculum, left edge/row label = category.**

---

## 5. Making it usable at 360px

### 5.1 Fixes that must land with the band change

1. **Track count must come from the data.**
   ```css
   .matrix-row{ display:grid;
     grid-template-columns:var(--label-w,128px) repeat(var(--band-count,5),minmax(84px,1fr));
     gap:4px; min-width:calc(var(--label-w,128px) + var(--band-count,5) * 96px); }
   ```
   with `document.documentElement.style.setProperty('--band-count', visibleBands.length)`
   in `buildMatrix()`. Without this, seven bands misalign the header against the
   body rows (8 items into 6 defined tracks).
2. **Sticky row label.** `.rowlabel{ position:sticky; left:0; z-index:2 }`. It
   already has `background:var(--bg)`, so it will not smear. Without this,
   horizontal scrolling loses the row name and the grid becomes unreadable.
3. **`bandLabel(id)` indirection** in the engine: heads render
   `BAND_META[id].head` plus the `VIC`/`VCE` tag; **teacher CSV/TSV exports
   write `BAND_META[id].teacher`** (the raw canonical band), never the student
   head. This is the Bone-Sparrow contract and it is what makes the export
   defensible to a moderator while the screen stays neutral.
4. **Reclaim 24px on narrow screens:** `@media(max-width:480px){ .container{padding:14px} }`.
   At 360px the container's 26px padding is costing about 9% of the viewport.

### 5.2 The width arithmetic, honestly

At a 360px viewport: 360 − 32 (body padding) − 52 (container padding) = **276px
of usable width**. After the §5.1 padding fix, 304px.

| columns | row min-width | horizontal scroll at 360px |
|---|---|---|
| 4 (today) | 620px (dead track) | 1.1 screens |
| 5 (proposed default) | 608px | 1.0 screen |
| 7 (all bands on) | 800px | **1.6 screens, plus 16 rows of vertical scroll** |

Five columns with a sticky row label is genuinely usable: you swipe once. Seven
is not, and no amount of CSS makes a 16×7 grid work in 276px.

### 5.3 So on a phone the matrix stops being a matrix

At `max-width:600px`, render **band-focus mode**: the column heads become a
horizontally scrollable chip row (seven one-word chips fit comfortably, and the
chips carry the VIC/VCE treatment from §4.3, so the legend still works), and the
grid collapses to **one column**: the selected band's cell for each of the 16
rows, as a list with the row name on the left.

This is the honest degradation. A pinch-zoomed 7-column grid is not a smaller
version of the tool, it is a broken one. Band-focus mode also happens to match
how a phone user actually behaves: they are working in one band.

Two properties to preserve, both from `REFERENCE_PATTERNS.md`: the chip row and
the grid must **write the same selection state** (or placement, scoring and the
report silently fork), and the empty cells must stay visible in the list with
their dash, so the student can still see that the row exists at other bands.

### 5.4 Grey cells must say why

Today `.empty` renders a bare dash and is not clickable. With a curriculum
ladder, a dash acquires meaning and should state it:
`title`/`aria-label` = "Not introduced at this level. This row starts at
Choices." That is `DESIGN_PHILOSOPHY` §5 (say the honest thing) at near-zero
cost, and it prevents a grey cell reading as "locked".

---

## 6. Reality check on "populate every cell"

### 6.1 The argument from the curriculum

**16 rows × 7 bands = 112 cells.** At the bank's current density (10–14 items
per cell) that is 1,100 to 1,500 items. But the cost is not the objection. The
objections are:

1. **A filled rectangle makes a false claim.** A live cell says "this is taught
   and practised at this level". Nominalisers at Foundation to Level 2 is not a
   defensible claim about any Victorian classroom, and the F–10 curriculum
   names *no grammar at all* at any band (`VIC_F10_JAPANESE.md` §0), so there
   is nothing to cite in its defence.
2. **A filled rectangle carries no information.** If every cell is live, the
   grid tells a student nothing about sequence and the left-to-right axis stops
   meaning anything. The dashes are the progression.
3. **Nothing new enters at the top.** The VCE grammar list is common to Units
   1–4 and explicitly unordered (`VCE_STUDY_DESIGN.md` §2, p.10: "There is no
   prescribed order in which this learning should occur"). So the `argument`
   column cannot legitimately *introduce* prescribed grammar. What belongs
   there is consolidation, plus the two writing-scaffold rows that exist for
   Unit 3 and Unit 4 outcomes.

The opposite failure is the one we currently have, and Q3 in
`QUESTIONS_FOR_ANDREW.md` already names it: **every row has content in exactly
one band**, so the matrix is a list of 16 topics in fancy dress. 16 live cells
out of 64 (25%), every row a single cell.

### 6.2 The honest shape

**A staircase with overlap.** Each row enters at one band and stays live for
two, sometimes three, then goes grey. Read down a column and you see what is
being taught now; read along a row and you see the same skill getting harder;
read the diagonal and you see the course. Target density is roughly **40% of
rendered cells**, about 33 live cells over the five rendered columns, versus 16
today.

Three marks:

- **FILL** — authored items, live cell.
- **GREY** — legitimately not introduced at this band. Renders as the existing
  dash, with the §5.4 explanation. Never locked: the row's content is one click
  away in another column.
- **STRETCH** — optional extension, live cell, flagged in the cell as
  extension. No new colour: dotted cell border and the word "extension". This
  is where `たり〜たり` goes (Andrew's own Unit 10 files mark it explicitly as
  extension, not core — `UNIT10_TOPIC_SOURCE.md`), and where prescribed-list
  items that a strong Year 10 can reach early go.

### 6.3 The two primary columns

**Every row is GREY at `script` and `words`, by design, permanently.** Not
"not yet authored" — structurally wrong content for those bands (§3). If they
are ever switched on, they need a script and sound spine of their own. This is
recorded so that a future contributor does not read those columns as a backlog.

### 6.4 Target coverage map

Columns are the five rendered bands: **S**=Sentences (L5–6), **C**=Choices
(L7–8), **L**=Links (L9–10), **P**=Paragraphs (U1&2), **A**=Argument (U3&4).

Reading the Evidence column: *SD* = the placement follows the VCE study
design's own grouping; *VIC* = a Tier A clause from the F–10 document;
*repo* = evidence from Andrew's own files; *proposal* = my reasoning, needs
ratification. **Everything in this table is a proposal about sequence, and
sequence is Andrew's** — the study design prescribes none and the F–10
curriculum names no grammar.

| # | Row | S | C | L | P | A | Evidence / note |
|---|---|:-:|:-:|:-:|:-:|:-:|---|
| 1 | Core Particles | FILL | FILL | FILL | STRETCH | GREY | SD pp.21–22. S = は・を・に・で basics. C = absorbs today's "Harder" row (に vs で vs へ). L = が in a subordinate clause (SD lists it; it is literally a complex sentence). P = から/まで/までに, the block with no home today. |
| 2 | て-form I (making the form) | GREY | FILL | FILL | GREY | GREY | SD p.17. Form-making must precede selection, so entry at C (VIC L7–8 "selecting … grammatical structures"). L consolidates irregulars. **proposal** |
| 3 | て-form II (what attaches) | GREY | FILL | FILL | STRETCH | GREY | SD p.17. C = てください / ています / てもいい. L = てから / ても / てしまう / てみる (clause joining, VIC L9–10 "complex structures"). **proposal** |
| 4 | た／たら／たり | GREY | FILL | FILL | STRETCH | GREY | SD p.18. たり〜たり is STRETCH-tagged wherever it lands (*repo*: Andrew's Unit 10 files mark it extension). たら is a conditional and belongs with the other three (§6.5). |
| 5 | Verb Stem forms | GREY | FILL | FILL | STRETCH | GREY | SD p.20. C = たい, に行く. L = ながら, すぎる, やすい/にくい, かた. P = STEM+そう appearance. **proposal** |
| 6 | Plain Form + Expressions I | GREY | GREY | FILL | FILL | GREY | SD p.19. Requires row 17 first. *repo*: Andrew's Year 9 teaches plain form verbs, so L entry is evidence-backed; *VIC*: L9–10 is where formality first appears. |
| 7 | Plain Form + Expressions II | GREY | GREY | STRETCH | FILL | STRETCH | SD p.19. Subordination and quotation (とき/ために/ように/し/PF+Noun/と思う). A = STRETCH only for んです and はず/べき in evaluative writing. **proposal** |
| 8 | ない-form | GREY | FILL | FILL | GREY | GREY | SD p.20. Only three prescribed items; splitting it from row 4's minimal pairs is a defect `BANK_AUDIT.md` already flags. **proposal** |
| 9 | Words Indicating Extent | FILL | FILL | STRETCH | GREY | GREY | SD p.22. S = ごろ, ぐらい, だけ. C = しか, より, 一番. VCAA's own grab-bag heading; keep the heading, fix the level. |
| 10 | Conjunctions | GREY | FILL | FILL | STRETCH | GREY | SD p.22. C = が, から (Year 7–8 material currently sitting in the top band). L = ので, と, のに, けれども. *VIC*: L9–10 cohesion. |
| 11 | Nominalisers | GREY | GREY | FILL | FILL | GREY | SD p.23. *repo*: ことができる / ことが好き is Andrew's Year 9 Unit 10, so L is evidence-backed. P = ことにする / ことになる. |
| 12 | Sentence-Final Particles | FILL | FILL | STRETCH | GREY | GREY | SD p.23. S = か. C = ね / よ. L = の as soft question (register). Currently in the top band, which `BANK_AUDIT.md` calls Year 7–8 material. |
| 13 | Miscellaneous | GREY | FILL | FILL | FILL | GREY | SD p.23. C = のほう comparison. L = potential form (a whole paradigm; today it has one ichidan item hiding in a leftovers drawer). P = ば, というNoun. **`BANK_AUDIT.md` recommends dissolving this row; if that happens the marks move with the items.** |
| 14 | Core Particles (Harder) | — | — | — | — | — | **Delete.** It is row 1 at a second level, mis-implemented as a second row. Two lines of content lane: set `category:"Core Particles"`, `band:"choices"`, drop the CATEGORIES entry. This is the ladder's first real row-spanning-two-bands and it is free. |
| 15 | Persuasive & Evaluative | GREY | GREY | GREY | STRETCH | FILL | Not prescribed; school-designed (`--prog` chip). Maps to U4 O3 evaluative or persuasive writing, ~500-ji. |
| 16 | Comparative & Analytical | GREY | GREY | GREY | FILL | FILL | Not prescribed; school-designed. Maps to U3 O2 / U4 O2 interpret-and-analyse outcomes. |

**Proposed new rows** (from `BANK_AUDIT.md`'s coverage gaps; they are prescribed
SD sections with no home, and the ladder makes their placement obvious). Row
design is a separate job, but the ladder assumes them:

| # | Row | S | C | L | P | A | Evidence / note |
|---|---|:-:|:-:|:-:|:-:|:-:|---|
| 17 | Plain finite forms | GREY | STRETCH | FILL | FILL | GREY | SD p.15. **Prerequisite for 48 existing items across four rows.** Without it the report cannot tell "does not know つもり" from "cannot make plain form". |
| 18 | Polite finite forms | FILL | FILL | GREY | GREY | GREY | SD p.16, including ～く／～に + なります. The genuine bottom of the ladder and the natural first fill for `sentences`. |
| 19 | て + giving and receiving | GREY | GREY | STRETCH | FILL | STRETCH | SD p.17. Five prescribed items, no home today; `BANK_AUDIT.md` calls it the highest-value single gap (uchi-soto). |

**Not missing, do not add:** passive, causative, causative-passive, keigo beyond
the giving/receiving set, imperatives, なら, ておく, てある, transitive/
intransitive pairs, counters. None is in the prescribed list
(`VCE_STUDY_DESIGN.md` §4.15). A JLPT-shaped intuition will demand them; the
study design does not.

**Resulting shape** (rows 1–13, 15–16 plus 17–19, over five columns):
about 34 FILL and 12 STRETCH out of 90 rendered cells. Every row has 2–3 live
cells. No column is full. No row spans all five. That is the staircase.

### 6.5 The one progression cut the ladder should fix first

`BANK_AUDIT.md`'s biggest finding: the four conditionals are scattered across
three rows and two bands (たら in row 4, と in row 10, ば in row 13, なら absent
because it is not prescribed) and **no item ever compares them**. A band ladder
does not fix that on its own — it is a row problem. But it is worth naming here
because the temptation, once there are seven columns, is to spread rather than
consolidate. Recommend flagging it to whoever does the row-spine task.

### 6.6 Build order

1. **Free, today, content lane:** merge row 14 into row 1 (§6.4). One row now
   spans two bands, and the matrix does its job for the first time.
2. **Cheap, high diagnostic value:** rows 17 and 18 (plain and polite finite
   forms). They unblock the report's ability to distinguish a missing
   prerequisite from a missing expression.
3. **Everything else** in the order Andrew's Q3 answer gives ("where do your
   Year 10s actually bleed marks when they hit VCE").

---

## 7. What Andrew must ratify before this ships

Ordered by what blocks the most work. Each is a **[ANDREW]** item; none can be
answered by reading a document we have.

1. **F–10 Sequence or 7–10 Sequence?** The repo has the F–10 Sequence, which
   assumes Japanese from Foundation. If his students start in Year 7, VCAA
   publishes a separate 7–10 Sequence (not in the repo, and its existence is
   inferred, not verified) and the Levels 7–8 / 9–10 expectations behind the
   `choices` and `links` columns are the wrong ones. **This blocks the meaning
   of two of the five columns.** Already raised as QA in `VIC_F10_JAPANESE.md`.
2. **The seven column names.** Script / Words / Sentences / Choices / Links /
   Paragraphs / Argument. Does a Year 12 click "Links" without flinching? Does
   a Year 10 understand "Choices"? Alternatives on the table: Step 1–7, or
   Liam's Foundations / Building / VCE 1&2 / VCE 3&4.
3. **May the word VCE appear on a student's screen?** The proposal shows VIC
   and VCE tags on the column heads for everyone. Two live alternatives: tags
   for teachers only (a toggle), or no tags at all with the curriculum shown
   only in the legend. This decides whether §4 is a student-facing feature or a
   teacher-facing one.
4. **Is the `argument` column correct in introducing no new prescribed
   grammar?** My claim is that the VCE grammar list is common to Units 1–4 and
   unordered, so Units 3&4 is consolidation plus the two writing-scaffold rows.
   If Andrew teaches specific structures only in Year 12, the map is wrong.
5. **The entry band for each row** (the coverage map, §6.4). Highest-value
   individual rulings: て-form, plain form, potential form, ば, and whether
   Sentence-Final Particles and basic Conjunctions really do move down two
   columns as `BANK_AUDIT.md`'s evidence suggests.
6. **The three missing rows** (plain finite forms, polite finite forms,
   て + giving and receiving) and where they enter.
7. **Merging Core Particles (Harder) into Core Particles.** Two lines, content
   lane, and it is the first row that spans two bands.
8. **Should the primary columns render at all?** Proposal: defined, off,
   documented. If he wants them visible, they need their own rows (§3).
9. **Is the 2019 VCE study design still the current one?** Two of the seven
   columns are labelled "VCE Units 1 and 2" / "VCE Units 3 and 4" on the
   teacher side; that label and the prescribed lists behind it rest on the
   accreditation question already open in `VCE_STUDY_DESIGN.md` §0.
10. **Dual-cell wording.** "This structure is also on the VCE prescribed
    grammar list" and "School-designed scaffold, not on the VCE prescribed
    list" are curriculum claims printed on screen. He signs them off, or
    rewrites them.

---

## 8. Risks

- **The rename invalidates saved state.** Band ids change from `Band 1–4` to
  words. Any localStorage restore must re-validate the saved selection against
  the current `window.BANDS` and delete stale entries
  (`REFERENCE_PATTERNS.md`); the storage key needs its version bumped in both
  the key and the payload. Persistence is not implemented yet, so land the
  ladder **before** persistence and this costs nothing.
- **The hardcoded `repeat(5,1fr)`** misaligns header and body the moment
  `BANDS.length !== 5`. §5.1 item 1 is not optional.
- **Colour safety is lightness-based, so a future theme tweak breaks it
  silently.** If someone lightens `--vce` for aesthetics, the VIC/VCE
  distinction disappears for every colour-blind user at once, with no visible
  symptom for everyone else. The rule ("VIC and VCE must stay at least 2:1 in
  luminance and must never share a hue with correctness") belongs in
  `DESIGN_RULES.md` §2 alongside the token table, not just in this file.
- **A mechanical Band 1–4 rename re-badges a page-order ladder as curriculum
  bands.** The current top band contains Year 7–8 material; calling it "VCE
  Units 3 and 4" on a teacher export before §6.4 is ratified would be a false
  claim in a document that goes to a moderator.
- **If Andrew reports against the 7–10 Sequence**, the two F–10 secondary
  columns shift down in expectation and parts of the map move with them.
- **Band-focus mode forks the selection path.** If the phone renderer does not
  write the same `selectedSkills` state as the grid, placement, scoring and the
  report silently diverge (this is exactly the failure the reference build
  avoids by having both views call the same setters).

---

## 9. What this proposal does not decide

- Which grammar point sits at which band (§6.4 is a proposal; the F–10
  curriculum names none, and the study design prescribes no order).
- The row spine itself (a separate job; this design assumes rows 14 merges and
  17–19 are added, and degrades gracefully if they are not).
- Which kanji may render at which band. The F–10 document permits kanji at
  every band including Foundation, so there is **no band-based ban on kanji**;
  the real gate is which kanji the class has met, which is a program fact and
  is open as QB in `VIC_F10_JAPANESE.md`.
- Whether typed Japanese input is fair at the lower bands (Q4). The ladder
  changes the shape of that question — `sentences` and `choices` are exactly
  the columns where tap-to-choose task types may need to replace typing — but
  does not answer it.
- The app-wide dark palette (§4.4). The two curriculum tokens are reserved; the
  base palette is a separate token-lane decision.
