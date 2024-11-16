import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/config";
import "./../css/Account.css";
import Logout from "../Logout"; // Import Logout component

const Account = ({ setIsAuthenticated }) => {
  const [details, setDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_URL}/user/data`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setDetails(data);
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
    setIsLoggingOut(true); // Trigger logout
  };

  const navigateToChangePassword = () => {
    navigate("/change-password");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Render Logout component if isLoggingOut is true
  if (isLoggingOut) {
    return <Logout setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="account-container">
      <h2>Account Information</h2>

      {details ? (
        <>
          <div className="user-info">
            <p>
              <strong>Email:</strong> <span>{details.email}</span>
            </p>
            <p>
              <strong>API Key:</strong> <span>{details.apiKey}</span>
            </p>
            <p>
              <strong>Is Enabled:</strong>{" "}
              <span>{details.enabled ? "Yes" : "No"}</span>
            </p>

            {/* Subscription Details */}
            <div className="subscription-info">
              <h3>Subscription Details</h3>
              {details.subscription ? (
                <>
                  <p>
                    <strong>Type:</strong>{" "}
                    <span>{details.subscription.type}</span>
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    <span>{formatDate(details.subscription.startDate)}</span>
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    <span>{formatDate(details.subscription.endDate)}</span>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span>
                      {details.subscription.active ? "Active" : "Inactive"}
                    </span>
                  </p>
                </>
              ) : (
                <p>No active subscription</p>
              )}
            </div>
          </div>

          <h3>Account Settings</h3>
          <p>
            Here you can add other account settings like notification
            preferences, etc.
          </p>

          <div className="account-actions">
            <button onClick={navigateToChangePassword} className="btn-primary">
              Change Password
            </button>

            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </>
      ) : (
        <p>Loading user information...</p>
      )}

      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default Account;
