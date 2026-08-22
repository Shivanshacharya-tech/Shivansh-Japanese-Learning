const grammar = [
  {
    id: "n5-desu",
    level: "N5",
    pattern: "です / だ",
    title: "Be / Is / Am / Are",
    explanation: "です makes a sentence polite. だ is the casual form. Japanese often leaves out the subject when context makes it clear.",
    examples: [
      { japanese: "私は学生です。", reading: "Watashi wa gakusei desu.", english: "I am a student." },
      { japanese: "これは本だ。", reading: "Kore wa hon da.", english: "This is a book." },
    ],
  },
  {
    id: "n5-wa",
    level: "N5",
    pattern: "N は N です",
    title: "Topic marker は",
    explanation: "は marks the topic of the sentence. It is written は but pronounced wa when used as a particle.",
    examples: [
      { japanese: "私はアミです。", reading: "Watashi wa Ami desu.", english: "I am Ami." },
      { japanese: "日本語は楽しいです。", reading: "Nihongo wa tanoshii desu.", english: "Japanese is fun." },
    ],
  },
  {
    id: "n5-o",
    level: "N5",
    pattern: "N を V",
    title: "Object marker を",
    explanation: "を marks the direct object of an action. It is written を and pronounced o.",
    examples: [
      { japanese: "水を飲みます。", reading: "Mizu o nomimasu.", english: "I drink water." },
      { japanese: "本を読みます。", reading: "Hon o yomimasu.", english: "I read a book." },
    ],
  },
  {
    id: "n5-ni",
    level: "N5",
    pattern: "N に 行きます",
    title: "Destination に",
    explanation: "に marks a destination or a specific time. With movement verbs, it often means to or toward.",
    examples: [
      { japanese: "学校に行きます。", reading: "Gakkou ni ikimasu.", english: "I go to school." },
      { japanese: "七時に起きます。", reading: "Shichi-ji ni okimasu.", english: "I wake up at seven." },
    ],
  },
  {
    id: "n5-teiru",
    level: "N5",
    pattern: "V-て います",
    title: "An action in progress",
    explanation: "て-form plus います describes an action happening now. It can also describe a continuing state.",
    examples: [
      { japanese: "今、勉強しています。", reading: "Ima, benkyou shite imasu.", english: "I am studying now." },
      { japanese: "東京に住んでいます。", reading: "Tokyo ni sunde imasu.", english: "I live in Tokyo." },
    ],
  },
  {
    id: "n4-ta-koto",
    level: "N4",
    pattern: "V-た ことがあります",
    title: "Have done before",
    explanation: "This pattern talks about a past experience. It means have ever done something, not a specific completed event.",
    examples: [
      { japanese: "日本へ行ったことがあります。", reading: "Nihon e itta koto ga arimasu.", english: "I have been to Japan." },
      { japanese: "寿司を食べたことがあります。", reading: "Sushi o tabeta koto ga arimasu.", english: "I have eaten sushi before." },
    ],
  },
  {
    id: "n4-nakereba",
    level: "N4",
    pattern: "V-なければなりません",
    title: "Must / have to",
    explanation: "This formal pattern expresses obligation. Literally, it means if one does not do it, it will not do.",
    examples: [
      { japanese: "宿題をしなければなりません。", reading: "Shukudai o shinakereba narimasen.", english: "I have to do my homework." },
      { japanese: "薬を飲まなければなりません。", reading: "Kusuri o nomanakereba narimasen.", english: "I must take medicine." },
    ],
  },
  {
    id: "n4-noni",
    level: "N4",
    pattern: "～のに",
    title: "Although / despite",
    explanation: "のに connects two ideas that contrast with each other. The second result is unexpected from the first idea.",
    examples: [
      { japanese: "勉強したのに、試験に落ちました。", reading: "Benkyou shita noni, shiken ni ochimashita.", english: "Although I studied, I failed the exam." },
      { japanese: "簡単なのに、できません。", reading: "Kantan na noni, dekimasen.", english: "Although it is easy, I cannot do it." },
    ],
  },
  {
    id: "n3-youda",
    level: "N3",
    pattern: "～ようだ",
    title: "It seems / appears",
    explanation: "ようだ expresses an inference based on information or evidence. The form changes depending on whether it follows a noun, adjective, or verb.",
    examples: [
      { japanese: "雨が降るようです。", reading: "Ame ga furu you desu.", english: "It seems that it will rain." },
      { japanese: "彼は元気なようです。", reading: "Kare wa genki na you desu.", english: "He seems to be well." },
    ],
  },
  {
    id: "n3-saseru",
    level: "N3",
    pattern: "V-せる / V-させる",
    title: "Causative: make / let",
    explanation: "The causative form means to make someone do something or to let someone do something. Context tells which meaning is intended.",
    examples: [
      { japanese: "先生は学生に話させました。", reading: "Sensei wa gakusei ni hanasasemashita.", english: "The teacher made the student speak." },
      { japanese: "母は私を自由にさせました。", reading: "Haha wa watashi o jiyuu ni sasemashita.", english: "My mother let me be free." },
    ],
  },
  {
    id: "n3-baai",
    level: "N3",
    pattern: "～場合は",
    title: "In the case of",
    explanation: "場合は introduces a condition or situation and explains what should happen in that case.",
    examples: [
      { japanese: "地震の場合は、外へ出ないでください。", reading: "Jishin no baai wa, soto e denai de kudasai.", english: "In case of an earthquake, please do not go outside." },
      { japanese: "困った場合は、連絡してください。", reading: "Komatta baai wa, renraku shite kudasai.", english: "If you have trouble, please contact us." },
    ],
  },
  {
    id: "n2-wake",
    level: "N2",
    pattern: "～わけではない",
    title: "It does not mean that",
    explanation: "わけではない partially or politely denies an interpretation. It often means not necessarily or it is not that.",
    examples: [
      { japanese: "嫌いなわけではありません。", reading: "Kirai na wake dewa arimasen.", english: "It is not that I dislike it." },
      { japanese: "全部を知っているわけではない。", reading: "Zenbu o shitte iru wake dewa nai.", english: "It does not mean that I know everything." },
    ],
  },
  {
    id: "n2-ni-chigai",
    level: "N2",
    pattern: "～に違いない",
    title: "Must be / surely",
    explanation: "に違いない expresses a strong conclusion based on evidence or the speaker's confidence.",
    examples: [
      { japanese: "彼は来るに違いない。", reading: "Kare wa kuru ni chigai nai.", english: "He must be coming." },
      { japanese: "これは本物に違いありません。", reading: "Kore wa honmono ni chigai arimasen.", english: "This must be genuine." },
    ],
  },
  {
    id: "n1-mono-no",
    level: "N1",
    pattern: "～ものの",
    title: "Although / even though",
    explanation: "ものの introduces a concession in formal writing. It acknowledges the first statement while presenting a contrasting result.",
    examples: [
      { japanese: "応募したものの、返事がありません。", reading: "Oubo shita monono, henji ga arimasen.", english: "Although I applied, there has been no reply." },
      { japanese: "理解しているものの、説明できません。", reading: "Rikai shite iru monono, setsumei dekimasen.", english: "Although I understand it, I cannot explain it." },
    ],
  },
  {
    id: "n1-kanenai",
    level: "N1",
    pattern: "～かねない",
    title: "Might / could possibly",
    explanation: "かねない expresses concern that something undesirable may happen. It is commonly used in formal speech and writing.",
    examples: [
      { japanese: "この問題は混乱を招きかねない。", reading: "Kono mondai wa konran o manekikanenai.", english: "This problem could cause confusion." },
      { japanese: "無理をすると、病気になりかねません。", reading: "Muri o suru to, byouki ni narikanemasen.", english: "If you overwork yourself, you could become ill." },
    ],
  },
];

const extendedGrammar = [
  {
    id: "n5-ga",
    level: "N5",
    pattern: "N が あります / います",
    title: "Existence and subjects",
    explanation: "が marks the subject with existence verbs. あります is used for things and います is used for people and animals.",
    examples: [
      { japanese: "机の上に本があります。", reading: "Tsukue no ue ni hon ga arimasu.", english: "There is a book on the desk." },
      { japanese: "教室に先生がいます。", reading: "Kyoushitsu ni sensei ga imasu.", english: "There is a teacher in the classroom." },
    ],
  },
  {
    id: "n5-no",
    level: "N5",
    pattern: "N の N",
    title: "Possession and description",
    explanation: "の connects two nouns. It can show possession, origin, category, or a relationship between nouns.",
    examples: [
      { japanese: "これは私のかばんです。", reading: "Kore wa watashi no kaban desu.", english: "This is my bag." },
      { japanese: "日本の会社で働きます。", reading: "Nihon no kaisha de hatarakimasu.", english: "I work for a Japanese company." },
    ],
  },
  {
    id: "n5-de",
    level: "N5",
    pattern: "N で V",
    title: "Place and means で",
    explanation: "で marks where an action happens or the means and tool used for an action.",
    examples: [
      { japanese: "図書館で勉強します。", reading: "Toshokan de benkyou shimasu.", english: "I study at the library." },
      { japanese: "電車で会社へ行きます。", reading: "Densha de kaisha e ikimasu.", english: "I go to the company by train." },
    ],
  },
  {
    id: "n5-mo",
    level: "N5",
    pattern: "N も",
    title: "Also / too",
    explanation: "も replaces another particle to add a similar item or person. It means also, too, or as well.",
    examples: [
      { japanese: "私も学生です。", reading: "Watashi mo gakusei desu.", english: "I am also a student." },
      { japanese: "水もください。", reading: "Mizu mo kudasai.", english: "Water too, please." },
    ],
  },
  {
    id: "n5-kara-made",
    level: "N5",
    pattern: "～から ～まで",
    title: "From ... to ...",
    explanation: "から marks a starting point and まで marks an ending point in time or space.",
    examples: [
      { japanese: "九時から五時まで働きます。", reading: "Ku-ji kara go-ji made hatarakimasu.", english: "I work from nine to five." },
      { japanese: "東京から大阪まで行きます。", reading: "Tokyo kara Osaka made ikimasu.", english: "I go from Tokyo to Osaka." },
    ],
  },
  {
    id: "n5-masen",
    level: "N5",
    pattern: "V-ません",
    title: "Polite negative",
    explanation: "ません is the polite negative form of a verb. It says that someone does not or will not do an action.",
    examples: [
      { japanese: "肉を食べません。", reading: "Niku o tabemasen.", english: "I do not eat meat." },
      { japanese: "明日は働きません。", reading: "Ashita wa hatarakimasen.", english: "I will not work tomorrow." },
    ],
  },
  {
    id: "n5-tai",
    level: "N5",
    pattern: "V-たいです",
    title: "Want to do",
    explanation: "たい attaches to the verb stem to express the speaker's desire to do something.",
    examples: [
      { japanese: "日本へ行きたいです。", reading: "Nihon e ikitai desu.", english: "I want to go to Japan." },
      { japanese: "新しい本を読みたいです。", reading: "Atarashii hon o yomitai desu.", english: "I want to read a new book." },
    ],
  },
  {
    id: "n5-te-kudasai",
    level: "N5",
    pattern: "V-て ください",
    title: "Please do",
    explanation: "てください makes a polite request. It is used when asking someone to perform an action.",
    examples: [
      { japanese: "名前を書いてください。", reading: "Namae o kaite kudasai.", english: "Please write your name." },
      { japanese: "少し待ってください。", reading: "Sukoshi matte kudasai.", english: "Please wait a little." },
    ],
  },
  {
    id: "n4-toki",
    level: "N4",
    pattern: "V / A / N の とき",
    title: "When",
    explanation: "とき means when or at the time. The form before it changes according to whether it is a verb, adjective, or noun.",
    examples: [
      { japanese: "日本へ行くとき、写真を撮りました。", reading: "Nihon e iku toki, shashin o torimashita.", english: "When I went to Japan, I took photos." },
      { japanese: "暇なとき、映画を見ます。", reading: "Hima na toki, eiga o mimasu.", english: "When I am free, I watch movies." },
    ],
  },
  {
    id: "n4-mae-ato",
    level: "N4",
    pattern: "V-る 前に / V-た 後で",
    title: "Before and after",
    explanation: "前に describes an action that happens before another. 後で describes an action that happens afterward.",
    examples: [
      { japanese: "寝る前に歯を磨きます。", reading: "Neru mae ni ha o migakimasu.", english: "I brush my teeth before sleeping." },
      { japanese: "仕事の後で友達に会います。", reading: "Shigoto no ato de tomodachi ni aimasu.", english: "I meet my friend after work." },
    ],
  },
  {
    id: "n4-nagara",
    level: "N4",
    pattern: "V-ます ながら",
    title: "While doing",
    explanation: "ながら connects two simultaneous actions. The subject is normally the same for both actions.",
    examples: [
      { japanese: "音楽を聞きながら勉強します。", reading: "Ongaku o kikinagara benkyou shimasu.", english: "I study while listening to music." },
      { japanese: "歩きながら話しましょう。", reading: "Arukinagara hanashimashou.", english: "Let us talk while walking." },
    ],
  },
  {
    id: "n4-sugiru",
    level: "N4",
    pattern: "V-ます / A すぎる",
    title: "Too much / too ...",
    explanation: "すぎる attaches to a verb stem or adjective to say that something exceeds a desirable or normal amount.",
    examples: [
      { japanese: "このかばんは高すぎます。", reading: "Kono kaban wa takasugimasu.", english: "This bag is too expensive." },
      { japanese: "昨日、食べすぎました。", reading: "Kinou, tabesugimashita.", english: "I ate too much yesterday." },
    ],
  },
  {
    id: "n4-souda",
    level: "N4",
    pattern: "V-ます / A そうです",
    title: "Looks like / seems",
    explanation: "そうです describes an impression based on appearance or immediate evidence. It is different from hearsay そうです.",
    examples: [
      { japanese: "この料理はおいしそうです。", reading: "Kono ryouri wa oishisou desu.", english: "This food looks delicious." },
      { japanese: "雨が降りそうです。", reading: "Ame ga furisou desu.", english: "It looks like it will rain." },
    ],
  },
  {
    id: "n4-tsumori",
    level: "N4",
    pattern: "V-る / V-ない つもりです",
    title: "Intend to",
    explanation: "つもりです expresses a firm intention or plan. Use the negative form to say that you do not intend to do something.",
    examples: [
      { japanese: "来年、日本へ行くつもりです。", reading: "Rainen, Nihon e iku tsumori desu.", english: "I intend to go to Japan next year." },
      { japanese: "今日は出かけないつもりです。", reading: "Kyou wa dekakenai tsumori desu.", english: "I do not intend to go out today." },
    ],
  },
  {
    id: "n3-passive",
    level: "N3",
    pattern: "V-れる / V-られる",
    title: "Passive voice",
    explanation: "The passive form makes the receiver of an action the grammatical subject. It is also used for unwanted events.",
    examples: [
      { japanese: "この本は多くの人に読まれています。", reading: "Kono hon wa ooku no hito ni yomarete imasu.", english: "This book is read by many people." },
      { japanese: "弟にケーキを食べられました。", reading: "Otouto ni keeki o taberaremashita.", english: "My younger brother ate my cake, to my annoyance." },
    ],
  },
  {
    id: "n3-potential",
    level: "N3",
    pattern: "V-える / V-られる",
    title: "Can / be able to",
    explanation: "The potential form expresses ability or possibility. The object is often marked with が instead of を.",
    examples: [
      { japanese: "漢字が読めます。", reading: "Kanji ga yomemasu.", english: "I can read Kanji." },
      { japanese: "明日、来られますか。", reading: "Ashita, koraremasu ka.", english: "Can you come tomorrow?" },
    ],
  },
  {
    id: "n3-tame",
    level: "N3",
    pattern: "N / V-る ために",
    title: "For the purpose of",
    explanation: "ために states a goal or purpose. The subject of the purpose and main action is normally the same.",
    examples: [
      { japanese: "試験に合格するために勉強します。", reading: "Shiken ni goukaku suru tame ni benkyou shimasu.", english: "I study in order to pass the exam." },
      { japanese: "健康のために運動します。", reading: "Kenkou no tame ni undou shimasu.", english: "I exercise for my health." },
    ],
  },
  {
    id: "n3-hazu",
    level: "N3",
    pattern: "～はずです",
    title: "Should be / expected to",
    explanation: "はずです expresses a confident expectation based on knowledge or evidence. はずがない means there is no way.",
    examples: [
      { japanese: "彼はもう着いたはずです。", reading: "Kare wa mou tsuita hazu desu.", english: "He should have arrived already." },
      { japanese: "そんなことはないはずです。", reading: "Sonna koto wa nai hazu desu.", english: "That should not be the case." },
    ],
  },
  {
    id: "n3-koto-ni-naru",
    level: "N3",
    pattern: "V-る ことになる",
    title: "It has been decided that",
    explanation: "ことになる describes a decision or result determined by circumstances or another person, rather than by the speaker alone.",
    examples: [
      { japanese: "来月、大阪へ転勤することになりました。", reading: "Raigetsu, Osaka e tenkin suru koto ni narimashita.", english: "It has been decided that I will transfer to Osaka next month." },
      { japanese: "会議は中止ということになりました。", reading: "Kaigi wa chuushi to iu koto ni narimashita.", english: "It was decided that the meeting would be cancelled." },
    ],
  },
  {
    id: "n2-tsurete",
    level: "N2",
    pattern: "～につれて",
    title: "As ... changes",
    explanation: "につれて expresses two changes that progress together. It is often used with gradual or measurable change.",
    examples: [
      { japanese: "年を取るにつれて、体力が落ちます。", reading: "Toshi o toru ni tsurete, tairyoku ga ochimasu.", english: "As we age, our physical strength declines." },
      { japanese: "春が近づくにつれて暖かくなります。", reading: "Haru ga chikazuku ni tsurete atatakaku narimasu.", english: "As spring approaches, it becomes warmer." },
    ],
  },
  {
    id: "n2-ni-kakawarazu",
    level: "N2",
    pattern: "～にかかわらず",
    title: "Regardless of",
    explanation: "にかかわらず states that a result does not change despite a condition or difference.",
    examples: [
      { japanese: "経験の有無にかかわらず応募できます。", reading: "Keiken no umu ni kakawarazu oubo dekimasu.", english: "You can apply regardless of experience." },
      { japanese: "天候にかかわらず実施します。", reading: "Tenkou ni kakawarazu jisshi shimasu.", english: "It will be held regardless of the weather." },
    ],
  },
  {
    id: "n2-dake-de-naku",
    level: "N2",
    pattern: "～だけでなく ～も",
    title: "Not only ... but also",
    explanation: "だけでなく adds a second item that is included in addition to the first. も marks the additional item.",
    examples: [
      { japanese: "彼は英語だけでなく中国語も話せます。", reading: "Kare wa eigo dake de naku chuugokugo mo hanasemasu.", english: "He can speak not only English but also Chinese." },
      { japanese: "雨だけでなく風も強いです。", reading: "Ame dake de naku kaze mo tsuyoi desu.", english: "Not only the rain but also the wind is strong." },
    ],
  },
  {
    id: "n2-sae",
    level: "N2",
    pattern: "～さえ",
    title: "Even",
    explanation: "さえ highlights an extreme example to show that something is true in an unexpected or surprising case.",
    examples: [
      { japanese: "名前さえ知りません。", reading: "Namae sae shirimasen.", english: "I do not even know their name." },
      { japanese: "水さえあれば生きられます。", reading: "Mizu sae areba ikiraremasu.", english: "If only I have water, I can survive." },
    ],
  },
  {
    id: "n2-wake-ga-nai",
    level: "N2",
    pattern: "～わけがない",
    title: "There is no way",
    explanation: "わけがない strongly denies a possibility. It means there is absolutely no way that something is true or will happen.",
    examples: [
      { japanese: "彼がそんな約束を忘れるわけがない。", reading: "Kare ga sonna yakusoku o wasureru wake ga nai.", english: "There is no way he would forget such a promise." },
      { japanese: "一日で全部できるわけがありません。", reading: "Ichinichi de zenbu dekiru wake ga arimasen.", english: "There is no way everything can be done in one day." },
    ],
  },
  {
    id: "n2-ni-shite-wa",
    level: "N2",
    pattern: "～にしては",
    title: "Considering that",
    explanation: "にしては introduces a result that is surprising or unusual considering the standard suggested by the first phrase.",
    examples: [
      { japanese: "初めてにしては上手です。", reading: "Hajimete ni shite wa jouzu desu.", english: "You are good considering it is your first time." },
      { japanese: "子どもにしては難しい本を読んでいます。", reading: "Kodomo ni shite wa muzukashii hon o yonde imasu.", english: "They are reading a difficult book for a child." },
    ],
  },
  {
    id: "n1-ni-soku-shite",
    level: "N1",
    pattern: "～に即して",
    title: "In accordance with",
    explanation: "に即して means in accordance with a standard, reality, or actual situation. It is common in formal writing.",
    examples: [
      { japanese: "現実に即した計画を作ります。", reading: "Genjitsu ni soku shita keikaku o tsukurimasu.", english: "We will make a plan based on reality." },
      { japanese: "法律に即して判断します。", reading: "Houritsu ni sokushite handan shimasu.", english: "We will decide in accordance with the law." },
    ],
  },
  {
    id: "n1-o-megutte",
    level: "N1",
    pattern: "～をめぐって",
    title: "Concerning / surrounding",
    explanation: "をめぐって describes debate, conflict, or activity centered around a topic or issue.",
    examples: [
      { japanese: "新しい計画をめぐって意見が分かれています。", reading: "Atarashii keikaku o megutte iken ga wakarete imasu.", english: "Opinions are divided over the new plan." },
      { japanese: "遺産をめぐる争いが続いています。", reading: "Isan o meguru arasoi ga tsuzuite imasu.", english: "The dispute over the inheritance continues." },
    ],
  },
  {
    id: "n1-ni-taeru",
    level: "N1",
    pattern: "～にたえる",
    title: "Worthy of / able to withstand",
    explanation: "にたえる means worthy of an evaluation or able to withstand an experience. It is formal and often used in writing.",
    examples: [
      { japanese: "鑑賞にたえる作品です。", reading: "Kanshou ni taeru sakuhin desu.", english: "It is a work worthy of appreciation." },
      { japanese: "読むにたえない内容でした。", reading: "Yomu ni taenai naiyou deshita.", english: "The content was not worth reading." },
    ],
  },
  {
    id: "n1-to-iu-yori",
    level: "N1",
    pattern: "～というより",
    title: "Rather than saying",
    explanation: "というより corrects or refines a description. It means rather than X, it is more accurate to say Y.",
    examples: [
      { japanese: "静かというより、寂しい町です。", reading: "Shizuka to iu yori, sabishii machi desu.", english: "Rather than quiet, it is a lonely town." },
      { japanese: "失敗というより、貴重な経験でした。", reading: "Shippai to iu yori, kichou na keiken deshita.", english: "Rather than a failure, it was a valuable experience." },
    ],
  },
];

const courseGrammar = [
  {
    id: "n5-noun-basics",
    level: "N5",
    unit: "Lesson 1: Nouns",
    pattern: "N は N です / ではありません",
    title: "Noun sentences",
    explanation: "Japanese noun sentences identify, classify, or describe a topic. Use です for a polite positive sentence and ではありません for a polite negative sentence.",
    examples: [
      { japanese: "私は会社員です。", reading: "Watashi wa kaishain desu.", english: "I am an office worker." },
      { japanese: "田中さんは先生ではありません。", reading: "Tanaka-san wa sensei dewa arimasen.", english: "Mr. Tanaka is not a teacher." },
    ],
  },
  {
    id: "n5-noun-modifiers",
    level: "N5",
    unit: "Lesson 1: Nouns",
    pattern: "N1 の N2",
    title: "Noun modification",
    explanation: "Put の between two nouns to show possession, origin, category, or a relationship. The final noun is the main topic.",
    examples: [
      { japanese: "これは日本の車です。", reading: "Kore wa Nihon no kuruma desu.", english: "This is a Japanese car." },
      { japanese: "あれは先生の本です。", reading: "Are wa sensei no hon desu.", english: "That is the teacher's book." },
    ],
  },
  {
    id: "n5-i-adjectives",
    level: "N5",
    unit: "Lesson 2: Adjectives",
    pattern: "い-adjective + N / くないです",
    title: "I-adjectives",
    explanation: "I-adjectives directly modify nouns. To make them negative, change the final い to くないです. Do not add な before a noun.",
    examples: [
      { japanese: "新しい本を買いました。", reading: "Atarashii hon o kaimashita.", english: "I bought a new book." },
      { japanese: "この部屋は広くないです。", reading: "Kono heya wa hirokunai desu.", english: "This room is not spacious." },
    ],
  },
  {
    id: "n5-na-adjectives",
    level: "N5",
    unit: "Lesson 2: Adjectives",
    pattern: "な-adjective + な N",
    title: "Na-adjectives",
    explanation: "Na-adjectives use な before a noun and behave like nouns before です. They describe states, qualities, and evaluations.",
    examples: [
      { japanese: "静かな町に住んでいます。", reading: "Shizuka na machi ni sunde imasu.", english: "I live in a quiet town." },
      { japanese: "この問題は簡単です。", reading: "Kono mondai wa kantan desu.", english: "This problem is easy." },
    ],
  },
  {
    id: "n5-verb-forms",
    level: "N5",
    unit: "Lesson 3: Verbs",
    pattern: "V-ます / V-ません / V-ました",
    title: "Polite verb forms",
    explanation: "The polite verb system has present positive, present negative, past positive, and past negative forms. The verb stem stays the same while the ending changes.",
    examples: [
      { japanese: "毎朝、コーヒーを飲みます。", reading: "Maiasa, koohii o nomimasu.", english: "I drink coffee every morning." },
      { japanese: "昨日は飲みませんでした。", reading: "Kinou wa nomimasen deshita.", english: "I did not drink it yesterday." },
    ],
  },
  {
    id: "n5-verb-te-form",
    level: "N5",
    unit: "Lesson 3: Verbs",
    pattern: "V-て、V-て",
    title: "Connecting actions",
    explanation: "The て-form connects actions in sequence or groups related actions in one sentence. The final verb carries the tense and politeness.",
    examples: [
      { japanese: "朝起きて、顔を洗います。", reading: "Asa okite, kao o araimasu.", english: "I wake up in the morning and wash my face." },
      { japanese: "本を読んで、寝ました。", reading: "Hon o yonde, nemashita.", english: "I read a book and went to sleep." },
    ],
  },
  {
    id: "n5-tense-comparison",
    level: "N5",
    unit: "Lesson 4: Tense",
    pattern: "V-る / V-た / V-ない / V-なかった",
    title: "The four basic tenses",
    explanation: "Japanese distinguishes non-past from past, and positive from negative. The non-past can describe both present habits and future events.",
    examples: [
      { japanese: "週末に映画を見ます。", reading: "Shuumatsu ni eiga o mimasu.", english: "I will watch a movie on the weekend." },
      { japanese: "先週、映画を見ませんでした。", reading: "Senshuu, eiga o mimasen deshita.", english: "I did not watch a movie last week." },
    ],
  },
  {
    id: "n5-sentence-order",
    level: "N5",
    unit: "Lesson 5: Sentences",
    pattern: "Topic + time + place + object + verb",
    title: "Building a complete sentence",
    explanation: "Japanese usually places the verb at the end. Particles show each word's role, so time and place phrases can move for emphasis without changing the core meaning.",
    examples: [
      { japanese: "私は毎日図書館で日本語を勉強します。", reading: "Watashi wa mainichi toshokan de nihongo o benkyou shimasu.", english: "I study Japanese at the library every day." },
      { japanese: "友達と駅で昼ご飯を食べました。", reading: "Tomodachi to eki de hirugohan o tabemashita.", english: "I ate lunch with a friend at the station." },
    ],
  },
  {
    id: "n3-essay-structure",
    level: "N3",
    unit: "Lesson 6: Essay Writing",
    pattern: "Introduction → reason → example → conclusion",
    title: "Organizing a Japanese essay",
    explanation: "A clear Japanese essay introduces its position, supports it with reasons and examples, then restates the conclusion. Use まず, 次に, 例えば, and したがって to guide the reader.",
    examples: [
      { japanese: "まず、健康のために運動は必要です。例えば、毎日歩くと体力がつきます。したがって、無理のない運動を続けるべきです。", reading: "Mazu, kenkou no tame ni undou wa hitsuyou desu. Tatoeba, mainichi aruku to tairyoku ga tsukimasu. Shitagatte, muri no nai undou o tsuzukeru beki desu.", english: "First, exercise is necessary for health. For example, walking every day builds stamina. Therefore, we should continue manageable exercise." },
    ],
  },
  {
    id: "n3-comprehension",
    level: "N3",
    unit: "Lesson 7: Comprehension",
    pattern: "Claim → evidence → conclusion",
    title: "Reading for the main idea",
    explanation: "When reading Japanese, find the topic first, then look for contrast markers such as しかし and conclusion markers such as つまり. The final sentence often states the writer's main point.",
    examples: [
      { japanese: "便利な道具が増えた。しかし、時間が増えたわけではない。つまり、使い方が大切なのだ。", reading: "Benri na dougu ga fueta. Shikashi, jikan ga fueta wake dewa nai. Tsumari, tsukaikata ga taisetsu na no da.", english: "The number of convenient tools has increased. However, that does not mean we have more time. In other words, how we use them is important." },
    ],
  },
];

const literacyGrammar = [
  {
    id: "n3-essay-opinion",
    level: "N3",
    unit: "Lesson 6: Essay Writing",
    pattern: "私は～と考えます",
    title: "Writing an opinion paragraph",
    explanation: "State your position clearly, give one reason, add a concrete example, and finish by restating the result. This four-part structure keeps a short essay easy to follow.",
    examples: [
      { japanese: "私は学校で読書の時間を増やすべきだと考えます。理由は、読書によって新しい言葉を学べるからです。例えば、毎日二十分読めば、表現力が伸びます。", reading: "Watashi wa gakkou de dokusho no jikan o fueru beki da to kangaemasu. Riyuu wa, dokusho ni yotte atarashii kotoba o manaberu kara desu. Tatoeba, mainichi nijuppun yomeba, hyougenryoku ga nobimasu.", english: "I think schools should increase reading time. The reason is that reading allows students to learn new words. For example, reading for twenty minutes every day improves expressive ability." },
    ],
  },
  {
    id: "n3-essay-connectors",
    level: "N3",
    unit: "Lesson 6: Essay Writing",
    pattern: "まず / 次に / しかし / したがって",
    title: "Connecting essay ideas",
    explanation: "Use まず to introduce the first point, 次に for the next point, しかし for contrast, and したがって for a logical conclusion.",
    examples: [
      { japanese: "まず費用を考える必要があります。次に時間を調べます。しかし、便利さだけで決めてはいけません。したがって、全体を比べることが大切です。", reading: "Mazu hiyou o kangaeru hitsuyou ga arimasu. Tsugi ni jikan o shirabemasu. Shikashi, benrisa dake de kimete wa ikemasen. Shitagatte, zentai o kuraberu koto ga taisetsu desu.", english: "First, we need to consider the cost. Next, we check the time. However, we must not decide based only on convenience. Therefore, it is important to compare everything." },
    ],
  },
  {
    id: "n2-essay-counterargument",
    level: "N2",
    unit: "Lesson 6: Essay Writing",
    pattern: "確かに～一方で～",
    title: "Presenting a counterargument",
    explanation: "A strong formal essay acknowledges an opposing view with 確かに, then presents a different consideration with 一方で before giving its conclusion.",
    examples: [
      { japanese: "確かに在宅勤務は便利です。一方で、仕事と生活の区別が難しくなるという問題もあります。", reading: "Tashika ni zaitaku kinmu wa benri desu. Ippou de, shigoto to seikatsu no kubetsu ga muzukashiku naru to iu mondai mo arimasu.", english: "Certainly, working from home is convenient. On the other hand, it also creates the problem of making it difficult to separate work and private life." },
    ],
  },
  {
    id: "n1-essay-formal",
    level: "N1",
    unit: "Lesson 6: Essay Writing",
    pattern: "～にほかならない / ～と言えよう",
    title: "Formal essay conclusion",
    explanation: "Formal conclusions use にほかならない to emphasize the true cause and と言えよう to present a careful academic conclusion.",
    examples: [
      { japanese: "成功の理由は、継続的な努力にほかならない。以上の点から、準備が重要だと言えよう。", reading: "Seikou no riyuu wa, keizokuteki na doryoku ni hoka naranai. Ijou no ten kara, junbi ga juuyou da to ieyou.", english: "The reason for success is nothing other than continuous effort. From these points, it can be said that preparation is important." },
    ],
  },
  {
    id: "n3-comprehension-structure",
    level: "N3",
    unit: "Lesson 7: Comprehension",
    pattern: "しかし / つまり",
    title: "Finding contrast and the main point",
    explanation: "In a reading passage, しかし often marks the writer's turn or important contrast. つまり restates the main point in simpler words.",
    examples: [
      { japanese: "便利なアプリが増えました。しかし、使う時間が増えすぎると生活に悪い影響があります。つまり、道具は使い方が大切です。", reading: "Benri na apuri ga fuemashita. Shikashi, tsukau jikan ga fueru sugiru to seikatsu ni warui eikyou ga arimasu. Tsumari, dougu wa tsukaikata ga taisetsu desu.", english: "The number of convenient apps has increased. However, using them for too long negatively affects life. In other words, how we use tools is important." },
    ],
  },
  {
    id: "n3-comprehension-reference",
    level: "N3",
    unit: "Lesson 7: Comprehension",
    pattern: "この / その / これら",
    title: "Tracking references",
    explanation: "Pronouns and demonstratives refer back to information already mentioned. Identify the nearest logical noun or idea before answering a reading question.",
    examples: [
      { japanese: "新しい制度が始まりました。その目的は、地域の交流を増やすことです。", reading: "Atarashii seido ga hajimarimashita. Sono mokuteki wa, chiiki no kouryuu o fueru koto desu.", english: "A new system has started. Its purpose is to increase interaction in the community." },
    ],
  },
  {
    id: "n2-comprehension-inference",
    level: "N2",
    unit: "Lesson 7: Comprehension",
    pattern: "～わけではない / ～とは限らない",
    title: "Reading implied meaning",
    explanation: "Writers often avoid absolute claims. When you see わけではない or とは限らない, the passage is limiting an idea rather than completely rejecting it.",
    examples: [
      { japanese: "高価な商品が、必ずしも品質が高いとは限らない。", reading: "Kouka na shouhin ga, kanarazushimo hinshitsu ga takai to wa kagiranai.", english: "Expensive products are not necessarily high in quality." },
    ],
  },
  {
    id: "n1-comprehension-argument",
    level: "N1",
    unit: "Lesson 7: Comprehension",
    pattern: "筆者の主張 / 根拠 / 反論",
    title: "Analyzing an advanced argument",
    explanation: "For advanced passages, separate the author's claim from its evidence and any opposing view. The conclusion may be implied rather than stated directly.",
    examples: [
      { japanese: "筆者は技術の導入そのものを否定しているのではない。その効果を検証せずに受け入れる姿勢を問題視している。", reading: "Hissha wa gijutsu no dounyuu sono mono o hitei shite iru no dewa nai. Sono kouka o kenshou sezu ni ukeireru shisei o mondai shi shite iru.", english: "The writer is not rejecting the introduction of technology itself. The writer is questioning the attitude of accepting it without examining its effects." },
    ],
  },
];

const unitOrder = [
  "Lesson 1: Nouns",
  "Lesson 2: Adjectives",
  "Lesson 3: Verbs",
  "Lesson 4: Tense",
  "Lesson 5: Sentences",
  "Lesson 6: Essay Writing",
  "Lesson 7: Comprehension",
];

const unitById = {
  "n5-desu": "Lesson 1: Nouns",
  "n5-wa": "Lesson 1: Nouns",
  "n5-o": "Lesson 1: Nouns",
  "n5-ni": "Lesson 1: Nouns",
  "n5-ga": "Lesson 1: Nouns",
  "n5-no": "Lesson 1: Nouns",
  "n5-de": "Lesson 1: Nouns",
  "n5-mo": "Lesson 1: Nouns",
  "n5-i-adjectives": "Lesson 2: Adjectives",
  "n5-na-adjectives": "Lesson 2: Adjectives",
  "n5-teiru": "Lesson 3: Verbs",
  "n5-masen": "Lesson 3: Verbs",
  "n5-tai": "Lesson 3: Verbs",
  "n5-te-kudasai": "Lesson 3: Verbs",
  "n5-ta-koto": "Lesson 4: Tense",
  "n5-nakereba": "Lesson 5: Sentences",
};

const allGrammar = [...grammar, ...extendedGrammar, ...courseGrammar, ...literacyGrammar].map((lesson) => ({
  ...lesson,
  unit: lesson.unit || unitById[lesson.id] || "Lesson 5: Sentences",
}));

export { unitOrder };
export default allGrammar;
