import React from "react";
import "../styles/FinanceOverview.css";

export default function FinanceOverview() {
  return (
    <>
    <section className="finance-overview-section">
      <div className="container finance-container">
      
        <div className="finance-left">
        <div className="circle-bg multi-gradient">
          <img
            src="/src/assets/firstimage.png"
            alt="Finance mobile dashboard"
            className="finance-image-mobile"
          />
          </div>
        </div>

    
        <div className="finance-right">
          <h2 className="finance-title">Your Finances at a Glance</h2>
          <p className="finance-subtitle">
            Stop wondering where your money goes!
          </p>
          <p className="finance-text">
            Spendofy provides a customizable overview of your income, expenses,
            and budgets on a single screen. Our intuitive reports and charts
            make it easy to understand your spending habits and identify areas
            for improvement.
          </p>

          <img
            src="/src/assets/first.png"  
            alt="Finance desktop dashboard"
            className="finance-image-desktop"
          />
        </div>
      </div>
      </section>

   
      <section className="accounts-sync-section">
        <div className="container accounts-sync-container">
       
          <div className="accounts-left">
            <div className="circle-bg multi-gradient">
              <img
                src="/src/assets/secondimage.png" 
                alt="Accounts sync mobile view"
                className="accounts-image"
              />
            </div>
          </div>

        
          <div className="accounts-right">
            <h2 className="accounts-title">Accounts with Automatic Sync</h2>
            <p className="accounts-text">
              Securely connect all your bank accounts to Spendofy for a complete
              picture of your finances.
            </p>
            <p className="accounts-link">
              <a href="#">Check if your bank is supported</a>
            </p>
            <p className="accounts-text">
              This feature is optional. You can enter your transactions manually.
              You can view the most important information relating to an account
              with many charts and reports. There is also an entire section
              dedicated to credit cards.
            </p>
           
          </div>
        </div>
      </section>


      <section className="finance-overview-section">
      <div className="container finance-container">
      
        <div className="finance-left third">
        <div className="circle-bg multi-gradient">
          <img
            src="/src/assets/thirdimage.png"
            alt="Finance mobile dashboard"
            className="finance-image-mobile"
          />
          </div>
        </div>

    
        <div className="finance-right">
          <h2 className="finance-title">Expense Tracking</h2>
        
          <p className="finance-text">
           Managing your daily expenses has never been this simple.
           With Fast Budget, you can categorize your spending with
            unlimited custom categories and subcategories. Set up
             scheduled transactions for recurring bills and use transaction
              templates for quick and easy data entry.
          </p>

          
        </div>
      </div>
      </section>

     </>    
  );
}
