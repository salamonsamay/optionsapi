import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";
import API_URL from "./config/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ולידציה של אימייל
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  // ולידציה של סיסמה
  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return "";
  };

  // ולידציה של אימות סיסמה
  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  // טיפול בשינויים בשדות
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
      confirmPassword: confirmPassword
        ? validateConfirmPassword(confirmPassword)
        : "",
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(value),
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess("");

    // ולידציה סופית לפני שליחה
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
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

      if (response.ok) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorData = await response.text();
        setErrors((prev) => ({
          ...prev,
          general: `Registration failed: ${errorData}`,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: `An error occurred: ${error.message}`,
      }));
    }
  };

  // בדיקה אם יש שגיאות כלשהן
  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  return (
    <div className="register-container">
      <div className="form-box">
        <h1>Create Your Account</h1>
        <p>Enter your email and password to create a new account.</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={errors.email ? "error" : ""}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? "error" : ""}
              required
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={errors.confirmPassword ? "error" : ""}
              required
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>
          {errors.general && <p className="error-message">{errors.general}</p>}
          {success && <p className="success-message">{success}</p>}
          <button
            type="submit"
            className="btn-primary"
            disabled={hasErrors() || !email || !password || !confirmPassword}
          >
            Register
          </button>
        </form>
        {/* <div className="password-requirements">
          <p>Password must contain:</p>
        </div> */}
        <a href="/login" className="return-link">
          Already have an account? Log in here
        </a>
      </div>
    </div>
  );
};

export default Register;
