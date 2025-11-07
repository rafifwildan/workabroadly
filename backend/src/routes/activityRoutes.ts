import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  getUserActivities,
  getUsageHistory,
  getActivityStats,
} from "../controllers/activityController";

const router = Router();

// Apply authentication to all routes
router.use(authenticateToken);

// ============================================================
// ACTIVITY ROUTES
// ============================================================

/**
 * Get user activities with pagination and filtering
 * GET /api/activity
 * Query params:
 * - page: number (default: 1)
 * - limit: number (default: 20)
 * - type: string (optional - filter by activity type)
 */
router.get("/", getUserActivities);

/**
 * Get credit usage history
 * GET /api/activity/usage-history
 * Query params:
 * - page: number (default: 1)
 * - limit: number (default: 20)
 * - startDate: ISO date string (optional)
 * - endDate: ISO date string (optional)
 */
router.get("/usage-history", getUsageHistory);

/**
 * Get activity statistics
 * GET /api/activity/stats
 */
router.get("/stats", getActivityStats);

export default router;