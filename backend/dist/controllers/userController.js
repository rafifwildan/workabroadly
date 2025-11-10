"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.changePassword = exports.getPlanInfo = exports.saveOnboarding = exports.updateProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// ============================================================
// PUT /api/user/profile - Update user profile
// ============================================================
const updateProfile = async (req, res) => {
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
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, {
            name: name.trim(),
            targetCountry: targetCountry?.trim() || undefined,
            careerGoals: careerGoals?.trim() || undefined,
            experienceLevel: experienceLevel?.trim() || undefined,
        }, { new: true, runValidators: true }).select("-password");
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
    }
    catch (error) {
        console.error("❌ Update profile error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.updateProfile = updateProfile;
// ============================================================
// POST /api/user/onboarding - Save onboarding data
// ============================================================
const saveOnboarding = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { targetCountry, careerGoals, experienceLevel } = req.body;
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not authenticated",
            });
        }
        if (!targetCountry || targetCountry.trim().length === 0) {
            return res.status(400).json({
                error: "Invalid input",
                message: "Target country is required",
            });
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, {
            targetCountry: targetCountry.trim(),
            careerGoals: careerGoals?.trim() || undefined,
            experienceLevel: experienceLevel?.trim() || undefined,
            isOnboarded: true,
        }, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({
                error: "User not found",
                message: "User does not exist",
            });
        }
        console.log("✅ Onboarding completed:", updatedUser.email);
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
    }
    catch (error) {
        console.error("❌ Onboarding error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.saveOnboarding = saveOnboarding;
// ============================================================
// GET /api/user/plan - Get user plan information
// ============================================================
const getPlanInfo = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not authenticated",
            });
        }
        const user = await User_1.default.findById(userId).select("planTier credits createdAt");
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
    }
    catch (error) {
        console.error("❌ Get plan info error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.getPlanInfo = getPlanInfo;
// ============================================================
// PUT /api/user/change-password - Change user password
// ============================================================
const changePassword = async (req, res) => {
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
        const user = await User_1.default.findById(userId).select("+password");
        if (!user) {
            return res.status(404).json({
                error: "User not found",
                message: "User does not exist",
            });
        }
        if (!user.password) {
            return res.status(400).json({
                error: "No password set",
                message: "This account was created with Google. Please use Google sign-in or contact support to set a password.",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid current password",
                message: "The current password you entered is incorrect",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        console.log("✅ Password changed for user:", user.email);
        res.status(200).json({
            message: "Password changed successfully",
        });
    }
    catch (error) {
        console.error("❌ Change password error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.changePassword = changePassword;
// ============================================================
// DELETE /api/user/account - Delete user account
// ============================================================
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not authenticated",
            });
        }
        const deletedUser = await User_1.default.findByIdAndDelete(userId);
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
    }
    catch (error) {
        console.error("❌ Delete account error:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
};
exports.deleteAccount = deleteAccount;
