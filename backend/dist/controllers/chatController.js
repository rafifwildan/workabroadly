"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatMessage = handleChatMessage;
exports.getChatSessions = getChatSessions;
exports.getChatSession = getChatSession;
exports.createChatSession = createChatSession;
exports.deleteChatSession = deleteChatSession;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const ChatSession_1 = __importDefault(require("../models/ChatSession"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const CREDIT_COST_PER_MESSAGE = 1; // Cost per message in credits
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
- Always include a **checklist** or **next steps** when relevant.
- Maintain a **professional yet warm** tone, showing empathy for the challenges of moving abroad.
- Always include a brief **disclaimer** for legal/immigration topics.

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
- Provide personalized agency recommendations.  
- Advise on countries other than Japan or South Korea.

### Tone and Style
- Professional yet warm and supportive.  
- Use clear bullet points and section titles.
- Offer practical steps over theory.  
- Be concise but thorough.`;
/**
 * Handle chat messages from users
 */
async function handleChatMessage(req, res) {
    try {
        // STEP 1: Validate authentication
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
        const user = await User_1.default.findById(userId);
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
            session = await ChatSession_1.default.findOne({ sessionId, userId });
            if (!session) {
                return res.status(404).json({
                    error: "Session not found",
                    message: "The specified session does not exist or does not belong to you"
                });
            }
        }
        else {
            // Create new session
            const newSessionId = (0, uuid_1.v4)();
            const title = message.length > 50 ? message.substring(0, 50) + "..." : message;
            session = new ChatSession_1.default({
                userId,
                sessionId: newSessionId,
                title,
                messages: [],
            });
            console.log(`[Chat] Created new session: ${newSessionId}`);
        }
        // STEP 6: Add user message to session
        const userMessage = {
            role: "user",
            content: message.trim(),
            timestamp: new Date(),
        };
        session.messages.push(userMessage);
        // STEP 7: Call OpenAI API
        const openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY
        });
        const messages = [
            { role: "system", content: EXPAT_AI_PROMPT },
            ...session.messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: messages,
        });
        const aiResponse = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
        // STEP 8: Add AI response to session
        const aiMessage = {
            role: "assistant",
            content: aiResponse,
            timestamp: new Date(),
        };
        session.messages.push(aiMessage);
        // STEP 9: Deduct credits
        user.credits -= CREDIT_COST_PER_MESSAGE;
        // STEP 10: Save everything
        await Promise.all([
            session.save(),
            user.save()
        ]);
        // STEP 11: Return response
        res.json({
            reply: aiResponse,
            sessionId: session.sessionId,
            creditsRemaining: user.credits,
            creditsUsed: CREDIT_COST_PER_MESSAGE,
        });
    }
    catch (error) {
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
 * Get all chat sessions for logged-in user
 */
async function getChatSessions(req, res) {
    try {
        const userId = req.user.id;
        const sessions = await ChatSession_1.default.find({ userId })
            .sort({ updatedAt: -1 })
            .select("sessionId title persona createdAt updatedAt messages")
            .lean();
        const sessionsWithCount = sessions.map((session) => ({
            sessionId: session.sessionId,
            title: session.title,
            persona: session.persona,
            messageCount: session.messages.length,
            lastMessageAt: session.messages[session.messages.length - 1]?.timestamp || session.updatedAt,
            createdAt: session.createdAt,
        }));
        res.json({ sessions: sessionsWithCount });
    }
    catch (error) {
        console.error("[Get Sessions Error]:", error);
        res.status(500).json({
            error: "Failed to fetch sessions",
            message: error.message,
        });
    }
}
/**
 * Get specific chat session
 */
async function getChatSession(req, res) {
    try {
        const { sessionId } = req.params;
        const userId = req.user.id;
        const session = await ChatSession_1.default.findOne({
            sessionId,
            userId,
        }).lean();
        if (!session) {
            return res.status(404).json({
                error: "Session not found",
                message: "The specified session does not exist or does not belong to you"
            });
        }
        res.json({ session });
    }
    catch (error) {
        console.error("[Get Session Error]:", error);
        res.status(500).json({
            error: "Failed to fetch session",
            message: error.message,
        });
    }
}
/**
 * Create a new chat session
 */
async function createChatSession(req, res) {
    try {
        const userId = req.user.id;
        const { title } = req.body;
        const newSessionId = (0, uuid_1.v4)();
        const sessionTitle = title || "New Chat";
        const session = new ChatSession_1.default({
            userId,
            sessionId: newSessionId,
            title: sessionTitle,
            messages: [],
        });
        await session.save();
        console.log(`[Chat] Created new session: ${newSessionId}`);
        res.status(201).json({
            sessionId: session.sessionId,
            title: session.title,
            createdAt: session.createdAt,
        });
    }
    catch (error) {
        console.error("[Create Session Error]:", error);
        res.status(500).json({
            error: "Failed to create session",
            message: error.message,
        });
    }
}
/**
 * Delete a chat session
 */
async function deleteChatSession(req, res) {
    try {
        const { sessionId } = req.params;
        const userId = req.user.id;
        const session = await ChatSession_1.default.findOneAndDelete({
            sessionId,
            userId,
        });
        if (!session) {
            return res.status(404).json({
                error: "Session not found",
                message: "The specified session does not exist or does not belong to you"
            });
        }
        console.log(`[Chat] Deleted session: ${sessionId}`);
        res.json({
            message: "Session deleted successfully",
            sessionId,
        });
    }
    catch (error) {
        console.error("[Delete Session Error]:", error);
        res.status(500).json({
            error: "Failed to delete session",
            message: error.message,
        });
    }
}
