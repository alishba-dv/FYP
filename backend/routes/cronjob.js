const cron = require('node-cron');
const User = require('../models/User');
const UserPlan = require('../models/UserPlan'); 
const nodemailer = require('nodemailer');
require('dotenv').config(); 

// Create a global transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
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

    // Find subscriptions that will expire in 3 days
    const subscriptions = await UserPlan.find({
      expiryDate: { $gte: today, $lt: threeDaysLater }, 
      autoRenew: true, 
    });

    if (subscriptions.length > 0) {
      console.log(`📢 Found ${subscriptions.length} subscriptions expiring soon.`);

      for (const sub of subscriptions) {
        const user = await User.findById(sub.user.toString());
        if (user) {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: '🚀 Subscription Renewal Reminder',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            
              <!-- Header -->
              <div style="text-align: center; color: #4CAF50; font-size: 22px; font-weight: bold;">
                🌟 Subscription Renewal Reminder
              </div>
            
              <hr style="border: 1px solid #ddd;">
            
              <!-- Greeting -->
              <div style="font-size: 16px; color: #333;">
                <p>Hello <strong>${user.name}</strong>,</p>
              </div>
            
              <!-- Main Message -->
              <div style="font-size: 16px; color: #555; line-height: 1.6;">
                <p>We hope you're enjoying our services! 🎉 Just a quick reminder—your subscription is set to cancel in <strong>3 days</strong>.</p>
                <p>If you wish to resubscribe , It is the perfect time to do so to continue enjoying uninterrupted access! 🚀</p>
              </div>
            
              <hr style="border: 1px solid #ddd;">
            
              
            
              <hr style="border: 1px solid #ddd;">
            
              <!-- Footer -->
              <div style="font-size: 14px; color: #888; text-align: center;">
                <p>Thank you for being a valued member! 💙</p>
                <p>Best, <br> <strong>[FurLiva] Team</strong></p>
              </div>
            
            </div>
            `
            ,
          };

          await transporter.sendMail(mailOptions);
          console.log(`✅ Reminder email sent to: ${user.email}`);
        }
      }
    } else {
      console.log("✅ No expiring subscriptions found.");
    }
  } catch (error) {
    console.error("❌ Error in runSubscriptionExpiryJob:", error.message);
  }
}

// Schedule cron job to run at midnight every day
cron.schedule('0 0 * * *', runSubscriptionExpiryJob);

module.exports = { runSubscriptionExpiryJob };
