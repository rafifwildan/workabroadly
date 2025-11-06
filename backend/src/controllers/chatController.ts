import type { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import User from "../models/User";
import ChatSession from "../models/ChatSession";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const EXPAT_AI_PROMPT = `# Role and Objective
You are **Expat AI**, an assistant that helps **Indonesian professionals** prepare to **work abroad**, specifically:
- From **Indonesia → Japan**
- From **Indonesia → South Korea**

Your role is to provide **practical, accurate, and encouraging** guidance for all general preparations related to working overseas.

---

# Instructions

- Focus only on **Japan** and **South Korea**.
- Decline politely if the user asks about other countries.
- Provide **clear, structured**, and **action-oriented** responses.
- Use **bullet points** and **section titles** for clarity.
- Always include a **checklist** or **next steps** when relevant.
- Maintain a **professional yet warm** tone, showing empathy for the challenges of moving abroad.
- Avoid speculation or personal opinion; base answers on generally available public information.
- Always include a brief **disclaimer** when discussing legal or immigration procedures:  
  "_Note: Always confirm with the latest guidance from the respective embassy or immigration office._"

---

## Behavioral Rules

### Scope of Assistance
You can help users with:
- Visa & work permit preparation  
- Housing and cost-of-living guidance  
- Language learning (Japanese / Korean)  
- Cultural adaptation & work etiquette  
- Pre-departure & first-month checklists  

You **cannot**:
- Give legal or financial advice.  
- Discuss immigration law beyond public information.  
- Provide personalized agency or recruitment recommendations.  
- Advise on countries other than Japan or South Korea.

### Tone and Style
- Professional yet warm and supportive.  
- Use clear bullet lists and section titles.  
- Offer practical steps over theory.  
- Be concise but thorough.

---

## Output Format

Use the following structure for every response:

1. **Short summary or greeting** (one paragraph)  
   Example: "Sure! Here's how you can prepare for a job in Japan."

2. **Organized sections**, each with relevant emoji headers:
   - Visa & Legal  
   - Housing & Cost of Living  
   - Language & Communication  
   - Work Culture & Etiquette  
   - Checklist Before Departure  

3. **Disclaimer or context note**  
   Example: "_Note: Always check the official embassy site for updated visa requirements._"

4. **Closing line**  
   Example: "You're on the right track! Let me know if you want a detailed checklist."

# Final Reminders

- Stay within Japan and South Korea context.  
- If the user asks about another country, reply:
  > "Maaf, Expat AI hanya membantu untuk persiapan kerja ke Jepang dan Korea Selatan."
- Keep responses consistent, structured, and culturally empathetic.
`;

const openai = new OpenAI({
  apiKey: process.env.GPT_5_API_KEY,
  baseURL: process.env.GPT_5_API_URL,
});

// CONSTANTS
const CREDIT_COST_PER_MESSAGE = 10; // 10 credits per chat message

/**
 * Handler untuk mengirim chat message
 * POST /api/chat
 */
export async function handleChatMessage(req: Request, res: Response) {
  try {

    console.log(`[Chat] Dummy handler called: `, req.body);

    let languageInstruction = "\n\nIMPORTANT: ";

    switch (req.body.language) {
      case 'id':
        languageInstruction += "Respond in Indonesian (Bahasa Indonesia).";
        break;
      case 'en':
        languageInstruction += "Respond in English.";
        break;
      case 'ja':
        languageInstruction += "Respond in Japanese (日本語).";
        break;
      case 'ko':
        languageInstruction += "Respond in Korean (한국어).";
        break;
      default:
        break;
    }

    let whichCulture = "";
    let theReflection = "";
    switch (req.body.culture) {
      case 'id':
        whichCulture += "Indonesian";
        theReflection += "Reflect Indonesian values such as gotong royong (mutual cooperation), respect for hierarchy, religion, and harmony in social interactions.";
        break;
      case 'en':
        whichCulture += "English";
        theReflection += "Reflect English values such as directness balanced with tact, equality, fairness, and respect for individualism.";
        break;
      case 'ja':
        whichCulture += "Japanese";
        theReflection += "Reflect Japanese values such as humility, harmony (wa), politeness, and respect for hierarchy.";
        break;
      case 'ko':
        whichCulture += "Korean";
        theReflection += "Reflect Korean values such as respect for elders, collectivism, strong work ethic, education focus, avoiding public confrontation or embarrassment, emotional connection, empathy, loyalty among people, and maintaining social harmony.";
        break;
      default:
        break;
    }

    const EXPAT_AI_DYNAMIC_PROMPT = `You are a ${whichCulture} Culture 
Coach and conversational partner. Your purpose is to help the user understand, practice, and internalize ${whichCulture} 
workplace culture, etiquette, and communication styles through interactive conversation. \n\nGuidelines:\n1. Respond naturally as if you are a ${whichCulture} 
colleague or mentor who has deep knowledge of ${whichCulture} 
business culture.
\n2. Keep the tone polite, calm, and respectful. ${theReflection}
\n3. After each user message, provide two parts:\n   a) A natural conversational reply (short and realistic, like a chat between coworkers).
\n   b) A short “Culture Insight” (1–3 sentences) that explains the ${whichCulture} 
cultural perspective behind your response — for example, etiquette, phrasing, or how ${whichCulture} 
professionals would express that idea politely.\n4. Encourage the user to rephrase their messages in a more culturally appropriate or respectful way when needed, but always explain *why* it’s preferred.\n5. If the user makes a direct or overly casual statement, gently reframe it into a more polite or indirect ${whichCulture}-style 
phrasing.\n6. Avoid lecture-style answers — focus on practical, real-life conversation examples that feel natural.\n
\nExample behavior:\nUser: “Can you help me finish this report quickly?”\nCoach: “Of course! Would you like me to review the draft first?”\nCulture Insight: “In Japan, it’s polite to offer help by suggesting a process rather than agreeing immediately. This shows thoughtfulness and cooperation.”\n\nYour goal is to guide the user toward sounding respectful, cooperative, and culturally sensitive when communicating in or with Japanese workplaces.`;

    const new_EXPAT_AI_PROMPT = `You are a professional Culture Coach AI specialized in workplace communication and behavior. You can only operate within one culture: ${whichCulture}. You must NOT reference or discuss any other cultures outside these one.\n\nWhen explaining expressions or examples from non-English languages (Indonesian, Korean, or Japanese), you must ALWAYS:\n- Provide the **${whichCulture} transliteration** (romanized spelling)\n- Provide the **English translation in parentheses**\n- NEVER leave text in another script without explanation (for example, do not show 수고 많으셨습니다 without adding '(sugo manheushyeotseumnida — you’ve worked hard)')\n\nYour goal is to help users understand, adapt, and respond appropriately according to each culture’s norms in professional settings.\n\nAlways:\n- Explain the cultural reasoning behind each behavior or communication style.\n- Provide practical examples in work-related situations (meetings, feedback, greetings, teamwork, etc.).\n- Use a polite and educational tone.\n- When comparing, emphasize both similarities and differences in ${whichCulture} culture.\n- Avoid stereotypes, and focus on values like ${theReflection}\n- If asked about cultures beyond ${whichCulture} culture, politely decline and remind the user that your scope is limited.\n\nYour answer format:\n1. Cultural Context: Explain the cultural background.\n2. Recommended Behavior or Phrasing: Give practical workplace examples.\n3. Key Values: Mention core values (e.g., harmony, respect, individualism).\n\nExample:\nSituation: Giving feedback to a senior colleague.\nJapan: Use indirect and respectful phrasing (e.g., 'Perhaps we could consider another approach'). Values: hierarchy, humility, harmony.\nKorea: Show deference; avoid direct criticism. Values: respect, collectivism, harmony.\nIndonesia: Use a soft tone and gratitude before feedback. Values: respect, tolerance, rukun.\nEnglish: Be direct yet polite (e.g., 'I think there’s a better way'). Values: clarity, equality, individualism.`;



    const apiMessages = [
      { role: "system", content: new_EXPAT_AI_PROMPT },
      { role: req.body.role, content: req.body.message + languageInstruction },
      // ...conversationHistory,
    ];

    const startTime = Date.now();
    const completion = await openai.chat.completions.create({
      model: process.env.GPT_5_MODEL || "",
      messages: apiMessages as any,
    });

    const aiReply = completion.choices[0]?.message?.content ||
      "Maaf, saya tidak bisa memproses permintaan Anda saat ini.";

    const duration = Date.now() - startTime;
    console.log(`[Chat] AI responded in ${duration}ms`);

    // STEP 12: Return response
    res.json({
      reply: aiReply,
      sessionId: "dummy-session-id-007",
      creditsRemaining: 100,
      creditsUsed: CREDIT_COST_PER_MESSAGE,
    });

  } catch (error: any) {
    console.error("[Chat Error]:", error);

    // Handle OpenAI API errors
    if (error.status === 401) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "AI service configuration error. Please contact administrator."
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests to AI service. Please try again later."
      });
    }

    // Generic error
    res.status(500).json({
      error: "Failed to process chat message",
      message: error.message || "An unexpected error occurred",
    });
  }
}

/**
 * Handler untuk mengirim chat message
 * POST /api/chat
 *
export async function handleChatMessage(req: Request, res: Response) {
  try {
    // STEP 1: Validate authentication (req.user diset oleh authenticateToken middleware)
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please login to use chat feature"
      });
    }

    const userId = req.user.id;
    const { message, sessionId } = req.body;

    // STEP 2: Validate request body
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({
        error: "Invalid message",
        message: "Message is required and must be a non-empty string"
      });
    }

    console.log(`[Chat] User ${req.user.email} sending message to session ${sessionId || "new"}`);

    // STEP 3: Get user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "User does not exist in database"
      });
    }

    // STEP 4: Check if user has enough credits
    if (user.credits < CREDIT_COST_PER_MESSAGE) {
      return res.status(403).json({
        error: "Insufficient credits",
        message: `You need at least ${CREDIT_COST_PER_MESSAGE} credits to send a message. Please purchase more credits.`,
        creditsNeeded: CREDIT_COST_PER_MESSAGE,
        currentCredits: user.credits
      });
    }

    // STEP 5: Get or create chat session
    let session;
    if (sessionId) {
      // Load existing session
      session = await ChatSession.findOne({ sessionId, userId });
      if (!session) {
        return res.status(404).json({
          error: "Session not found",
          message: "The specified session does not exist or does not belong to you"
        });
      }
    } else {
      // Create new session
      const newSessionId = uuidv4();
      // Generate title from first message (take first 50 chars)
      const title = message.length > 50
        ? message.substring(0, 50) + "..."
        : message;

      session = new ChatSession({
        userId,
        sessionId: newSessionId,
        title,
        messages: [],
      });

      console.log(`[Chat] Created new session: ${newSessionId}`);
    }

    // STEP 6: Add user message to session
    const userMessage = {
      role: "user" as const,
      content: message.trim(),
      timestamp: new Date(),
    };
    session.messages.push(userMessage);

    // STEP 7: Prepare messages for AI (include conversation history)
    const conversationHistory = session.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const apiMessages = [
      { role: "system", content: EXPAT_AI_PROMPT },
      ...conversationHistory,
    ];

    console.log(`[Chat] Calling AI with ${conversationHistory.length} messages in history`);

    // STEP 8: Call AI API
    const startTime = Date.now();
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: apiMessages as any,
    });

    const aiReply = completion.choices[0]?.message?.content ||
      "Maaf, saya tidak bisa memproses permintaan Anda saat ini.";

    const duration = Date.now() - startTime;
    console.log(`[Chat] AI responded in ${duration}ms`);

    // STEP 9: Add AI response to session
    const aiMessage = {
      role: "assistant" as const,
      content: aiReply,
      timestamp: new Date(),
    };
    session.messages.push(aiMessage);

    // STEP 10: Deduct credits
    user.credits -= CREDIT_COST_PER_MESSAGE;
    console.log(`[Chat] Credits deducted: ${user.credits + CREDIT_COST_PER_MESSAGE} → ${user.credits}`);

    // STEP 11: Save everything to database
    await Promise.all([
      session.save(),
      user.save(),
    ]);

    console.log(`[Chat] Session saved with ${session.messages.length} messages`);

    // STEP 12: Return response
    res.json({
      reply: aiReply,
      sessionId: session.sessionId,
      creditsRemaining: user.credits,
      creditsUsed: CREDIT_COST_PER_MESSAGE,
    });

  } catch (error: any) {
    console.error("[Chat Error]:", error);

    // Handle OpenAI API errors
    if (error.status === 401) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "AI service configuration error. Please contact administrator."
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests to AI service. Please try again later."
      });
    }

    // Generic error
    res.status(500).json({
      error: "Failed to process chat message",
      message: error.message || "An unexpected error occurred",
    });
  }
}
*/

/**
 * Get all chat sessions for logged-in user
 * GET /api/chat/sessions
 */
export async function getChatSessions(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const sessions = await ChatSession.find({ userId: req.user.id })
      .sort({ updatedAt: -1 })  // Sort by most recent first
      .select("sessionId title createdAt updatedAt messages")  // Only return needed fields
      .lean();  // Return plain JS objects (faster)

    // Add message count to each session
    const sessionsWithCount = sessions.map(session => ({
      sessionId: session.sessionId,
      title: session.title,
      messageCount: session.messages.length,
      lastMessageAt: session.messages[session.messages.length - 1]?.timestamp || session.updatedAt,
      createdAt: session.createdAt,
    }));

    res.json({ sessions: sessionsWithCount });

  } catch (error: any) {
    console.error("[Get Sessions Error]:", error);
    res.status(500).json({
      error: "Failed to fetch sessions",
      message: error.message
    });
  }
}

/**
 * Get specific chat session with all messages
 * GET /api/chat/sessions/:sessionId
 */
export async function getChatSession(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { sessionId } = req.params;

    const session = await ChatSession.findOne({
      sessionId,
      userId: req.user.id
    }).lean();

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
        message: "The specified session does not exist or does not belong to you"
      });
    }

    res.json({ session });

  } catch (error: any) {
    console.error("[Get Session Error]:", error);
    res.status(500).json({
      error: "Failed to fetch session",
      message: error.message
    });
  }
}

/**
 * Create a new chat session
 * POST /api/chat/sessions
 */
export async function createChatSession(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title } = req.body;

    const newSessionId = uuidv4();
    const session = new ChatSession({
      userId: req.user.id,
      sessionId: newSessionId,
      title: title || "New Conversation",
      messages: [],
    });

    await session.save();

    console.log(`[Chat] New session created: ${newSessionId}`);

    res.status(201).json({
      sessionId: session.sessionId,
      title: session.title,
      createdAt: session.createdAt,
    });

  } catch (error: any) {
    console.error("[Create Session Error]:", error);
    res.status(500).json({
      error: "Failed to create session",
      message: error.message
    });
  }
}

/**
 * Delete a chat session
 * DELETE /api/chat/sessions/:sessionId
 */
export async function deleteChatSession(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { sessionId } = req.params;

    const result = await ChatSession.deleteOne({
      sessionId,
      userId: req.user.id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Session not found",
        message: "The specified session does not exist or does not belong to you"
      });
    }

    console.log(`[Chat] Session deleted: ${sessionId}`);

    res.json({
      message: "Session deleted successfully",
      sessionId
    });

  } catch (error: any) {
    console.error("[Delete Session Error]:", error);
    res.status(500).json({
      error: "Failed to delete session",
      message: error.message
    });
  }
}