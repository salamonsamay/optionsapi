import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import API_URL from "./config/config"; // Importing the API_URL

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        // Using the API_URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("apiKey", data.apiKey);
        localStorage.setItem("email", data.email); // Storing email in localStorage
        localStorage.setItem("isSubscribed", data.isSubscribe); // Store subscription status if needed

        setIsAuthenticated(true);
        navigate("/optionsChain");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <div className="additional-options">
        <button
          className="btn-secondary"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password
        </button>
        <button className="btn-secondary" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
