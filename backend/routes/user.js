const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const USER = require("../models/User");
// const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");
const DepartmentCoordinator = require("../models/DeptCoord");
const router = express.Router();

const findUserByEmail = async (email) => {
  let user = await USER.findOne({ email });
  if (!user) user = await Admin.findOne({ email });
  if (!user) user = await DepartmentCoordinator.findOne({ email });
  return user;
};

router.post("/register", async (req, res) => {
  try {
    const { role, email, name, password, department } = req.body;

    console.log(req.body);
    let UserModel;
    //  if (role === "faculty") UserModel = Faculty;
    if (role === "user") UserModel = USER;
    if (role === "admin") UserModel = Admin;
    if (role === "department_coordinator") UserModel = DepartmentCoordinator;

    if (!UserModel)
      return res.status(400).json({ status: "error", error: "Invalid role" });

    // Check for existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ status: "error", error: "Duplicate email" });

    // Hash the password and create the
    console.log(UserModel);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "user") {
      // if user i.e student or faculty
      console.log("User");
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        department,
      });

      return res.status(201).json({
        message: "User Registration Successful",
        user,
      });
    } else if (role === "admin") {
      //admin registration
      console.log("Hello ", role);
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User Registration Successful",
      });
    } else if (role === "department_coordinator") {
      //department_coordinator registration
      console.log("in dep coor....", email);
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        department,
      });

      return res.status(201).json({
        message: "User Registration Successful",
        user,
      });
    }
  } catch (err) {
    console.error("Error while registering User: ", err);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { User, email, password } = req.body;
    let userModel;
    // console.log(req.body);

    if (User === "department_coordinator") userModel = DepartmentCoordinator;
    else if (User === "admin") userModel = Admin;
    else userModel = USER;

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(404).json({ status: "error", error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ status: "error", error: "Invalid password" });

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        role: user.constructor.modelName.toLowerCase(),
      },
      "secret123",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ status: "ok", user, token });
  } catch (err) {
    console.error("Error during login: ", err);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

module.exports = router;
