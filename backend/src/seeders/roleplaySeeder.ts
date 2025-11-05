import mongoose from "mongoose";
import dotenv from "dotenv";
import RoleplayScenario from "../models/RoleplayScenario.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdbname";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  await RoleplayScenario.deleteMany({});
  console.log("🧹 Cleared old scenarios");

  const scenarios = [
    // 🇯🇵 JAPAN Scenario
{
  title: "Cultural Roleplay: Working with a Japanese Manager in Indonesia",
  culture: "japanese",
  language: "english",
  location: "indonesia",
  brief: {
    overview: `You’ve just joined a new company in Jakarta. Your direct supervisor, Tanaka-san, is a Japanese expatriate calm, polite, and highly professional.
Although you’re still in Indonesia, the way Tanaka-san communicates and expects behavior follows Japanese business etiquette: measured tone, quiet respect, and precision in how things are said and done.
You’ll experience your first week working under his leadership, learning how formality, timing, and humility shape interactions with Japanese professionals even outside Japan.`,
    context: `In many international offices, Japanese managers bring their communication style wherever they go.
They value harmony, hierarchy, and subtle respect in daily interaction. While Indonesian culture tends to emphasize warmth and friendliness, Japanese culture prizes composure and awareness of context.
How you greet, when you sit, when you speak and even how you accept feedback all shape how you’re perceived in a professional setting.
During this simulation, you’ll experience real moments from the first week in the office: greetings, meetings, and conversations with Tanaka-san. Each choice you make affects the tone of your working relationship and helps you understand what “respect” means in a Japanese professional context.`,
    culturalTips: [
      "Balance warmth with restraint. Friendly energy is appreciated, but avoid overfamiliar gestures or loud tones.",
      "Respect hierarchy naturally. Titles and small gestures (like standing when he enters or bowing slightly) are strong signals of professionalism.",
      "Pay attention to timing. Quick acknowledgment shows reliability delays or casual replies may be read as indifference.",
      "Listen between the lines. Japanese professionals often communicate feedback indirectly; phrases like “we might improve this” mean “please fix this.”",
      "Show gratitude regularly. Repeated expressions of thanks, even for small interactions, build trust and stability in relationships."
    ],
    learningObjectives: [
      "Greet and interact respectfully with Japanese professionals in a multicultural workplace.",
      "Interpret subtle, indirect communication styles.",
      "Receive feedback gracefully and express humility without losing confidence.",
      "Adjust your verbal and nonverbal tone to match Japanese professional norms.",
      "End meetings and interactions harmoniously, leaving a positive and respectful impression."
    ],
  },
  scenes: [
    {
      order: 1,
      title: "The First Meeting",
      situation: `It’s your first day at work. You’re waiting in a meeting room. Tanaka-san, your Japanese supervisor, enters quietly, bows slightly, and smiles.`,
      dialogue:`“Good morning. Nice to meet you, I’m Tanaka.”`,
      options: [
        { text: "Stand up, bow slightly, and say, 'Good morning, Tanaka-san. Nice to meet you too.'", note: "Perfect. Respectful, calm, and balanced. Mirrors his tone and gesture." },
        { text: "Smile, shake his hand firmly, and say, 'Good morning, Mr. Tanaka!'", note: "Common in Indonesia, but the strong handshake might feel too assertive." },
        { text: "Stay seated and wave lightly. 'Hi, good morning!'", note: "Friendly in local style, but may appear overly casual to a Japanese senior." },
        { text: "Bow deeply and remain silent.", note: "Polite gesture but overly formal for a casual office in Indonesia might create distance." },
        { text: "Nod slightly with a smile. 'Selamat pagi, Tanaka-san.'", note: "Mixing local greeting and Japanese honorific works shows cultural awareness and warmth." }
      ],
      insight: `Even in Indonesia, Japanese professionals bring their sense of formality.
A gentle bow, calm tone, and composed expression show professionalism and respect.
Indonesians often express warmth openly, but softening it with calmness creates the right balance for cross-cultural respect.`
    },
    {
      order: 2,
      title: "The First Discussion",
      situation: `Tanaka-san asks you to review a project document before a client meeting. His tone is polite but serious.`,
      dialogue:`“Please take a look at this report before our meeting.”`,
      options: [
        { text: "Nod attentively and reply, 'Sure, I’ll review it right away.'", note: "Shows understanding and commitment aligns with Japanese expectations." },
        { text: "Say casually, 'No problem, I’ll check it later after lunch.'", note: "Sounds relaxed in Indonesia, but might seem careless in Japanese context." },
        { text: "Respond, 'Of course! Do you have any specific points you’d like me to focus on?'", note: "Excellent combines initiative with respect." },
        { text: "Take the file silently and start reading without responding.", note: "Shows eagerness, but silence might appear distant." },
        { text: "Ask, 'Should I do it today or anytime this week?'", note: "Reasonable locally, but Japanese managers assume immediacy unless stated otherwise." }
      ],
      insight: `Japanese managers value initiative and responsiveness.
Acknowledging tasks quickly and precisely shows reliability.
A casual or delayed reaction might unintentionally suggest lack of priority.`
    },
    {
      order: 3,
      title: "During a Team Meeting",
      situation: `In a meeting, Tanaka-san pauses after explaining a plan and asks,`,
      dialogue:`“Do you have any opinions or suggestions?”`,
      options: [
        { text: "Think for a few seconds, then say, 'I think we could try this approach — what do you think, Tanaka-san?'", note: "Thoughtful and respectful — encourages collaboration." },
        { text: "Speak energetically: 'Yes! I think we should do this instead.'", note: "Direct tone may sound too forward for a hierarchical culture." },
        { text: "Stay quiet and smile politely.", note: "Safe, but may seem uninterested." },
        { text: "Respond softly: 'I’m not sure… maybe someone else has a better idea.'", note: "Shows modesty but lacks confidence." },
        { text: "Say: 'No, I don’t think that’s a good idea.'", note: "Too blunt — disagreement in Japan must be phrased carefully." }
      ],
      insight: `Japanese discussions favor gentle honesty.
It’s okay to disagree, but phrase it as a suggestion, not opposition.
Harmony (wa) matters more than being right — and diplomacy is seen as intelligence.`
    },
    {
      order: 4,
      title: "Receiving Feedback",
      situation: `After reviewing your work, Tanaka-san says politely,`,
      dialogue:`“Thank you. There are some points we might improve.”`,
      options: [
        { text: "Nod and say, 'I understand. Please let me know how I can improve.'", note: "Ideal humble and proactive." },
        { text: "Smile lightly: 'No worries, I’ll fix it later.'", note: "Too casual; could sound dismissive." },
        { text: "Defend yourself: 'But I thought it was already fine.'", note: "Direct argument feels confrontational." },
        { text: "Stay silent and look down.", note: "May feel respectful, but too withdrawn for a collaborative setting." },
        { text: "Say calmly: 'Thank you for the feedback. I’ll do my best next time.'", note: "Respectful and emotionally balanced." }
      ],
      insight: `Japanese feedback is indirect “we might improve” means please revise.
Accepting feedback sincerely, without defensiveness, shows maturity.
Humility isn’t weakness; it’s professionalism rooted in self-awareness.`
    },
    {
      order: 5,
      title: "Wrapping Up the Week",
      situation: `It’s Friday evening. Tanaka-san walks by and says,`,
      dialogue:`“Good work this week. Thank you.”`,
      options: [
        { text: "Bow slightly: 'Thank you, Tanaka-san. See you next week.'", note: "Perfect respectful and concise." },
        { text: "Smile: 'Thanks! Have a great weekend!'", note: "Friendly, acceptable if your relationship is already comfortable." },
        { text: "Wave casually: 'See you, boss!'", note: "Too casual and overly familiar." },
        { text: "Bow silently with a gentle smile.", note: "Good gesture of acknowledgment." },
        { text: "Say softly: 'Thank you for your guidance this week.'", note: "Shows gratitude very aligned with Japanese etiquette." }
      ],
      insight: `Closings in Japan carry symbolic weight they seal mutual respect.
Saying “Thank you” or bowing shows appreciation not just for work, but for the relationship itself.
These micro-moments of gratitude define long-term trust.`
    }
  ]
},

    // 🇰🇷 KOREA Scenario
    {
  title: "Cultural Roleplay: Working with a Korean Manager in Indonesia",
  culture: "korean",
  language: "english",
  location: "indonesia",
  brief: {
    overview: `You’ve recently joined a company in Jakarta. Your new manager, Mr. Park, is a Korean expatriate known for being warm, dedicated, and detail-oriented.
Although the office is in Indonesia, Mr. Park’s leadership style reflects Korean workplace culture structured, collective, and driven by mutual respect.
You’ll experience your first week working under his guidance, learning how hierarchy, communication style, and emotional awareness shape your relationship in a multicultural work environment.`,
    context: `Korean workplace culture is built on three foundations: respect for hierarchy, collective teamwork, and emotional sensitivity (nunchi).
While Indonesians are naturally friendly and flexible, Korean professionals tend to express care and authority simultaneously warm, but structured.
In Korea, seniors and managers are often addressed with respectful titles rather than first names.
Feedback is direct but polite, and maintaining group harmony often means choosing the right tone more than the right words.
Through this simulation, you’ll navigate greetings, discussions, and feedback moments with Mr. Park learning how to read subtle cues, respond respectfully, and balance local friendliness with Korean formality.`,
    culturalTips: [
      "Respect hierarchy openly. Using titles like Mr., Team Leader, or Director shows social awareness.",
      "Show enthusiasm with control. Korean workplaces appreciate energy but paired with humility and respect.",
      "Practice “nunchi.” Observe your manager’s tone and expression before reacting; it’s a sign of emotional intelligence.",
      "Respond to feedback with gratitude, not defense. Saying “Thank you, I’ll improve” shows professionalism and maturity.",
      "Value collective success. Individual brilliance matters less than contributing to the team’s balance and trust."
    ],
    learningObjectives: [
      "Communicate respectfully and confidently with a Korean superior.",
      "Balance warmth and professionalism when working across hierarchies.",
      "Respond effectively to feedback and expectations in a structured environment.",
      "Read subtle emotional cues (nunchi) and adjust your response naturally.",
      "Strengthen cross-cultural teamwork through empathy and mutual respect."
    ],
  },
  scenes: [
    {
      order: 1,
      title: "The First Meeting",
      situation: `It’s your first day at work. You’re invited to meet Mr. Park in the meeting room.
                  He enters with a warm smile, gives a slight bow, and offers his hand.`,
      dialogue:`“Annyeonghaseyo. Nice to meet you, I’m Park.”`,
      options: [
        { text: "Smile, bow slightly, and shake his hand gently. 'Nice to meet you, Mr. Park.'", note: "Excellent, shows awareness of both cultures: polite and respectful." },
        { text: "Give a strong handshake and say, 'Good to meet you, Park!'", note: "Too informal, skipping titles feels disrespectful in Korean context." },
        { text: "Bow deeply without speaking.", note: "Overly formal. might feel awkward in an Indonesian office." },
        { text: "Wave and say, 'Hi, good morning!'", note: "Friendly, but casual tone might feel unprofessional for a first meeting." },
        { text: "Smile and greet in local style: 'Selamat pagi, Mr. Park.'", note: "Good balance, shows warmth and cultural sensitivity." }
      ],
      insight: `Korean professionals value gestures that combine warmth and respect.
A slight bow, polite smile, and use of titles reflect professionalism.
Even outside Korea, hierarchy awareness remains key — it creates comfort and harmony in relationships.`
    },
    {
      order: 2,
      title: "Starting the Day",
      situation: `The next morning, Mr. Park arrives at the office at 8:50 a.m. He looks around, smiling, and greets the team:`,
      dialogue:`“Good morning, everyone!”`,
      options: [
        { text: "Stand slightly and reply cheerfully, 'Good morning, Mr. Park!'", note: "perfect warm but still professional." },
        { text: "Raise your hand and say, 'Morning, boss!'", note: "Too casual and playful for Korean hierarchy." },
        { text: "Nod and smile quietly.", note: "Acceptable, but might appear too minimal." },
        { text: "Bow your head slightly from your desk and say, 'Good morning, sir.'", note: "Polite and balanced shows discipline." },
        { text: "Continue typing and mumble 'Morning…'", note: "Common locally, but ignoring a superior’s greeting can be seen as rude." }
      ],
      insight: `Daily greetings are a sign of unity in Korean workplaces.
Responding warmly to your superior’s greeting reflects energy, respect, and teamwork.
Hierarchy doesn’t mean distance — it’s about showing acknowledgment and togetherness.`
    },
    {
      order: 3,
      title: "Team Discussion",
      situation: `During a team meeting, Mr. Park explains a new project idea and then looks at you.`,
      dialogue:`“What do you think about this approach?”`,
      options: [
        { text: "Take a second to think, then say, 'I think it’s a good idea. Maybe we can add one more option to improve it.'", note: "Ideal, respectful and constructive." },
        { text: "Smile nervously: 'Ah, I’m not sure, maybe someone else can answer.'", note: "Modest, but may appear unconfident." },
        { text: "Reply directly: 'I don’t think that will work.'", note: "Too blunt disagreement should be softened." },
        { text: "Stay silent and nod.", note: "Safe, but might suggest you’re disengaged." },
        { text: "Speak enthusiastically: 'That’s great! Let’s do it right away!'", note: "Energetic, but could seem impulsive or overstepping." }
      ],
      insight: `Korean managers appreciate initiative, but tone matters.
Being overly direct can feel confrontational, while complete silence can seem passive.
Balanced communication — polite, thoughtful, and inclusive — builds trust and reflects good nunchi.`
    },
    {
      order: 4,
      title: "Receiving Feedback",
      situation: `Later in the week, Mr. Park reviews your report. He smiles slightly and says,`,
      dialogue:`“It’s good, but next time, please make the structure clearer.”`,
      options: [
        { text: "Bow your head slightly and respond, 'Thank you, I’ll fix it right away.'", note: "Excellent shows gratitude and willingness to improve." },
        { text: "Smile and say, 'Sure, no problem, I’ll get to it later.'", note: "Too casual, sounds uncommitted." },
        { text: "Defend yourself: 'But I already followed the format.'", note: "Can be perceived as argumentative." },
        { text: "Respond quietly, 'Okay…' and look down.", note: "Respectful but lacks engagement." },
        { text: "Smile gently and say, 'Thank you for your advice, Mr. Park. I’ll make it better next time.'", note: "Respectful and confident perfectly balanced." }
      ],
      insight: `Korean feedback tends to be direct but caring.
It’s not criticism, but guidance for improvement.
Acknowledging feedback positively shows emotional maturity and jeong — a warm sense of human connection that strengthens relationships over time.`
    },
    {
      order: 5,
      title: "End of the Week",
      situation: `Friday evening. Everyone’s wrapping up work. Mr. Park walks past your desk, smiles, and says:`,
      dialogue: `“You worked hard this week. Thank you.”`,
      options: [
        { text: "Stand slightly, smile, and say, 'Thank you, Mr. Park. Have a good weekend.'", note: "Perfect polite and warm." },
        { text: "Respond cheerfully, 'No problem! See you Monday!'", note: "Friendly, but slightly too casual." },
        { text: "Bow lightly and smile without words.", note: "Polite gesture especially suitable if he’s already leaving." },
        { text: "Laugh softly: 'Finally, the weekend!'", note: "Too casual, can seem unprofessional." },
        { text: "Say sincerely, 'Thank you for your guidance this week.'", note: "Excellent expresses gratitude and humility." }
      ],
      insight: `Korean workplace relationships thrive on mutual appreciation.
Expressions like “You worked hard” (sugo hasyeotsseumnida) carry emotional depth they acknowledge effort and shared struggle.
Responding with gratitude completes the cultural cycle of respect, warmth, and teamwork.`
    }
  ]
}
  ];

  await RoleplayScenario.insertMany(scenarios);
  console.log(`✅ Inserted ${scenarios.length} demo scenarios`);

  await mongoose.disconnect();
  console.log("🏁 Done");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
