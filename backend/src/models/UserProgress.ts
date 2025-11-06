import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserProgress extends Document {
  userId: Types.ObjectId;          // referensi ke user
  completedScenarios: Types.ObjectId[]; // list scenario yang udah diselesaikan
  totalSessions: number;           // berapa kali user main roleplay
  totalTime: number;               // total waktu belajar (dalam menit/detik)
  recommendations: string[];       // rekomendasi scenario selanjutnya (opsional)
  lastUpdated: Date;               // kapan terakhir kali update progress
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedScenarios: {
      type: [Schema.Types.ObjectId],
      ref: "RoleplayScenario",
      default: [],
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
    recommendations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: { createdAt: true, updatedAt: "lastUpdated" } }
);

export default mongoose.model<IUserProgress>("UserProgress", UserProgressSchema);
