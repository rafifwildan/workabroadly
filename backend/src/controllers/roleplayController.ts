import type { Request, Response } from "express";
import RoleplayScenario from "../models/RoleplayScenario.js";
import RoleplaySession from "../models/RoleplaySession.js";
import UserProgress from "../models/UserProgress.js";

export async function startRoleplay(req: Request, res: Response) {
  const { userId, scenarioId } = req.body;
  if (!userId || !scenarioId)
    return res.status(400).json({ error: "Missing userId or scenarioId" });

  // Cari progress user (buat kalau belum ada)
  let progress = await UserProgress.findOne({ userId });
  if (!progress) progress = await UserProgress.create({ userId });

  // Buat session baru yang nempel ke progress
  const session = await RoleplaySession.create({
    progressId: progress._id,
    scenarioId,
    answers: [],
    totalScore: 0,
  });

  res.json(session);
}

export async function answerStep(req: Request, res: Response) {
  const { sessionId, stepId, selectedOption } = req.body;
  const session = await RoleplaySession.findById(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const scenario = await RoleplayScenario.findById(session.scenarioId);
  const step = scenario?.steps.find(s => s.id === stepId);
  const option = step?.options?.find(o => o.text === selectedOption);

  if (!option) return res.status(400).json({ error: "Invalid option" });

  session.answers.push({ stepId, selectedOption, score: option.score, feedback: option.feedback });
  session.totalScore += option.score;
  await session.save();

  res.json({ feedback: option.feedback, totalScore: session.totalScore });
}

export async function endRoleplay(req: Request, res: Response) {
  const { sessionId } = req.body;
  const session = await RoleplaySession.findByIdAndUpdate(
    sessionId,
    { completed: true, endedAt: new Date() },
    { new: true }
  );
  if (!session) return res.status(404).json({ error: "Session not found" });

  // Ambil progress terkait
  const progress = await UserProgress.findById(session.progressId);
  if (!progress) return res.status(404).json({ error: "User progress not found" });

  progress.totalSessions += 1;
  progress.totalScore += session.totalScore;
  if (!progress.completedScenarios.includes(session.scenarioId))
    progress.completedScenarios.push(session.scenarioId);
  progress.lastUpdated = new Date();
  await progress.save();

  res.json(session);
}

export async function getUserRoleplays(req: Request, res: Response) {
  const { userId } = req.params;
  const sessions = await RoleplaySession.find({ userId }).sort({ startedAt: -1 });
  res.json(sessions);
}
