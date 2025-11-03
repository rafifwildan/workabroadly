export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: string
  rarity: "bronze" | "silver" | "gold" | "platinum"
}

export const BADGES: Badge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first scenario",
    icon: "🎯",
    requirement: "Complete 1 scenario",
    rarity: "bronze",
  },
  {
    id: "conversation-starter",
    name: "Conversation Starter",
    description: "Complete 5 scenarios",
    icon: "💬",
    requirement: "Complete 5 scenarios",
    rarity: "bronze",
  },
  {
    id: "culture-explorer",
    name: "Culture Explorer",
    description: "Complete scenarios in 3 different categories",
    icon: "🌏",
    requirement: "Complete 3 categories",
    rarity: "silver",
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Get 100% on any scenario",
    icon: "⭐",
    requirement: "Score 100%",
    rarity: "gold",
  },
  {
    id: "dedicated-learner",
    name: "Dedicated Learner",
    description: "Complete 20 scenarios",
    icon: "📚",
    requirement: "Complete 20 scenarios",
    rarity: "silver",
  },
  {
    id: "master-communicator",
    name: "Master Communicator",
    description: "Complete 50 scenarios",
    icon: "🏆",
    requirement: "Complete 50 scenarios",
    rarity: "gold",
  },
  {
    id: "workplace-pro",
    name: "Workplace Pro",
    description: "Complete all workplace scenarios",
    icon: "💼",
    requirement: "Complete workplace category",
    rarity: "gold",
  },
  {
    id: "cultural-master",
    name: "Cultural Master",
    description: "Complete all scenarios with 85%+ average",
    icon: "👑",
    requirement: "85%+ average score",
    rarity: "platinum",
  },
]

export const LEARNING_PATHS = [
  {
    id: "beginner",
    name: "Beginner Path",
    description: "Start your journey to working abroad",
    scenarios: [
      { id: "1", name: "Basic Greetings", category: "Daily Life", difficulty: "Beginner" },
      { id: "2", name: "Self Introduction", category: "Workplace", difficulty: "Beginner" },
      { id: "3", name: "Asking for Help", category: "Daily Life", difficulty: "Beginner" },
    ],
  },
  {
    id: "intermediate",
    name: "Intermediate Path",
    description: "Build workplace communication skills",
    scenarios: [
      { id: "4", name: "Team Meeting", category: "Workplace", difficulty: "Intermediate" },
      { id: "5", name: "Client Presentation", category: "Workplace", difficulty: "Intermediate" },
      { id: "6", name: "Handling Complaints", category: "Customer Service", difficulty: "Intermediate" },
    ],
  },
  {
    id: "advanced",
    name: "Advanced Path",
    description: "Master complex workplace situations",
    scenarios: [
      { id: "7", name: "Negotiation", category: "Business", difficulty: "Advanced" },
      { id: "8", name: "Crisis Management", category: "Workplace", difficulty: "Advanced" },
      { id: "9", name: "Leadership Meeting", category: "Business", difficulty: "Advanced" },
    ],
  },
]
