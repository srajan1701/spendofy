import express from "express";
import mongoose from "mongoose"; // ✅ ADD THIS
import Bank from "../models/Bank.js";

const router = express.Router();

// ADD ACCOUNT
router.post("/connect", async (req, res) => {
  try {
    const { userId, name, amount, type } = req.body;

    const newAccount = new Bank({
      userId,
      name,
      amount: Number(amount), // ✅ SAFE
      type,
    });

    await newAccount.save();
    res.json(newAccount);
  } catch (err) {
    console.log("Add Account Error:", err);
    res.status(500).json({ msg: "Error adding account" });
  }
});

// GET ACCOUNTS ✅ FIXED
router.get("/:userId", async (req, res) => {
  try {
    const accounts = await Bank.find({
      userId: new mongoose.Types.ObjectId(req.params.userId), // ✅ FIX
    });

    res.json(accounts || []);
  } catch (err) {
    console.log("Fetch Accounts Error:", err);
    res.status(500).json({ msg: "Error fetching accounts" });
  }
});

export default router;