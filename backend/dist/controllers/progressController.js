"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProgress = getUserProgress;
const UserProgress_js_1 = __importDefault(require("../models/UserProgress.js"));
async function getUserProgress(req, res) {
    const { userId } = req.params;
    const progress = await UserProgress_js_1.default.findOne({ userId });
    if (!progress)
        return res.status(404).json({ error: "Progress not found" });
    res.json(progress);
}
