import type { Request, Response } from "express";
import RoleplayScenario from "../models/RoleplayScenario.js";

// ============================================================
// GET /api/scenarios - Get all scenarios (with optional filters)
// ============================================================
export async function getAllScenarios(req: Request, res: Response) {
  try {
    const culture = req.query.culture as string; // e.g. "japanese" | "korean"
    const language = req.query.language as string; // e.g. "english"

    const filter: any = {};
    if (culture) filter.culture = culture;
    if (language) filter.language = language;

    const scenarios = await RoleplayScenario.find(filter).sort({ createdAt: -1 });
    console.log(`✅ Retrieved ${scenarios.length} scenario(s)`);

    res.json(scenarios);
  } catch (err: any) {
    console.error("❌ [getAllScenarios] Error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
}

// ============================================================
// GET /api/scenarios/:id - Get one scenario by ID
// ============================================================
export async function getScenarioById(req: Request, res: Response) {
  try {
    const scenario = await RoleplayScenario.findById(req.params.id);
    if (!scenario) return res.status(404).json({ error: "Scenario not found" });

    console.log(`✅ Scenario retrieved: ${scenario.title}`);
    res.json(scenario);
  } catch (err: any) {
    console.error("❌ [getScenarioById] Error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
}

// ============================================================
// POST /api/scenarios - Create new scenario
// ============================================================
export async function createScenario(req: Request, res: Response) {
  try {
    const newScenario = await RoleplayScenario.create(req.body);
    console.log(`✅ Scenario created: ${newScenario.title}`);
    res.status(201).json(newScenario);
  } catch (err: any) {
    console.error("❌ [createScenario] Error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
