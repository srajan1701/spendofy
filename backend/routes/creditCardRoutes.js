import express from "express";
import mongoose from "mongoose"; 
import CreditCard from "../models/CreditCard.js";


const router = express.Router();


// ADD CARD
router.post("/", async (req, res) => {
  try {
    const card = await CreditCard.create(req.body);
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER CARDS  FIXED
router.get("/:userId", async (req, res) => {
  try {
    const cards = await CreditCard.find({
      userId: new mongoose.Types.ObjectId(req.params.userId),
    });

    res.json(cards || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE CARD
router.delete("/:id", async (req, res) => {
  try {
    await CreditCard.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;