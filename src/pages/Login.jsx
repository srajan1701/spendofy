import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", "loggedIn");
             localStorage.setItem("userId", data.user.id);
        // React navigation
        navigate("/app");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card shadow-lg rounded-4 d-flex">

        <div className="login-left d-flex flex-column justify-content-center align-items-center text-white p-4">
          <img src="/financial-analysis.png" alt="Spendofy Logo" className="logo-img mb-3" />
          <h2 className="fw-bold text-center">Welcome Back to Spendofy</h2>
          <p className="text-center px-3">
            Manage your expenses smartly & stay financially free.
          </p>
        </div>

        <div className="login-right bg-white p-5 rounded-end-4">
          <h3 className="text-center mb-4 fw-semibold">Login</h3>

          <form onSubmit={handleLogin}>
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
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none text-primary fw-semibold">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}