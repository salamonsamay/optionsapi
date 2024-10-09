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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const apiKey = localStorage.getItem("apiKey");

      // Debugging token and API key
      console.log("Token in App component:", token);
      console.log("API key in App component:", apiKey);

      // Check if token exists and update authentication state
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      // Mark loading as finished
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
