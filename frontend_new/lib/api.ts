// ==========================================
// ✅ Base setup
// ==========================================
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:3010";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store", // ⛔️ penting buat fetch realtime data
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${msg}`);
  }

  return res.json();
}

//
// ==========================================
// 🎭 Types — sinkron sama backend schema baru
// ==========================================
//

// 👉 Option (user choices)
export type ScenarioOption = {
  text: string;
  note: string; // feedback/insight singkat untuk pilihan user
};

// 👉 Scene (setiap langkah simulasi)
export type ScenarioScene = {
  order: number;
  title: string;
  situation: string;
  dialogue: string;
  options: ScenarioOption[];
  insight: string; // insight budaya yang muncul setelah user memilih
};

// 👉 Brief (summary sebelum simulasi)
export type ScenarioBrief = {
  overview: string;
  context: string;
  culturalTips: string[];
  learningObjectives: string[];
};

// 👉 Roleplay Scenario (dokumen utama)
export type Scenario = {
  _id: string;
  title: string;
  culture: "japanese" | "korean";
  language: string; // biasanya "english"
  location?: string;
  brief: ScenarioBrief;
  scenes: ScenarioScene[];
  createdAt: string;
  updatedAt: string;
  // optional UI fallback fields
  description?: string;
  icon?: string;
  duration?: string;
  difficulty?: string;
};

// ==========================================
// 🧩 Roleplay Session
// ==========================================
export type RoleplayAnswer = {
  sceneOrder: number;
  selectedOption: string;
  note?: string;
};

export type RoleplaySession = {
  _id: string;
  progressId: string;
  scenarioId: string;
  answers: RoleplayAnswer[];
  completed: boolean;
  startedAt: string;
  endedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

// ==========================================
// 📊 Roleplay Progress (UserProgress mapping)
// ==========================================
export type RoleplayProgress = {
  completedScenarioIds: string[];
  totalSessions: number;
  totalTime: number;
  lastUpdated: string;
};

// ==========================================
// 📦 API Wrappers
// ==========================================

// 🎯 SCENARIOS API
export const ScenariosAPI = {
  list: (q = "") => api<Scenario[]>(`/api/scenarios${q}`),
  get: (id: string) => api<Scenario>(`/api/scenarios/${id}`),
};

// 🧠 ROLEPLAY API
export const RoleplayAPI = {
  start: (body: { userId: string; scenarioId: string }) =>
    api<RoleplaySession>(`/api/roleplay/start`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // sekarang pakai sceneOrder & selectedOption, bukan stepId
  answer: (body: { sessionId: string; sceneOrder: number; selectedOption: string }) =>
    api<{ feedback?: string; culturalInsight?: string; nextScene?: number; isLastScene?: boolean }>(
      `/api/roleplay/answer`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    ),

  end: (body: { sessionId: string }) =>
    api<RoleplaySession>(`/api/roleplay/end`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  session: (id: string) => api<RoleplaySession>(`/api/roleplay/session/${id}`),

  // progress sekarang cocok sama UserProgress schema baru
  progress: (userId: string) =>
    api<RoleplayProgress>(`/api/roleplay/progress/${userId}`).then((res: any) => ({
      completedScenarioIds: res.completedScenarios ?? [],
      totalSessions: res.totalSessions ?? 0,
      totalTime: res.totalTime ?? 0,
      lastUpdated: res.lastUpdated ?? "",
    })),
};

// 🌐 TRANSLATE API (tidak berubah)
export const TranslateAPI = {
  translate: (text: string, targetLang: string) =>
    api<{ translatedText: string }>(`/api/translate`, {
      method: "POST",
      body: JSON.stringify({ text, targetLang }),
    }),
};
