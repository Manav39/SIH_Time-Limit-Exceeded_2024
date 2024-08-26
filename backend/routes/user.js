const express = require("express");
const USER = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await USER.create({
      email: req.body.email,
      name: req.body.name,
    });

    return res.status(201).json({
      message: "User Sign Up Successful",
      user: user,
    });
  } catch (err) {
    console.error("Error while creating User : ", err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newpass = await bcrypt.hash(req.body.pass, 10);
    const user = await USER.create({
      name: req.body.name,
      email: req.body.email,
      password: newpass,
    });
    return res.json({ status: "ok" });
  } catch (e) {
    return res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/login", async (req, res) => {
  const user = await USER.findOne({
    email: req.body.email,
  });

  if (!user) return res.json({ status: "error", error: "user not found" });

  const isPasswordValid = await bcrypt.compare(req.body.pass, user.password);

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: user, token: token });
  } else {
    return res.json({ status: "error", msg: "user not found" });
  }
});

router.get("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await USER.findOne({ email: email });
    console.log(user);
    return res.json({ status: "ok", quote: user.quote });
  } catch (e) {
    return res.json({ status: "error", error: "Invalid Token" });
  }
});

router.post("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await USER.updateOne({ email: email }, { $set: { quote: req.body.quote } });
    return res.json({ status: "ok" });
  } catch (e) {
    return res.json({ status: "error", error: "Invalid Token" });
  }
});

module.exports = router;
