// 🔥 LOAD ENV VARIABLES FIRST (VERY IMPORTANT)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./models/User.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

console.log("Starting server...");

// ✅ Connect to MongoDB
connectDB();

// ---------------- ROUTES ---------------- //

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Add test user
app.get("/add-user", async (req, res) => {
  try {
    const newUser = new User({
      name: "Keerthana",
      email: "keerthanalahari2@gmail.com"
    });

    await newUser.save();
    res.send("User saved to MongoDB 🎉");
  } catch (error) {
    console.log(error);
    res.send("Error saving user");
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Add user from frontend (POST)
app.post("/add-user-manual", async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new User({
      name,
      email,
    });

    await newUser.save();
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
  }
});

// Delete user
app.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Update user by ID
app.put("/update/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------- START SERVER ---------------- //

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});