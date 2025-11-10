"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Apply authentication middleware to ALL chat routes
router.use(auth_1.authenticateToken);
// POST /api/chat - Send a chat message (create or continue conversation)
router.post("/", chatController_1.handleChatMessage);
// GET /api/chat/sessions - Get all chat sessions for logged-in user
router.get("/sessions", chatController_1.getChatSessions);
// GET /api/chat/sessions/:sessionId - Get specific session with all messages
router.get("/sessions/:sessionId", chatController_1.getChatSession);
// POST /api/chat/sessions - Create a new chat session
router.post("/sessions", chatController_1.createChatSession);
// DELETE /api/chat/sessions/:sessionId - Delete a chat session
router.delete("/sessions/:sessionId", chatController_1.deleteChatSession);
exports.default = router;
