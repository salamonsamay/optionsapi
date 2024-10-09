// Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/Login.css"; // Use the same CSS file for styling

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      // Handle password mismatch (e.g., show an error message)
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
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
        console.log("Registration successful:", data);
        // Handle successful registration here (e.g., redirect to login page)
      } else {
        console.error("Registration failed:", response.status);
        // Handle registration failure (e.g., show error message)
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network errors or other unexpected issues
    }
  };

  return (
    <div className="login-container">
      {" "}
      {/* Changed class name */}
      <h2>Register</h2>
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
          onClick={() => navigate("/login")} // Navigate to login
        >
          Already have an account? Log In
        </button>
      </div>
    </div>
  );
};

export default Register;
