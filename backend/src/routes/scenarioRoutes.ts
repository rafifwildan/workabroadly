import express from "express";
import {
  getAllScenarios,
  getScenarioById,
  createScenario,
} from "../controllers/scenarioController.js";

const router = express.Router();

// 🧭 Get all scenarios (optional filter: culture, language)
router.get("/", getAllScenarios);

// 🌏 Get all scenarios by culture (e.g., /api/scenarios/culture/japanese)
router.get("/culture/:culture", getAllScenarios);

// 🔍 Get specific scenario by ID
router.get("/:id", getScenarioById);

// ✏️ Create new scenario
router.post("/", createScenario);

export default router;
