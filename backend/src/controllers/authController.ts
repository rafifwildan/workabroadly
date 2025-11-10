import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

// FUNCTION: Generate JWT Token
export const generateToken = (user: IUser): string => {
  // PAYLOAD - data yang akan di-encode dalam token
  const payload = {
    id: String(user._id),  // ✅ Convert ObjectId to string dengan String()
    email: user.email,
    name: user.name,
  };

  // JWT SECRET - key untuk sign token (dari .env)
  const secret = process.env.JWT_SECRET!;

  // OPTIONS - konfigurasi token
  const options: SignOptions = {
    expiresIn: "7d",        // Token berlaku 7 hari
  };

  // SIGN - buat token dengan payload, secret, dan options
  const token = jwt.sign(payload, secret, options);

  return token;
};

// HANDLER: Google OAuth Callback
export const googleCallback = (req: Request, res: Response) => {
  try {
    // Ambil user dari request (sudah di-set oleh Passport)
    const user = req.user as IUser;

    console.log("🔍 DEBUG - User object:", user); // ✅ Debug log
    console.log("🔍 DEBUG - User _id:", user?._id); // ✅ Debug log

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

    // REDIRECT ke callback page dengan token di URL
    // Callback page akan menyimpan token dan user data, lalu redirect ke /home
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);

  } catch (error) {
    console.error("❌ Google callback error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};

// HANDLER: Get Current User Info (Protected)
export const getCurrentUser = (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Return user info
    res.json({
      id: String(user._id),  // ✅ Convert to string
      email: user.email,
      name: user.name,
      picture: user.picture,
      tokens: user.tokens,
    });

  } catch (error) {
    console.error("❌ Get current user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// HANDLER: Logout
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
};

// ============================================================================
// EMAIL/PASSWORD AUTHENTICATION
// ============================================================================

// HANDLER: Register with Email/Password
export const registerWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // VALIDATION: Check required fields
    if (!email || !password || !name) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Email, password, and name are required",
      });
    }

    // VALIDATION: Password minimum length
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password too short",
        message: "Password must be at least 6 characters long",
      });
    }

    // CHECK: Email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        error: "Email already exists",
        message: "An account with this email already exists",
      });
    }

    // HASH PASSWORD: Use bcrypt with salt rounds of 10
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // CREATE USER
    const newUser = new User({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      credits: 50, // Default credits for new users
    });

    await newUser.save();

    console.log("✅ New user registered:", email);

    // GENERATE JWT TOKEN
    const token = generateToken(newUser);

    // RETURN: Success with token
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: String(newUser._id),
        email: newUser.email,
        name: newUser.name,
        picture: newUser.picture,
        credits: newUser.credits,
      },
    });
  } catch (error: any) {
    console.error("❌ Registration error:", error);

    // Handle MongoDB duplicate key error (email already exists)
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({
        error: "Email already exists",
        message: "An account with this email already exists. Please login instead.",
      });
    }

    res.status(500).json({
      error: "Registration failed",
      message: "An error occurred during registration",
    });
  }
};

// HANDLER: Login with Email/Password
export const loginWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // VALIDATION: Check required fields
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Email and password are required",
      });
    }

    // FIND USER: Include password field (normally excluded)
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      });
    }

    // CHECK: User has password (not OAuth-only user)
    if (!user.password) {
      return res.status(401).json({
        error: "Invalid login method",
        message: "This account was created with Google Sign-In. Please use Google to log in.",
      });
    }

    // VERIFY PASSWORD: Compare with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      });
    }

    console.log("✅ User logged in:", email);

    // GENERATE JWT TOKEN
    const token = generateToken(user);

    // RETURN: Success with token
    res.json({
      message: "Login successful",
      token,
      user: {
        id: String(user._id),
        email: user.email,
        name: user.name,
        picture: user.picture,
        credits: user.credits,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      error: "Login failed",
      message: "An error occurred during login",
    });
  }
};