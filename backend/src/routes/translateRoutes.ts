import express from "express";
import { handleTranslation } from "../controllers/translateController.js";
import { authenticateToken } from "../middleware/auth"; // kalau kamu pakai auth

const router = express.Router();

// Translate route (protected)
router.post("/",  handleTranslation);

export default router;
// authenticateToken,