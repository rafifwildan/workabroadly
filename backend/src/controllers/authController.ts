import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

// ============================================================
// UTILITY FUNCTION: Generate JWT Token
// ============================================================
export const generateToken = (user: IUser): string => {
  // PAYLOAD - data yang akan di-encode dalam token
  const payload = {
    id: String(user._id),  // Convert ObjectId to string
    email: user.email,
    name: user.name,
  };

  // JWT SECRET - key untuk sign token (dari .env)
  const secret = process.env.JWT_SECRET!;

  // OPTIONS - konfigurasi token
  const options: SignOptions = {
    expiresIn: "7d", // Token berlaku 7 hari
  };

  // SIGN - buat token dengan payload, secret, dan options
  const token = jwt.sign(payload, secret, options);

  return token;
};

// ============================================================
// NEW: SIGNUP dengan Email/Password
// POST /api/auth/signup
// ============================================================
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // ===== VALIDATION =====
    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Name, email, and password are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        error: "Password too short",
        details: "Password must be at least 8 characters",
      });
    }

    // ===== CHECK IF USER EXISTS =====
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
        details: "This email is already registered. Please login instead.",
      });
    }

    // ===== HASH PASSWORD =====
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ===== CREATE USER =====
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      credits: 50, // Default credits untuk user baru
      planTier: "Starter", // Default plan
      isOnboarded: false, // User belum onboarding
    });

    // ===== GENERATE JWT TOKEN =====
    const token = generateToken(user);

    // ===== LOG SUCCESS =====
    console.log("✅ New user registered:", user.email);

    // ===== RESPONSE =====
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        credits: user.credits,
        planTier: user.planTier,
        isOnboarded: user.isOnboarded,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error: any) {
    console.error("❌ Signup error:", error);
    res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  }
};

// ============================================================
// NEW: LOGIN dengan Email/Password
// POST /api/auth/login
// ============================================================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // ===== VALIDATION =====
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing credentials",
        details: "Email and password are required",
      });
    }

    // ===== FIND USER (include password field) =====
    // NOTE: password field is select: false by default, so we need to explicitly include it
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password"); // Include password field

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        details: "Email or password is incorrect",
      });
    }

    // ===== CHECK IF USER HAS PASSWORD =====
    // User might be registered via Google OAuth (no password)
    if (!user.password) {
      return res.status(400).json({
        error: "Account registered with Google",
        details:
          "This email was registered using Google. Please login with Google.",
      });
    }

    // ===== VERIFY PASSWORD =====
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
        details: "Email or password is incorrect",
      });
    }

    // ===== UPDATE LAST LOGIN =====
    user.lastLoginAt = new Date();
    await user.save();

    // ===== GENERATE JWT TOKEN =====
    const token = generateToken(user);

    // ===== LOG SUCCESS =====
    console.log("✅ User logged in:", user.email);

    // ===== RESPONSE =====
    res.json({
      message: "Login successful",
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        picture: user.picture,
        credits: user.credits,
        planTier: user.planTier,
        isOnboarded: user.isOnboarded,
        targetCountry: user.targetCountry,
        lastLoginAt: user.lastLoginAt,
      },
      token,
    });
  } catch (error: any) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
};

// ============================================================
// EXISTING: Google OAuth Callback Handler
// ============================================================
export const googleCallback = (req: Request, res: Response) => {
  try {
    // Ambil user dari request (sudah di-set oleh Passport)
    const user = req.user as IUser;

    console.log("🔍 DEBUG - User object:", user);
    console.log("🔍 DEBUG - User _id:", user?._id);

    if (!user) {
      console.error("❌ User object is null/undefined");
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=authentication_failed`
      );
    }

    if (!user._id) {
      console.error("❌ User _id is null/undefined");
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=authentication_failed`
      );
    }

    // GENERATE JWT TOKEN untuk user
    const token = generateToken(user);

    console.log("✅ Login successful:", user.email);
    console.log("🎫 Token generated:", token.substring(0, 20) + "...");

    // REDIRECT ke frontend dengan token di URL
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error("❌ Google callback error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};

// ============================================================
// EXISTING: Get Current User Info (Protected Route)
// ============================================================
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // req.user sudah di-set oleh authenticateToken middleware
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Get full user data from database
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user info
    res.json({
      id: String(user._id),
      email: user.email,
      name: user.name,
      picture: user.picture,
      credits: user.credits,
      planTier: user.planTier,
      isOnboarded: user.isOnboarded,
      targetCountry: user.targetCountry,
      careerGoals: user.careerGoals,
      experienceLevel: user.experienceLevel,
      lastLoginAt: user.lastLoginAt,
    });
  } catch (error) {
    console.error("❌ Get current user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ============================================================
// EXISTING: Logout Handler
// ============================================================
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
};