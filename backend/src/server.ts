import express, { type Express, type Request, type Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import chatRoutes from "./routes/chatRoutes"
import userRoutes from "./routes/userRoutes"  // NEW
import { connectDB } from "./config/db"
import mongoose from "mongoose"
import roleplayRoutes from "./routes/roleplayRoutes"
import scenarioRoutes from "./routes/scenarioRoutes"
import midtransRoutes from "./routes/midtransRoutes"
// import stripeRoutes from "./routes/stripe"
import session from "express-session";
import passport from "./config/passport";
import authRoutes from "./routes/authRoutes";

// Load environment variables
dotenv.config()
// Connect to MongoDB
connectDB()

const app: Express = express()
const PORT = process.env.PORT || 3010

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    // ⚡ CRITICAL FIX: Expose custom headers for Clara's dual-response system
    exposedHeaders: ["X-Insight", "X-Has-Insight", "X-Conversation-State"],
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session configuration
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

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes (routes buat login/logout)
app.use("/auth", authRoutes)

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Hello you" })
})

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "WorkAbroadly API is running" })
})

app.get("/api/test-db", async (req, res) => {
  if (!mongoose.connection.db) {
    return res.status(500).json({ connected: false, error: "Database not connected" });
  }
  const collections = await mongoose.connection.db.listCollections().toArray();
  res.json({ connected: true, collections: collections.map(c => c.name) });
});

// API Routes
app.use("/api/chat", chatRoutes)           // Chat routes (protected)
app.use("/api/user", userRoutes)           // NEW: User routes (protected)
app.use("/api/roleplay", roleplayRoutes)
app.use("/api/scenarios", scenarioRoutes)
app.use("/api/midtrans", midtransRoutes)

// app.use("/api/stripe", stripeRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" })
})

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error("[Server Error]:", err)
  res.status(500).json({ error: "Internal server error", message: err.message })
})

// Debug: List all registered routes
console.log("\nRegistered Routes:");
app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    // Routes registered directly on the app
    console.log(`  ${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    // Router middleware
    middleware.handle.stack.forEach((handler: any) => {
      if (handler.route) {
        const path = middleware.regexp.source
          .replace('\\/?', '')
          .replace('(?=\\/|$)', '')
          .replace(/\\\//g, '/');
        console.log(`  ${Object.keys(handler.route.methods)} ${path}${handler.route.path}`);
      }
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`)
})