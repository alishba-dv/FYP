const express = require("express");
const router = express.Router();
const OrderSchema = require("../models/Order");
const Product = require("../models/Products");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    console.log("Received products:", products);
    if (!products || typeof products !== "object") {
      return res.status(400).json({ error: "Invalid products format" });
    }

    // Ensure products are an array
    const productArray = Array.isArray(products) ? products : Object.values(products);
    console.log("Converted products array:", productArray);

    const lineItems = productArray.map(product => ({
      price_data: {
        currency: "PKR",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.Price * 100, // Convert PKR to paisa
      },
      quantity: product.quantity,
    }));

    console.log("Line Items:", lineItems);
    console.log("Body: ", req.body);
    const cartItem = req.body.products;
    console.log("cart item: ", cartItem);
    const { firstName, lastName, email, street, city, state, zipcode, country, phone, payment_status } = req.body.customer_details;
    const total_price = req.body.total_price;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: productArray.map(item => ({
        price_data: {
          currency: "PKR",
          product_data: {
            name: item.name,
          },
          unit_amount: item.Price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      customer_email: email,

      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: {
        type: "order",
        firstName,
        lastName,
        street,
        city,
        state,
        zipcode,
        country,
        phone,
        email,
        total_price: total_price.toString(),
        payment_status: "Paid",
        cartItem: JSON.stringify(cartItem),
      },
    });

    res.json({ id: session.id });
    res.status(200);

    console.log("Stripe session created:", session.id);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session.", error });
  }
});

router.post("/order", async (req, res) => {
  const { firstName, lastName, email, street, city, state, zipcode, country, phone, payment_status, total_price, cartItem } = req.body;

  try {
    console.log("Cart Data from backend:", req.body);

    // Create Order
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
      date: new Date(),
    });
    await newOrder.save();

    const stockUpdates = Object.entries(cartItem).map(([index, item]) => ({
      updateOne: {
        filter: { _id: index },
        update: { $inc: { quantity: -item.quantity } },
      },
    }));

    console.log("Stock updates: ", stockUpdates);

    // Perform bulkWrite operation
    const result = await Product.bulkWrite(stockUpdates);
    console.log("BulkWrite result: ", result);

    // Send Confirmation Email
    await sendOrderConfirmationEmail(firstName, lastName, email, cartItem, total_price, street, payment_status);

    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Error placing order", error: err.message });
  }
});

// Send Order Confirmation Email Function
const sendOrderConfirmationEmail = async (firstName, lastName, email, cartItem, totalPrice, street, payment_status) => {
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

  let itemList = Object.values(cartItem)
    .map(
      item => `
    <div>
      <b>Name:</b> ${item.name} <br>
      <b>Quantity:</b> ${item.quantity} <br>
      <b>Price:</b> ${item.Price} PKR
    </div>
  `
    )
    .join("");

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
    <li><strong>Total Price:</strong> ${String(totalPrice)} PKR</li>
    <li><strong>Payment Status:</strong> ${payment_status}</li>
    <li><strong>Order Date</strong>${new Date()}</li>
  </ul>
  
  <hr style="border: 1px solid #ddd;">
  
  <!-- Shipping Address -->
  <h3 style="color: #4CAF50;">📍 Shipping Address:</h3>
  <p>${street}</p>
  
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
};

module.exports = router;
