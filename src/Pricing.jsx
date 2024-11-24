import React, { useState } from "react";
import "./css/Pricing.css";
import API_URL from "./config/config";

const Pricing = () => {
  const currentPlan = localStorage.getItem("subType");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [isRequestingTrial, setIsRequestingTrial] = useState(false);
  const [trialStatus, setTrialStatus] = useState({
    message: "",
    type: "", // 'success', 'error', 'info'
    show: false,
  });

  const plans = [
    {
      name: "Free Plan",
      type: "FREE",
      price: "$0.0/month",
      description:
        "Access to API\n3 API Calls Per 5 Minute\nReal Time Data\nBasic Documentation\nPriority Support",
      buttonText: "Current Plan",
      popular: false,
    },
    {
      name: "Pro Plan",
      type: "PRO",
      price: "$4.99/week",
      description:
        "Access to API\nUnlimited API Calls\nReal Time Data\nInclude Greeks\nSuitable For Algotrade\nEmail Support\nPriority Support",
      buttonText: "Upgrade to Pro",
      popular: true,
      hasFreeTrial: true,
    },
  ];

  const agreementText = `
    Terms and Conditions

    1. Service Agreement
    By subscribing to our service, you agree to the following terms and conditions:
    - The subscription will automatically renew unless cancelled
    - Payment will be charged at the beginning of each billing period
    - Prices are subject to change with notice

    2. Usage Terms
    - API usage is limited based on your subscription plan
    - Abuse or excessive use may result in account suspension
    - You may not share or resell API access

    3. Cancellation Policy
    - You may cancel your subscription at any time
    - Refunds are provided according to our refund policy
    - Cancellation will take effect at the end of the current billing period

    4. Data Usage
    - We collect and process data in accordance with our privacy policy
    - You are responsible for securing your API credentials
    - We may collect usage statistics to improve our service

    5. Service Level Agreement
    - We strive for 99.9% uptime
    - Scheduled maintenance will be announced in advance
    - Support response times vary by subscription level
  `;

  const isButtonEnabled = (planType) => {
    if (!currentPlan) return false;
    if (currentPlan === "FREE" && planType === "PRO") {
      return true;
    }
    return false;
  };

  const getButtonText = (plan) => {
    if (plan.type === currentPlan) {
      return "Current Plan";
    }
    if (plan.type === "PRO" && currentPlan === "FREE") {
      return "Upgrade to Pro";
    }
    return "Not Available";
  };

  const getStatusClassName = (type) => {
    switch (type) {
      case "success":
        return "success-message";
      case "error":
        return "error-message";
      case "info":
        return "info-message";
      default:
        return "";
    }
  };

  const handleFreeTrial = async () => {
    if (!agreementChecked) {
      setTrialStatus({
        message: "Please accept the terms and conditions before proceeding.",
        type: "error",
        show: true,
      });
      setTimeout(
        () => setTrialStatus((prev) => ({ ...prev, show: false })),
        3000
      );
      return;
    }

    setIsRequestingTrial(true);
    setTrialStatus({
      message: "Activating your free trial...",
      type: "info",
      show: true,
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/user/free-trial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.text();

      if (response.status === 403) {
        setTrialStatus({
          message: data || "You have already used your free trial period.",
          type: "error",
          show: true,
        });
        return;
      }

      if (response.status === 500) {
        setTrialStatus({
          message:
            data ||
            "An internal server error occurred. Please try again later.",
          type: "error",
          show: true,
        });
        return;
      }

      if (response.status === 401) {
        setTrialStatus({
          message: "Your session has expired. Please log in again.",
          type: "error",
          show: true,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(data || "Failed to activate free trial");
      }

      // Success case
      setTrialStatus({
        message: "Free trial activated successfully! Updating your plan...",
        type: "success",
        show: true,
      });

      localStorage.setItem("subType", "PRO");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error("Error activating free trial:", error);
      setTrialStatus({
        message:
          error.message ||
          "An error occurred while activating your free trial. Please try again later.",
        type: "error",
        show: true,
      });
    } finally {
      setIsRequestingTrial(false);
      setTimeout(() => {
        if (trialStatus.type !== "success") {
          setTrialStatus((prev) => ({ ...prev, show: false }));
        }
      }, 3000);
    }
  };

  const handlePlanClick = async (planType) => {
    if (planType === currentPlan) {
      return;
    }

    if (!(currentPlan === "FREE" && planType === "PRO")) {
      return;
    }

    if (!agreementChecked) {
      setTrialStatus({
        message: "Please accept the terms and conditions before proceeding.",
        type: "error",
        show: true,
      });
      setTimeout(
        () => setTrialStatus((prev) => ({ ...prev, show: false })),
        3000
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/paypal/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetPlan: planType,
          currentPlan: currentPlan,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      const paypalUrl = await response.text();
      window.open(paypalUrl, "_blank", "width=800,height=600");
    } catch (error) {
      console.error("Error creating payment:", error);
      setTrialStatus({
        message:
          "An error occurred while processing your payment. Please try again later.",
        type: "error",
        show: true,
      });
      setTimeout(
        () => setTrialStatus((prev) => ({ ...prev, show: false })),
        3000
      );
    }
  };

  return (
    <div className="pricing-wrapper">
      <main className="pricing-container">
        <h2 className="pricing-title">Choose the plan that's right for you</h2>

        {trialStatus.show && (
          <div
            className={`status-message ${getStatusClassName(trialStatus.type)}`}
          >
            {trialStatus.message}
          </div>
        )}

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-box ${plan.popular ? "most-popular" : ""} ${
                plan.type === currentPlan ? "current-plan" : ""
              }`}
            >
              {plan.popular && (
                <span className="popular-badge">Most Popular</span>
              )}
              {plan.type === currentPlan && (
                <span className="current-plan-badge">Current Plan</span>
              )}
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <p className="description">
                {plan.description.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <button
                className={`plan-btn ${
                  !isButtonEnabled(plan.type) ? "disabled" : ""
                } ${plan.type === currentPlan ? "current" : ""}`}
                onClick={() => handlePlanClick(plan.type)}
                disabled={!isButtonEnabled(plan.type)}
              >
                {getButtonText(plan)}
              </button>
              {plan.hasFreeTrial && currentPlan === "FREE" && (
                <button
                  className="free-trial-btn"
                  onClick={handleFreeTrial}
                  disabled={isRequestingTrial}
                >
                  {isRequestingTrial ? "Activating..." : "Start Free Trial"}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="agreement-section">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the{" "}
              <button
                className="terms-button"
                onClick={() => setShowAgreement(true)}
              >
                terms and conditions
              </button>
            </label>
          </div>
        </div>

        {showAgreement && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Terms and Conditions</h3>
                <button
                  className="close-button"
                  onClick={() => setShowAgreement(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <pre>{agreementText}</pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pricing;
