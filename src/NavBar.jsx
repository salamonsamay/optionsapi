import React from "react";
import { Link } from "react-router-dom";

import "./css/NavBar.css"; // Import the CSS file

function NavBar({ isAuthenticated }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/optionsChain" className="navbar-link">
            Option Chain
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/pricing" className="navbar-link">
            Pricing
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </li>
        {/* New Calculator Link */}
        <li className="navbar-item">
          <Link to="/calculator" className="navbar-link">
            Option Probability Calculator
          </Link>
        </li>
      </ul>

      {/* Right-side items (Account & Logout) */}
      {isAuthenticated && (
        <div className="navbar-right">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/account" className="navbar-link">
                Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
