import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Overview from "./pages/Overview";
import Notfound from "./pages/Notfound";
import HeroSection from "./components/HeroSection";
import BankSyncPage from "./components/BankSyncPage";
import ConnectGmail from "./pages/ConnectGmail";
import Support from "./pages/Support";
import TermsServices from "./pages/TermsServices";
import NewIncome from "./pages/NewIncome";
import NewExpense from "./pages/NewExpense";
import Accounts from "./pages/Accounts";
import AddAccount from "./pages/AddAccounts";
import CategoryChart from "./components/CategoryChart";
import TimeChart from "./components/TimeChart";
import Calendar from "./pages/Calendar";
import ExportPDF from "./pages/ExportPDF";
import ExportCSV from "./pages/ExportCSV";
import ImportFile from "./pages/ImportCSV";
import CreditCards from "./pages/CreditCards";
import Setting from "./components/Setting";


function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");

 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/banksync" element={<BankSyncPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/connect-gmail" element={<ConnectGmail />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<TermsServices />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Default Dashboard */}
          <Route index element={<Overview />} />

          <Route path="transactions" element={<Transactions />} />
          <Route path="new-income" element={<NewIncome />} />
          <Route path="new-expense" element={<NewExpense />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="add-account" element={<AddAccount />} />
          <Route path="creditcards" element={<CreditCards />} />
          <Route path="budgets" element={<Budgets />} />

         
          <Route path="category-chart" element={<CategoryChart />} />
          <Route path="category-time" element={<TimeChart />}/>
          <Route path="calendar" element={<Calendar />}/>

          <Route path="export-pdf" element={<ExportPDF />} />
          <Route path="export-csv" element={<ExportCSV />} />
          <Route path="import" element={<ImportFile />} />
          <Route path="setting" element={<Setting />}/>

         
        <Route path="*" element={<Notfound />} />
        </Route>

        
        <Route path="*" element={<Notfound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;