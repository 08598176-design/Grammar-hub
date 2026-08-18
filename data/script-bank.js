/* ============================================================
   PARKED: the Script strand (Prep-Year 10 script and sound items).
   Removed from the grammar hub 2026-08-18 — grammar hub is grammar
   only. These 5 nodes (40 items, all identify/order, sanity-checked)
   are the seed content for a standalone Script Trainer app in the
   hub's Words section. Not loaded by any page.
   ============================================================ */
window.SCRIPT_BANK = [
  {
    id:"script-f2", category:"Script", band:"script",
    name:"The three scripts, and the first hiragana sounds",
    example:"あ ・ ア ・ 山",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Which one of these is hiragana?",
        sentence:"<b>あ</b> ・ ア ・ 山 ・ A",
        options:["あ","ア","山","A"],
        answer:"あ",
        explain:"あ is hiragana. Hiragana letters have soft, curvy shapes."
      },
      {
        type:"identify",
        prompt:"Which one of these is katakana?",
        sentence:"あ ・ <b>ア</b> ・ 山 ・ A",
        options:["ア","あ","山","A"],
        answer:"ア",
        explain:"ア is katakana. Katakana letters have straight, sharp lines."
      },
      {
        type:"identify",
        prompt:"Which one of these is kanji?",
        sentence:"あ ・ ア ・ <b>山</b> ・ A",
        options:["山","あ","ア","A"],
        answer:"山",
        explain:"山 is a kanji. Kanji came from Chinese and each one carries a meaning — 山 means mountain."
      },
      {
        type:"identify",
        prompt:"How many scripts does Japanese use for writing?",
        sentence:"あ ・ ア ・ 山",
        options:["Three: hiragana, katakana and kanji","One","Two: hiragana and kanji","Four"],
        answer:"Three: hiragana, katakana and kanji",
        explain:"Japanese is written with three scripts together: hiragana, katakana and kanji."
      },
      {
        type:"identify",
        prompt:"What sound does this hiragana make?",
        sentence:"<b>あ</b>",
        options:["a","i","u","e"],
        answer:"a",
        explain:"あ says 'a', like the a in 'father'."
      },
      {
        type:"identify",
        prompt:"What sound does this hiragana make?",
        sentence:"<b>か</b>",
        options:["ka","sa","ta","na"],
        answer:"ka",
        explain:"か says 'ka'."
      },
      {
        type:"identify",
        prompt:"What sound does this hiragana make?",
        sentence:"<b>ね</b>",
        options:["ne","re","wa","me"],
        answer:"ne",
        explain:"ね says 'ne'. Look carefully — ね, れ and わ all start the same way but finish differently."
      },
      {
        type:"order",
        prompt:"Put these hiragana in the order they come in the あいうえお chart.",
        words:["あ","い","う","え","お"],
        answer:"あいうえお",
        explain:"The first five sounds of the hiragana chart are あ・い・う・え・お (a, i, u, e, o)."
      }
    ]
  },

  {
    id:"script-y34", category:"Script", band:"words",
    name:"Reading and writing hiragana",
    example:"ねこ ・ さくら ・ きって",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Read this hiragana word. What does it say?",
        sentence:"<b>ねこ</b>",
        options:["neko (cat)","inu (dog)","tori (bird)","sakana (fish)"],
        answer:"neko (cat)",
        explain:"ね + こ = ねこ, 'neko', which means cat."
      },
      {
        type:"identify",
        prompt:"Read this hiragana word. What does it say?",
        sentence:"<b>やま</b>",
        options:["yama (mountain)","umi (sea)","kawa (river)","sora (sky)"],
        answer:"yama (mountain)",
        explain:"や + ま = やま, 'yama', which means mountain."
      },
      {
        type:"identify",
        prompt:"Which hiragana is missing?",
        sentence:"い＿う  (inu — dog)",
        options:["ぬ","め","わ","れ"],
        answer:"ぬ",
        explain:"いぬ (inu) means dog. ぬ and め look similar — ぬ has a loop at the end."
      },
      {
        type:"order",
        prompt:"Build the word for 'sushi'.",
        words:["す","し"],
        answer:"すし",
        explain:"す + し = すし."
      },
      {
        type:"order",
        prompt:"Build the word for 'sakura' (cherry blossom).",
        words:["さ","く","ら"],
        answer:"さくら",
        explain:"さ + く + ら = さくら."
      },
      {
        type:"identify",
        prompt:"What is the small っ doing in this word?",
        sentence:"き<b>っ</b>て (kitte — stamp)",
        options:["it makes a short pause before the next sound","it is read as 'tsu'","it makes the word plural","it is silent and does nothing"],
        answer:"it makes a short pause before the next sound",
        explain:"A small っ doubles the next consonant and creates a tiny pause: きて (kite) and きって (kitte) are different words."
      },
      {
        type:"identify",
        prompt:"What do the two marks on this hiragana do?",
        sentence:"か → <b>が</b>",
        options:["they change 'ka' into 'ga'","they make the letter louder","they make the letter plural","they mark the end of a sentence"],
        answer:"they change 'ka' into 'ga'",
        explain:"Those two marks are called dakuten. They change か (ka) to が (ga), さ (sa) to ざ (za), and so on."
      },
      {
        type:"identify",
        prompt:"Which of these is written in hiragana?",
        sentence:"<b>ともだち</b> ・ トマト ・ 日本",
        options:["ともだち","トマト","日本","all of them"],
        answer:"ともだち",
        explain:"ともだち (friend) is hiragana. トマト is katakana, and 日本 is kanji."
      }
    ]
  },

  {
    id:"script-y56", category:"Script", band:"sentences",
    name:"Katakana for borrowed words, and the first kanji",
    example:"テニス ・ 日本 ・ 人",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Why is this word written in katakana?",
        sentence:"<b>テニス</b> (tennis)",
        options:["it is a word borrowed from another language","it is a person's name","it is a place in Japan","katakana is used for all sports"],
        answer:"it is a word borrowed from another language",
        explain:"Katakana is used for words borrowed from other languages. テニス comes from English 'tennis'."
      },
      {
        type:"identify",
        prompt:"Which of these would be written in katakana?",
        sentence:"chocolate ・ mountain ・ friend ・ cat",
        options:["chocolate","mountain","friend","cat"],
        answer:"chocolate",
        explain:"チョコレート (chocolate) is borrowed from English, so it takes katakana. The others are ordinary Japanese words."
      },
      {
        type:"identify",
        prompt:"Read this katakana word.",
        sentence:"<b>パン</b>",
        options:["pan (bread)","pen","pin","pon"],
        answer:"pan (bread)",
        explain:"パン means bread. It came into Japanese from Portuguese, not English."
      },
      {
        type:"identify",
        prompt:"What does this kanji mean?",
        sentence:"<b>日</b>",
        options:["sun, or day","moon","mountain","person"],
        answer:"sun, or day",
        explain:"日 means sun or day. You can see it inside 日本 (Japan) and 日曜日 (Sunday)."
      },
      {
        type:"identify",
        prompt:"What does this kanji mean?",
        sentence:"<b>人</b>",
        options:["person","tree","river","big"],
        answer:"person",
        explain:"人 means person. It looks a little like someone standing with two legs."
      },
      {
        type:"identify",
        prompt:"What does this kanji word mean?",
        sentence:"<b>日本</b>",
        options:["Japan","Sunday","sunrise","this month"],
        answer:"Japan",
        explain:"日 (sun) + 本 (origin) together mean Japan — 'origin of the sun'."
      },
      {
        type:"order",
        prompt:"Put this sentence's punctuation in the right place: 'I am a student.'",
        words:["わたしはがくせいです","。"],
        answer:"わたしはがくせいです。",
        explain:"Japanese sentences end with 。 (a maru), not a full stop."
      },
      {
        type:"identify",
        prompt:"What is this mark used for?",
        sentence:"わたしは、がくせいです。 ← the <b>、</b>",
        options:["a comma — a short pause inside a sentence","a full stop","a question mark","a quotation mark"],
        answer:"a comma — a short pause inside a sentence",
        explain:"、 is the Japanese comma. It marks a pause inside the sentence; 。 ends it."
      }
    ]
  },

  {
    id:"script-y78", category:"Script", band:"choices",
    name:"Choosing the right script, and reading furigana",
    example:"オーストラリアから来ました。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Why is this word written in katakana and not hiragana?",
        sentence:"わたしは<b>オーストラリア</b>から来ました。",
        options:["it is a foreign place name","it is the subject of the sentence","it is a polite form","place names always use katakana"],
        answer:"it is a foreign place name",
        explain:"Katakana is used for foreign words and foreign place names. Japanese place names use kanji: 東京, 大阪."
      },
      {
        type:"identify",
        prompt:"What job is hiragana doing in this sentence?",
        sentence:"わたし<b>は</b>すし<b>を</b>たべ<b>ます</b>。",
        options:["carrying the particles and verb endings","writing the borrowed words","writing the nouns","decorating the sentence"],
        answer:"carrying the particles and verb endings",
        explain:"Kanji usually carries the meaning of a word, and hiragana carries the grammar around it — particles like は and を, and endings like ます."
      },
      {
        type:"identify",
        prompt:"Which script would you expect for the underlined part?",
        sentence:"I want to write the name of a Japanese city: <b>Tokyo</b>",
        options:["kanji","katakana","hiragana only","romaji"],
        answer:"kanji",
        explain:"Japanese place names are written in kanji: 東京. Katakana is for foreign names, like シドニー (Sydney)."
      },
      {
        type:"identify",
        prompt:"What are the small letters above the kanji called, and what are they for?",
        sentence:"<ruby>友達<rt>ともだち</rt></ruby>",
        options:["furigana — they show how to read the kanji","katakana — they show it is a foreign word","a translation into English","a spelling mistake"],
        answer:"furigana — they show how to read the kanji",
        explain:"Small hiragana written above or beside a kanji is called furigana. It tells you the reading of a kanji you may not know yet."
      },
      {
        type:"identify",
        prompt:"Why might a writer choose to use hiragana instead of the kanji here?",
        sentence:"ともだち  (instead of 友達)",
        options:["the reader may not know that kanji yet","hiragana is more polite","the word is borrowed from English","kanji cannot be used for people"],
        answer:"the reader may not know that kanji yet",
        explain:"Writers choose the script to suit the reader. A book for young children uses more hiragana; a newspaper uses more kanji."
      },
      {
        type:"identify",
        prompt:"What does this kanji compound mean?",
        sentence:"<b>学校</b>",
        options:["school","study","teacher","classroom"],
        answer:"school",
        explain:"学 (study) + 校 (school building) = 学校, school. Kanji often combine to build a new word."
      },
      {
        type:"identify",
        prompt:"What does this kanji compound mean?",
        sentence:"<b>日本語</b>",
        options:["the Japanese language","a Japanese person","Japan","a Japanese book"],
        answer:"the Japanese language",
        explain:"日本 (Japan) + 語 (language) = 日本語, the Japanese language. 語 turns a place into its language: 英語 English, 中国語 Chinese."
      },
      {
        type:"identify",
        prompt:"Using the pattern 〜語 (language), what would 英語 mean?",
        sentence:"日本語 = the Japanese language。 <b>英語</b> = ?",
        options:["the English language","a foreign language","a spoken language","a written language"],
        answer:"the English language",
        explain:"英 stands for England/English, so 英語 is the English language. Once you know a kanji, you can often work out new words containing it."
      }
    ]
  },

  {
    id:"script-y910", category:"Script", band:"links",
    name:"Kanji compounds and multiple readings",
    example:"日本語 ・ 学生 ・ 電車",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"This kanji has two different readings. Which reading is used here?",
        sentence:"<b>人</b>: 三人（さんにん）",
        options:["にん — the reading used in compounds and counters","ひと — the reading used when it stands alone","both are used here","neither"],
        answer:"にん — the reading used in compounds and counters",
        explain:"人 is ひと on its own ('a person') but にん or じん inside a word: 三人 (three people), 日本人 (a Japanese person)."
      },
      {
        type:"identify",
        prompt:"Which reading of 日 is used here?",
        sentence:"<b>日</b>本 (Japan)",
        options:["に — a compound reading","ひ — the stand-alone reading","か — the counter reading","び — the ending reading"],
        answer:"に — a compound reading",
        explain:"日 is ひ alone ('sun, day'), but に in 日本, にち in 日曜日, か in 三日. Most kanji have several readings, chosen by the word."
      },
      {
        type:"identify",
        prompt:"Work out the meaning from the parts: 学 (study) + 生 (life, student)",
        sentence:"<b>学生</b>",
        options:["a student","a school","a teacher","a lesson"],
        answer:"a student",
        explain:"学生 is a student. Reading the parts of a compound is often enough to work out a word you have never met."
      },
      {
        type:"identify",
        prompt:"Work out the meaning from the parts: 電 (electricity) + 車 (vehicle)",
        sentence:"<b>電車</b>",
        options:["a train","a car","a bicycle","a battery"],
        answer:"a train",
        explain:"電車 is an electric train. 車 (vehicle) also appears in 自転車 (bicycle) and 自動車 (car)."
      },
      {
        type:"identify",
        prompt:"Work out the meaning from the parts: 手 (hand) + 紙 (paper)",
        sentence:"<b>手紙</b>",
        options:["a letter","a tissue","a glove","a notebook"],
        answer:"a letter",
        explain:"手紙 means a letter. The parts do not always add up literally, so check a compound you are unsure of."
      },
      {
        type:"identify",
        prompt:"You meet an unfamiliar kanji word in a reading passage. What is the best first step?",
        sentence:"…<b>買物</b>に行きました。",
        options:["look at the kanji you do know and at the rest of the sentence","skip the whole sentence","guess from the first letter","assume it is a foreign word"],
        answer:"look at the kanji you do know and at the rest of the sentence",
        explain:"買 means buy and 物 means thing, and に行きました means 'went to do'. 買物 (shopping) becomes readable from the parts plus the context."
      },
      {
        type:"identify",
        prompt:"Why is this word written in katakana here, even though it is a Japanese word?",
        sentence:"この店のラーメンは<b>ウマイ</b>！",
        options:["for emphasis, like italics in English","because it is borrowed from English","because it is a place name","because it is a formal word"],
        answer:"for emphasis, like italics in English",
        explain:"Katakana is also used for emphasis, the way English uses italics or capitals. Recognising this stops you hunting for a foreign origin that isn't there."
      },
      {
        type:"identify",
        prompt:"What does the script choice tell you about this text?",
        sentence:"ぜんぶ ひらがな で かいて あります。",
        options:["it is probably written for young children or beginners","it is a formal newspaper article","it is a foreign text","it contains a mistake"],
        answer:"it is probably written for young children or beginners",
        explain:"An all-hiragana text with spaces is aimed at early readers. The mix of scripts a writer chooses is itself information about audience."
      }
    ]
  }
];
