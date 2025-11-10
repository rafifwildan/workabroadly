"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPlanUpgraded = exports.logCreditPurchased = exports.logCreditUsed = exports.logChatStarted = exports.logRoleplayCompleted = exports.logRoleplayStarted = exports.logActivity = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
const mongoose_1 = __importDefault(require("mongoose"));
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
const logActivity = async (userId, type, description, metadata) => {
    try {
        // Validate userId
        if (!userId) {
            console.error("❌ Activity log failed: userId is required");
            return null;
        }
        // Convert userId to ObjectId if it's a string
        const userObjectId = typeof userId === "string" ? new mongoose_1.default.Types.ObjectId(userId) : userId;
        // Create activity record
        const activity = await Activity_1.default.create({
            userId: userObjectId,
            type,
            description,
            metadata: metadata || {},
        });
        console.log(`✅ Activity logged: ${type} for user ${userId}`);
        return activity;
    }
    catch (error) {
        console.error("❌ Activity logging error:", error.message);
        // Don't throw error - we don't want activity logging to break the main flow
        return null;
    }
};
exports.logActivity = logActivity;
// ============================================================
// HELPER FUNCTIONS: Specific Activity Loggers
// These make it easier to log common activities
// ============================================================
/**
 * Log roleplay started activity
 */
const logRoleplayStarted = async (userId, scenarioId, sessionId, scenarioTitle) => {
    return (0, exports.logActivity)(userId, "roleplay_started", `Started roleplay: ${scenarioTitle}`, {
        scenarioId,
        sessionId,
    });
};
exports.logRoleplayStarted = logRoleplayStarted;
/**
 * Log roleplay completed activity
 */
const logRoleplayCompleted = async (userId, scenarioId, sessionId, scenarioTitle, score, creditsUsed) => {
    return (0, exports.logActivity)(userId, "roleplay_completed", `Completed roleplay: ${scenarioTitle}${score ? ` (Score: ${score})` : ""}`, {
        scenarioId,
        sessionId,
        score,
        creditsUsed,
    });
};
exports.logRoleplayCompleted = logRoleplayCompleted;
/**
 * Log chat started activity
 */
const logChatStarted = async (userId, sessionId, language) => {
    return (0, exports.logActivity)(userId, "chat_started", `Started chat in ${language}`, {
        sessionId,
        language,
    });
};
exports.logChatStarted = logChatStarted;
/**
 * Log credit used activity
 */
const logCreditUsed = async (userId, creditsUsed, activityType) => {
    return (0, exports.logActivity)(userId, "credit_used", `Used ${creditsUsed} credits for ${activityType}`, {
        creditsUsed,
        activityType,
    });
};
exports.logCreditUsed = logCreditUsed;
/**
 * Log credit purchased activity
 */
const logCreditPurchased = async (userId, creditsPurchased, transactionId, amount) => {
    return (0, exports.logActivity)(userId, "credit_purchased", `Purchased ${creditsPurchased} credits`, {
        creditsPurchased,
        transactionId,
        amount,
    });
};
exports.logCreditPurchased = logCreditPurchased;
/**
 * Log plan upgraded activity
 */
const logPlanUpgraded = async (userId, newPlanTier, transactionId) => {
    return (0, exports.logActivity)(userId, "plan_upgraded", `Upgraded to ${newPlanTier} plan`, {
        planTier: newPlanTier,
        transactionId,
    });
};
exports.logPlanUpgraded = logPlanUpgraded;
