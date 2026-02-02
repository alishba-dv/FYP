// backend/routes/Subscription.js
const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const Subscription = require("../models/Subscription");
const Products = require("../models/Products");
const UserPlan = require("../models/UserPlan");
const dayjs = require("dayjs");

/* =============================
   STRIPE: SAFE OPTIONAL INIT
   - No crash if key missing
============================= */
let stripe = null;
try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    console.log("✅ Stripe initialized (Subscription routes)");
  } else {
    console.warn("⚠ STRIPE_SECRET_KEY not set. /subscribe will be disabled.");
  }
} catch (err) {
  console.warn("⚠ Stripe init failed. /subscribe will be disabled:", err.message);
  stripe = null;
}

/* =============================
   HELPERS
============================= */
function frontendUrl() {
  return process.env.FRONTEND_URL || "http://localhost:5173";
}

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

const OPTIONS = {
  EXPIRED: "Expired",
  ACTIVE: "Active",
};

/** GET ALL SUBSCRIPTIONS */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});
    return res.status(200).json({ subscriptions });
  } catch (err) {
    console.error("GET /subscription error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** GET ALL PRODUCTS TO INCLUDE IN SUBSCRIPTION */
router.get("/products", authMiddleware, async (req, res) => {
  try {
    // NOTE: your select string had "image[0]" which is not valid Mongo select
    const products = await Products.find({}).select("name Animal_Category image");
    return res.status(200).json({ products });
  } catch (err) {
    console.error("GET /subscription/products error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** CREATE A SUBSCRIPTION */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    return res
      .status(200)
      .json({ message: "Subscription created successfully", subscription });
  } catch (err) {
    console.error("POST /subscription error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** EDIT A SUBSCRIPTION */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Subscription updated successfully", subscription });
  } catch (err) {
    console.error("PUT /subscription/:id error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** DELETE A SUBSCRIPTION */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Subscription.findByIdAndDelete(id);
    return res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (err) {
    console.error("DELETE /subscription/:id error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** CANCEL A SUBSCRIPTION (USER_PLAN) */
router.delete("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await UserPlan.findByIdAndDelete(id);
    return res.status(200).json({ message: "Subscription cancelled successfully" });
  } catch (err) {
    console.error("DELETE /subscription/cancel/:id error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** SUBSCRIBE TO A SUBSCRIPTION (STRIPE) */
router.post("/subscribe", authMiddleware, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(501).json({
        error: "Subscriptions payment is disabled (Stripe not configured).",
      });
    }

    const { user, plan } = req.body;

    if (!user || !plan) {
      return res.status(400).json({ error: "Missing user or plan" });
    }
    if (!user.email) {
      return res.status(400).json({ error: "Missing user.email" });
    }
    if (!plan.name || typeof plan.price !== "number") {
      return res.status(400).json({ error: "Invalid plan (name/price required)" });
    }

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      zipcode: user.zipcode,
      email: user.email,
      street: user.street,
      phone: user.phone,
    };

    const fe = frontendUrl();

    const metadataData = {
      planId: plan._id,
      userId: req.cookies.userId,
      duration: plan.timeFrame,
      autorenew: plan.autorenew,
      productGroup: plan.productGroup,
      userData,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "PKR",
            product_data: { name: plan.name },
            unit_amount: Math.round(plan.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      success_url: `${fe}/manage`,
      cancel_url: `${fe}/cancel`,
      metadata: {
        type: "subscription",
        planName: plan.name,
        email: user.email,
        price: String(plan.price),
        data: JSON.stringify(metadataData),
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("POST /subscription/subscribe error:", error);
    return res
      .status(500)
      .json({ error: "Failed to create checkout session." });
  }
});

/** GET SUBSCRIPTIONS USER DIDN'T SUBSCRIBED */
router.get("/getAll", authMiddleware, async (req, res) => {
  try {
    const allSubscriptions = await Subscription.find({}).select("name features");

    const userPlans = await UserPlan.find({
      user: req.cookies.userId,
      $or: [{ expiryDate: { $gte: new Date() } }, { expiryDate: null }],
    }).select("subscription");

    const subscribedIds = new Set(
      userPlans.map((plan) => String(plan.subscription))
    );

    const subscriptions = allSubscriptions.map((sub) => ({
      ...sub.toObject(),
      isSubscribed: subscribedIds.has(String(sub._id)),
    }));

    return res.status(200).json({ subscriptions });
  } catch (err) {
    console.error("GET /subscription/getAll error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** GET SUBSCRIPTIONS BY ID */
router.get("/getById/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Subscription.findById(id).populate(
      "productGroup.products"
    );
    return res.status(200).json({ plan });
  } catch (err) {
    console.error("GET /subscription/getById/:id error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** GET SUBSCRIPTIONS BY USER ID */
router.get("/getByUserId", authMiddleware, async (req, res) => {
  try {
    const plans = await UserPlan.find({
      user: req.cookies.userId,
      $or: [{ expiryDate: { $gte: new Date() } }, { expiryDate: null }],
    }).populate("subscription");

    return res.status(200).json({ plans });
  } catch (err) {
    console.error("GET /subscription/getByUserId error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** GET ALL SUBSCRIBERS */
router.get("/getSubscribers/:option", authMiddleware, async (req, res) => {
  try {
    const { option } = req.params;

    let filter = {};
    if (option === OPTIONS.ACTIVE) {
      filter.$or = [{ expiryDate: { $gte: new Date() } }, { expiryDate: null }];
    } else if (option === OPTIONS.EXPIRED) {
      filter.expiryDate = { $lt: new Date() };
    }

    const plans = await UserPlan.find(filter)
      .sort({ startDate: -1 })
      .populate("subscription", "name -_id")
      .populate("user", "name email -_id");

    return res.status(200).json({ plans });
  } catch (err) {
    console.error("GET /subscription/getSubscribers/:option error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
