const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const OrderSchema = require("../models/Order"); // Ensure you have an Order model for MongoDB
const dayjs = require("dayjs");
const Subscription = require("../models/Subscription");
const Products = require('../models/Products'); // Replace with your Product model import
const UserPlan = require("../models/UserPlan");


async function getProductDetails(productId) {
  // Fetch product details using the product ID
  const product = await Products.findById(productId).select('name price');
  if (product) {
    return {
      name: product.name,
      Price: product.price,
      quantity:1,
    };
  }
  return null;
}

// Send Order Confirmation Email
const sendOrderConfirmationEmail = async (firstName, lastName, email, cartItem, total_price, street, city, state, zipcode, country, payment_status) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const dateObj = new Date();

    // Extracting Date, Day, and Time
    const options = { weekday: "long" }; // e.g., Monday
    const day = dateObj.toLocaleDateString("en-US", options);

    const date = dateObj.toLocaleDateString("en-US"); // e.g., 11/06/2024

    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Optional: Use false for 24-hour format
    });

    const itemList = Array.isArray(cartItem)
      ? cartItem
          .map(
            item => `
  <div>
    <b>Name:</b> ${item.name || "N/A"} <br>
    <b>Quantity:</b> ${item.quantity || 0} <br>
    <b>Price:</b> ${item.Price || 0} PKR
  </div>
`
          )
          .join("")
      : "No items in the cart.";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation - Furliva",
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto;">

<!-- Header -->
<h2 style="color: #4CAF50; text-align: center;">🛍️ Order Confirmation - Furliva</h2>

<p>Dear <strong>${firstName} ${lastName}</strong>,</p>
<p>Thank you for your order! We’re excited to let you know that we’ve received your order and are processing it.</p>

<hr style="border: 1px solid #ddd;">

  <hr style="border: 1px solid #ddd;">

<!-- Date, Day & Time -->
<h3 style="color: #4CAF50;">📅 Order Date & Time:</h3>
<p><strong>Day:</strong> ${day}</p>
<p><strong>Date:</strong> ${date}</p>
<p><strong>Time:</strong> ${time}</p>

<hr style="border: 1px solid #ddd;">


<!-- Order Details -->
<h3 style="color: #4CAF50;">📦 Order Details:</h3>
<ul style="padding-left: 20px;">
  ${itemList}
  <li><strong>Total Price:</strong> ${String(total_price)} PKR</li>
  <li><strong>Payment Status:</strong> ${payment_status}</li>
  <li><strong>Order Date</strong>${new Date()}</li>
</ul>

<hr style="border: 1px solid #ddd;">

<!-- Shipping Address -->
<h3 style="color: #4CAF50;">📍 Shipping Address:</h3>
<p>${street}, ${city}, ${state}, ${zipcode}, ${country}</p>

<hr style="border: 1px solid #ddd;">

<!-- Contact -->
<p>If you have any questions, feel free to <a href="mailto:support@furliva.com" style="color: #4CAF50; text-decoration: none;">contact us</a>.</p>

<p>Thank you for choosing <strong>Furliva</strong>! We appreciate your business. 🐾</p>

<!-- Footer -->
<p style="text-align: center; font-size: 14px; color: #888;">
  &copy; ${new Date().getFullYear()} Furliva. All Rights Reserved.
</p>

</div>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Order confirmation email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

/** SUBSCRIPTION EMAIL */
async function sendSubscriptionConfirmationEmail(name, email, price, planName) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const dateObj = new Date();

    // Extracting Date, Day, and Time
    const options = { weekday: "long" }; // e.g., Monday
    const day = dateObj.toLocaleDateString("en-US", options);

    const date = dateObj.toLocaleDateString("en-US"); // e.g., 11/06/2024

    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Optional: Use false for 24-hour format
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Subscription Confirmation - Furliva",
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto;">

<!-- Header -->
<h2 style="color: #4CAF50; text-align: center;">🛍️ Order Confirmation - Furliva</h2>

<p>Dear <strong>${name}</strong>,</p>
<p>Thank you for your order! We’re excited to let you know that you've successfully subscribed to plan ${planName}</p>

<hr style="border: 1px solid #ddd;">

  <hr style="border: 1px solid #ddd;">

<!-- Date, Day & Time -->
<h3 style="color: #4CAF50;">📅 Subscription Date & Time:</h3>
<p><strong>Day:</strong> ${day}</p>
<p><strong>Date:</strong> ${date}</p>
<p><strong>Time:</strong> ${time}</p>

<hr style="border: 1px solid #ddd;">


<!-- Subscription Details -->
<h3 style="color: #4CAF50;">📦 Subscription Details:</h3>
<ul style="padding-left: 20px;">
  <li><strong>Plan Name:</strong> ${planName}</li>
  <li><strong>Total Price:</strong> ${String(price)} PKR</li>
  <li><strong>Order Date</strong>${new Date()}</li>
</ul>

<hr style="border: 1px solid #ddd;">

<!-- Contact -->
<p>If you have any questions, feel free to <a href="mailto:teamfurliva@gmail.com" style="color: #4CAF50; text-decoration: none;">contact us</a>.</p>

<p>Thank you for choosing <strong>Furliva</strong>! We appreciate your business. 🐾</p>

<!-- Footer -->
<p style="text-align: center; font-size: 14px; color: #888;">
  &copy; ${new Date().getFullYear()} Furliva. All Rights Reserved.
</p>

</div>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Subscription confirmation email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
}

// Stripe Webhook - Handle Payment Success
router.post("/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify Stripe event
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("✅ Webhook verified successfully:");
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout session completion
  if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
    const session = event.data.object;

    try {
      const { metadata } = session;

      switch (metadata?.type) {
        /** SUBSCRIPTION MODULE CODE */
        case "subscription": {
          let data = metadata?.data ?? null;


          if (!data) break;
          data = JSON.parse(data);



          const durationMap = {
            daily: "day",
            weekly: "week",
            monthly: "month",
            yearly: "year",
          };
          
          // Ensure case-insensitive mapping
          const timeFrameKey = data?.duration?.toLowerCase?.();
          console.log("TimeFrame Key:", timeFrameKey);
          
          const durationUnit = durationMap[timeFrameKey] ?? null;
          console.log("Duration Unit:", durationUnit);
          
          if (!durationUnit) {
            return res.status(400).json({ message: "Invalid time frame" });
          }
          
          const startDate = dayjs();
          const expiryDate = startDate.add(1, durationUnit);
          
          console.log("Expiry Date:", expiryDate.format());



          const userData = JSON.parse(data.userData); // Parse the stringified user data
          console.log("User Data from Metadata:", userData);

          // Ensure the plan exists based on the plan name in metadata
          const plan = await Subscription.findOne({ name: metadata.planName }); // Assuming 'planName' is unique in your database

          if (!plan) {
            console.error("❌ Plan not found in the database");
            return res.status(400).send("Plan not found");
          }
          const newUserPlan = new UserPlan({
            subscription: plan._id,
            user: data.userId,
            startDate: new Date(),
            expiryDate: expiryDate, // if present
            autoRenew: plan.autoRenew ?? true,
           
          });


          // Retrieve associated products for the plan
          const productGroup = plan.productGroup;
          const products = productGroup.flatMap(group => group.products.toString());
          console.log("Plan found:", products);
          const productsWithDetails = [];

          for (const group of productGroup) {
            for (const productId of group.products) {
              // Convert the productId to an ObjectId if it isn't already
              const productDetails = await getProductDetails(productId);
      
              if (productDetails) {
                productsWithDetails.push(productDetails);
              }
            }
          }
      
          console.log("Products with details:", productsWithDetails);
      
          // Ensure products exist before proceeding
          if (!products || products.length === 0) {
            console.error("❌ No products found for this plan");
            return res.status(400).send("No products found for this plan");
          }
          // Create the order with the plan's products
          const newOrder = new OrderSchema({
            firstName: userData.firstName,  
             lastName: userData.lastName,  
             email: userData.email,  
             street: userData.street,  
            city: userData.city,  
            state: userData.state,  
          zipcode: userData.zipcode,  
        country: userData.country,  
        phone: userData.phone,  
            payment_status: session.payment_status,
            total_price: plan.price,
            cartItem: productsWithDetails, // Use the products from the subscription plan
            date: new Date(), // Add a valid date for the order
          });
          await newOrder.save();
          console.log("✅ Order saved to database:", newOrder.id);
          await newUserPlan.save();
          console.log("✅ UserPlan saved with product details");
          console.log("User Plan saved to database:", newUserPlan.id);
          // Send subscription confirmation email
          await sendSubscriptionConfirmationEmail(
            metadata.name,
            metadata.email,
            metadata.price,
            metadata.planName
          );

          break;
        }

        /** ORDER MODULE CODE */
        case "order": {
          // Validate required fields
          if (!session.customer_details || !session.metadata) {
            throw new Error("Missing customer details or metadata.");
          }

          const { firstName, lastName, email, street, city, state, zipcode, country, phone, payment_status } = metadata;
          const total_price = Number(session.metadata.total_price);
          const cartItem = JSON.parse(session.metadata.cartItem); // Assuming this holds the items in the order

          if (!cartItem || !firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone ) {
            console.error("❌ Missing required fields while processing the order in metadata.", {
              cartItem,
              firstName,
              lastName,
              email,
              street,
              city,
              state,
              zipcode,
              country,
              phone,
              // total_price,
            });
            return res.status(400).send("Missing required fields");
          }

          // Create new order
          const newOrder = new OrderSchema({
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode,
            country,
            phone,
            payment_status,
            total_price,
            cartItem,
          });

          await newOrder.save();
          console.log("✅ Order saved to database:", newOrder.id);

          // Send order confirmation email
          await sendOrderConfirmationEmail(
            firstName,
            lastName,
            email,
            cartItem,
            total_price,
            street,
            city,
            state,
            zipcode,
            country,
            payment_status
          );

          break;
        }
      }
    } catch (err) {
      console.error("❌ Error processing webhook:", err.message);
      return res.status(500).send("Internal Server Error");
    }
  }

  // Acknowledge receipt of the webhook
  res.status(200).send("Webhook received");
});

module.exports = router;




/*

commands for stripe 

stripe login
stripe listen --forward-to localhost:8080/stripe/webhook
stripe trigger checkout.session.completed


*/
