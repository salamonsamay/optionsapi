import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/config";
import "./../css/Account.css";
import ChangePassword from "./ChangePassword";

const Account = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/user/data", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.log("Error fetching user data:", response.statusText);
            setMessage("Failed to load user data.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setMessage("An error occurred while fetching user data.");
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigateToChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      {user ? (
        <>
          <div className="user-info">
            <p>
              <strong>Email:</strong> <span>{user.email}</span>
            </p>
            <p>
              <strong>API Key:</strong> <span>{user.apiKey}</span>
            </p>
          </div>

          <h3>Account Settings</h3>
          <p>
            Here you can add other account settings like notification
            preferences, etc.
          </p>

          <button onClick={navigateToChangePassword} className="btn-primary">
            Change Password
          </button>

          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Account;
