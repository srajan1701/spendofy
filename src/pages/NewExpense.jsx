import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Transaction.css";

export default function NewExpense() {

  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [account, setAccount] = useState("Wallet"); 
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [date, setDate] = useState("");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  //  FETCH CREDIT CARDS
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/credit-cards/${userId}`
        );
        setCreditCards(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCards();
  }, [userId]);

  const saveExpense = async () => {
    try {

      const payload = {
        userId,
        category,
        amount: Number(value),
        account,
        date,
        type: "expense",

        //  ONLY WHEN CREDIT CARD USED
        creditCardId: account === "CreditCard" ? selectedCard : null
      };

      console.log("Sending Expense:", payload);

      await axios.post(
        "http://localhost:5000/api/transactions/add",
        payload
      );

      setCategory("");
      setValue("");
      setAccount("Wallet");
      setSelectedCard("");
      setDate("");

      alert("Expense Added Successfully!");

    } catch (err) {
      console.log(err);
      alert("Error saving expense");
    }
  };

  return (
    <div className="page-form">

      <h2>NEW EXPENSE</h2>

      {/* CATEGORY */}
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* AMOUNT */}
      <input
        placeholder="Amount"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* MAIN ACCOUNT SELECT */}
      <select
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      >
        <option value="Wallet">Wallet</option>
        <option value="Bank">Bank</option>
        <option value="CreditCard">Credit Card</option>
      </select>

      {/*SHOW CREDIT CARDS ONLY WHEN USER SELECTS CREDIT CARD */}
      {account === "CreditCard" && (
        <select
          value={selectedCard}
          onChange={(e) => setSelectedCard(e.target.value)}
        >
          <option value="">Select Credit Card</option>

          {creditCards.map((card) => (
            <option key={card._id} value={card._id}>
              {card.name}
            </option>
          ))}
        </select>
      )}

      {/* DATE */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* BUTTONS */}
      <div className="buttons">
        <button onClick={() => navigate(-1)}>Cancel</button>
        <button onClick={saveExpense}>Save</button>
      </div>

    </div>
  );
}