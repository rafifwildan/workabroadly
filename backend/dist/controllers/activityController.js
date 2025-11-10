"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityStats = exports.getUsageHistory = exports.getUserActivities = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
// ============================================================
// GET /api/activity - Get user activities with pagination
// ============================================================
const getUserActivities = async (req, res) => {
    try {
        // Get userId from req.user (set by authenticateToken middleware)
        const userId = req.user?.id;
        // ===== VALIDATION =====
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not authenticated",
            });
        }
        // ===== QUERY PARAMETERS =====
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        // Filtering
        const type = req.query.type; // Optional: filter by activity type
        // Build query
        const query = { userId };
        if (type) {
            query.type = type;
        }
        // ===== GET ACTIVITIES =====
        const activities = await Activity_1.default.find(query)
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit)
            .lean(); // Use lean() for better performance
        // ===== GET TOTAL COUNT =====
        const total = await Activity_1.default.countDocuments(query);
        const totalPages = Math.ceil(total / limit);
        // ===== LOG SUCCESS =====
        console.log(`✅ Activities retrieved for user ${userId}: ${activities.length} items`);
        // ===== RESPONSE =====
        res.json({
            activities,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasMore: page < totalPages,
            },
        });
    }
    catch (error) {
        console.error("❌ Get activities error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.getUserActivities = getUserActivities;
// ============================================================
// GET /api/activity/usage-history - Get credit usage history
// ============================================================
const getUsageHistory = async (req, res) => {
    try {
        // Get userId from req.user (set by authenticateToken middleware)
        const userId = req.user?.id;
        // ===== VALIDATION =====
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not authenticated",
            });
        }
        // ===== QUERY PARAMETERS =====
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        // Date range filtering (optional)
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        // Build query - only credit-related activities
        const query = {
            userId,
            type: { $in: ["credit_used", "credit_purchased"] },
        };
        // Add date range if provided
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
            }
        }
        // ===== GET USAGE HISTORY =====
        const usageHistory = await Activity_1.default.find(query)
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit)
            .lean();
        // ===== GET TOTAL COUNT =====
        const total = await Activity_1.default.countDocuments(query);
        const totalPages = Math.ceil(total / limit);
        // ===== CALCULATE TOTALS =====
        const totals = await Activity_1.default.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$type",
                    totalCredits: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "credit_used"] },
                                "$metadata.creditsUsed",
                                "$metadata.creditsPurchased",
                            ],
                        },
                    },
                    count: { $sum: 1 },
                },
            },
        ]);
        // Format totals
        const summary = {
            totalCreditsUsed: 0,
            totalCreditsPurchased: 0,
            usageCount: 0,
            purchaseCount: 0,
        };
        totals.forEach((item) => {
            if (item._id === "credit_used") {
                summary.totalCreditsUsed = item.totalCredits || 0;
                summary.usageCount = item.count;
            }
            else if (item._id === "credit_purchased") {
                summary.totalCreditsPurchased = item.totalCredits || 0;
                summary.purchaseCount = item.count;
            }
        });
        // ===== LOG SUCCESS =====
        console.log(`✅ Usage history retrieved for user ${userId}: ${usageHistory.length} items`);
        // ===== RESPONSE =====
        res.json({
            usageHistory,
            summary,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasMore: page < totalPages,
            },
        });
    }
    catch (error) {
        console.error("❌ Get usage history error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.getUsageHistory = getUsageHistory;
// ============================================================
// GET /api/activity/stats - Get activity statistics
// ============================================================
const getActivityStats = async (req, res) => {
    try {
        // Get userId from req.user (set by authenticateToken middleware)
        const userId = req.user?.id;
        // ===== VALIDATION =====
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not authenticated",
            });
        }
        // ===== GET STATISTICS =====
        const stats = await Activity_1.default.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 },
                },
            },
        ]);
        // Format stats
        const formattedStats = {};
        stats.forEach((item) => {
            formattedStats[item._id] = item.count;
        });
        // Get recent activities count (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentCount = await Activity_1.default.countDocuments({
            userId,
            createdAt: { $gte: sevenDaysAgo },
        });
        // ===== LOG SUCCESS =====
        console.log(`✅ Activity stats retrieved for user ${userId}`);
        // ===== RESPONSE =====
        res.json({
            stats: formattedStats,
            recentActivitiesCount: recentCount,
            totalActivities: Object.values(formattedStats).reduce((sum, count) => sum + count, 0),
        });
    }
    catch (error) {
        console.error("❌ Get activity stats error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.getActivityStats = getActivityStats;
