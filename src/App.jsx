import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import OptionsChain from "./OptionsChain";
import PayPalCheckout from "./PayPalCheckout";
import ForgotPassword from "./ForgotPassword";
import Pricing from "./Pricing";
import Contact from "./Contact";
import NavBar from "./NavBar";
import Account from "./account/Account";
import ChangePassword from "./account/ChangePassword";
import Home from "./Home";
import OptionProbabilty from "./OptionProbability";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const apiKey = localStorage.getItem("apiKey");

      console.log("Token in App component:", token);
      console.log("API key in App component:", apiKey);

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    // Remove token and apiKey from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");

    // Update authentication state
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="route">
        <Routes>
          <Route
            path="/optionsChain"
            element={
              isAuthenticated ? <OptionsChain /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/optionsChain" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/paypal-checkout" element={<PayPalCheckout />} />
          <Route path="/success" element={<h2>Payment Success!</h2>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calculator" element={<OptionProbabilty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
