import React, { useState } from "react";
import "../styles/Login.css";
import { useLocation } from "react-router-dom";

function ConnectGmail() {

    const location = useLocation();

    const bank = location.state?.bank;
const [email, setEmail] = useState("");


const handleSubmit = (e) => {
  e.preventDefault();

  if(!email){
    alert("Please enter your Gmail");
    return;
  }

  // Gmail OAuth backend route
  window.location.href = "http://localhost:5000/connect-gmail";
};

return (
     
<div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card shadow-lg rounded-4 d-flex">
        <div className="login-left d-flex flex-column justify-content-center align-items-center text-white p-4">
          <img src="/public/financial-analysis.png" alt="Spendofy Logo" className="logo-img mb-3" />
          <h2 className="fw-bold text-center">Welcome  to Spendofy</h2>
          <p className="text-center px-3">
            Manage your expenses smartly & stay financially free. with your 'Gmail account'...
          </p>
        </div>

        <div className="login-right bg-white p-5 rounded-end-4">
          <h3 className="text-center mb-4 fw-semibold">Connect Gmail</h3>
          <form onSubmit={handleSubmit}>
            <p style={{fontSize:"14px",color:"gray",textAlign:"center"}}>
                 Please enter the Gmail account that is connected to your bank: {bank}
                  <br />We will use it to fetch your bank transaction alerts.
            </p>




            <div className="mb-3">
              <label className="form-label fw-semibold">Bank Alert Gmail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
           
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              
            >
              Connect Bank
            </button>
          </form>
        </div>
      </div>
    </div>

)

}

export default ConnectGmail