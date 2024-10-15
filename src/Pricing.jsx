import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Pricing.css";

const PricingTier = ({
  tier,
  price,
  features,
  highlighted,
  onSignUp,
  isCurrentPlan,
}) => (
  <div className={`pricing-tier ${highlighted ? "highlighted" : ""}`}>
    <h2 className="tier-name">{tier}</h2>
    <p className="tier-description">Great for {features[0].toLowerCase()}</p>
    <p className="tier-price">
      ${price}
      <span>/month</span>
    </p>
    {isCurrentPlan ? (
      <button
        className={`signup-button ${highlighted ? "primary" : "secondary"}`}
        disabled
      >
        Current Plan
      </button>
    ) : (
      <button
        className={`signup-button ${highlighted ? "primary" : "secondary"}`}
        onClick={onSignUp}
      >
        Sign up
      </button>
    )}
    <ul className="feature-list">
      {features.map((feature, index) => {
        const featureContent =
          feature.includes("Real-time Data") ||
          feature.includes("Unlimited API Calls") ? (
            <strong>{feature}</strong>
          ) : (
            feature
          );

        return (
          <li key={index} className="feature-item">
            <svg
              className="feature-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {featureContent}
          </li>
        );
      })}
    </ul>
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();
  const isSubscribed = localStorage.getItem("isSubscribed") === "true";
  const currentPlan = isSubscribed ? "Advanced" : "Basic"; // Assuming "Advanced" is the subscribed plan

  const handleSignUp = (tier) => {
    if (tier === "Advanced" && !isSubscribed) {
      navigate("/paypal-checkout");
    }
  };

  const tiers = [
    {
      tier: "Basic",
      price: 0,
      features: [
        "Great for real-time data",
        "All US Options Tickers",
        "10 API Calls per Minute",
        "Real-time Data",
        "Technical Indicators",
        "Greeks, IV, & Open Interest",
        "Snapshot",
      ],
    },
    {
      tier: "Advanced",
      price: 10,
      features: [
        "Great for real-time data",
        "All US Options Tickers",
        "Unlimited API Calls",
        "Real-time Data",
        "Technical Indicators",
        "Greeks, IV, & Open Interest",
        "Snapshot",
      ],
      highlighted: true,
    },
  ];

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h2 className="pricing-title">Pricing</h2>
        <p className="pricing-subtitle">Choose the plan that's right for you</p>
      </div>
      <div className="pricing-grid">
        {tiers.map((tier, index) => (
          <PricingTier
            key={index}
            {...tier}
            onSignUp={() => handleSignUp(tier.tier)}
            isCurrentPlan={tier.tier === currentPlan}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
