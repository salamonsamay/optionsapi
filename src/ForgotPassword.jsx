import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/ForgotPassword.css";
import API_URL from "./config/config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        setMessage("A reset link has been sent to your email.");
        setErrorMessage(""); // Clear any previous error messages
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Error in sending reset link. Please try again."
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
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
        {message && <p className="success-message">{message}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn-primary">
          Send Reset Link
        </button>
      </form>
      <div className="additional-options">
        <button className="btn-secondary" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
