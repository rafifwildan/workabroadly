import express from "express";
import passport from "../config/passport";
import { googleCallback, getCurrentUser, logout } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// //Debug log
// console.log("Auth routes loaded!");

// router.get("/google", (req, res, next) => {
//   console.log(" /auth/google hit!");  // ← Add log
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })(req, res, next);
// });

// ROUTE 1: Initiate Google OAuth
// User klik "Login with Google" → hit endpoint ini
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],  // Data apa yang kita minta dari Google
  })
);

// ROUTE 2: Google OAuth Callback
// Google redirect user ke sini setelah login berhasil
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=authentication_failed`,
    session: false,  // Kita pakai JWT, jadi tidak perlu session
  }),
  googleCallback  // Handle success, generate JWT, redirect ke frontend
);

// ROUTE 3: Get Current User (Protected)
// Frontend hit endpoint ini untuk get user info
router.get("/me", authenticateToken, getCurrentUser);

// ROUTE 4: Logout
router.post("/logout", authenticateToken, logout);

export default router;