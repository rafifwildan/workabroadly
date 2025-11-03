import mongoose, { Document, Schema } from "mongoose";

// ============================================================
// INTERFACE: Activity Document
// ============================================================
export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId; // Reference to User
  type:
    | "roleplay_started"
    | "roleplay_completed"
    | "chat_started"
    | "credit_purchased"
    | "credit_used"
    | "plan_upgraded"; // Type of activity
  description: string; // Human-readable description
  metadata?: {
    // Optional metadata based on activity type
    scenarioId?: string; // For roleplay activities
    sessionId?: string; // For chat/roleplay sessions
    creditsUsed?: number; // For credit usage
    creditsPurchased?: number; // For credit purchase
    transactionId?: string; // For purchases
    score?: number; // For roleplay completion
    planTier?: string; // For plan upgrades
    [key: string]: any; // Allow other metadata
  };
  createdAt: Date; // When activity happened
}

// ============================================================
// SCHEMA: Activity MongoDB Schema
// ============================================================
const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for fast queries by userId
    },
    type: {
      type: String,
      enum: [
        "roleplay_started",
        "roleplay_completed",
        "chat_started",
        "credit_purchased",
        "credit_used",
        "plan_upgraded",
      ],
      required: true,
      index: true, // Index for filtering by type
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed, // Flexible object for any additional data
      default: {},
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// ============================================================
// INDEXES for faster queries
// ============================================================
// Compound index for userId + createdAt (most common query pattern)
ActivitySchema.index({ userId: 1, createdAt: -1 });

// Compound index for userId + type (for filtering by activity type)
ActivitySchema.index({ userId: 1, type: 1, createdAt: -1 });

// ============================================================
// EXPORT MODEL
// ============================================================
export default mongoose.model<IActivity>("Activity", ActivitySchema);