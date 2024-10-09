import React, { useEffect, useRef } from "react";

const PayPalCheckout = () => {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // Set the amount to 10 USD
                    currency_code: "USD",
                  },
                  description: "Payment for your order",
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order.capture();
              console.log(
                "Transaction completed by:",
                details.payer.name.given_name
              );

              const orderId = data.orderID;
              const payerId = data.payerID;

              console.log("orderId:", orderId);
              console.log("payerId:", payerId);

              const token = localStorage.getItem("token");

              if (!token) {
                throw new Error("Token not found. Please log in.");
              }

              const response = await fetch(
                "http://localhost:8080/api/paypal/payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    orderId: orderId,
                    payerId: payerId,
                  }),
                }
              );

              if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Failed to verify payment: ${errorDetails}`);
              }

              const result = await response.json();
              console.log("Transaction verified by server:", result);
            } catch (error) {
              console.error("Error processing payment:", error.message);
              alert(`Error: ${error.message}`);
            }
          },
        })
        .render(paypalRef.current);
    }
  }, []);

  return <div ref={paypalRef}></div>;
};

export default PayPalCheckout;
