import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Logout.css"; // You'll need to create this CSS file

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      try {
        setIsLoading(true);

        // Optional: Make API call to backend to invalidate token
        // const response = await fetch('/api/logout', {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });

        // Clear all localStorage items
        localStorage.clear();

        // Update authentication state if provided
        if (setIsAuthenticated) {
          setIsAuthenticated(false);
        }

        // Small delay for user feedback
        setTimeout(() => {
          navigate("/login", {
            replace: true,
            state: { message: "Successfully logged out." },
          });
        }, 1000);
      } catch (error) {
        console.error("Logout error:", error);
        setError("An error occurred during logout. Please try again.");

        // Still clear local storage and redirect even if API call fails
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    performLogout();
  }, [navigate, setIsAuthenticated]);

  if (error) {
    return (
      <div className="logout-container">
        <div className="logout-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="logout-container">
        <div className="logout-message">
          <p>Logging out...</p>
          <div className="logout-spinner"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default Logout;
