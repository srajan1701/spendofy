import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/Overview.css";
import axios from "axios";
import Footer from "../components/Footer";

import { Line, Pie, Bar } from "react-chartjs-2";

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 BarElement,
 ArcElement,
 Tooltip,
 Legend
} from "chart.js";

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 BarElement,
 ArcElement,
 Tooltip,
 Legend
);

export default function Overview(){

 const [txs,setTxs] = useState([])

 const userId = localStorage.getItem("userId")

 // Fetch Transactions
 useEffect(()=>{

  const fetchTransactions = async()=>{

   try{

    if (!userId) return;

    const res = await axios.get(
     `http://localhost:5000/api/transactions/${userId}`
    )

    setTxs(res.data)

   }catch(err){
    console.log(err)
   }

  }

  fetchTransactions()

 },[userId])


 // Income / Expense

 const totalExp = txs
  .filter(t=>t.type==="expense")
  .reduce((s,t)=>s + Number(t.amount),0)

 const totalInc = txs
  .filter(t=>t.type==="income")
  .reduce((s,t)=>s + Number(t.amount),0)



 // Category Data

 const cat = {}

 txs.forEach(t=>{
  const k = t.category || "Other"
  cat[k] = (cat[k] || 0) + Number(t.amount)
 })

 const pieData = {
  labels:Object.keys(cat),
  datasets:[{
   data:Object.values(cat),
   backgroundColor:[
    "#60a5fa",
    "#34d399",
    "#f472b6",
    "#f59e0b",
    "#fb7185",
    "#a78bfa"
   ]
  }]
 }



 // Last 7 Days (Line Chart)

 const last7 = []

 for(let i=6;i>=0;i--){
  const d = new Date()
  d.setDate(d.getDate() - i)

  const day = d.toLocaleDateString()

  const total = txs
   .filter(t => new Date(t.date).toLocaleDateString() === day)
   .reduce((s,t)=>s + Number(t.amount),0)

  last7.push(total)
 }

 const labels = Array.from({length:7}).map((_,i)=>{
  const d = new Date()
  d.setDate(d.getDate()-(6-i))
  return d.toLocaleDateString()
 })

 const lineData = {
  labels,
  datasets:[{
   label:"Spending",
   data:last7,
   borderColor:"#fb7185",
   backgroundColor:"rgba(251,113,133,0.12)",
   tension:0.3
  }]
 }



 //  Bar Chart (Income vs Expense)

 const barData = {
  labels,
  datasets: [
    {
      label: "Income",
      data: labels.map(day => {
        return txs
          .filter(t =>
            t.type === "income" &&
            new Date(t.date).toLocaleDateString() === day
          )
          .reduce((s, t) => s + Number(t.amount), 0)
      }),
      backgroundColor: "#4ade80"
    },
    {
      label: "Expense",
      data: labels.map(day => {
        return txs
          .filter(t =>
            t.type === "expense" &&
            new Date(t.date).toLocaleDateString() === day
          )
          .reduce((s, t) => s + Number(t.amount), 0)
      }),
      backgroundColor: "#f87171"
    }
  ]
 }



 // ✅ Last Month Category

 const lastMonthCat = {}

 const now = new Date()
 const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
 const endLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

 txs.forEach(t => {
  const d = new Date(t.date)

  if (d >= lastMonth && d <= endLastMonth) {
    const k = t.category || "Other"
    lastMonthCat[k] = (lastMonthCat[k] || 0) + Number(t.amount)
  }
 })

 const lastMonthPieData = {
  labels: Object.keys(lastMonthCat),
  datasets: [{
    data: Object.values(lastMonthCat),
    backgroundColor: [
      "#38bdf8",
      "#22c55e",
      "#facc15",
      "#fb7185",
      "#a78bfa",
      "#f97316"
    ]
  }]
 }



 return(

  <div>

   {/* CARDS */}
   <div className="overview-grid">

    <Card title="Income" value={`₹${totalInc.toFixed(2)}`} color="#059669"/>
    <Card title="Expenses" value={`₹${totalExp.toFixed(2)}`} color="#ef4444"/>
    <Card title="Balance" value={`₹${(totalInc-totalExp).toFixed(2)}`}/>

   </div>



   {/* CHARTS */}
 <div className="overview-charts">

  {/* Row 1 */}
  <div className="card card-shadow">
    <h4>Spending (last 7 days)</h4>
    <Line data={lineData}/>
  </div>

  <div className="card card-shadow">
    <h4>By category</h4>
    <Pie data={pieData}/>
  </div>


  {/* Row 2 */}
  <div className="card card-shadow">
    <h4>Income vs Expense</h4>
    <Bar data={barData}/>
  </div>

  <div className="card card-shadow">
    <h4>Last Month Category</h4>
    <Pie data={lastMonthPieData}/>
  </div>

</div>



   {/* TABLE */}
   <div className="card card-shadow table-card">

    <h4>Recent transactions</h4>

    <div style={{overflow:"auto"}}>

     <table>
      <thead>
       <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Merchant</th>
       </tr>
      </thead>

      <tbody>

       {txs.slice(0,10).map((t,i)=>(
        <tr key={i}>
         <td>{new Date(t.date).toLocaleDateString()}</td>
         <td>{t.type}</td>
         <td>₹{t.amount}</td>
         <td>{t.category}</td>
         <td>{t.merchant}</td>
        </tr>
       ))}

       {!txs.length && (
        <tr>
         <td colSpan="5" className="empty">
          No transactions yet
         </td>
        </tr>
       )}

      </tbody>

     </table>

    </div>

   </div>
    <Footer/>
  </div>
 )
}