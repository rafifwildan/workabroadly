// import { type NextRequest, NextResponse } from "next/server"

// const OPENAI_API_KEY =
//   process.env.OPENAI_API_KEY ||
//   "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"

// const EXPAT_AI_PROMPT = `You are Expat AI, an intelligent assistant helping Indonesian professionals prepare to work abroad, specifically in Japan and South Korea.

// Your role is to guide users through all general preparations needed for working abroad, maintaining accuracy, empathy, and contextual relevance.

// LANGUAGE SUPPORT:
// - Respond in the language specified by the user (English, Indonesian, Japanese, or Korean)
// - Maintain the same professional and helpful tone across all languages
// - Use culturally appropriate expressions and formalities for each language

// SCOPE CONTROL:
// You MUST limit knowledge and discussion ONLY to Japan and South Korea.
// If users ask about other countries (USA, Canada, Australia, Europe, etc.), respond ONLY with:
// - English: "Sorry, Expat AI only focuses on helping Indonesian professionals work in Japan or South Korea."
// - Indonesian: "Maaf, Expat AI hanya berfokus membantu warga Indonesia yang ingin bekerja ke Jepang atau Korea Selatan."
// - Japanese: "申し訳ございませんが、Expat AIは日本と韓国で働くインドネシア人専門家のサポートのみに焦点を当てています。"
// - Korean: "죄송합니다. Expat AI는 일본과 한국에서 일하는 인도네시아 전문가를 돕는 데만 집중합니다."

// BEHAVIORAL PRINCIPLES:
// - Always provide complete and actionable answers
// - If user questions are unclear, clarify by summarizing your assumptions first
// - Prioritize accuracy over speculation
// - Use a neutral, encouraging, and professional tone
// - Prefer bullet points and structured sections for clarity
// - Offer practical steps, not just abstract concepts
// - Include brief cultural insights or dos and don'ts when relevant
// - When mentioning legal or official processes, clarify with: "Note: Always confirm with the latest guidance from the embassy or immigration office."

// FORMATTING:
// - Always use semantic Markdown with headings, lists, bold text, and tables
// - Include short section titles with emojis
// - Keep responses moderate length (3-5 sentences per paragraph)
// - Separate paragraphs with line breaks

// RESPONSE TEMPLATE:
// 1. Brief greeting or summary
// 2. Structured sections with icons and headings
// 3. Notes or disclaimers
// 4. Encouraging closing statement`

// const profiles = {
//   default: EXPAT_AI_PROMPT,
// }

// export async function POST(request: NextRequest) {
//   try {
//     type RequestBody = {
//       message: string
//       role?: keyof typeof profiles
//       language?: "en" | "id" | "ja" | "ko"
//       conversationHistory?: { role: string; content: string }[]
//     }

//     const { message, role = "default", language = "en", conversationHistory = [] } =
//       (await request.json()) as RequestBody

//     if (!message || typeof message !== "string") {
//       return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 })
//     }

//     const languageInstruction =
//       {
//         en: "Respond in English.",
//         id: "Respond in Indonesian (Bahasa Indonesia).",
//         ja: "Respond in Japanese (日本語).",
//         ko: "Respond in Korean (한국어).",
//       }[language] || "Respond in English."

//     const messages = [
//       {
//         role: "system",
//         content: `${profiles[role as keyof typeof profiles] || profiles.default}\n\nIMPORTANT: ${languageInstruction}`,
//       },
//       ...conversationHistory.map((msg: { role: string; content: string }) => ({
//         role: msg.role,
//         content: msg.content,
//       })),
//       {
//         role: "user",
//         content: message,
//       },
//     ]

//     const controller = new AbortController()
//     const timeoutId = setTimeout(() => controller.abort(), 30000)

//     let response
//     try {
//       response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-4o-mini",
//           messages: messages,
//           max_completion_tokens: 1500,
//         }),
//         signal: controller.signal,
//       })
//     } catch (fetchError) {
//       clearTimeout(timeoutId)

//       if (fetchError instanceof Error && fetchError.name === "AbortError") {
//         return NextResponse.json(
//           {
//             error: "REQUEST_TIMEOUT",
//             userMessage: "Koneksi timeout. Mohon coba lagi dalam beberapa saat.",
//           },
//           { status: 504 },
//         )
//       }

//       return NextResponse.json(
//         {
//           error: "NETWORK_ERROR",
//           userMessage: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
//         },
//         { status: 503 },
//       )
//     }

//     clearTimeout(timeoutId)

//     if (!response.ok) {
//       const errorData = await response.text()
//       let errorJson
//       try {
//         errorJson = JSON.parse(errorData)
//       } catch {
//         errorJson = { error: { message: errorData } }
//       }

//       const errorCode = errorJson.error?.code || "UNKNOWN_ERROR"

//       if (response.status === 401) {
//         return NextResponse.json(
//           {
//             error: "INVALID_API_KEY",
//             userMessage: "API key tidak valid. Silakan periksa API key di Vars section.",
//           },
//           { status: 401 },
//         )
//       }

//       if (response.status === 429) {
//         return NextResponse.json(
//           {
//             error: "RATE_LIMIT_EXCEEDED",
//             userMessage: "Terlalu banyak permintaan. Mohon tunggu beberapa saat dan coba lagi.",
//           },
//           { status: 429 },
//         )
//       }

//       return NextResponse.json(
//         {
//           error: errorCode,
//           userMessage: "Terjadi kesalahan. Silakan coba lagi.",
//         },
//         { status: response.status },
//       )
//     }

//     const data = await response.json()

//     if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
//       return NextResponse.json(
//         {
//           error: "EMPTY_RESPONSE",
//           userMessage: "AI tidak dapat memberikan jawaban saat ini. Silakan coba lagi.",
//         },
//         { status: 500 },
//       )
//     }

//     const choice = data.choices[0]
//     if (!choice.message || !choice.message.content) {
//       return NextResponse.json(
//         {
//           error: "EMPTY_CONTENT",
//           userMessage: "AI tidak memberikan jawaban. Silakan coba dengan pertanyaan lain.",
//         },
//         { status: 500 },
//       )
//     }

//     const reply = choice.message.content.trim()

//     if (!reply) {
//       return NextResponse.json(
//         {
//           error: "EMPTY_REPLY",
//           userMessage: "Tidak ada respons dari AI. Silakan coba lagi.",
//         },
//         { status: 500 },
//       )
//     }

//     return NextResponse.json({ reply })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: "INTERNAL_ERROR",
//         userMessage: "Terjadi kesalahan sistem. Silakan coba lagi atau hubungi administrator.",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     )
//   }
// }
