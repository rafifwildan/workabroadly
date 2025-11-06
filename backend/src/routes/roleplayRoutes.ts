import express, { Router } from "express";
import {
  startRoleplay,
  answerScene,
  endRoleplay,
  getUserRoleplays,
  getSessionById,
} from "../controllers/roleplayController.js";
import { getUserProgress } from "../controllers/progressController.js";

const router: Router = express.Router();

// 🚀 Mulai sesi roleplay baru
router.post("/start", startRoleplay);

// 💬 Kirim jawaban user untuk 1 scene
router.post("/answer", answerScene);

// 🏁 Akhiri sesi roleplay
router.post("/end", endRoleplay);

// 🔍 Ambil detail session berdasarkan ID
router.get("/session/:sessionId", getSessionById);

// ⚠️ PENTING: taruh progress dahulu sebelum "/:userId" agar tidak bentrok
// 📊 Ambil progress user
router.get("/progress/:userId", getUserProgress);

// 📜 Ambil semua sesi roleplay milik user
router.get("/:userId", getUserRoleplays);

export default router;
