import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import User from "../models/User";
import type { Request, Response } from "express";
import { saveOnboarding, updateProfile, getPlanInfo, changePassword, deleteAccount } from "../controllers/userController";

const router = Router();

// Apply authentication to all routes
router.use(authenticateToken);

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
      userId: req.user.id 
    });

  } catch (error: any) {
    console.error("[Get Credits Error]:", error);
    res.status(500).json({ 
      error: "Failed to fetch credits",
      message: error.message 
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

    const user = await User.findById(req.user.id).select("-googleId");

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
        createdAt: user.createdAt,
      }
    });

  } catch (error: any) {
    console.error("[Get Profile Error]:", error);
    res.status(500).json({
      error: "Failed to fetch profile",
      message: error.message
    });
  }
});

/**
 * Save onboarding data
 * PATCH /api/user/onboarding
 */
router.patch("/onboarding", saveOnboarding);

/**
 * Update user profile
 * PUT /api/user/profile
 */
router.put("/profile", updateProfile);

/**
 * Get user plan information
 * GET /api/user/plan
 */
router.get("/plan", getPlanInfo);

/**
 * Change user password
 * PUT /api/user/change-password
 */
router.put("/change-password", changePassword);

/**
 * Delete user account
 * DELETE /api/user/account
 */
router.delete("/account", deleteAccount);

export default router;