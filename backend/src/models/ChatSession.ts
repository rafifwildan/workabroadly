import mongoose, { Document, Schema } from "mongoose";

// Interface untuk single message dalam conversation
export interface IMessage {
  role: "user" | "assistant";  // Siapa yang kirim message
  content: string;              // Isi message
  timestamp: Date;              // Kapan message dikirim
}

// Interface untuk ChatSession document
export interface IChatSession extends Document {
  userId: mongoose.Types.ObjectId;  // Reference ke User yang punya session ini
  sessionId: string;                // Unique identifier untuk session
  title: string;                    // Judul session (auto-generated dari first message)
  messages: IMessage[];             // Array of messages dalam conversation
  createdAt: Date;                  // Kapan session dibuat
  updatedAt: Date;                  // Kapan terakhir ada activity
}

// Sub-schema untuk Messages
const MessageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],  // Hanya boleh 2 nilai ini
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,           // Auto-set ke waktu sekarang
    },
  },
  { _id: false }  // Tidak perlu _id untuk sub-document
);

// Main ChatSession Schema
const ChatSessionSchema = new Schema<IChatSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",                 // Reference ke User model
      required: true,
      index: true,                 // Index untuk faster queries by userId
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,                // Setiap session punya ID unik
      index: true,                 // Index untuk faster lookup
    },
    title: {
      type: String,
      required: true,
      default: "New Conversation",
    },
    messages: {
      type: [MessageSchema],       // Array of messages
      default: [],                 // Start dengan empty array
    },
  },
  {
    timestamps: true,              // Auto-add createdAt & updatedAt
  }
);

// Compound index: userId + createdAt untuk efficient sorting
ChatSessionSchema.index({ userId: 1, createdAt: -1 });

// Export model
export default mongoose.model<IChatSession>("ChatSession", ChatSessionSchema);