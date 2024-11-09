import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/NavBar.css";

function NavBar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">
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
        <li className="navbar-item">
          <Link to="/calculator" className="navbar-link">
            Option Probability Calculator
          </Link>
        </li>
      </ul>

      {/* Right-side items (Account & Login/Logout) */}
      <div className="navbar-right">
        <ul className="navbar-list">
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/account" className="navbar-link">
                  Account
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/logout" className="navbar-link">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
