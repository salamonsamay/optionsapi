import React from "react";
import "./css/Pricing.css";
import API_URL from "./config/config";

const Pricing = () => {
  const currentPlan = localStorage.getItem("subType");

  const plans = [
    {
      name: "Free Plan",
      type: "FREE",
      price: "$0.0/month",
      description:
        "Access to API\n10 API Calls per Minute\nReal Time Data\nBasic Documentation\nPriority Support",
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
    },
    {
      name: "Advanced Plan",
      type: "ADVANCED",
      price: "$29.99/week",
      description:
        "Access to API\nUnlimited API Calls\nEmail and Phone Support\nPremium Documentation\nDedicated Support",
      buttonText: "Upgrade to Advanced",
      popular: false,
    },
  ];

  const isButtonEnabled = (planType) => {
    switch (currentPlan) {
      case "FREE":
        return planType === "PRO" || planType === "ADVANCED";
      case "PRO":
        return planType === "FREE" || planType === "ADVANCED";
      case "ADVANCED":
        return planType === "FREE" || planType === "PRO";
      default:
        return true;
    }
  };

  const getButtonText = (plan) => {
    if (plan.type === currentPlan) {
      return "Current Plan";
    }
    if (currentPlan === "PRO" && plan.type === "FREE") {
      return "Downgrade to Free";
    }
    if (currentPlan === "ADVANCED") {
      return plan.type === "FREE" ? "Downgrade to Free" : "Downgrade to Pro";
    }
    return plan.buttonText;
  };

  const handlePlanClick = async (planType) => {
    // Don't do anything if clicking current plan
    if (planType === currentPlan) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/paypal/payment/create`, {
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
      console.log("PayPal URL:", paypalUrl);
      window.open(paypalUrl, "_blank", "width=800,height=600");
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  return (
    <div className="pricing-wrapper">
      <main className="pricing-container">
        <h2 className="pricing-title">Choose the plan that's right for you</h2>
        <div className="toggle-buttons">
          <button className="toggle-btn">Yearly -20%</button>
          <button className="toggle-btn">Monthly</button>
        </div>
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pricing;
