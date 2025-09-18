const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../db.js");

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(403).json({ message: "User already exists" });

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post("/signin", async (req, res) => {
  const { email, password } = req.body; // ✅ use body
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(403).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Logged in successfully", token });
});

module.exports = router;   
