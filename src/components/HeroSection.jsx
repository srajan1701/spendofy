// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header"; 
import "../styles/HeroSection.css"; 
import FinanceOverview from "./FinanceOverview";
import Footer from "./Footer";


export default function HeroSection() {
  return (
    <>
    <div className="hero-root">
      <Header />

      <div className="hero-content">
        <div className="container text-center" style={{ paddingTop: "0px" , marginTop: "1px"}}>
          <h1 className="display-4 fw-bold fs-1 text-primary">Take control of your money with Spendofy</h1>
          <h2>Best Expenses Manager</h2>
          <p className="lead text-muted mt-3">
            Spendify helps you track expenses, set budgets, and reach your financial goals.
          </p>
          <div className="mt-4">
            <Link to="/signup" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg">
              Log In
            </Link>
          </div>
        </div>
     </div>
      <FinanceOverview/>
      <Footer/>
    </div>
    
     </>
  );
}
