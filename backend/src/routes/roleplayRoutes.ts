import express from "express";
import { startRoleplay, answerStep, endRoleplay, getUserRoleplays } from "../controllers/roleplayController.js";
import { getUserProgress } from "../controllers/progressController.js";

const router = express.Router();

router.post("/start", startRoleplay);
router.post("/answer", answerStep);
router.post("/end", endRoleplay);
router.get("/:userId", getUserRoleplays);
router.get("/progress/:userId", getUserProgress);

export default router;
