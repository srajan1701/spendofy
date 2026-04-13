import express from "express";
import Transaction from "../models/Transaction.js";
import puppeteer from "puppeteer";

const router = express.Router();

//  PDF EXPORT ROUTE
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { month, type, account } = req.query;

    // DATE RANGE
    let start = new Date(`${month}-01`);
    let end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    // FILTER
    let filter = {
      userId,
      date: { $gte: start, $lt: end }
    };

    if (type !== "all") filter.type = type;

    if (account !== "all") {
      if (account === "credit") filter.account = "CreditCard";
      else if (account === "wallet") filter.account = "Wallet";
      else if (account === "bank") filter.account = "Bank";
    }

    const transactions = await Transaction.find(filter);

    //  CALCULATE
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;
    });

    const balance = totalIncome - totalExpense;

    //  HTML
    const html = `
    <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; background: #f4f6f9; }
        .title { text-align:center; font-size:22px; font-weight:bold; }
        .summary { display:flex; margin:20px 0; }
        .box { flex:1; margin:5px; padding:15px; color:white; text-align:center; border-radius:10px; }
        .income { background:#2ecc71; }
        .expense { background:#e74c3c; }
        .balance { background:#3498db; }

        table { width:100%; border-collapse: collapse; background:white; }
        th { background:black; color:white; padding:10px; }
        td { padding:10px; border:1px solid #ddd; text-align:center; }
      </style>
    </head>

    <body>

      <div class="title">💰 Spendofy Report</div>

      <div class="summary">
        <div class="box income">Income ₹${totalIncome}</div>
        <div class="box expense">Expense ₹${totalExpense}</div>
        <div class="box balance">Balance ₹${balance}</div>
      </div>

      <table>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Account</th>
        </tr>

        ${transactions.map((t, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${t.category}</td>
            <td>₹${t.amount}</td>
            <td>${t.type}</td>
            <td>${t.account}</td>
          </tr>
        `).join("")}

      </table>

    </body>
    </html>
    `;

    //  PUPPETEER
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf"
    });

    res.send(pdf);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "PDF error" });
  }
});

export default router;