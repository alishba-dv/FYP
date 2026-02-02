const express = require("express");
const router = express.Router();
const OrderSchema = require("../models/Order");
const Product = require("../models/Products");
const nodemailer = require("nodemailer");

/* =============================
   STRIPE DISABLED (SAFE)
============================= */

router.post("/create-checkout-session", async (req, res) => {
  return res.status(501).json({
    error: "Stripe payments are currently disabled."
  });
});

/* =============================
   SAVE ORDER
============================= */

router.post("/order", async (req, res) => {
  try {
    const {
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
      cartItem
    } = req.body;

    if (!email || !cartItem) {
      return res.status(400).json({
        message: "Missing required order data"
      });
    }

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
      date: new Date()
    });

    await newOrder.save();

    // Update stock safely
    if (cartItem && typeof cartItem === "object") {
      const stockUpdates = Object.entries(cartItem).map(([id, item]) => ({
        updateOne: {
          filter: { _id: id },
          update: { $inc: { quantity: -item.quantity } }
        }
      }));

      if (stockUpdates.length > 0) {
        await Product.bulkWrite(stockUpdates);
      }
    }

    // Send email only if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendOrderConfirmationEmail(
        firstName,
        lastName,
        email,
        cartItem,
        total_price,
        street,
        payment_status
      );
    }

    return res.status(200).json({
      message: "Order placed successfully"
    });

  } catch (err) {
    console.error("Order error:", err);
    return res.status(500).json({
      message: "Error placing order"
    });
  }
});

/* =============================
   EMAIL FUNCTION (SAFE)
============================= */

async function sendOrderConfirmationEmail(
  firstName,
  lastName,
  email,
  cartItem,
  totalPrice,
  street,
  payment_status
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let itemList = Object.values(cartItem || {})
      .map(item => `
        <div>
          <b>Name:</b> ${item.name}<br>
          <b>Quantity:</b> ${item.quantity}<br>
          <b>Price:</b> ${item.Price} PKR
        </div>
      `)
      .join("");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation - Furliva",
      html: `
        <h2>Order Confirmation - Furliva</h2>
        <p>Dear ${firstName} ${lastName},</p>
        ${itemList}
        <p><b>Total:</b> ${totalPrice} PKR</p>
        <p><b>Payment Status:</b> ${payment_status}</p>
        <p><b>Shipping:</b> ${street}</p>
      `
    });

  } catch (err) {
    console.error("Email error:", err.message);
  }
}

module.exports = router;
