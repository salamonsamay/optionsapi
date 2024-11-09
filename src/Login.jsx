import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import API_URL from "./config/config"; // Importing the API_URL

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("apiKey", data.apiKey);
        localStorage.setItem("email", data.email);
        localStorage.setItem("subType", data.subType);

        setIsAuthenticated(true);
        navigate("/optionsChain");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="left-side">
        <div className="image-container">
          <img
            src="https://media.istockphoto.com/id/500619016/photo/stock-data-concept.jpg?s=1024x1024&w=is&k=20&c=mYILqJma4VmXMNvp_ULBUHJUweIs0A--_jYSx2wgIPM=&p=1" // Using your image URL
            //    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStG9p4SV7a_2lvRCzFgCkf5H5kIndpFPCYIg&s" // Using your image URL
            alt="Background"
            className="background-image"
          />
        </div>
      </div>
      <div className="right-side">
        <div className="login-box">
          <h2>Nice to see you again</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email or phone number</label>
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
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="btn-primary">
              Sign in
            </button>
          </form>
          <div className="social-login">
            <button className="btn-google">Or sign in with Google</button>
          </div>
          <div className="sign-up">
            <p>
              Don't have an account? <a href="/register">Sign up now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
