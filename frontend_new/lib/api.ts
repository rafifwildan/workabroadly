export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:3010";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    // penting untuk dev CORS
    cache: "no-store",
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${msg}`);
  }
  return res.json();
}

export type Scenario = {
  _id: string;
  title: string;
  description: string;
  category: "interview" | "workplace" | "daily";
  language: "japanese" | "korean";
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: {
    id: number;
    speaker: "assistant" | "user";
    script: string;
    options?: { text: string; score: number; feedback?: string; nextStep?: number }[];
  }[];
};

export type RoleplaySession = {
  _id: string;
  progressId: string;
  scenarioId: string;
  answers: { stepId: number; selectedOption: string; score: number; feedback?: string }[];
  totalScore: number;
  completed: boolean;
  startedAt: string;
  endedAt?: string;
};

export const ScenariosAPI = {
  list: (q = "") => api<Scenario[]>(`/api/scenarios${q}`),
  get: (id: string) => api<Scenario>(`/api/scenarios/${id}`),
};

export const RoleplayAPI = {
  start: (userId: string, scenarioId: string) =>
    api<RoleplaySession>(`/api/roleplay/start`, {
      method: "POST",
      body: JSON.stringify({ userId, scenarioId }),
    }),
  answer: (sessionId: string, stepId: number, selectedOption: string) =>
    api<{ feedback?: string; totalScore: number }>(`/api/roleplay/answer`, {
      method: "POST",
      body: JSON.stringify({ sessionId, stepId, selectedOption }),
    }),
  end: (sessionId: string) =>
    api<RoleplaySession>(`/api/roleplay/end`, {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    }),
  session: (id: string) => api<RoleplaySession>(`/api/roleplay/session/${id}`),
  progress: (userId: string) => api(`/api/roleplay/progress/${userId}`),
};
