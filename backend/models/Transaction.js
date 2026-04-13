import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  account: {
    type: String,
    required: true,
    enum: ["Wallet", "Bank", "CreditCard"]
  },

  creditCardId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "CreditCard",
  default: null
},

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },

  category: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Transaction", transactionSchema);