import React from 'react'
import '../styles/Footer.css'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <div className="footer-brand">Spendofy</div>
        <div className="small footer-note">© {new Date().getFullYear()} Spendofy — Personal Finance</div>
      </div>

     <div className="footer-right">
        <Link className="footer-link" to="/privacy">Privacy</Link>
        <Link className="footer-link" to="/terms">Terms</Link>
        <Link className="footer-link" to="/support">Help</Link>
    </div>
    </footer>
  )
}
