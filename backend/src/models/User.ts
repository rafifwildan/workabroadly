import mongoose, { Document, Schema } from "mongoose";
import IUserProgress from "./UserProgress";

// Interface untuk TypeScript - mendefinisikan struktur data User
export interface IUser extends Document {
  // ===== EXISTING FIELDS (Google OAuth) =====
  googleId?: string;        // ID unik dari Google (contoh: "106538359435685394857")
  email: string;           // Email (contoh: "user@gmail.com")
  name: string;            // Nama lengkap (contoh: "John Doe")
  picture?: string;        // URL foto profile (dari Google)
  credits: number;         // Jumlah credits yang dimiliki user
  
  // ===== NEW FIELDS (Email/Password Auth & Profile) =====
  password?: string;       // Password hash (untuk email/password login)
  planTier: "Starter" | "Professional" | "Premium";  // Plan tier user
  targetCountry?: string;  // Negara tujuan (contoh: "Japan", "Korea")
  careerGoals?: string;    // Tujuan karir user
  experienceLevel?: string; // Level experience (contoh: "Entry", "Mid", "Senior")
  isOnboarded: boolean;    // Apakah user sudah complete onboarding
  lastLoginAt?: Date;      // Kapan terakhir login
  
  // ===== TIMESTAMPS =====
  createdAt: Date;         // Kapan user dibuat
  updatedAt: Date;         // Kapan terakhir diupdate
}

// Schema MongoDB - definisi struktur di database
const UserSchema = new Schema<IUser>(
  {
    // ===== GOOGLE OAUTH FIELDS =====
    googleId: {
      type: String,
      unique: true,        // Harus unik, tidak boleh duplicate (auto-create index)
      sparse: true,        // Allow null/undefined (untuk email/password login)
    },
    email: {
      type: String,
      required: true,      // Wajib ada
      unique: true,        // Email harus unik (auto-create index)
      lowercase: true,     // Convert to lowercase otomatis
      trim: true,          // Remove whitespace
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,        // Optional, boleh kosong
    },
    credits: {
      type: Number,
      default: 50,         // Default 50 credits untuk user baru (FREE!)
      min: 0,              // Credits tidak boleh negatif
    },

    // ===== NEW FIELDS =====
    password: {
      type: String,
      select: false,       // PENTING: Tidak di-return di queries by default (security)
    },
    planTier: {
      type: String,
      enum: ["Starter", "Professional", "Premium"],
      default: "Starter",  // Default plan untuk user baru
    },
    targetCountry: {
      type: String,
      trim: true,
    },
    careerGoals: {
      type: String,
      trim: true,
    },
    experienceLevel: {
      type: String,
      trim: true,
    },
    isOnboarded: {
      type: Boolean,
      default: false,      // Default false, jadi user harus complete onboarding
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,      // Otomatis add createdAt & updatedAt
  }
);

// ===== INDEXES untuk faster queries =====
// NOTE: email dan googleId sudah auto-indexed karena "unique: true"
// Jadi kita hanya perlu index untuk field yang tidak unique
UserSchema.index({ planTier: 1 });        // Index untuk filter by plan
UserSchema.index({ isOnboarded: 1 });     // Index untuk filter onboarded users

// ===== POST SAVE HOOK - Create UserProgress =====
UserSchema.post("save", async function (doc, next) {
  try {
    // Cek apakah user sudah punya progress
    const existingProgress = await IUserProgress.findOne({ userId: doc._id });
    if (!existingProgress) {
      await IUserProgress.create({ userId: doc._id });
    }
    next();
  } catch (err: unknown) {
    next(err as any);
  }
});

// Export model untuk dipakai di file lain
export default mongoose.model<IUser>("User", UserSchema);