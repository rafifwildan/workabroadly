import mongoose, { Schema, Document } from "mongoose";

export interface IScenarioOption {
  text: string;
  score: number;
  feedback?: string;
  nextStep?: number;
}

export interface IScenarioStep {
  id: number;
  speaker: "assistant" | "user";
  script: string;
  options?: IScenarioOption[];
}

export interface IRoleplayScenario extends Document {
  title: string;
  description: string;
  category: "interview" | "workplace" | "daily" | "custom";
  language: "japanese" | "korean";
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: IScenarioStep[];
  createdAt: Date;
}

const OptionSchema = new Schema<IScenarioOption>({
  text: { type: String, required: true },
  score: { type: Number, required: true },
  feedback: String,
  nextStep: Number,
});

const StepSchema = new Schema<IScenarioStep>({
  id: { type: Number, required: true },
  speaker: { type: String, enum: ["assistant", "user"], required: true },
  script: { type: String, required: true },
  options: [OptionSchema],
});

const RoleplayScenarioSchema = new Schema<IRoleplayScenario>({
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ["interview", "workplace", "daily", "custom"],
    default: "custom",
  },
  language: { type: String, enum: ["japanese", "korean"], required: true },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  steps: [StepSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRoleplayScenario>("RoleplayScenario", RoleplayScenarioSchema);
