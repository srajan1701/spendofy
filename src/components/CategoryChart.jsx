import React, { useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "../styles/charts.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function CategoryChart() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("expense");
  const [chartType, setChartType] = useState("pie");
  const [data, setData] = useState([]);

  const userId = localStorage.getItem("userId");

 const fetchData = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/transactions/category-chart",
      {
        userId,
        from,
        to,
        type,
      }
    );

    console.log(res.data); // debug
    setData(res.data || []);
  } catch (err) {
    console.log(err);
    setData([]); // safety
  }
};

const chartData = {
  labels: data?.map((d) => d.category) || [],
  datasets: [
    {
      label: "Amount",
      data: data?.map((d) => d.total) || [],

    
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#8BC34A",
        "#E91E63"
      ],

      borderColor: "#fff",
      borderWidth: 2,
    }
  ]
};

  return (
    <div className="chart-page">

      <div className="chart-form">
        <h2>Category Report</h2>

        <div className="form-row">
          <label>From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />

          <label>To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button onClick={fetchData}>Show Report</button>
      </div>

      <div className="chart-switch">
        <button onClick={() => setChartType("pie")} className={chartType === "pie" ? "active" : ""}>
          Pie Chart
        </button>
        <button onClick={() => setChartType("bar")} className={chartType === "bar" ? "active" : ""}>
          Bar Chart
        </button>
      </div>

      <div className="chart-container">
          {data.length === 0 ? (
         <p>No data found</p>
          ) : (
            <div className="chart-box">
              {chartType === "pie" ? (
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              ) : (
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
               )}
            </div>
          )}
        </div>
    </div>
  );
}