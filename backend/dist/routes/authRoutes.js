"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../config/passport"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
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
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"], // Data apa yang kita minta dari Google
}));
// ROUTE 2: Google OAuth Callback
// Google redirect user ke sini setelah login berhasil
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=authentication_failed`,
    session: false, // Kita pakai JWT, jadi tidak perlu session
}), authController_1.googleCallback // Handle success, generate JWT, redirect ke frontend
);
// ROUTE 3: Get Current User (Protected)
// Frontend hit endpoint ini untuk get user info
router.get("/me", auth_1.authenticateToken, authController_1.getCurrentUser);
// ROUTE 4: Logout
router.post("/logout", auth_1.authenticateToken, authController_1.logout);
// ROUTE 5: Register with Email/Password
router.post("/register", authController_1.registerWithEmail);
// ROUTE 6: Login with Email/Password
router.post("/login", authController_1.loginWithEmail);
exports.default = router;
