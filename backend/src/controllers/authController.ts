import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../models/User";

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

    // REDIRECT ke frontend dengan token di URL
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