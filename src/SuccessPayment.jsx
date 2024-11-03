// SuccessPayment.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import API_URL from "./config/config"; // Adjust the import path accordingly

const SuccessPayment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("paymentId");
  const payerId = searchParams.get("PayerID");

  useEffect(() => {
    const verifyPayment = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${API_URL}/api/paypal/success?paymentId=${paymentId}&PayerID=${payerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error verifying PayPal payment");
        }

        const result = await response.text();
        console.log("Payment verification result:", result);
        alert(result);
      } catch (error) {
        console.error("Payment verification error:", error);
        alert("There was an issue verifying the payment. Please try again.");
      }
    };

    if (paymentId && payerId) {
      verifyPayment();
    }
  }, [paymentId, payerId]);

  return <div>Payment Success. Check the console for details.</div>;
};

export default SuccessPayment;
