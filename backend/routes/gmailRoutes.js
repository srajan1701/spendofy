import express from "express";
import Transaction from "../models/Transaction.js";
import { detectCategory } from "../services/aiService.js";

const router = express.Router();

router.post("/fetch",async(req,res)=>{

 const {userId,emailText} = req.body;

 const amountMatch = emailText.match(/\d+/);

 const amount = amountMatch ? amountMatch[0] : 0;

 const category = detectCategory(emailText);

 const transaction = new Transaction({

  userId,
  amount,
  category,
  description:emailText

 });

 await transaction.save();

 res.json({
  message:"Transaction saved",
  transaction
 });

});

export default router;