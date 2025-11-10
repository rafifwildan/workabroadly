"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = __importDefault(require("../models/User"));
// KONFIGURASI GOOGLE OAUTH STRATEGY
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    // Credentials dari Google Console (dari .env)
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, 
// CALLBACK FUNCTION - dipanggil setelah user berhasil login di Google
async (accessToken, refreshToken, profile, done) => {
    try {
        // STEP 1: Cek apakah user sudah ada di database
        let user = await User_1.default.findOne({ googleId: profile.id });
        if (user) {
            // User sudah ada - RETURNING USER
            console.log("✅ Returning user:", user.email);
            // ✅ Return full user object, bukan plain object
            return done(null, user);
        }
        // STEP 2: User belum ada - CREATE NEW USER
        user = await User_1.default.create({
            googleId: profile.id, // dari Google
            email: profile.emails?.[0]?.value, // dari Google
            name: profile.displayName, // dari Google
            picture: profile.photos?.[0]?.value, // dari Google
        });
        console.log("🆕 New user created:", user.email);
        // ✅ Return full user object
        return done(null, user);
    }
    catch (error) {
        console.error("❌ Passport error:", error);
        return done(error, undefined);
    }
}));
// SERIALIZE USER - simpan user ke session
// Dipanggil setelah user berhasil login
passport_1.default.serializeUser((user, done) => {
    // Simpan hanya user ID ke session (bukan seluruh object)
    done(null, user._id || user.id);
});
// DESERIALIZE USER - ambil user dari session
// Dipanggil di setiap request untuk get user data
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await User_1.default.findById(id);
        if (!user) {
            return done(null, null);
        }
        // ✅ Return full user document
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
});
exports.default = passport_1.default;
