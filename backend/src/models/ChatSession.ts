import mongoose, { Document, Schema } from "mongoose";

// Interface untuk single message dalam conversation
export interface IMessage {
  role: "user" | "assistant";  // Siapa yang kirim message
  content: string;              // Isi message
  timestamp: Date;              // Kapan message dikirim
  metadata?: {                  // Optional metadata for dual-response system
    insight?: string;           // Cultural insight from Clara (for assistant messages)
    hasInsight?: boolean;       // Flag to indicate if insight is present
  };
}

// Interface untuk conversation state (Clara's interactive menu system)
export interface IConversationState {
  step: number;                    // Current step in menu flow (1-7)
  selectedCulture?: string;        // Selected culture (e.g., "id", "ko", "ja", "en")
  selectedCategory?: string;       // Selected category (e.g., "workplace")
  selectedScenario?: string;       // Selected scenario (e.g., "firstDay")
  selectedRole?: string;           // Selected role (e.g., "manager")
  isInRoleplay: boolean;          // Whether user is actively in roleplay mode
}

// Interface untuk ChatSession document
export interface IChatSession extends Document {
  userId: mongoose.Types.ObjectId;  // Reference ke User yang punya session ini
  sessionId: string;                // Unique identifier untuk session
  title: string;                    // Judul session (auto-generated dari first message)
  persona: "clara" | "sora" | "arlo"; // AI persona for this session (locked per session)
  messages: IMessage[];             // Array of messages dalam conversation
  conversationState?: IConversationState; // Clara's interactive menu state (optional, only for Clara)
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
    metadata: {
      type: {
        insight: {
          type: String,
          required: false,
        },
        hasInsight: {
          type: Boolean,
          required: false,
        },
      },
      required: false,              // Metadata is optional (only for Clara dual-response)
    },
  },
  { _id: false }  // Tidak perlu _id untuk sub-document
);

// Sub-schema untuk ConversationState (Clara's menu system)
const ConversationStateSchema = new Schema<IConversationState>(
  {
    step: {
      type: Number,
      required: true,
      default: 1,                  // Start at step 1 (culture selection)
      min: 1,
      max: 7,
    },
    selectedCulture: {
      type: String,
      required: false,
    },
    selectedCategory: {
      type: String,
      required: false,
    },
    selectedScenario: {
      type: String,
      required: false,
    },
    selectedRole: {
      type: String,
      required: false,
    },
    isInRoleplay: {
      type: Boolean,
      default: false,
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
    persona: {
      type: String,
      enum: ["clara", "sora", "arlo"],
      required: true,
      default: "clara",            // Default persona is Clara
    },
    messages: {
      type: [MessageSchema],       // Array of messages
      default: [],                 // Start dengan empty array
    },
    conversationState: {
      type: ConversationStateSchema, // Clara's interactive menu state
      required: false,             // Optional - only for Clara persona
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