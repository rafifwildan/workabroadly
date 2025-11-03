import { Request, Response } from "express";
import User from "../models/User";

// ============================================================
// PUT /api/user/profile - Update user profile
// ============================================================
export const updateProfile = async (req: Request, res: Response) => {
  try {
    // Get userId from req.user (set by authenticateToken middleware)
    const userId = req.user?.id;
    const { name, targetCountry, careerGoals, experienceLevel } = req.body;

    // ===== VALIDATION =====
    if (!userId) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "User not authenticated" 
      });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ 
        error: "Invalid input",
        message: "Name is required" 
      });
    }

    // ===== UPDATE USER PROFILE =====
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
        targetCountry: targetCountry?.trim() || undefined,
        careerGoals: careerGoals?.trim() || undefined,
        experienceLevel: experienceLevel?.trim() || undefined,
      },
      { new: true, runValidators: true }
    ).select("-password"); // Don't return password

    if (!updatedUser) {
      return res.status(404).json({ 
        error: "User not found",
        message: "User does not exist" 
      });
    }

    // ===== LOG SUCCESS =====
    console.log("✅ Profile updated:", updatedUser.email);

    // ===== RESPONSE =====
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: String(updatedUser._id),
        name: updatedUser.name,
        email: updatedUser.email,
        picture: updatedUser.picture,
        credits: updatedUser.credits,
        planTier: updatedUser.planTier,
        targetCountry: updatedUser.targetCountry,
        careerGoals: updatedUser.careerGoals,
        experienceLevel: updatedUser.experienceLevel,
        isOnboarded: updatedUser.isOnboarded,
      },
    });
  } catch (error: any) {
    console.error("❌ Update profile error:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: error.message 
    });
  }
};

// ============================================================
// POST /api/user/onboarding - Save onboarding data
// ============================================================
export const saveOnboarding = async (req: Request, res: Response) => {
  try {
    // Get userId from req.user (set by authenticateToken middleware)
    const userId = req.user?.id;
    const { targetCountry, careerGoals, experienceLevel } = req.body;

    // ===== VALIDATION =====
    if (!userId) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "User not authenticated" 
      });
    }

    if (!targetCountry || targetCountry.trim().length === 0) {
      return res.status(400).json({ 
        error: "Invalid input",
        message: "Target country is required" 
      });
    }

    // ===== UPDATE USER WITH ONBOARDING DATA =====
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        targetCountry: targetCountry.trim(),
        careerGoals: careerGoals?.trim() || undefined,
        experienceLevel: experienceLevel?.trim() || undefined,
        isOnboarded: true, // Mark as onboarded
      },
      { new: true, runValidators: true }
    ).select("-password"); // Don't return password

    if (!updatedUser) {
      return res.status(404).json({ 
        error: "User not found",
        message: "User does not exist" 
      });
    }

    // ===== LOG SUCCESS =====
    console.log("✅ Onboarding completed:", updatedUser.email);

    // ===== RESPONSE =====
    res.status(200).json({
      message: "Onboarding completed successfully",
      user: {
        id: String(updatedUser._id),
        name: updatedUser.name,
        email: updatedUser.email,
        picture: updatedUser.picture,
        credits: updatedUser.credits,
        planTier: updatedUser.planTier,
        targetCountry: updatedUser.targetCountry,
        careerGoals: updatedUser.careerGoals,
        experienceLevel: updatedUser.experienceLevel,
        isOnboarded: updatedUser.isOnboarded,
      },
    });
  } catch (error: any) {
    console.error("❌ Onboarding error:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: error.message 
    });
  }
};

// ============================================================
// GET /api/user/plan - Get user plan information
// ============================================================
export const getPlanInfo = async (req: Request, res: Response) => {
  try {
    // Get userId from req.user (set by authenticateToken middleware)
    const userId = req.user?.id;

    // ===== VALIDATION =====
    if (!userId) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "User not authenticated" 
      });
    }

    // ===== GET USER PLAN DATA =====
    const user = await User.findById(userId).select(
      "planTier credits createdAt"
    );

    if (!user) {
      return res.status(404).json({ 
        error: "User not found",
        message: "User does not exist" 
      });
    }

    // ===== LOG SUCCESS =====
    console.log("✅ Plan info retrieved:", user.email);

    // ===== RESPONSE =====
    res.status(200).json({
      planTier: user.planTier,
      credits: user.credits,
      memberSince: user.createdAt,
    });
  } catch (error: any) {
    console.error("❌ Get plan info error:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: error.message 
    });
  }
};

// ============================================================
// DELETE /api/user/account - Delete user account
// ============================================================
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    // Get userId from req.user (set by authenticateToken middleware)
    const userId = req.user?.id;

    // ===== VALIDATION =====
    if (!userId) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "User not authenticated" 
      });
    }

    // ===== DELETE USER =====
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ 
        error: "User not found",
        message: "User does not exist" 
      });
    }

    // ===== LOG SUCCESS =====
    console.log("✅ Account deleted:", deletedUser.email);

    // ===== RESPONSE =====
    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ Delete account error:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: error.message 
    });
  }
};