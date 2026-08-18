# BANK_AUDIT.md — audit of `data/skills.js`

Audit of the existing content bank: 19 skill nodes, 252 items, 16 matrix
categories x 4 bands, plus 2 pool categories. Written against the file as it
stands (Aug 2026). Every count in this document was produced by running node
over the actual data, not by eye.

**Status of claims.** Facts about the file are verified. Facts about the VCE
study design come from `2019JapaneseSLSD.pdf` in this repo (pages 14 through
23), which I extracted directly, so they are firmer than the brief expected.
Anything that is a pedagogical judgement call is marked as such and routed to
the questions list in section 8. Nothing in this document has been changed in
the bank.

---

## 1. The headline finding

**The 16-row category spine is not Andrew's invention and it is not arbitrary.
It is the VCE Japanese Second Language study design's own grammar section
headings, reproduced almost verbatim, in the study design's own order, using
the study design's own example sentences.**

The study design's grammar list (2019 SD, pp.15-23) is organised under these
headings:

| # | Study design heading (p.) | Bank category |
|---|---|---|
| 1 | Finite forms – plain forms (15) | **no row** |
| 2 | Finite forms – polite forms (16) | **no row** |
| 3 | て form (17-18) | `て-form I` + `て-form II` (split) |
| 4 | て form + verbs of giving and receiving (18) | **no row** |
| 5 | ～た、～たら、～たり forms (19) | `た／たら／たり forms` |
| 6 | Plain form (PF) – past and present (19-20) | `Plain Form + Expressions I` + `II` (split) |
| 7 | ～ない form (20) | `ない-form` |
| 8 | Verb stem (20) | `Verb Stem forms` |
| 9 | Particles / Noun and Particle (21-22) | `Core Particles` + `Core Particles (Harder: に・で・へ)` (split) |
| 10 | Word indicating extent (22) | `Words Indicating Extent` |
| 11 | Conjunctions (following non-final verbs) (22) | `Conjunctions` |
| 12 | Nominalisers (23) | `Nominalisers` |
| 13 | Sentence final particles (23) | `Sentence-Final Particles` |
| 14 | Miscellaneous (23) | `Miscellaneous` |
| — | *not in the SD grammar list* | `Persuasive & Evaluative Expressions` |
| — | *not in the SD grammar list* | `Comparative & Analytical Expressions` |

So: 14 study design sections become 11 categories with three of them split in
two (giving 14 rows), plus 2 rows Andrew wrote himself for the Units 3&4
writing and analysis work. That is the whole spine.

The dependency runs deeper than the headings. The example sentences are
VCAA's:

| Bank | Study design |
|---|---|
| `日本語で話してみます。` (て-II) | `日本語で話してみます。` (p.17) |
| `あの人は一時間でその本を読んでしまいました。` | identical (p.17) |
| `まだ帰ってはいけません。` | identical (p.17) |
| `たくさん食べてもふとりません。` | identical (p.18) |
| `いつも勉強してからテレビを見ます。` | identical (p.18) |
| `コーラはあまり飲まないほうがいいです。` | identical (p.20) |
| `せいふくを着なくてもいいです。` | identical (p.20) |
| `このペンは書きやすいです。` | identical (p.20) |
| `このシャツを買いたいです。` | identical (p.20) |
| `だれがそう言いましたか。` `いぬはベッドの上にいます。` `先生にあげてください。` `三時半に行きましょう。` `すしを食べます。` `道を歩きます。` `町で買い物をしました。` `はしで食べました。` `家族と日本に行きました。` `スーパーでりんごやバナナを買いました。` `ペンかえんぴつをとってください。` `犬もねこもいません。` | all identical (pp.21-22) |
| `姉は三時ごろ帰ります。` `五百グラムぐらいでけっこうです。` `千円しかありません。` `一人だけです。` `車はバスより早いです。` `これが一番好きです。` | all identical (p.22) |
| all six Conjunctions stimuli | all identical (p.22) |
| `りょうりをするのは楽しいです。` `漢字をおぼえることはむずかしいですか。` | identical (p.23) |
| all four Sentence-Final stimuli | identical (p.23) |
| all four `Miscellaneous` stimuli | identical (p.23) |
| `電車は八時に着くはずです。` `明日テストだから、今日勉強するべきです。` `車を買うためにお金をためています。` `かぜをひかないように手を洗いましょう。` `きのう見たえいがはおもしろかったです。` `明日テストがあるんです。` `だれかがここでキャンプをしたらしいです。` `明日は雪になるでしょう。` `テレビを見るより本を読むほうが楽しいです。` | all identical (pp.19-20) |

**This changes what "critique the spine" means.** Most of what looks arbitrary
in the spine is VCAA's arbitrariness faithfully reproduced. Andrew has built
an assessment-aligned artefact, not a linguistics artefact, and he can point
at the study design for nearly every row. Any restructuring proposal has to
answer the question "what do I tell a moderator?" before it answers "what
would a linguist say?".

The corollary is the useful one: **the places where the bank departs from the
study design are Andrew's own pedagogical judgements, and those are where the
real design decisions live.** There are exactly five: the three splits, and
the two extra rows.

---

## 2. Complete inventory

252 items across 19 nodes. `problems 0` on the SPEC §9 sanity check
(re-run and confirmed). No duplicate `category`+`band` among progression
nodes. Every node has `introduced:true`, `resources:null`, `example` set.

### 2.1 Progression nodes (16 categories, 16 nodes, one node per category)

| id | category | band | items | types | grammar points the items actually cover |
|---|---|---|---|---|---|
| `particles-b1-core` | Core Particles | 1 | 23 | 9 identify, 11 gapfill, 3 order | は topic; は contrast; が question-word subject; が with 好き; の possession; の locational (の上); に destination; に time; に indirect object; へ direction; を object; を path of motion; で place of action; で means; と with-a-person; と exhaustive list; や non-exhaustive list; か "or"; も also; も neither-nor; SOV word order x3 |
| `te-form-b2-core` | て-form I | 2 | 11 | 3 identify, 3 transform, 5 gapfill | て sequence; てください request; ています progressive. Conjugation drills: す→して, つ→って, ichidan る-drop, く→いて, む→んで, う-verb る→って |
| `te-form-b2-extended` | て-form II | 2 | 14 | 7 identify, 7 gapfill | てみる; てしまう; てくる/ていく; てはいけない/てはだめ; てもいい; ても concessive; てから. **All 7 gapfills are bare て-form conjugation, not construction production** (see 7.3) |
| `ta-tara-tari-b2` | た／たら／たり forms | 2 | 10 | 5 identify, 5 gapfill | たほうがいい; たことがある; たあとで; たら; たり〜たり. Conjugation: む→んだ, ichidan, う→った, く→いたら, す→したり |
| `verb-stem-b2` | Verb Stem forms | 2 | 18 | 9 identify, 9 gapfill | STEM+そう (appearance); かた; にくい; やすい; たい; たいと思っている; に行く; ながら; すぎる. **Complete against the SD's 9 rows** |
| `particles-harder-b2` | Core Particles (Harder: に・で・へ) | 2 | 10 | 2 identify, 8 gapfill | に existence (with ある/いる) vs で place-of-action; で means; に/へ destination interchangeability; に time (and not doubling に with へ); に indirect object |
| `plain-form-expr-1-b3` | Plain Form + Expressions I | 3 | 14 | 7 identify, 7 gapfill | PF+そう (hearsay); つもり; とき; より; かもしれない; でしょう; と言う / と思う. **あいだ and まえ are named in the node title but have no items** |
| `plain-form-expr-2-b3` | Plain Form + Expressions II | 3 | 14 | 7 identify, 7 gapfill | ために; ように; し; PF+Noun (relative clause); んです; らしい; はず; べき. **ようです is named in the node title ("よう") but has no items** |
| `nai-form-b3` | ない-form | 3 | 6 | 3 identify, 3 gapfill | ないほうがいい; なければならない; なくてもいい. **Thinnest node in the bank** |
| `extent-b3` | Words Indicating Extent | 3 | 12 | 6 identify, 6 gapfill | ごろ; ぐらい/くらい; しか; だけ; より; 一番 |
| `conjunctions-b4` | Conjunctions | 4 | 12 | 6 identify, 6 gapfill | が; けれども/けれど/けど; から; ので; と (automatic result); のに |
| `nominalisers-b4` | Nominalisers | 4 | 10 | 5 identify, 5 gapfill | の; こと; ことができる; ことにする; ことになる |
| `sentence-final-b4` | Sentence-Final Particles | 4 | 8 | 4 identify, 4 gapfill | ね/ねえ; よ; か; の (soft question) |
| `misc-b4` | Miscellaneous | 4 | 8 | 4 identify, 4 gapfill | potential form; ば conditional; NAMEというNOUN; のほう |
| `persuasive-evaluative-b4` | Persuasive & Evaluative Expressions | 4 | 14 | 7 identify, 7 gapfill | 一方で; たしかに〜ですが; という点でこうかてき; とはかぎりません; 全体的に考えると; ぜひ〜てください; のではなく |
| `comparative-analytical-b4` | Comparative & Analytical Expressions | 4 | 12 | 6 identify, 6 gapfill | によると; ことが分かります; という点では〜と思います; を通して〜学べます; めん; はるかに |

### 2.2 Pool nodes (`band:null`, `assessed:false`, `mode:"pool"`)

| id | category | items | types | content |
|---|---|---|---|---|
| `reading-1-b1` | Reading Practice | 4 | 4 identify | Weekend trip to Kyoto, ~110-char passage, 4 comprehension questions |
| `reading-2-pool` | Reading Practice | 6 | 6 identify | コンビニの便利さとごみ問題 (U4O3), ~1000-char passage, 6 comprehension questions. **Text is corrupted, see 7.1** |
| `vocab-kyushoku-pool` | Topic Vocabulary | 46 | 34 identify, 12 gapfill | 給食 topic vocabulary. 16 core words (自治体, 給食費, えいようし, 調理場, はいぜん, 当番, 献立, 食べ残し, 衛生, せきにんかん + 6 production items) then an extended batch of 24 words underlined in a source reading (によって, えいよう, よさん, はこぶ, べつ, じゅんび, 一般, ほごしゃ, しせつ, 人件費, ふたん, 家庭, 食器, まわり, りょう, しゅうきょう, 体調, ひよう, ちょうせい, きかい, せいど, 日本式, 取り入れる, むりに) + 6 production items |

`vocab-kyushoku-pool` is 46 items, 18% of the whole bank and the single
largest node.

### 2.3 Band and task-type distribution

Bands: **Band 1 = 1 node** (Core Particles). **Band 2 = 5.** **Band 3 = 4.**
**Band 4 = 6.**

Task types: **identify 134 (53%), gapfill 112 (44%), order 3 (1.2%),
transform 3 (1.2%)**. `order` appears only in `particles-b1-core`;
`transform` only in `te-form-b2-core`. Both are effectively unused.

Tags: only 5 tags exist across the whole bank
(`su-verbs`, `u-verbs`, `ichidan-verbs` in `te-form-b2-core`; `word-order` in
`particles-b1-core`). 246 of 252 items are untagged, so the per-sub-skill
teacher export described in SPEC §6 currently has nothing to report on for
almost every node.

### 2.4 The item-pair convention (important for authoring)

**12 of the 14 pure-progression nodes are strictly alternating
identify, gapfill, identify, gapfill...** One recognition item and one
production item per grammar point, in the order the node `name` field lists
the points. Verified sequence per node:

```
PAIRED  te-form-b2-extended       IGIGIGIGIGIGIG
PAIRED  ta-tara-tari-b2           IGIGIGIGIG
PAIRED  verb-stem-b2              IGIGIGIGIGIGIGIGIG
PAIRED  plain-form-expr-1-b3      IGIGIGIGIGIGIG
PAIRED  plain-form-expr-2-b3      IGIGIGIGIGIGIG
PAIRED  nai-form-b3               IGIGIG
PAIRED  extent-b3                 IGIGIGIGIGIG
PAIRED  conjunctions-b4           IGIGIGIGIGIG
PAIRED  nominalisers-b4           IGIGIGIGIG
PAIRED  sentence-final-b4         IGIGIGIG
PAIRED  misc-b4                   IGIGIGIG
PAIRED  persuasive-evaluative-b4  IGIGIGIGIGIGIG
PAIRED  comparative-analytical-b4 IGIGIGIGIGIG
        te-form-b2-core           ITTTGIGGIGG
        particles-b1-core         GOOOIGIGIGGIGGIGGIGIIIG
        particles-harder-b2       IGIGGGGGGG
```

The three unpaired nodes are the three oldest-looking ones. **The pair is the
bank's unit of content. New content should be authored in pairs unless
Andrew says otherwise.**

Every one of the 134 identify items has **exactly four options**, the answer
always appears verbatim in the options, and no node has a duplicated option
string. That is a hard convention with zero exceptions.

---

## 3. The category spine: linguistic critique

### 3.1 Is splitting て-form I / て-form II principled? What is the dividing line?

**It is principled, and the line is real, but the implementation blurs it.**

The actual division:

- **て-form I** = the first three rows of the study design's て form table:
  bare て (sequence), てください (request), ています (progressive).
- **て-form II** = the remaining nine rows: てみる, てしまう, てくる, ていく,
  てはいけない, てはだめ, てもいい, ても, てから.

Two defensible readings of that line:

1. **Curricular/frequency.** The three in I are the three て-uses taught in
   the first year of Japanese anywhere in the world, and are effectively
   lexicalised for a learner (a beginner learns 見ています as "is watching",
   not as "て + いる"). Everything in II is a productive compound predicate
   that a student assembles deliberately. That is a genuine and teachable
   boundary.
2. **Morphology vs construction.** In the bank as built, I is where the
   student learns *how to make* the て-form (3 transforms + 5 gapfills, all
   "Change to the te-form", covering す/つ/む/く/ichidan/う-verb-る), and II
   is where they learn *what to attach to it*. That is the strongest
   justification and it is worth writing into the node names.

**The problem: reading (2) is not actually true of the built content.** All
seven gapfills in て-form II are also plain "Change to the te-form" drills,
with the construction pre-supplied in the `after` field:

```js
{ type:"gapfill", prompt:"Change to the te-form",
  before:"このスープを", after:"みてください。", cue:"のむ", accept:["のんで","飲んで"] }
```

The student types のんで. They are never asked to produce みて, てしまいました,
てはいけません, てもいいです or てから themselves. **て-form II therefore tests
recognition of seven constructions and production of zero of them.** Its
production half duplicates て-form I's job with different verbs.

If the I/II split is kept, this is the fix that makes it honest: II's gapfills
should give the て-form and ask for the construction
(`before:"このスープを のんで", cue:"(try doing)", accept:["みてください"]`), or
give a plain sentence and ask for the whole compound predicate.

**Verdict: keep the split, restate the line as "make the form / use the form",
and rebuild て-form II's production items so the line is true.**

### 3.2 Core Particles vs Core Particles (Harder): two rows or one row at two levels?

**One row at two levels, currently mis-implemented as two rows.**

The brief's own note is the correct reading of the engine, and this is the
single cleanest structural fix in the whole bank. The engine does:

```js
const skill = window.SKILLS.find((s) => s.category === cat && s.band === band);
```

so a category spanning two bands is exactly two live cells in one row. That is
the "row spans levels" pattern. `particles-harder-b2` is Andrew reaching for
that pattern and landing next to it: it is `category:"Core Particles (Harder:
に・で・へ)", band:"Band 2"`, which produces a **second row with one live cell**
instead of a **second cell in the existing row**.

Evidence that it is one skill at two levels, not two skills:

- Content overlap is near-total. **Six of `particles-harder-b2`'s ten items
  have a near-identical twin in `particles-b1-core`**: に destination
  (`大阪___行きます` / `町___行きます`), に time (`三時___` / `三時半___`), に
  indirect object (`先生___手紙を` / `先生___あげて`), で means (`はし___すしを
  食べました` / `はし___食べました`, same answer, near-identical explains), and
  で place-of-action twice. The genuinely new content is the four
  に-existence vs で-action items, which is a contrast, not a new particle.
- What is genuinely new in the harder node is not new particles but a new
  **task frame**: contrastive "Why is に correct here, and not で?" with the
  misconception named. That is a difficulty axis over the same content, which
  is what a band is.
- The node's own `name` field says so: "existence vs action vs destination vs
  time vs indirect object". Those are functions of に and で, already in Band 1.

**Recommended fix (content lane, ~2 lines):** change
`particles-harder-b2.category` to `"Core Particles"` and delete the
`"Core Particles (Harder: に・で・へ)"` entry from `window.CATEGORIES`. Result:
a 15-row spine where Core Particles is a live row at Band 1 and Band 2, and
the matrix finally demonstrates the progression it is shaped to show. Cost:
the row loses the に・で・へ label; the cell name ("existence vs action vs
destination...") carries it instead, which is where cell-level detail belongs.

This is a content-lane edit and needs a Decision Log entry per DESIGN_RULES §5
(it changes a category, not a band).

### 3.3 Plain Form + Expressions I / II: is the split principled?

**No. This one is a bisected list, and it is the weakest join in the spine.**

The study design's PF table has 15 rows in this order: そうです, つもりです,
とき/あいだ/まえ, より, かもしれません, でしょう, と思います/と言います, ために,
ように, し, PF+Noun, の/んです, らしいです, ようです, はず/べきです.

Bank PF I = rows 1-7. Bank PF II = rows 8-15. **The split is at the page
break.** There is no semantic, formal, or difficulty principle in it. It cuts
そうです (hearsay) away from らしいです (apparently) and でしょう away from
はずです, which are the four items a student most needs to compare, and it
puts より (comparison) in the same node as かもしれません (epistemic modality)
for no reason at all.

**What a linguist or an experienced JLPT/VCE teacher would use instead:**
split the same 15 rows on the one line that is actually there, which is
**modality and evidentiality vs subordination and quotation**:

| Proposed `Plain Form: Stance & Evidence` | Proposed `Plain Form: Clause Linking` |
|---|---|
| PF+そうです (hearsay) | PF+とき／あいだ／まえ (temporal subordination) |
| PF+らしいです (inference from evidence) | PF+より (comparative subordination) |
| PF+ようです (appearance) | PF+ために (purpose) |
| PF+かもしれません (possibility) | PF+ように (purpose/result) |
| PF+でしょう (probability) | PF+し (listing reasons) |
| PF+はずです (expectation) | PF+Noun (relative clause) |
| PF+べきです (obligation) | PF+と思います／と言います (quotative) |
| PF+つもりです (intention) | PF+の／んです (nominal-explanatory) |

That split is teachable in one sentence each ("how sure am I and how do I
know" vs "how do I hook two clauses together"), maps onto two different exam
demands (evaluative writing needs the left column, interpretive reading needs
the right), and would let the report tell a teacher *which kind* of plain-form
work a student is failing. The current split cannot tell you anything, because
"I" and "II" name nothing.

**Caveat, and it is a real one:** doing this breaks the one-to-one
correspondence with the study design's printed table, which is currently the
bank's biggest defensibility asset. This is a genuine trade and only Andrew
can make it. See Q1 in section 8.

### 3.4 Miscellaneous, Words Indicating Extent: coherent or grab-bags?

**Grab-bags, but they are VCAA's grab-bags, reproduced exactly.**

**`Miscellaneous`** is the study design's own heading (p.23) and contains
exactly VCAA's four entries with VCAA's four examples: potential form
(読めます/食べられます), ば conditional, NAMEというNOUN, のほう. These four have
nothing in common. It is VCAA's leftovers drawer.

The linguistic objection that matters is not "it is untidy", it is
**"the potential form is hiding in the leftovers drawer"**. The potential is a
major verb form: it is a whole conjugation paradigm, it governs particle
change (を becomes が: the SD's own particle table lists 日本語で本が読めます
under が), and it is a prerequisite for ことができる, which sits in a different
row (Nominalisers). The bank gives it **one production item**, ichidan only
(たべます → たべられます). Godan potential (かく → かける), する → できる and
来る → こられる are all absent, as is the を/が alternation. That is under-served
by an order of magnitude relative to, say, ごろ.

**`Words Indicating Extent`** is also VCAA's heading (p.22) with VCAA's six
entries. It bundles three unrelated families:

- **approximation**: ごろ, ぐらい/くらい
- **limitation / focus (とりたて)**: しか, だけ
- **comparison**: より, 一番

A JLPT or linguistics-trained teacher would not group these. They would put
しか and だけ with も, まで and さえ as **focus particles (とりたて詞)**, which
would also give も a proper home (it is currently one item inside Core
Particles); and they would put より, 一番 and のほう together as **the
comparison set**, which is the fix section 3.5 argues for.

**Both rows are defensible to a moderator and indefensible to a linguist. That
tension is the honest summary of the whole spine.**

### 3.5 Where the spine cuts across a natural progression

Six specific places, worst first.

**(a) The four conditionals are scattered across three rows and two bands, and
no item compares them.**

| form | row | band |
|---|---|---|
| たら | た／たら／たり forms | 2 |
| と | Conjunctions | 4 |
| ば | Miscellaneous | 4 |
| なら | **absent entirely** | — |

Choosing between と, ば, たら and なら is one of the two or three hardest
things in the whole VCE grammar list and it is the thing an exam actually
probes. The bank teaches each one in isolation, in a different row, two bands
apart, and never once puts two of them side by side. A student can score 100%
on every conditional item in the bank and still have no idea when to use
which. **This is the largest pedagogical gap in the spine and it is not
inherited from VCAA** (VCAA lists them separately because it is a
form-inventory; a *practice hub* has no such excuse).

**(b) Comparison is split across three rows and two bands.**
より and 一番 in Extent (Band 3); PF+より in Plain Form I (Band 3); のほう in
Miscellaneous (Band 4). The natural teaching unit is
`AよりBのほうが〜／Aの中でBが一番〜`, which is one lesson. Note VCAA itself
lists より twice (Extent p.22 and PF p.19), so the duplication is inherited,
but the scatter across bands is Andrew's.

**(c) ない-form (Band 3) sits above た-forms (Band 2), splitting a minimal
pair.** `たほうがいいです` is Band 2; `ないほうがいいです` is Band 3. These are
the same construction with opposite polarity and are always taught in the same
lesson. Same for なければなりません / なくてもいい, which pair naturally with
てもいい / てはいけない, sitting in Band 2 (て-form II). **The permission /
obligation / prohibition system (てもいい, てはいけない, なければならない,
なくてもいい) is one semantic field split across two rows and two bands.**

**(d) Sentence-Final Particles is at Band 4. か as a question marker is taught
in the first fortnight of Year 7.** ね and よ follow within a term. This row's
Band 4 placement tracks the study design's *page order* (SFP is on p.23), not
difficulty.

**(e) Conjunctions is at Band 4. から and が are Year 8 material.** Same cause.
By contrast the ones in that row that genuinely are late (のに, and the
から/ので register distinction) are correctly hard. The row is band-assigned by
its hardest member.

**(f) The band ladder as a whole tracks study design page order, not
difficulty.** Reading the SD page numbers against the assigned bands:
Particles p.21 → Band 1 (pulled forward); て p.17, stem p.20, た p.19 → Band 2;
PF p.19-20, ない p.20, Extent p.22 → Band 3; Conjunctions p.22, Nominalisers,
SFP, Misc p.23 → Band 4. With the particles moved to the front, **band ≈ how
far into the study design's grammar list the row appears.** That is a
reasonable first pass by a busy teacher and it is not a defensible ladder.
Rebanding is cheap in the content lane (one string per node) but it needs
Andrew's ruling, which is Q2 in the existing questions file.

### 3.6 The matrix is 25% full and shows no progression anywhere

16 categories x 4 bands = **64 cells. 16 are live. 48 render greyed with a
dash.** Every single row has exactly one live cell.

The grid's whole visual promise is "this skill, at four levels". Right now it
delivers "16 topics, sorted into four columns". A student opening the hub sees
a mostly empty board, which reads as broken rather than as a progression.

Two coherent ways out, and they are mutually exclusive:

1. **Populate rows across bands.** Core Particles at Band 1 and Band 2 (free,
   see 3.2). て-form at Band 1 (form-making only) and Band 2 (constructions).
   Plain Form at Band 3 and Band 4. Etc. This makes the matrix mean what it
   looks like, and roughly doubles the content required.
2. **Accept that categories are band-anchored** and change the metaphor: sort
   the 16 rows into four band *groups* (a stacked list per band) rather than a
   16x4 grid with 48 dashes.

Option 1 is what the `Core Particles (Harder)` node shows Andrew already
wanted. Option 2 is honest about what exists today. Either is fine; the
current state is the one state that is not.

### 3.7 The two rows that are Andrew's own, and are the best thing in the bank

`Persuasive & Evaluative Expressions` and `Comparative & Analytical
Expressions` appear nowhere in the study design grammar list. They are
Andrew's own scaffolding for the Units 3&4 writing and text-analysis outcomes,
built out of the discourse language the exam actually rewards: 一方で,
たしかに〜ですが, とはかぎりません, 全体的に考えると, のではなく, によると,
ことが分かります, という点では, を通して, めん, はるかに.

These rows are not *grammatical* categories, they are **rhetorical function**
categories, and that is exactly right for what they do. A JLPT taxonomy has no
slot for them and would be poorer for it. They are also the only rows whose
content is anchored to real texts (the コンビニ/ごみ passage and the 給食/
そうじ material).

Two observations rather than criticisms:

- **`という点で` appears in both rows** (persuasive: `という点でこうかてきです`;
  comparative: `という点では〜と思います`). Same construction, two rows, one
  band. Worth deciding which row owns it.
- The two rows' names describe *what the writer is doing* (persuading,
  comparing) while the other 14 describe *what the form is*. That is a genuine
  two-axis spine (form rows + function rows) and it is a good design, but it is
  currently undeclared. Saying it out loud in the matrix (a visual break
  between "forms" and "writing moves") would help students more than any
  reshuffle of the form rows.

---

## 4. Register and conventions actually in use

This section is the style sheet. **Any new content must match it.** Everything
here is observed, not proposed.

### 4.1 Politeness

**Default is polite ですます, in both the stimulus and the expected answer.**
Plain form appears only where the target grammar requires it (PF+ rows, たら,
た-forms, plain-before-noun) or where the study design's own example is casual.

Casual register appears in exactly two places, both quoting VCAA:
`日本に行ったことがあるの？` and `あした来るの？` (Sentence-Final Particles).

**The cue convention encodes this and is the most sophisticated thing in the
bank:**

- **て-form and た-form drills cue the dictionary form** in kana: `はなす`,
  `まつ`, `ねる`, `あける`, `よむ`, `かく`, `すわる`, `あらう`, `つく`.
- **Plain-form drills cue the polite ます form**: `あります`, `べんきょうします`,
  `のります`, `かえります`, `はれます`, `はいります`, `ひきません`, `おいしいです`,
  `しまります`, `たべます`, `おきます`, `きます`, `よみます`.

That is deliberate: in each case the cue is the form the student already
produces fluently, and the task is the conversion being taught. Explains spell
the conversion out with an arrow chain: `いきます→いった→いったとき`.

### 4.2 Kanji density and the prescribed list

The study design prescribes **200 kanji for active use** (SD p.14). I checked
every learner-facing field in the bank against that list.

**In the 16 progression nodes, exactly one item displays an off-list kanji
bare**: `particles-harder-b2#5` shows `大阪` (阪 is off-list). That is a
remarkably clean result across 210 progression items and it means the kanji
discipline in this bank is deliberate and tight.

The whole-bank result:

| node | off-list kanji shown bare |
|---|---|
| `particles-harder-b2` | 阪 (大阪) |
| `comparative-analytical-b4` | 章 (文章, 3 items), 当 (当番, 2 items) |
| `vocab-kyushoku-pool` | 給 (給食, 2 items), 当 (当番), 全 (全部) |
| `reading-2-pool` | 36 further off-list kanji (see 7.1, the node is broken anyway) |

**Furigana convention.** `<ruby>X<rt>kana</rt></ruby>`, applied to **the single
off-list character only**, leaving on-list characters bare:

```
友<ruby>達<rt>だち</rt></ruby>       友 on-list, 達 off
<ruby>音<rt>おん</rt></ruby>楽       楽 on-list, 音 off
一<ruby>般<rt>ぱん</rt></ruby>       一 on-list, 般 off
```

There is a second convention in the vocabulary pool, where whole words take
ruby: `<ruby>自治体<rt>じちたい</rt></ruby>`, `<ruby>調理場<rt>ちょうりじょう</rt></ruby>`,
`<ruby>人件費<rt>じんけんひ</rt></ruby>`. Both are defensible (the pool is
presenting words as lexical items, not reading them in running text) but the
two conventions should be stated so authors know which applies where.

**Off-list kanji policy: write it in hiragana and say so in the explain.** This
is a distinctive and excellent honest-UI habit:

> "えいようし (栄養士) is the professional who plans school-lunch menus for
> nutritional balance. **None of its kanji are on the VCE list, so it's
> written in hiragana here.**"

> "～を通して～を学ぶことができます explains what students gain through an
> experience... **通 isn't on the VCE list, so it's shown in hiragana here.**"

Keep this. It is the DESIGN_PHILOSOPHY "honest UI" rule applied to script
choice and no textbook does it.

**One consequence worth flagging so nobody "fixes" it:** the bank writes 早い
for "fast" (`車はバスより早いです`, `タクシーのほうが早いです`). 速 is **not on
the prescribed list**; 早 is. VCAA's own example on p.22 is `車はバスより早いです`.
**This is correct within VCE conventions and must not be changed to 速い.**

### 4.3 Accept-list conventions

The observed rule is: **the accept list follows the cue's script, plus the
common kanji spelling where the kanji is on-list.** `cue:"よむ"` gives
`accept:["よんで","読んで"]`.

It is applied inconsistently in both directions (full defect list in 7.4):

- 11 items give kana only where the kanji **is** on the prescribed list and
  **is** already used elsewhere in the bank (e.g. `cue:"かく"` accepts only
  `かいて`, but 書 is on-list and the bank writes 書き方 and 書きやすい).
- 8 items give **kanji only**, so a student typing the kana form is marked
  wrong: `見て`, `見に`, `見すぎました`, `したいと思っています`, `いいと思います`,
  `ことが分かります`, `点では`, `一番`. Several of these (`わかります`, `いちばん`,
  `とおもいます`) are forms most Year 10 typists would produce in kana.

The **particle and expression** items are always kana-only single entries
(`accept:["は"]`, `accept:["ので"]`), which is correct.

### 4.4 Prompt and explain register

**Prompts.** Two families, both English, both stable:

- Recognition: `"What is て doing here?"` / `"What does てしまう mean here?"` /
  `"What does によると do here?"` / `"What form is 読めます here?"`
- Production: `"Change to the te-form"` / `"Change to the plain non-past form
  + つもりです (I plan to...)"` / `"Fill in the correct particle"` /
  `"Fill in the correct expression (on the other hand)"`

Production prompts name the target construction and gloss it in brackets. No
full stop on production prompts; question mark on recognition prompts.

The best prompt pattern in the bank appears only in `particles-harder-b2`:
**`"Why is に correct here, and not で?"`** Contrastive, targets the actual
error rather than the label. Worth propagating.

**Cues.** Either a verb form (`よむ`, `べんきょうします`) or an English function
gloss in round brackets and lower case: `(particle)`, `(approximate time)`,
`(only, + negative)`, `(place of action)`, `(in terms of...)`, `(by far)`,
`(it has been arranged...)`.

**Explains.** One or two sentences. Structure is gloss-then-rule, or
rule-then-worked-example with a `→` chain. English, AU spelling
(`nominalisation`, `emphasises`, `apologise`-style throughout). Single quotes
for glosses: `'my pen'`, `'because I'm tired'`.

The highest-value explains state a **register or nuance contrast**, and these
are the sentences that make the bank worth more than a textbook:

> "ので gives a reason too, but sounds softer and more objective than から,
> often used to explain or excuse."

> "のに shows an unexpected or disappointing contrast, stronger than が, often
> carrying surprise or complaint."

> "PF+ことになる shows a decision or arrangement made by others or
> circumstances, not the speaker's own choice."

> "こと also nominalises a verb phrase, often for more abstract or formal
> ideas than の."

> "A common mistake is using に here since the children 'are in' the park, but
> あそぶ is an action, so で (place of action) is correct, not に (existence)."

**Em dashes.** DESIGN_RULES §5 says "No em dashes in any learner-facing text."
**131 of 252 items contain an em dash**, almost all in explains, used as the
appositive connector in exactly the sentences quoted above. This is a direct,
bank-wide conflict between the written rule and the authored register. See Q4
in section 8; it is a decision, not a bug to silently fix.

### 4.5 Sentence length and topic content

**Progression stimuli: 8 to 30 characters,** one clause or two short clauses.
Longest is the たり item at 34 characters. Reading pool items run 71 to 998
characters.

**Topic content by band.** Bands 1 to 3 are the standard textbook world:
school (しゅくだい, テスト, 学校, 先生), food (すし, ごはん, ケーキ, りんご),
weather (雨, 雪, はれ, あつい), family (姉, 弟, 友達, 家族), travel to Japan
(京都, お寺, りゅうがく), daily routine, transport, shopping.

**Band 4 shifts to issue-based topics that map onto Units 3&4**: convenience
stores and waste (コンビニ, ごみ, リサイクル, ほうそう, もったいない), school
lunch (給食), school cleaning (そうじ). This shift is deliberate and is the
clearest signal in the bank of what Band 4 is for.

Subjects are varied across items (わたし, 姉, 弟, 友達, 家族, 先生, あの人,
子供たち, 生徒, 田中さん). Only one named person, 田中さん. Classroom-safe
throughout. **No privacy issues found in the bank: no student names, no
student work, no class lists, no internal URLs.**

### 4.6 Two Andrew-isms worth naming and preserving

**(a) "Reading tip" decoding notes.** In the vocabulary pool, words whose first
or last character looks like a particle carry a warning:

> "によって shows something varies depending on a factor. **Reading tip: it
> starts with に, which can look like the location/time particle に at a
> glance, check whether a whole word or just a particle is doing the work
> here.**"

Same for はこぶ (は), とりいれる (と), むりに (trailing に). This addresses a
real and rarely-taught decoding failure in unspaced Japanese. Nothing else in
the bank does this and nothing in any textbook does either. **Keep it, extend
it, and give it a name.**

**(b) Within-set distractors.** Identify distractors are drawn from the
sibling constructions in the same node, so て-form II's distractors are always
other て-constructions (`progressive`, `request`, `permission`, `prohibition`).
This makes each item a forced choice within a confusable set rather than a
choice against noise, which is the right design for a diagnostic.

---

## 5. Coverage gaps against VCE

**Confidence note.** Unlike the brief anticipated, this section is based on
the actual grammar list in `2019JapaneseSLSD.pdf` pp.15-23, which I extracted
and read in full. **It should still be cross-checked against the parallel VCE
extraction** for anything I may have mis-scoped from the text layer, but it is
not guesswork. Marked provisional only where noted.

### 5.1 Prescribed sections with no row at all

**(a) `Finite forms – plain forms` (SD p.15). This is the biggest gap in the
bank.** The study design's *first* grammar section prescribes the full plain
paradigm: verbs (食べる/書く, 食べた/書いた, 食べない/書かない, 食べなかった/
書かなかった, volitional 食べよう/書こう); い-adjectives (赤い, 赤かった,
赤くない, 赤くなかった, 赤いだろう); な-adjectives (しずかだ, しずかだった,
しずかではない, しずかではなかった, しずかだろう); and the copula (本だ, 本だった,
本ではない, 本ではなかった, 本だろう).

**The bank never drills any of it.** Plain forms are used constantly as *input*
to four whole rows (PF I, PF II, ない-form, た-forms) and are never taught or
diagnosed themselves. The practical consequence for the report: **when a
student fails `PF+つもりです`, the hub cannot tell whether they don't know
つもり or can't make the plain form.** That is a diagnostic dead end and it
affects 48 items across four rows.

Also absent from this section: the **volitional** (食べよう/書こう, and 行こうと
思っています which the SD lists under PF+と思います).

**(b) `Finite forms – polite forms` (SD p.16).** ます/ました/ません/ませんでした,
い-adjective polite forms (赤いです, 赤かったです, 赤くないです, 赤くありません),
な-adjective and copula polite forms, ましょう, and critically the **adjective
te-form and adverbial forms**: `～くて` (やすくていい), `～で` (しずかできれい),
`～く` (はやくしなさい, あつくなります), `～に` (しずかにしなさい, きれいになります).
None of these have a row. The `～く／～に + なります` pattern in particular is
heavily used in real writing and is entirely absent.

**(c) `て form + verbs of giving and receiving` (SD p.18). A whole prescribed
section with zero items.** てくださいます, てくれます, てあげます, てもらいます,
ていただきます. This is the uchi-soto system, it is culturally loaded, it is
the classic exam discriminator, and the bank has nothing. **Highest-value
single gap to fill.**

### 5.2 Partial gaps inside existing rows

| row | prescribed but missing |
|---|---|
| Core Particles | から (from/since), まで (until), までに (by the time) as **particles** (SD p.22). から exists only as a *conjunction* at Band 4. まで and までに are absent entirely. |
| Core Particles | の adjectival (母のりょうりが好きです); が subject-in-subordinate-clause (春子さんが作ったケーキ); に purpose (友達にプレゼントを買いました); も with interrogatives (何回も, だれも来ません) |
| Plain Form I | **あいだ(に)** and **まえ(に)** are named in the node title and have no items |
| Plain Form II | **PF+ようです** is named in the node title ("よう") and has no items; the only よう item is ように |
| Plain Form II | べき has a gapfill but no identify; はず has an identify but no gapfill (the only broken pair in the paired nodes) |
| ない-form | complete against the SD's three rows, but only 6 items, and ないでください (negative request) is absent from the bank entirely |
| Sentence-Final | よ "gentle persuasion" (えいがに行こうよ) is prescribed; only "assurance" is covered |
| Miscellaneous | potential: only ichidan production. Godan (かく→かける), する→できる, 来る→こられる, and the を/が alternation all absent |
| Conjunctions | と "indirect quote" (SD lists it under Conjunctions as well as PF) covered only in PF I |

### 5.3 What is NOT a gap (important)

**Passive, causative, causative-passive and keigo/honorifics do not appear
anywhere in the study design's prescribed grammar list.** The list runs from
"Finite forms" (p.15) to "Miscellaneous" (p.23) and I read all of it. The
potential form is prescribed (under Miscellaneous); the passive and causative
are not.

**So their absence from the bank is correct.** A generic "VCE gap analysis"
written from JLPT intuition would demand 受身 and 使役 and would be wrong.
Do not add them as progression rows.

(One incidental causative does appear in a stimulus: `むりに全部食べさせるのでは
なく...` in `vocab-kyushoku-pool#45`. Since it is unglossed and untaught, it is
worth a furigana-style note or a rewrite.)

### 5.4 Kanji coverage

The prescribed list is 200 kanji for **active use in reading and writing**.
The bank uses 180 distinct kanji (excluding the corrupted `reading-2-pool`),
of which the great majority are on-list.
There is currently **no kanji practice content of any kind** in the hub: no
reading, no writing, no recognition. Whether that belongs here or in a
separate tool is Andrew's call, but it is a prescribed and examined element
with zero coverage.

---

## 6. Errors and inconsistencies: the fix list

Tiered by severity. Every entry is a specific item, verified.

### Tier 1: broken content, fix before anything else

**6.1 `reading-2-pool` Japanese text is corrupted and currently unreadable.**

The コンビニ passage has had furigana flattened into the running text, so each
glossed word appears as **its kana reading immediately followed by its kanji**:

```
電気だい代をはら払ったり、にもつ荷物をおく送ったり
   should be: 電気代を払ったり、荷物を送ったり
              (with ruby: 電気<ruby>代<rt>だい</rt></ruby>を<ruby>払<rt>はら</rt></ruby>ったり...)
```

Roughly 36 words are affected across the passage: だい代, はら払, にもつ荷物,
おく送, ひら開, いそが忙, べんり便利, あか明, あんしん安心, ばしょ場所,
かんきょう環境, もんだい問題, しょうひん商品, とう売, きゃく客, ふべん不便,
ひつよういじょう必要以上, ようい用意, たも保, むかし昔, さいきん最近, やす安,
ひつよう必要, し知, じぶん自分, じゅうぶん十分, きぎょう企業, せいかく,
きょうりょく協力, たいせつ大切, げんだい現代, かたち形, ど度, べんとう弁当,
せいふ, ようき.

**This is the single worst content defect in the bank.** The passage is not
readable Japanese as it stands, and it is the U4O3 text, i.e. the most
senior-facing content in the hub. It needs re-typing with proper `<ruby>` tags
(or plain kana for off-list kanji, per the bank's own convention). It is also
a 998-character stimulus repeated in full inside two separate items, so the
retype has to happen twice unless the schema gains a shared `passage` field.

**6.2 Four identify items bold the wrong span.** In every other identify item,
`<b>` marks exactly the construction the prompt asks about. These four do not:

| item | prompt asks about | `<b>` actually marks | should mark |
|---|---|---|---|
| `plain-form-expr-2-b3#0` | PF+ために | `ためています` (a different verb, ためる "to save") | `車を買うために` |
| `plain-form-expr-2-b3#2` | PF+ように | `手を洗いましょう` | `ひかないように` |
| `plain-form-expr-2-b3#4` | PF+し | `あたたかかったです` | `よかったし` |
| `nominalisers-b4#0` | の (nominaliser) | `は` (the topic particle) | `の` |

`plain-form-expr-2-b3#0` is the worst: it highlights ためて while asking about
ために, which actively teaches a confusion. `nominalisers-b4#0` highlights は
while asking "What is の doing here?", which is simply wrong.

(Cause is visible: all four take VCAA's example sentence verbatim, and VCAA's
table bolds nothing, so the bolding was added afterwards and slipped.)

**6.3 One identify item has no `<b>` target at all.**
`te-form-b2-extended#12`: `いつも勉強してからテレビを見ます。` asks "What does
てから mean here?" with nothing highlighted. Should be
`いつも<b>勉強してから</b>テレビを見ます。`

**6.4 Six gapfills where a second answer is fully defensible and rejected.**
DESIGN_RULES §5 says "no distractor may also be arguable"; the same principle
has to hold for typed answers.

| item | sentence | accepts | also correct |
|---|---|---|---|
| `particles-b1-core#9` | `明日、町___行きます。` cue `(particle)` | `に` | **`へ`**. The bank says so itself three items later (`町___行きます。` cue "same meaning as に here", accept `へ`) and again in `particles-harder-b2#5` ("Either に or へ works for destination, they're interchangeable here"). Two items in one node, same sentence, opposite answers. |
| `particles-b1-core#18` | `スーパーでりんご___バナナを買いました。` cue `(particle)` | `と` | **`や`**. The very next item is the identical sentence with や. Nothing in the stimulus signals an exhaustive list. |
| `particles-b1-core#22` | `わたし___日本に行きたいです。` cue `(particle)` | `も` | **`は`**. わたしは日本に行きたいです is the canonical sentence, and item #0 of the same node trains は on `わたし___がくせいです。` |
| `nominalisers-b4#1` | `日本語を勉強する___はおもしろいです。` cue `(the act of...)` | `の` | **`こと`**. Both are grammatical; the cue does not disambiguate (the next item's cue adds ", more formal"). |
| `conjunctions-b4#3` | `高かった___、買いました。` cue `(however)` | `けど/けれど/けれども` | **`が`**, which this same node teaches two items earlier for `(but)`. |
| `conjunctions-b4#5` vs `#7` | `雨がふった___、うちにいました。` cue `(because)` / `かぜをひいた___、学校を休みました。` cue `(so, explaining a reason)` | `から` / `ので` | each other. The cue wording is the only thing separating them and it is very thin. |

Two fixes are available for each: widen `accept`, or sharpen the `cue` so only
one answer fits. Which one depends on whether the item is meant to teach the
form or the choice between forms, so **Andrew should rule item by item.**

**6.5 A wrong conjugation rule, stated three times.**
The explain formula "Drop ます and add る for a る-ending stem" is used for both
ichidan and godan verbs, and is only correct for ichidan:

| item | text | verdict |
|---|---|---|
| `plain-form-expr-1-b3#7` | "Drop ます and add る for a る-ending stem, then add より. のります→のる→のるより" | **wrong**: のります is godan; the stem is のり, and "add る" yields のりる. The rule is り→る (う-row shift). |
| `plain-form-expr-2-b3#1` | "Drop ます and add る for a る-ending stem, then add ために. はいります→はいる→はいるために" | **wrong**, same reason |
| `plain-form-expr-1-b3#11` | "...はれます→はれる→はれるでしょう" | correct by accident (はれる is ichidan) |

The right formulation, in the bank's own established terminology
("う-verbs" / "る-verbs (ichidan)"): *"る-verbs (ichidan) drop ます and add る.
う-verbs change the last kana of the stem from the い-row to the う-row:
のります → のり → のる."*

### Tier 2: will mark a correct student wrong

**6.6 Kanji spelling missing from `accept` where the kanji is on the
prescribed list and already used elsewhere in the bank.** Eleven items:

| item | cue | accepts | should also accept | on SD list? |
|---|---|---|---|---|
| `te-form-b2-core#7` | かく | `かいて` | `書いて` | 書 yes (bank writes 書き方) |
| `ta-tara-tari-b2#9` | はなす | `はなしたり` | `話したり` | 話 yes (bank accepts 話して) |
| `plain-form-expr-1-b3#3` | べんきょうします | `べんきょうするつもりです` | `勉強するつもりです` | 勉強 yes (bank writes 勉強した) |
| `plain-form-expr-2-b3#13` | べんきょうします | `べんきょうするべきです` | `勉強するべきです` (and consider `勉強すべきです`) | yes |
| `plain-form-expr-1-b3#7` | のります | `のるより` | `乗るより` | 乗 yes (bank writes 電車に乗って) |
| `plain-form-expr-1-b3#9` | かえります | `かえったかもしれません` | `帰ったかもしれません` | 帰 yes (bank writes 帰ってもいいです) |
| `plain-form-expr-2-b3#1` | はいります | `はいるために` | `入るために` | 入 yes |
| `nai-form-b3#1` | たべます | `たべないほうがいいです` | `食べないほうがいいです` | 食 yes, 200 occurrences in the bank |
| `nai-form-b3#5` | きます | `こなくても` | `来なくても` | 来 yes, **and the item's own explain writes 来ます** |
| `verb-stem-b2#3` | つくる | `つくりかた/作りかた/作り方` | `つくり方` | 方 yes |
| `misc-b4#1` | たべます | `たべられます` | `食べられます` | yes |

Correctly kana-only (kanji is **off**-list, do not "fix"): `あけて` (開),
`すわって`/`すわりやすい` (座), `ふって` (降), `おきなければなりません` (起),
`しまったらしいです` (閉), `はれるでしょう` (晴), `ひかないように` (引).

**6.7 Kanji-only accepts that reject the kana form.** Eight items:
`te-form-b2-core#10` (`見て`), `verb-stem-b2#13` (`見に`), `verb-stem-b2#17`
(`見すぎました`), `verb-stem-b2#11` (`したいと思っています`),
`plain-form-expr-1-b3#13` (`いいと思います`), `comparative-analytical-b4#3`
(`ことが分かります`), `comparative-analytical-b4#5` (`点では`), `extent-b3#11`
(`一番`).

The pattern is "kanji cue produces kanji-only accept", which is internally
consistent, but `わかります`, `いちばん` and `とおもいます` are all forms a Year
10 student is more likely to type in kana than in kanji. **Needs a policy
ruling from Andrew (Q5), not a unilateral fix.**

**6.8 `verb-stem-b2#1`:** `かさを持っていきましょう。雨が___。` accepts only
`ふりそう`, but the gap is sentence-final before `。`, so `ふりそうです` is the
natural (and more correct) full sentence and is marked wrong. Add
`ふりそうです`.

**6.9 `persuasive-evaluative-b4#9`:** accepts `ぜんたいてきに考えると` and
`ぜんたいてきにかんがえると` but not `全体的に考えると`, which is how the item's
own explain writes it. (全 and 的 are off-list, so kana display is correct;
accepting the kanji form as well costs nothing.)

### Tier 3: consistency and polish

**6.10 Off-list kanji shown bare** (all in the two newest nodes, all fixable
with the bank's own ruby convention):
`文章` → `文<ruby>章<rt>しょう</rt></ruby>` (3 items in comparative-analytical);
`当番` → `<ruby>当番<rt>とうばん</rt></ruby>` (2 items in comparative-analytical,
1 in the vocab pool; note the vocab pool rubies it correctly elsewhere, so this
is an inconsistency inside a single node); `大阪` →
`大<ruby>阪<rt>さか</rt></ruby>` (particles-harder#5); `給食` (2 vocab items,
where other items use きゅうしょく); `全部` (vocab#45).

**6.11 `生と` for 生徒** (`vocab-kyushoku-pool#41`, `#43`). 生 is on-list, 徒
is not, so the word has been written half-kanji half-kana. This is a third
convention (the other two being single-char ruby and full kana) and it reads
badly: `生とが...` looks like 生 followed by the particle と. **By Andrew's own
"Reading tip" pedagogy this is exactly the trap he warns students about.**
Should be `せいと` or `生<ruby>徒<rt>と</rt></ruby>`.

**6.12 `vocab-kyushoku-pool#6`** displays `一<ruby>般<rt>ぱん</rt></ruby>` (一般)
but the explain glosses `一般に` ("means 'generally' or 'in general'"). Stimulus
and explain should agree.

**6.13 `sentence-final-b4`:** three of the four gapfills have `after:""`, so
the rendered sentence ends with no punctuation (`今日はあついです[ね]`). The
fourth has `after:"？"`. Add `。` (or `？`) for consistency.

**6.14 `sentence-final-b4#1`** accepts `ね` and `ねえ`, but `ですねえ` is a
marked, drawn-out variant rather than a neutral alternative. Low stakes;
Andrew's call.

**6.15 Explain punctuation is inconsistent.** Some explains end with `.`, some
with `。`, some with nothing (`"Verbs ending in す become して。はなす → はなして"`).
Worth a single pass.

**6.16 Node `name` fields overstate coverage** in three places (see 5.2):
`Plain Form + Expressions I` promises あいだ and まえ; `Plain Form + Expressions
II` promises よう (i.e. ようです). Since `name` is what the student sees in the
matrix cell and in the report, this is an honest-UI issue, not just tidiness.

**6.17 A defensible distractor, flagged for information not for fixing.**
`particles-b1-core#6` (`テニス<b>が</b>好きです。`) offers "subject" as a
distractor against the keyed answer "object of a liking/ability word". A
linguist would say が marks the grammatical subject here and the distractor is
therefore arguable. **However, the study design itself (p.21) lists
テニスが好きです under が = "direct object".** The bank follows VCAA. Leave it
alone, but know why it looks wrong.

**6.18 The reading pool repeats its whole passage inside every item.**
`reading-1-b1` carries the same ~110-character passage in all four items;
`reading-2-pool` carries ~1000 characters in two of six. Because the engine
shuffles the item pool, a student meets the same wall of text four to six
times in random order with no continuity, and the passage cannot be read once
and then questioned. This is a **schema gap** (no `passage` field, no reading
task type), not an authoring error, and it is the strongest argument in this
audit for a new task type. Route to Liam.

---

## 7. Summary of what constrains any new content

1. Match the study design's grammar list, its headings, and where possible its
   example sentences. That is what the existing bank does and it is the bank's
   main claim to legitimacy.
2. Author in **identify + gapfill pairs**, one pair per grammar point, in the
   order the node `name` lists them.
3. Identify items: **exactly four options**, answer verbatim in options,
   distractors drawn from sibling constructions in the same node, exactly one
   defensible answer.
4. Polite ですます by default. Cue the dictionary form for て/た drills; cue the
   polite form for plain-form drills.
5. Only the 200 prescribed kanji bare. Off-list kanji: hiragana, or
   `<ruby>` on the off-list character only, **and say so in the explain**.
6. `accept` lists both kana and the on-list kanji spelling.
7. English prompts, options and explains. AU spelling. Single quotes for
   glosses. `→` for conjugation chains.
8. Explains carry a nuance or register contrast wherever two forms compete.
9. Classroom-safe, varied subjects, no student-identifying content.

---

## 8. Open questions for Andrew

These are the calls only he can make. Each blocks something concrete.

**Q1. Should `Plain Form + Expressions I / II` be resplit on meaning
(stance/evidence vs clause-linking), or kept as the study design's page
break?** Blocks: any content added to those two rows lands in a category that
may be about to change, and the report's per-skill diagnosis is currently
uninformative because "I" and "II" name nothing.

**Q2. Should `Core Particles (Harder: に・で・へ)` be merged into the `Core
Particles` row as its Band 2 cell?** Blocks: the matrix's ability to show any
row spanning levels. This is a two-line content change and it is the cheapest
structural improvement available.

**Q3. Where do the four conditionals live (たら, と, ば, and なら which is
absent)?** Blocks: the highest-value teaching item type the bank does not have,
a contrastive conditional set. Currently they are three rows apart across two
bands and are never compared.

**Q4. Em dashes: 131 of 252 existing items use them in explains, against
DESIGN_RULES §5.** Does the rule change, or does the bank get scrubbed?
Blocks: every new explain written from now on.

**Q5. Typed-answer script policy.** Eight items accept kanji only and will mark
`わかります`, `いちばん`, `とおもいます` wrong. Should the accept list always
carry both scripts where the kanji is on the prescribed list, or should the cue's
script bind the answer? Blocks: the 19-item accept-list fix pass in 6.6 and 6.7.

**Q6. Which prescribed section gets filled first?** The three sections with no
row at all are: plain finite forms (prerequisite for 48 existing items),
polite finite forms (including ～く／～に + なります), and て + giving and
receiving (the uchi-soto set). Blocks: the first big content job for Liam.

**Q7. The six gapfills in 6.4 that have a second defensible answer: widen
`accept`, or sharpen the `cue`?** The answer differs per item depending on
whether it teaches the form or the choice. Blocks: a content-lane fix pass.

**Q8. Is the matrix meant to be filled across bands, or should the visual
change?** It is 16 of 64 cells live, one per row, and reads as broken rather
than as a progression. Blocks: how much content the project is committing to,
and whether `index.html` needs an engine job.

**Q9. Should kanji get any coverage in this hub?** 200 kanji are prescribed for
active use and the hub has no kanji content of any kind. Blocks: scope.

**Q10 (low stakes, verify only). `早い` for "fast".** The bank uses it twice,
matching the study design's own example, because 速 is off the prescribed
list. Confirming this is deliberate so nobody "corrects" it later.
