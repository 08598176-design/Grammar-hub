/* ============================================================
   Generates all 47 Oral Exam Q&A audio files using Google Cloud
   Text-to-Speech (WaveNet voices).

   HOW TO RUN:
     node generate-audio.js YOUR_API_KEY_HERE

   Output: an "audio" folder containing qa-01.mp3 ... qa-47.mp3,
   matching the item order in the Grammar Hub's Oral Exam Q&A
   section (Tier 1: items 1-15, Tier 2: 16-30, Tier 3: 31-47).

   Requires Node 18+ (uses the built-in fetch — no npm install needed).
   ============================================================ */

const fs = require("fs");
const path = require("path");

const API_KEY = process.argv[2];
if (!API_KEY) {
  console.error("Missing API key. Run as: node generate-audio.js YOUR_API_KEY_HERE");
  process.exit(1);
}

// Change this to try a different voice. Common Japanese WaveNet options:
// ja-JP-Wavenet-A / B (female), ja-JP-Wavenet-C / D (male)
const VOICE_NAME = "ja-JP-Wavenet-B";

const QUESTIONS = [
  "なまえは何ですか。",
  "今、何年生ですか。",
  "かぞくは何人いますか。",
  "おとうさんの仕事は何ですか。",
  "おかあさんの仕事は何ですか。",
  "きょうだいがいますか。",
  "だれと一番なかがいいですか。どうしてですか。",
  "どんな学校の行事がすきですか。",
  "学校でどんな科目をべんきょうしていますか。",
  "一番すきな科目は何ですか。どうしてですか。",
  "一番にがてな科目は何ですか。どうしてですか。",
  "学校生活で一番たいへんなことは何ですか。",
  "友だちと何をするのがすきですか。",
  "いい友だちとはどんな人だと思いますか。",
  "しゅみは何ですか。",
  "いつからそのしゅみを始めましたか。",
  "どうしてそのしゅみがすきなのですか。",
  "週末は何をしますか。",
  "毎日どんな生活をしていますか。",
  "アルバイトをしていますか。",
  "アルバイトはどうですか。たいへんですか、たのしいですか。",
  "将来のゆめは何ですか。",
  "どうしてその仕事をえらびましたか。",
  "大学で何をべんきょうしたいですか。",
  "将来、日本とかんけいがある仕事をしたいですか。",
  "十年後、どんな生活をしていると思いますか。",
  "日本に行ったことがありますか。",
  "日本のどこに行きたいですか。どうしてですか。",
  "日本の文化について何をしっていますか。",
  "日本と自分の国とどうちがいますか。",
  "日本語をべんきょうするりゆうは何ですか。",
  "日本語をべんきょうしていて、一番むずかしいことは何ですか。",
  "これから日本語をどうやってつづけたいですか。",
  "今の日本のわかものについてどう思いますか。",
  "テクノロジーは生活をどうかえたと思いますか。",
  "学生にとってスマホはひつようだと思いますか。どうしてですか。",
  "かんきょうもんだいについてどう思いますか。",
  "かんきょうをまもるために何ができると思いますか。",
  "学校できゅう食（べんとう）を食べたほうがいいと思いますか。",
  "オンライン学習についてどう思いますか。",
  "今の教育せいどについてどう思いますか。何かかえたほうがいいですか。",
  "社会でSNSはいいえいきょうをあたえると思いますか、それとも わるいえいきょうをあたえると思いますか。",
  "もし十年前にもどれたら、何をしますか。",
  "もし日本に一年間住めたら、何をしたいですか。",
  "もしお金がたくさんあったら、何をしますか。",
  "どんな大人になりたいですか。",
  "人生で一番大切なことは何だと思いますか。どうしてですか。"
];

async function synthesize(text) {
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: "ja-JP", name: VOICE_NAME },
        audioConfig: { audioEncoding: "MP3" }
      })
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ? data.error.message : `HTTP ${res.status}`);
  }
  return Buffer.from(data.audioContent, "base64");
}

async function main() {
  const outDir = path.join(__dirname, "audio");
  fs.mkdirSync(outDir, { recursive: true });

  let failures = 0;
  for (let i = 0; i < QUESTIONS.length; i++) {
    const n = String(i + 1).padStart(2, "0");
    const outPath = path.join(outDir, `qa-${n}.mp3`);
    process.stdout.write(`[${n}/47] ${QUESTIONS[i].slice(0, 20)}... `);
    try {
      const audio = await synthesize(QUESTIONS[i]);
      fs.writeFileSync(outPath, audio);
      console.log("OK");
    } catch (err) {
      failures++;
      console.log("FAILED:", err.message);
    }
    // brief pause between requests, polite to the API
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log(`\nDone. ${QUESTIONS.length - failures}/${QUESTIONS.length} files created in ./audio/`);
  if (failures) {
    console.log(`${failures} failed — check the error messages above (common cause: billing not enabled on the project, or the API key is restricted).`);
  }
}

main();
