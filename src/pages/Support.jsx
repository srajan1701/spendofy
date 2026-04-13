import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Support.css";

export default function Support() {
  return (
    <>
      <Header />

      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-subtitle">
          Here you will find answers to the most common questions
        </p>

        <div className="faq-grid">

          <div className="faq-column">
            <h4>General guides</h4>
            <a href="#">First steps in the app</a>
            <a href="#">Protect your data</a>
            <a href="#">Summary page</a>
            <a href="#">Contact us</a>

            <h4>User account and data synchronization</h4>
            <a href="#">User account and data privacy</a>
            <a href="#">Synchronization between devices</a>
            <a href="#">Synchronization troubleshoot</a>

            <h4>Automatic bank synchronization</h4>
            <a href="#">Bank sync</a>
            <a href="#">Connect a new bank</a>
            <a href="#">Bank transaction categorization rules</a>
          </div>

          <div className="faq-column">
            <h4>Budgets</h4>
            <a href="#">Budgets guide</a>

            <h4>Charts and reports</h4>
            <a href="#">Reports by category</a>
            <a href="#">Future time charts guide</a>
            <a href="#">Forecast charts guide</a>

            <h4>PDF reports, file import and backups</h4>
            <a href="#">Import CSV/XLS files</a>
            <a href="#">PDF report</a>
            <a href="#">Backups and photos</a>
          </div>

          <div className="faq-column">
           

            <h4>Accounts and credit cards</h4>
            <a href="#">Accounts guide</a>
            <a href="#">Credit cards guide</a>
            <a href="#">Transfer funds between accounts</a>
          </div>

          <div className="faq-column">
            <h4>Transactions</h4>
            <a href="#">Transactions guide</a>
            <a href="#">Speed up the creation</a>
            <a href="#">Categories and subcategories</a>

            <h4>Scheduled transactions</h4>
            <a href="#">Scheduled transactions guide</a>
            <a href="#">Track your subscriptions</a>

            <h4>Debts</h4>
            <a href="#">Debts and Credits guide</a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}