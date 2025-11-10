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
// Schema MongoDB - definisi struktur di database
const UserSchema = new mongoose_1.Schema({
    googleId: {
        type: String,
        unique: true, // Harus unik, tidak boleh duplicate
        sparse: true, // Allow null/undefined (untuk future: bisa add email/password login)
    },
    email: {
        type: String,
        required: true, // Wajib ada
        unique: true, // Email harus unik
        lowercase: true, // Convert to lowercase otomatis
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String, // Hashed password (bcrypt)
        select: false, // Don't include password in queries by default
    },
    picture: {
        type: String, // Optional, boleh kosong
    },
    credits: {
        type: Number,
        default: 50, // Default 50 credits untuk user baru (FREE!)
        min: 0, // Credits tidak boleh negatif
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
    isOnboarded: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Otomatis add createdAt & updatedAt
});
// Export model untuk dipakai di file lain
exports.default = mongoose_1.default.model("User", UserSchema);
