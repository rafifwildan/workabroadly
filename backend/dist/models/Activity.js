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
// ============================================================
// SCHEMA: Activity MongoDB Schema
// ============================================================
const ActivitySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true, // Index for fast queries by userId
    },
    type: {
        type: String,
        enum: [
            "roleplay_started",
            "roleplay_completed",
            "chat_started",
            "credit_purchased",
            "credit_used",
            "plan_upgraded",
        ],
        required: true,
        index: true, // Index for filtering by type
    },
    description: {
        type: String,
        required: true,
    },
    metadata: {
        type: mongoose_1.Schema.Types.Mixed, // Flexible object for any additional data
        default: {},
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
// ============================================================
// INDEXES for faster queries
// ============================================================
// Compound index for userId + createdAt (most common query pattern)
ActivitySchema.index({ userId: 1, createdAt: -1 });
// Compound index for userId + type (for filtering by activity type)
ActivitySchema.index({ userId: 1, type: 1, createdAt: -1 });
// ============================================================
// EXPORT MODEL
// ============================================================
exports.default = mongoose_1.default.model("Activity", ActivitySchema);
