import Activity, { IActivity } from "../models/Activity";
import mongoose from "mongoose";

// ============================================================
// UTILITY: Activity Logger
// Helper function untuk log semua user activities
// ============================================================

/**
 * Log user activity to database
 * @param userId - User's MongoDB ObjectId
 * @param type - Type of activity
 * @param description - Human-readable description
 * @param metadata - Optional additional data
 * @returns Created activity document
 */
export const logActivity = async (
  userId: string | mongoose.Types.ObjectId,
  type: IActivity["type"],
  description: string,
  metadata?: IActivity["metadata"]
): Promise<IActivity | null> => {
  try {
    // Validate userId
    if (!userId) {
      console.error("❌ Activity log failed: userId is required");
      return null;
    }

    // Convert userId to ObjectId if it's a string
    const userObjectId =
      typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId;

    // Create activity record
    const activity = await Activity.create({
      userId: userObjectId,
      type,
      description,
      metadata: metadata || {},
    });

    console.log(`✅ Activity logged: ${type} for user ${userId}`);
    return activity;
  } catch (error: any) {
    console.error("❌ Activity logging error:", error.message);
    // Don't throw error - we don't want activity logging to break the main flow
    return null;
  }
};

// ============================================================
// HELPER FUNCTIONS: Specific Activity Loggers
// These make it easier to log common activities
// ============================================================

/**
 * Log roleplay started activity
 */
export const logRoleplayStarted = async (
  userId: string,
  scenarioId: string,
  sessionId: string,
  scenarioTitle: string
) => {
  return logActivity(
    userId,
    "roleplay_started",
    `Started roleplay: ${scenarioTitle}`,
    {
      scenarioId,
      sessionId,
    }
  );
};

/**
 * Log roleplay completed activity
 */
export const logRoleplayCompleted = async (
  userId: string,
  scenarioId: string,
  sessionId: string,
  scenarioTitle: string,
  score?: number,
  creditsUsed?: number
) => {
  return logActivity(
    userId,
    "roleplay_completed",
    `Completed roleplay: ${scenarioTitle}${score ? ` (Score: ${score})` : ""}`,
    {
      scenarioId,
      sessionId,
      score,
      creditsUsed,
    }
  );
};

/**
 * Log chat started activity
 */
export const logChatStarted = async (
  userId: string,
  sessionId: string,
  language: string
) => {
  return logActivity(userId, "chat_started", `Started chat in ${language}`, {
    sessionId,
    language,
  });
};

/**
 * Log credit used activity
 */
export const logCreditUsed = async (
  userId: string,
  creditsUsed: number,
  activityType: string
) => {
  return logActivity(
    userId,
    "credit_used",
    `Used ${creditsUsed} credits for ${activityType}`,
    {
      creditsUsed,
      activityType,
    }
  );
};

/**
 * Log credit purchased activity
 */
export const logCreditPurchased = async (
  userId: string,
  creditsPurchased: number,
  transactionId: string,
  amount: number
) => {
  return logActivity(
    userId,
    "credit_purchased",
    `Purchased ${creditsPurchased} credits`,
    {
      creditsPurchased,
      transactionId,
      amount,
    }
  );
};

/**
 * Log plan upgraded activity
 */
export const logPlanUpgraded = async (
  userId: string,
  newPlanTier: string,
  transactionId: string
) => {
  return logActivity(
    userId,
    "plan_upgraded",
    `Upgraded to ${newPlanTier} plan`,
    {
      planTier: newPlanTier,
      transactionId,
    }
  );
};