// backend/server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./services/db");

const app = express();

/**
 * Middleware
 */
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health check
 */
app.get("/", (req, res) => res.send("Backend is running"));
app.get("/health", (req, res) => res.json({ ok: true }));

/**
 * Safe route mounting helper
 */
function mountRoute(path, mod, name) {
  const router = mod?.stack ? mod : mod?.router;

  if (!router || typeof router !== "function" || !router.stack) {
    console.error(
      `[ROUTE ERROR] ${name} is not an Express router. Fix its export to: module.exports = router;`
    );
    return;
  }

  app.use(path, router);
  console.log(`[ROUTE OK] Mounted ${name} at ${path}`);
}

/**
 * Import routes
 */
const authRoutes = require("./routes/authRoutes");
const forgotRoutes = require("./routes/forgot");
const orderRoutes = require("./routes/order");
const subscriptionRoutes = require("./routes/Subscription");
const cronjobRoutes = require("./routes/cronjob");

/**
 * Mount routes
 */
mountRoute("/api/auth", authRoutes, "authRoutes");
mountRoute("/api/forgot", forgotRoutes, "forgotRoutes");
mountRoute("/api/orders", orderRoutes, "orderRoutes");
mountRoute("/api/subscription", subscriptionRoutes, "subscriptionRoutes");
mountRoute("/api/cronjob", cronjobRoutes, "cronjobRoutes");

/**
 * Start server
 */
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
})();
