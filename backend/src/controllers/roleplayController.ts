import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import RoleplayScenario from "../models/RoleplayScenario.js";
import RoleplaySession from "../models/RoleplaySession.js";
import UserProgress from "../models/UserProgress.js";

/**
 * Helper: Normalisasi ID dari berbagai bentuk (string | ObjectId | object)
 */
function normalizeId(input: any): Types.ObjectId | string | null {
  if (!input) return null;
  const rawId = input?.id ?? input?._id ?? input?.scenarioId ?? input;

  if (!rawId) return null;
  return Types.ObjectId.isValid(rawId) ? new mongoose.Types.ObjectId(rawId) : rawId;
}

/**
 * 🚀 START ROLEPLAY
 * body: { userId: string, scenarioId: string }
 */
export async function startRoleplay(req: Request, res: Response) {
  try {
    const { userId, scenarioId } = req.body as { userId?: string; scenarioId?: string };

    if (!userId || !scenarioId) {
      return res.status(400).json({ error: "Missing userId or scenarioId" });
    }

    const validScenarioId = normalizeId(scenarioId);
    const scenario: any = await RoleplayScenario.findById(validScenarioId);
    if (!scenario) {
      return res.status(404).json({ error: "Scenario not found" });
    }

    // Ambil atau buat progress user
    let progress: any = await UserProgress.findOne({ userId });
    if (!progress) progress = await UserProgress.create({ userId });

    // Buat session baru
    const session: any = await RoleplaySession.create({
      progressId: progress._id,
      scenarioId: scenario._id,
      answers: [],
      completed: false,
      startedAt: new Date(),
    });

    // Optional log
    console.log(`🟢 New roleplay session started for user ${userId} — scenario ${scenario.title}`);

    return res.status(200).json({
      sessionId: session._id,
      scenarioTitle: scenario.title,
      culture: scenario.culture,
      totalScenes: Array.isArray(scenario.scenes) ? scenario.scenes.length : 0,
    });
  } catch (err: any) {
    console.error("❌ [startRoleplay] Error:", err);
    return res.status(500).json({
      error: "Server error",
      message: err?.message ?? "Unexpected server error",
    });
  }
}

/**
 * 💬 ANSWER SCENE
 * body: { sessionId: string, sceneOrder: number, selectedOption: string }
 * response: { feedback, culturalInsight, nextScene, isLastScene }
 */
export async function answerScene(req: Request, res: Response) {
  try {
    const { sessionId, sceneOrder, selectedOption } = req.body as {
      sessionId?: string;
      sceneOrder?: number;
      selectedOption?: string;
    };

    if (!sessionId || sceneOrder == null || !selectedOption) {
      return res
        .status(400)
        .json({ error: "Missing required fields: sessionId, sceneOrder, selectedOption" });
    }

    const session: any = await RoleplaySession.findById(sessionId);
    if (!session) return res.status(404).json({ error: "Session not found" });

    const scenarioId = normalizeId(session.scenarioId);
    const scenario: any = await RoleplayScenario.findById(scenarioId);
    if (!scenario) return res.status(404).json({ error: "Scenario not found" });

    const scenes: any[] = Array.isArray(scenario.scenes) ? scenario.scenes : [];
    const scene: any = scenes.find((s) => s.order === sceneOrder);
    if (!scene) return res.status(400).json({ error: "Invalid scene" });

    const option: any = (scene.options || []).find((o: any) => o.text === selectedOption);
    if (!option) return res.status(400).json({ error: "Invalid option selected" });

    // Simpan jawaban user pada session
    session.answers.push({
      sceneOrder,
      selectedOption,
      note: option.note,
    });
    await session.save();

    const totalScenes = scenes.length;
    const isLastScene = sceneOrder >= totalScenes;
    const nextScene = isLastScene ? null : sceneOrder + 1;

    return res.status(200).json({
      message: "Answer recorded successfully",
      feedback: option.note || "Good answer!",
      culturalInsight: scene.insight || "",
      nextScene,
      isLastScene,
    });
  } catch (err: any) {
    console.error("❌ [answerScene] Error:", err);
    return res.status(500).json({ error: "Server error", message: err?.message });
  }
}

/**
 * 🏁 END ROLEPLAY
 * body: { sessionId: string }
 */
export async function endRoleplay(req: Request, res: Response) {
  try {
    const { sessionId } = req.body as { sessionId?: string };
    if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

    const session: any = await RoleplaySession.findByIdAndUpdate(
      sessionId,
      { completed: true, endedAt: new Date() },
      { new: true }
    );
    if (!session) return res.status(404).json({ error: "Session not found" });

    // Update progress
    const progress: any = await UserProgress.findById(session.progressId);
    if (progress) {
      progress.totalSessions = (progress.totalSessions ?? 0) + 1;
      const scenarioIdStr = String(session.scenarioId);
      const list = (progress.completedScenarios ?? []).map(String);
      if (!list.includes(scenarioIdStr)) {
        progress.completedScenarios.push(session.scenarioId);
      }
      progress.lastUpdated = new Date();
      await progress.save();
    }

    return res.json({ message: "Session ended successfully", session });
  } catch (err: any) {
    console.error("❌ [endRoleplay] Error:", err);
    return res.status(500).json({ error: "Server error", message: err?.message });
  }
}

/**
 * 📜 GET USER ROLEPLAY HISTORY
 * params: { userId }
 */
export async function getUserRoleplays(req: Request, res: Response) {
  try {
    const { userId } = req.params as { userId?: string };
    if (!userId) return res.status(400).json({ error: "Missing userId in params" });

    const progress: any = await UserProgress.findOne({ userId });
    if (!progress) return res.json([]);

    const sessions = await RoleplaySession.find({ progressId: progress._id }).sort({
      startedAt: -1,
    });

    return res.json(sessions);
  } catch (e: any) {
    console.error("❌ [getUserRoleplays] Error:", e);
    return res.status(500).json({ error: "Server error", message: e?.message });
  }
}

/**
 * 🔍 GET SESSION BY ID
 * route: GET /roleplay/session/:sessionId
 */
export async function getSessionById(req: Request, res: Response) {
  try {
    // ⚠️ gunakan nama param yang benar (sessionId), bukan "id"
    const { sessionId } = req.params as { sessionId?: string };
    if (!sessionId) return res.status(400).json({ error: "Missing session ID" });

    const session = await RoleplaySession.findById(sessionId);
    if (!session) return res.status(404).json({ error: "Session not found" });

    return res.json(session);
  } catch (e: any) {
    console.error("❌ [getSessionById] Error:", e);
    return res.status(500).json({ error: "Server error", message: e?.message });
  }
}