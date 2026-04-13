import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password, mobile}),
      });

      const data = await res.json();
      setLoading(false);

      setMessage(data.message);

      if (res.ok) {
        
          navigate("/banksync");
        
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage("⚠️ Server error! Please try again later.");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card shadow-lg rounded-4 d-flex">
        <div className="login-left d-flex flex-column justify-content-center align-items-center text-white p-4">
          <img
            src="/financial-analysis.png"
            alt="Spendofy Logo"
            className="logo-img mb-3"
          />
          <h2 className="fw-bold">Join Spendofy Today</h2>
          <p className="text-center px-3">
            Take control of your financial journey — it starts here.
          </p>
        </div>

        <div className="login-right bg-white p-5 rounded-end-4">
          <h3 className="text-center mb-4 fw-semibold">Create Account</h3>

          {message && (
            <div
              className={`alert ${
                message.includes("Welcome")
                  ? "alert-success"
                  : "alert-warning"
              } text-center`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
             <div className="mb-3">
                <label className="form-label fw-semibold">Mobile</label>
                <input
                 type="tel"
                className="form-control"
                placeholder="Enter your mobile number"
                value={mobile}
                 onChange={(e) => setMobile(e.target.value)}
                pattern="[0-9]{10}"
                 maxLength="10"
                 required
                />
             </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-decoration-none text-primary fw-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
