import mongoose from "mongoose";

const creditCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    used: {
      type: Number,
      default: 0,
    },
    due: {
      type: Number,
      default: 0,
    },
    startDate: String,
    endDate: String,
  },
  { timestamps: true }
);

export default mongoose.model("CreditCard", creditCardSchema);