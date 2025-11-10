"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const User_1 = __importDefault(require("../models/User"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Apply authentication to all routes
router.use(auth_1.authenticateToken);
/**
 * Get current user's credit balance
 * GET /api/user/credits
 */
router.get("/credits", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User_1.default.findById(req.user.id).select("credits");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            credits: user.credits,
            userId: req.user.id
        });
    }
    catch (error) {
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
router.get("/profile", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User_1.default.findById(req.user.id).select("-googleId");
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
    }
    catch (error) {
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
router.patch("/onboarding", userController_1.saveOnboarding);
/**
 * Update user profile
 * PUT /api/user/profile
 */
router.put("/profile", userController_1.updateProfile);
/**
 * Get user plan information
 * GET /api/user/plan
 */
router.get("/plan", userController_1.getPlanInfo);
/**
 * Change user password
 * PUT /api/user/change-password
 */
router.put("/change-password", userController_1.changePassword);
/**
 * Delete user account
 * DELETE /api/user/account
 */
router.delete("/account", userController_1.deleteAccount);
exports.default = router;
