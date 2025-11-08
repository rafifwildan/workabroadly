import mongoose, { Document, Schema } from "mongoose";

// Interface untuk TypeScript - mendefinisikan struktur data User
export interface IUser extends Document {
  googleId?: string;        // ID unik dari Google
  email: string;           // Email dari Google
  name: string;            // Nama lengkap
  picture?: string;        // URL foto profile
  credits: number;         // Jumlah credits yang dimiliki user
  tokens: number;          // 🔥 FIXED: Added tokens field for premium features
  createdAt: Date;         // Kapan user dibuat
  updatedAt: Date;         // Kapan terakhir diupdate
}

// Schema MongoDB - definisi struktur di database
const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    credits: {
      type: Number,
      default: 50,
      min: 0,
    },
    tokens: { // 🔥 FIXED: Added tokens field to the database schema
      type: Number,
      default: 10, // Default 10 tokens for new users
      min: 0,
    },
  },
  {
    timestamps: true, // Otomatis add createdAt & updatedAt
    
    // 🔥 FIXED: Add a virtual 'id' property and clean up the JSON output 
    // This makes it compatible with Passport and other libraries.
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id; // Remap _id to id
        delete ret._id;   // Delete the old _id
        delete ret.__v;   // Delete the version key
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Export model untuk dipakai di file lain
export default mongoose.model<IUser>("User", UserSchema);
