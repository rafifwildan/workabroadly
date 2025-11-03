import { Router } from "express";
import { 
  handleChatMessage, 
  getChatSessions, 
  getChatSession,
  createChatSession,
  deleteChatSession
} from "../controllers/chatController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Apply authentication middleware to ALL chat routes
router.use(authenticateToken);

// POST /api/chat - Send a chat message (create or continue conversation)
router.post("/", handleChatMessage);

// GET /api/chat/sessions - Get all chat sessions for logged-in user
router.get("/sessions", getChatSessions);

// GET /api/chat/sessions/:sessionId - Get specific session with all messages
router.get("/sessions/:sessionId", getChatSession);

// POST /api/chat/sessions - Create a new chat session
router.post("/sessions", createChatSession);

// DELETE /api/chat/sessions/:sessionId - Delete a chat session
router.delete("/sessions/:sessionId", deleteChatSession);

export default router;