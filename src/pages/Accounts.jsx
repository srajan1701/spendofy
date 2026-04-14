import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Accounts.css";
import { useNavigate } from "react-router-dom";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankRes = await axios.get(
          `http://localhost:5000/api/bank/${userId}`
        );


        const txRes = await axios.get(
          `http://localhost:5000/api/transactions/${userId}`
        );

        setAccounts(bankRes.data || []);
        
        setTransactions(txRes.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  // WALLET + BANK BALANCE
  const getAccountBalance = (type) => {
    return transactions.reduce((sum, tx) => {
      if (tx.account?.toLowerCase() === type.toLowerCase()) {
        if (tx.type === "income") return sum + Number(tx.amount);
        if (tx.type === "expense") return sum - Number(tx.amount);
      }
      return sum;
    }, 0);
  };

  const walletTotal = getAccountBalance("Wallet");
  const bankTotal = getAccountBalance("Bank");

  

  const totalAmount = walletTotal + bankTotal ;

  return (
    <div className="accounts-page">

      {/* TOP TOTAL */}
      <div className="top-bar">
        <h2>Accounts</h2>
        <div className="total-box">
          Total: ₹ {totalAmount}
        </div>
      </div>

      {/* WALLET */}
      <div className="account-section">
      

        <div className="account-row">
          <div className="left">
            <h4>Wallet</h4>
          </div>

          <div className="right">
            <span className="amount">₹ {walletTotal}</span>
          </div>
        </div>
      </div>

      {/* BANK */}
      <div className="account-section">
        

        <div className="account-row">
          <div className="left">
            <h4>Bank</h4>
          </div>

          <div className="right">
            <span className="amount">₹ {bankTotal}</span>
          </div>
        </div>
      </div>


      {/* ADD BUTTON */}
      <button
        className="fab-btn"
        onClick={() => navigate("/app/add-account")}
      >
        +
      </button>

    </div>
  );
}