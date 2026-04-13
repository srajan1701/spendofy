import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

// 📊 Chart
export const getTimeChart = async (req, res) => {
  try {
    const { userId, from, to, account } = req.body;

    const start = new Date(from);
    const end = new Date(to);

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lte: end },
          ...(account && { account })
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};


// 📅 Calendar
export const getCalendarData = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$date" }
            }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Calendar Error" });
  }
};


// 📌 Date click
export const getTransactionsByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lte: end }
    });

    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Date Fetch Error" });
  }
};