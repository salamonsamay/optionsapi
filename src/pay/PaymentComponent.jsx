import React from "react";
import GooglePayButton from "@google-pay/button-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Payment component
const PaymentComponent = () => {
  const onLoadPaymentData = (paymentData) => {
    // Handle successful Google Pay payment here
    console.log("Google Pay Payment data: ", paymentData);
    // Send payment data to your backend server for processing
  };

  const handlePayPalSuccess = (details) => {
    console.log(
      "PayPal transaction completed by " + details.payer.name.given_name
    );
    // Send transaction details to your backend server for processing
  };

  const handleApplePay = async () => {
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
      const paymentRequest = {
        countryCode: "US",
        currencyCode: "USD",
        total: {
          label: "Example Merchant",
          amount: "10.00",
        },
        supportedNetworks: ["visa", "masterCard", "amex"],
        merchantCapabilities: ["capability3DS"],
      };

      const session = new ApplePaySession(1, paymentRequest);

      session.onvalidatemerchant = async (event) => {
        // Call your server to validate the merchant
        const response = await fetch("/api/applepay/validate-merchant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ validationURL: event.validationURL }),
        });
        const merchantSession = await response.json();
        session.completeMerchantValidation(merchantSession);
      };

      session.onpaymentauthorized = (event) => {
        // Process the payment with your backend
        console.log("Payment Authorized: ", event.payment);
        session.completePayment(ApplePaySession.STATUS_SUCCESS); // or STATUS_FAILURE based on your processing
        // You can send event.payment to your server for further processing
      };

      session.begin();
    } else {
      alert("Apple Pay is not available on this device.");
    }
  };

  return (
    <div>
      <h1>Payment Integration</h1>

      {/* Google Pay Button */}
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

      {/* Apple Pay Button */}
      <div>
        <button onClick={handleApplePay}>Apple Pay</button>
      </div>

      {/* PayPal Button */}
      <PayPalScriptProvider options={{ "client-id": "your-client-id" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // The total amount to charge
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            handlePayPalSuccess(details);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentComponent;
