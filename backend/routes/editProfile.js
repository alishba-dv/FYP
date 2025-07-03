const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.put("/editProfile", authMiddleware, async (req, res) => {
  try {
    const { originalEmail, newEmail, updatedFields } = req.body;

    console.log(req.body);

    // if (newEmail && (await User.findOne({ email: newEmail }))) return res.status(500).json({ message: "Email already in use" });

    const userExist = await User.findOne({ email: originalEmail });
    if (!userExist) {
      return res.status(500).json({ message: "User not found" });
    }

    await User.updateOne({ email: originalEmail }, { $set: updatedFields });

    return res.status(200).json({ message: "Profile updated successfully", ...updatedFields });
  } catch (error) {
    console.error("Error updating profile:", error);

    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
