import mongoose, { Document, Schema } from "mongoose";

// Interface untuk TypeScript - mendefinisikan struktur data User
export interface IUser extends Document {
  googleId?: string;        // ID unik dari Google (contoh: "106538359435685394857")
  email: string;           // Email dari Google atau email signup (contoh: "user@gmail.com")
  name: string;            // Nama lengkap (contoh: "John Doe")
  password?: string;       // Hashed password (untuk email/password login)
  picture?: string;        // URL foto profile (dari Google)
  credits: number;         // Jumlah credits yang dimiliki user (untuk career coaching & roleplay)
  tokens?: number;         // Token balance for purchases/transactions
  planTier?: string;       // Subscription plan tier (free, pro, premium)
  targetCountry?: string;  // Target country for work abroad
  careerGoals?: string;    // Career goals and aspirations
  experienceLevel?: string;// Professional experience level
  hasCompletedOnboarding?: boolean; // Whether user completed onboarding
  createdAt: Date;         // Kapan user dibuat
  updatedAt: Date;         // Kapan terakhir diupdate
  primaryInterest?: string;
  originCountry?: string;
  targetCulture?: string;
  employeeType?: string;
  educationLevel?: string;
  industry?: string;
  occupation?: string;
  yearsOfExperience?: string;
}

// Schema MongoDB - definisi struktur di database
const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      unique: true,        // Harus unik, tidak boleh duplicate
      sparse: true,        // Allow null/undefined (untuk future: bisa add email/password login)
    },
    email: {
      type: String,
      required: true,      // Wajib ada
      unique: true,        // Email harus unik
      lowercase: true,     // Convert to lowercase otomatis
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,        // Hashed password (bcrypt)
      select: false,       // Don't include password in queries by default
    },
    picture: {
      type: String,        // Optional, boleh kosong
    },
    credits: {
      type: Number,
      default: 50,         // Default 50 credits untuk user baru (FREE!)
      min: 0,              // Credits tidak boleh negatif
    },
    tokens: {
      type: Number,
      default: 0,
      min: 0,
    },
    planTier: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    targetCountry: {
      type: String,
    },
    careerGoals: {
      type: String,
    },
    experienceLevel: {
      type: String,
    },
    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
    },
    primaryInterest: {
        type: String,
    },
    originCountry: {
        type: String,
    },
    targetCulture: {
        type: String,
    },
    employeeType: {
        type: String,
    },
    educationLevel: {
        type: String,
    },
    industry: {
        type: String,
    },
    occupation: {
        type: String,
    },
    yearsOfExperience: {
        type: String,
    },
  },
  {
    timestamps: true,      // Otomatis add createdAt & updatedAt
  }
);

// Export model untuk dipakai di file lain
export default mongoose.model<IUser>("User", UserSchema);