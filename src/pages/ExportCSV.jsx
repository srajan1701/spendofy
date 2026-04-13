import { useState } from "react";
import axios from "axios";
import getDefaultMonth from "../hooks/useDefaultMonth";
import "../styles/importExport.css";

export default function ExportCSV() {
  const [month, setMonth] = useState(getDefaultMonth());

  const handleExport = async () => {
    const userId = localStorage.getItem("userId");

    const res = await axios.get(
      `http://localhost:5000/api/export/data/${userId}?month=${month}`
    );

    const csv = res.data
      .map((r) => `${r.date},${r.type},${r.amount}`)
      .join("\n");

    const blob = new Blob([csv]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();

    alert("CSV Downloaded ✅");
  };

  return (
    <div className="import-export-page">
      <div className="card">
        <div className="title">Export CSV</div>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="input"
        />

        <button className="btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
    </div>
  );
}