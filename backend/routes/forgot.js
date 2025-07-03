const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const nodemailer = require('nodemailer');
// const {authMiddleware}=require('../middlewares/authMiddleware');



router.post('/forgot', async (req, res) => {

  try {
    const { email } = req.body; // Extract email from request body
    console.log("Request body:", email);

    // Authenticate the given email with DB
    const emailFound = await User.findOne({ email });
    if (emailFound) {
      console.log(`Email ${email} verified with DB`);
    } else {
      console.log(`Email ${email} not verified`);
      return res.status(404).json({ message: "Email not found" });
    }

    // const retPassword=emailFound.password;

    // Prepare the password reset email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass:  process.env.EMAIL_PASS,// Use environment variables
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification for Password Recovery',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #aa220a;">Email Verification</h2>
      <p>Dear <b>${emailFound.name}</b>,</p>
      <p>Your email has been successfully verified for password recovery.</p>
      <p>If you did not request this, please ignore this email.</p>
      <p>If you did request a password recovery, please follow the instructions below to reset your password:</p>
      <ol>
      // <li>Click on the following link to reset your password: <a href="http://localhost:5173/forgot2?email=${email}">Reset Password</a></li>
     <li>Enter your new password in the provided fields.</li>
      <li>Confirm your new password by entering it again.</li>
      <li>Click on the "Submit" button to save your new password.</li>
      </ol>
      <p>If you encounter any issues during the process, please contact our support team for assistance.</p>
      <p>Best regards,</p>
      <p style="font-weight: bold;">Furliva Team</p>
      <div style="margin-top: 20px; padding: 10px; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply.</p>
      </div>
      </div>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email sending error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log('Email sent: ' + info.response);

        return res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error in /forgot endpoint:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
