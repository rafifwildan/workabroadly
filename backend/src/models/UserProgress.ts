import mongoose, { Schema, Document } from "mongoose";

export interface IUserProgress extends Document {
  userId: string;
  completedScenarios: string[];
  totalSessions: number;
  totalTime: number;
  totalScore: number;
  vocabularyLearned: number;
  recommendations: string[];
  lastUpdated: Date;
}

const UserProgressSchema = new Schema<IUserProgress>({
  userId: { type: String, required: true },
  completedScenarios: [String],
  totalSessions: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  vocabularyLearned: { type: Number, default: 0 },
  recommendations: [String],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model<IUserProgress>("UserProgress", UserProgressSchema);
