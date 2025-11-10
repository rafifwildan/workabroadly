import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

// ============================================================
// PUT /api/user/profile - Update user profile
// ============================================================
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, targetCountry, careerGoals, experienceLevel } = req.body;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        error: "Invalid input",
        message: "Name is required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
        targetCountry: targetCountry?.trim() || undefined,
        careerGoals: careerGoals?.trim() || undefined,
        experienceLevel: experienceLevel?.trim() || undefined,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
        message: "User does not exist",
      });
    }

    console.log("✅ Profile updated:", updatedUser.email);

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
      message: error.message,
    });
  }
};

// ============================================================
// PATCH /api/user/onboarding - Save onboarding data
// ============================================================
export const saveOnboarding = async (req: Request, res: Response) => {
  try {
    // ⚡ CRITICAL: Strict authentication guard
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    // ⚡ GUARD CLAUSE: Prevent "Ghost User" onboarding
    if (!userId || !userEmail) {
      console.error("[Onboarding API Error] FAILED: No user session found. Possible 'Ghost User'.");
      return res.status(401).json({
        error: "Not authenticated. User session is missing. Please sign in again.",
      });
    }

    console.log("[Onboarding API] User authenticated:", userEmail);

    // Extract new onboarding fields
    const {
      primaryInterest,
      originCountry,
      targetCulture,
      employeeType,
      educationLevel,
      industry,
      occupation,
      yearsOfExperience
    } = req.body;

    // Validate required fields
    if (!originCountry || !targetCulture || !employeeType || !educationLevel) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "originCountry, targetCulture, employeeType, and educationLevel are required",
      });
    }

    // ⚡ UPDATE: Use userId to find the correct user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          primaryInterest: primaryInterest?.trim(),
          originCountry: originCountry.trim(),
          targetCulture: targetCulture.trim(),
          employeeType: employeeType.trim(),
          educationLevel: educationLevel.trim(),
          industry: industry?.trim() || undefined,
          occupation: occupation?.trim() || undefined,
          yearsOfExperience: yearsOfExperience?.trim() || undefined,
          hasCompletedOnboarding: true,
        }
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      console.error("[Onboarding API Error] User not found in database for userId:", userId);
      return res.status(404).json({
        error: "User not found in database.",
      });
    }

    console.log("✅ [Onboarding Success] Completed for:", updatedUser.email);

    res.status(200).json({
      message: "Onboarding completed successfully",
      user: {
        id: String(updatedUser._id),
        name: updatedUser.name,
        email: updatedUser.email,
        picture: updatedUser.picture,
        primaryInterest: updatedUser.primaryInterest,
        originCountry: updatedUser.originCountry,
        targetCulture: updatedUser.targetCulture,
        employeeType: updatedUser.employeeType,
        educationLevel: updatedUser.educationLevel,
        industry: updatedUser.industry,
        hasCompletedOnboarding: updatedUser.hasCompletedOnboarding,
      },
    });
  } catch (error: any) {
    console.error("❌ [Onboarding API Error]:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};

// ============================================================
// GET /api/user/plan - Get user plan information
// ============================================================
export const getPlanInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    const user = await User.findById(userId).select("planTier credits createdAt");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "User does not exist",
      });
    }

    console.log("✅ Plan info retrieved:", user.email);

    res.status(200).json({
      planTier: user.planTier,
      credits: user.credits,
      memberSince: user.createdAt,
    });
  } catch (error: any) {
    console.error("❌ Get plan info error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};

// ============================================================
// PUT /api/user/change-password - Change user password
// ============================================================
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Current password, new password, and confirmation are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "Password too short",
        message: "New password must be at least 8 characters",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
        message: "New password and confirmation do not match",
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "User does not exist",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        error: "No password set",
        message:
          "This account was created with Google. Please use Google sign-in or contact support to set a password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid current password",
        message: "The current password you entered is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log("✅ Password changed for user:", user.email);

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error: any) {
    console.error("❌ Change password error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};

// ============================================================
// DELETE /api/user/account - Delete user account
// ============================================================
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        error: "User not found",
        message: "User does not exist",
      });
    }

    console.log("✅ Account deleted:", deletedUser.email);

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ Delete account error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};
