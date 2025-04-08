const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists in database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      
      hashedP: hashedPassword,
      role: "user", // Default role
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", name, email, role: "user" });
  } 
  
  catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  console.log("Stored Token: ",process.env.JWT_SECRET);

  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password with hashed password in DB
    const passwordMatch = await bcrypt.compare(password, user.hashedP);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    if(user.role==='admin'){
      return res.status(404).json({error:"Unauthorized access"});
    }

    // Generate JWT token
    const token = jwt.sign({ id:user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   // secure: false,  // Secure must be false for HTTP
    //   //  sameSite: 'Lax',  // Use 'None' only if using HTTPS
      
    //   path: '/', 
      // expires: new Date(Date.now() + 86400000), 
    // });
    const userId = user._id.toString();
    console.log("Userid: ",userId)
     
    res.status(200).json({ message: "Login successful",token, name: user.name,email, role: user.role ,userId:userId });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

router.post('/admin/login',async(req,res)=>{
  try{

    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Invalid credentials"});
    }
    
    const passwordMatch=await bcrypt.compare(password,user.hashedP);
    if(!passwordMatch){
      return res.status(401).json({error:"Password is incorrect"});
    }
    if(user.role!=="admin"){
      return res.status(404).json({error:"unauthorized access"});
    }
    const token=jwt.sign({email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
 
    
    console.log("Token genenrated fr admin",token);
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   // secure: false,  // Secure must be false for HTTP
    //   //  sameSite: 'Lax',  // Use 'None' only if using HTTPS
      
    //   path: '/', 
    //   expires: new Date(Date.now() + 86400000), 
    // });
    const userId = user._id.toString();
    console.log("Userid: ",userId)
    res.status(200).json({token,message:"Login successful",name:user.name,email:user.email,role:user.role,userId:userId});

  }catch(error){
    console.error("Error during login:",error);
    res.status(500).json({error:"Error during login"});
  
  

  }

}

);
module.exports = router;