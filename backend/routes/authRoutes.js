import express from "express";
import passport from "passport";
import User from "../models/User.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
  const { email, password, mobile} = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      req.flash("error_msg", "User already exists!");
      return res.status(400).json({ message: req.flash("error_msg")[0] });
    }

    const newUser = new User({ email, password , mobile});
    await newUser.save();

    req.flash("success_msg", "🎉 Welcome to Spendofy!");
    return res.status(201).json({ message: req.flash("success_msg")[0] });
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Server error! Please try again.");
    res.status(500).json({ message: req.flash("error_msg")[0] });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(400).json({ message: info?.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      
      return res.json({
        message: "Login successful",
        user: { id: user._id, email: user.email },
      });
    });
  })(req, res, next);
});

export default router;
