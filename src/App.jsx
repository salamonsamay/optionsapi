import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import OptionsChain from "./OptionsChain";
import ForgotPassword from "./ForgotPassword";
import Pricing from "./Pricing";
import Contact from "./Contact";
import NavBar from "./NavBar";
import Account from "./account/Account";
import ChangePassword from "./account/ChangePassword";
import Home from "./Home";
import OptionProbabilty from "./OptionProbability";
import Logout from "./Logout";

// Protected Route Component with memo for better performance
const ProtectedRoute = React.memo(({ children, isAuthenticated }) => {
  const location = useLocation();
  return !isAuthenticated ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
});

// Admin Route Component with memo
const AdminRoute = React.memo(({ children, isAuthenticated }) => {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const isAdmin = role === "ROLE_ADMIN";

  return !isAuthenticated || !isAdmin ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
});

// Public Only Route with memo
const PublicOnlyRoute = React.memo(({ children, isAuthenticated }) => {
  const location = useLocation();
  return isAuthenticated ? (
    <Navigate to={location.state?.from?.pathname || "/optionsChain"} replace />
  ) : (
    children
  );
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // Add token validation here
        if (token && token.split(".").length === 3) {
          // Basic JWT structure check
          setIsAuthenticated(true);
          setUserRole(role);
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Consider adding a proper loading component
  }

  return (
    <Router>
      <NavBar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        isAdmin={userRole === "ROLE_ADMIN"}
      />
      <div className="route">
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Public Routes with Auth State */}
          <Route
            path="/optionsChain"
            element={<OptionsChain isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/calculator"
            element={<OptionProbabilty isAuthenticated={isAuthenticated} />}
          />

          {/* Auth Routes */}
          <Route
            path="/contact"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Contact setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute isAuthenticated={isAuthenticated}>
                <Login setIsAuthenticated={setIsAuthenticated} />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/logout"
            element={<Logout setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute isAuthenticated={isAuthenticated}>
                <Register />
              </PublicOnlyRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/account"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/optionsChain" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
