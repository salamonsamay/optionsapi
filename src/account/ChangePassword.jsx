import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/config";
import "./../css/ChangePassword.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Password validation function
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

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setErrors((prev) => ({
      ...prev,
      newPassword: validatePassword(value),
      confirmPassword:
        value !== confirmPassword ? "Passwords do not match" : "",
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: value !== newPassword ? "Passwords do not match" : "",
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate new password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setStatus(400);
      setMessage(passwordError);
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setStatus(400);
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/user/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: password,
          newPassword: newPassword,
        }),
      });

      const data = await response.text();
      setStatus(response.status);
      setMessage(data);

      if (response.ok) {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/account");
        }, 2000);
      }
    } catch (error) {
      setStatus(500);
      setMessage("Error updating password");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Check if form should be disabled
  const hasErrors = () => {
    return (
      Object.values(errors).some((error) => error !== "") ||
      !password ||
      !newPassword ||
      !confirmPassword
    );
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div className="input-group">
          <label htmlFor="current-password">Current Password</label>
          <div className="password-input">
            <input
              id="current-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className={errors.newPassword ? "error" : ""}
            required
          />
          {errors.newPassword && (
            <span className="error-message">{errors.newPassword}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={errors.confirmPassword ? "error" : ""}
            required
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
        {status && (
          <p className={`message ${status === 200 ? "success" : "error"}`}>
            Status: {status}
            <br />
            Message: {message}
          </p>
        )}
        <div className="password-requirements">
          <p>Password must contain:</p>
          <ul>
            <li className={newPassword.length >= 8 ? "valid" : ""}>
              At least 8 characters
            </li>
            <li className={/[A-Z]/.test(newPassword) ? "valid" : ""}>
              One uppercase letter
            </li>
            <li className={/[a-z]/.test(newPassword) ? "valid" : ""}>
              One lowercase letter
            </li>
            <li className={/[0-9]/.test(newPassword) ? "valid" : ""}>
              One number
            </li>
            <li className={/[!@#$%^&*]/.test(newPassword) ? "valid" : ""}>
              One special character (!@#$%^&*)
            </li>
          </ul>
        </div>
        <button type="submit" className="btn-primary" disabled={hasErrors()}>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
