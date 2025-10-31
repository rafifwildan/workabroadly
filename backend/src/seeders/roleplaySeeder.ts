import mongoose from "mongoose";
import RoleplayScenario from "../models/RoleplayScenario";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const scenarios = [
  {
    title: "日本語の面接練習 (Japanese Interview Practice)",
    description: "A simple Japanese interview scenario for beginners.",
    category: "interview",
    language: "japanese",
    difficulty: "beginner",
    steps: [
      {
        id: 1,
        speaker: "assistant",
        script: "こんにちは！今日は面接の練習をしましょう。準備はいいですか？",
        options: [
          {
            text: "はい、準備できました！",
            score: 5,
            feedback: "いいですね！元気よく答えるのは良い印象を与えます。",
            nextStep: 2,
          },
          {
            text: "うーん、ちょっと緊張しています。",
            score: 3,
            feedback: "大丈夫です。リラックスして話しましょう！",
            nextStep: 2,
          },
        ],
      },
      {
        id: 2,
        speaker: "assistant",
        script: "では、自己紹介をお願いします。",
        options: [
          {
            text: "私の名前は田中です。東京大学を卒業しました。",
            score: 5,
            feedback: "素晴らしい自己紹介ですね！",
            nextStep: 3,
          },
          {
            text: "えっと…名前は田中です…よろしくお願いします。",
            score: 3,
            feedback: "少し緊張していますね。でも大丈夫です！",
            nextStep: 3,
          },
        ],
      },
      {
        id: 3,
        speaker: "assistant",
        script: "面接はこれで終わりです。お疲れ様でした！",
      },
    ],
  },
  {
    title: "직장에서의 첫날 (First Day at Work)",
    description: "Roleplay scenario for practicing Korean in workplace situations.",
    category: "workplace",
    language: "korean",
    difficulty: "intermediate",
    steps: [
      {
        id: 1,
        speaker: "assistant",
        script: "안녕하세요! 오늘이 첫 출근이시죠?",
        options: [
          {
            text: "네, 맞아요. 잘 부탁드립니다!",
            score: 5,
            feedback: "좋아요! 예의 바르고 자연스러운 인사예요.",
            nextStep: 2,
          },
          {
            text: "응, 그렇지.",
            score: 1,
            feedback: "조금 무례하게 들릴 수 있어요. 직장에서는 존댓말을 써야 해요.",
            nextStep: 2,
          },
        ],
      },
      {
        id: 2,
        speaker: "assistant",
        script: "부서 사람들에게 자기소개해 보세요.",
        options: [
          {
            text: "안녕하세요. 저는 신입사원 김민수입니다. 잘 부탁드립니다!",
            score: 5,
            feedback: "완벽해요! 자연스럽고 예의 바른 소개입니다.",
            nextStep: 3,
          },
          {
            text: "안녕, 나는 김민수야.",
            score: 2,
            feedback: "직장에서는 반말을 피하는 게 좋아요.",
            nextStep: 3,
          },
        ],
      },
      {
        id: 3,
        speaker: "assistant",
        script: "좋아요! 첫인상이 아주 좋습니다.",
      },
    ],  
},
{
    title: "初めての面接挨拶 (First Interview Greeting)",
    description: "A beginner-level scenario for practicing polite greetings and introductions in a Japanese interview setting.",
    category: "interview",
    language: "japanese",
    difficulty: "beginner",
    steps: [
      {
        id: 1,
        speaker: "assistant",
        script: "面接官: こんにちは、どうぞおかけください。",
        options: [
          { text: "ありがとうございます。よろしくお願いします。", score: 5, feedback: "とても丁寧で良い印象です！", nextStep: 2 },
          { text: "はい。", score: 2, feedback: "もう少し丁寧に挨拶しましょう。", nextStep: 2 }
        ]
      },
      {
        id: 2,
        speaker: "assistant",
        script: "では、自己紹介をお願いします。",
        options: [
          { text: "私は田中です。東京大学を卒業しました。よろしくお願いします。", score: 5, feedback: "しっかりとした自己紹介ですね。", nextStep: 3 },
          { text: "田中です。よろしく。", score: 2, feedback: "丁寧語を使うともっと良い印象になります。", nextStep: 3 }
        ]
      },
      {
        id: 3,
        speaker: "assistant",
        script: "どうしてこの会社を選びましたか？",
        options: [
          { text: "御社の理念に共感しました。", score: 5, feedback: "良い答えです！動機が明確です。", nextStep: 4 },
          { text: "給料がいいからです。", score: 1, feedback: "理由としては少し直接的すぎます。", nextStep: 4 }
        ]
      },
      {
        id: 4,
        speaker: "assistant",
        script: "趣味は何ですか？",
        options: [
          { text: "読書とジョギングです。ストレス解消になります。", score: 5, feedback: "自然な答えで良いです。", nextStep: 5 },
          { text: "ゲームです。", score: 3, feedback: "悪くありませんが、もう少し説明を加えると良いです。", nextStep: 5 }
        ]
      },
      { id: 5, speaker: "assistant", script: "ありがとうございました。本日の面接は以上です。" }
    ]
  },
  {
    title: "アルバイト面接の練習 (Part-time Job Interview Practice)",
    description: "Learn to answer simple questions in a Japanese part-time job interview scenario.",
    category: "interview",
    language: "japanese",
    difficulty: "beginner",
    steps: [
      {
        id: 1,
        speaker: "assistant",
        script: "面接官: どんなアルバイトをしたことがありますか？",
        options: [
          { text: "コンビニで働いたことがあります。", score: 5, feedback: "経験を明確に言えて良いですね。", nextStep: 2 },
          { text: "アルバイトしたことありません。", score: 3, feedback: "素直で良いですが、学びたい姿勢を示すとさらに良いです。", nextStep: 2 }
        ]
      },
      {
        id: 2,
        speaker: "assistant",
        script: "勤務時間はどのくらい希望しますか？",
        options: [
          { text: "週に3日、1日4時間ぐらいです。", score: 5, feedback: "現実的で良い答えです。", nextStep: 3 },
          { text: "いつでも大丈夫です。", score: 2, feedback: "もう少し具体的な時間を伝えると良いです。", nextStep: 3 }
        ]
      },
      {
        id: 3,
        speaker: "assistant",
        script: "接客は好きですか？",
        options: [
          { text: "はい、人と話すのが好きです。", score: 5, feedback: "ポジティブな印象ですね！", nextStep: 4 },
          { text: "普通です。", score: 3, feedback: "もう少し積極的な姿勢を見せましょう。", nextStep: 4 }
        ]
      },
      { id: 4, speaker: "assistant", script: "ありがとうございました。結果は後日ご連絡します。" }
    ]
  },

  /* ------------------------- KOREAN - BEGINNER ------------------------- */
  {
    title: "기본 면접 인사 (Basic Interview Greeting)",
    description: "A simple Korean interview greeting practice for beginners focusing on polite expressions.",
    category: "interview",
    language: "korean",
    difficulty: "beginner",
    steps: [
      {
        id: 1,
        speaker: "assistant",
        script: "면접관: 안녕하세요. 편하게 앉으세요.",
        options: [
          { text: "감사합니다. 잘 부탁드립니다!", score: 5, feedback: "아주 공손하고 좋습니다.", nextStep: 2 },
          { text: "네.", score: 2, feedback: "조금 더 예의 있게 대답하면 좋아요.", nextStep: 2 }
        ]
      },
      {
        id: 2,
        speaker: "assistant",
        script: "자기소개 부탁드립니다.",
        options: [
          { text: "저는 김민수라고 합니다. 서울대학교를 졸업했습니다.", score: 5, feedback: "좋아요! 자연스러운 자기소개예요.", nextStep: 3 },
          { text: "김민수예요.", score: 2, feedback: "조금 더 포멀하게 말하면 좋습니다.", nextStep: 3 }
        ]
      },
      {
        id: 3,
        speaker: "assistant",
        script: "이 회사에 지원한 이유는 무엇인가요?",
        options: [
          { text: "회사의 가치와 문화가 마음에 들어서 지원했습니다.", score: 5, feedback: "아주 좋은 대답이에요.", nextStep: 4 },
          { text: "돈을 많이 벌고 싶어서요.", score: 1, feedback: "조금 부적절한 표현이에요.", nextStep: 4 }
        ]
      },
      {
        id: 4,
        speaker: "assistant",
        script: "취미가 뭐예요?",
        options: [
          { text: "책 읽기와 운동이에요.", score: 5, feedback: "자연스럽고 긍정적인 대답이에요.", nextStep: 5 },
          { text: "게임이요.", score: 3, feedback: "좋지만 좀 더 구체적으로 말해보세요.", nextStep: 5 }
        ]
      },
      { id: 5, speaker: "assistant", script: "수고하셨습니다. 오늘 면접은 여기까지입니다." }
    ]
  },
  {
    title: "편의점 아르바이트 면접 (Convenience Store Interview)",
    description: "A beginner-level Korean roleplay scenario for part-time job interviews.",
    category: "interview",
    language: "korean",
    difficulty: "beginner",
    steps: [
      {
        id: 1,
        speaker: "assistant",
        script: "면접관: 어떤 알바를 해 본 적이 있나요?",
        options: [
          { text: "식당에서 일한 경험이 있습니다.", score: 5, feedback: "좋아요! 경험을 명확하게 말했어요.", nextStep: 2 },
          { text: "없어요.", score: 3, feedback: "괜찮아요. 배우고 싶다는 태도를 보여주세요.", nextStep: 2 }
        ]
      },
      {
        id: 2,
        speaker: "assistant",
        script: "언제 일할 수 있나요?",
        options: [
          { text: "주 3회, 하루 4시간 정도 가능합니다.", score: 5, feedback: "좋아요, 구체적이에요.", nextStep: 3 },
          { text: "아무 때나 돼요.", score: 2, feedback: "조금 더 구체적으로 말해보세요.", nextStep: 3 }
        ]
      },
      {
        id: 3,
        speaker: "assistant",
        script: "고객 응대는 자신 있나요?",
        options: [
          { text: "네, 손님에게 친절하게 대할 자신 있습니다.", score: 5, feedback: "좋은 태도예요!", nextStep: 4 },
          { text: "그냥 보통이에요.", score: 3, feedback: "조금 더 적극적인 대답이 좋습니다.", nextStep: 4 }
        ]
      },
      { id: 4, speaker: "assistant", script: "좋습니다. 결과는 추후 연락드리겠습니다." }
    ]
  },
  /* ------------------------- JAPANESE - INTERMEDIATE ------------------------- */
{
  title: "面接での強みと弱み (Strengths and Weaknesses in an Interview)",
  description: "An intermediate Japanese scenario focusing on discussing personal strengths and weaknesses during an interview.",
  category: "interview",
  language: "japanese",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "あなたの強みは何だと思いますか？",
      options: [
        { text: "責任感が強いところです。", score: 5, feedback: "良い答えです。明確でポジティブです。", nextStep: 2 },
        { text: "あまりありません。", score: 1, feedback: "もう少し自信を持って答えましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "では、弱みは何ですか？",
      options: [
        { text: "完璧を求めすぎるところです。", score: 5, feedback: "自己分析ができていて良いです。", nextStep: 3 },
        { text: "遅刻することがあります。", score: 2, feedback: "正直ですが、改善点を加えると良いです。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "その弱みをどのように克服していますか？",
      options: [
        { text: "スケジュールを管理するようにしています。", score: 5, feedback: "改善意識が見えて良いですね。", nextStep: 4 },
        { text: "特に何もしていません。", score: 1, feedback: "改善の努力を見せると印象が良くなります。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "チームで働くときに心がけていることは？",
      options: [
        { text: "コミュニケーションを大切にしています。", score: 5, feedback: "非常に良い答えです。協調性が伝わります。", nextStep: 5 },
        { text: "自分の仕事だけをします。", score: 1, feedback: "もう少し協力的な印象を与えましょう。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "ありがとうございました。良いお話が聞けました。" }
  ]
},
{
  title: "キャリアチェンジ面接 (Career Change Interview)",
  description: "Intermediate-level Japanese scenario about explaining a career change during an interview.",
  category: "interview",
  language: "japanese",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "なぜ転職を考えていますか？",
      options: [
        { text: "新しい分野に挑戦したいからです。", score: 5, feedback: "前向きな理由で良いです。", nextStep: 2 },
        { text: "前の職場が嫌でした。", score: 2, feedback: "もう少し建設的な言い方にしましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "前職で学んだことをどう活かせますか？",
      options: [
        { text: "顧客対応力を活かせると思います。", score: 5, feedback: "具体的で良いです！", nextStep: 3 },
        { text: "特にありません。", score: 1, feedback: "何か1つでも活かせることを探しましょう。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "この業界に興味を持ったきっかけは？",
      options: [
        { text: "人と関わる仕事がしたかったからです。", score: 5, feedback: "素晴らしい動機ですね。", nextStep: 4 },
        { text: "たまたまです。", score: 1, feedback: "少し受け身な印象になります。", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "ありがとうございました。転職理由がよく理解できました。" }
  ]
},

/* ------------------------- JAPANESE - ADVANCED ------------------------- */
{
  title: "マネージャー候補の面接 (Manager Interview Scenario)",
  description: "An advanced Japanese scenario focusing on leadership and decision-making during management-level interviews.",
  category: "interview",
  language: "japanese",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "リーダーとして最も大切だと思うことは何ですか？",
      options: [
        { text: "チームの信頼を得ることです。", score: 5, feedback: "素晴らしいリーダーシップの答えです。", nextStep: 2 },
        { text: "成果だけを出すことです。", score: 3, feedback: "結果も大事ですが、チームも重視しましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "部下がミスをした場合、どう対応しますか？",
      options: [
        { text: "まず原因を一緒に分析し、改善策を話し合います。", score: 5, feedback: "とても良い対応です。協調的です。", nextStep: 3 },
        { text: "すぐ注意します。", score: 3, feedback: "少し厳しい印象を与えます。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "プレッシャーの中でどうやって冷静さを保ちますか？",
      options: [
        { text: "計画を立てて優先順位を整理します。", score: 5, feedback: "論理的な答えです。", nextStep: 4 },
        { text: "あまり考えません。", score: 1, feedback: "少し無責任に聞こえます。", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "ありがとうございました。リーダーとしての考え方がよく伝わりました。" }
  ]
},
{
  title: "プレゼン面接 (Presentation Interview)",
  description: "Advanced Japanese scenario for practicing structured speaking and presentation-style interviews.",
  category: "interview",
  language: "japanese",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "5分間で自己PRをお願いします。",
      options: [
        { text: "私はデータ分析を通して問題を解決する力があります。", score: 5, feedback: "内容が明確で良いです。", nextStep: 2 },
        { text: "えっと…えっと…", score: 2, feedback: "もう少し準備を整えると良いですね。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "最近の業界トレンドについてどう思いますか？",
      options: [
        { text: "AIと自動化が重要だと思います。", score: 5, feedback: "とても良い観点です。", nextStep: 3 },
        { text: "よく分かりません。", score: 1, feedback: "業界知識を少し勉強しましょう。", nextStep: 3 }
      ]
    },
    { id: 3, speaker: "assistant", script: "ありがとうございました。非常に興味深いプレゼンでした。" }
  ]
},

/* ------------------------- KOREAN - INTERMEDIATE ------------------------- */
{
  title: "면접에서 강점과 약점 말하기 (Discussing Strengths and Weaknesses)",
  description: "Intermediate Korean interview scenario focusing on expressing strengths and weaknesses.",
  category: "interview",
  language: "korean",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "본인의 강점은 무엇인가요?",
      options: [
        { text: "책임감이 강한 편입니다.", score: 5, feedback: "좋은 대답이에요! 명확하고 긍정적이에요.", nextStep: 2 },
        { text: "모르겠어요.", score: 1, feedback: "조금 더 자신감 있게 대답해보세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "약점은 무엇인가요?",
      options: [
        { text: "너무 완벽주의적인 면이 있습니다.", score: 5, feedback: "좋아요. 자기이해가 잘 되어 있네요.", nextStep: 3 },
        { text: "가끔 게을러요.", score: 2, feedback: "솔직하지만 개선 의지를 함께 말해보세요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "그 약점을 어떻게 극복하려고 노력하나요?",
      options: [
        { text: "계획을 세워 실천하려고 합니다.", score: 5, feedback: "좋아요! 개선의지가 느껴져요.", nextStep: 4 },
        { text: "아직 못 고쳤어요.", score: 1, feedback: "노력하는 부분을 강조하면 좋습니다.", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "좋습니다. 솔직하고 명확한 답변이었습니다." }
  ]
},
{
  title: "경력 전환 면접 (Career Change Interview)",
  description: "Intermediate-level Korean scenario focusing on explaining career transition reasons.",
  category: "interview",
  language: "korean",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "왜 이직을 결심하셨나요?",
      options: [
        { text: "새로운 분야에 도전하고 싶어서요.", score: 5, feedback: "좋은 동기입니다!", nextStep: 2 },
        { text: "전 직장이 마음에 안 들어서요.", score: 2, feedback: "조금 더 긍정적인 이유로 표현해보세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "이전 직장에서 배운 점을 어떻게 활용할 수 있나요?",
      options: [
        { text: "고객 응대 경험을 활용할 수 있습니다.", score: 5, feedback: "좋아요! 구체적이에요.", nextStep: 3 },
        { text: "글쎄요.", score: 1, feedback: "조금 더 구체적인 예를 들어보세요.", nextStep: 3 }
      ]
    },
    { id: 3, speaker: "assistant", script: "좋아요. 명확한 커리어 비전이 느껴집니다." }
  ]
},

/* ------------------------- KOREAN - ADVANCED ------------------------- */
{
  title: "관리직 면접 시나리오 (Manager Interview Scenario)",
  description: "Advanced Korean interview scenario for leadership and decision-making discussion.",
  category: "interview",
  language: "korean",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "리더로서 가장 중요하다고 생각하는 것은 무엇인가요?",
      options: [
        { text: "팀의 신뢰를 얻는 것입니다.", score: 5, feedback: "아주 좋은 리더십 대답이에요.", nextStep: 2 },
        { text: "결과를 내는 것입니다.", score: 3, feedback: "성과도 중요하지만 사람도 중요합니다.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "팀원이 실수했을 때 어떻게 대응하나요?",
      options: [
        { text: "이유를 함께 분석하고 해결책을 찾습니다.", score: 5, feedback: "협력적인 자세로 좋습니다.", nextStep: 3 },
        { text: "바로 지적합니다.", score: 2, feedback: "조금 부드럽게 표현하는 게 좋겠어요.", nextStep: 3 }
      ]
    },
    { id: 3, speaker: "assistant", script: "좋습니다. 리더로서의 태도가 잘 드러납니다." }
  ]
},
{
  title: "프레젠테이션 면접 (Presentation Interview)",
  description: "Advanced Korean interview scenario for presenting structured ideas clearly under pressure.",
  category: "interview",
  language: "korean",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "5분간 자기소개 및 강점을 설명해주세요.",
      options: [
        { text: "저는 데이터를 기반으로 문제를 해결하는 능력이 있습니다.", score: 5, feedback: "좋아요! 논리적이고 명확해요.", nextStep: 2 },
        { text: "잘 모르겠어요.", score: 1, feedback: "조금 더 준비해보세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "최근 산업 트렌드에 대해 어떻게 생각하시나요?",
      options: [
        { text: "AI와 자동화가 핵심이라고 생각합니다.", score: 5, feedback: "좋은 통찰력이에요.", nextStep: 3 },
        { text: "생각해본 적 없어요.", score: 1, feedback: "산업 동향을 조금 공부해보세요.", nextStep: 3 }
      ]
    },
    { id: 3, speaker: "assistant", script: "좋은 발표였습니다. 감사합니다." }
  ]
},
/* ------------------------- JAPANESE - BEGINNER ------------------------- */
{
  title: "会社の初日 (First Day at the Office)",
  description: "A beginner-level Japanese workplace scenario about greetings and introductions on the first day of work.",
  category: "workplace",
  language: "japanese",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "上司: 今日からよろしくお願いします。最初の出勤、緊張していますか？",
      options: [
        { text: "はい、少し緊張していますが、頑張ります！", score: 5, feedback: "とても良い意気込みです。丁寧で前向きです。", nextStep: 2 },
        { text: "はい。", score: 2, feedback: "少し短いですね。もう少し丁寧に答えましょう。", nextStep: 2 },
        { text: "あまり緊張していません。", score: 3, feedback: "悪くはありませんが、謙虚な姿勢も大切です。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "他の社員に自己紹介をしてみましょう。",
      options: [
        { text: "はじめまして、田中と申します。本日からお世話になります。よろしくお願いします。", score: 5, feedback: "完璧な自己紹介です！敬語が自然です。", nextStep: 3 },
        { text: "田中です。よろしく。", score: 2, feedback: "少しカジュアルすぎます。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "同僚: 趣味は何ですか？",
      options: [
        { text: "映画を見ることです。週末によく見ます。", score: 5, feedback: "自然で良い話題です。", nextStep: 4 },
        { text: "特にありません。", score: 2, feedback: "少しそっけない印象になります。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "上司: 明日からの勤務時間を確認しておきましょうか。",
      options: [
        { text: "はい、9時から18時までですね。確認ありがとうございます。", score: 5, feedback: "丁寧で確認意識が高いです。", nextStep: 5 },
        { text: "はい、わかります。", score: 3, feedback: "もう少し自然な敬語を使うと良いです。", nextStep: 5 }
      ]
    },
    {
      id: 5,
      speaker: "assistant",
      script: "上司: では、今日はオリエンテーションを行います。頑張ってくださいね。",
      options: [
        { text: "はい、よろしくお願いします！", score: 5, feedback: "元気で素晴らしい返答です。", nextStep: 6 },
        { text: "わかりました。", score: 3, feedback: "悪くないですが、もう少し気持ちを込めて答えると良いです。", nextStep: 6 }
      ]
    },
    { id: 6, speaker: "assistant", script: "素晴らしい第一日目です！良い印象を与えました。" }
  ]
},
{
  title: "オフィスの基本マナー (Office Etiquette Basics)",
  description: "A Japanese workplace scenario for beginners to learn about polite behavior and communication in the office.",
  category: "workplace",
  language: "japanese",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "上司: 朝出社したら最初に何をしますか？",
      options: [
        { text: "おはようございますと挨拶します。", score: 5, feedback: "素晴らしい答えです。職場の基本です！", nextStep: 2 },
        { text: "机に座ります。", score: 2, feedback: "挨拶を忘れずにしましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "同僚がコピー機を使っています。急いでいる時、どうしますか？",
      options: [
        { text: "すみません、急いでいるのですが、先に使ってもいいですか？", score: 5, feedback: "とても丁寧な言い方です！", nextStep: 3 },
        { text: "早くしてください。", score: 1, feedback: "少し失礼に聞こえます。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "仕事でミスをしてしまいました。どうしますか？",
      options: [
        { text: "すぐに上司に報告して謝ります。", score: 5, feedback: "誠実な対応です！", nextStep: 4 },
        { text: "誰にも言いません。", score: 1, feedback: "正直に伝えることが大切です。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "上司: 明日の会議資料をお願いします。",
      options: [
        { text: "はい、今日中に準備します。", score: 5, feedback: "良い返答です。責任感があります。", nextStep: 5 },
        { text: "後でします。", score: 2, feedback: "期限を明確に伝えると良いです。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "良い仕事の姿勢です。基本マナーをしっかり守れています！" }
  ]
},

/* ------------------------- KOREAN - BEGINNER ------------------------- */
{
  title: "회사 첫날 인사 (First Day Greeting at Work)",
  description: "Beginner-level Korean workplace scenario for greetings and self-introductions on the first day.",
  category: "workplace",
  language: "korean",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "팀장: 오늘부터 함께 일하게 되어 반갑습니다. 기분이 어떠세요?",
      options: [
        { text: "조금 긴장되지만 열심히 하겠습니다!", score: 5, feedback: "좋아요! 자신감 있고 예의 바른 표현이에요.", nextStep: 2 },
        { text: "그냥 그래요.", score: 2, feedback: "조금 더 밝게 대답해보세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "팀원들에게 자기소개를 해보세요.",
      options: [
        { text: "안녕하세요. 저는 신입사원 이지은입니다. 잘 부탁드립니다!", score: 5, feedback: "완벽해요! 자연스럽고 공손해요.", nextStep: 3 },
        { text: "안녕. 이지은이야.", score: 1, feedback: "직장에서는 반말을 피하는 게 좋아요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "동료가 취미를 물어봅니다. ‘취미가 뭐예요?’",
      options: [
        { text: "독서와 요리를 좋아해요.", score: 5, feedback: "좋아요! 자연스럽고 대화가 이어집니다.", nextStep: 4 },
        { text: "없어요.", score: 2, feedback: "조금 단답형이에요. 간단히라도 대답해보세요.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "팀장: 내일부터는 오전 9시까지 출근입니다. 괜찮을까요?",
      options: [
        { text: "네, 문제 없습니다!", score: 5, feedback: "좋아요! 적극적인 태도예요.", nextStep: 5 },
        { text: "조금 힘들 것 같아요.", score: 2, feedback: "부정적인 인상일 수 있습니다.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "좋아요! 첫날부터 좋은 인상을 주었습니다." }
  ]
},
{
  title: "사무실 기본 예절 (Office Etiquette Basics)",
  description: "Beginner Korean workplace scenario teaching basic etiquette and manners at the office.",
  category: "workplace",
  language: "korean",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "출근 후 제일 먼저 무엇을 하나요?",
      options: [
        { text: "동료들에게 인사합니다.", score: 5, feedback: "좋아요! 기본이 잘 되어 있습니다.", nextStep: 2 },
        { text: "컴퓨터를 켭니다.", score: 2, feedback: "먼저 인사하는 것이 좋아요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "프린터를 동료가 사용 중입니다. 급한 상황이에요. 어떻게 말하나요?",
      options: [
        { text: "죄송하지만 제가 급해서 먼저 사용해도 될까요?", score: 5, feedback: "정중하고 예의 바른 표현이에요.", nextStep: 3 },
        { text: "빨리 끝내세요.", score: 1, feedback: "조금 무례하게 들릴 수 있어요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "실수를 했습니다. 어떻게 하나요?",
      options: [
        { text: "즉시 보고하고 사과합니다.", score: 5, feedback: "좋아요! 책임감이 느껴져요.", nextStep: 4 },
        { text: "그냥 넘어갑니다.", score: 1, feedback: "책임 있는 태도가 중요합니다.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "상사가 내일까지 보고서를 부탁했습니다. 어떻게 대답하나요?",
      options: [
        { text: "네, 오늘 중으로 완료하겠습니다.", score: 5, feedback: "적극적이고 신뢰감이 있습니다.", nextStep: 5 },
        { text: "내일 할게요.", score: 2, feedback: "조금 더 명확한 계획을 말하면 좋아요.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "아주 좋아요. 직장 예절이 잘 되어 있습니다!" }
  ]
},
/* ------------------------- JAPANESE - INTERMEDIATE ------------------------- */
{
  title: "上司への報告と相談 (Reporting and Consulting with a Supervisor)",
  description: "An intermediate Japanese workplace scenario about reporting problems and consulting supervisors effectively.",
  category: "workplace",
  language: "japanese",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "上司: プロジェクトの進捗はどうなっていますか？",
      options: [
        { text: "予定より少し遅れていますが、原因を調べています。", score: 5, feedback: "誠実で前向きな報告ですね。", nextStep: 2 },
        { text: "遅れています。", score: 2, feedback: "理由や対策も伝えると良いです。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "上司: 問題の原因は何ですか？",
      options: [
        { text: "担当者が不足しているため、進行が遅れています。", score: 4, feedback: "状況を正確に伝えていますね。", nextStep: 3 },
        { text: "よくわかりません。", score: 2, feedback: "分析力を見せるチャンスです。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "上司: どう対策しますか？",
      options: [
        { text: "優先順位を見直して、今週中に調整します。", score: 5, feedback: "解決志向の良い回答です。", nextStep: 4 },
        { text: "何もしません。", score: 1, feedback: "改善の姿勢が必要です。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "上司: ほかにサポートが必要ですか？",
      options: [
        { text: "はい、他部署の協力をお願いしたいです。", score: 5, feedback: "具体的で良い依頼です。", nextStep: 5 },
        { text: "いえ、大丈夫です。", score: 3, feedback: "慎ましいですが、時には助けを求めるのも大切です。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "良い報告・相談でした。信頼できる印象を与えました。" }
  ]
},
{
  title: "会議での意見交換 (Sharing Opinions in a Meeting)",
  description: "Intermediate Japanese workplace scenario for expressing opinions and responding to colleagues in meetings.",
  category: "workplace",
  language: "japanese",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "上司: 新しい企画案についてどう思いますか？",
      options: [
        { text: "良いと思いますが、コスト面が少し心配です。", score: 5, feedback: "具体的な意見で良いですね。", nextStep: 2 },
        { text: "いいです。", score: 2, feedback: "もう少し理由を述べると良いです。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "同僚: 私はこの案に賛成です。あなたは？",
      options: [
        { text: "同感です。実現性も高いと思います。", score: 5, feedback: "協調性が見えます。", nextStep: 3 },
        { text: "別に。", score: 1, feedback: "もう少し柔らかく答えましょう。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "議長: 異なる意見が出ました。どうまとめますか？",
      options: [
        { text: "それぞれの意見をまとめて、次回の会議で決定しましょう。", score: 5, feedback: "冷静で建設的な進行ですね。", nextStep: 4 },
        { text: "今決めましょう。", score: 3, feedback: "少し急ぎすぎです。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "上司: 今日は良い意見をありがとうございました。",
      options: [
        { text: "ありがとうございます。今後も提案していきます。", score: 5, feedback: "積極的で良い締めですね。", nextStep: 5 },
        { text: "いえいえ。", score: 3, feedback: "もう少し積極的に答えると良いです。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "良い発言でした。チームプレーヤーとして信頼されました！" }
  ]
},

/* ------------------------- KOREAN - INTERMEDIATE ------------------------- */
{
  title: "상사에게 보고하고 상담하기 (Reporting and Consulting with a Manager)",
  description: "An intermediate Korean workplace scenario for learning to report problems and seek advice effectively.",
  category: "workplace",
  language: "korean",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "팀장: 프로젝트 진행 상황은 어떤가요?",
      options: [
        { text: "조금 늦어지고 있지만 원인을 파악 중입니다.", score: 5, feedback: "좋아요. 성실한 보고예요.", nextStep: 2 },
        { text: "늦었어요.", score: 2, feedback: "이유와 대책을 함께 말하면 좋습니다.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "팀장: 원인이 뭐예요?",
      options: [
        { text: "인력이 부족해서 일정이 밀리고 있습니다.", score: 4, feedback: "정확한 분석이에요.", nextStep: 3 },
        { text: "잘 모르겠어요.", score: 1, feedback: "조금 더 분석해보세요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "팀장: 앞으로 어떻게 할 계획인가요?",
      options: [
        { text: "우선순위를 조정해서 이번 주 안에 조치하겠습니다.", score: 5, feedback: "좋아요! 해결 중심적이에요.", nextStep: 4 },
        { text: "모르겠어요.", score: 1, feedback: "대안을 제시하면 좋습니다.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "팀장: 도움이 필요하면 언제든 말하세요.",
      options: [
        { text: "네, 감사합니다. 필요하면 바로 말씀드리겠습니다.", score: 5, feedback: "예의 바르고 성실한 태도예요.", nextStep: 5 },
        { text: "괜찮아요.", score: 3, feedback: "도움을 요청하는 것도 능력입니다.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "좋아요. 보고와 상담이 매우 잘 이루어졌습니다." }
  ]
},
{
  title: "회의에서 의견 나누기 (Sharing Opinions in a Meeting)",
  description: "Intermediate Korean workplace scenario for expressing opinions and handling disagreements politely.",
  category: "workplace",
  language: "korean",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "팀장: 이번 기획안에 대해 어떻게 생각하세요?",
      options: [
        { text: "좋은 아이디어라고 생각하지만 비용이 걱정됩니다.", score: 5, feedback: "좋아요! 구체적인 의견이에요.", nextStep: 2 },
        { text: "괜찮아요.", score: 3, feedback: "조금 더 자세히 설명해보세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "동료가 반대 의견을 냈습니다. 어떻게 대답하시겠어요?",
      options: [
        { text: "좋은 의견이에요. 그렇게 볼 수도 있겠네요.", score: 5, feedback: "성숙하고 협조적인 태도예요.", nextStep: 3 },
        { text: "아니요, 그건 틀렸어요.", score: 1, feedback: "좀 더 부드럽게 표현해보세요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "팀장: 의견이 다를 때 어떻게 조율하면 좋을까요?",
      options: [
        { text: "각자의 의견을 정리해서 다음 회의에서 결정하면 좋겠습니다.", score: 5, feedback: "좋아요! 실무적인 조율이에요.", nextStep: 4 },
        { text: "그냥 제 의견대로 하죠.", score: 1, feedback: "협업 자세가 필요합니다.", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "좋아요. 회의 참여 태도가 훌륭합니다." }
  ]
},
/* ------------------------- JAPANESE - ADVANCED ------------------------- */
{
  title: "チームリーダーとしての対応 (Handling Team Issues as a Leader)",
  description: "An advanced Japanese workplace scenario focusing on leadership and conflict resolution among team members.",
  category: "workplace",
  language: "japanese",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "部下二人の間で意見の対立が起きています。リーダーとしてどうしますか？",
      options: [
        { text: "まず両方の話を冷静に聞きます。", score: 5, feedback: "素晴らしい対応です。公平で冷静です。", nextStep: 2 },
        { text: "どちらかをすぐに注意します。", score: 2, feedback: "状況をよく理解してから判断しましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "部下A: 『彼は私の意見を全く聞いてくれません！』と言っています。どう答えますか？",
      options: [
        { text: "まず落ち着いてください。お互いの意見を整理しましょう。", score: 5, feedback: "冷静な仲裁で良い印象です。", nextStep: 3 },
        { text: "すぐに謝りなさい、と言います。", score: 2, feedback: "少し強引な印象です。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "話し合いの後、チームの雰囲気が悪くなりました。どう改善しますか？",
      options: [
        { text: "次のミーティングでチーム全体に協力を促します。", score: 5, feedback: "良い判断です。リーダーシップが見えます。", nextStep: 4 },
        { text: "何もしません。", score: 1, feedback: "チーム全体へのフォローが大切です。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "上司: チームの状況をどう報告しますか？",
      options: [
        { text: "対立はありましたが、改善に向けて進めています。", score: 5, feedback: "前向きで誠実な報告です。", nextStep: 5 },
        { text: "問題ありません、とだけ言います。", score: 2, feedback: "状況を隠すのは良くありません。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "よくできました。チームをまとめる姿勢が立派です。" }
  ]
},
{
  title: "交渉と説得の場面 (Business Negotiation and Persuasion)",
  description: "An advanced Japanese workplace scenario focusing on polite persuasion during business negotiations.",
  category: "workplace",
  language: "japanese",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "取引先が価格の引き下げを求めています。どう対応しますか？",
      options: [
        { text: "品質維持のために現在の価格が妥当だと説明します。", score: 5, feedback: "とても論理的で良い対応です。", nextStep: 2 },
        { text: "すぐに値下げを承諾します。", score: 2, feedback: "少し急ぎすぎです。交渉の余地を残しましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "相手が強く主張しています。どう説得しますか？",
      options: [
        { text: "長期的な関係を重視し、双方にメリットがある提案をします。", score: 5, feedback: "非常にプロフェッショナルな回答です。", nextStep: 3 },
        { text: "自分の意見を押し通します。", score: 1, feedback: "柔軟な対応も大切です。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "最終的に妥協点を見つけました。どう締めくくりますか？",
      options: [
        { text: "本日の話し合いで良い方向が見えました。ありがとうございます。", score: 5, feedback: "礼儀正しく締めくくれています。", nextStep: 4 },
        { text: "終わりましょう。", score: 1, feedback: "少し不親切な印象になります。", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "素晴らしい交渉力です。信頼されるビジネスパートナーになれます。" }
  ]
},

/* ------------------------- KOREAN - ADVANCED ------------------------- */
{
  title: "팀 리더의 갈등 관리 (Managing Team Conflict as a Leader)",
  description: "An advanced Korean workplace scenario focusing on resolving conflicts between team members as a manager.",
  category: "workplace",
  language: "korean",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "팀원 두 명이 의견 충돌을 했습니다. 리더로서 어떻게 하시겠어요?",
      options: [
        { text: "양쪽의 이야기를 먼저 차분히 듣습니다.", score: 5, feedback: "좋아요. 공정하고 냉정한 접근이에요.", nextStep: 2 },
        { text: "한쪽을 먼저 혼냅니다.", score: 1, feedback: "상황을 판단하기 전에 중립을 유지하세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "팀원이 화를 내며 말합니다. ‘그 사람은 제 의견을 무시했어요!’ 어떻게 대답하시겠어요?",
      options: [
        { text: "일단 진정하고 서로의 입장을 정리해봅시다.", score: 5, feedback: "좋아요. 갈등 조정이 훌륭합니다.", nextStep: 3 },
        { text: "지금 사과하세요.", score: 2, feedback: "조금 강압적으로 들립니다.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "회의 후 팀 분위기가 나빠졌습니다. 어떻게 하시겠어요?",
      options: [
        { text: "팀 미팅을 열고 서로의 노력을 인정하는 시간을 갖습니다.", score: 5, feedback: "아주 좋은 리더십이에요.", nextStep: 4 },
        { text: "그냥 넘어갑니다.", score: 1, feedback: "갈등을 방치하면 악화될 수 있습니다.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "상사가 현재 상황을 물어봅니다. 어떻게 보고하시겠어요?",
      options: [
        { text: "갈등이 있었지만 해결 방향으로 잘 나아가고 있습니다.", score: 5, feedback: "좋아요. 솔직하면서 긍정적이에요.", nextStep: 5 },
        { text: "문제 없습니다.", score: 2, feedback: "상황을 정확히 보고하는 것이 신뢰를 줍니다.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "좋아요. 팀 리더로서 훌륭한 태도를 보였습니다." }
  ]
},
{
  title: "비즈니스 협상과 설득 (Negotiation and Persuasion Skills)",
  description: "Advanced Korean workplace scenario about negotiating and persuading partners respectfully.",
  category: "workplace",
  language: "korean",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "거래처가 가격을 낮춰 달라고 요청합니다. 어떻게 하시겠어요?",
      options: [
        { text: "품질을 유지하려면 현재 가격이 적정하다고 설명합니다.", score: 5, feedback: "논리적이고 설득력 있는 답변이에요.", nextStep: 2 },
        { text: "바로 가격을 낮춰드립니다.", score: 2, feedback: "조금 급하게 양보했어요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "상대가 계속 압박합니다. 어떻게 설득하시겠어요?",
      options: [
        { text: "장기적인 신뢰 관계를 위해 서로 이익이 되는 방안을 제안합니다.", score: 5, feedback: "아주 훌륭한 협상 자세예요.", nextStep: 3 },
        { text: "우리 조건을 그대로 따르세요.", score: 1, feedback: "단호하지만 유연성이 부족합니다.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "합의가 이루어졌습니다. 어떻게 마무리하시겠어요?",
      options: [
        { text: "오늘 회의에서 좋은 방향을 찾게 되어 감사합니다.", score: 5, feedback: "예의 바르고 프로다운 마무리예요.", nextStep: 4 },
        { text: "이제 끝났네요.", score: 2, feedback: "조금 건조한 표현이에요.", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "좋아요. 뛰어난 협상 능력을 보였습니다!" }
  ]
},
/* ------------------------- JAPANESE - BEGINNER ------------------------- */
{
  title: "レストランでの注文 (Ordering Food at a Restaurant)",
  description: "A beginner-level Japanese daily scenario where you practice ordering food and interacting with restaurant staff.",
  category: "daily",
  language: "japanese",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "店員: いらっしゃいませ。何名様ですか？",
      options: [
        { text: "一人です。", score: 5, feedback: "正しい答えです。シンプルで自然です。", nextStep: 2 },
        { text: "一個です。", score: 1, feedback: "人数を表すときは「人（にん）」を使いましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "店員: ご注文はお決まりですか？",
      options: [
        { text: "はい、このラーメンをお願いします。", score: 5, feedback: "完璧です！自然で丁寧な注文です。", nextStep: 3 },
        { text: "ラーメン。", score: 2, feedback: "もう少し丁寧に言うと良いです。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "店員: 飲み物はいかがですか？",
      options: [
        { text: "お水をお願いします。", score: 5, feedback: "丁寧で良いですね。", nextStep: 4 },
        { text: "いらない。", score: 1, feedback: "少し失礼に聞こえます。「けっこうです」などが自然です。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "食事が終わりました。店員が『ごちそうさまでした』と言いました。どう答えますか？",
      options: [
        { text: "ごちそうさまでした。美味しかったです。", score: 5, feedback: "完璧な返答です！", nextStep: 5 },
        { text: "うん。", score: 1, feedback: "カジュアルすぎます。丁寧に答えましょう。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "素晴らしい！自然なレストラン会話ができました。" }
  ]
},
{
  title: "買い物での会話 (Shopping at a Store)",
  description: "A beginner Japanese scenario practicing common phrases used when shopping.",
  category: "daily",
  language: "japanese",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "店員: いらっしゃいませ。何をお探しですか？",
      options: [
        { text: "シャツを探しています。", score: 5, feedback: "自然で良い答えです！", nextStep: 2 },
        { text: "買いたい。", score: 2, feedback: "文を丁寧にすると良いです。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "店員: サイズはお決まりですか？",
      options: [
        { text: "Mサイズをお願いします。", score: 5, feedback: "丁寧でスムーズです。", nextStep: 3 },
        { text: "M。", score: 2, feedback: "少しカジュアルです。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "店員: 試着されますか？",
      options: [
        { text: "はい、お願いします。", score: 5, feedback: "とても良い表現です。", nextStep: 4 },
        { text: "いい。", score: 1, feedback: "少しぶっきらぼうに聞こえます。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "店員: お会計は1,800円です。どうしますか？",
      options: [
        { text: "カードでお願いします。", score: 5, feedback: "自然で丁寧です！", nextStep: 5 },
        { text: "現金。", score: 3, feedback: "通じますが、丁寧に言うとより良いです。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "買い物上手ですね！接客での日本語が自然です。" }
  ]
},

/* ------------------------- KOREAN - BEGINNER ------------------------- */
{
  title: "식당에서 주문하기 (Ordering Food at a Restaurant)",
  description: "A beginner Korean daily conversation scenario to practice ordering food politely.",
  category: "daily",
  language: "korean",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "직원: 어서 오세요. 몇 분이세요?",
      options: [
        { text: "한 명이에요.", score: 5, feedback: "좋아요. 정확한 표현이에요.", nextStep: 2 },
        { text: "하나요.", score: 2, feedback: "‘명’ 단위를 써야 자연스럽습니다.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "직원: 주문하시겠어요?",
      options: [
        { text: "네, 비빔밥 하나 주세요.", score: 5, feedback: "자연스럽고 예의 있어요!", nextStep: 3 },
        { text: "비빔밥.", score: 2, feedback: "조금 더 정중하게 말해보세요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "직원: 음료는 뭐로 하시겠어요?",
      options: [
        { text: "물 주세요.", score: 5, feedback: "좋아요. 간단하고 자연스러워요.", nextStep: 4 },
        { text: "안 마셔요.", score: 3, feedback: "괜찮지만 ‘괜찮아요’가 더 자연스러워요.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "식사가 끝났습니다. 직원이 ‘맛있게 드셨어요?’라고 묻습니다.",
      options: [
        { text: "네, 정말 맛있었어요!", score: 5, feedback: "밝고 예의 바른 대답이에요.", nextStep: 5 },
        { text: "그냥 그래요.", score: 2, feedback: "조금 무뚝뚝하게 들릴 수 있습니다.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "좋아요! 자연스러운 식당 대화였어요." }
  ]
},
{
  title: "가게에서 쇼핑하기 (Shopping at a Store)",
  description: "A beginner Korean daily scenario for practicing store conversations politely.",
  category: "daily",
  language: "korean",
  difficulty: "beginner",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "직원: 어서 오세요. 무엇을 찾으세요?",
      options: [
        { text: "셔츠를 찾고 있어요.", score: 5, feedback: "좋아요. 완벽한 표현이에요.", nextStep: 2 },
        { text: "그냥 봐요.", score: 2, feedback: "괜찮지만 약간 무뚝뚝해요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "직원: 사이즈는 어떤 걸로 드릴까요?",
      options: [
        { text: "M 사이즈 주세요.", score: 5, feedback: "아주 자연스러워요!", nextStep: 3 },
        { text: "그냥 아무거나요.", score: 2, feedback: "조금 더 구체적으로 말해보세요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "직원: 입어 보시겠어요?",
      options: [
        { text: "네, 입어 볼게요.", score: 5, feedback: "좋아요. 자연스러운 말이에요.", nextStep: 4 },
        { text: "괜찮아요.", score: 3, feedback: "문맥상 가능하지만 약간 단답이에요.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "직원: 총 금액은 3만 원입니다. 결제는 어떻게 하시겠어요?",
      options: [
        { text: "카드로 할게요.", score: 5, feedback: "좋아요! 완벽한 표현이에요.", nextStep: 5 },
        { text: "현금.", score: 2, feedback: "조금 더 완전한 문장을 써보세요.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "좋아요! 쇼핑 대화가 아주 자연스럽습니다." }
  ]
},
/* ------------------------- JAPANESE - INTERMEDIATE ------------------------- */
{
  title: "電車でのトラブル (Trouble on the Train)",
  description: "An intermediate Japanese daily scenario about handling a transportation issue and asking for help.",
  category: "daily",
  language: "japanese",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "電車が止まってしまいました。放送で『安全確認のため停車します』と聞こえました。どうしますか？",
      options: [
        { text: "落ち着いて放送を待ちます。", score: 5, feedback: "冷静な対応です。", nextStep: 2 },
        { text: "すぐ降ります。", score: 2, feedback: "まだ案内が出ていないので危険です。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "駅員: お急ぎですか？どちらまで行かれますか？",
      options: [
        { text: "新宿まで行きたいのですが、他の方法はありますか？", score: 5, feedback: "とても丁寧な聞き方です。", nextStep: 3 },
        { text: "新宿。", score: 2, feedback: "もう少し丁寧に言いましょう。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "駅員: バスに乗り換えができます。ありがとうございます、と言いたいとき？",
      options: [
        { text: "ありがとうございます。助かりました。", score: 5, feedback: "良いお礼の言葉です！", nextStep: 4 },
        { text: "OKです。", score: 1, feedback: "少しカジュアルすぎます。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "バスに乗りました。隣の人が席を譲ってくれました。どう返しますか？",
      options: [
        { text: "ありがとうございます。", score: 5, feedback: "自然で丁寧な返答です。", nextStep: 5 },
        { text: "いいです。", score: 2, feedback: "意図が誤解されることがあります。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "素晴らしい対応でした。日本の公共マナーがよく身についています！" }
  ]
},
{
  title: "病院での会話 (Visiting a Clinic)",
  description: "An intermediate Japanese daily scenario for explaining symptoms and communicating with a doctor.",
  category: "daily",
  language: "japanese",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "受付: どうされましたか？",
      options: [
        { text: "頭が痛くて熱があります。", score: 5, feedback: "完璧な説明です。", nextStep: 2 },
        { text: "具合が悪い。", score: 3, feedback: "悪くはないですが、もう少し具体的に言いましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "医者: いつから痛いですか？",
      options: [
        { text: "昨日からです。", score: 5, feedback: "短くて自然な答えです。", nextStep: 3 },
        { text: "分かりません。", score: 2, feedback: "なるべく期間を伝えましょう。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "医者: 薬にアレルギーはありますか？",
      options: [
        { text: "いいえ、ありません。", score: 5, feedback: "良い答えです。", nextStep: 4 },
        { text: "たぶん。", score: 2, feedback: "あいまいすぎます。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "医者: では薬を出します。お大事に。",
      options: [
        { text: "ありがとうございます。", score: 5, feedback: "礼儀正しいですね。", nextStep: 5 },
        { text: "はい。", score: 3, feedback: "悪くありませんが、感謝を伝えるとより良いです。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "診察の流れをしっかり理解できましたね！" }
  ]
},

/* ------------------------- KOREAN - INTERMEDIATE ------------------------- */
{
  title: "지하철에서 길 묻기 (Asking Directions on the Subway)",
  description: "An intermediate Korean daily scenario practicing asking for and understanding directions in public transportation.",
  category: "daily",
  language: "korean",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "지하철역에서 길을 잃었습니다. 역무원에게 묻습니다. ‘서울역에 가려면 어떻게 가야 해요?’",
      options: [
        { text: "1호선을 타면 돼요?", score: 5, feedback: "좋아요! 자연스러운 질문이에요.", nextStep: 2 },
        { text: "서울역?", score: 1, feedback: "조금 더 완전한 문장이 좋아요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "역무원: 네, 1호선 타시고 두 정거장 뒤에 내리세요. 어떻게 대답하시겠어요?",
      options: [
        { text: "감사합니다!", score: 5, feedback: "밝고 예의 바른 표현이에요.", nextStep: 3 },
        { text: "알았어요.", score: 2, feedback: "조금 캐주얼합니다. ‘감사합니다’가 더 적절해요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "지하철 안에서 노인을 봤습니다. 자리를 양보하시겠어요?",
      options: [
        { text: "네, 여기 앉으세요.", score: 5, feedback: "아주 훌륭한 매너예요.", nextStep: 4 },
        { text: "모른 척합니다.", score: 1, feedback: "비매너로 보일 수 있습니다.", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "좋아요. 한국의 대중교통 예절이 잘 되어 있네요!" }
  ]
},
{
  title: "병원에서 의사와 대화하기 (Talking to a Doctor)",
  description: "An intermediate Korean daily scenario for describing symptoms and following doctor’s advice.",
  category: "daily",
  language: "korean",
  difficulty: "intermediate",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "의사: 어디가 아프세요?",
      options: [
        { text: "머리가 아프고 열이 있어요.", score: 5, feedback: "좋아요. 정확한 표현이에요.", nextStep: 2 },
        { text: "그냥 아파요.", score: 2, feedback: "조금 더 구체적으로 말해보세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "의사: 언제부터 그랬어요?",
      options: [
        { text: "어제부터요.", score: 5, feedback: "좋아요. 자연스러워요.", nextStep: 3 },
        { text: "기억 안 나요.", score: 2, feedback: "가능한 한 기간을 말해주세요.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "의사: 약에 알레르기 있나요?",
      options: [
        { text: "없어요.", score: 5, feedback: "좋아요. 간단하고 정확해요.", nextStep: 4 },
        { text: "잘 모르겠어요.", score: 3, feedback: "괜찮지만 확실히 하면 더 좋아요.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "의사: 약 드시고 푹 쉬세요.",
      options: [
        { text: "네, 감사합니다.", score: 5, feedback: "좋아요. 완벽한 마무리예요.", nextStep: 5 },
        { text: "알겠어요.", score: 3, feedback: "괜찮지만 ‘감사합니다’가 더 자연스러워요.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "좋아요. 의사와의 대화가 아주 자연스럽습니다." }
  ]
},
/* ------------------------- JAPANESE - ADVANCED ------------------------- */
{
  title: "ホテルでのトラブル対応 (Handling a Hotel Problem)",
  description: "An advanced Japanese daily scenario for resolving issues politely in a hotel setting.",
  category: "daily",
  language: "japanese",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "ホテルの部屋に入ると、エアコンが壊れています。フロントに電話します。最初の一言は？",
      options: [
        { text: "すみません、エアコンが動かないのですが。", score: 5, feedback: "とても丁寧で正確な言い方です。", nextStep: 2 },
        { text: "エアコン壊れた。", score: 1, feedback: "丁寧な言葉を使いましょう。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "フロント: ご不便をおかけして申し訳ありません。修理の者を送ります。どう返しますか？",
      options: [
        { text: "ありがとうございます。よろしくお願いします。", score: 5, feedback: "完璧です。礼儀正しく安心感があります。", nextStep: 3 },
        { text: "はい、早くして。", score: 2, feedback: "少し強い言い方です。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "修理後、スタッフが『ご不便おかけしました』と言いました。どう答えますか？",
      options: [
        { text: "いえ、大丈夫です。ありがとうございました。", score: 5, feedback: "自然で非常に良い返答です。", nextStep: 4 },
        { text: "はい。", score: 2, feedback: "少し冷たく感じられる可能性があります。", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "チェックアウトのとき、また同じスタッフに会いました。どう声をかけますか？",
      options: [
        { text: "昨日はありがとうございました。助かりました。", score: 5, feedback: "とても印象の良い一言です。", nextStep: 5 },
        { text: "お疲れ。", score: 1, feedback: "少しカジュアルすぎます。", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "素晴らしい対応でした。丁寧で日本らしいコミュニケーションができています。" }
  ]
},
{
  title: "文化の違いを話す (Discussing Cultural Differences)",
  description: "An advanced Japanese daily scenario for expressing opinions respectfully in a cultural discussion.",
  category: "daily",
  language: "japanese",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "外国人の同僚に『日本ではなぜ残業が多いの？』と聞かれました。どう答えますか？",
      options: [
        { text: "仕事への責任感が強い文化だからです。", score: 5, feedback: "的確で客観的な答えです。", nextStep: 2 },
        { text: "そういうものです。", score: 2, feedback: "少し説明が足りません。", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "同僚: 『それは大変じゃない？』と聞かれました。",
      options: [
        { text: "はい、でもチームワークを大切にしています。", score: 5, feedback: "前向きで良いバランスの回答です。", nextStep: 3 },
        { text: "そうですね、でも仕方ないです。", score: 3, feedback: "少し受け身に聞こえます。", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "最後に、あなたの考えを伝えるとしたら？",
      options: [
        { text: "お互いの文化を理解し合うことが大切だと思います。", score: 5, feedback: "完璧なまとめです！", nextStep: 4 },
        { text: "日本が一番です。", score: 1, feedback: "少し偏った印象になります。", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "素晴らしい！文化的な対話をとても上手に進められました。" }
  ]
},

/* ------------------------- KOREAN - ADVANCED ------------------------- */
{
  title: "호텔 문제 해결하기 (Resolving a Hotel Problem)",
  description: "An advanced Korean daily scenario focusing on polite complaint handling in a hotel situation.",
  category: "daily",
  language: "korean",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "방의 에어컨이 고장났습니다. 프런트에 전화합니다. 첫 마디는?",
      options: [
        { text: "죄송하지만 에어컨이 작동하지 않습니다.", score: 5, feedback: "좋아요! 공손하고 명확한 표현이에요.", nextStep: 2 },
        { text: "에어컨 고장났어요.", score: 2, feedback: "조금 더 정중하게 표현하면 좋습니다.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "직원: 불편을 드려 죄송합니다. 바로 확인하겠습니다. 어떻게 대답하시겠어요?",
      options: [
        { text: "감사합니다. 기다리겠습니다.", score: 5, feedback: "좋아요. 예의 바른 답변이에요.", nextStep: 3 },
        { text: "빨리 와주세요.", score: 2, feedback: "조금 급하게 들릴 수 있습니다.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "직원이 고쳐주고 ‘불편을 드려 죄송합니다’라고 말합니다.",
      options: [
        { text: "괜찮아요. 감사합니다.", score: 5, feedback: "좋아요. 자연스럽고 따뜻한 표현이에요.", nextStep: 4 },
        { text: "네.", score: 3, feedback: "가능하지만 조금 건조해요.", nextStep: 4 }
      ]
    },
    {
      id: 4,
      speaker: "assistant",
      script: "체크아웃할 때 같은 직원을 만났습니다. 인사하시겠어요?",
      options: [
        { text: "어제 도움 주셔서 감사합니다.", score: 5, feedback: "완벽한 예의 바른 인사예요.", nextStep: 5 },
        { text: "수고하세요.", score: 3, feedback: "괜찮지만 조금 간단합니다.", nextStep: 5 }
      ]
    },
    { id: 5, speaker: "assistant", script: "좋아요! 매우 자연스럽고 예의 바른 고객 응대였어요." }
  ]
},
{
  title: "문화 차이에 대해 이야기하기 (Discussing Cultural Differences)",
  description: "An advanced Korean daily scenario about expressing personal opinions politely during a cultural discussion.",
  category: "daily",
  language: "korean",
  difficulty: "advanced",
  steps: [
    {
      id: 1,
      speaker: "assistant",
      script: "외국인 친구가 묻습니다. ‘한국 사람들은 왜 회식을 자주 해요?’ 어떻게 대답하시겠어요?",
      options: [
        { text: "팀워크를 중요하게 생각하는 문화예요.", score: 5, feedback: "좋아요. 간단하고 핵심적인 답변이에요.", nextStep: 2 },
        { text: "그냥 그래요.", score: 2, feedback: "조금 더 구체적으로 말해보세요.", nextStep: 2 }
      ]
    },
    {
      id: 2,
      speaker: "assistant",
      script: "친구: ‘술을 꼭 마셔야 해요?’ 라고 묻습니다.",
      options: [
        { text: "요즘은 안 마셔도 괜찮아요.", score: 5, feedback: "좋아요. 현대적인 인식을 잘 표현했어요.", nextStep: 3 },
        { text: "네, 꼭 마셔야 해요.", score: 2, feedback: "농담으로는 괜찮지만 진지한 상황에서는 부적절합니다.", nextStep: 3 }
      ]
    },
    {
      id: 3,
      speaker: "assistant",
      script: "마지막으로 서로의 문화를 존중하는 말을 해보세요.",
      options: [
        { text: "서로 다르지만 이해하려는 마음이 중요하다고 생각해요.", score: 5, feedback: "아주 성숙한 표현이에요.", nextStep: 4 },
        { text: "우리 문화가 더 좋아요.", score: 1, feedback: "조금 폐쇄적으로 들릴 수 있습니다.", nextStep: 4 }
      ]
    },
    { id: 4, speaker: "assistant", script: "좋아요! 성숙하고 열린 대화를 잘 마무리했습니다." }
  ]
},

];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    for (const scenario of scenarios) {
      const result = await RoleplayScenario.updateOne(
        { title: scenario.title }, // cari berdasarkan title
        { $set: scenario }, // update seluruh field
        { upsert: true } // kalau belum ada -> insert baru
      );
      console.log(`🔁 Upserted: ${scenario.title} (${result.modifiedCount ? "updated" : "inserted"})`);
    }

    console.log("🌱 Upsert-safe seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  }
}

seed();
