import express from "express";
import { getAllScenarios, getScenarioById, createScenario } from "../controllers/scenarioController.js";

const router = express.Router();

router.get("/", getAllScenarios);
router.get("/:id", getScenarioById);
router.post("/", createScenario);

export default router;
