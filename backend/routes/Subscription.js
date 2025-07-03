const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const Subscription = require("../models/Subscription");
const Products = require("../models/Products");
const UserPlan = require("../models/UserPlan");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const dayjs = require("dayjs");

/** GET ALL SUBSCRIPTIONS */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});
    return res.status(200).json({ subscriptions });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** GET ALL PRODUCTS TO INCLUDE IN SUBSCRIPTION */
router.get("/products", authMiddleware, async (req, res) => {
  try {
    const products = await Products.find({}).select("name Animal_Category image[0]");
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** CREATE A SUBSCRIPTION */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    return res.status(200).json({ message: "Subscription created successfully", subscription });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** EDIT A SUBSCRIPTION */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: "Subscription created successfully", subscription });
  } catch (err) {
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
    console.log(err);
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
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** SUBSCRIBE TO A SUBSCRIPTION */
router.post("/subscribe", authMiddleware, async (req, res) => {
  try {
    const { user, plan } = req.body;
    console.log("user ",user);
    console.log("plan: ",plan);
    // console.log({ user, plan });
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      zipcode: user.zipcode,
      email: user.email,
      street:user.street,
      phone: user.phone
    };
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "PKR",
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email:user.email, 

      success_url: 'http://localhost:5173/manage',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        planName: plan.name,
        name: user.name,
        email: user.email,
        price: plan?.price?.toString?.(),
        data: JSON.stringify({ planId: plan._id, userId: req.cookies.userId, duration: plan.timeFrame,autorenew:plan.autorenew,productGroup:plan.productGroup,
                  userData: JSON.stringify(userData), // Pass user data as a JSON string
        }),
        type: "subscription",
      },
     
    });
    res.status(200).json({ id: session.id });
    console.log("Stripe session created:", session.id);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session.", error });
  }
});


/** GET SUBSCRIPTIONS USER DIDN'T SUBSCRIBED */
router.get("/getAll", authMiddleware, async function (req, res) {
  try {
    const allSubscriptions = await Subscription.find({}).select("name features");
    const userPlans = await UserPlan.find({

      user: req.cookies.userId,
      $or: [{ expiryDate: { $gte: new Date() } }, { expiryDate: null }],
    }).select("subscription");
    const subscribedIds = new Set(userPlans.map(plan => plan.subscription.toString()));
    console.log("Userplan: ",userPlans);

    const subscriptions = allSubscriptions.map(sub => ({
      ...sub.toObject(),
      isSubscribed: subscribedIds.has(sub._id.toString()),
    }));

    return res.status(200).json({ subscriptions });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/** GET SUBSCRIPTIONS BY ID */
router.get("/getById/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Subscription.findById(id).populate("productGroup.products");

    return res.status(200).json({ plan });
  } catch (err) {
    console.log(err);
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
console.log("Plans from backend",plans)
    return res.status(200).json({ plans });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const OPTIONS = {
  EXPIRED: "Expired",
  ACTIVE: "Active",
};

/** GET ALL SUBSCRIBERS */
router.get("/getSubscribers/:option", authMiddleware, async (req, res) => {
  try {
    const { option } = req.params;

    let filter = {};

    if (option === OPTIONS.ACTIVE) {
      /** Active **/
      filter.$or = [{ expiryDate: { $gte: new Date() } }, { expiryDate: null }];
    } else if (option === OPTIONS.EXPIRED) {
      /** Expired **/
      filter.expiryDate = { $lt: new Date() };
    }

    const plans = await UserPlan.find(filter).sort({ startDate: -1 }).populate("subscription", "name  -_id").populate("user", "name email -_id");
console.log(plans)
    return res.status(200).json({ plans });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
