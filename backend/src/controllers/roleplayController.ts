import mongoose from "mongoose"
import type { Request, Response } from "express"
import RoleplayScenario from "../models/RoleplayScenario.js"
import RoleplaySession from "../models/RoleplaySession.js"
import UserProgress from "../models/UserProgress.js"

// ===============================================================
// 🔧 Fungsi normalisasi ID — cegah error cast ObjectId
// ===============================================================
function normalizeId(input: any) {
  if (!input) return null
  const rawId = input.id || input._id || input.scenarioId || input
  if (!rawId) return null

  // Kembalikan ObjectId kalau valid, kalau nggak biarin string biasa
  return mongoose.Types.ObjectId.isValid(rawId)
    ? new mongoose.Types.ObjectId(rawId)
    : rawId
}

// ===============================================================
// 🚀 START ROLEPLAY (FINAL FIXED VERSION)
// ===============================================================
export async function startRoleplay(req: Request, res: Response) {
  try {
    const { userId, scenarioId, id, _id } = req.body

    // 🧩 Pastikan input ID tersedia
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" })
    }

    const rawId = scenarioId || id || _id
    if (!rawId || rawId === "undefined") {
      return res.status(400).json({ error: "Missing or invalid scenario ID" })
    }

    // 🧱 Pastikan ObjectId valid
    const validId = mongoose.Types.ObjectId.isValid(rawId)
      ? new mongoose.Types.ObjectId(rawId)
      : rawId

    console.log("🟢 [startRoleplay] normalized scenarioId:", validId)

    // 🔎 Pastikan scenario ada
    const scenario = await RoleplayScenario.findById(validId)
    if (!scenario) {
      return res.status(404).json({ error: "Scenario not found" })
    }

    // 🔁 Ambil progress user atau buat baru
    let progress = await UserProgress.findOne({ userId })
    if (!progress) {
      progress = await UserProgress.create({ userId })
      console.log("🟢 Created new UserProgress:", progress._id)
    }

    // 💾 Buat session baru
    const session = await RoleplaySession.create({
      progressId: progress._id,
      scenarioId: validId,
      answers: [],
      totalScore: 0,
      startedAt: new Date(),
    })

    console.log("🟢 New session created:", session._id)

    res.status(200).json(session)
  } catch (err: any) {
    console.error("❌ [startRoleplay] Error:", err)
    res.status(500).json({
      error: "Server error",
      message: err.message || "Unexpected server error",
    })
  }
}


// ===============================================================
// 💬 ANSWER STEP
// ===============================================================
export async function answerStep(req: Request, res: Response) {
  try {
    const { sessionId, stepId, selectedOption } = req.body
    const session = await RoleplaySession.findById(sessionId)
    if (!session) return res.status(404).json({ error: "Session not found" })

    const scenarioId = normalizeId(session.scenarioId)
    const scenario = await RoleplayScenario.findById(scenarioId)
    if (!scenario) return res.status(404).json({ error: "Scenario not found" })

    const step = scenario.steps.find((s: any) => s.id === stepId)
    const option = step?.options?.find((o: any) => o.text === selectedOption)

    if (!option) return res.status(400).json({ error: "Invalid option" })

    session.answers.push({
      stepId,
      selectedOption,
      score: option.score,
      feedback: option.feedback,
    })
    session.totalScore += option.score
    await session.save()

    res.json({ feedback: option.feedback, totalScore: session.totalScore })
  } catch (err: any) {
    console.error("❌ [answerStep] Error:", err)
    res.status(500).json({ error: "Server error", message: err.message })
  }
}

// ===============================================================
// 🏁 END ROLEPLAY
// ===============================================================
export async function endRoleplay(req: Request, res: Response) {
  try {
    const { sessionId } = req.body
    const session = await RoleplaySession.findByIdAndUpdate(
      sessionId,
      { completed: true, endedAt: new Date() },
      { new: true }
    )
    if (!session) return res.status(404).json({ error: "Session not found" })

    const progress = await UserProgress.findById(session.progressId)
    if (!progress)
      return res.status(404).json({ error: "User progress not found" })

    const scenarioId = normalizeId(session.scenarioId)

    progress.totalSessions += 1
    progress.totalScore += session.totalScore
    if (!progress.completedScenarios.includes(scenarioId)) {
      progress.completedScenarios.push(scenarioId)
    }
    progress.lastUpdated = new Date()
    await progress.save()

    res.json(session)
  } catch (err: any) {
    console.error("❌ [endRoleplay] Error:", err)
    res.status(500).json({ error: "Server error", message: err.message })
  }
}

// ===============================================================
// 📜 GET USER ROLEPLAYS
// ===============================================================
export async function getUserRoleplays(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const progress = await UserProgress.findOne({ userId })
    if (!progress) return res.json([])

    const sessions = await RoleplaySession.find({
      progressId: progress._id,
    }).sort({ startedAt: -1 })

    res.json(sessions)
  } catch (e: any) {
    console.error("❌ [getUserRoleplays] Error:", e)
    res.status(500).json({ error: "Server error", message: e.message })
  }
}

// ===============================================================
// 🔍 GET SESSION BY ID
// ===============================================================
export async function getSessionById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const session = await RoleplaySession.findById(id)
    if (!session) return res.status(404).json({ error: "Session not found" })
    res.json(session)
  } catch (e: any) {
    console.error("❌ [getSessionById] Error:", e)
    res.status(500).json({ error: "Server error", message: e.message })
  }
}

// ===============================================================
// 🧩 GET SCENARIO BY ID (tambahan untuk fix error ObjectId undefined)
// ===============================================================
export async function getScenarioById(req: Request, res: Response) {
  try {
    const rawId = req.params.id
    if (!rawId || rawId === "undefined") {
      return res.status(400).json({ error: "Invalid scenario ID" })
    }

    const validId = mongoose.Types.ObjectId.isValid(rawId)
      ? new mongoose.Types.ObjectId(rawId)
      : rawId

    console.log("🟢 [getScenarioById] Normalized ID:", validId)

    const scenario = await RoleplayScenario.findById(validId)
    if (!scenario) {
      return res.status(404).json({ error: "Scenario not found" })
    }

    res.json(scenario)
  } catch (e: any) {
    console.error("❌ [getScenarioById] Error:", e)
    res
      .status(500)
      .json({ error: "Server error", message: e.message || "Unknown error" })
  }
}
