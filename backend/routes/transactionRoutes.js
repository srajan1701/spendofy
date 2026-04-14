import express from "express";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";


const router = express.Router();



//  ADD TRANSACTION
router.post("/add", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding transaction" });
  }
});


//  CALENDAR (DATE-WISE SUMMARY)
router.get("/calendar/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$date",
              },
            },
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    console.log("Calendar Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


//  GET TRANSACTIONS BY DATE
router.get("/calendar/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;

    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lt: end },
    });

    res.json(transactions);
  } catch (err) {
    console.log("Date Fetch Error:", err);
    res.status(500).json({ msg: "Error fetching transactions by date" });
  }
});


//  CATEGORY CHART
router.post("/category-chart", async (req, res) => {
  try {
    const { userId, from, to, type } = req.body;

    if (!userId || !from || !to || !type) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: type,
          date: {
            $gte: new Date(from),
            $lte: new Date(to + "T23:59:59.999Z"),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          category: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    console.log("Category Chart Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// TIME CHART (DATE-WISE INCOME vs EXPENSE)
router.post("/time-chart", async (req, res) => {
  try {
    const { userId, from, to } = req.body;

    if (!userId || !from || !to) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(from),
            $lte: new Date(to + "T23:59:59.999Z"),
          },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$date",
              },
            },
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
      {
        $project: {
          date: "$_id.date",
          income: 1,
          expense: 1,
          _id: 0,
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    console.log("Time Chart Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// DELETE TRANSACTION
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.get("/creditcard/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({
      userId,
      type: "expense",
      account: "CreditCard",
      creditCardId: { $ne: null }
    }).lean();

    res.json(transactions);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching credit card transactions" });
  }
});


// GET ALL TRANSACTIONS BY USER (ALWAYS LAST)
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId,
    });

    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching transactions" });
  }
});

export default router;