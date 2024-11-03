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
    setErrorMessage("");
    setMessage("");

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
        setMessage("We've sent you instructions to reset your password.");
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
      <div className="form-box">
        <h1>Reset Your Password</h1>
        <p>
          Fear not. We’ll email you instructions to reset your password. If you
          don’t have access to your email anymore, you can try{" "}
          <a href="/account-recovery">account recovery</a>.
        </p>
        <form onSubmit={handleForgotPassword}>
          <div className="input-group">
            <label htmlFor="email">Username</label>
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
            Reset Password
          </button>
        </form>
        <a href="/login" className="return-link">
          Return to login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
