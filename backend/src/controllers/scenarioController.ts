import type { Request, Response } from "express";
import RoleplayScenario from "../models/RoleplayScenario.js";

export async function getAllScenarios(req: Request, res: Response) {
  const scenarios = await RoleplayScenario.find().sort({ createdAt: -1 });
  res.json(scenarios);
}

export async function getScenarioById(req: Request, res: Response) {
  const scenario = await RoleplayScenario.findById(req.params.id);
  if (!scenario) return res.status(404).json({ error: "Scenario not found" });
  res.json(scenario);
}

export async function createScenario(req: Request, res: Response) {
  const newScenario = await RoleplayScenario.create(req.body);
  res.status(201).json(newScenario);
}
