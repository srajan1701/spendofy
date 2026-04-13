import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Calendar.css";

export default function AdvancedCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCalendarData();
  }, [currentDate]);

  const fetchCalendarData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/transactions/calendar/${userId}`
      );

      let formatted = {};
      res.data.forEach((item) => {
        formatted[item._id.date] = item;
      });

      setData(formatted);
    } catch (err) {
      console.log("Calendar Error:", err);
    }
  };

  const fetchTransactionsByDate = async (date) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/time/calendar/${userId}/${date}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.log("Date Error:", err);
    }
  };

  const changeMonth = (type) => {
    let newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (type === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 🔥 FIXED
    const firstDayRaw = new Date(year, month, 1).getDay();
    const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1;

    const totalDays = new Date(year, month + 1, 0).getDate();

    let days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="empty" key={"e" + i}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dateObj = new Date(year, month, i);
      const dateKey = dateObj.toISOString().split("T")[0];

      const dayData = data[dateKey] || {};

      days.push(
        <div
          key={i}
          className="day"
          onClick={() => {
            setSelectedDay(dateKey);
            fetchTransactionsByDate(dateKey);
          }}
        >
          <span>{i}</span>

          <div className="dots">
            {dayData.expense > 0 && <span className="dot red"></span>}
            {dayData.income > 0 && <span className="dot green"></span>}
          </div>

          {dayData.expense > 0 && (
            <p className="expense">-₹{dayData.expense}</p>
          )}
          {dayData.income > 0 && (
            <p className="income">+₹{dayData.income}</p>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth("prev")}>⬅</button>

        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>

        <button onClick={() => changeMonth("next")}>➡</button>
      </div>

      <div className="weekdays">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">{getDays()}</div>

      {selectedDay && (
        <div className="transaction-panel">
          <h3>{selectedDay}</h3>

          {transactions.length === 0 ? (
            <p>No Transactions</p>
          ) : (
            transactions.map((t) => (
              <div key={t._id} className="txn-card">
                <span>{t.category}</span>
                <span className={t.type}>
                  {t.type === "expense" ? "-" : "+"}₹{t.amount}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}