import React, { useState } from "react";
import API_URL from "./config/config";

const PayPalCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePayment = async () => {
    console.log("Starting payment creation process...");
    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending POST request to create PayPal payment...");
      const response = await fetch(`${API_URL}/api/paypal/createPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorizaion: "Barer ${token}",
        },
      });

      console.log("Received response from server, processing data...");
      const data = await response.json();

      if (!response.ok) {
        console.error("Error response from server:", data);
        throw new Error(data.error || "Error creating PayPal payment");
      }

      // Redirect to PayPal
      if (data.approvalUrl) {
        console.log(
          "Approval URL received, redirecting to PayPal:",
          data.approvalUrl
        );
        window.location.href = data.approvalUrl;
      } else {
        console.error("No approval URL received in response.");
        throw new Error("No approval URL received");
      }
    } catch (error) {
      console.error("Payment creation error:", error);
      setError(error.message);
    } finally {
      console.log("Payment creation process finished.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="text-red-500 bg-red-100 p-3 rounded-md">{error}</div>
      )}

      <button
        onClick={handleCreatePayment}
        disabled={isLoading}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Pay with PayPal"}
      </button>
    </div>
  );
};

export default PayPalCheckout;
