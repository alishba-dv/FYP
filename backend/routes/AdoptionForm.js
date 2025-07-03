const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AdoptionForm = require("../models/PetAdoptionForm");
const fs =require('fs');

// Ensure upload directory exists

const uploadDir = path.resolve(__dirname, '../public/uploads');
fs.mkdirSync(uploadDir, { recursive: true });

// Set up Multer for multiple file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Handle adoption form submission
router.post("/adoptionForm", upload.array("petImage",5), async (req, res) => {
  try {
    console.log("Form Data:", req.body);

    const { customerName, email, address, phone, petName, breed, color, petType, petAge, reason } = req.body;

    // Extract image paths
    const petImages = req.files.map((file) => file.filename);
            if (petImages.length === 0) {
            return res.status(400).json({ message: 'At least one image is required.' });
        }
console.log("PET IMAGES URL: :",petImages)
    // Save data to database
    const form = new AdoptionForm({
      CustomerName: customerName,
      CustomerEmail: email,
      CustomerAddress: address,
      Phone: phone,
      PetName: petName,
      PetColor: color,
      PetBreed: breed,
      PetType: petType,
      Age: petAge,
      Reason: reason,
      PetImage: petImages,
      Date: new Date(),
      Status: "Pending",
    });

    await form.save();

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;