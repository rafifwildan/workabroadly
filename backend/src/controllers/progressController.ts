import type { Request, Response } from "express";
import UserProgress from "../models/UserProgress.js";

export async function getUserProgress(req: Request, res: Response) {
  const { userId } = req.params;
  const progress = await UserProgress.findOne({ userId });
  if (!progress) return res.status(404).json({ error: "Progress not found" });
  res.json(progress);
}
