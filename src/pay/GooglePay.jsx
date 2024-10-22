import React from "react";
import GooglePayButton from "@google-pay/button-react";

const GooglePay = () => {
  const onLoadPaymentData = (paymentData) => {
    // Handle successful payment here
    console.log("Payment data: ", paymentData);
    // Send payment data to your backend server for processing
  };

  return (
    <div>
      <h1>Google Pay Integration</h1>
      <GooglePayButton
        environment="TEST" // Change to "PRODUCTION" in production
        buttonColor="black"
        buttonType="short"
        onLoadPaymentData={onLoadPaymentData}
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example", // Replace with your payment gateway
                  merchantId: "your-merchant-id", // Your Google Merchant ID
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "your-merchant-id",
            merchantName: "Example Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: "10.00", // The total amount to charge
            currencyCode: "USD", // Currency code
            countryCode: "US",
          },
        }}
      />
    </div>
  );
};

export default GooglePay;
