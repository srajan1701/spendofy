import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CreditCards.css";
import AddCreditCardModal from "../components/AddCreditCardModal";

export default function CreditCards() {
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCards();
    fetchTransactions();
  }, []);

  //  FETCH CARDS
  const fetchCards = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/credit-cards/${userId}`
      );
      setCards(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //  FETCH TRANSACTIONS
  const fetchTransactions = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/transactions/creditcard/${userId}`
    );
    setTransactions(res.data);
  } catch (err) {
    console.error(err);
  }
};

  //  CALCULATE USED FROM TRANSACTIONS
 const getUsedAmount = (cardId) => {
  return transactions
    .filter((t) => {
      return (
        t.creditCardId &&
        String(t.creditCardId) === String(cardId)
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

  const percent = (used, limit) => {
    if (!limit) return 0;
    return Math.round((used / limit) * 100);
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/credit-cards/${id}`
      );
      fetchCards();
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="credit-page">

      {/* HEADER */}
      <div className="header">
        <h2>Credit Cards</h2>
        <button onClick={() => setShowModal(true)}>
          + Add
        </button>
      </div>

      {/* CARD LIST */}
      {cards.map((card) => {

        const used = getUsedAmount(card._id);
        const remaining = card.limit - used;

        return (
          <div className="card" key={card._id}>

            <div className="card-header">
              <h3>{card.name}</h3>
              <span>
                {card.startDate} - {card.endDate}
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: percent(used, card.limit) + "%"
                }}
              ></div>
            </div>

            {/* DETAILS */}
            <div className="card-details">
              <p>Limit: ₹{card.limit}</p>
              <p>Used: ₹{used}</p>
              <p>Remaining: ₹{remaining}</p>
            </div>

            {/* FOOTER */}
            <div className="card-footer">
              <span className="due">
                Due: ₹{card.due}
              </span>

              <button onClick={() => deleteCard(card._id)}>
                Delete
              </button>
            </div>

          </div>
        );
      })}

      {/* MODAL */}
      {showModal && (
        <AddCreditCardModal
          userId={userId}
          onClose={() => setShowModal(false)}
          refresh={() => {
            fetchCards();
            fetchTransactions();
          }}
        />
      )}
    </div>
  );
}