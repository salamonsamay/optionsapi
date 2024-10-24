import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/NavBar.css"; // Import the CSS file

function NavBar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    // Call the provided onLogout function
    onLogout();
    // Navigate to the /login route
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
              <button
                className="navbar-button"
                onClick={() => (window.location.href = "/account")}
              >
                Account
              </button>
            </li>
            <li className="navbar-item">
              <button className="navbar-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
