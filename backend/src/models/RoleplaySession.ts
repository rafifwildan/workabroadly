import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserAnswer {
  stepId: number;
  selectedOption: string;
  score: number;
  feedback?: string;
}

export interface IRoleplaySession extends Document {
  progressId: Types.ObjectId;      // ← referensi ke UserProgress
  scenarioId: string;
  answers: IUserAnswer[];
  totalScore: number;
  completed: boolean;
  startedAt: Date;
  endedAt?: Date;
}

const UserAnswerSchema = new Schema<IUserAnswer>({
  stepId: Number,
  selectedOption: String,
  score: Number,
  feedback: String,
});

const RoleplaySessionSchema = new Schema<IRoleplaySession>({
  progressId: { type: Schema.Types.ObjectId, ref: "UserProgress", required: true },
  scenarioId: { type: String, required: true },
  answers: [UserAnswerSchema],
  totalScore: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
});

export default mongoose.model<IRoleplaySession>("RoleplaySession", RoleplaySessionSchema);
