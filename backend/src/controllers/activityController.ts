import { Request, Response } from "express";
import Activity from "../models/Activity";

// ============================================================
// GET /api/activity - Get user activities with pagination
// ============================================================
export const getUserActivities = async (req: Request, res: Response) => {
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Filtering
    const type = req.query.type as string; // Optional: filter by activity type

    // Build query
    const query: any = { userId };
    if (type) {
      query.type = type;
    }

    // ===== GET ACTIVITIES =====
    const activities = await Activity.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance

    // ===== GET TOTAL COUNT =====
    const total = await Activity.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // ===== LOG SUCCESS =====
    console.log(
      `✅ Activities retrieved for user ${userId}: ${activities.length} items`
    );

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
  } catch (error: any) {
    console.error("❌ Get activities error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};

// ============================================================
// GET /api/activity/usage-history - Get credit usage history
// ============================================================
export const getUsageHistory = async (req: Request, res: Response) => {
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Date range filtering (optional)
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    // Build query - only credit-related activities
    const query: any = {
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
    const usageHistory = await Activity.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .lean();

    // ===== GET TOTAL COUNT =====
    const total = await Activity.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // ===== CALCULATE TOTALS =====
    const totals = await Activity.aggregate([
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
      } else if (item._id === "credit_purchased") {
        summary.totalCreditsPurchased = item.totalCredits || 0;
        summary.purchaseCount = item.count;
      }
    });

    // ===== LOG SUCCESS =====
    console.log(
      `✅ Usage history retrieved for user ${userId}: ${usageHistory.length} items`
    );

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
  } catch (error: any) {
    console.error("❌ Get usage history error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};

// ============================================================
// GET /api/activity/stats - Get activity statistics
// ============================================================
export const getActivityStats = async (req: Request, res: Response) => {
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
    const stats = await Activity.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    // Format stats
    const formattedStats: Record<string, number> = {};
    stats.forEach((item) => {
      formattedStats[item._id] = item.count;
    });

    // Get recent activities count (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCount = await Activity.countDocuments({
      userId,
      createdAt: { $gte: sevenDaysAgo },
    });

    // ===== LOG SUCCESS =====
    console.log(`✅ Activity stats retrieved for user ${userId}`);

    // ===== RESPONSE =====
    res.json({
      stats: formattedStats,
      recentActivitiesCount: recentCount,
      totalActivities: Object.values(formattedStats).reduce(
        (sum, count) => sum + count,
        0
      ),
    });
  } catch (error: any) {
    console.error("❌ Get activity stats error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};