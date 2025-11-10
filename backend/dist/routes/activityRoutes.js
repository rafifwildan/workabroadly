"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
// Apply authentication to all routes
router.use(auth_1.authenticateToken);
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
router.get("/", activityController_1.getUserActivities);
/**
 * Get credit usage history
 * GET /api/activity/usage-history
 * Query params:
 * - page: number (default: 1)
 * - limit: number (default: 20)
 * - startDate: ISO date string (optional)
 * - endDate: ISO date string (optional)
 */
router.get("/usage-history", activityController_1.getUsageHistory);
/**
 * Get activity statistics
 * GET /api/activity/stats
 */
router.get("/stats", activityController_1.getActivityStats);
exports.default = router;
