"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Sub-schema untuk Messages
const MessageSchema = new mongoose_1.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"], // Hanya boleh 2 nilai ini
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, // Auto-set ke waktu sekarang
    },
}, { _id: false } // Tidak perlu _id untuk sub-document
);
// Main ChatSession Schema
const ChatSessionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User", // Reference ke User model
        required: true,
        index: true, // Index untuk faster queries by userId
    },
    sessionId: {
        type: String,
        required: true,
        unique: true, // Setiap session punya ID unik
        index: true, // Index untuk faster lookup
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
        default: "clara", // Default persona is Clara
    },
    messages: {
        type: [MessageSchema], // Array of messages
        default: [], // Start dengan empty array
    },
}, {
    timestamps: true, // Auto-add createdAt & updatedAt
});
// Compound index: userId + createdAt untuk efficient sorting
ChatSessionSchema.index({ userId: 1, createdAt: -1 });
// Export model
exports.default = mongoose_1.default.model("ChatSession", ChatSessionSchema);
