"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRoleplay = startRoleplay;
exports.answerStep = answerStep;
exports.endRoleplay = endRoleplay;
exports.getUserRoleplays = getUserRoleplays;
const RoleplayScenario_js_1 = __importDefault(require("../models/RoleplayScenario.js"));
const RoleplaySession_js_1 = __importDefault(require("../models/RoleplaySession.js"));
const UserProgress_js_1 = __importDefault(require("../models/UserProgress.js"));
async function startRoleplay(req, res) {
    const { userId, scenarioId } = req.body;
    if (!userId || !scenarioId)
        return res.status(400).json({ error: "Missing userId or scenarioId" });
    const session = await RoleplaySession_js_1.default.create({ userId, scenarioId, answers: [], totalScore: 0 });
    res.json(session);
}
async function answerStep(req, res) {
    const { sessionId, stepId, selectedOption } = req.body;
    const session = await RoleplaySession_js_1.default.findById(sessionId);
    if (!session)
        return res.status(404).json({ error: "Session not found" });
    const scenario = await RoleplayScenario_js_1.default.findById(session.scenarioId);
    const step = scenario?.steps.find(s => s.id === stepId);
    const option = step?.options?.find(o => o.text === selectedOption);
    if (!option)
        return res.status(400).json({ error: "Invalid option" });
    session.answers.push({ stepId, selectedOption, score: option.score, feedback: option.feedback });
    session.totalScore += option.score;
    await session.save();
    res.json({ feedback: option.feedback, totalScore: session.totalScore });
}
async function endRoleplay(req, res) {
    const { sessionId } = req.body;
    const session = await RoleplaySession_js_1.default.findByIdAndUpdate(sessionId, { completed: true, endedAt: new Date() }, { new: true });
    if (!session)
        return res.status(404).json({ error: "Session not found" });
    await UserProgress_js_1.default.findOneAndUpdate({ userId: session.userId }, {
        $inc: { totalSessions: 1, totalScore: session.totalScore },
        $addToSet: { completedScenarios: session.scenarioId },
        $set: { lastUpdated: new Date() },
    }, { upsert: true });
    res.json(session);
}
async function getUserRoleplays(req, res) {
    const { userId } = req.params;
    const sessions = await RoleplaySession_js_1.default.find({ userId }).sort({ startedAt: -1 });
    res.json(sessions);
}
