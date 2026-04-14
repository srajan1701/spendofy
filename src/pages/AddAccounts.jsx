import React, { useState } from "react";
import axios from "axios";
import "../styles/Accounts.css";
import { useNavigate } from "react-router-dom";

export default function AddAccount() {

  const [name, setName] = useState("");
  const [type, setType] = useState("Wallet");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/add-account", {
        userId,
        name,
        type,
        amount
      });

      navigate("/accounts");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-account-page">

      <h2>CREATE NEW ACCOUNT</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Wallet</option>
        <option>Bank</option>
        <option>Credit Card</option>
      </select>

      <input
        type="number"
        placeholder="Initial Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="buttons">
        <button className="cancel" onClick={() => navigate("/app/accounts")}>
          CANCEL
        </button>

        <button className="save" onClick={handleSave}>
          SAVE
        </button>
      </div>

    </div>
  );
}