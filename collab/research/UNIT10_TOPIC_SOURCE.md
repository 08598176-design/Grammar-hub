# Unit 10 "Abilities and Preferences": source mining for the first topic module

Source folder: `/home/user/Grammar-hub/Unit 10 Abilities and preferences/`
(93 files; 79 .docx, 4 .pptx, 5 .pdf, 4 image, 1 .mp3, 2 legacy .doc)

Everything below is extracted from Andrew's own files. Where a reading, gloss or
form could not be confirmed from the materials themselves it is marked
**[UNCONFIRMED]** and listed again in section 8 as a question for Andrew. Nothing
in this document is a guess presented as fact.

## 0. How the files were read, and what was skipped

`python-docx` is not installed, so .docx and .pptx were unzipped and
`word/document.xml` / `ppt/slides/slideN.xml` parsed directly.

Two things matter for anyone repeating this:

1. **Furigana is stored two different ways in this folder.** Newer files use
   `<w:ruby>`; older files use the legacy Word "phonetic guide" EQ field
   (`<w:instrText>EQ \* jc2 ... \o\ad(\s\up 11(ふりがな),漢字)`). A naive `w:t`
   scraper silently drops every EQ-field reading, which makes older MODIFIED
   files look like they have holes in them. Both paths must be handled.
   In this document furigana is written as `漢字《かんじ》`.
2. `<w:t[^>]*>` also matches `<w:tbl>` and `<w:tc>`. The tag regex must require
   whitespace or `>` immediately after `w:t`, or raw XML leaks into the output.

The working extractor is at
`/tmp/claude-0/-home-user/de705a79-0e10-56a2-b880-a5bd3d706e3f/scratchpad/extract2.py`
(scratch; re-create rather than rely on it).

**Read successfully:** all 79 .docx, all 4 .pptx, all 4 images, 4 of 5 PDFs
(page images read visually), embedded images inside .docx.

**Skipped / not readable:**
- `Unit 10 Talking about people's preferences and abilities.mp3` (audio; almost
  certainly the Obento unit audio, so also a copyright item).
- `Genkoo_yooshi_horizontal for typing ESSAY PRACTICE 2.doc` and `3.doc`
  (legacy binary .doc). Metadata and string inspection show these are blank
  genkō yōshi (原稿用紙) writing grids authored by Andrew, no learner content.
- `Unit 10 Obento WB pgs 201, 202.pdf` (image-only scan, not opened page by page;
  same textbook as the other scans).
- `Unit 10 abilities SUMO word research modified task.docx` is effectively empty
  (a name line and a blank grid only).

## 1. What this unit actually is

Obento Supreme 5E **Unit 10, スポーツヒーロー ("Sports hero")**. Year 9 Japanese,
Semester 2. Andrew's materials are locally authored *parallels* of specific
textbook pages, not copies. The most important structural fact in the whole
folder:

> **Andrew's signature "job suitability" reading task is a re-authored version of
> Obento Supreme 5E p211/p224 れんしゅう 16/22**: *"Read the transcripts of two
> self-introductions recorded during interviews conducted at the recruiting
> agency where you work. Suggest the most suitable position for each applicant by
> filling in the summary sheets below, in English."* with a boxed **Positions
> vacant** list.

The textbook's Positions vacant list is: restaurant chef / gym instructor /
rowing coach (morning) / swimming pool attendant / salesperson in a motorbike
shop / waitstaff at a Japanese restaurant / department store sales manager.
Andrew's `Unit 10 Abilities. Reading, verb and kanji PRAC 2022.docx` uses:
Chef in a restaurant / Gym instructor / Cycling coach (morning) / Swimming pool
attendant / Salesperson in a motorbike shop / Salesperson in a bicycle shop /
Waiter at a Japanese restaurant / Department store sales manager. He then
re-skins the same frame for every tier and every year (baseball, basketball,
netball, judo, karate, maths/science, manga/anime, cake and athletics versions
all exist).

**This is the module.** The hub can reproduce the *format* (self-introduction
passage, extract the fields, choose best and worst job from a list, justify from
the text) without reproducing any textbook content.

Other textbook task shapes Andrew draws on:
- p206/p218 れんしゅう 13/6: *"Read the passage and complete the table in
  English"*, columns **Family member | Activities he/she likes doing | Activities
  he/she is good at doing**. This is a likes-vs-abilities discrimination task.
- p204 れんしゅう 9: three speech bubbles (えいこ / てるゆき / かよ), then
  who-questions plus a grid **好きなスポーツ | きらいなスポーツ | 好きなかつどう**.
- p211/p224 れんしゅう 15/21: paired interview using
  `〜ことが上手ですか / 〜ことが好きですか / 〜ことができますか`.
- p212: sports vocabulary table, English given, Japanese to be filled in.
- p213: verb table English | Verb group | ます form | Dictionary (plain present) form.
- p209: unit kanji 毎・今・週・先・来 with mnemonic, reading, stroke order.

## 2. Grammar carried by this topic

Ordered by how much of the folder is spent on it.

### 2.1 The spine: `〜ことが + 好き / とくい / 上手 / 下手 / できます`

This is the unit. It appears in essentially every file. The frame is taught as a
**seven-slot table**, which is the single most portable thing in the folder for a
tile or `order` task type
(`Unit 10 Abilities and preferences Worksheet 2.docx`,
`Unit 10 Reading CAT revision 3 ADVANCED.docx`):

| object | を | Verb in plain form | こと | が | adjective | です |
|---|---|---|---|---|---|---|
| スポーツ | を | する | こと | が | すき | です |

Worked examples quoted from the materials:

- `スポーツをすることが好きです。` (the canonical example, repeated in ~20 files)
- `テニスをすることが好《す》きです。` → "I like playing tennis."
- `英語《えいご》の本《ほん》をよむことがとくいです。` → "I am good at reading English books."
- `サッカーをすることができます。` → "I can play soccer."
- `ともだちは、えをかくことが上手《じょうず》です。` → "My friend is good at drawing pictures."
- `りょうりをすることが下手《へた》です。` → "I am not good at cooking."
- `日本語《にほんご》を話《はな》すことができます。`
- `ともだちは漢字《かんじ》を書《か》くことが上手《じょうず》です。`
- `寿司　（すし）を作る（つくる）ことがとくいです。` → "I'm good at making sushi."
(Sources: `Unit 10 verb conj, grammar, reading, writing TEST INTERMEDIATE 2025.docx`,
`... ADVANCED 2025.docx`, `Unit_10_Intermediate_Test_Model_Answers_with_Vocab.docx`,
`Unit 10 Reading CAT revision 3 ADVANCED.docx`.)

**The A/B contrast is taught explicitly** and is the conceptual heart of the unit.
From the 2026 graphical worksheet
(`Unit 10 Like good at bad at GRAPHICAL worksheet ONE PAGE 2026.png`):

- **A** `スポーツが すきです。` = "I like sport."
- **B** `スポーツを することが すきです。` = "I like playing sport."
- caption: **「DOING がポイント！」**

### 2.2 Plain form (dictionary form) as the enabling skill

`ことが` requires plain form, so the unit front-loads ます → plain conversion. The
rule is stated in Japanese on the 2026 worksheet
(inside `Unit 10 Abilities and preferences, Plain form practice GRAPHICAL no2.docx`):

> 「ことが」の まえでは、うごきを あらわす ことばを ます form から plain form に かえます。

with three colour-boxed groups:

| box | group | rule caption | examples |
|---|---|---|---|
| **A** (blue) | します → する | 「ことが の まえ！」 | します → する |
| **B** (green) | る verbs (G2) | 「ます を はずすだけ！ plain form！」 | たべます→たべる, みます→みる |
| **C** (orange) | う verbs (G1) | 「う → う を とって、そのまま！」 | かきます→かく, のみます→のむ, よみます→よむ, はなします→はなす |

Note Andrew uses **both** naming systems: "‘ru’ or ‘u’ verbs" in his own tables,
and "G1/Godan, G2/Ichidan, G3/irregular" where he reproduces Obento p213. He also
numbers groups 1/2/3 in `Unit 10 Abilities. Reading, verb and kanji PRAC 2022.docx`.

### 2.3 The `とくい / 上手 / 下手` person rule

Stated verbatim, in his own words, in at least four files
(`Unit 10 like doing Plain verb list.docx`,
`Unit 10 Abilities and preferences Worksheet 2.docx`,
`Unit 10 Reading CAT revision 3 ADVANCED.docx`,
`Unit 10 Plain verbs, grammar and reading job suitability Learning Task 2024.docx`):

> すき like
> とくい good at **( for talking about my own abilities)**
> 上手 good at **(for talking about others)**
> 下手 not good at **(for anyone)**

and as a legend chip on the 2026 worksheet page 2: **「とくい ＝ me」 「じょうず ＝ another person」**.

This is a hard, teachable, checkable rule and it is exactly the kind of thing
`explain` fields in `data/skills.js` exist for. It also implies a genuinely
gradable auto-check: `私は…上手です` is wrong; `ともだちは…上手です` is right.

### 2.4 `〜たり〜たり`

Present but treated as **extension**, not core. Only 12 occurrences folder-wide.

- Model: `日曜日《にちようび》に本《ほん》をよんだり、テレビ《てれび》を見《み》たり、しゅくだいをしたりします。`
  "On Sunday, I read books, watch TV and do homework etc."
  (`Unit 10 Practice Reading CAT INTERMEDIATE LONG with basic grammar, tari tari and PARAGRAPH writing.docx`)
- Taught off the て form via a 5-column table: 英語 | ます | る・う dictionary form | て | たり
  (same file; also the practice grid in `Unit 10 Topic kanji and kana practice worksheet 2023.docx`
  which runs 食べる | たべる | たべて | たべたり).
- Appears in the teacher's model answers as natural production:
  `週末には友だちとえいがを見たり、カフェに行ったりします。`
  (`Unit_10_Intermediate_Test_Model_Answers_with_Vocab.docx`)
  `週末《しゅうまつ》には友だちとカフェに行ったり、ショッピングをしたりします。`
  (`Unit_10_Advanced_Test_Model_Answers_Table.docx`)
- The handwritten board note says: *"Extension ① Write one paragraph about
  yourself ② Add ～たり～たり grammar → look ahead in Obento"*
  (`Unit 10 paragraph task model sentences.png`).

### 2.5 Comparisons + reason `〜からです` (shared with Unit 11)

Four "Unit 10 and 11" files carry this. The frame:

```
Q. ＿＿＿と＿＿＿と　では　どちら　の　ほうが　＿＿＿　ですか。
A. ＿＿＿の　ほうが　＿＿＿です。　＿＿＿からです。
```

The teacher's own handwritten suggested responses
(`Unit 10 and 11 Comparisons Grammar Test V2 SUGGESTED RESPONSES.pdf`) give:

- `コカ・コーラとペプシーとではどちらのほうが好きですか。` → `コークのほうが好きです。おいしいからです。`
- `にんてんどうとプレイステーションとではどちらのほうがいいですか。` → `にんてんどうのほうがいいです。たのしいからです。`
- `サッカーとフットボールとではどちらのほうがすごいですか。` → `サッカーのほうがすごいです。かっこいいからです。`

**Correction to the brief's assumption:** `ので` does **not** appear anywhere in
this folder. `から` as a reason connective appears only in this comparisons frame
(`〜からです`), plus `だから` ("so, therefore") in three reading glossaries and
`それから` ("after that") in two passages. `より` does not appear at all: the
comparison is `のほうが` only. **Reason-giving inside the Unit 10 reading task is
done in English**, not Japanese ("Why is this position best?").

### 2.6 Everything else that recurs, with the sentences that carry it

| pattern | example from the materials | source |
|---|---|---|
| `でも` / `〜が、` contrast | `たいかいは好きじゃないですが、ちょっととくいです。` | CAT rev 3 MODIFIED |
| `〜ませんが` | `りょうりをすることができませんが、スポーツがとくいです。` | Practice CAT INTERMEDIATE LONG |
| `あまり〜じゃないです` | `まんがを読むことがあまり好きじゃないです。` | Reading CAT ADVANCED 2022 |
| `〜も〜も` (neither/both) | `ネットボールもじゅうどうも大好きです。でも、ネットボールのチームもじゅうどうのクラブもありません。` | Practice CAT INTERMEDIATE LONG |
| `〜や〜` (partial list) | `ドリブルやパスをすることができます。` | Practice CAT INTERMEDIATE LONG |
| `〜たいです` / `なりたいです` | `しょうらい、えいがをつくりたいです。それから、英語の先生になりたいです。` | Reading revision 3 |
| `〜になりたい` + `がんばって` | `しょうらいがんばって英語の先生《せんせい》になりたいです。` | Reading revision ADVANCED 2019 |
| `〜ています` (ongoing study) | `英語《えいご》とれきしを勉強《べんきょう》しています。` | Reading revision ADVANCED 2019 |
| `〜て` sequencing | `私は毎日、朝はやくおきて、本やまんがをよみます。` | Reading revision ADVANCED 2019 |
| `〜に入っています` (club membership) | `学校《がっこう》のりくじょうぶにも入《はい》っています。` | TEST INTERMEDIATE 2025 |
| `〜てもいいですか` (permission) | `すみません、インタビューしてもいいですか？` | interview worksheet |
| `〜ことができますか` (question form) | `＜name＞さんは、(plain form)ことができますか？` | interview worksheet |
| adjective-て linking | `数学はやさしくて、好きです。` | Reading CAT ADVANCED 2022 |
| `にがて` (advanced synonym for 下手) | `人《ひと》の前《まえ》で発表《はっぴょう》することがにがてです。` | TEST ADVANCED 2025 |
| `きらい` / `大きらい` / `きらいじゃない` | `チームスポーツをすることが大きらいです。` | Obento p204 scan **(textbook, not Andrew's own)** |

Note that `きらい` / `大きらい` appear **only** in the textbook scan, never in
Andrew's own authored passages. He uses `好きじゃない` / `あまり好きじゃない` instead.

## 3. How Andrew tiers the same content

This is the most valuable material in the folder, and the finding is not what a
reader would predict. There are **three separate differentiation mechanisms**, and
they are used independently.

### 3.1 Mechanism A: tier by what is REMOVED from the task, not by simplifying the text

`Unit 10 Reading revision MODIFIED.docx` and
`Unit 10 Reading revision INTERMEDIATE.docx` were diffed character by character.

**The reading passage is byte-identical.** Same 318 characters, same furigana,
same 12 sentences, same protagonist (山中しんご, 14, 中学2年生).

The *only* difference is that the INTERMEDIATE file appends a second page:
a 5-item vocabulary recall (好き / とくい / できます / 上手 / 下手), a 5-sentence
translation part, and a 5-sentence construction part.

> **MODIFIED here means "the comprehension task without the production task".**
> Same text, same questions, less output demanded.

The same pattern holds across the folder: MODIFIED variants of the research tasks
(`Unit 10 MODIFIED TOP TEN SPORTS research task.docx`,
`Unit 10 and 11 MODIFIED Historical Figures research task.docx`,
`Unit 10 abilities SUMO word research modified task.docx`) are the same
investigation with the scaffolding grid pre-drawn and fewer required elements.

### 3.2 Mechanism B: tier by orthography and glossary support, holding meaning constant

Measured over the eleven job-suitability passages (furigana stripped for the
character counts; "furi%" is the percentage of kanji characters that carry a
reading):

| passage | tier | chars | kanji | kanji % | furi % of kanji | sentences | avg sent (chars) |
|---|---|---|---|---|---|---|---|
| CAT rev 3 (本田あきこ) | MODIFIED | 352 | 31 | 8.8 | 55 | 12 | 29.3 |
| Reading rev (山中しんご) | MODIFIED | 318 | 25 | 7.9 | 80 | 12 | 26.5 |
| CAT INTERMEDIATE SHORT (赤木さくら) | INTERMEDIATE | 358 | 27 | 7.5 | 48 | 12 | 29.8 |
| Reading rev (山中しんご) | INTERMEDIATE | 318 | 25 | 7.9 | 80 | 12 | 26.5 |
| Reading rev 3 (山羽たかし) | INTERMEDIATE | 439 | 49 | 11.2 | 61 | 14 | 31.4 |
| Practice CAT LONG (鈴木まさひろ) | INTERMEDIATE | 434 | 29 | 6.7 | 62 | 15 | 28.9 |
| TEST 2025 (田中さゆり) | INTERMEDIATE | 210 | 31 | 14.8 | 81 | 12 | 17.5 |
| Reading rev 2019 (前田しゅうへい) | ADVANCED | 244 | 55 | **22.5** | **24** | 14 | 17.4 |
| CAT 2022 (本田てっぺい) | ADVANCED | 276 | 62 | **22.5** | **16** | 16 | 17.2 |
| CAT rev 3 FINAL 2017 (中本たくみ) | ADVANCED | 249 | 62 | **24.9** | **35** | 13 | 19.2 |
| TEST 2025 (山本けんじ) | ADVANCED | 271 | 43 | 15.9 | 51 | 11 | 24.6 |

**The ADVANCED passages are shorter, not longer.** They carry the same amount of
information in fewer characters because they are written in kanji. Sentence count
is flat (11 to 16 at every tier). What actually moves is:

- **kanji density roughly doubles** (7 to 11 percent → 16 to 25 percent);
- **furigana coverage collapses** (48 to 81 percent → 16 to 35 percent);
- and the words that stay in kana at INTERMEDIATE become kanji at ADVANCED.

Concretely, the same lexical items across the two ends:

| meaning | MODIFIED / INTERMEDIATE | ADVANCED |
|---|---|---|
| I | `わたし` | `私` or `ぼく` |
| years old | `十五さい` | `二十一歳` |
| name | `名前《なまえ》` | `名前` (no reading) |
| like | `好《す》き` | `好き` |
| not good at | `下手《へた》` | `下手` |
| every day | `毎日《まいにち》` | `毎日` |
| morning | `朝《あさ》` | `朝` |
| sometimes | `時々《ときどき》` | `時々` |
| friend | `ともだち` | `友達《だち》` |

Quoting both ends of the same task family directly.

**MODIFIED** (`Unit 10 Reading CAT revision 3 MODIFIED.docx`, glossary of 11
items including `わたし I/me`, `好き like`, `でも but/however`, `毎日 every day`):

> わたしの名前《なまえ》は本田《ほんだ》あきこです。十五さいです。中学３年生です。わたしはすう学とスポーツが好《す》きです。でも、ボールのスポーツは下手《へた》です。
> わたしは毎日《まいにち》、朝《あさ》はやく学校《がっこう》に行きます。じゅどうのトレーニングをします。じゅどうのトレーニングをすることが好《す》きです。時々《ときどき》じゅうどうのたいかいにでます。たいかいは好《す》きじゃないですが、ちょっととくいです。でも、じゅうどうをおしえることができます。食《た》べ物《もの》では、すしが一ばん好《す》きです。

**ADVANCED**, same "revision 3" family (`Unit 10 Reading CAT revision 3 ADVANCED.docx`,
glossary of 8 items, all of them low-frequency: `はやく`, `も`, `よく`,
`見に行きます`, `まだ`, `はなす`, `しょうらい`, `なりたい`):

> 私の名前は前田しゅうへいです。二十歳です。大学三年生です。英語《えいご》とれきしを勉強《べんきょう》しています。れきしが好きですが、むずかしいです。でも、英語が好きです。私は本をよむことが大好きです。私は毎日、朝《あさ》はやくおきて、本やまんがをよみます。好きなまんがはなるととワンピースです。英語の本も　よくよみます。ちょっととくいです。時々週末《まつ》に学校の友達《だち》とハリーウッドのえいがを見《み》に行きます。日本のえいがはまあまあ好きです。私は、まだ英語をはなすことが下手ですが、しょうらいがんばって英語の先生《せんせい》になりたいです。

The **glossary itself is the differentiator**. MODIFIED glosses the everyday
words (`わたし`, `毎日`, `好き`, `でも`); ADVANCED assumes those and glosses only
what is genuinely new (`まだ`, `しょうらい`, `見に行きます`). The 2025 ADVANCED test
goes one step further and prints on the paper:

> **Task 4: Reading (Note: Some underlined words are not in the list below but you may use a dictionary)**

i.e. at ADVANCED the glossary is *deliberately incomplete* and dictionary use is
licensed. The INTERMEDIATE paper of the same test carries no such note and its
glossary covers the passage.

### 3.3 Mechanism C: tier by content world and inference load

The protagonist ages with the tier, which changes the semantic field:

| tier | protagonist | age / level | domain |
|---|---|---|---|
| MODIFIED | 本田あきこ | 15, 中学3年生 | judo, sushi, ball sports |
| INTERMEDIATE | 山中しんご / 赤木さくら / 鈴木まさひろ / 田中さゆり | 14 to 17, 中学2年生 to 高校2年生 | baseball, netball, basketball, cake-making, athletics club |
| ADVANCED | 前田しゅうへい / 本田てっぺい / 中本たくみ / 山本けんじ | 20 to 22, 大学2年生 to 4年生 | history, maths, sudoku, research, reports, international relations |

Inference load rises with it. Compare the two ends of the **2025 test pair**,
which is the cleanest controlled comparison in the folder because
**Tasks 1, 2 and 3 are byte-identical between the INTERMEDIATE and ADVANCED
papers** and only Task 4 (reading) and Task 5 (writing) differ.

INTERMEDIATE 2025 (田中さゆり), inference is one hop and the evidence is adjacent:

> わたしはケーキやチョコレートをつくることが大好《だいす》きです。母といっしょに毎週《まいしゅう》ケーキをつくります。でも、ちょっと下手《へた》です。プロのシェフ《しぇふ》になれません。
> わたしは走《はし》ることが好きです。毎朝《まいあさ》ジョギング《じょぎんぐ》をします。学校《がっこう》のりくじょうぶにも入《はい》っています。人とはなすことが好《す》きです。友《とも》だちとよく　しゃべりますが、はっぴょうすることが下手《へた》です。

The answer key expects: *"Athletics club assistant coach: she likes running and
belongs to the athletics club"* / *"Public speaking tutor: she is not good at
presenting in front of others."* Both are stated almost literally.

ADVANCED 2025 (山本けんじ), inference requires combining a stated preference with a
stated future intention, and the key accepts **three** defensible answers:

> ぼくは 旅行《りょこう》 をすることが 大好き です。 とくに外国《がいこく》の文化《ぶんか》にきょうみがあります。 音楽《おんがく》 も 大好き で、 毎晩《まいばん》 ギター を れんしゅう します。 でも、歌《うた》うことは下手です。 ぼくは パソコン をつかって 、研究《けんきゅう》 することが好きです。 レポートを書《か》くこともとくいです。 でも、人《ひと》の前《まえ》で 発表《はっぴょう》 することがにがてです。 友だちとしゃべることが好きですが、大きいグループではちょっとしずかです。 しょうらい は、 国際《こくさい》 かんけい のしごとや、 音楽 に かんけい するしごとをしたいです。

Key (`Unit_10_Advanced_Test_Model_Answers_Table.docx`): International relations
intern **or** Travel agent assistant **or** Music tutor (guitar), each with its own
justification; least suitable is *"Choir conductor OR Public speaking tutor"*.
Note the deliberately conflicting evidence built into the ADVANCED text
(likes talking with friends, but quiet in large groups; loves music, but bad at
singing), which is what makes the discrimination non-trivial.

### 3.4 A fourth mechanism: faded scaffolding *inside* one task

`Unit 10 and 11 Comparisons Grammar Test V2.docx` removes support item by item
within a single page. This is differentiation without a second worksheet:

```
Q1. ＿＿と＿＿と　では　どちら　の　ほうが＿＿ですか。      (では / どちら / の / ほうが / ですか all given)
Q2. ＿＿と＿＿と　　では　＿＿　の　ほうが＿＿　＿＿。     (どちら and ですか removed)
Q3. ＿＿と＿＿と　では　　どちら　の　＿＿　＿＿ですか。   (ほうが removed)
Q4. ＿＿と＿＿と　＿＿　＿＿　＿　＿＿　＿＿＿＿　＿＿。   (everything removed)
Q5. <my own>                                            (content self-supplied too)
```

The 2026 graphical worksheet does the same thing across its four sections:
① recognise the rule → ② transform ます to plain and build → ③ choose the correct
adjective (with the とくい/じょうず legend visible) → ④ write about yourself →
⑤ チャレンジ: write about **another person** (which forces じょうず).

### 3.5 Summary of the differentiation model

| lever | MODIFIED | INTERMEDIATE | ADVANCED |
|---|---|---|---|
| passage length | same | same | shorter in characters |
| sentence count | 12 | 12 to 15 | 11 to 16 |
| kanji density | 8 to 9 % | 7 to 11 % | 16 to 25 % |
| furigana on kanji | 55 to 80 % | 48 to 81 % | 16 to 35 % |
| glossary | long, includes everyday words | medium | short, only rare words |
| dictionary | not mentioned | not mentioned | explicitly permitted, glossary incomplete |
| protagonist | 15, junior high | 14 to 17, school | 20 to 22, university |
| evidence for job choice | stated literally | stated literally | must be combined; conflicting cues |
| question set | Likes/Dislikes + **Abilities** (one field) | Likes + Strengths + Weaknesses | Likes/Dislikes + Strengths + Weaknesses |
| best/worst job | best only (2 reasons required) | best + least (2025 onward) | best + least |
| production task attached | often removed entirely | translate + construct | translate + construct + verb table + free paragraph |

**Design consequence for the hub:** the band axis for a topic module should vary
*orthography, glossary support and inference load* while holding the passage's
information structure constant. That is exactly a band column over one skill row.
It also means the same passage content can be rendered at three bands from one
source record if the record stores kanji, reading and gloss per token, with
furigana display and glossary depth as band-driven switches. That is a much
cheaper content model than authoring three passages.

## 4. Question and task types, and how the comprehension questions are built

### 4.1 The comprehension question set (stable since at least 2017)

Every job-suitability reading uses the same English answer fields, in this order:

```
Name:
Age:
School level:
Likes: (or Likes / Dislikes:)
Strengths:
Weaknesses:
Suitable position:            (choose from the list below)
Reasons why this position is best:
Least suitable position:      [2022 onward]
Reason why you believe this position is least suitable:
```

followed by a boxed **Positions available** list of 6 to 9 English job titles.

The construction principle is consistent and worth copying exactly:

1. **Answers are in English.** Reading is assessed as comprehension, not as
   production. (Obento does the same: *"answer the questions in English"*,
   *"complete the table in English"*.)
2. **Fields map one-to-one onto the grammar being taught.** "Likes" harvests
   `〜ことが好き`, "Strengths" harvests `とくい` / `上手` / `できます`,
   "Weaknesses" harvests `下手` / `にがて` / `できません`. The comprehension
   questions *are* the grammar test.
3. **Retrieval questions first, inference last.** Name/Age/Level are literal
   lifts; Likes/Strengths/Weaknesses require classifying by adjective; the job
   choice is the only genuine inference and it is the only one that asks "why".
4. **The distractor list does the assessment work.** The Positions list always
   contains near-misses drawn from the passage's own vocabulary. For 鈴木まさひろ
   (loves netball and judo, but his school has neither team, is good at basketball,
   bad at dunking) the list offers Assistant netball coach, Judo personal trainer
   **and** Assistant basketball coach. Choosing netball is the trap; the text
   says `ネットボールのチームもじゅうどうのクラブもありません`.
5. **"Least suitable" is the newer, harder half.** Added around 2022, and present
   in both 2025 test papers. It requires reading the weakness statement and
   matching it against a job, which is harder than matching a strength.
6. **Multiple correct answers are accepted where the text supports them.** The
   ADVANCED key lists three acceptable "most suitable" jobs each with its own
   justification. An auto-checker must accept a set, not a single string.

### 4.2 Full inventory of task types in the folder

| type | what the student does | example file |
|---|---|---|
| **Verb conjugation table** | fill English / ます / 漢字 (extension column) / plain form; group number sometimes given, sometimes asked | `Unit 10 Plain verbs, grammar and reading job suitability Learning Task 2024.docx` |
| **Partial-kanji cloze in the table** | `______います`, `＿＿きます`, `弾　＿　＿　＿` | 2025 TEST papers |
| **Spot test / recall** | do the table once with support, then reproduce it from memory in a second blank table | `Unit 10 like doing Plain verb spot test and sentence practice 2023.docx` |
| **JA → EN translation** | 5 sentences, always the same 5 slots: like / good-at / can / other-person-上手 / 下手 | every CAT and test |
| **EN cue → JA construction** | slash-separated cues, e.g. `guitar / playing / good at`, with a worked example | every CAT and test |
| **Slot-table sentence build** | 7-column frame, some cells given, student completes JA row then EN row | `Unit 10 Reading CAT revision 3 ADVANCED.docx` |
| **Choose the adjective** | `テニスをすることが（ すき ・ じょうず ・ へた ）です。` circle one, then justify by writing | 2026 graphical worksheet |
| **Question-and-answer with forced polarity** | prompt `Tennis/play/can?` then a `Y` line and an `N` line: write the question, then the yes-answer or no-answer | `Unit 10 ことができる・ことが好き・ことがとくい practice worksheet 2021.docx` |
| **Job-suitability reading** | the flagship task, section 4.1 | many |
| **Table-completion reading** | Family member / likes doing / good at doing | Obento p206, p218 |
| **Job advertisement gap-fill** | complete a Japanese ad from English requirements (`Good at speaking Japanese`, `Able to work《はたらきます》 on Sundays`) | `Unit 10 Abilities, JOB AD soccer 2022.docx` |
| **Classmate interview grid** | interview 3 classmates across 5 activities, record like / good at / can | `Unit 10 9年生クラスメートのインタービュー...docx` |
| **Scripted paired interview** | fixed A/B dialogue with three student-chosen `〜ことができますか` questions | `Unit 10 interview worksheet, what you like doing.docx` |
| **Student-authored survey** | write 5 "do you like" and 5 "can you" questions, assessed against a rubric | `Unit 10 Survey on Like and abilities question BLANK.docx` |
| **Think-Pair-Share** | silent write, pair talk 2 to 3 min, share back with `＿＿さんは＿＿になりたいです。＿＿がじょうずです。` | `Unit 10 Jobs and Skills quiz, worksheet DRAFT.docx` |
| **Job/skill matching** | match しごと to スキル (`カフェスタッフ` → `りょうりができます`) | same file |
| **Cultural trivia quiz** | Quick Draw Prediction / Odd One Out / Which Country? / Rank It! / Best Match / Real or Fake?, with a printed response card | `Unit 10 Jobs_Trivia_Quiz_Round1_2 and 3.pptx` |
| **Research task** | top-ten sports, sumo vocabulary, historical figures; MODIFIED versions pre-draw the grid | 3 files |
| **Kana grid practice** | blank 5 by 10 hiragana and katakana grids, dated | `Unit 10 Topic kanji and kana practice worksheet 2023.docx` |
| **Kanji compound grid** | 日/週/月/年 × last/this/next | `Unit 10 Kanji blank for today, week, month, year, last, this, next.docx` |
| **Paragraph writing** | name, age, level, likes, weekend (with たりたり), strengths, weaknesses | tari-tari CAT, Task 5 of both 2025 tests |
| **Listening** | one .mp3 plus Obento p212 №5 (Olympic timetable) and p213 №7 (plain→ます matching) | audio not transcribed |

### 4.3 The assessment rubric

`Unit 10 Rubric survey on likes and abilities.JPG`, six levels:
**Not Met | Emerging | Working Towards the Standard | At the Standard | Above the Standard | Well Above the Standard**

Criteria, as printed: **Criteria 1: Communication**, **Criteria 3: Script**,
**Criteria 4: Understanding**, **Criteria 5: Translating**, **Quality of written
presentation**. ("Criteria 2" is absent from the image; see open questions.)

The progression inside Criteria 3 (Script) is a clean band ladder and is worth
copying verbatim as band descriptors:
*unable to write hiragana and katakana* → *some* → *most* → *perfectly* →
*perfectly and many kanji* → *the natural combination of hiragana, katakana and kanji*.

Note "Translating" and "Quality of written presentation" cap out at "At the
Standard" (N/A above), i.e. they are threshold criteria, not stretch criteria.

Separately, `Unit 10 Y9 SEM 2 Expression preferences and abilities CAT criteria.docx`
gives the CAT's four criteria in one line each: *Use key grammar / Accurate and
neat / Relevant to Australia / Melbourne / New or interesting for Japanese
teenagers on their first trip to Australia*.

### 4.4 Andrew's own annotation conventions (from the handwritten models)

`Unit 10 and 11 like doing MODEL sentences 2020.png` and
`Unit 10 paragraph task model sentences.png` show a consistent visual code:

- **underline** = the substitutable slot (the word the student swaps out)
- **circle** = the object / particle being pointed at (`スポーツ`, `に`)
- **box** = the adjective carrying the meaning (`すき`, `すきじゃない`, `上手`, `下手`),
  boxed identically in the English gloss (`likes`, `doesn't like`, `good at`, `bad at`)
- small furigana added above kanji in a second colour

The English is written directly beneath the Japanese, phrase-aligned. This maps
directly onto the sentence-role tile idea in `collab/DESIGN_PHILOSOPHY.md`, and
onto a `clickword` task type ("click the adjective that tells you he is bad at it").

The tips block on the same page is his stated policy for student tool use:

> Use jisho.org (not Google translate) / Find vocab in Obento / Use kanji where
> possible / Use the verb list in today's lesson plan

## 5. Vocabulary bank

Every entry below appears in at least one file in this folder. "Reading" is the
kana as Andrew writes it, taken from his furigana or his own kana spelling.
"Src" names one representative source file.

Legend: **[UNCONFIRMED]** = the form or gloss could not be verified from the
materials; **[TYPO?]** = looks like an error in the source.

### 5.1 Ability and preference adjectives (the topic's spine)

| Japanese | Reading | English | Src |
|---|---|---|---|
| 好き | すき | like | Topic Kanji 1 |
| 大好き | だいすき | love, very fond of | Topic Kanji 1; TEST ADVANCED 2025 |
| 好きじゃない | すきじゃない | don't like | Reading CAT ADVANCED 2022 |
| あまり好きじゃない | あまりすきじゃない | don't like very much | Reading CAT ADVANCED 2022 |
| 上手 | じょうず | good at (**used about other people**) | like doing Plain verb list |
| 得意 / とくい | とくい | good at (**used about yourself**) | ことができる・好き・とくい Worksheet 1 2024 |
| 下手 | へた | not good at (anyone) | like doing Plain verb list |
| 苦手 / にがて | にがて | weak at, not good at | Advanced Test Model Answers; TEST ADVANCED 2025 |
| できます / できる | できます / できる | able to do | plain form verb list |
| きらい | きらい | dislike | Obento p204 scan **(textbook only, not in Andrew's own passages)** |
| 大きらい | だいきらい | hate | Obento p204 scan **(textbook only)** |

### 5.2 Verbs (the Unit 10 verb set)

From `Unit 10 Obento p203 plain form verb table complete.docx`,
`Unit 10 plain form verb list.docx`, `Unit 10 Topic Kanji 1 Verbs, adjectives etc.docx`,
and the 2025 test model answers. Group numbers are Andrew's (1 = う/godan,
2 = る/ichidan, 3 = irregular).

| Kanji | Plain | ます | Gr | English |
|---|---|---|---|---|
| ‑ | する | します | 3 | do, play |
| 話す | はなす | 話します | 1 | speak, talk |
| 行く | いく | 行きます | 1 | go |
| 書く | かく | 書きます | 1 | write |
| 聞く | きく | 聞きます | 1 | listen |
| 見る | みる | 見ます | 2 | see, watch, look |
| 食べる | たべる | 食べます | 2 | eat |
| 飲む | のむ | 飲みます | 1 | drink |
| 読む | よむ | 読みます | 1 | read |
| 買う | かう | 買います | 1 | buy |
| 作る | つくる | 作ります | 1 | make |
| 使う | つかう | 使います | 1 | use |
| 乗る | のる | 乗ります | 1 | ride, catch, get on |
| 弾く | ひく | 弾きます | 1 | play (stringed instrument) |
| 歌う | うたう | 歌います | 1 | sing |
| 走る | はしる | 走ります | 1 | run |
| 勉強する | べんきょうする | 勉強します | 3 | study |
| ‑ | れんしゅうする | れんしゅうします | 3 | practise |
| ‑ | およぐ | およぎます | 1 | swim |
| ‑ | おきる | おきます | 2 | get up |
| ‑ | かえる | かえります | 1 | return |
| ‑ | まつ | まちます | 1 | wait |
| ‑ | やめる | やめます | 2 | quit |
| ‑ | あそぶ | あそびます | 1 | muck around, hang out |
| ‑ | リラックスする | リラックスします | 3 | relax |
| 来る | くる | きます | 3 | come |
| ‑ | かいものする | かいものします | 3 | to shop |
| ‑ | できる | できます | 2 | be able to do |
| ‑ | おしえる | おしえます **[UNCONFIRMED]** | 2 **[UNCONFIRMED]** | teach (glossed `おしえる teach` in 13 readings; ます form and group never stated) |
| ‑ | でます | ‑ | ‑ | appear in, enter (a match). Glossed only as `でます`; plain form `でる` **[UNCONFIRMED]** |
| ‑ | とく | ‑ | ‑ | solve (a problem) |
| 説明する | せつめいする | 説明します | 3 | explain |
| 発表する | はっぴょうする | 発表します | 3 | present |
| ‑ | しゃべります | ‑ | ‑ | chat, talk. Plain form `しゃべる` **[UNCONFIRMED]** |
| ‑ | たすける | ‑ | ‑ | help |
| 会う | あう | 会います **[UNCONFIRMED]** | ‑ | meet |
| 入る | はいる | 入ります | ‑ | enter, belong to (a club) |
| ‑ | つづける | つづけます | 2 | continue (Obento p213 №7 only) |

### 5.3 Sports

| Japanese | Reading | English | Src |
|---|---|---|---|
| スポーツ | ‑ | sport | everywhere (54 hits, 38 files) |
| トレーニング | ‑ | training | 14 files |
| バスケットボール | ‑ | basketball | Practice CAT LONG |
| ネットボール | ‑ | netball | CAT INTERMEDIATE SHORT |
| バレーボール | ‑ | volleyball | Reading revision 3 |
| サッカー | ‑ | soccer | many |
| フットボール | ‑ | football | many |
| テニス | ‑ | tennis | many |
| バドミントン | ‑ | badminton | job suitability Learning Task 2024 |
| ゴルフ | ‑ | golf | Worksheet 2; interview worksheet |
| クリケット | ‑ | cricket | PRACTICE FINAL 2025 |
| やきゅう | やきゅう | baseball (written in kana, never 野球) | Reading revision MODIFIED |
| じゅうどう / じゅどう | ‑ | judo (both spellings appear in one passage) | CAT rev 3 MODIFIED |
| からて | ‑ | karate (kana) | job suitability Learning Task 2024 |
| 水泳 | すいえい | swimming | Advanced Test Model Answers |
| ジョギング | ‑ | jogging | TEST INTERMEDIATE 2025 |
| りくじょうぶ | ‑ | athletics club | TEST INTERMEDIATE 2025 |
| しあい | ‑ | game, match | 9 readings |
| たいかい | ‑ | tournament, bout | CAT rev 3 MODIFIED |
| チーム | ‑ | team | CAT INTERMEDIATE SHORT |
| クラブ | ‑ | club | Practice CAT LONG |
| コーチ | ‑ | coach | Abilities Reading verb and kanji PRAC 2022 |
| ダンク | ‑ | dunking | Practice CAT LONG |
| ドリブル | ‑ | dribbling | Practice CAT LONG |
| パス | ‑ | passing | Practice CAT LONG |
| スラム | ‑ | slam (dunk) | job suitability Learning Task 2024 |
| ピチャー | ‑ | pitcher **[TYPO?]** standard form is ピッチャー | Reading revision INTERMEDIATE |
| バッティング | ‑ | batting | Reading revision INTERMEDIATE |
| ボート | ‑ | rowing boat | Reading CAT revision 2 |
| レース | ‑ | race | Reading CAT revision 2 |
| オリンピック | ‑ | Olympics | Worksheet 2 |

**Gap:** Obento p212 asks students to supply Japanese for *aikido, kyudo, kendo,
sumo, karate, judo, rugby, softball, captain, team, competition, sporting
discipline, champion, Olympics*. **The table in this folder is blank** and the
Japanese lives in the Obento Student Book, which is not here. Do not invent these.

### 5.4 Jobs and careers

Mostly from the two .pptx decks and the jobs quiz. **Treat the deck vocabulary as
unverified** (see section 7.2).

| Japanese | Reading | English | Src |
|---|---|---|---|
| しごと / 仕事 | しごと | work, job | Jobs deck slide 1 |
| アルバイト / バイト | ‑ | part-time job | Trivia deck slide 2 |
| 先生 | せんせい | teacher | many |
| 家庭教師 | かていきょうし **[UNCONFIRMED]** reading not given in source | private tutor | Jobs deck slide 2 |
| 医者 | いしゃ | doctor | Trivia deck slide 15 |
| 会社員 | かいしゃいん | company employee | Trivia deck slide 15 |
| 公務員 | こうむいん | public servant | Trivia deck slide 15 |
| 店員 / てんいん | てんいん | shop clerk | Jobs deck slide 2 |
| コンビニてんいん | ‑ | convenience store clerk | Trivia deck slide 2 |
| カフェスタッフ | ‑ | cafe staff | Trivia deck slide 2 |
| レストランスタッフ | ‑ | restaurant staff | Trivia deck slide 2 |
| アパレルてんいん | ‑ | fashion retail assistant | Trivia deck slide 3 |
| ファストフードてんいん | ‑ | fast food staff | Trivia deck slide 9 |
| バリスタ | ‑ | barista | Jobs quiz Part 1 |
| エンジニア | ‑ | engineer | Jobs deck slide 4 |
| プログラマー | ‑ | programmer | Jobs quiz Part 1 |
| かんごし | ‑ | nurse | Jobs deck slide 7 |
| スキル | ‑ | skill | Jobs and Skills quiz |
| 通訳 | つうやく | interpreter, interpreting | Advanced Test Model Answers |
| 募集 | ぼしゅう | wanted, recruiting | JOB AD soccer 2022 |
| 応募者 | おうぼしゃ | applicant | JOB AD soccer 2022 |
| はたらきます | ‑ | to work | JOB AD soccer 2022 |
| なりたい | ‑ | want to become | 6 readings |
| しょうらい | ‑ | future | 11 readings |

The **Positions available** lists in every reading task are in **English only**
(sushi bar waiter, judo instructor, maths tutor, assistant baseball coach,
bicycle shop sales assistant, personal trainer, supermarket stacker, science lab
assistant, junior bank clerk, manga illustrator, anime reviewer for student
newspaper, kindergarten assistant, English conversation buddy, travel agent
assistant, international relations intern, choir conductor, public speaking
tutor, assistant camera operator, and so on).

### 5.5 School life, people, subjects, food, time

| Japanese | Reading | English | Src |
|---|---|---|---|
| 名前 | なまえ | name | Topic Kanji 1 |
| ‑さい / 歳 | さい | years old (ADVANCED uses 歳) | readings |
| 中学 | ちゅうがく | junior high | Reading revision MODIFIED |
| 高校 | こうこう | senior high | Practice CAT LONG |
| 大学 | だいがく | university | Topic Kanji 1 |
| ～年生 | ～ねんせい | ‑year student | Topic Kanji 1 |
| 学校 | がっこう | school | readings |
| 組 | くみ | class (group) | worksheet headers |
| 人 | ひと | person | Topic Kanji 1 |
| 友だち / 友達 | ともだち | friend | readings |
| 父 / 母 / あね / おとうと / 妹 / そぼ | ちち / はは / あね / おとうと / いもうと / そぼ | dad / mum / older sister / younger brother / younger sister / grandmother | model answers; Obento p206 |
| 日本語 | にほんご | Japanese language | many |
| 英語 | えいご | English language | Topic Kanji 1 |
| 漢字 | かんじ | kanji | Topic Kanji 1 |
| ひらがな / 平仮名 | ‑ | hiragana | Practice CAT LONG |
| カタカナ | ‑ | katakana | PRACTICE FINAL 2025 |
| 数学 / すう学 | すうがく | maths | Reading CAT ADVANCED 2022 |
| 科学 | かがく | science | Reading CAT ADVANCED 2018 |
| れきし / 歴史 | れきし | history | Reading revision ADVANCED 2019 |
| ちり | ‑ | geography | Reading CAT ADVANCED 2022 |
| 美術 | びじゅつ | art | Intermediate Test Model Answers |
| 音楽 / おんがく | おんがく | music | Topic Kanji 1; TEST ADVANCED 2025 |
| 図書館 | としょかん | library | Advanced Test Model Answers |
| 本 | ほん | book | Topic Kanji 1 |
| まんが | ‑ | manga | Reading revision ADVANCED 2019 |
| アニメ | ‑ | anime | Reading CAT ADVANCED 2022 |
| えいが | ‑ | movie | Reading revision 3 |
| パソコン | ‑ | personal computer | TEST ADVANCED 2025 |
| ゲーム | ‑ | game | model answers |
| しゅくだい | ‑ | homework | tari-tari CAT |
| さくぶん | ‑ | essay | Obento p206/p218 scan |
| もんだい | ‑ | problem, question | CAT rev 3 FINAL 2017 |
| すうどく / 数独 | すうどく | sudoku | Reading CAT ADVANCED 2022 |
| 研究 | けんきゅう | research | TEST ADVANCED 2025 |
| 旅行 | りょこう | travel | TEST ADVANCED 2025 |
| 外国 | がいこく | foreign country | model answers |
| 文化 | ぶんか | culture | TEST ADVANCED 2025 |
| 国際 | こくさい | international | TEST ADVANCED 2025 |
| りょうり | ‑ | cooking | Reading revision 3 |
| すし | ‑ | sushi | Practice CAT LONG |
| おこのみやき | ‑ | okonomiyaki | Practice CAT LONG |
| てんぷら | ‑ | tempura | job suitability Learning Task 2024 |
| なっとう | ‑ | natto (fermented soy bean) | 2025 TESTs |
| さしみ | ‑ | sashimi (raw fish) | Reading CAT ADVANCED 2022 |
| ケーキ | ‑ | cake | TEST INTERMEDIATE 2025 |
| チョコレート | ‑ | chocolate | TEST INTERMEDIATE 2025 |
| おちゃ | ‑ | green tea | Worksheet 2 |
| コーヒー / こうちゃ | ‑ | coffee / black tea | Comparisons revision |
| 毎日 | まいにち | every day | 13 readings |
| 毎週 | まいしゅう | every week | TEST INTERMEDIATE 2025 |
| 毎朝 | まいあさ | every morning | TEST INTERMEDIATE 2025 |
| 毎晩 | まいばん | every night | TEST ADVANCED 2025 |
| 時々 | ときどき | sometimes | readings |
| よく | ‑ | often | 15 readings |
| まだ | ‑ | still | 6 readings |
| 週末 / 週まつ | しゅうまつ | weekend | Reading revision 3 |
| 土曜日 / 日曜日 | どようび / にちようび | Saturday / Sunday | Reading CAT rev 2; tari-tari CAT |
| 朝 | あさ | morning | readings |
| はやく | ‑ | early | 19 readings (most frequent gloss in the folder) |
| 今 / 先 / 来 + 日・週・月・年 | ‑ | this / last / next + day, week, month, year | Kanji blank worksheet; Obento p209 |

### 5.6 Function words and connectives

`でも` (but, however) · `〜が、` (but) · `そして` (and then) · `それから` (after that) ·
`だから` (so, therefore) · `とくに` (especially) · `も` (also, too) · `〜や〜` (and, partial list) ·
`あまり〜ません` (not very much) · `ちょっと` (a bit) · `まあまあ` (so-so) · `とても` (very) ·
`一ばん` (most, number one) · `で` (in, by means of) · `やさしい` (easy) · `むずかしい` (difficult) ·
`〜たい` (want to) · `〜になりたい` (want to become) · `がんばって` (do one's best) ·
`きょうみがある` (be interested in) · `いっしょに` (together) · `なれません` (can't become)

### 5.7 Readings that could not be confirmed from the source

The Word furigana fields in several older files store **partial** readings
(alignment padding rather than the full reading). These are recorded as they
appear and must not be taken as correct:

- `山中《   なか》` in Reading revision MODIFIED/INTERMEDIATE. Family name, likely
  やまなか **[UNCONFIRMED]**.
- `週末《まつ》` in three ADVANCED passages (stored as `週《しゅう》末《まつ》`).
- `友達《だち》` in three ADVANCED passages.
- `行きます《い　　　》`, `科学者《しゃ》`, `大《だい》好《す》き` similarly split.
- `本田《ほんだ》` is given fully in the MODIFIED file only.

## 6. What this means for the hub's first topic module

Concrete, evidence-backed:

1. **One passage record, three band renderings.** The tier data shows the passage
   *content* is constant and only orthography plus glossary depth change. Store
   each passage as tokens with `{surface, reading, gloss, band_first_seen}` and
   let the band column drive furigana display and glossary inclusion. Three bands
   from one authored text, which is far cheaper than three texts.
2. **The comprehension field set is fixed and reusable**: Name / Age / School
   level / Likes / Strengths / Weaknesses / Most suitable + why / Least suitable +
   why. Answers in English. This is a task type, not a one-off.
3. **The Positions list is the assessment instrument.** Distractors must be drawn
   from the passage's own vocabulary, and the checker must accept a *set* of
   correct answers with per-answer justification, honestly reporting that it
   cannot judge the free-text "why" (which is exactly the DESIGN_PHILOSOPHY
   "say the honest thing" pattern).
4. **`とくい` vs `上手` is a genuinely auto-checkable rule** tied to the sentence
   subject. It is the best candidate in this topic for a `transform` or `match`
   task with a real, teachable `explain`.
5. **Colour is already load-bearing in Andrew's own 2026 worksheets** (blue/green/
   orange for する / る-verbs / う-verbs; blue/green for noun-が vs verb-ことが).
   The hub should adopt a category colour set for this, but note the two 2026
   worksheets use blue and green for **different** category pairs, so the mapping
   has to be settled before it is bound (see open questions).
6. **The seven-slot table is the sentence builder.** object | を | plain verb |
   こと | が | adjective | です maps directly onto a tile `order` task and onto
   Andrew's own circle/underline/box annotation code.
7. **Faded scaffolding within one task** (comparisons test Q1 to Q5) is a
   difficulty-rung mechanism that costs nothing to implement and is already in
   his practice.
8. **Reading answers are in English throughout.** The module should not force
   Japanese output in the comprehension lane.

## 7. Privacy, copyright and data-quality flags

### 7.1 Privacy

**One finding requiring action.**

- **`Unit 10 paragraph task model sentences.png`** contains, in the lower-left
  corner in the teacher's handwriting, what appears to be **a student's first
  name followed by a two-item note**. It is separate from the lesson content and
  looks like an in-class jotting. This is identifying information about a
  student and should be cropped out or the file removed before this folder goes
  anywhere public. The teaching content on the rest of the page is valuable and
  worth keeping in a cropped version. *(The name is not reproduced here.)*

**Two lower-severity items, for Andrew's decision:**

- **`Unit 10 interview worksheet, what you like doing.docx`**: the document
  metadata names a Japanese individual as author (`dc:creator` and
  `cp:lastModifiedBy`), and the worked example inside the file uses a named
  teacher (`＿＿先生`) as the interview subject. A third party's name in a file
  that may be redistributed. Not a student.
- **`Unit 10 suru koto ga suki Grammar CAT 2 Part 2...docx`** and the handwritten
  models reference **Kew** (`キューに住んでいます`), the school's suburb. A suburb
  name, not a person, and it is used deliberately as local context. Noted only
  so the decision is conscious.

**Checked and clear:**

- Author metadata was read for all 79 .docx and 4 .pptx. Every file except the
  one above is authored by Andrew himself (or by `python-docx` for
  machine-generated ones, last-modified by Andrew). **No student names in
  metadata.**
- The names in every reading passage (本田あきこ, 山中しんご, 赤木さくら,
  鈴木まさひろ, 前田しゅうへい, 田中さゆり, 山本けんじ, 中本たくみ, 本田てっぺい,
  山田あきら, 渡辺けん, 山羽たかし, 山田たろう, 佐藤ゆみ) are **fictional
  characters Andrew wrote**, confirmed by the answer-key deck
  `Unit 10 reading intermediate and advanced answers Shuhei Maeda and Sakura
  Akagi.pptx`, which lists them as the passage protagonists.
- `Unit 10 and 11 Comparisons Grammar Test V2 SUGGESTED RESPONSES.pdf` is
  **the teacher's own handwriting** on a blank-name-field paper. Not student work.
- No class lists, no marks, no grade data, no school-internal URLs, no keys.
- The Genkoo yooshi .doc files are blank writing grids.
- **Confirmation requested in the brief:** apart from the one image above,
  **no further student-scan material was found** in this folder.

### 7.2 Copyright, which is arguably the bigger risk for a public web app

Five files are **scans of Obento Supreme 5E** (Cengage, ISBN 9780170198349 and
9780170417693), reproducing full textbook and workbook pages including artwork:

- `Unit 10 Obento p204 three blurbs about sports like doing.jpg`
- `Unit 10 Obento WB pgs 201, 202.pdf`
- `Unit 10 abilities and jobs reading tasks pages 206, 211 Obento Supreme 5E.pdf`
- `Unit 10 abilities and jobs reading tasks pages 218, 224 Obento Supreme 5E.pdf`
- `Unit 10 pages 209, 212, 213.pdf`
- plus `Unit 10 pages 218, 224 Obento Supreme 5E with annotations.docx` and
  `Unit 10 Abilities and preferences p216 4th edition.docx`, which embed the same
  page images
- and very likely `Unit 10 Talking about people's preferences and abilities.mp3`

These are fine as teacher reference for reconstructing the *task shapes*. **None
of this content, text or artwork, can go into the deployed app.** The module must
re-author every passage. The good news from section 1 is that Andrew has already
done exactly that for years, so his own parallels are the safe source.

### 7.3 Data-quality flags (do not silently correct these)

In Andrew's own materials:
- `ピチャー` for pitcher (standard: ピッチャー), in three files.
- `ハリーウッド` for Hollywood (standard: ハリウッド), in two files.
- `インタービュー` in the classmate interview filename and heading; the other
  interview worksheet uses `インタビュー`.
- `じゅどう` and `じゅうどう` both used within a single MODIFIED passage.
- The MODIFIED file `Unit 10 Reading CAT revision 3 MODIFIED.docx` has the header
  text "Reading Comprehension Revision 3 **INTERMEDIATE**". Filename and header
  disagree. Same for `Unit 10 Reading revision MODIFIED.docx`.
- `Unit 10 Verb pain form and sentence koto test.docx` (filename typo for "plain").
- `Assistant sushi check` for "chef" in two 2025 files.

In the two AI-looking .pptx decks (`Simplified_Updated_Jobs_Presentation_2025.pptx`,
`Unit 10 Jobs_Trivia_Quiz_Round1_2 and 3.pptx`), which have a different character
from the rest of the folder:
- slide 8 gives `はかせ (Doctor)` and `かしょうし (Nurse)` for Australia, while
  slide 7 gives `かんごし` for nurse. `はかせ` (博士) is an academic doctorate, not a
  physician, and `かしょうし` does not appear to be a word. **Both look wrong.**
- `レストランのキチンスタッフ` (probably キッチン).
- `プロねむりん (Professional Sleeper)` does not look like real Japanese.

**Recommendation: do not mine the two jobs decks for vocabulary until Andrew has
checked them.** The rest of the folder is his own careful work and reads as
reliable; those two files do not.

## 8. Open questions for Andrew

These are the points where the module cannot be built without a ruling from the
Japanese teacher. Numbered for the questions file.

1. **The handwritten corner note.** There is a student first name handwritten in
   the lower-left corner of `Unit 10 paragraph task model sentences.png`
   (not reproduced here). May we crop that corner and keep
   the rest of the page (it is one of the best model artefacts in the folder), or
   should the file be deleted outright?
2. **`とくい` vs `じょうず` for yourself.** Your verb lists state
   `とくい = my own abilities`, `上手 = other people`, and the 2026 worksheet page 2
   prints the legend `とくい ＝ me / じょうず ＝ another person`. But the 2026
   すき・じょうず・へた worksheet section 4 asks students to circle
   `すき ・ じょうず ・ へた` about themselves, and its model shows
   `えをかくことがじょうずです`. Is じょうず acceptable for self here, or is that a
   slip we should fix before the rule goes into an auto-checker?
3. **What does MODIFIED mean to you?** The evidence says two different things.
   In the Reading revision pair the passage is identical and MODIFIED simply drops
   the grammar production page. In the CAT revision 3 pair the MODIFIED passage is
   a different, easier text. Which is the intended model, or is it both depending
   on the class?
4. **Colour bindings.** Your 2026 worksheets already use colour to carry meaning,
   but the same colours carry different categories on the two sheets: on the
   plain-form sheet blue = する, green = る-verbs, orange = う-verbs; on the
   すき・じょうず・へた sheet blue = `noun が すき` and green = `verb ことが すき`.
   Which mapping should the hub bind permanently?
5. **Sports vocabulary in Japanese.** Obento p212 asks for Japanese for aikido,
   kyudo, kendo, sumo, karate, judo, rugby, softball, captain, team, competition,
   sporting discipline, champion and Olympics, and the table in this folder is
   blank. We will not guess these. Can you supply the list as you teach it,
   including whether you want 野球 or やきゅう, 柔道 or じゅうどう?
6. **The two jobs .pptx decks.** They contain several apparent errors
   (`はかせ` glossed as doctor, `かしょうし` for nurse, `キチンスタッフ`,
   `プロねむりん`) and read as machine-generated rather than yours. Should we treat
   them as unusable for vocabulary, or do you want to correct them?
7. **Rubric criterion 2.** The survey rubric image shows Criteria 1, 3, 4, 5 plus
   "Quality of written presentation". What is Criteria 2, and is it deliberately
   omitted for this task?
8. **The 2025 ADVANCED writing task.** On the INTERMEDIATE paper, Task 5 says
   "use the reading task as a model to write a paragraph about yourself". On the
   ADVANCED paper, Task 5 supplies a full English paragraph to render into
   Japanese. That is a heavier content load but a lighter composition load. Is the
   ADVANCED version deliberately a translation task, or is that a leftover?

## 9. Appendix: file inventory by role

**Tiered reading tasks (11 passages, the core evidence):** Reading CAT revision 3
MODIFIED / ADVANCED / ADVANCED FINAL / ADVANCED FINAL 2017; Reading revision
MODIFIED / INTERMEDIATE / INTERMEDIATE with GRAMMAR REVISION / 3 / ADVANCED 2019;
Reading CAT INTERMEDIATE SHORT / INTERMEDIATE Prac 1 2025; Reading CAT ADVANCED
2018 / 2022; Reading CAT revision 2; Practice Reading CAT INTERMEDIATE LONG
(3 variants incl. tari-tari and ANSWERS); grammar and reading PRACTICE FINAL
INTERMEDIATE and ADVANCED 2025 (+ANSWERS); grammar and reading PRACTICE worksheet
2 2025; verb conj/grammar/reading/writing TEST INTERMEDIATE and ADVANCED 2025
(+ two model-answer files); Plain verbs grammar and reading job suitability
Learning Task 2024; Abilities Reading verb and kanji PRAC 2022;
ことができる・好き・とくい Worksheet 1 2024; ことができる・ことが好き・ことがとくい
practice worksheet 2021.

**Grammar drill:** suru koto ga suki Grammar Practice 1 and 2 and CAT 2 Part 2;
grammar test I like doing etc (2 versions); Verb plain form and sentence koto
test / TEST / revision 3 / Extension; vocab and grammar worksheet (3 versions);
like doing Plain verb and sentence practice (3 versions); like doing Plain verb
spot test 2023; like good at bad at doing sentence practice 1; Abilities and
preferences Worksheet 2; Unit 10 and 11 Like Doing and Comparisons Grammar Text
Revision (3 versions) and Comparisons Grammar Test V2 (+ handwritten responses).

**Vocabulary and kanji reference:** Topic Kanji 1; Topic kanji and kana practice
worksheet 2023; plain form verb list; like doing Plain verb list; plain form verb
and other KANJI list; Obento p203 plain form verb table complete; vocabulary for
CAT 2022 SUPP differentiation; Kanji blank for today/week/month/year.

**Speaking and survey:** Survey on Like and abilities question BLANK (+ MODIFIED);
9年生クラスメートのインタービュー; interview worksheet what you like doing;
Jobs and Skills quiz worksheet DRAFT (Think-Pair-Share).

**Jobs and culture:** Jobs_Trivia_Quiz_Round1_2 and 3.pptx; JOBS CAREERS Japan
Australia TRIVIA QUIZ response CARD; Simplified_Updated_Jobs_Presentation_2025.pptx;
Popular and desirable jobs data ... 2024.pptx; Abilities JOB AD soccer 2022 (+ANSWERS).

**Research:** MODIFIED TOP TEN SPORTS; abilities SUMO word research modified;
Unit 10 and 11 MODIFIED Historical Figures.

**Assessment:** Rubric survey on likes and abilities.JPG; Y9 SEM 2 Expression
preferences and abilities CAT criteria.

**Graphical worksheets (2026, the design model):** Like good at bad at GRAPHICAL
worksheet ONE PAGE 2026.png; Abilities and preferences Plain form practice
GRAPHICAL no2.docx (two embedded one-pagers).

**Handwritten teacher models:** Unit 10 and 11 like doing MODEL sentences 2020.png;
Unit 10 paragraph task model sentences.png (privacy flag, see 7.1).

**Textbook scans (copyright, see 7.2):** 5 PDF/JPG plus 2 .docx with embedded
page images, plus the .mp3.
