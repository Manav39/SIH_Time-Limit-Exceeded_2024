const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");
const DepartmentCoordinator = require("../models/DeptCoord");
const router = express.Router();

// Utility function to find user by email across different models
const findUserByEmail = async (email) => {
  let user = await Student.findOne({ email });
  if (!user) user = await Faculty.findOne({ email });
  if (!user) user = await Admin.findOne({ email });
  if (!user) user = await DepartmentCoordinator.findOne({ email });
  return user;
};

// Signup or Register route (creating a user with role)
router.post("/register", async (req, res) => {
  try {
    const { role, email, name, password, department } = req.body;

    // Determine the model to use based on the role
    let UserModel;
    if (role === "student") UserModel = Student;
    if (role === "faculty") UserModel = Faculty;
    if (role === "admin") UserModel = Admin;
    if (role === "department_coordinator") UserModel = DepartmentCoordinator;

    if (!UserModel) return res.status(400).json({ status: "error", error: "Invalid role" });

    // Check for existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ status: "error", error: "Duplicate email" });

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      ...(role === "student" || role === "faculty" ? { department } : {}),
    });

    return res.status(201).json({
      message: "User Registration Successful",
      user,
    });
  } catch (err) {
    console.error("Error while registering User: ", err);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) return res.status(404).json({ status: "error", error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ status: "error", error: "Invalid password" });

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        role: user.constructor.modelName.toLowerCase(), // Add role to token payload
      },
      "secret123",
      { expiresIn: "1h" } // Token expiration time for security
    );

    return res.status(200).json({ status: "ok", user, token });
  } catch (err) {
    console.error("Error during login: ", err);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

module.exports = router;
