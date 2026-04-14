import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Transaction.css";

export default function NewIncome() {

  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [account, setAccount] = useState("Wallet");
  const [date, setDate] = useState("");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const saveIncome = async () => {
    try {

      const payload = {
        userId,
        category,
        amount: Number(value),
        account,
        date,
        type: "income"
      };

      console.log("Sending Income:", payload);

      await axios.post("http://localhost:5000/api/transactions/add", payload);

      setCategory("");
      setValue("");
      setAccount("Wallet");
      setDate("");

      alert("Income Added Successfully!");
      navigate("/app/transactions");

    } catch (err) {
      console.log(err);
      alert("Error saving income");
    }
  };

  return (
    <div className="page-form">

      <h2>NEW INCOME</h2>

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <select
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      >
        <option value="Wallet">Wallet</option>
        <option value="Bank">Bank</option>
        <option value="CreditCard">Credit Card</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="buttons">
        <button onClick={() => navigate(-1)}>Cancel</button>
        <button onClick={saveIncome}>Save</button>
      </div>

    </div>
  );
}