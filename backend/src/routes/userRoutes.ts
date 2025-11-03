import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  updateProfile,
  saveOnboarding,
  getPlanInfo,
  deleteAccount,
} from "../controllers/userController";
import User from "../models/User";
import type { Request, Response } from "express";

const router = Router();

// Apply authentication to all routes
router.use(authenticateToken);

// ============================================================
// EXISTING ENDPOINTS (Keep for backward compatibility)
// ============================================================

/**
 * Get current user's credit balance
 * GET /api/user/credits
 */
router.get("/credits", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("credits");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      credits: user.credits,
      userId: req.user.id,
    });
  } catch (error: any) {
    console.error("[Get Credits Error]:", error);
    res.status(500).json({
      error: "Failed to fetch credits",
      message: error.message,
    });
  }
});

/**
 * Get current user's profile info
 * GET /api/user/profile
 */
router.get("/profile", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-googleId -password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        credits: user.credits,
        planTier: user.planTier,
        targetCountry: user.targetCountry,
        careerGoals: user.careerGoals,
        experienceLevel: user.experienceLevel,
        isOnboarded: user.isOnboarded,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.error("[Get Profile Error]:", error);
    res.status(500).json({
      error: "Failed to fetch profile",
      message: error.message,
    });
  }
});

// ============================================================
// PHASE 2 ENDPOINTS (New)
// ============================================================

/**
 * Update user profile
 * PUT /api/user/profile
 */
router.put("/profile", updateProfile);

/**
 * Save onboarding data
 * POST /api/user/onboarding
 */
router.post("/onboarding", saveOnboarding);

/**
 * Get user plan information
 * GET /api/user/plan
 */
router.get("/plan", getPlanInfo);

/**
 * Delete user account
 * DELETE /api/user/account
 */
router.delete("/account", deleteAccount);

export default router;