const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const {authMiddleware}=require('../middlewares/authMiddleware')


router.get('/myprofile',authMiddleware, async (req, res) => {
  const { email } = req.body;

  // localStorage.setItem('userEmail',email);

  console.log(email);

  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(400).json({ error: "User does not exists" });
  }
  else{
    console.log("user found");
  }
  const name=userExists.name;
  const pass=userExists.password;
  console.log(name,email, pass);

//establish a db connection/

  // Mock profile response
  res.json({
    name: name,
    email: email,
    password: pass,
  });
});

module.exports = router;
