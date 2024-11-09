import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./config/config";

const PaypalPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get the JWT token from wherever you store it (localStorage, context, etc.)
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setError("Please login to continue");
        navigate("/login");
        return;
      }

      // Make API call to your backend to create payment
      const response = await axios.post(
        `${API_URL}/api/paypal/payment/create`,
        {}, // empty body as we're not sending data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If successful, response.data should contain the PayPal approval URL
      if (response.data) {
        // Redirect to PayPal
        window.location.href = response.data;
      } else {
        setError("Failed to initiate payment");
      }
    } catch (err) {
      setError(err.response?.data || "Failed to initiate payment process");
      console.error("Payment initiation error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the success URL parameters
  const handlePaymentSuccess = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("status");

    if (paymentStatus === "success") {
      return (
        <div className="text-center p-4 bg-green-100 text-green-700 rounded-md">
          Payment successful! Your subscription has been activated.
        </div>
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Premium Subscription
      </h2>

      <div className="mb-6 text-center">
        <p className="text-gray-600 mb-2">
          Get access to all premium features:
        </p>
        <ul className="text-left list-disc list-inside mb-4">
          <li>Real-time options data</li>
          <li>Advanced analytics</li>
          <li>API access</li>
          <li>Priority support</li>
        </ul>
        <p className="font-bold text-lg mb-4">Price: $10.00 USD</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {handlePaymentSuccess()}

      <button
        onClick={initiatePayment}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Pay with PayPal"
        )}
      </button>

      <p className="mt-4 text-sm text-gray-500 text-center">
        You will be redirected to PayPal to complete your payment
      </p>
    </div>
  );
};

export default PaypalPayment;
