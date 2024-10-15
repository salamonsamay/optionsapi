import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/config";
import "./../css/ChangePassword.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
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

      const data = await response.json(); // Parsing the response to get the message

      if (response.ok) {
        setMessage(data.message || "Password updated successfully");
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/account");
      } else {
        setMessage(data.message || "Failed to update password");
      }
    } catch (error) {
      setMessage("Error updating password");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button type="submit" className="btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
};

// Exporting the ChangePassword component as default
export default ChangePassword;
