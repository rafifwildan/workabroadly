import express from "express";
import passport from "../config/passport";
import {
  signup,
  login,
  googleCallback,
  getCurrentUser,
  logout,
} from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// ============================================================
// EXISTING ROUTES: Google OAuth Authentication
// ============================================================

// ROUTE 3: Initiate Google OAuth
// GET /api/auth/google
// User klik "Login with Google" → hit endpoint ini
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], 
        prompt: "select_account", // Data apa yang kita minta dari Google
  })
);

// ROUTE 4: Google OAuth Callback
// GET /api/auth/google/callback
// Google redirect user ke sini setelah login berhasil
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=authentication_failed`,
    session: false, // Kita pakai JWT, jadi tidak perlu session
  }),
  googleCallback // Handle success, generate JWT, redirect ke frontend
);

// ============================================================
// NEW ROUTES: Email/Password Authentication
// ============================================================

// ROUTE 1: User Signup (Register) dengan Email/Password
// POST /api/auth/signup
router.post("/signup", signup);

// ROUTE 2: User Login dengan Email/Password
// POST /api/auth/login
router.post("/login", login);

// ============================================================
// PROTECTED ROUTES: Require JWT Token
// ============================================================

// ROUTE 5: Get Current User Info
// GET /api/auth/me
// Frontend hit endpoint ini untuk get user info
router.get("/me", authenticateToken, getCurrentUser);

// ROUTE 6: Logout
// POST /api/auth/logout
router.post("/logout", authenticateToken, logout);

export default router;