"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // NEW
const db_1 = require("./config/db");
const mongoose_1 = __importDefault(require("mongoose"));
const roleplayRoutes_1 = __importDefault(require("./routes/roleplayRoutes"));
const scenarioRoutes_1 = __importDefault(require("./routes/scenarioRoutes"));
const midtransRoutes_1 = __importDefault(require("./routes/midtransRoutes"));
// import stripeRoutes from "./routes/stripe"
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./config/passport"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3010;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Session configuration
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
}));
// Initialize Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Auth Routes (routes buat login/logout)
app.use("/auth", authRoutes_1.default);
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "WorkAbroadly API is running" });
});
app.get("/api/test-db", async (req, res) => {
    if (!mongoose_1.default.connection.db) {
        return res.status(500).json({ connected: false, error: "Database not connected" });
    }
    const collections = await mongoose_1.default.connection.db.listCollections().toArray();
    res.json({ connected: true, collections: collections.map(c => c.name) });
});
// API Routes
app.use("/api/chat", chatRoutes_1.default); // Chat routes (protected)
app.use("/api/user", userRoutes_1.default); // NEW: User routes (protected)
app.use("/api/roleplay", roleplayRoutes_1.default);
app.use("/api/scenarios", scenarioRoutes_1.default);
app.use("/api/midtrans", midtransRoutes_1.default);
// app.use("/api/stripe", stripeRoutes)
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
// Error handler
app.use((err, req, res, next) => {
    console.error("[Server Error]:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
});
// Debug: List all registered routes
console.log("\nRegistered Routes:");
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        // Routes registered directly on the app
        console.log(`  ${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
    }
    else if (middleware.name === 'router') {
        // Router middleware
        middleware.handle.stack.forEach((handler) => {
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
    console.log(`[Server] Running on http://localhost:${PORT}`);
});
