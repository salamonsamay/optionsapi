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

// Protected Route Component for fully protected routes
const ProtectedRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const isAdmin = role === "ROLE_ADMIN";

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public Only Route (for login/register)
const PublicOnlyRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Navigate
        to={location.state?.from?.pathname || "/optionsChain"}
        replace
      />
    );
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const apiKey = localStorage.getItem("apiKey");

        if (token) {
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
    return <div>Loading...</div>;
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Make OptionsChain and Calculator public but pass isAuthenticated prop */}
          <Route
            path="/optionsChain"
            element={<OptionsChain isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/calculator"
            element={<OptionProbabilty isAuthenticated={isAuthenticated} />}
          />

          {/* Authentication Routes */}
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

          {/* Admin Routes */}
          {/* <Route
            path="/admin/*"
            element={
              <AdminRoute isAuthenticated={isAuthenticated}>
                <AdminLayout />
              </AdminRoute>
            }
          /> */}

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
