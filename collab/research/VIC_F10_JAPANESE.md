# Victorian Curriculum F–10 Japanese — full extraction

**Source:** `Japanese F–10 Sequence, Foundation–Level 10.docx` (VCAA, Victorian
Curriculum 2.0, Languages – Japanese; content-description codes are `VC2LJ*`).
Extracted 2026-08-18 by unzipping `word/document.xml` and parsing the single
five-column table it contains. The document body is **one table**, 36 rows,
columns = the five bands.

**Duplicate check:** `Japanese F–10 Sequence, Foundation–Level 10 (1).docx` is
**byte-identical** to the other copy (md5 `43b5dadf7763d35a406a1b27874c7200`
for both; `cmp` reports no difference). One of the two can be deleted; there is
no second version to reconcile.

**Coverage check:** the extraction below is complete. The `.docx` contains 367
`<w:t>` runs, all of which land in the 36-row table plus the title and the
page footers (`© | VCAA | Page …`). There are no elaborations, no glossary, no
appendix, no kanji list, no text-type list in this file. What you see here is
the whole curriculum document.

---

## 0. The single most important finding, stated up front

**This document names no Japanese grammar points at all.** Across the entire
F–10 sequence — all five bands, all three strands, both achievement standards
and content descriptions — the following words appear **zero** times:

> particle, adjective, noun, pronoun, copula, conjugation/conjugate, counter,
> word order, SOV, polite, です, ます, te-form, plain form (as a term),
> transitive/intransitive, negation, question word.

The word "verb" appears six times and **every one of them is inside
"non-verbal"**. The word "tense" appears exactly once, in the Levels 9–10
achievement standard ("use a variety of tenses to sequence events").

Everything the curriculum says about grammar is said with the phrase
**"grammatical structures"** (or "sentence structures", "language structures
and features"), qualified only by a difficulty adverbial that escalates band by
band: *simple → modelled → a range of modelled → apply understanding of →
some complex*.

**Consequence for the hub:** the F–10 curriculum cannot be used to derive a
grammar scope-and-sequence. It can be used to derive (a) **script
expectations**, (b) a **metalanguage ladder**, (c) **complexity descriptors**
for the band labels, and (d) **text/skill-type coverage**. Any row of the
matrix that names a specific structure (て-form, ない-form, plain form,
nominalisers …) is a *program* decision, not a curriculum requirement, and must
be attributed to Andrew, the textbook, or VCE — never to "the Victorian
Curriculum".

---

## 1. Document architecture

Three strands, seven sub-strands. Note that the whole first strand is
**Foundation–Level 2 only** — those cells are empty in every other column.

| Strand | Sub-strand | Code stem | Bands present |
|---|---|---|---|
| Engaging with Japanese Language and Culture | Engaging with Japanese language | `…E01–E03` | F–2 only |
| Engaging with Japanese Language and Culture | Engaging with Japanese culture | `…E04` | F–2 only |
| Communicating Meaning in Japanese | Interacting in Japanese | `…C01, C02` | all five |
| Communicating Meaning in Japanese | Mediating meaning in and between languages | `…C03, C04` | all five |
| Communicating Meaning in Japanese | Creating text in Japanese | `…C05` | all five |
| Understanding Language and Culture | Understanding systems of language | `…U01–U03` (F–2: `U01–U04`) | all five |
| Understanding Language and Culture | Understanding the interrelationship of language and culture | `…U04` (F–2: `U05, U06`) | all five |

Code format: `VC2LJ` + band number (`2`, `4`, `6`, `8`, `10`) + strand letter
(`E`/`C`/`U`) + two digits. F–2 carries two extra `U` descriptors
(`VC2LJ2U01` on the Hiragana chart, `VC2LJ2U06` on where Japanese is used) that
have no counterparts further along the row.

**Relevance filter for a 7–12 teacher:** only two of the five bands describe
secondary schooling — **Levels 7–8** and **Levels 9–10**. F–2, 3–4 and 5–6 are
primary. So the entire F–10 curriculum contributes **two rungs** to the hub's
ladder, and both are written in generic terms. The primary bands are recorded
below in full anyway, because they are the only place the curriculum is
concrete about scripts, and because a Year 7 beginner is functionally working
at the script level the primary bands describe.

---

## 2. Band by band

### 2.1 Foundation – Level 2

**Achievement standard** (three paragraphs, quoted in full because the script
clauses matter):

> "By the end of Level 2, students identify the different sounds and rhythms of
> the Japanese language by listening to and viewing a variety of texts. They
> compare these sounds with other languages, noticing how pronunciation changes
> and discovering how languages are influenced by each other. They explore
> Japanese through play, first imitating sounds and patterns, then replicating
> expressions and phrases, before producing responses using formulaic and
> familiar language. **They recognise that Japanese uses 3 scripts: Hiragana,
> Katakana and Kanji.** They can match words with images and combine them to
> create meaning. They develop and expand their vocabulary, from simple sounds
> to frequently used words and phrases, using the pronunciation and intonation
> patterns of spoken Japanese. They expand their repertoire of Japanese words
> and phrases through listening and reading, and then progress to creating
> simple sentences and responses using modelled language."

> "Students identify familiar words and phrases to obtain meaning from a
> variety of multimodal texts relating to their personal world. **They begin to
> explain their understanding of the features and grammatical structures of
> Japanese using simple metalanguage.** They start to develop written
> competence by **copying simple, frequently used Kanji, the Hiragana and then
> some simple Katakana** to produce words and phrases with support. They
> respond to texts using frequently used words, phrases and sentence patterns
> in both written and spoken language. They apply their understanding of some
> of the conventions and features of the written Japanese language. **They use
> common grammatical structures to create their own simple texts**, with the
> support of visual and/or spoken cues."

> "Students explore and recognise the influence of culture on language and
> identity. They recognise that Japanese is spoken in communities and regions in
> Australia and around the world, and relate this to their own language(s) and
> culture(s)."

**Content descriptions:**

| Code | Wording |
|---|---|
| VC2LJ2E01 | notice that Japanese looks and sounds different to other languages |
| VC2LJ2E02 | develop oral language skills through exploring and listening to the sounds and patterns of the language |
| VC2LJ2E03 | recognise and respond to greetings, instructions and language relating to their personal world using one- or 2-word responses and/or single-idea phrases |
| VC2LJ2E04 | explore connections between language and culture through play and/or imagination |
| VC2LJ2C01 | communicate using formulaic and modelled language relating to aspects of their personal world |
| VC2LJ2C02 | participate in a range of guided language activities using formulaic expressions, and visual and spoken cues |
| VC2LJ2C03 | locate key information in a variety of texts **with the Hiragana chart as support**, and respond using gestures, images, words and/or formulaic phrases |
| VC2LJ2C04 | explore and make meaning from sounds, words and phrases for familiar objects or terms in Japanese through play, and discover how languages influence each other |
| VC2LJ2C05 | create spoken and written texts using words, familiar phrases and modelled language that include **Hiragana, some simple Katakana and frequently used Kanji** |
| VC2LJ2U01 | imitate the pronunciation and intonation of spoken Japanese, and **use the Hiragana chart to understand how sounds are produced and represented** |
| VC2LJ2U02 | identify sound combinations to produce simple words, and then an increasing number of frequently used words and phrases |
| VC2LJ2U03 | recognise and explore how **Hiragana, Katakana, Kanji** and features of language are used to construct meaning in Japanese |
| VC2LJ2U04 | identify that written and spoken Japanese has **grammatical structures and other language features that may be similar to or different from English** and/or other languages |
| VC2LJ2U05 | reflect on how language, culture and identity are interconnected and discuss how Japanese-speaking communities are similar to or different from others |
| VC2LJ2U06 | identify where Japanese is used around the world and recognise that there are many different languages spoken in communities throughout Australia |

**Scripts at this band:** all three scripts are *recognised*; production is
**copying**. Hiragana first, then "some simple Katakana"; Kanji only as
"simple, frequently used" whole characters. The **Hiragana chart is an
explicitly permitted support** (named twice: `C03`, `U01`).

**Metalanguage:** "simple metalanguage", used to explain features and
grammatical structures.

**Grammar named:** none. "Common grammatical structures", "sentence patterns".

---

### 2.2 Levels 3 and 4

**Achievement standard:**

> "By the end of Level 4, students use Japanese to initiate structured
> interactions and share information related to the classroom and their
> personal worlds. They use modelled language to participate in spoken and
> written activities. They locate and respond to key items of information in
> texts, using strategies to help interpret and convey meaning in familiar
> contexts. **They use modelled language and basic grammatical structures to
> create texts. They use Hiragana and some simple Katakana and frequently used
> Kanji with support, appropriate to context.**"

> "Students imitate the sounds, pronunciation and intonation patterns of spoken
> Japanese. They demonstrate their understanding that Japanese has non-verbal,
> spoken and written language conventions and rules to convey meaning. They
> recognise that some terms have cultural meanings. **They identify patterns in
> Japanese and make comparisons between Japanese and English, using simple
> metalanguage.** They understand how aspects of language and culture
> contribute to their own and others' identity."

**Content descriptions:**

| Code | Wording |
|---|---|
| VC2LJ4C01 | initiate exchanges and respond to modelled questions about themselves, others and the classroom environment, using formulaic expressions |
| VC2LJ4C02 | participate in activities that involve expressing interests and exchanging information, using a range of familiar phrases and modelled structures |
| VC2LJ4C03 | locate and respond to key information related to familiar content obtained from spoken, written, viewed and multimodal texts |
| VC2LJ4C04 | develop strategies to comprehend and produce Japanese, adjusting language to convey meaning and/or intercultural understanding in familiar contexts |
| VC2LJ4C05 | create and present spoken and written texts using formulaic expressions, simple phrases and sentences and modelled textual conventions, using **Hiragana with the chart as support, and some simple Katakana and frequently used Kanji** |
| VC2LJ4U01 | recognise sound combinations, and use patterns of pronunciation and intonation to form words, phrases and simple sentences, **using the Hiragana chart for support** |
| VC2LJ4U02 | recognise and use **Hiragana, some Katakana and frequently used Kanji**, as well as modelled language, formulaic phrases, **simple grammatical structures** and language conventions to convey meaning |
| VC2LJ4U03 | recognise and compare familiar Japanese language structures and features with those of English and/or other languages, **using simple metalanguage** |
| VC2LJ4U04 | identify connections between personal identity, language and aspects of culture |

**Scripts:** Hiragana **still chart-supported**; "some simple Katakana";
"frequently used Kanji". Production is now creating, not copying, but "with
support".

**Metalanguage:** "simple metalanguage" (unchanged from F–2).

**Grammar named:** none. "Simple grammatical structures", "modelled
structures", "simple phrases and sentences".

---

### 2.3 Levels 5 and 6

**Achievement standard:**

> "By the end of Level 6, students initiate and use strategies to maintain
> interactions in Japanese that are related to their immediate environment.
> They use appropriate combinations of sounds, intonation and rhythm in spoken
> texts. They collaborate in spoken and written activities to share
> information, preferences and ideas. They use strategies to locate and
> interpret information and ideas in texts, and demonstrate understanding by
> responding in Japanese or English, adjusting their responses to context,
> purpose and audience."

> "Students use modelled structures when creating and responding in Japanese.
> **They create texts, selecting and using a variety of vocabulary and sentence
> structures to suit different contexts. They use conventions appropriate to
> text type. They use Hiragana and familiar Katakana and Kanji appropriate to
> context. They apply rules for pronunciation and intonation in spoken
> language, and apply conventions of Hiragana, Katakana, Kanji and punctuation
> in written language. They compare language structures and features in
> Japanese and English, using familiar metalanguage.** They show understanding
> of how language and culture are interconnected and consider how this is
> reflected in their own language(s), culture(s) and identity."

**Content descriptions:**

| Code | Wording |
|---|---|
| VC2LJ6C01 | initiate and sustain modelled exchanges in familiar contexts related to their personal worlds and school environment |
| VC2LJ6C02 | participate in activities that involve discussion with others, using language that expresses information, preferences and ideas |
| VC2LJ6C03 | locate information and ideas in a range of spoken, written, viewed and multimodal texts, and respond in different ways to suit purpose |
| VC2LJ6C04 | apply strategies to interpret and convey meaning and/or intercultural understanding in Japanese in familiar non-verbal, spoken and written contexts |
| VC2LJ6C05 | create and present spoken and written texts, using **a variety of vocabulary, modelled sentence structures and conventions appropriate to text type**, using **Hiragana and familiar Katakana and Kanji** |
| VC2LJ6U01 | apply combinations of sounds, syllables, pronunciation and intonation patterns to develop fluency in words, phrases and sentences, **using the Hiragana chart for support** |
| VC2LJ6U02 | recognise and use **Hiragana, some Katakana and familiar Kanji**, and **a range of modelled grammatical structures** to respond to and create simple texts using conventions appropriate to text type |
| VC2LJ6U03 | compare Japanese language structures and features with those of English and/or other languages, **using familiar metalanguage** |
| VC2LJ6U04 | recognise that language reflects cultural practices, values and identity, and that this has an impact on verbal and non-verbal communication |

**Scripts:** the last band that names the **Hiragana chart** as a support
(`U01`). First appearance of **punctuation** as a written convention. Katakana
and Kanji are now "familiar" rather than "simple / frequently used" — i.e.
whatever the program has taught.

**Metalanguage:** steps up to **"familiar metalanguage"**.

**Grammar named:** none. "A range of modelled grammatical structures", "a
variety of vocabulary and sentence structures", "conventions appropriate to
text type".

---

### 2.4 Levels 7 and 8 — *first secondary band*

**Achievement standard:**

> "By the end of Level 8, students initiate and maintain Japanese-language
> interactions in familiar and some unfamiliar contexts related to a range of
> interests and experiences. They use Japanese to collaborate and problem-solve,
> and adjust their language in response to others. They interpret information,
> ideas and opinions in texts. They demonstrate understanding of the
> similarities and differences between languages, in both familiar and some
> unfamiliar contexts, by adjusting and reorganising responses. **They sequence
> information and ideas, and select and use vocabulary, sentence structures and
> expressions to create texts in Hiragana, Katakana and some Kanji, which are
> appropriate to context, purpose and audience.**"

> "Students apply the conventions of spoken Japanese, including **intonation and
> phrasing patterns**, and continue to enhance their fluency. **They demonstrate
> understanding of the role and function of Hiragana, Katakana and some Kanji**,
> and that spoken, written, viewed and multimodal texts use different
> conventions, structures and features to convey meaning. **They comment on
> structures and features of Japanese text, using some metalanguage.** They
> reflect on how the Japanese language, culture and identity are
> interconnected, and compare this with their own language(s), culture(s) and
> identity."

**Content descriptions:**

| Code | Wording |
|---|---|
| VC2LJ8C01 | initiate and sustain exchanges in familiar and some unfamiliar contexts related to their experiences, feelings and views, adjusting their language in response to others |
| VC2LJ8C02 | use language to negotiate and problem-solve collaboratively to plan projects and events |
| VC2LJ8C03 | interpret information, ideas and opinions in a range of spoken, written, viewed and multimodal texts, and respond appropriately to context, purpose and audience |
| VC2LJ8C04 | apply strategies to comprehend and produce non-verbal, spoken and written language to convey meaning and intercultural understanding in familiar and some unfamiliar contexts |
| VC2LJ8C05 | create and present spoken and written texts, **sequencing information and ideas, selecting vocabulary, expressions and grammatical structures**, and using **combinations of Hiragana, Katakana and some Kanji** appropriate to text type and context |
| VC2LJ8U01 | apply conventions of spoken Japanese to enhance fluency, and to respond to and create texts in familiar and some unfamiliar contexts |
| VC2LJ8U02 | use **Hiragana, Katakana and some Kanji**, and **apply understanding of grammatical structures and formulaic expressions** to respond to and create a range of texts using conventions appropriate to audience and text type |
| VC2LJ8U03 | reflect on the structures and features of Japanese, and compare them with English and/or other languages, **using some metalanguage** |
| VC2LJ8U04 | reflect on and explain how identity is shaped by language(s), culture(s), beliefs, attitudes and values |

**Scripts:** **no chart support is mentioned at this band or beyond.** Kana are
assumed; Kanji is "some". "Role and function of Hiragana, Katakana and some
Kanji" — i.e. students should be able to say *why* a word is in katakana, not
just read it. That is a teachable, testable idea and the closest thing to a
concrete script skill in the secondary bands.

**Metalanguage:** "some metalanguage", used to *comment on* structures.

**Grammar named:** none. New verbs of demand: **"sequencing information and
ideas"**, **"selecting … grammatical structures"** (i.e. choice among
structures, not just use of one), **"adjusting and reorganising responses"**.

---

### 2.5 Levels 9 and 10 — *the top F–10 band; the VCE handover point*

**Achievement standard:**

> "By the end of Level 10, students contribute to and extend interactions in
> Japanese in increasingly unfamiliar contexts related to a wide range of
> interests and issues. They interpret texts by identifying and evaluating
> information, ideas and perspectives. **They show understanding of how features
> of language can be used to influence audience response.** They create texts,
> selecting and manipulating language for a range of contexts, purposes and
> audiences. **They apply and use complex sentences and structures to create and
> respond to spoken and written texts. They use a variety of tenses to sequence
> events and use language structures and features to enhance meaning and
> cohesion. They select and use combinations of Hiragana, Katakana and a range
> of Kanji appropriate to context.**"

> "Students incorporate the features, conventions and phrasing patterns of
> spoken Japanese to enhance and extend fluency. **They demonstrate
> understanding of the conventions of spoken and written texts, in both formal
> and informal contexts, and the connections between them.** They apply their
> knowledge of Hiragana, Katakana and Kanji, and language structures and
> features to make and predict meaning. **They identify multiple readings of
> familiar Kanji in different compounds.** They analyse Japanese texts using
> metalanguage. They reflect on their own cultural perspectives and identity,
> and draw on their experience of learning Japanese to evaluate how this
> learning influences their ideas and ways of communicating."

**Content descriptions:**

| Code | Wording |
|---|---|
| VC2LJ10C01 | initiate, sustain and extend exchanges in familiar and unfamiliar contexts related to their own and others' experiences of the world, adjusting their language in response to others |
| VC2LJ10C02 | contribute to discussions that involve diverse views to negotiate outcomes, address issues and compare experiences |
| VC2LJ10C03 | **interpret and evaluate** information, ideas and perspectives in a broad range of spoken, written, viewed and multimodal texts and respond appropriately to context, purpose and audience |
| VC2LJ10C04 | apply strategies to respond to non-verbal, spoken and written interactions and produce texts to convey meaning and intercultural understanding in familiar and unfamiliar contexts |
| VC2LJ10C05 | create and present texts for diverse contexts and purposes, **selecting vocabulary, expressions, grammatical structures, and a range of textual conventions to engage different audiences**, using **combinations of Hiragana, Katakana and a range of Kanji** |
| VC2LJ10U01 | apply features and conventions of spoken Japanese to extend fluency, and to respond to and create a range of texts in familiar and unfamiliar contexts |
| VC2LJ10U02 | **apply understanding of grammatical structures and writing systems, including Kanji compounds, to predict meaning**, and to respond to and create a range of texts that include **some complex structures**, ideas and conventions **appropriate to formality and text type** |
| VC2LJ10U03 | reflect on and evaluate Japanese texts, **using metalanguage to analyse language structures and features** |
| VC2LJ10U04 | reflect on and evaluate how identity is shaped by language(s), culture(s), beliefs, attitudes and values, and how these affect ways of communicating |

**Scripts:** "a range of Kanji"; **Kanji compounds** (熟語) named explicitly;
**multiple readings of familiar Kanji in different compounds** (on'yomi vs
kun'yomi, though the curriculum does not use those terms); using script
knowledge **to predict meaning** in unseen text.

**Metalanguage:** highest rung — used **to analyse**, not merely to comment.

**Grammar named — the only four specifics in the entire document:**

1. **"complex sentences and structures"** (achievement standard) / **"some
   complex structures"** (`U02`). Not defined.
2. **"a variety of tenses to sequence events"** (achievement standard). The
   only tense/aspect statement in the document.
3. **"cohesion"** — "language structures and features to enhance meaning and
   cohesion".
4. **"formality"** — "formal and informal contexts, and the connections
   between them"; "conventions appropriate to formality and text type".

Even these are not tied to any Japanese form. "Complex sentences" is not
glossed; "formality" is not glossed as です/ます vs plain form. Those readings
are pedagogically obvious to a Japanese teacher but are **inferences, not
curriculum text** — see §5.

---

## 3. Script expectations, consolidated

This is the table that governs *whether the hub may render kanji at a given
band*, and it is the most usable output of the whole document.

| Band | Hiragana | Katakana | Kanji | Chart support named? |
|---|---|---|---|---|
| F–2 | copy / produce with support; chart used to understand sound system | "some simple Katakana" | "simple, frequently used Kanji", copied | **Yes** (`C03`, `U01`) |
| 3–4 | used "with the chart as support" | "some simple Katakana" | "frequently used Kanji" | **Yes** (`C05`, `U01`) |
| 5–6 | used; conventions applied | "familiar Katakana" | "familiar Kanji"; conventions + punctuation applied | **Yes** (`U01`) |
| 7–8 | assumed | assumed | "some Kanji"; know the **role and function** of each script | **No** |
| 9–10 | assumed | assumed | "a range of Kanji"; **compounds**; **multiple readings**; predict meaning from script | **No** |

**Three things the curriculum does NOT do:**

- **No kanji list and no kanji count.** Nowhere does it say how many, or which.
  Compare VCE, which has a prescribed kanji list. "Frequently used" /
  "familiar" / "some" / "a range of" are the only quantifiers, and "familiar"
  is explicitly relative to what the program has taught.
- **No mention of furigana.** The repo convention (SPEC §6: furigana or
  avoidance for off-list kanji) has no curriculum backing at F–10 and, more
  importantly, **there is no F–10 "list" against which "off-list" can be
  defined**. That definition has to come from Andrew or the textbook.
- **No mention of romaji**, in any band, positively or negatively. The
  curriculum neither licenses nor forbids it. Q4 in `QUESTIONS_FOR_ANDREW.md`
  (typed answers: kana, kanji, romaji?) gets **no help from this document**.

**Direct implication for the hub:** the curriculum gives no reason to withhold
kanji at any secondary band — even F–2 expects "frequently used Kanji". The
real constraint on rendering kanji is *which* kanji the class has met, which is
a program fact, not a curriculum fact.

---

## 4. Metalanguage ladder (usable for row/skill naming and for band labels)

The curriculum is unusually consistent here, and this is the one progression it
states explicitly enough to build on:

| Band | Exact wording | Verb of demand |
|---|---|---|
| F–2 | "using **simple metalanguage**" | *explain their understanding of* features and grammatical structures |
| 3–4 | "using **simple metalanguage**" | *identify patterns*, *make comparisons* J↔E |
| 5–6 | "using **familiar metalanguage**" | *compare* language structures and features |
| 7–8 | "using **some metalanguage**" | *comment on* / *reflect on* structures and features |
| 9–10 | "using **metalanguage**" (unqualified) | *analyse* / *evaluate* texts |

The metalanguage terms themselves are never listed. The only English
grammatical/linguistic nouns the document itself uses — and therefore the only
metalanguage it can be said to endorse — are:

> sounds, rhythm, pronunciation, intonation, phrasing patterns, syllables,
> sound combinations, script (Hiragana / Katakana / Kanji), Kanji compounds,
> readings (of Kanji), punctuation, words, phrases, sentences, sentence
> patterns, sentence structures, grammatical structures, complex sentences,
> tense, cohesion, formality, conventions, text type, audience, purpose,
> context, verbal / non-verbal.

That list is worth treating as a **floor, not a ceiling** — the curriculum
plainly expects programs to teach more precise terms; it just does not say
which. But it does mean that hub-facing labels like "Core Particles",
"て-form", "Plain Form + Expressions" are **program metalanguage**, and only
Andrew can confirm they are the terms his students actually meet.

Also note: **comparison with English is a named requirement at every band from
3–4 up** ("compare Japanese language structures and features with those of
English"). Nothing in the current hub does this explicitly. A "how English does
this" line on a skill card would be directly curriculum-aligned rather than
decorative — but it is a design proposal, not a curriculum mandate.

---

## 5. What grammar does the curriculum imply at each band?

Answering the task question honestly, in three tiers.

### Tier A — what the curriculum actually states (safe to cite)

| Band | Stated grammar/linguistic expectation |
|---|---|
| F–2 | "common grammatical structures", "sentence patterns"; awareness that Japanese structures may differ from English |
| 3–4 | "simple grammatical structures", "modelled structures"; "simple phrases and sentences" |
| 5–6 | "a range of modelled grammatical structures"; "a variety of … sentence structures"; conventions **appropriate to text type**; punctuation |
| 7–8 | **selecting** grammatical structures (choice among options); **sequencing** information and ideas; formulaic expressions; conventions appropriate to **audience** and text type |
| 9–10 | **complex sentences and structures**; **a variety of tenses to sequence events**; **cohesion**; **formal vs informal** registers and the connections between them; Kanji compounds and multiple readings; using structure knowledge to **predict meaning** |

That is the complete, exhaustive list. There is nothing else.

### Tier B — inferences a Japanese teacher would call obvious, but which the document does not say (label as inference wherever used)

These are *readings* of Tier A. They are almost certainly what the writers
meant, and Andrew will probably confirm them — but the hub must not print them
as "the Victorian Curriculum requires…".

- "**a variety of tenses**" (9–10) most plausibly means past/non-past in both
  polite and plain forms, plus ている for ongoing/state. The curriculum says
  none of this.
- "**formal and informal contexts, and the connections between them**" (9–10)
  most plausibly means です／ます vs plain form, and the ability to convert
  between them. The curriculum never names either form.
- "**complex sentences and structures**" (9–10) most plausibly means clause
  combination — て-form chaining, から／ので, とき, たら, quotation with と,
  noun modification by a clause. The curriculum names none of these.
- "**cohesion**" most plausibly means connectives and reference across
  sentences. Not specified.
- "**multiple readings of familiar Kanji in different compounds**" (9–10) is
  on'yomi / kun'yomi without using the terms — this one is close to explicit.
- "**role and function of Hiragana, Katakana and some Kanji**" (7–8) most
  plausibly means: katakana for loanwords/onomatopoeia/emphasis, kanji for
  content morphemes, hiragana for grammar (okurigana, particles). The
  curriculum says only "role and function".

Every item in Tier B is a candidate question for Andrew. The safest hub
behaviour is to state the curriculum clause and let Andrew supply the
Japanese-language content that satisfies it.

### Tier C — what typical Victorian secondary Japanese programs do (NOT curriculum; needs Andrew's confirmation)

**Flagged clearly: none of this is in the document.** Where possible it is
grounded in evidence already in this repo rather than in general assumption,
which is why it is worth writing down at all.

- **Repo evidence, Year 9:** the folder `Unit 10 Abilities and preferences`
  contains files named `Unit 10 9年生クラスメートのインタービュー…`,
  `Unit 10 Y9 SEM 2 Expression preferences and abilities CAT criteria.docx`,
  `Unit 10 Obento p203 plain form verb table complete.docx`,
  `Unit 10 Verb plain form and sentence koto ga suki TEST.docx`,
  `Unit 10 … tari tari and PARAGRAPH writing.docx`,
  `Unit 10 Abilities and preferences Obento p212 katakana sports vocab etc.docx`,
  `Unit 10 Topic Kanji 1 Verbs, adjectives etc.docx`.
  → Andrew's **Year 9** (i.e. F–10 Levels 9–10) is teaching **plain form verbs,
  ことができる／ことが好き, たり〜たり, topic katakana, topic kanji**, from
  **Obento**. This is a repo-evidenced program fact, not a curriculum fact, but
  it is solid and it maps neatly onto the 9–10 clauses "complex sentences and
  structures" and "a variety of tenses".
- **Repo evidence, textbook:** Obento (4th edition referenced:
  `Unit 10 Abilities and preferences p216 4th edition.docx`). Obento chapter
  order, not the curriculum, is the de facto scope-and-sequence for Years 7–10.
  Confirm with Andrew (this overlaps `QUESTIONS_FOR_ANDREW.md` Q6 and Q7).
- **Unverified general pattern:** Victorian secondary Japanese programs
  commonly front-load hiragana in Year 7, katakana in Year 7–8, and introduce
  です／ます, は／を／に／で／へ, adjective types (い／な), て-form and plain
  form across Years 8–10. **This is my characterisation of common practice, not
  a curriculum statement and not repo evidence — Andrew must confirm, correct,
  or strike it.** It is recorded here only so that nobody later mistakes its
  absence for "the curriculum forbids it".

---

## 6. Text types

The document uses "text" constantly but **never enumerates text types**. The
recurring formula is:

> "spoken, written, viewed and multimodal texts"

and the requirement is always *conventions appropriate to text type* — with the
text types left to the program. Named text-ish activities across the bands:
greetings and instructions (F–2), classroom exchanges (3–4), discussion (5–6),
negotiating and problem-solving to **plan projects and events** (7–8),
**discussions that involve diverse views to negotiate outcomes, address issues
and compare experiences** (9–10).

Progression of the *audience* dimension is explicit and is arguably the
document's clearest ladder after scripts:

| Band | Audience/context |
|---|---|
| F–2 | personal world; formulaic |
| 3–4 | classroom + personal world |
| 5–6 | immediate environment; adjust to context, purpose, audience |
| 7–8 | familiar and **some unfamiliar** contexts; range of interests and experiences |
| 9–10 | **increasingly unfamiliar** contexts; wide range of interests and **issues**; influence audience response |

VCE (the other half of Andrew's combined class) *does* prescribe text types and
a kanji list. Contrasting the two is a separate research job; this document
supplies nothing on either front.

---

## 7. What this means for the hub — concrete, and what it can't decide

**It can decide (curriculum-backed):**

1. **Kanji may be rendered at every band.** No band prohibits it. The gate is
   "which kanji has this class met", not the curriculum.
2. **A metalanguage dial exists and is curriculum-shaped**: simple → familiar →
   some → analytic. If skill cards ever carry a "what this is called" line, its
   register can legitimately vary by band on this ladder.
3. **English comparison is a stated requirement from Levels 3–4 upward.** A
   "compare with English" element is curriculum-aligned, not fluff.
4. **The 9–10 band is where "complex sentences", "tenses", "cohesion" and
   "formality" first appear** — which is exactly the junction with VCE. If the
   hub's bands need a defensible boundary, *this* is the one the curriculum
   itself draws.
5. **Only two F–10 bands are secondary.** A 4-column matrix cannot be justified
   from F–10 alone; F–10 supplies at most two columns (7–8, 9–10) and VCE
   supplies the rest.

**It cannot decide (and no amount of reading will change that):**

- Which grammar points sit in which band. The document is silent.
- Which kanji, or how many. Silent.
- Whether romaji input is acceptable. Silent.
- Whether furigana is expected. Silent.
- Which text types. Silent.
- What the bands should be called. Silent — but "Levels 7–8" and "Levels 9–10"
  are the curriculum's own labels and would be honest for two of the columns.

---

## 8. Gaps and cautions

- **This is the F–10 Sequence.** Its own title says so. Victorian Curriculum 2.0
  Languages follows Australian Curriculum v9, which publishes **two** sequences
  per language: an **F–10 Sequence** (continuous learning from Foundation) and a
  separate **7–10 Sequence** (for students who begin in Year 7). The 7–10
  Sequence is **not in this repo**. If Andrew's students start Japanese in Year
  7 — common in Victorian secondary colleges — then **the Levels 7–8 and 9–10
  expectations above are the wrong ones**, and the correct (lower) ones are in a
  document we do not have. *I have not verified that a Japanese 7–10 Sequence
  exists on the VCAA site; I am inferring it from the title of this one and from
  the AC v9 structure. This needs checking before any band mapping is fixed.*
  **This is the single highest-value follow-up in this research.**
- Achievement standards here are the **band-end** standards only; VCAA also
  publishes level-by-level descriptions and elaborations elsewhere. Neither is
  in this file.
- The document contains no kanji list, no vocabulary list, no elaborations, no
  glossary. Anyone expecting a scope-and-sequence from it will be disappointed —
  it is a set of capability statements.
- Nothing in this document is student data or otherwise sensitive; it is a
  public VCAA publication. Safe to keep and quote in the repo.

---

## 9. Proposed additions to `QUESTIONS_FOR_ANDREW.md`

Numbered provisionally; renumber on merge. All five come directly out of gaps
this document leaves open.

**QA. Does your program follow the F–10 Sequence or the 7–10 Sequence?**
*Context:* the repo has the F–10 Sequence, which assumes Japanese from
Foundation. If your Year 7s start from scratch, VCAA's separate 7–10 Sequence
is the governing document and its Levels 7–8 expectations are lower than the
ones we've extracted. *Ask:* which one does the school report against — and if
it's 7–10, can you drop that PDF/DOCX into `inbox/`? *Blocks:* every band
mapping, Q2 and Q3.

**QB. Which kanji, at which year level?** *Context:* the F–10 curriculum never
lists kanji — only "frequently used" / "familiar" / "some" / "a range of". So
the hub has no external definition of "off-list", which our own SPEC §6 relies
on for the furigana rule. *Ask:* is the list the Obento chapter kanji by year,
the VCE prescribed list, or a school list? *Blocks:* the furigana/avoidance
rule, Q5 (kanji module), and every content item that renders kanji.

**QC. At Levels 9–10 the curriculum asks for "complex sentences and
structures", "a variety of tenses", "cohesion" and formal/informal register —
what Japanese do you actually teach against those four clauses?** *Context:*
the curriculum names the clause but never the form. We will not guess.
*Ask:* four short lists, one per clause. *Blocks:* the 9–10 column of the
matrix and any claim that a skill is curriculum-aligned.

**QD. Levels 7–8 asks students to understand "the role and function of
Hiragana, Katakana and some Kanji". Do you teach that explicitly?** *Context:*
this is the only concrete script *skill* (as opposed to script *knowledge*) in
the secondary bands — e.g. why a word is written in katakana. It would make a
good matrix row and there is nothing like it in the current 16. *Ask:* do you
teach it, and would a "which script and why" row earn its place?

**QE. The curriculum requires comparison with English from Levels 3–4 up.
Should skill cards carry an explicit English-contrast line?** *Context:* stated
at every band ("compare Japanese language structures and features with those of
English"), and currently absent from the hub. *Ask:* useful, or clutter? If
useful, at which bands? (Liam's EAL background is directly relevant here.)

---

## 10. Reproducing this extraction

```
mkdir -p /tmp/vicdocx && cd /tmp/vicdocx
unzip -o "/home/user/Grammar-hub/Japanese F–10 Sequence, Foundation–Level 10.docx"
python3 -c "
import xml.etree.ElementTree as ET
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
r=ET.parse('word/document.xml').getroot()
for p in r.iter('{%s}p'%NS['w']):
    t=''.join(x.text or '' for x in p.iter('{%s}t'%NS['w'])).strip()
    if t: print(t)
"
```

The table structure (which cell belongs to which band) is lost by that
one-liner; the walker used for this document preserved `w:tbl` / `w:tr` / `w:tc`
nesting so each content description could be attributed to its column.
