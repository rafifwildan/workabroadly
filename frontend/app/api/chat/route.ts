import { type NextRequest, NextResponse } from "next/server"

const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY
<<<<<<< HEAD

=======
>>>>>>> 1e657cef8960702ca68c51f81483cb0a20afa17c
const EXPAT_AI_PROMPT = `You are Expat AI, an intelligent assistant helping Indonesian professionals prepare to work abroad, specifically in Japan and South Korea.

Your role is to guide users through all general preparations needed for working abroad, maintaining accuracy, empathy, and contextual relevance.

SCOPE CONTROL:
You MUST limit knowledge and discussion ONLY to Japan and South Korea.
If users ask about other countries (USA, Canada, Australia, Europe, etc.), respond ONLY with:
"Maaf, Expat AI hanya berfokus membantu warga Indonesia yang ingin bekerja ke Jepang atau Korea Selatan."

BEHAVIORAL PRINCIPLES:
- Always provide complete and actionable answers
- If user questions are unclear, clarify by summarizing your assumptions first
- Prioritize accuracy over speculation
- Use a neutral, encouraging, and professional tone
- Prefer bullet points and structured sections for clarity
- Offer practical steps, not just abstract concepts
- Include brief cultural insights or dos and don'ts when relevant
- When mentioning legal or official processes, clarify with: "Note: Always confirm with the latest guidance from the embassy or immigration office."

FORMATTING:
- Always use semantic Markdown with headings, lists, bold text, and tables
- Include short section titles with emojis
- Keep responses moderate length (3-5 sentences per paragraph)
- Separate paragraphs with line breaks

RESPONSE TEMPLATE:
1. Brief greeting or summary
2. Structured sections with icons and headings
3. Notes or disclaimers
4. Encouraging closing statement`

const profiles = {
  default: EXPAT_AI_PROMPT,
}

export async function POST(request: NextRequest) {
  try {
    const { message, role = "default", conversationHistory = [] } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 })
    }

    const messages = [
      {
        role: "system",
        content: profiles[role as keyof typeof profiles] || profiles.default,
      },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ]

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    let response
    try {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messages,
          max_completion_tokens: 1500,
        }),
        signal: controller.signal,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            error: "REQUEST_TIMEOUT",
            userMessage: "Koneksi timeout. Mohon coba lagi dalam beberapa saat.",
          },
          { status: 504 },
        )
      }

      return NextResponse.json(
        {
          error: "NETWORK_ERROR",
          userMessage: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        },
        { status: 503 },
      )
    }

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.text()
      let errorJson
      try {
        errorJson = JSON.parse(errorData)
      } catch {
        errorJson = { error: { message: errorData } }
      }

      const errorCode = errorJson.error?.code || "UNKNOWN_ERROR"

      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "INVALID_API_KEY",
            userMessage: "API key tidak valid. Silakan periksa API key di Vars section.",
          },
          { status: 401 },
        )
      }

      if (response.status === 429) {
        return NextResponse.json(
          {
            error: "RATE_LIMIT_EXCEEDED",
            userMessage: "Terlalu banyak permintaan. Mohon tunggu beberapa saat dan coba lagi.",
          },
          { status: 429 },
        )
      }

      return NextResponse.json(
        {
          error: errorCode,
          userMessage: "Terjadi kesalahan. Silakan coba lagi.",
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      return NextResponse.json(
        {
          error: "EMPTY_RESPONSE",
          userMessage: "AI tidak dapat memberikan jawaban saat ini. Silakan coba lagi.",
        },
        { status: 500 },
      )
    }

    const choice = data.choices[0]
    if (!choice.message || !choice.message.content) {
      return NextResponse.json(
        {
          error: "EMPTY_CONTENT",
          userMessage: "AI tidak memberikan jawaban. Silakan coba dengan pertanyaan lain.",
        },
        { status: 500 },
      )
    }

    const reply = choice.message.content.trim()

    if (!reply) {
      return NextResponse.json(
        {
          error: "EMPTY_REPLY",
          userMessage: "Tidak ada respons dari AI. Silakan coba lagi.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        userMessage: "Terjadi kesalahan sistem. Silakan coba lagi atau hubungi administrator.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
