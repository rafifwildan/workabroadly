import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/User";

// KONFIGURASI GOOGLE OAUTH STRATEGY
passport.use(
  new GoogleStrategy(
    {
      // Credentials dari Google Console (dari .env)
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    
    // CALLBACK FUNCTION - dipanggil setelah user berhasil login di Google
    async (accessToken, refreshToken, profile, done) => {
      try {
        // STEP 1: Cek apakah user sudah ada di database
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User sudah ada - RETURNING USER
          console.log("✅ Returning user:", user.email);
          return done(null, {
            id: user.id,
            email: user.email,
            name: user.name
          });
        }

        // STEP 2: User belum ada - CREATE NEW USER
        user = await User.create({
          googleId: profile.id,                      // dari Google
          email: profile.emails?.[0]?.value,         // dari Google
          name: profile.displayName,                 // dari Google
          picture: profile.photos?.[0]?.value,       // dari Google
        });

        console.log("🆕 New user created:", user.email);
        return done(null, {
          id: user.id,
          email: user.email,
          name: user.name
        });

      } catch (error) {
        console.error("❌ Passport error:", error);
        return done(error as Error, undefined);
      }
    }
  )
);

// SERIALIZE USER - simpan user ke session
// Dipanggil setelah user berhasil login
passport.serializeUser((user: any, done) => {
  // Simpan hanya user ID ke session (bukan seluruh object)
  done(null, user.id);
});

// DESERIALIZE USER - ambil user dari session
// Dipanggil di setiap request untuk get user data
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, null);
    }
    done(null, {
      id: user.id,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    done(error, null);
  }
});

export default passport;