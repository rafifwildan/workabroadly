import express from "express";
import {
  startRoleplay,
  answerScene,
  endRoleplay,
  getUserRoleplays,
  getSessionById,
} from "../controllers/roleplayController.js";
import { getUserProgress } from "../controllers/progressController.js";

const router = express.Router();

// 🚀 Mulai sesi roleplay
router.post("/start", startRoleplay);

// 💬 Jawab satu scene
router.post("/answer", answerScene);

// 🏁 Akhiri sesi roleplay
router.post("/end", endRoleplay);

// 🔍 Ambil data session tertentu
router.get("/session/:sessionId", getSessionById);

// 📜 Ambil semua sesi roleplay milik user
router.get("/:userId", getUserRoleplays);

// 📊 Ambil progress user
router.get("/progress/:userId", getUserProgress);

export default router;
