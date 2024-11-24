import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Contact.css";
import API_URL from "./config/config";
import Logout from "./Logout"; // Add this import

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState(""); // For showing send status
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Add this line

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const email = localStorage.getItem("email");
    if (email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setStatus("sending");
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/contact/send`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from: userEmail,
          to: "example@proton.me",
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.status === 403) {
        console.log("Unauthorized access, logging out...");
        setIsLoggingOut(true);
        setStatus("error");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormData({ subject: "", message: "" });
      setStatus("success");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  if (isLoggingOut) {
    return <Logout setIsAuthenticated={setIsAuthenticated} />;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="contact-container">
        <div className="contact-card">
          <h2 className="contact-title">Please Log In</h2>
          <p className="login-message">
            You need to be logged in to send messages.
          </p>
          <button onClick={() => navigate("/login")} className="submit-button">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Contact</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Enter subject"
              disabled={status === "sending"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Enter your message"
              disabled={status === "sending"}
            />
          </div>
          <button
            type="submit"
            className={`submit-button ${status}`}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <div className="status-message success">
              Message sent successfully!
            </div>
          )}
          {status === "error" && (
            <div className="status-message error">
              Failed to send message. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
