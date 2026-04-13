import React, { useState } from "react";
import "../styles/BankSyncPage.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function BankSyncPage() {

  const navigate = useNavigate();
  const [bank, setBank] = useState("");

  const handleConnectBank = () => {

    if (!bank) {
      alert("Please select your bank first");
      return;
    }

    navigate("/connect-gmail", { state: { bank } });

  };

  return (
    <>
    <div className="banksync-wrapper">
      <Header />

      {/* HERO SECTION */}
      <section className="banksync-hero">
        <div className="container hero-content">
          <div className="hero-left">
            <div className="hero-icon">🏦</div>
            <h1>Link your bank to Spendofy</h1>
            <p>
              Harness the power of automation. <br />
              Let our app sync your bank data for you. <br />
              Effortlessly sort your spending with automatic categorization.
            </p>
          </div>

          <div className="hero-right">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="app preview"
              className="phone-mockup"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="banksync-features">
        <div className="container features-grid">

          <div className="feature-box">
            <div className="feature-icon">⚙️</div>
            <h5>Easy setup</h5>
            <p>Connect your bank in a breeze and simplify finance management.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🔒</div>
            <h5>Safe connection</h5>
            <p>Certified partners ensure full safety of your transactions.</p>
          </div>

        </div>
        <h5>Coming soon</h5>
        <div className="app-buttons">
          <button className="store-btn">Try the WEB APP</button>
          <button className="store-btn">Google Play</button>
          <button className="store-btn">App Store</button>
        </div>
      </section>

      {/* VERIFY BANK */}
      <section className="banksync-verify">
        <div className="container text-center">

          <h4>VERIFY IF YOUR BANK IS AVAILABLE</h4>

          <select
            className="bank-select"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >

            <option value="">Select Your Bank</option>
            <option>State Bank of India</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
            <option>Punjab National Bank</option>
            <option>Bank of Baroda</option>
            <option>Canara Bank</option>
            <option>Union Bank of India</option>
            <option>Kotak Mahindra Bank</option>
            <option>IndusInd Bank</option>
            <option>Yes Bank</option>
            <option>IDFC First Bank</option>
            <option>Central Bank of India</option>
            <option>Indian Bank</option>
            <option>UCO Bank</option>
            <option>Bank of India</option>
            <option>Bandhan Bank</option>
            <option>RBL Bank</option>
            <option>Federal Bank</option>
            <option>South Indian Bank</option>
            <option>Karnataka Bank</option>
            <option>Karur Vysya Bank</option>
            <option>Tamilnad Mercantile Bank</option>
            <option>Dhanlaxmi Bank</option>
            <option>City Union Bank</option>
            <option>Jammu & Kashmir Bank</option>
            <option>Punjab & Sind Bank</option>

          </select>

          <div style={{ marginTop: "20px" }}>
            <button
              className="btn btn-primary"
              onClick={handleConnectBank}
            >
              Connect Bank
            </button>
          </div>

        </div>
       
      </section>
      <Footer/>
    </div>
    </>
  );
}