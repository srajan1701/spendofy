import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/HeroSection.css";
import "../styles/Header.css";


export default function Header() {
  const location = useLocation();

  // hide header on layout page
  if (location.pathname === "/layout") return null;

  return (
    <div className="Headercolore">
   <nav className="navbar navbar-expand-lg shadow-sm py-3 fixed-top header">

      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
         <img src="/financial-analysis.png" alt="logo" height={45} width={45}/>
          Spendofy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav mx-5">
    
    <li className="nav-item">
      <NavLink 
        to="/" 
        end
        className={({ isActive }) => 
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink 
        to="/banksync"
        className={({ isActive }) => 
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Bank Sync
      </NavLink>
    </li>

    <li className="nav-item me-3">
      <NavLink 
        to="/gallery"
        className={({ isActive }) => 
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Gallery
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink 
        to="/support"
        className={({ isActive }) => 
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Support
      </NavLink>
    </li>

  </ul>

  <div className="d-flex ms-auto">
    <NavLink to="/login" className="btn btn-primary me-2">
      Log in
    </NavLink>
    <NavLink to="/signup" className="btn btn-primary">
      Sign up
    </NavLink>
  </div>
</div>
      </div>
    </nav>
    </div>
  );
}
