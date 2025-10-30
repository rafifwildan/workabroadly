import express, { type Express, type Request, type Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import chatRoutes from "./routes/chatRoutes"
import { connectDB } from "./config/db"
import mongoose from "mongoose"
import roleplayRoutes from "./routes/roleplayRoutes"
import scenarioRoutes from "./routes/scenarioRoutes"
// import stripeRoutes from "./routes/stripe"

// Load environment variables
dotenv.config()
// Connect to MongoDB
connectDB()

const app: Express = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
app.use("/api/chat", chatRoutes)
app.use("/api/roleplay", roleplayRoutes);
app.use("/api/scenarios", scenarioRoutes)
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

// Start server
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`)
  console.log(`[Server] Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`)
})
