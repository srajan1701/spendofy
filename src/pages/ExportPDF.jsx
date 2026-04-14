import { useState } from "react";
import axios from "axios";
import getDefaultMonth from "../hooks/useDefaultMonth";
import "../styles/importExport.css";

export default function ExportPDF() {
  const [month, setMonth] = useState(getDefaultMonth());
  const [type, setType] = useState("all");
  const [account, setAccount] = useState("all");

  const handleExport = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not found ❌");
        return;
      }

     const res = await axios.get(
  `http://localhost:5000/api/pdf/${userId}`,
  {
    params: { month, type, account },
    responseType: "blob"
  }
);
      

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("PDF Exported ✅");
    } catch (err) {
      console.log(err);
      alert("Export failed ❌");
    }
  };

  return (
    <div className="import-export-page">
      <div className="card">
        <div className="title">Export PDF</div>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="input"
        />

        <select className="select" onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select className="select" onChange={(e) => setAccount(e.target.value)}>
          <option value="all">All Accounts</option>
          <option value="wallet">Wallet</option>
          <option value="bank">Bank</option>
          <option value="credit">Credit Card</option>
        </select>

        <button className="btn" onClick={handleExport}>
          Export PDF
        </button>
      </div>
    </div>
  );
}