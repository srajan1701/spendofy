import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "../styles/charts.css";

export default function TimeChart() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [chartData, setChartData] = useState([]);

  const userId = localStorage.getItem("userId");

  const getReport = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/transactions/time-chart", {
        userId,
        from,
        to
      });

      setChartData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const data = {
   labels: chartData.map((d) =>
  new Date(d.date).toLocaleDateString()
),
datasets: [
  {
    label: "Income",
    data: chartData.map((d) => d.income),
    backgroundColor: "green"
  },
  {
    label: "Expense",
    data: chartData.map((d) => d.expense),
    backgroundColor: "red"
  }
]
  };

  return (
    <div className="time-page">
      <div className="time-form">
        <h3>Charts: Time</h3>

        <input
          type="date"
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="date"
          onChange={(e) => setTo(e.target.value)}
        />

        <button onClick={getReport}>SHOW REPORT</button>
      </div>

      <div className="chart-box">
        <Bar data={data} />
      </div>
    </div>
  );
}