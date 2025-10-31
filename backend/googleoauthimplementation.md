# 🔐 Implementasi Google OAuth Login - Panduan Lengkap dari Awal

## 📚 Table of Contents
1. [Konsep Dasar OAuth](#konsep-dasar)
2. [Arsitektur System](#arsitektur-system)
3. [Setup Google Console](#setup-google-console)
4. [Backend Implementation](#backend-implementation)
5. [Testing](#testing)
6. [Flow Explanation](#flow-explanation)

---

## 🧠 PART 1: Konsep Dasar OAuth

### Apa itu Google OAuth?

**OAuth (Open Authorization)** adalah protokol yang memungkinkan user login ke aplikasi kita menggunakan akun Google mereka, **tanpa share password Google** ke aplikasi kita.

### Kenapa Pakai OAuth?

✅ **Keamanan:** User tidak perlu kasih password ke kita  
✅ **User Experience:** Login cepat, tidak perlu buat akun baru  
✅ **Trust:** User percaya ke Google untuk handle authentication  
✅ **Less Work:** Kita tidak perlu handle password reset, email verification, etc  

### Konsep Penting:

**1. OAuth Provider (Google)**
- Pihak yang handle authentication
- Verify identity user
- Berikan data user ke aplikasi kita

**2. Client Application (Backend di 3010)**
- Aplikasi yang minta akses ke data user
- Terima data dari Google
- Generate token sendiri untuk session management

**3. Resource Owner (User)**
- Pemilik akun Google
- Yang authorize aplikasi kita untuk akses data mereka

**4. Authorization Flow:**
```
User → Web Workabroadly → Google Login → User Approve 
→ Google Kasih Code → Kita Tukar Code dengan User Data 
→ Kita Simpan User → Generate JWT Token → User Login
```

---

## 🏗️ PART 2: Arsitektur System

### Flow Diagram Lengkap:

```
┌─────────────┐
│   Browser   │
│   (User)    │
└──────┬──────┘
       │ 1. Click "Login with Google"
       │
       ▼
┌─────────────────────────────────────────┐
│  Frontend                               │
│  Redirect ke backend: /auth/google      │
└──────────────┬──────────────────────────┘
               │
               │ 2. GET /auth/google
               ▼
┌─────────────────────────────────────────┐
│  Backend (Express + Passport)            │
│  - Check credentials                     │
│  - Generate Google OAuth URL             │
│  - Redirect user ke Google               │
└──────────────┬──────────────────────────┘
               │
               │ 3. Redirect
               ▼
┌─────────────────────────────────────────┐
│  Google OAuth Server                    │
│  - User login (if not logged in)        │
│  - Show consent screen                  │
│  - User click "Allow"                   │
└──────────────┬──────────────────────────┘
               │
               │ 4. Redirect dengan authorization code
               │    URL: /auth/google/callback?code=xyz123
               ▼
┌─────────────────────────────────────────┐
│  Backend (Passport Callback)             │
│  - Receive authorization code            │
│  - Exchange code untuk access token      │
│  - Get user data dari Google             │
│  - Check: User exist di database?        │
│    ├─ Yes: Get existing user             │
│    └─ No: Create new user                │
│  - Generate JWT token                    │
│  - Redirect ke frontend dengan token     │
└──────────────┬────────────────────────── ┘
               │
               │ 5. Redirect: /auth/callback?token=jwt_token
               ▼
┌─────────────────────────────────────────┐
│  Frontend                                │
│  - Extract token dari URL                │
│  - Save token ke localStorage            │
│  - Redirect ke dashboard/home            │
└─────────────────────────────────────────┘
               │
               │ 6. API Calls dengan token
               │    Header: Authorization: Bearer jwt_token
               ▼
┌─────────────────────────────────────────┐
│  Backend (Protected Routes)              │
│  - Verify JWT token                      │
│  - Get user data                         │
│  - Return response                       │
└─────────────────────────────────────────┘
```

### Komponen Backend:

```
backend/
├── src/
│   ├── models/
│   │   └── User.ts              ← MongoDB schema untuk user
│   │
│   ├── config/
│   │   ├── db.ts                ← MongoDB connection
│   │   └── passport.ts          ← Passport OAuth strategy
│   │
│   ├── controllers/
│   │   └── authController.ts    ← Handle OAuth callbacks, JWT
│   │
│   ├── middleware/
│   │   └── auth.ts              ← Verify JWT token
│   │
│   ├── routes/
│   │   └── authRoutes.ts        ← Auth endpoints
│   │
│   └── server.ts                ← Main Express app
│
└── .env                          ← Credentials & config
```

---

## ⚙️ PART 3: Setup Google Console

### Step 1: Buat Project di Google Cloud

1. **Buka Google Cloud Console**
   - URL: https://console.cloud.google.com
   - Login dengan akun Google

2. **Create New Project**
   - Click dropdown project (kiri atas)
   - "New Project"
   - Nama: "WorkAbroadly" (atau nama aplikasi kamu)
   - Click "Create"
   - Tunggu ~30 detik

### Step 2: Setup OAuth Consent Screen

**Consent screen** adalah halaman yang user lihat saat diminta authorize aplikasi kita.

1. **Navigate ke OAuth Consent Screen**
   - Menu: APIs & Services → OAuth consent screen

2. **Pilih User Type**
   - **Internal:** Hanya untuk organization kamu (perlu Google Workspace)
   - **External:** Untuk public (pilih ini untuk development)
   - Click "Create"

3. **App Information**
   ```
   App name:              WorkAbroadly
   User support email:    your-email@gmail.com
   App logo:              (optional, bisa skip dulu)
   ```

4. **App Domain** (optional untuk development)
   - Skip dulu untuk localhost testing

5. **Developer Contact Information**
   ```
   Email addresses:       your-email@gmail.com
   ```

6. **Click "Save and Continue"** (3x sampai selesai)

7. **Add Test Users** (penting!)
   - Scroll ke "Test users"
   - Click "Add Users"
   - Masukkan email yang akan kamu pakai untuk testing
   - Click "Save"

**⚠️ Important:** Kalau user type "External" dan app belum published, hanya test users yang bisa login!

### Step 3: Create OAuth Client ID

**Client ID & Secret** adalah credentials yang identify aplikasi kita ke Google.

1. **Navigate ke Credentials**
   - Menu: APIs & Services → Credentials

2. **Create Credentials**
   - Click "+ Create Credentials"
   - Pilih "OAuth client ID"

3. **Configure OAuth Client**
   ```
   Application type:  Web application
   Name:              WorkAbroadly Backend
   ```

4. **Authorized JavaScript Origins**
   - Click "+ Add URI"
   - Masukkan: `http://localhost:3010`
   
   **Penjelasan:** Ini adalah domain tempat aplikasi kita running. Google akan allow requests dari domain ini.

5. **Authorized Redirect URIs**
   - Click "+ Add URI"
   - Masukkan: `http://localhost:3010/auth/google/callback`
   
   **Penjelasan:** Setelah user authorize, Google akan redirect ke URL ini dengan authorization code.
   
   ⚠️ **Harus EXACT match!** Kalau beda 1 karakter pun (trailing slash, port, protocol), akan error!

6. **Create**
   - Click "Create"
   - Modal muncul dengan Client ID dan Client Secret
   - **COPY KEDUANYA!** Simpan di tempat aman

**Client ID contoh:**
```
123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

**Client Secret contoh:**
```
GOCSPX-abcdefghijklmnopqrstuvwxyz
```

---

## 💻 PART 4: Backend Implementation

### Step 1: Install Dependencies

```bash
cd backend

# Install production dependencies
npm install passport passport-google-oauth20 express-session jsonwebtoken

# Install TypeScript types
npm install --save-dev @types/passport @types/passport-google-oauth20 @types/express-session @types/jsonwebtoken
```

**Penjelasan dependencies:**

- **passport:** Framework untuk authentication di Node.js
- **passport-google-oauth20:** Strategy khusus untuk Google OAuth 2.0
- **express-session:** Handle session (untuk Passport)
- **jsonwebtoken:** Generate & verify JWT token

### Step 2: Configure Environment Variables

**File: `.env`**

```env
# Server Configuration
PORT=3010
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGO_URI=your_mongodb_connection_string

# Google OAuth
GOOGLE_CLIENT_ID=paste_client_id_dari_google_console
GOOGLE_CLIENT_SECRET=paste_client_secret_dari_google_console
GOOGLE_CALLBACK_URL=http://localhost:3010/auth/google/callback

# JWT Configuration
JWT_SECRET=your_super_secret_random_string_min_32_chars
SESSION_SECRET=another_random_string_for_session
```

**Generate JWT_SECRET:**
```bash
# Run di terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy hasil, paste ke JWT_SECRET
```

**⚠️ Security Notes:**
- Jangan commit `.env` ke Git! (add ke `.gitignore`)
- Gunakan secret yang berbeda untuk production
- JWT_SECRET harus random dan panjang (min 32 chars)

### Step 3: Create User Model

**File: `src/models/User.ts`**

```typescript
import mongoose, { Document, Schema } from "mongoose";

// TypeScript Interface - definisi struktur data
export interface IUser extends Document {
  googleId?: string;      // ID unik dari Google
  email: string;          // Email user
  name: string;           // Nama lengkap
  picture?: string;       // URL foto profile
  createdAt: Date;        // Kapan user register
  updatedAt: Date;        // Kapan terakhir update
}

// MongoDB Schema - struktur di database
const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      unique: true,       // Tidak boleh duplicate
      sparse: true,       // Allow null (untuk future: email/password login)
    },
    email: {
      type: String,
      required: true,     // Wajib ada
      unique: true,       // Email harus unik
      lowercase: true,    // Convert ke lowercase
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,       // Optional
    },
  },
  {
    timestamps: true,     // Auto-add createdAt & updatedAt
  }
);

export default mongoose.model<IUser>("User", UserSchema);
```

**Penjelasan:**
- `googleId`: ID unik dari Google (contoh: "106538359435685394857")
- `sparse: true`: Biar bisa add authentication method lain nanti (email/password)
- `timestamps: true`: Mongoose otomatis handle createdAt & updatedAt

### Step 4: Configure Passport Strategy

**File: `src/config/passport.ts`**

```typescript
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/User";

// ============================================
// PASSPORT GOOGLE OAUTH STRATEGY
// ============================================

passport.use(
  new GoogleStrategy(
    {
      // Credentials dari Google Console
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    
    // VERIFY CALLBACK
    // Function ini dipanggil setelah Google verify user berhasil
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("📥 Received profile from Google:", {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        });

        // STEP 1: Check apakah user sudah exist di database
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User sudah ada - RETURNING USER
          console.log("✅ Existing user found:", user.email);
          return done(null, user);
        }

        // STEP 2: User belum ada - CREATE NEW USER
        user = await User.create({
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          picture: profile.photos?.[0]?.value,
        });

        console.log("🆕 New user created:", user.email);
        return done(null, user);

      } catch (error) {
        console.error("❌ Passport strategy error:", error);
        return done(error as Error, undefined);
      }
    }
  )
);

// ============================================
// SERIALIZE USER
// ============================================
// Dipanggil setelah login berhasil
// Simpan user ID ke session (bukan seluruh object)
passport.serializeUser((user: any, done) => {
  console.log("💾 Serializing user:", user.id);
  done(null, user.id);
});

// ============================================
// DESERIALIZE USER
// ============================================
// Dipanggil di setiap request untuk get user data dari session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, null);
    }
    console.log("📦 Deserialized user:", user.email);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
```

**Penjelasan Verify Callback Parameters:**

- **accessToken:** Token dari Google untuk call Google APIs (contoh: get calendar, contacts)
- **refreshToken:** Token untuk get new accessToken kalau expired (optional)
- **profile:** Data user dari Google (id, name, email, photo)
- **done:** Callback untuk kasih tau Passport kita sudah selesai process

**Profile Object contoh:**
```json
{
  "id": "106538359435685394857",
  "displayName": "John Doe",
  "emails": [{ "value": "john.doe@gmail.com", "verified": true }],
  "photos": [{ "value": "https://lh3.googleusercontent.com/..." }]
}
```

### Step 5: Create Auth Controller

**File: `src/controllers/authController.ts`**

```typescript
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

// ============================================
// GENERATE JWT TOKEN
// ============================================
export const generateToken = (user: IUser): string => {
  // PAYLOAD - data yang akan disimpan dalam token
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  // JWT SECRET - key untuk sign token
  const secret = process.env.JWT_SECRET!;

  // OPTIONS
  const options = {
    expiresIn: "7d",  // Token berlaku 7 hari
  };

  // SIGN TOKEN
  const token = jwt.sign(payload, secret, options);

  console.log("🎫 JWT Token generated for:", user.email);
  
  return token;
};

// ============================================
// GOOGLE OAUTH CALLBACK HANDLER
// ============================================
export const googleCallback = (req: Request, res: Response) => {
  try {
    // User sudah di-set oleh Passport middleware
    const user = req.user as IUser;

    if (!user) {
      console.error("❌ No user in request");
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=authentication_failed`
      );
    }

    // GENERATE JWT TOKEN
    const token = generateToken(user);

    console.log("✅ OAuth callback successful for:", user.email);
    console.log("🔗 Redirecting to frontend with token");

    // REDIRECT ke frontend dengan token
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}`
    );

  } catch (error) {
    console.error("❌ OAuth callback error:", error);
    res.redirect(
      `${process.env.FRONTEND_URL}/login?error=server_error`
    );
  }
};

// ============================================
// GET CURRENT USER (Protected Route)
// ============================================
export const getCurrentUser = (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    
    if (!user) {
      return res.status(401).json({ 
        error: "Not authenticated" 
      });
    }

    // Return user info (jangan return sensitive data!)
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    });

  } catch (error) {
    console.error("❌ Get current user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ============================================
// LOGOUT
// ============================================
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("❌ Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    
    console.log("👋 User logged out");
    res.json({ message: "Logged out successfully" });
  });
};
```

**JWT Token Structure:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTJmNGIzYzFlNWQ2IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzYxNzk0OTQwLCJleHAiOjE3NjIzOTk3NDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

├─ Header:     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
│              {"alg":"HS256","typ":"JWT"}
│
├─ Payload:    eyJpZCI6IjY3YTJmNGIzYzFlNWQ2IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIn0
│              {"id":"67a2f4b3c1e5d6","email":"user@example.com","name":"John Doe","iat":1761794940,"exp":1762399740}
│
└─ Signature:  SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
               HMAC-SHA256(base64(header) + "." + base64(payload), JWT_SECRET)
```

**Important:** Payload di-encode (bukan encrypt)! Jadi jangan simpan data sensitif di payload.

### Step 6: Create Auth Middleware

**File: `src/middleware/auth.ts`**

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Extend Express types
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
    }
  }
}

// ============================================
// AUTHENTICATE TOKEN MIDDLEWARE
// ============================================
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // STEP 1: Extract token dari Authorization header
    const authHeader = req.headers.authorization;
    // Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const token = authHeader && authHeader.split(" ")[1];

    // STEP 2: Check token existence
    if (!token) {
      return res.status(401).json({ 
        error: "Access token required",
        message: "Please provide a valid token in Authorization header"
      });
    }

    console.log("🔍 Verifying token...");

    // STEP 3: Verify token dengan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      name: string;
    };

    console.log("✅ Token valid for:", decoded.email);

    // STEP 4: Get user dari database
    const user = await User.findById(decoded.id) as IUser;

    if (!user) {
      return res.status(401).json({ 
        error: "User not found",
        message: "User no longer exists in database"
      });
    }

    // STEP 5: Attach user to request object
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    
    // STEP 6: Continue to controller
    next();

  } catch (error) {
    // Handle JWT specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("❌ Invalid token");
      return res.status(403).json({ 
        error: "Invalid token",
        message: "Token is malformed or invalid"
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      console.error("❌ Token expired");
      return res.status(403).json({ 
        error: "Token expired",
        message: "Please login again"
      });
    }

    console.error("❌ Auth middleware error:", error);
    return res.status(500).json({ 
      error: "Authentication error" 
    });
  }
};
```

**Middleware Flow:**

```
Request masuk dengan header:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
       ↓
Extract token (ambil setelah "Bearer ")
       ↓
Verify dengan JWT_SECRET
       ↓
Valid? → Decode payload → Get user ID
       ↓
Query database → User exist?
       ↓
Attach user ke req.user
       ↓
next() → Lanjut ke controller
```

### Step 7: Create Auth Routes

**File: `src/routes/authRoutes.ts`**

```typescript
import express from "express";
import passport from "../config/passport";
import { 
  googleCallback, 
  getCurrentUser, 
  logout 
} from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

console.log("✅ Auth routes loaded!");

// ============================================
// ROUTE 1: Initiate Google OAuth
// ============================================
router.get("/google", 
  (req, res, next) => {
    console.log("🔵 /auth/google endpoint hit");
    next();
  },
  passport.authenticate("google", { 
    scope: ["profile", "email"]
  })
);

// Scope explanation:
// - "profile": nama, foto
// - "email": email address

// ============================================
// ROUTE 2: Google OAuth Callback
// ============================================
router.get("/google/callback",
  (req, res, next) => {
    console.log("🔵 /auth/google/callback hit");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=authentication_failed`,
    session: false,  // Kita pakai JWT, tidak perlu session persistence
  }),
  googleCallback
);

// ============================================
// ROUTE 3: Get Current User (Protected)
// ============================================
router.get("/me", authenticateToken, getCurrentUser);

// ============================================
// ROUTE 4: Logout
// ============================================
router.post("/logout", authenticateToken, logout);

export default router;
```

**Route Explanation:**

**Route 1: `/auth/google`**
- User klik "Login with Google" di frontend
- Hit endpoint ini
- Passport generate Google OAuth URL
- Redirect user ke Google

**Route 2: `/auth/google/callback`**
- Google redirect ke sini setelah user authorize
- Passport verify authorization code
- Get user data dari Google
- Save/update user di database
- Generate JWT token
- Redirect ke frontend dengan token

**Route 3: `/auth/me`**
- Frontend hit endpoint ini untuk get user info
- Protected (butuh valid JWT token)
- Return user data

**Route 4: `/auth/logout`**
- Clear session (kalau pakai)
- Frontend juga harus delete token dari localStorage

### Step 8: Update server.ts

**File: `src/server.ts`**

Add these imports at the top:

```typescript
import session from "express-session";
import passport from "./config/passport";
import authRoutes from "./routes/authRoutes";
```

Add middleware after `app.use(express.urlencoded({ extended: true }))`:

```typescript
// ============================================
// SESSION CONFIGURATION
// ============================================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// ============================================
// INITIALIZE PASSPORT
// ============================================
app.use(passport.initialize());
app.use(passport.session());
```

Add routes before other API routes:

```typescript
// ============================================
// AUTH ROUTES
// ============================================
app.use("/auth", authRoutes);
```

**Session Configuration Explanation:**

- **secret:** Key untuk encrypt session data
- **resave: false:** Jangan save session kalau tidak ada perubahan
- **saveUninitialized: false:** Jangan create session kalau belum ada data
- **cookie.secure:** `true` di production (HTTPS required)
- **maxAge:** Session expire setelah 24 jam

---

## 🧪 PART 5: Testing

### Step 1: Start Backend

```bash
npm run dev
```

**Expected terminal output:**
```
✅ Auth routes loaded!
[Server] Running on http://localhost:3010
[Server] Frontend URL: http://localhost:3000
[MongoDB] Connected: ...
```

### Step 2: Test Health Endpoint

```bash
# Command:
curl http://localhost:3010/health

# Expected response:
{"status":"ok","message":"WorkAbroadly API is running"}
```

Kalau dapat JSON response → Backend working! ✅

### Step 3: Test OAuth Flow di Browser

1. **Buka browser:**
   ```
   http://localhost:3010/auth/google
   ```

2. **Expected behavior:**
   - Terminal log: `🔵 /auth/google endpoint hit`
   - Browser redirect ke: `https://accounts.google.com/o/oauth2/v2/auth?...`
   - Google login page muncul

3. **Login dengan Google:**
   - Pilih akun (yang sudah add sebagai test user)
   - Review permissions
   - Click "Continue" atau "Allow"

4. **After authorization:**
   - Terminal log:
     ```
     📥 Received profile from Google: {...}
     🆕 New user created: your-email@gmail.com
     🎫 JWT Token generated for: your-email@gmail.com
     ✅ OAuth callback successful
     🔗 Redirecting to frontend with token
     ```
   
   - Browser redirect ke:
     ```
     http://localhost:3000/auth/callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
   
   - **Frontend belum ada, jadi akan error** - THIS IS OK!
   - **COPY TOKEN dari URL!** (mulai dari `eyJ` sampai akhir)

### Step 4: Verify User di MongoDB

```bash
# Connect to MongoDB
mongosh "your_mongodb_connection_string"

# Switch database
use your_database_name

# Check users collection
db.users.find().pretty()
```

**Expected output:**
```json
{
  "_id": ObjectId("67a2f4b3c1e5d6a8b9c0d1e2"),
  "googleId": "106538359435685394857",
  "email": "your-email@gmail.com",
  "name": "Your Name",
  "picture": "https://lh3.googleusercontent.com/...",
  "createdAt": ISODate("2025-10-31T01:00:00.000Z"),
  "updatedAt": ISODate("2025-10-31T01:00:00.000Z")
}
```

User data tersimpan! ✅

### Step 5: Test Protected Endpoint dengan Postman

**Request Setup:**
```
Method: GET
URL: http://localhost:3010/auth/me

Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                        Paste token yang di-copy dari step 3
```

**Expected Response:**
```json
{
  "id": "67a2f4b3c1e5d6a8b9c0d1e2",
  "email": "your-email@gmail.com",
  "name": "Your Name",
  "picture": "https://lh3.googleusercontent.com/..."
}
```

**Terminal log:**
```
🔍 Verifying token...
✅ Token valid for: your-email@gmail.com
```

Protected route working! ✅

### Step 6: Test Without Token (Should Fail)

**Request:**
```
Method: GET
URL: http://localhost:3010/auth/me
Headers: (no Authorization header)
```

**Expected Response:**
```json
{
  "error": "Access token required",
  "message": "Please provide a valid token in Authorization header"
}
```

Status: 401 Unauthorized ✅

### Step 7: Test Invalid Token (Should Fail)

**Request:**
```
Method: GET
URL: http://localhost:3010/auth/me
Headers:
  Authorization: Bearer invalid_token_123
```

**Expected Response:**
```json
{
  "error": "Invalid token",
  "message": "Token is malformed or invalid"
}
```

Status: 403 Forbidden ✅

---

## 🔄 PART 6: Complete Flow Explanation

### Scenario: User Login Pertama Kali

**1. User Action:**
```
User di frontend → Click "Login with Google"
```

**2. Frontend:**
```javascript
// Redirect ke backend OAuth endpoint
window.location.href = 'http://localhost:3010/auth/google';
```

**3. Backend - Route Handler:**
```typescript
// Route: GET /auth/google
router.get("/google", 
  passport.authenticate("google", { 
    scope: ["profile", "email"] 
  })
);
```

**What happens:**
- Passport generate Google OAuth URL
- URL include: client_id, redirect_uri, scope, state
- Redirect user ke Google

**4. Google OAuth Server:**
```
User at: https://accounts.google.com/o/oauth2/v2/auth?
  client_id=123456789012-abc...googleusercontent.com
  &redirect_uri=http://localhost:3010/auth/google/callback
  &response_type=code
  &scope=profile email
  &state=random_string
```

**User Actions:**
- Login (if not logged in)
- Review permissions
- Click "Allow"

**5. Google Redirect dengan Authorization Code:**
```
Google redirects to:
http://localhost:3010/auth/google/callback?code=4/0AY0e-g7...&state=...
                                                  ^^^^^^^^^^^^
                                                  Authorization code
```

**6. Backend - Callback Handler:**
```typescript
// Route: GET /auth/google/callback
router.get("/google/callback",
  passport.authenticate("google", { ... }),
  googleCallback
);
```

**What happens:**

**6.1. Passport Strategy Verify Callback:**
```typescript
async (accessToken, refreshToken, profile, done) => {
  // Passport automatically:
  // 1. Exchange authorization code untuk access token
  // 2. Use access token untuk get user profile
  // 3. Call this verify callback dengan profile data
  
  // Check if user exists
  let user = await User.findOne({ googleId: profile.id });
  
  if (!user) {
    // Create new user
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value,
    });
  }
  
  // Return user to Passport
  return done(null, user);
}
```

**6.2. Controller - googleCallback:**
```typescript
export const googleCallback = (req, res) => {
  // User already attached to req by Passport
  const user = req.user;
  
  // Generate JWT token
  const token = generateToken(user);
  
  // Redirect to frontend with token
  res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
};
```

**7. Frontend Receives Token:**
```
Browser at: http://localhost:3000/auth/callback?token=eyJhbGc...
```

**Frontend code (React example):**
```javascript
// In /auth/callback route component
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  
  if (token) {
    // Save token to localStorage
    localStorage.setItem('jwt_token', token);
    
    // Redirect to dashboard
    navigate('/dashboard');
  } else {
    // Handle error
    navigate('/login?error=no_token');
  }
}, []);
```

**8. Subsequent API Calls:**
```javascript
// Get user info
const token = localStorage.getItem('jwt_token');

fetch('http://localhost:3010/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(user => {
  console.log('Current user:', user);
});
```

**Backend verifies token:**
```typescript
// Middleware: authenticateToken
export const authenticateToken = async (req, res, next) => {
  // Extract token
  const token = req.headers.authorization?.split(' ')[1];
  
  // Verify token
  const decoded = jwt.verify(token, JWT_SECRET);
  
  // Get user from database
  const user = await User.findById(decoded.id);
  
  // Attach to request
  req.user = user;
  
  // Continue to controller
  next();
};
```

### Returning User (Already Has Account)

**Flow sama**, tapi di step 6.1:

```typescript
// Check if user exists
let user = await User.findOne({ googleId: profile.id });

if (user) {
  // User already exists - JUST RETURN IT
  console.log("Returning user:", user.email);
  return done(null, user);
}

// No user creation - langsung generate token
```

**User tidak perlu re-authorize** kalau masih login di Google!

---

## 🔒 Security Considerations

### 1. Environment Variables

**❌ Never commit:**
```javascript
// Bad!
const JWT_SECRET = "my-secret-key";
```

**✅ Always use .env:**
```javascript
// Good!
const JWT_SECRET = process.env.JWT_SECRET;
```

### 2. JWT Token

**❌ Don't store sensitive data:**
```javascript
// Bad!
const payload = {
  id: user.id,
  password: user.password,  // NEVER!
  creditCard: user.card     // NEVER!
};
```

**✅ Only store non-sensitive identifiers:**
```javascript
// Good!
const payload = {
  id: user.id,
  email: user.email,
  name: user.name
};
```

### 3. Token Expiration

**Balance between UX and Security:**

```javascript
// Short expiration (more secure, less convenient)
expiresIn: "1h"   // 1 hour

// Medium expiration (balanced)
expiresIn: "7d"   // 7 days

// Long expiration (less secure, more convenient)
expiresIn: "30d"  // 30 days
```

**Recommendation:** 7 days dengan refresh token mechanism

### 4. HTTPS in Production

**Development (OK):**
```
http://localhost:3010
```

**Production (MUST!):**
```
https://api.yourdomain.com
```

Update `.env` untuk production:
```env
NODE_ENV=production
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/auth/google/callback

# Session cookie
COOKIE_SECURE=true  # Dalam session config: secure: true
```

### 5. CORS Configuration

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Specific origin, not "*"
  credentials: true                   // Allow cookies
}));
```

---

## 📊 Troubleshooting Guide

### Error 1: redirect_uri_mismatch

**Error message:**
```
Error: redirect_uri_mismatch
```

**Cause:** URL di Google Console ≠ URL di code

**Fix:**
1. Check `.env`: `GOOGLE_CALLBACK_URL=http://localhost:3010/auth/google/callback`
2. Check Google Console: Harus **EXACT** sama
3. No trailing slash: `/callback` ✅ vs `/callback/` ❌
4. Restart server after .env change

### Error 2: invalid_client

**Error message:**
```
Error: invalid_client
```

**Cause:** Client ID atau Secret salah

**Fix:**
1. Re-copy Client ID dari Google Console
2. Re-copy Client Secret
3. Check tidak ada extra spaces di `.env`
4. Restart server

### Error 3: Access denied

**Error message:**
```
Error: Access denied
```

**Cause:** User tidak di-add sebagai test user

**Fix:**
1. Go to Google Console → OAuth consent screen
2. Scroll ke "Test users"
3. Add email yang dipakai untuk testing
4. Wait 5-10 minutes
5. Try again

### Error 4: Token expired

**Error in Postman:**
```json
{
  "error": "Token expired",
  "message": "Please login again"
}
```

**Fix:** Login ulang, copy token baru

### Error 5: User not found

**Error:**
```json
{
  "error": "User not found"
}
```

**Cause:** User dihapus dari database tapi token masih valid

**Fix:** Login ulang

---

## 🎯 Cara Menjelaskan ke Tim

### **Penjelasan High-Level (5 menit):**

**"Kita implement Google OAuth untuk authentication. Ini memungkinkan user login pakai akun Google mereka tanpa perlu buat akun baru atau share password ke kita.**

**Flow-nya sederhana:**
1. **User klik 'Login with Google' di frontend**
2. **Kita redirect user ke Google untuk login**
3. **Google verify user dan redirect balik ke backend kita dengan authorization code**
4. **Backend kita tukar code itu dengan user data**
5. **Kita simpan user di database (kalau baru) atau ambil data existing user**
6. **Kita generate JWT token untuk user**
7. **Token itu kita kasih ke frontend lewat URL redirect**
8. **Frontend save token di localStorage**
9. **Setiap API call, frontend kirim token di header Authorization**
10. **Backend verify token untuk ensure user valid**

**Benefit utama: keamanan lebih baik, UX lebih smooth, dan less maintenance untuk kita.**"

### **Penjelasan Technical (untuk developer, 10 menit):**

**"Kita pakai Passport.js dengan Google OAuth 2.0 strategy. Flow detailnya:**

**Setup di Google Console:**
- **Buat OAuth Client ID dengan redirect URI ke backend callback endpoint**
- **Get Client ID dan Secret untuk identify aplikasi kita**

**Backend architecture:**
- **Passport Strategy: Handle OAuth flow dengan Google**
- **User Model: MongoDB schema untuk simpan user data**
- **Auth Controller: Generate JWT token dan handle callbacks**
- **Auth Middleware: Verify JWT token untuk protected routes**
- **Auth Routes: Endpoints untuk OAuth flow**

**Token Management:**
- **Google kasih kita authorization code (temporary)**
- **Kita tukar code dengan access token (dari Google)**
- **Kita generate JWT token sendiri (untuk session management)**
- **JWT berlaku 7 hari, after that user must login again**

**Security measures:**
- **JWT Secret di-store di environment variables**
- **Token di-verify di setiap request ke protected routes**
- **User data di-validate against database**
- **HTTPS required untuk production**
- **CORS configured untuk specific origin only**"

### **Demo Live (15 menit):**

1. **Show Google Console setup**
2. **Walk through code:**
   - User model
   - Passport strategy
   - Controller functions
   - Middleware
   - Routes
3. **Live test:**
   - Start backend
   - Open `/auth/google` di browser
   - Login dengan Google
   - Show terminal logs
   - Check MongoDB user created
   - Copy token
   - Test di Postman dengan token
4. **Q&A**

---

## ✅ Summary Checklist

**Setup Google Console:**
- [ ] Create project
- [ ] Setup OAuth consent screen
- [ ] Add test users
- [ ] Create OAuth Client ID
- [ ] Copy Client ID & Secret
- [ ] Configure redirect URIs

**Backend Implementation:**
- [ ] Install dependencies
- [ ] Configure `.env`
- [ ] Create User model
- [ ] Setup Passport strategy
- [ ] Create auth controller
- [ ] Create auth middleware
- [ ] Setup auth routes
- [ ] Update server.ts
- [ ] Restart server

**Testing:**
- [ ] Health check works
- [ ] OAuth flow redirects to Google
- [ ] Login successful
- [ ] User saved in MongoDB
- [ ] Token generated
- [ ] Protected route works with token
- [ ] Unauthorized without token

---

## 🎉 Conclusion

Sekarang kamu punya **complete OAuth implementation** yang production-ready! 

**Key takeaways:**
✅ OAuth provides secure authentication without handling passwords  
✅ Passport.js simplifies OAuth flow implementation  
✅ JWT tokens manage session across requests  
✅ Middleware protects routes requiring authentication  
✅ Proper error handling ensures good UX  
