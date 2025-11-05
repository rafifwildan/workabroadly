import mongoose from "mongoose";
import type { Request, Response } from "express";
import RoleplayScenario from "../models/RoleplayScenario.js";
import RoleplaySession from "../models/RoleplaySession.js";
import UserProgress from "../models/UserProgress.js";

// ===============================================================
// 🧩 Helper: Normalisasi ID
// ===============================================================
function normalizeId(input: any) {
  if (!input) return null;
  const rawId = input.id || input._id || input.scenarioId || input;
  if (!rawId) return null;

  return mongoose.Types.ObjectId.isValid(rawId)
    ? new mongoose.Types.ObjectId(rawId)
    : rawId;
}

// ===============================================================
// 🚀 START ROLEPLAY
// ===============================================================
export async function startRoleplay(req: Request, res: Response) {
  try {
    const { userId, scenarioId } = req.body;

    if (!userId || !scenarioId)
      return res.status(400).json({ error: "Missing userId or scenarioId" });

    const validId = normalizeId(scenarioId);
    const scenario = await RoleplayScenario.findById(validId);
    if (!scenario) return res.status(404).json({ error: "Scenario not found" });

    // 🔁 Ambil atau buat progress user
    let progress = await UserProgress.findOne({ userId });
    if (!progress) progress = await UserProgress.create({ userId });

    // 💾 Buat session baru
    const session = await RoleplaySession.create({
      progressId: progress._id,
      scenarioId: scenario._id,
      answers: [],
      completed: false,
      startedAt: new Date(),
    });

    console.log(`🟢 New roleplay session started for user ${userId}`);
    res.status(200).json({
      sessionId: session._id,
      scenarioTitle: scenario.title,
      culture: scenario.culture,
      totalScenes: scenario.scenes.length,
    });
  } catch (err: any) {
    console.error("❌ [startRoleplay] Error:", err);
    res.status(500).json({
      error: "Server error",
      message: err.message || "Unexpected server error",
    });
  }
}

// ===============================================================
// 💬 ANSWER SCENE
// ===============================================================
export async function answerScene(req: Request, res: Response) {
  try {
    const { sessionId, sceneOrder, selectedOption } = req.body;

    if (!sessionId || sceneOrder == null || !selectedOption) {
      return res.status(400).json({
        error: "Missing required fields: sessionId, sceneOrder, selectedOption",
      });
    }

    const session = await RoleplaySession.findById(sessionId);
    if (!session) return res.status(404).json({ error: "Session not found" });

    const scenarioId = normalizeId(session.scenarioId);
    const scenario = await RoleplayScenario.findById(scenarioId);
    if (!scenario) return res.status(404).json({ error: "Scenario not found" });

    // Cari scene berdasarkan order
    const scene = scenario.scenes.find((s: any) => s.order === sceneOrder);
    if (!scene) return res.status(400).json({ error: "Invalid scene" });

    // Cari option yang dipilih
    const option = scene.options.find((o: any) => o.text === selectedOption);
    if (!option)
      return res.status(400).json({ error: "Invalid option selected" });

    // Simpan jawaban user
    session.answers.push({
      sceneOrder,
      selectedOption,
      note: option.note,
    });
    await session.save();

    // Tentukan apakah ini scene terakhir
    const isLastScene = sceneOrder >= scenario.scenes.length;

    res.json({
      message: "Answer recorded",
      feedback: option.note,
      culturalInsight: scene.insight,
      nextScene: isLastScene ? null : sceneOrder + 1,
      isLastScene,
    });
  } catch (err: any) {
    console.error("❌ [answerScene] Error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
}

// ===============================================================
// 🏁 END ROLEPLAY
// ===============================================================
export async function endRoleplay(req: Request, res: Response) {
  try {
    const { sessionId } = req.body;
    if (!sessionId)
      return res.status(400).json({ error: "Missing sessionId" });

    const session = await RoleplaySession.findByIdAndUpdate(
      sessionId,
      { completed: true, endedAt: new Date() },
      { new: true }
    );
    if (!session) return res.status(404).json({ error: "Session not found" });

    const progress = await UserProgress.findById(session.progressId);
    if (progress) {
      progress.totalSessions += 1;
      if (!progress.completedScenarios.includes(session.scenarioId)) {
        progress.completedScenarios.push(session.scenarioId);
      }
      progress.lastUpdated = new Date();
      await progress.save();
    }

    res.json({ message: "Session ended successfully", session });
  } catch (err: any) {
    console.error("❌ [endRoleplay] Error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
}

// ===============================================================
// 📜 GET USER ROLEPLAY HISTORY
// ===============================================================
export async function getUserRoleplays(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.status(400).json({ error: "Missing userId in params" });

    const progress = await UserProgress.findOne({ userId });
    if (!progress) return res.json([]);

    const sessions = await RoleplaySession.find({
      progressId: progress._id,
    }).sort({ startedAt: -1 });

    res.json(sessions);
  } catch (e: any) {
    console.error("❌ [getUserRoleplays] Error:", e);
    res.status(500).json({ error: "Server error", message: e.message });
  }
}

// ===============================================================
// 🔍 GET SESSION BY ID
// ===============================================================
export async function getSessionById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing session ID" });

    const session = await RoleplaySession.findById(id);
    if (!session)
      return res.status(404).json({ error: "Session not found" });

    res.json(session);
  } catch (e: any) {
    console.error("❌ [getSessionById] Error:", e);
    res.status(500).json({ error: "Server error", message: e.message });
  }
}
