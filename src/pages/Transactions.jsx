import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/Transaction.css";
import NewIncome from "./NewIncome";
import NewExpense from "./NewExpense";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [month, setMonth] = useState(new Date());

  // ✅ FILTER STATE
  const [filters, setFilters] = useState({
    type: [],
    category: []
  });

  const userId = localStorage.getItem("userId");

  // ✅ FETCH DATA
  const fetchTransactions = useCallback(async () => {
    try {
      if (!userId) return;

      const selectedMonth = month.toISOString().slice(0, 7);

      const res = await axios.get(
        `http://localhost:5000/api/transactions/${userId}?month=${selectedMonth}`
      );

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId, month]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  //  DELETE
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  //  FILTER CHANGE
  const handleFilterChange = (value, type) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);

      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value]
      };
    });
  };

  //  FILTER LOGIC (FIXED)
  const filteredTransactions = transactions.filter((t) => {
    const typeMatch =
      filters.type.length === 0 || filters.type.includes(t.type);

    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.includes(t.category?.toLowerCase());

    return typeMatch && categoryMatch;
  });

  //  DYNAMIC CATEGORY LIST
  const uniqueCategories = [
    ...new Set(transactions.map((t) => t.category?.toLowerCase()))
  ];

  function nextMonth() {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setMonth(newMonth);
  }

  function prevMonth() {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setMonth(newMonth);
  }

  function handleMonthChange(e) {
    setMonth(new Date(e.target.value));
  }

  return (
    <div className="transactions-page">

      {/* FILTER */}
      <div className="transactions-filter">
        <h4>Filter</h4>

        {/* TYPE FILTER */}
        <label>
          <input
            type="checkbox"
            checked={filters.type.includes("income")}
            onChange={() => handleFilterChange("income", "type")}
          />
          Income
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.type.includes("expense")}
            onChange={() => handleFilterChange("expense", "type")}
          />
          Expense
        </label>

        <hr />

        {/*  DYNAMIC CATEGORY FILTER */}
        {uniqueCategories.map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleFilterChange(cat, "category")}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* MAIN */}
      <div className="transactions-main">

        {/* HEADER */}
        <div className="transactions-header">
          <button onClick={prevMonth} className="month-arrow">{"<"}</button>

          <input
            type="month"
            value={month.toISOString().slice(0, 7)}
            onChange={handleMonthChange}
          />

          <button onClick={nextMonth} className="month-arrow">{">"}</button>
        </div>

        {/* LIST */}
        <div className="transactions-list">
          {filteredTransactions.map((t) => (
            <div className="transaction-row" key={t._id}>

              <div className="left">
                <div>
                  <div className="category">{t.category}</div>
                </div>
              </div>

              <div className={t.type === "expense" ? "amount-red" : "amount-green"}>
                {t.type === "expense" ? "−" : "+"} ₹{t.amount}
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(t._id)}
              >
                ✖
              </button>

            </div>
          ))}
        </div>

        {/* FLOAT BUTTONS */}
        <div className="floating-buttons">
          <button className="plus" onClick={() => setIncomeOpen(true)}>+</button>
          <button className="minus" onClick={() => setExpenseOpen(true)}>-</button>
        </div>

      </div>

      {/* MODALS */}
      {incomeOpen && (
        <NewIncome
          fetchTransactions={fetchTransactions}
          close={() => setIncomeOpen(false)}
        />
      )}

      {expenseOpen && (
        <NewExpense
          fetchTransactions={fetchTransactions}
          close={() => setExpenseOpen(false)}
        />
      )}

    </div>
  );
}