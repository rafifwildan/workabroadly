import { Router } from "express"
import { handleChatMessage } from "../controllers/chatController"

const router = Router()

// POST /api/chat - Handle chat messages
router.post("/", handleChatMessage)

export default router
