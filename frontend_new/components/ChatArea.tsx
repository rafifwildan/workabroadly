"use client"

import { useRef, useEffect, useState } from "react"
import { MessageSquare } from "lucide-react"
import MessageBubble, { TypingIndicator } from "./MessageBubble"
import MenuButtonGroup, { type MenuButton } from "./MenuButtonGroup"
import {
  CATEGORIES,
  CULTURES,
  getCategoryById,
  getScenarioById,
  getTranslation,
  type Language,
} from "@/lib/clara-menu-config"
import { getUIText, getStepPrompt } from "@/lib/translations"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  messageType?: "normal" | "selection" | "navigation"
  insight?: string  // Cultural insight from Clara
  hasInsight?: boolean  // Flag for rendering insight
}

interface ConversationState {
  step: number
  selectedCulture?: string
  selectedCategory?: string
  selectedScenario?: string
  selectedRole?: string
  isInRoleplay: boolean
}

interface ChatAreaProps {
  messages: Message[]
  isTyping?: boolean
  showPersonaSelection?: boolean
  selectedPersona?: string
  onPersonaSelect?: (persona: string) => void
  selectedCulture?: string
  selectedLanguage?: Language
  onSuggestionClick?: (suggestion: string) => void
  conversationState?: ConversationState
  onMenuSelect?: (type: string, value: string) => void
}

export default function ChatArea({
  messages,
  isTyping = false,
  showPersonaSelection = false,
  selectedPersona = "clara",
  onPersonaSelect,
  selectedCulture = "en",
  selectedLanguage = "en" as Language,
  onSuggestionClick,
  conversationState,
  onMenuSelect,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [searchMessage, setSearchMessage] = useState("🔍 Gathering wisdom from the clouds...");
  const [elapsedTime, setElapsedTime] = useState(0);

  // Messages organized by culture - only show relevant culture messages
  const messagesByCulture = {
    ja: [ // Japanese Culture Messages
      "🇯🇵 Did you know? In Japan, there's a tradition called 'nomikai' (飲み会) where colleagues bond after work over drinks. It's considered important for team building!",
      "🍱 Fun fact: Japanese workers take their lunch break seriously! Many companies have dedicated rest areas, and bento culture is huge. Food = team harmony!",
      "🎌 In Japan, business cards (meishi 名刺) are exchanged with both hands and a slight bow. It's not just paper, it's respect in rectangular form!",
      "⛩️ Japanese concept 'Omotenashi' (おもてなし) means wholehearted hospitality. In the workplace, this translates to anticipating needs before being asked!",
      "🌸 Cherry blossom season (Hanami 花見) is serious business in Japan! Companies even have official flower-viewing parties. Work-life balance, Japanese style!",
      "🙇 In Japanese offices, bowing is an art form! A 15° bow for casual greetings, 30° for respect, 45° for deep apologies. Your posture speaks volumes!",
      "☕ Japanese work culture values 'reporting, contacting, consulting' (Hou-Ren-Sou 報連相). Keep your team informed - communication is key!",
      "⏰ In Japan, being 'on time' means arriving 5-10 minutes early! Punctuality isn't just respected, it's expected. Set your watch accordingly!",
      "🎯 'Kaizen' (改善) - continuous improvement - is a Japanese workplace philosophy. Small daily improvements lead to big long-term results!",
      "🤝 Group harmony (Wa 和) is essential in Japanese workplaces. Consensus matters more than individual brilliance. Team first, always!",
      "📞 Phone etiquette in Japan: Always say 'otsukaresama desu' (お疲れ様です) when ending work calls. It means 'thank you for your hard work'!",
      "🍵 Green tea breaks (ocha お茶) are sacred in Japanese offices. It's not just caffeine, it's a moment of shared peace and informal bonding!",
      "💼 In Japan, your company becomes part of your identity. People often introduce themselves as '[Company name] no [Your name]' - affiliation matters!",
      "🎊 End-of-year parties (Bounenkai 忘年会) literally mean 'forget-the-year gatherings'. It's when colleagues let loose and leave work stress behind!",
      "✨ 'Ganbatte!' (頑張って) is Japan's ultimate encouragement word. It means 'do your best!' and you'll hear it everywhere. Return the energy!"
    ],
    ko: [ // Korean Culture Messages
      "🇰🇷 In Korea, age hierarchy is everything! Even a one-year difference means using different honorifics. 'Sunbae' (선배 senior) and 'Hoobae' (후배 junior) define relationships!",
      "🍗 Korean work culture includes 'hoesik' (회식) - company dinners where teams bond over Korean BBQ and soju. It's networking, Korean style!",
      "💼 Korea has 'ppalli ppalli' (빨리 빨리) culture meaning 'hurry hurry'! Fast-paced work is the norm, but so is dedication. Koreans work hard AND play hard!",
      "🎤 Noraebang (노래방 - karaoke rooms) are essential for Korean team bonding. Your singing skills might matter as much as your Excel skills!",
      "📱 Fun fact: Korea is one of the most digitally connected countries! Instant messaging (KakaoTalk) is the default communication style, even at work!",
      "☕ In Korean offices, the youngest person (막내 maknae) often handles coffee orders and small tasks. It's a rite of passage, not hazing!",
      "🙏 Korean work culture values respect for elders. Always use honorifics (존댓말 jondaetmal) with seniors, even if you're only a year apart!",
      "🍻 After-work drinking (술자리 sulchari) is where real bonding happens! It's when hierarchy softens and colleagues become friends. Embrace it!",
      "📊 'Work-life balance' is evolving in Korea, but dedication is still prized. Showing commitment to the team is highly valued!",
      "🎯 In Korean meetings, the most senior person speaks first and decides last. Observe the hierarchy and timing - patience is power!",
      "💪 Korean work ethic is legendary! The phrase 'fighting!' (화이팅 hwaiting) is used everywhere to encourage persistence and effort!",
      "🏢 Many Korean companies have company songs and mottos. Don't be surprised if there's a morning gathering with chants - team spirit is real!",
      "🎁 Gift-giving is important in Korean work culture! Small gifts on special occasions (Chuseok, Seollal) show appreciation and build relationships!",
      "👔 Dress formally in Korean offices, especially at traditional companies. Your appearance reflects respect for your workplace and colleagues!",
      "📞 Phone calls > emails in Korea! When something's urgent, pick up the phone. Direct communication builds trust faster!"
    ],
    id: [ // Indonesian Culture Messages
      "🇮🇩 In Indonesian work culture, 'gotong royong' (mutual cooperation) is key! Teams work together and support each other like family!",
      "☕ Coffee breaks in Indonesian offices are sacred! 'Ngopi dulu' (coffee first) isn't procrastination, it's relationship building!",
      "🙏 Respect for elders and hierarchy is important in Indonesian workplaces. Always use 'Bapak' (Sir) or 'Ibu' (Ma'am) for seniors!",
      "🍛 Lunch together is bonding time! Indonesian colleagues often share meals from the same dishes - it's about togetherness, not just food!",
      "😊 Politeness and indirect communication are valued. Saying 'no' directly can be seen as rude. Learn to read between the lines!",
      "🎯 'Asal Bapak Senang' (keeping the boss happy) is a real phenomenon. Harmony with superiors is often prioritized - it's about maintaining relationships!",
      "🤝 Building personal relationships (pertemanan) before business is common. Take time to know your colleagues personally!",
      "⏰ 'Jam karet' (rubber time) exists, but professional settings are getting stricter. When in doubt, arrive on time to show respect!",
      "🎊 Office arisan (rotating savings) groups are popular! It's not just about money, it's about team bonding and trust building!",
      "💼 Family obligations are respected in Indonesian work culture. Need time off for family events? Most employers understand and support it!",
      "🍰 Celebrating birthdays and special occasions together is big! Bringing snacks or cakes to share shows you value the team!",
      "📱 WhatsApp is the unofficial official communication tool! Work groups are active 24/7 - embrace digital connectivity!",
      "🙌 'Permisi' and 'terima kasih' go a long way! Politeness and gratitude are deeply appreciated in Indonesian workplaces!",
      "🌟 Religion is part of daily life. Prayer times and religious holidays are respected. Show awareness and respect for diversity!",
      "👨‍👩‍👧‍👦 Work-life balance includes family time. Asking about family shows you care - it's relationship building, Indonesian style!"
    ],
    en: [ // English/General International Culture Messages
      "🌏 Culture shock pro tip: What feels awkward now will feel normal in 3 months. You're not failing, you're adapting!",
      "🗣️ Language learning secret: Making mistakes is data collection! Every 'oops' moment is one step closer to fluency!",
      "🤝 Workplace culture rule #1: When in doubt, observe first, mimic second, ask third. You'll blend in faster than you think!",
      "✈️ Expat truth: Your comfort zone is like a muscle. The more you stretch it, the stronger you become!",
      "🎯 Cultural adaptation isn't about changing who you are, it's about adding new tools to your communication toolkit!",
      "😅 Universal truth: Every expat has that one story about hilariously misunderstanding something. You'll collect yours soon!",
      "🍜 Food is the international language! Can't speak the language yet? Point at the picture menu. Problem solved!",
      "🎭 Plot twist: Sometimes the 'cultural difference' you worried about is actually just that person's personality. Not everything is culture!",
      "🌟 Breaking news: Smiling and being polite works in every culture. Revolutionary, right?",
      "📚 Learning a new language is like debugging code. Sometimes you just need to restart (sleep) and try again tomorrow!",
      "⏰ Time perception varies! In some cultures, '5 minutes' means 5 minutes. In others, it means 'sometime today.' Learn the local clock!",
      "📧 Email etiquette matters! The number of 'thank you's' and apologies varies by culture. When in doubt, err on the side of politeness!",
      "🤐 Silence in meetings can mean different things: respect, disagreement, or contemplation. Context is everything!",
      "👔 Dress codes speak volumes! What you wear communicates respect, professionalism, and cultural awareness. Observe and adapt!",
      "🎁 Gift-giving at work has rules! In some cultures it's expected, in others it's awkward. Research before you give!",
      "💪 You're not just learning a language, you're becoming bilingual. That's literally upgrading your brain!",
      "🌈 Every cultural challenge you overcome is a superpower you're adding to your resume. Adaptability = gold!",
      "🚀 Fun fact: Expats develop 'cultural intelligence' - the ability to navigate any culture. That's a career asset for life!",
      "✨ Remember: Locals appreciate effort more than perfection. Your attempts to speak their language = instant respect points!",
      "🎊 You're doing something brave! Not everyone has the courage to work in a foreign country. Give yourself credit!",
      "📖 Language hack: Kids' books and TV shows aren't just for kids. They're perfect for learning basic phrases without shame!",
      "🎮 Gaming in the local language is studying in disguise. Level up your character AND your vocabulary!",
      "💬 Ask questions! Locals usually love sharing their culture with genuinely curious people. Your curiosity is a compliment!",
      "🌱 Small daily practices add up! Greeting shopkeepers, thanking bus drivers - these tiny moments build cultural confidence!",
      "🎯 You'll have good days and tough days. Both are normal. Cultural adaptation isn't linear - it's a zigzag journey up!"
    ]
  };

  // Select messages based on culture
  const entertainingMessages = messagesByCulture[selectedCulture as keyof typeof messagesByCulture] || messagesByCulture.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (isTyping) {
      setElapsedTime(0);
      const startTime = Date.now();
      let lastChangeTime = 0;

      // Pick a random starting message
      const randomIndex = Math.floor(Math.random() * entertainingMessages.length);
      setSearchMessage(entertainingMessages[randomIndex]);

      const interval = setInterval(() => {
        const elapsedSeconds = (Date.now() - startTime) / 1000;
        setElapsedTime(elapsedSeconds);

        // Change message every 15 seconds with a RANDOM selection
        const currentInterval = Math.floor(elapsedSeconds / 15);
        if (currentInterval > lastChangeTime) {
          lastChangeTime = currentInterval;
          // Pick a completely random message instead of sequential
          const newRandomIndex = Math.floor(Math.random() * entertainingMessages.length);
          setSearchMessage(entertainingMessages[newRandomIndex]);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
      setSearchMessage("🔍 Gathering wisdom from the clouds...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping])


  // Helper function to render Clara's interactive menu
  const renderClaraMenu = () => {
    if (!conversationState || !onMenuSelect) return null;

    const { step, selectedCulture, selectedCategory, selectedScenario } = conversationState;

    // Step 1: Culture Selection (NEW)
    if (step === 1) {
      const menuItems: MenuButton[] = CULTURES.map((culture) => ({
        id: culture.id,
        icon: culture.icon,
        label: getTranslation(culture.translations, selectedLanguage),
      }));

      return (
        <div className="mb-6 p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
          <p className="text-center text-foreground mb-4 font-medium">
            {getStepPrompt(1, selectedLanguage)}
          </p>
          <MenuButtonGroup
            items={menuItems}
            onSelect={(id) => onMenuSelect("culture", id)}
            layout="grid"
            disabled={isTyping}
          />
        </div>
      );
    }

    // Step 2: Category Selection (was Step 1)
    if (step === 2) {
      const menuItems: MenuButton[] = CATEGORIES.map((cat) => ({
        id: cat.id,
        icon: cat.icon,
        label: getTranslation(cat.translations, selectedLanguage),
      }));

      return (
        <div className="mb-6 p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
          <p className="text-center text-foreground mb-4 font-medium">
            {getStepPrompt(2, selectedLanguage)}
          </p>
          <MenuButtonGroup
            items={menuItems}
            onSelect={(id) => onMenuSelect("category", id)}
            layout="grid"
            disabled={isTyping}
          />
        </div>
      );
    }

    // Step 3: Scenario Selection (was Step 2)
    if (step === 3 && selectedCategory) {
      const category = getCategoryById(selectedCategory);
      if (!category) return null;

      const menuItems: MenuButton[] = category.scenarios.map((scenario) => ({
        id: scenario.id,
        label: getTranslation(scenario.translations, selectedLanguage),
      }));

      return (
        <div className="mb-6 p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
          <p className="text-center text-foreground mb-4 font-medium">
            {getStepPrompt(3, selectedLanguage)}
          </p>
          <MenuButtonGroup
            items={menuItems}
            onSelect={(id) => onMenuSelect("scenario", id)}
            layout="list"
            disabled={isTyping}
          />
        </div>
      );
    }

    // Step 4: Role Selection (was Step 3)
    if (step === 4 && selectedCategory && selectedScenario) {
      const scenario = getScenarioById(selectedCategory, selectedScenario);
      if (!scenario) return null;

      const menuItems: MenuButton[] = scenario.roles.map((role) => ({
        id: role.id,
        label: getTranslation(role.translations, selectedLanguage),
      }));

      return (
        <div className="mb-6 p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
          <p className="text-center text-foreground mb-4 font-medium">
            {getStepPrompt(4, selectedLanguage)}
          </p>
          <MenuButtonGroup
            items={menuItems}
            onSelect={(id) => onMenuSelect("role", id)}
            layout="grid"
            disabled={isTyping}
          />
        </div>
      );
    }

    // Steps 5-7: Roleplay mode - no navigation buttons, just free-form chat
    // Users can chat freely without interruption

    return null;
  };

  // Map culture codes to display names
  const cultureNames: Record<string, string> = {
    "ja": "Japanese",
    "ko": "Korean",
    "id": "Indonesian",
    "en": "Western"
  };

  const cultureName = cultureNames[selectedCulture] || "Western";

  const personas = [
    {
      id: "clara",
      name: "Clara",
      emoji: "🎭",
      description: "Cultural Role-Play Practice",
      fullTitle: "Cultural Role-Play Coach",
      details: "Practice real-life cultural scenarios through interactive role-play. I'll act as your manager, colleague, or friend, and help you master social interactions safely!",
      welcomeMessage: "I'm Clara, your Cultural Role-Play Coach! 🎭 Let's practice real conversations together. I'll guide you through interactive roleplay scenarios where you can safely practice cultural communication!",
      suggestions: []  // Clara no longer uses suggestions, uses menu instead
    },
    {
      id: "sora",
      name: "Sora",
      emoji: "💼",
      description: "Workplace & Career strategy",
      fullTitle: "Workplace Culture Strategist",
      details: "Get actionable frameworks and strategic scripts for negotiation, feedback, and navigating complex workplace dynamics.",
      welcomeMessage: `Welcome.

I am Sora, your Workplace Strategist for **${cultureName}** culture.

I can provide cultural analysis, strategic frameworks, and sample scripts for professional situations. How can I assist you today?`,
      suggestions: [
        "How do I ask for feedback from my manager?",
        "What's the best way to present an idea in a team meeting?",
        "Can you help me draft an email to request a deadline extension?"
      ]
    },
    {
      id: "arlo",
      name: "Arlo",
      emoji: "📋",
      description: "Daily Life & Social Etiquette",
      fullTitle: "Daily Life Cultural Guide",
      details: "Your helpful \"local friend.\" Get practical Do's & Don'ts for social etiquette, invitations, dining, and navigating daily life with confidence.",
      welcomeMessage: `Welcome!

I'm Arlo, your "local friend." I'm here to give you simple Do's & Don'ts for social etiquette in **${cultureName}** culture.

What's on your mind?`,
      suggestions: [
        "What are the Do's and Don'ts when visiting a colleague's home for dinner?",
        "My neighbor gave me a gift. How do I respond appropriately?",
        "How do I politely decline an invitation?"
      ]
    }
  ]

  if (messages.length === 0 && !isTyping) {
    if (showPersonaSelection) {
      // Show persona selection when starting new session
      return (
        <div className="flex-1 flex items-center justify-center p-8 bg-card">
          <div className="text-center max-w-4xl w-full animate-fade-in">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your AI Coach</h1>
            <p className="text-muted-foreground mb-8">Select the coach that best fits your needs</p>

            {/* Persona Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => onPersonaSelect?.(persona.id)}
                  className={`
                    p-6 rounded-xl border-2 transition-all text-left
                    hover:scale-105 hover:shadow-lg
                    ${selectedPersona === persona.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-background hover:border-primary/50"}
                  `}
                >
                  {/* Emoji Icon */}
                  <div className="text-5xl mb-4">{persona.emoji}</div>

                  {/* Name & Title */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{persona.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{persona.fullTitle}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">{persona.details}</p>

                  {/* Selected Indicator */}
                  {selectedPersona === persona.id && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-xs font-medium">Selected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Helper Text */}
            <p className="text-sm text-muted-foreground mt-6">
              💡 You can change language and culture settings anytime during the conversation
            </p>
          </div>
        </div>
      )
    }

    // Default welcome screen (when persona already selected)
    const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0]

    // For Clara, show interactive menu immediately
    if (selectedPersona === "clara" && conversationState && conversationState.step === 1) {
      return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-card">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Header */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto shadow-md">
                <span className="text-5xl">{currentPersona.emoji}</span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mt-6">Welcome!</h1>
              <p className="text-lg text-primary mt-4 leading-relaxed">
                {currentPersona.welcomeMessage}
              </p>
            </div>

            {/* Show category menu */}
            {renderClaraMenu()}
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <div className="text-center max-w-2xl animate-fade-in">
          {/* Icon */}
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto shadow-md">
            <MessageSquare className="w-12 h-12 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-foreground mt-6">Welcome!</h1>

          {/* Welcome Message */}
          <p className="text-lg text-primary mt-4 leading-relaxed">
            {currentPersona.welcomeMessage}
          </p>

          {/* Suggestion Chips (for Sora & Arlo) */}
          {currentPersona.suggestions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {currentPersona.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="rounded-full bg-primary/5 text-primary px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-all hover:scale-105 active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-card">
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <>
            <TypingIndicator personaName={selectedPersona} />
            <div className="text-sm text-muted-foreground text-center mt-2">
              {searchMessage} ({elapsedTime.toFixed(1)}s)
            </div>
          </>
        )}

        {/* Clara's Interactive Menu System */}
        {selectedPersona === "clara" && !isTyping && renderClaraMenu()}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

