import React from 'react';
import './css/Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic Plan',
      price: '$49.00/month',
      description: 'Access to API\n10 API Calls per Minute\nEmail Support\nBasic Documentation\nPriority Support',
      buttonText: 'Start Plan',
      popular: false,
    },
    {
      name: 'Standard Plan',
      price: '$99.00/month',
      description: 'Access to API\nUnlimited API Calls\nEmail Support\nPremium Documentation\nPriority Support',
      buttonText: 'Start Plan',
      popular: true,
    },
    {
      name: 'Advanced Plan',
      price: '$149.00/month',
      description: 'Access to API\nUnlimited API Calls\nEmail and Phone Support\nPremium Documentation\nDedicated Support',
      buttonText: 'Start Plan',
      popular: false,
    },
  ];

  return (
    <main
      className="pricing-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        width: '100%',
        margin: 'auto',
        minHeight: '100vh',
      }}
    >
      <h2 className="pricing-title">Choose the plan that's right for you</h2>
      <div className="toggle-buttons">
        <button className="toggle-btn">Yearly -20%</button>
        <button className="toggle-btn">Monthly</button>
      </div>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`plan-box ${plan.popular ? 'most-popular' : ''}`}>
            {plan.popular && <span className="popular-badge">Most Popular</span>}
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <p className="description">
              {plan.description.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <button className="plan-btn">{plan.buttonText}</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Pricing;
