// backend/server.js
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");

const connectDB = require("./services/db");

const app = express();

/**
 * Middleware
 * - If Stripe webhooks need RAW body, mount that route BEFORE express.json().
 * - For now, keep it simple and safe: we do not mount webhook until you confirm your webhook file exports a router.
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health check
 */
app.get("/", (req, res) => res.send("Backend is running"));
app.get("/health", (req, res) => res.json({ ok: true }));

/**
 * Safe route mounting helper
 * Prevents: "Router.use() requires a middleware function but got a Object"
 */
function mountRoute(path, mod, name) {
  // support both: module.exports = router  AND  module.exports = { router }
  const router = mod?.stack ? mod : mod?.router;

  if (!router || typeof router !== "function" || !router.stack) {
    console.error(
      `[ROUTE ERROR] ${name} is not an Express router. Fix its export to: module.exports = router;`
    );
    return; // don't crash the whole server
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
// Stripe webhook (optional). Uncomment only when your file exports a router correctly.
// const stripeWebHookRoutes = require("./routes/stripeWebHook");

/**
 * Mount routes
 */
mountRoute("/api/auth", authRoutes, "authRoutes");
mountRoute("/api/forgot", forgotRoutes, "forgotRoutes");
mountRoute("/api/orders", orderRoutes, "orderRoutes");
mountRoute("/api/subscription", subscriptionRoutes, "subscriptionRoutes");
mountRoute("/api/cronjob", cronjobRoutes, "cronjobRoutes");

// If your webhook route uses express.raw(), mount it BEFORE express.json() above.
// In that case, move this mount to the top section and enable it.
// mountRoute("/api/stripe/webhook", stripeWebHookRoutes, "stripeWebHookRoutes");

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
