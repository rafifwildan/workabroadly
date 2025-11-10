import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import User, { IUser } from "../models/User";

// KONFIGURASI GOOGLE OAUTH STRATEGY
passport.use(
  new GoogleStrategy(
    {
      // Credentials dari Google Console (dari .env)
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      prompt: "consent",
      accessType: "offline",
    },
    
    // CALLBACK FUNCTION - dipanggil setelah user berhasil login di Google
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      console.log("[Passport] Google Strategy callback dipanggil.");

      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      if (!email) {
        console.error("[Passport Error] Tidak ada email yang dikembalikan dari Google.");
        return done(new Error("No email found from Google profile"), null);
      }

      try {
        const userData = {
          name: profile.displayName,
          email: email,
          picture: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
          googleId: profile.id
          // JANGAN atur hasCompletedOnboarding di sini
        };

        // Ini adalah logika 'upsert' yang membunuh \"User Hantu\"
        const user = await User.findOneAndUpdate(
          { email: email },
          { $set: userData }, // Update data jika user sudah ada
          {
            upsert: true, // BUAT user baru jika tidak ada
            new: true,    // Kembalikan dokumen yang baru
            setDefaultsOnInsert: true
          }
        );

        console.log(`[Passport Success] User ${email} berhasil di-upsert.`);
        return done(null, user); // Kirim user ke session

      } catch (error) {
        console.error("[Passport Error] Gagal upsert user ke MongoDB:", error);
        return done(error as Error, null);
      }
    }
  )
);

// SERIALIZE USER - simpan user ke session
// Dipanggil setelah user berhasil login
passport.serializeUser((user: any, done) => {
  // Simpan hanya user ID ke session (bukan seluruh object)
  done(null, user._id || user.id);
});

// DESERIALIZE USER - ambil user dari session
// Dipanggil di setiap request untuk get user data
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, null);
    }
    // ✅ Return full user document
    done(null, user as any);
  } catch (error) {
    done(error, null);
  }
});

export default passport;