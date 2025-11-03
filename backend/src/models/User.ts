import mongoose, { Document, Schema } from "mongoose";
import IUserProgress  from "./UserProgress";

// Interface untuk TypeScript - mendefinisikan struktur data User
export interface IUser extends Document {
  googleId?: string;        // ID unik dari Google (contoh: "106538359435685394857")
  email: string;           // Email dari Google (contoh: "user@gmail.com")
  name: string;            // Nama lengkap (contoh: "John Doe")
  picture?: string;        // URL foto profile (dari Google)
  credits: number;         // Jumlah credits yang dimiliki user (untuk career coaching & roleplay)
  createdAt: Date;         // Kapan user dibuat
  updatedAt: Date;         // Kapan terakhir diupdate
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
    picture: {
      type: String,        // Optional, boleh kosong
    },
    credits: {
      type: Number,
      default: 50,         // Default 50 credits untuk user baru (FREE!)
      min: 0,              // Credits tidak boleh negatif
    },
  },
  {
    timestamps: true,      // Otomatis add createdAt & updatedAt
  }
);
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