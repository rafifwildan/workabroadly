import type { Request, Response } from "express";
import RoleplayScenario from "../models/RoleplayScenario.js";

// ============================================================
// GET /api/scenarios - Get all scenarios with filtering
// ============================================================
export async function getAllScenarios(req: Request, res: Response) {
  try {
    // ===== QUERY PARAMETERS FOR FILTERING =====
    const language = req.query.language as string; // "japanese" | "korean"
    const category = req.query.category as string; // "interview" | "workplace" | "daily"
    const difficulty = req.query.difficulty as string; // "beginner" | "intermediate" | "advanced"

    // Build filter query
    const filter: any = {};
    if (language) {
      filter.language = language;
    }
    if (category) {
      filter.category = category;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // ===== GET SCENARIOS WITH FILTERS =====
    const scenarios = await RoleplayScenario.find(filter).sort({
      createdAt: -1,
    });

    // ===== LOG SUCCESS =====
    console.log(
      `✅ Scenarios retrieved: ${scenarios.length} items (filters: ${JSON.stringify(filter)})`
    );

    // ===== RESPONSE =====
    res.json(scenarios);
  } catch (error: any) {
    console.error("❌ Get scenarios error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
}

// ============================================================
// GET /api/scenarios/:id - Get scenario by ID
// ============================================================
export async function getScenarioById(req: Request, res: Response) {
  try {
    const scenario = await RoleplayScenario.findById(req.params.id);

    if (!scenario) {
      return res.status(404).json({ error: "Scenario not found" });
    }

    // ===== LOG SUCCESS =====
    console.log(`✅ Scenario retrieved: ${scenario.title}`);

    // ===== RESPONSE =====
    res.json(scenario);
  } catch (error: any) {
    console.error("❌ Get scenario by ID error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
}

// ============================================================
// POST /api/scenarios - Create new scenario
// ============================================================
export async function createScenario(req: Request, res: Response) {
  try {
    const newScenario = await RoleplayScenario.create(req.body);

    // ===== LOG SUCCESS =====
    console.log(`✅ Scenario created: ${newScenario.title}`);

    // ===== RESPONSE =====
    res.status(201).json(newScenario);
  } catch (error: any) {
    console.error("❌ Create scenario error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
}