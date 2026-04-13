import CreditCard from "../models/CreditCard.js";
import Transaction from "../models/Transaction.js";

export const getCreditCards = async (req, res) => {
  try {
    const { userId } = req.params;

    const cards = await CreditCard.find({ userId });

    const transactions = await Transaction.find({
      userId,
      type: "expense",
    });

    const updatedCards = cards.map((card) => {
      const used = transactions
        .filter(
          (t) =>
            String(t.creditCardId) === String(card._id)
        )
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const remaining = card.limit - used;

      return {
        ...card._doc,
        used,
        remaining,
      };
    });

    res.status(200).json(updatedCards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};