import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import API_URL from './config/config'; // Importing the API_URL

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorMessage = await response.text();
        console.error("Registration failed:", response.status, errorMessage);
        setError(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleRegister}>
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
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      <div className="additional-options">
        <button
          className="btn-secondary"
          onClick={() => navigate("/login")}
        >
          Already have an account? Log In
        </button>
      </div>
    </div>
  );
};

export default Register;
