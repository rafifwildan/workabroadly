import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Extend Express User type untuk include fields we expect
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
    }
  }
}

// MIDDLEWARE: Verify JWT Token
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // STEP 1: Ambil token dari Authorization header
    const authHeader = req.headers.authorization;
    // Format expected: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const token = authHeader && authHeader.split(" ")[1];

    // STEP 2: Cek apakah token ada
    if (!token) {
      return res.status(401).json({ 
        error: "Access token required",
        message: "Please provide a valid token in Authorization header"
      });
    }

    // STEP 3: Verify token dengan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      name: string;
    };

    console.log("✅ Token valid for:", decoded.email);

    // STEP 4: Get user dari database (untuk ensure user masih exist)
    const user = await User.findById(decoded.id) as IUser;

    if (!user) {
      return res.status(401).json({ 
        error: "User not found",
        message: "User no longer exists in database"
      });
    }

    // STEP 5: Attach user ke request object
    // Sekarang controller bisa akses req.user
    req.user = {
      id: user.id, // mongoose .id is a string getter for _id
      email: user.email,
      name: user.name
    };
    
    // STEP 6: Lanjut ke controller
    next();

  } catch (error) {
    // Handle JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ 
        error: "Invalid token",
        message: "Token is malformed or invalid"
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ 
        error: "Token expired",
        message: "Please login again"
      });
    }

    console.error("❌ Auth middleware error:", error);
    return res.status(500).json({ error: "Authentication error" });
  }
};