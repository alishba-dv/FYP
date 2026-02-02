const express = require("express");
const router = express.Router();

const cron = require("node-cron");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const UserPlan = require("../models/UserPlan");

// Create a global transporter (uses EMAIL_USER / EMAIL_PASS from your backend/.env)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to check subscription expiry and send emails
async function runSubscriptionExpiryJob() {
  try {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);

    console.log("🔎 Checking for expiring subscriptions...");

    const subscriptions = await UserPlan.find({
      expiryDate: { $gte: today, $lt: threeDaysLater },
      autoRenew: true,
    });

    if (!subscriptions.length) {
      console.log("✅ No expiring subscriptions found.");
      return { ok: true, sent: 0, checked: 0 };
    }

    console.log(`📢 Found ${subscriptions.length} subscriptions expiring soon.`);

    let sentCount = 0;

    for (const sub of subscriptions) {
      const user = await User.findById(sub.user.toString());
      if (!user) continue;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "🚀 Subscription Renewal Reminder",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; color: #4CAF50; font-size: 22px; font-weight: bold;">
              🌟 Subscription Renewal Reminder
            </div>

            <hr style="border: 1px solid #ddd;">

            <div style="font-size: 16px; color: #333;">
              <p>Hello <strong>${user.name}</strong>,</p>
            </div>

            <div style="font-size: 16px; color: #555; line-height: 1.6;">
              <p>We hope you're enjoying our services! 🎉 Just a quick reminder—your subscription is set to cancel in <strong>3 days</strong>.</p>
              <p>If you wish to resubscribe, now is the perfect time to do so to continue enjoying uninterrupted access! 🚀</p>
            </div>

            <hr style="border: 1px solid #ddd;">

            <div style="font-size: 14px; color: #888; text-align: center;">
              <p>Thank you for being a valued member! 💙</p>
              <p>Best, <br> <strong>FurLiva Team</strong></p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      sentCount += 1;
      console.log(`✅ Reminder email sent to: ${user.email}`);
    }

    return { ok: true, sent: sentCount, checked: subscriptions.length };
  } catch (error) {
    console.error("❌ Error in runSubscriptionExpiryJob:", error);
    return { ok: false, error: error.message };
  }
}

/**
 * Schedule cron job to run at midnight every day
 * (Runs whenever your backend process is running)
 */
cron.schedule("0 0 * * *", () => {
  runSubscriptionExpiryJob();
});

/**
 * Routes for testing
 */

// Check route
router.get("/", (req, res) => {
  res.json({ message: "Cronjob route working" });
});

// Manually trigger cron job (for testing)
router.post("/run", async (req, res) => {
  const result = await runSubscriptionExpiryJob();
  res.json(result);
});

module.exports = router;
