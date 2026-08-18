# VCE Japanese Second Language — Study Design extract

Source: `/home/user/Grammar-hub/2019JapaneseSLSD.pdf`
Title (PDF metadata): *VCE Japanese Second Language Study Design*
Publisher: Victorian Curriculum and Assessment Authority (VCAA)
ISBN 978-1-925676-40-2 · © VCAA 2018
40 pages · PDF created 2022-11-29 · **PDF last modified 2025-04-02**

Extraction method: `pdftotext -layout` (text, including Japanese) plus visual
rendering of pp. 14–23 to recover words set in the ruby/furigana font, which the
text layer drops. Every Japanese string below was either extracted cleanly or
read off the rendered page. Where a word came only from the rendered page it is
marked. **Nothing here is invented.**

---

## 0. ⚠️ CURRENCY WARNING — read before using any of this

This is the **2019** study design. VCE study designs are periodically replaced.

**What the document itself says** (p. 5, "Important information"):

> Accreditation period
> Units 1 and 2: 1 January 2019
> Units 3 and 4: 1 January 2020
> The accreditation period for Units 1 and 2 commences on 1 January 2019.
> The accreditation period for Units 3 and 4 commences on 1 January 2020.

Note what is **absent**: this copy states only *commencement* dates. It gives no
end year anywhere in the document. The running footer on all 40 pages reads
"Units 1 and 2: 2019; Units 3 and 4: 2020" — again with no end year.

Two signals suggest this file is a **reissue of an extended study design**:

1. The PDF's ModDate is **2 April 2025**, long after the original 2018/2022 build.
2. Publicly circulating earlier copies of the *same* study design carry the
   footer "**2019–2023 Accreditation Period**". Ours has had the end year
   stripped, which is what VCAA does when a period is extended and the end date
   is being managed via the Bulletin rather than reprinted.

**External evidence (NOT from the PDF, NOT verified — Andrew must confirm):**
web search results indicate the accreditation period has been extended to
**Units 1 and 2: 2019–2027; Units 3 and 4: 2020–2027**. Treat this as a lead,
not a fact. The VCAA site itself was unreachable from this environment
(egress blocked), so it could not be checked at source.

The document also states (p. 5 / p. 8):

> The VCAA Bulletin is the only official source of changes to regulations and
> accredited studies. […] It is the responsibility of each VCE teacher to refer
> to each issue of the Bulletin.

> During its period of accreditation minor changes to the study will be
> announced in the VCAA Bulletin.

**Action for Andrew:** confirm at
`vcaa.vic.edu.au` → VCE study designs → Japanese Second Language that this
2019 design (with whatever extension applies) is the one his Units 1–4 students
sit in the current and next school year, and whether any Bulletin notice has
amended the kanji list, the grammar list or the assessment tables. Everything
downstream in this repo that claims "VCE-aligned" rests on that answer.

---

## 1. Document structure (page map)

| Pages | Section |
|---|---|
| 2 | Publication / copyright |
| 3–4 | Contents |
| 5 | Important information (accreditation period, Bulletin, copyright) |
| 6–8 | Introduction (The language, Scope of study, Rationale, Aims, Structure, Entry, Duration, Changes, Monitoring, Safety and wellbeing, Employability skills, Legislative compliance) |
| 9 | Assessment and reporting (satisfactory completion, levels of achievement, authentication) |
| 10–11 | **Cross-study specifications** |
| 12 | **Prescribed themes and topics** |
| 13 | **Text types and writing styles; Vocabulary** |
| 14 | **Kanji** (the 200) |
| 15–23 | **Grammar** (the prescribed grammar list) |
| 24–27 | Unit 1 |
| 28–31 | Unit 2 |
| 32–35 | Unit 3 |
| 36–40 | Unit 4 + external assessment |

---

## 2. The language, scripts and vocabulary — what is and isn't prescribed

**Scripts (p. 6, "The language"):**

> The language to be studied and assessed is modern standard Japanese in both
> written and spoken form. Some dialect variations in pronunciation and accent
> are acceptable. Students should be familiar with informal and formal levels of
> language as prescribed in the study design. Hiragana and Katakana syllabaries
> and a prescribed number of Kanji (Chinese characters) will be studied.

**Vocabulary (p. 13) — there is NO prescribed vocabulary list:**

> There is no prescribed vocabulary list for VCE Japanese Second Language.
> Students are expected to be familiar with a range of vocabulary and idioms
> relevant to the themes and topics prescribed in the study design.

This is a load-bearing fact for the hub: **kanji and grammar are closed lists;
vocabulary is open and topic-driven.** Any vocabulary bank we build is our own
editorial choice, not a curriculum requirement, and must be justified by theme
and topic rather than by a list.

**What the cross-study specifications say is prescribed (p. 10):**

> Themes and topics are prescribed and create a framework of content for the
> activities and tasks that students undertake for the areas of study in each
> unit. Language content suited to the level and scope of the themes and topics
> is also specified and includes **grammar, characters, text types and writing
> styles** that students are expected to be familiar with by the end of Unit 4.
> **There is no prescribed order in which this learning should occur.**

That last sentence matters for the hub's banding: the study design deliberately
does *not* sequence the grammar. Any band ordering in `data/skills.js` is
Andrew's pedagogical judgement, not a VCAA requirement, and should be labelled
as such.

**Recurring key-skill wording across every unit** (appears in Units 1–4):
"use appropriate spelling, grammar, **characters**, layout and punctuation" —
i.e. correct kanji use is explicitly assessable in written outcomes.

---

## 3. Prescribed kanji — the 200 (p. 14)

> The list of prescribed kanji below contains 200 items that students are
> expected to be able to use in both reading and writing in Japanese. Students
> are expected to understand and be able to use all the kanji listed below.

Heading over the table: **"Prescribed Kanji for active use (200)"**

**All 200 transcribed. Verified two ways: extracted from the text layer, then
read off the rendered page. The group counts sum to exactly 200 with zero
duplicates.**

| Group | Count | Kanji |
|---|---|---|
| Numbers | 13 | 一 二 三 四 五 六 七 八 九 十 百 千 万 |
| Counters | 6 | 本 人 回 才 円 番 |
| Seasons/time | 28 | 春 夏 秋 冬 日 月 火 水 木 金 土 曜 年 時 分 夕 半 午 毎 週 間 今 先 朝 晩 昼 夜 去 |
| Parts of the body | 5 | 目 口 耳 手 体 |
| Positions/directions | 12 | 上 中 下 右 左 前 後 東 西 南 北 外 |
| School life | 9 | 学 校 英 語 文 漢 字 勉 強 |
| People/family | 13 | 父 母 子 家 族 兄 弟 姉 妹 友 私 男 女 |
| Adjectives/adverbs | 16 | 大 小 好 安 高 新 古 多 少 楽 長 近 正 広 早 明 |
| Verbs | 39 | 行 来 休 出 入 生 見 思 書 言 話 読 売 買 食 飲 知 作 住 会 使 着 発 聞 帰 持 待 教 乗 働 動 歩 終 始 泊 洗 立 考 習 |
| Animals/nature | 13 | 山 川 田 島 花 海 天 雨 雪 牛 魚 馬 犬 |
| Geography/travel | 15 | 京 都 市 県 州 国 町 神 寺 駅 店 電 車 道 旅 |
| Colours | 6 | 赤 青 白 黒 色 銀 |
| Repeat sign | 1 | 々 |
| Miscellaneous | 24 | 何 紙 元 気 活 社 自 物 名 方 院 所 屋 肉 場 飯 洋 和 病 次 同 仕 事 点 |
| **TOTAL** | **200** | |

Machine-checkable single string (200 characters, in study-design order):

```
一二三四五六七八九十百千万本人回才円番春夏秋冬日月火水木金土曜年時分夕半午毎週間今先朝晩昼夜去目口耳手体上中下右左前後東西南北外学校英語文漢字勉強父母子家族兄弟姉妹友私男女大小好安高新古多少楽長近正広早明行来休出入生見思書言話読売買食飲知作住会使着発聞帰持待教乗働動歩終始泊洗立考習山川田島花海天雨雪牛魚馬犬京都市県州国町神寺駅店電車道旅赤青白黒色銀々何紙元気活社自物名方院所屋肉場飯洋和病次同仕事点
```

Notes worth flagging to Andrew:

- **々 (the repeat sign / odoriji) is counted as one of the 200 "kanji".** A
  strict character-set validator built from this list needs to keep it.
- The categories are VCAA's own labels, and some are loose (才 for 歳; 銀 sits
  under "Colours" presumably for 銀色; 京/都 are split so 京都 is buildable).
- The list is **active use** — reading *and* writing — so it is a fair basis for
  an "off-list kanji" checker in the hub's content pipeline.

### The study design's own furigana convention

This is directly useful for our `SPEC.md` §6 kanji rule. In the grammar tables
the study design writes off-list compounds in kanji **with furigana**, e.g.:

| Word used in an example | Off-list character | Rendered with furigana |
|---|---|---|
| 教室 | 室 | きょうしつ |
| 大阪 | 阪 | おおさか |
| 週末 | 末 | まつ (over 末) |
| 昨日 | 昨 | きのう |
| 音楽 | 楽 is on-list; 音 is not | おん (over 音) |
| 将来 | 将 | しょう (over 将) |

So VCAA's own practice is: **use the natural kanji spelling and gloss the
off-list character with furigana**, rather than falling back to kana. That
matches the repo's existing convention and is worth citing in `SPEC.md`.

---

## 4. Prescribed grammar list (pp. 15–23)

> The student is expected to **recognise and use** the following grammatical
> items: (p. 15)

The study design's own functional groupings are used below, in its order.
Column headings are VCAA's: **Form / Use / Example** (or Particle / Function /
Example, Word / Function / Example, Conjunction / Function / Example,
Nominaliser / Function / Example).

### 4.1 Finite forms — plain forms (p. 15)

Presented as a three-column grid, not Form/Use/Example. Row = a form; columns =
Verbs, Adjectives, The verb 'to be'.

| Form | Verbs | Adjectives | The verb 'to be' |
|---|---|---|---|
| non-past affirmative | 食べる / 書く | ～い：赤い<br>～な：しずかだ | ～だ：本だ |
| past affirmative | ～た：食べた / 書いた | ～かった：赤かった<br>～だった：しずかだった | ～だった：本だった |
| non-past negative | ～ない：食べない / 書かない | ～くない：赤くない<br>～では（じゃ）ない：しずかでは（じゃ）ない | ～では（じゃ）ない：本では（じゃ）ない |
| past negative | ～なかった：食べなかった / 書かなかった | ～くなかった：赤くなかった<br>～では（じゃ）なかった：しずかでは（じゃ）なかった | ～では（じゃ）なかった：本では（じゃ）なかった |
| volitional / probability | 食べよう / 書こう | ～いだろう：赤いだろう<br>～だろう：しずかだろう | ～だろう：本だろう |

(The row labels in the leftmost column are mine — the study design leaves that
column blank and relies on the pattern. The Japanese is verbatim.)

### 4.2 Finite forms — polite forms (p. 16)

| Form | Verbs | Adjectives | The verb 'to be' |
|---|---|---|---|
| non-past affirmative | ～ます：食べます / 書きます | ～いです：赤いです<br>～な：しずかです | ～です：本です |
| past affirmative | ～ました：食べました / 書きました | ～かったです：赤かったです<br>～でした：しずかでした | ～でした：本でした |
| non-past negative | ～ません：食べません / 書きません | ～くないです：赤くないです<br>～くありません：赤くありません<br>～では（じゃ）ないです：しずかでは（じゃ）ないです<br>～では（じゃ）ありません：しずかでは（じゃ）ありません | ～では（じゃ）ないです：本では（じゃ）ないです<br>～では（じゃ）ありません：本では（じゃ）ありません |
| past negative | ～ませんでした：食べませんでした / 書きませんでした | ～くなかったです：赤くなかったです<br>～くありませんでした：赤くありませんでした<br>～では（じゃ）なかったです：しずかでは（じゃ）なかったです<br>～では（じゃ）ありませんでした：しずかでは（じゃ）ありませんでした | ～では（じゃ）なかったです：本では（じゃ）なかったです<br>～では（じゃ）ありませんでした：本では（じゃ）ありませんでした |
| volitional / probability | ～ましょう：食べましょう / 書きましょう | ～でしょう：おもしろいでしょう / しずかでしょう | ～でしょう：本でしょう |
| adjective conjunctive | — | ～くて：やすくていい<br>～で：しずかできれい | — |
| adjective adverbial | — | ～く：はやくしなさい / あつくなります<br>～に：しずかにしなさい / きれいになります | — |

The last two rows sit in the Adjectives column only, unlabelled in the original.
They are the て-linking and adverbial forms of adjectives.

### 4.3 て form (p. 17)

| Form | Use | Example |
|---|---|---|
| ～て | sequence of sentences | 町に行ってえいがを見ます。 |
| ～て＋ください | polite request | 今日は早く帰ってください。 |
| ～て＋います（いる） | progressive action state | 弟はテレビを見ています。 |
| ～て＋みます（みる） | tentative (try doing, do to find out) | 日本語で話してみます。 |
| ～て＋しまいます（しまう） | emphatic (finish doing, do completely) | あの人は一時間でその本を読んでしまいました。 |
| ～て＋きます（くる） | [bring] | プレゼントを持ってきました。 |
| ～て＋いきます（いく） | [take/carry] | かさを持っていきます。 |
| ～て＋はいけません（はいけない） | prohibitive (must not) | まだ帰ってはいけません。 |
| ～て＋はだめです（だめだ） | prohibitive (not allowed to) | 教室〔きょうしつ〕で食べてはだめです。 |
| ～て＋もいい | giving permission (may) | もう帰ってもいいです。 |
| ～て＋も | concessive (even if / even though) | たくさん食べてもふとりません。<br>高くても買います。 |
| ～て＋から | sequential (after doing) | いつも勉強してからテレビを見ます。 |

### 4.4 て form + verbs of giving and receiving (p. 17)

| Form | Use | Example |
|---|---|---|
| ～て＋くださいます（くださる） | superior does you a favour | 先生が本を読んでくださいました。 |
| ～て＋くれます（くれる） | someone does you a favour | 友達が日本から本をおくってくれました。 |
| ～て＋あげます（あげる） | do a favour for someone (an equal) | 買ってあげましょうか。 |
| ～て＋もらいます（もらう） | receive a favour from someone | 友達に作ってもらいました。 |
| ～て＋いただく（いただきます） | receive a favour from a superior | 先生に買っていただきました。 |

### 4.5 ～た、～たら、～たり forms (p. 18)

| Form | Use | Example |
|---|---|---|
| ～た＋ほうがいいです（ほうがいい） | advice (it is advisable to do) | 勉強をしたほうがいいですよ。 |
| ～た＋ことがあります（ある） | experience | 大阪〔おおさか〕に行ったことがありますか。 |
| ～た＋あとで | adjectival clause – time | 食事をした後でテレビを見ました。 |
| ～たら | conditional or temporal (if, when) | たろうさんが来たら、知らせてください。<br>分からなかったら聞いてください。<br>おいしくなかったら、食べなくてもいいです。 |
| ～たり～たり | alternative | 週末〔しゅうまつ〕にケーキを食べたり、おちゃを飲んだりしました。 |

### 4.6 Plain form (PF) — past and present (p. 19)

| Form | Use | Example |
|---|---|---|
| PF+そうです（そうだ） | hearsay (it is said, I hear) | ニュースによると明日は雨だそうです。 |
| PF+つもりです（つもりだ） | intentional | 明日東京へ行くつもりです。 |
| PF+とき（に）／あいだ（に）／まえ（に） | time | 私が行った時、あの人はいませんでした。<br>私がしゅくだいをしている間に母は晩ごはんを作ります。<br>テレビを見る前に勉強をします。 |
| PF+より | comparative | テレビを見るより本を読むほうが楽しいです。 |
| PF+かもしれません（かもしれない） | possibility | 東京へ行くかもしれません。 |
| PF+でしょう（だろう） | probability | 明日は雪になるでしょう。 |
| PF+と思います（思う）／と言います（言う） | quotative | 京都へ行こうと思っています。<br>田中さんは三時に来ると言いました。 |
| PF+ために | purpose, result | 車を買うためにお金をためています。 |
| PF+ように | purpose, result, request | かぜをひかないように手を洗いましょう。 |
| PF+し | and (what's more), (not only… but also) | 昨日〔きのう〕は天気がよかったし、あたたかかったです。<br>私の友達はやさしいし、あたまもいいです。 |
| PF+Noun | relative clause | 昨日〔きのう〕見たえいがはおもしろかったです。 |
| PF+の／んです | explanation/clarification | 明日テストがあるんです。 |
| PF+らしいです | appearance (apparently, supposedly) | だれかがここでキャンプをしたらしいです。 |
| PF+ようです | appearance | あそこには、だれもいないようです。 |
| PF+はず／べきです | expectation | 電車は８時に着くはずです。<br>明日テストだから、今日勉強するべきです。 |

### 4.7 ～ない form (p. 20)

| Form | Use | Example |
|---|---|---|
| ～ない＋ほうがいいです（ほうがいい） | advice (it is advisable not to do) | コーラはあまり飲まないほうがいいです。 |
| ～なければなりません（なければならない） | compulsion (must) | 八時までに学校に行かなければなりません。 |
| ～なくてもいいです（なくてもいい） | obligation (don't have to) | せいふくを着なくてもいいです。 |

### 4.8 Verb stem (p. 20)

| Form | Use | Example |
|---|---|---|
| STEM + そうです（そうだ） | appearance (appears, looks like) | 雨がふりそうです。<br>おいしそうですね。 |
| STEM + かた | method | ケーキの作り方を教えてください。 |
| STEM + にくい | (difficult to…) | この字は読みにくいです。 |
| STEM + やすい | (easy to…) | このペンは書きやすいです。 |
| STEM + たい | desiderative (wish, want to) | このシャツを買いたいです。 |
| STEM + たいと思っています（思っている） | desiderative (I think I would like to) | 将来〔しょうらい〕日本に行きたいと思っています。 |
| STEM + に行きます／来ます | purpose | カフェにコーヒーを飲みに行きます。 |
| STEM + ながら | simultaneous action | ラジオを聞きながら、しゅくだいをします。 |
| STEM + すぎます（すぎる） | excessive | ケーキを食べすぎました。 |

### 4.9 Particles — Noun and Particle (pp. 21–22)

In the original, the target particle is **underlined** in every example. That
underlining is pedagogically deliberate and worth mirroring in the hub.

| Particle | Function | Example |
|---|---|---|
| は | topic marker | 私はよく町に行きます。 |
| は | contrast | 今日はとてもさむいです。 |
| が | subject marker | だれがそう言いましたか。 |
| が | subject in subordinate clause | 春子さんが作ったケーキはおいしかったです。 |
| が | direct object | テニスが好きです。<br>日本語で本が読めます。 |
| の | possession (of, 's) | 私のペンです。 |
| の | possessive noun | それはあの人のです。 |
| の | locational | いぬはベッドの上にいます。 |
| の | adjectival | 母のりょうりが好きです。 |
| に | place of existence (in, at, on) | ここに新聞があります。 |
| に | destination (to, into, onto) | 明日町に行きます。 |
| に | indirect object | 先生にあげてください。 |
| に | point of time | 三時半に行きましょう。 |
| に | purpose | 友達にプレゼントを買いました。 |
| へ | direction (to) | 町へ行きます。<br>花子さんへ、 |
| を | direct object marker | すしを食べます。 |
| を | place of motion (along, through) | 道を歩きます。 |
| で | place of action | 町で買い物をしました。 |
| で | by means of | はしで食べました。 |
| と | connective (and) | スーパーでりんごとバナナを買いました。 |
| と | with (a person) | 家族と日本に行きました。 |
| や | connective (and etc.) | スーパーでりんごやバナナを買いました。 |
| か | connective (or) | ペンかえんぴつをとってください。 |
| か | with interrogatives | だれか来ましたか。 |
| も | repetitive (too, also) | 私も日本に行きたいです。 |
| も | (both) | 昨日〔きのう〕は買い物もしました。 |
| も | (neither…nor) | 犬もねこもいません。 |
| も | with an appropriate interrogative | 何回も行きました。 |
| も | with an appropriate interrogative + negative | だれも来ません。 |
| から | from, point of time, since | 一時から三時まで日本語を勉強しました。 |
| から | from, point in space | アメリカから来ました。 |
| まで | until, point of time | 八時から十時までえいがを見ました。 |
| まで | until, point in space | 駅まで歩きます。 |
| までに | by the time | 日本に行くまでに、パスポートを作ってください。 |

### 4.10 Word indicating extent (p. 22)

| Word | Function | Example |
|---|---|---|
| ごろ | approximate point of time | 姉は三時ごろ帰ります。 |
| ぐらい／くらい | approximate amount/time/length | 五百グラムぐらいでけっこうです。 |
| しか | extent + negative | 千円しかありません。 |
| だけ | extent (only) | 一人だけです。 |
| より | comparative (than) | 車はバスより早いです。 |
| 一番 | superlative (the most) | これが一番好きです。 |

### 4.11 Conjunctions (following non-final verbs) (p. 22)

| Conjunction | Function | Example |
|---|---|---|
| が | concessive (but) | 昨日〔きのう〕は雨でしたが、海に行きました。 |
| けれども／けれど／けど | however | いっしょうけんめい勉強したけれども、テストができませんでした。 |
| から | cause (because, since) | つかれたからもうねます。 |
| ので | cause, reason (so); explaining an excuse | 雨がふったので行きませんでした。 |
| と | conditional (when) | 雨がふるとすずしくなります。 |
| と | indirect quote | そのテストはむずかしかったと思います。<br>先生は来週漢字のテストがあると言いました。 |
| のに | concessive (although) | 雨がふったのに来てくれました。 |

### 4.12 Nominalisers (p. 23)

| Nominaliser | Function | Example |
|---|---|---|
| の | nominalisation (the one) | りょうりをするのは楽しいです。 |
| こと | nominalisation | 漢字をおぼえることはむずかしいですか。<br>しゅみは音楽〔おんがく〕をきくことです。<br>PF+ことができる<br>PF+ことにする<br>PF+ことになる |

Note that こと carries three extra sub-patterns (ことができる／ことにする／ことになる)
listed as bare formulas with no example sentence. Those three are prescribed and
would be easy to miss.

### 4.13 Sentence final particles (p. 23)

| Particle | Function | Example |
|---|---|---|
| ね／ねえ | tag question (isn't it?) | 日本語はとても楽しいですね。 |
| よ | assurance | 日本語は楽しいですよ。 |
| よ | gentle persuasion | えいがに行こうよ。 |
| か | question marker | 何年生ですか。 |
| の | soft question marker; soft sentence ending | 日本に行ったことがあるの？ |

### 4.14 Miscellaneous (p. 23)

| Form | Use | Example |
|---|---|---|
| 読めます／食べられます | potential | 弟は日本語がちょっと読めます。 |
| ば | conditional | 時間があれば、日本へ行きたいです。 |
| NAME という NOUN | called | ハリーポッターという本を読んだことがありますか。 |
| のほう | comparison | バナナよりりんごのほうが好きです。 |

### 4.15 What the grammar list does NOT contain

Worth stating explicitly, because it constrains what "VCE-aligned" can honestly
claim. Not present anywhere in pp. 15–23:

- **Passive** (られる／れる passive), **causative** (させる), **causative-passive**.
- **Honorific / humble (敬語) verb forms** beyond the giving-and-receiving set
  in §4.4 (くださる／いただく appear only inside the て-form favour patterns).
- **Imperative forms** (しろ／するな). なさい appears only inside the adjective
  adverbial examples (はやくしなさい, しずかにしなさい), not as a listed item.
- **Conditional なら** (ば and たら and と are listed; なら is not).
- **～ておく**, **～てある** (て＋います is listed; て＋あります is not).
- Any explicit **counters / counting systems** section (才, 回, 本, 番, 円 appear
  only in the kanji list under "Counters").
- Any **transitive/intransitive verb pair** section.

These absences are *the study design's*, not a gap in this extract. Whether the
hub should still teach them (they turn up in real texts and in exam stimulus) is
a decision for Andrew, and the hub must be honest about which items are
prescribed and which are enrichment.

---

## 5. Prescribed themes and topics (p. 12)

> There are three prescribed themes for study in VCE Japanese Second Language:
> • The individual
> • The Japanese-speaking communities
> • The world around us
>
> These themes have a number of prescribed topics and suggested subtopics.
> **All the themes and topics are to be studied over the course of Units 1–4.**
> The order in which the themes and topics are studied is not prescribed;
> teachers may choose which themes and topics are studied for each unit.
> In each unit, the learning program will include topics from more than one
> theme and at least one topic and subtopic for each area of study. The subtopic
> will provide the context for teaching, learning and assessment of achievement.

> Consideration should be given to the appropriateness of topics and subtopics in
> terms of creating logically sequenced language skill development and for the
> depth of study required in each unit. It is not expected that all topics will
> require the same amount of study time and some may be more suited to Units 1
> and 2 or to Units 3 and 4, depending on the learning program.

Legend given on the page: **Bold = Prescribed themes, *Bold Italics* =
Prescribed topics, *Italics* = Suggested subtopics.** So the topics below are
**prescribed** (9 of them); the "for example" lists are **suggestions only**.

| Theme (prescribed) | Topic (prescribed) | Suggested subtopics (examples only) |
|---|---|---|
| **The individual** | Personal identity and lifestyles | personal information, home, neighbourhood, daily life, health and wellbeing, interests and leisure, travel, tourism, places of interest in Australia |
| **The individual** | Relationships | family, friends, school/social relationships, neighbourhood/community relationships, pets |
| **The individual** | Aspirations, education and careers | experiences of schooling, casual work (arubaito), future aspirations, career choices, employment opportunities, men and women in the workforce |
| **The Japanese-speaking communities** | The Japanese-speaking communities | the arts, traditional culture, contemporary culture, Japanese customs and traditions, festivals, celebrations and entertainment |
| **The Japanese-speaking communities** | Significant people | famous or significant Japanese people in a selected field of endeavour (the arts, sciences, sports, business) |
| **The Japanese-speaking communities** | Living in a Japanese community / visiting Japan | living in Japan, meeting and visiting people, leisure activities, getting around (transport and directions, tickets and reservations, accommodation), tourist attractions in Japan, shopping and eating |
| **The world around us** | Global and contemporary society | caring for the environment, changes in family life, the ageing society |
| **The world around us** | Communication and media | the internet, social media and advertisements |
| **The world around us** | The influence of technology | innovations in technology, impact of technological change |

**3 themes × 3 topics each = 9 prescribed topics.** This is the framework any
"topic module" in the hub must map onto. Because subtopics are only *suggested*,
Andrew is free to name his own subtopics — but each hub module should declare
which of the 9 prescribed topics it sits under, and colour/category naming in
the hub should not imply a subtopic is prescribed when it isn't.

---

## 6. Text types and writing styles (p. 13)

> The text types that students can reasonably be expected to **produce** by the
> completion of this study include:

| | | |
|---|---|---|
| Article | Interview | Review |
| Conversation | Journal entry | Role-play |
| Email | Personal account/blog post | Speech (script) |
| Essay | Personal letter | Story |
| Formal letter | Report | |

That is **14 productive text types**.

On receptive texts:

> The texts available for use in the practise of receptive language skills
> (listening, reading and viewing) are **limited only by their suitability** to
> develop student learning within the subtopics chosen for each unit.
> […] For the purpose of this study, **viewed texts** may include photographs,
> pictures, posters, films or film clips, captioned illustrations or maps related
> to the subtopic.

**Writing styles (5):**

> Students are expected to be able to produce different styles of writing.
> Writing styles include: **personal, imaginative, persuasive, informative and
> evaluative**.
>
> While students need to be aware of the general features of the writing styles,
> teaching and learning activities should clearly define the context, purpose and
> audience to provide direction for students on managing the writing style
> required for each activity.

Note the split: **text type** (article, email, speech…) and **writing style**
(personal, imaginative, persuasive, informative, evaluative) are two separate
axes. Unit 3 Outcome 3 and Unit 4 Outcome 3 name styles, not text types.

---

## 7. Cross-study specifications (pp. 10–11)

Five macro skills: **listening, speaking, reading, writing, viewing.**

Two organising concepts, each with three sub-strands:

- **Communicating** → interpersonal · interpretive · presentational
- **Understanding languages and cultures** → connections · comparisons · communities

Every unit's three Areas of Study map to the three Communicating modes:
**AoS 1 = interpersonal, AoS 2 = interpretive, AoS 3 = presentational.**

The single most useful sentence for Units 1&2 vs 3&4 (p. 11, Presentational
communication):

> In **Units 1 and 2**, the presentation focus is on introducing cultural
> aspects associated with Japanese-speaking communities to a specific audience,
> through **narration, recounting and explaining** in an informative and
> engaging way. In **Units 3 and 4**, the focus is on integrating concepts,
> information and ideas from a range of sources, and presenting them to
> **persuade** an audience, to **reflect and express ideas, explain a point of
> view or evaluate** information.

---

## 8. Units 1–4 — structure, outcomes, and how 1&2 differ from 3&4

### Outcome statements (verbatim: "On completion of this unit the student should be able to…")

| Unit | AoS 1 — Interpersonal | AoS 2 — Interpretive | AoS 3 — Presentational |
|---|---|---|---|
| **1** | exchange meaning in a spoken interaction in Japanese | interpret information from two texts on the same subtopic presented in Japanese, and respond in writing **in Japanese and in English** | present information, concepts and ideas in writing in Japanese on the selected subtopic and for a specific audience and purpose |
| **2** | respond **in writing** in Japanese to spoken, written or visual texts presented in Japanese | analyse and use information from written, spoken or visual texts to produce an extended written response in Japanese | explain information, ideas and concepts **orally** in Japanese to a specific audience about an aspect of culture within communities where Japanese is spoken |
| **3** | participate in a spoken exchange in Japanese to **resolve a personal issue** | interpret information from texts and write responses in Japanese | express ideas in a **personal, informative or imaginative** piece of writing in Japanese |
| **4** | share information, ideas and opinions in a spoken exchange in Japanese | analyse information from written, spoken and viewed texts for use in a written response in Japanese | present information, concepts and ideas in **evaluative or persuasive** writing on an issue in Japanese |

**Unit 1 Outcome 2 is the only outcome in the whole study design that admits
English in a student response.** Everywhere else, and explicitly in Units 3 and
4 ("All responses for this unit are to be in Japanese"), responses are Japanese.

### Subtopic coverage rules

| Unit | Rule (verbatim/near-verbatim) |
|---|---|
| 1 | "three or more topics from the prescribed themes… **Each area of study in the unit must focus on a different subtopic.**" |
| 2 | "three or more topics from the prescribed themes… **Each area of study must focus on a different subtopic.**" |
| 3 | "three or more subtopics from the prescribed themes and topics. **Each area of study must cover a different subtopic**, though teachers may choose to teach more than one subtopic in an area of study." |
| 4 | "**two or more** subtopics… **Area of Study 1 and Area of Study 2 may focus on the same subtopic.** Area of Study 3 should cover a different subtopic to the subtopic/s chosen for Areas of Study 1 and 2." |

### How Units 1&2 differ from Units 3&4 — the short version

| | Units 1 & 2 | Units 3 & 4 |
|---|---|---|
| **Assessment authority** | "All assessments at Units 1 and 2 are **school-based**. Procedures for assessment of levels of achievement in Units 1 and 2 are a **matter for school decision**." Award is satisfactory / not satisfactory against the three outcomes. | School-assessed Coursework (SAC) with **VCAA-prescribed task types and marks**, plus **two end-of-year VCAA examinations**. |
| **Weighting** | none toward a study score | Unit 3 SAC 25% + Unit 4 SAC 25% + examinations 50% = study score |
| **Prescribed length of written tasks** | **none given** | Unit 3 O3: ~450-ji · Unit 4 O2: ~450-ji · Unit 4 O3: ~500-ji |
| **Prescribed length of spoken tasks** | none given | three- to four-minute role-play (U3 O1) / interview (U4 O1) |
| **Language of response** | Unit 1 AoS 2 allows Japanese **and English**; the rest Japanese | "All responses for this unit are to be in Japanese" (stated for both Unit 3 and Unit 4) |
| **Presentational focus** | narration, recounting, explaining; informative and engaging | integrate from multiple sources; persuade, reflect, express, evaluate |
| **Number of source texts** | Unit 1 AoS 2: **two texts** on the same subtopic | Unit 4 AoS 2: **three or more texts** |
| **Task conditions** | "must be a part of the regular teaching and learning program and relate to the selected subtopic. They should be completed mainly in class and within a limited timeframe." | Same wording, plus "must not unduly add to the workload" and mandatory numerical score reported to VCAA |

### Unit 3 — School-assessed Coursework (p. 35). SAC contributes 25% to the study score.

| Outcome | Marks | Assessment task |
|---|---|---|
| **1** Participate in a spoken exchange in Japanese to resolve a personal issue. | 20 | A three- to four-minute **role-play**, focusing on negotiating a solution to a personal issue. |
| **2** Interpret information from texts and write responses in Japanese. | 15 | Responses to specific questions or instructions using information extracted from written, spoken and viewed texts on the selected subtopic. |
| **3** Express ideas in a personal, informative or imaginative piece of writing in Japanese. | 15 | An approximately **450-ji** personal, informative or imaginative piece of writing. |
| | **50** | |

### Unit 4 — School-assessed Coursework (p. 39). SAC contributes 25% to the study score.

| Outcome | Marks | Assessment task |
|---|---|---|
| **1** Share information, ideas and opinions in a spoken exchange in Japanese. | 20 | A three- to four-minute **interview** providing information and responding to questions about a cultural product or practice. |
| **2** Analyse information from written, spoken and viewed texts for use in a written response in Japanese. | 15 | An approximately **450-ji** written response for a specific audience and purpose, incorporating information from **three or more texts**. |
| **3** Present information, concepts and ideas in evaluative or persuasive writing on an issue in Japanese. | 15 | An approximately **500-ji** evaluative or persuasive piece of writing. |
| | **50** | |

### External assessment (p. 40)

> The level of achievement for Units 3 and 4 is also assessed by two end-of-year
> examinations. […] The examinations together will contribute **50 per cent** to
> the study score.
>
> **Description**: • an oral examination • a written examination.
>
> **All relevant key knowledge and key skills that underpin the outcomes in
> Units 3 and 4 are examinable.** The written examination will be set by a panel
> appointed by the VCAA.
>
> **Conditions** — Duration: Oral examination approximately **15 minutes**;
> Written examination **2 hours plus 15 minutes reading time**. Date: end-of-year,
> published annually. VCAA examination rules apply. Marked by VCAA assessors.
>
> The VCAA publishes **specifications** for all VCE examinations on the VCAA
> website. Examination specifications include details about the sections of the
> examination, their weighting, the question format/s and any other essential
> information.

**Note:** the *examination specifications* are a separate document from this
study design and are not in this repo. If the hub is to mirror exam section
structure (e.g. the written exam's parts), that document is needed — see open
questions.

### Suitable tasks for assessment — Units 1 and 2 (pp. 27, 31)

These are VCAA's *suggested* task lists for the school-based Units 1 and 2, and
are the most direct evidence of what a Unit 1/2 activity is expected to look
like. Useful raw material for hub task types.

**Unit 1** — Outcome 1: participate in a conversation, interview or role-play;
give a talk to the class about the selected subtopic, asking and answering
questions. Outcome 2: write a descriptive summary of a film including
information from a review of the film; listen to a conversation and view a map
to write directions; read an article and listen to an announcement to write
instructions. Outcome 3: create a written presentation which may include
pictures, supported by media such as Photo Story or PowerPoint; write an
imaginative children's story.

**Unit 2** — Outcome 1: write a personal answer to an email; write an
informative blog in response to texts; respond in a written letter to a radio
announcement or editorial. Outcome 2: describe in writing an experience seen
from different perspectives; write a reflective article on a cultural insight,
such as the attitudes of Japanese-speaking people in Australia and elsewhere to
traditional customs; evaluate opposing arguments put forward on an issue such as
attitudes to health or the long-term impact of social media on society.
Outcome 3: narrate a life story, event or incident that highlights an aspect of
culture; tell the class a personal or reflective story about a cultural event;
present and explain an aspect of culture, referring to a portfolio or a
PowerPoint presentation.

Both lists close with: "Where teachers allow students to choose between tasks,
they must ensure that the tasks they set are of comparable scope and demand."

### Recurring key-knowledge / key-skill wording

Every one of the twelve outcomes lists, under Key knowledge, a bullet of the
shape **"vocabulary and grammar suitable for …"** (e.g. "…for understanding,
interpreting and conveying information on the subtopic"). Under Key skills,
written outcomes recur with **"use appropriate spelling, grammar, characters,
layout and punctuation"** and spoken outcomes with **"use appropriate
pronunciation, intonation and stress"** and **"use appropriate forms of address
and non-verbal forms of communication"**. A recurring skill across all four
units is **"recognise meaning in terms and concepts without a direct equivalent
in English"** (Unit 4 upgrades this to "*explain* meaning…").

---

## 9. What this constrains for the Grammar Hub

Observations, not decisions. Decisions are Andrew's.

1. **The grammar list is a closed, named, functionally-grouped set of ~14
   sections.** The hub's existing `data/skills.js` categories already mirror it
   closely: `て-form I/II`, `た／たら／たり forms`, `Plain Form + Expressions I/II`,
   `ない-form`, `Verb Stem forms`, `Core Particles`, `Core Particles (Harder:
   に・で・へ)`, `Words Indicating Extent`, `Conjunctions`, `Nominalisers`,
   `Sentence-Final Particles`, `Miscellaneous`. That is a genuinely good fit.
2. **Sections in the study design with no corresponding hub category:**
   Finite forms – plain forms; Finite forms – polite forms; て form + verbs of
   giving and receiving; and the から／まで／までに block that closes the particle
   table. The giving-and-receiving set in particular is 5 prescribed items with
   no home.
3. **Hub categories with no counterpart in the grammar list:** `Reading
   Practice`, `Topic Vocabulary`, `Persuasive & Evaluative Expressions`,
   `Comparative & Analytical Expressions`. Those are legitimate — they map to
   *themes/topics*, *writing styles* and *text types* rather than to the grammar
   list — but the hub should be honest about which axis a category belongs to,
   since "prescribed grammar", "prescribed kanji", "prescribed topic" and
   "writing style" are four different kinds of claim.
4. **The 200 kanji give us a mechanical validator.** Any Japanese string in
   `data/skills.js` can be checked against the list, with off-list kanji either
   avoided or given furigana — exactly what VCAA itself does (§3).
5. **There is no prescribed order.** Band assignment in the hub is Andrew's
   pedagogy and must be presented as such, never as "the study design says".
6. **Vocabulary is not prescribed.** A vocabulary bank is our editorial product;
   it should be anchored to the 9 prescribed topics.
7. **Word-count targets exist only at Units 3/4** (450-ji, 450-ji, 500-ji) and
   spoken tasks are 3–4 minutes. If the hub ever shows a length target, it must
   not imply one exists at Units 1/2.
8. **Victorian Curriculum F–10 Japanese is a separate document** (there is a
   `Japanese F–10 Sequence, Foundation–Level 10.docx` in the repo root). The
   Year 10 half of Andrew's combined 10/11/12 class sits under that, not under
   this study design. This extract says nothing about F–10.

---

## 10. Open questions for Andrew

1. **Is this study design still current?** Specifically: has the accreditation
   period been extended past 2023 (external sources suggest 2019–2027 /
   2020–2027, unverified), and is there a newer Japanese Second Language study
   design accredited for the coming years? This copy prints no end year.
2. **Have any VCAA Bulletin notices amended** the prescribed kanji list, the
   grammar list, or the SAC task/mark tables since publication? The study design
   says the Bulletin is the only official source of such changes.
3. **Do we want the exam specifications document?** It is separate from the
   study design, defines the sections/weightings/question formats of the written
   exam, and is not in the repo.
4. **How should prescribed vs enrichment grammar be marked in the hub?** Items
   like passive, causative, なら, ておく and full 敬語 are *not* in the prescribed
   list but appear in real texts. Teach them, and if so, labelled how?
5. **Which of the 9 prescribed topics does each planned hub topic module sit
   under?** The framework is fixed at 9 topics; subtopics are free.
6. **Does the hub need to distinguish Units 1&2 content from Units 3&4
   content at all**, given that the grammar and kanji lists are common to
   Units 1–4 and the study design prescribes no order?

---

## Appendix — extraction provenance

- English text and the great majority of the Japanese: `pdftotext -layout` on the
  source PDF (poppler 24.02). Reliable; the Japanese is in the text layer.
- **Words that the text layer drops** (they are set in the ruby/furigana font):
  教室, 大阪, 週末, 昨日 (×3), 音楽, 将来. All seven were recovered by rendering
  pp. 17–23 and reading the page images. Marked in the tables above with
  furigana in 〔 〕 brackets.
- The 200 kanji were extracted from the text layer **and** independently
  confirmed against the rendered p. 14 image; group counts sum to 200 with no
  duplicates.
- Underlining of target particles on pp. 21–22 is present in the original and is
  lost in this markdown; see the rendered pages if it matters.
- Nothing in this file was supplied from model knowledge of Japanese or of VCE.
  The only non-document content is the accreditation-extension lead in §0, which
  is labelled as external and unverified.
