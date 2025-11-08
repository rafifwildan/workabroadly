import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/User";

// Define a plain User type for Passport
// This will not have Mongoose-specific methods or properties.
type PlainUser = {
  id: string;
  googleId?: string;
  email: string;
  name: string;
  picture?: string;
  credits: number;
  tokens: number;
  createdAt: Date;
  updatedAt: Date;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let userDoc = await User.findOne({ googleId: profile.id });

        if (!userDoc) {
          userDoc = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value,
          });
          console.log("🆕 New user created:", userDoc.email);
        } else {
          console.log("✅ Returning user:", userDoc.email);
        }

        // 🔥 FIXED: Convert the Mongoose document to a plain object before passing to done()
        const user = userDoc.toObject() as PlainUser;
        return done(null, user);

      } catch (error) {
        console.error("❌ Passport error:", error);
        return done(error as Error, undefined);
      }
    }
  )
);

// Serialize: Save user.id to the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize: Fetch user from DB using the id from the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const userDoc = await User.findById(id);
    if (!userDoc) {
      return done(null, false);
    }
    // 🔥 FIXED: Convert the Mongoose document to a plain object for consistency
    const user = userDoc.toObject() as PlainUser;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport;
