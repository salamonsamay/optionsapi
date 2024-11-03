import React, { useState } from "react";
import "./css/OptionProbability.css"; // Import the CSS file

const calculateCallProbability = (
  stockPrice,
  strikePrice,
  volatility,
  riskFreeRate,
  timeToMaturity,
  steps = 300
) => {
  timeToMaturity = timeToMaturity / 365.0; // Convert days to years
  const sqrtTOverSteps = Math.sqrt(timeToMaturity / steps);
  const expRTOverSteps = Math.exp((riskFreeRate * timeToMaturity) / steps);

  const u = Math.exp(volatility * sqrtTOverSteps);
  const d = 1 / u;
  const pu = (expRTOverSteps - d) / (u - d);
  const pd = 1 - pu;

  const optionValues = Array(steps + 1)
    .fill()
    .map(() => Array(steps + 1).fill(0));
  const probabilities = Array(steps + 1)
    .fill()
    .map(() => Array(steps + 1).fill(0));

  const uPowers = [1.0];
  const dPowers = [1.0];
  for (let i = 1; i <= steps; i++) {
    uPowers[i] = uPowers[i - 1] * u;
    dPowers[i] = dPowers[i - 1] * d;
  }

  for (let j = 0; j <= steps; j++) {
    for (let i = 0; i <= j; i++) {
      const price = stockPrice * uPowers[j - i] * dPowers[i];
      optionValues[j][i] = Math.max(0, price - strikePrice); // Call option payoff
    }
  }

  for (let i = 0; i <= steps; i++) {
    probabilities[steps][i] = optionValues[steps][i] > 0 ? 1.0 : 0.0; // Set probability of terminal nodes
  }

  for (let j = steps - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      probabilities[j][i] =
        (pu * probabilities[j + 1][i] + pd * probabilities[j + 1][i + 1]) *
        expRTOverSteps;
    }
  }

  return probabilities[0][0];
};

const OptionProbability = () => {
  const [inputs, setInputs] = useState({
    stockPrice: "",
    strikePrice: "",
    volatility: "",
    riskFreeRate: "",
    time: "", // Time to expiration in days
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { stockPrice, strikePrice, volatility, riskFreeRate, time } = inputs;
    const probability = calculateCallProbability(
      parseFloat(stockPrice),
      parseFloat(strikePrice),
      parseFloat(volatility),
      parseFloat(riskFreeRate),
      parseFloat(time)
    );
    setResult(probability);
  };

  return (
    <div className="option-probability-container">
      <div className="form-box">
        <h1>Option Probability Calculator</h1>
        <p>Calculate the probability of a call option ending in-the-money.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="stockPrice">Stock Price</label>
            <input
              type="number"
              id="stockPrice"
              name="stockPrice"
              value={inputs.stockPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="strikePrice">Strike Price</label>
            <input
              type="number"
              id="strikePrice"
              name="strikePrice"
              value={inputs.strikePrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="volatility">Volatility</label>
            <input
              type="number"
              step="0.01"
              id="volatility"
              name="volatility"
              value={inputs.volatility}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="riskFreeRate">Risk-Free Rate</label>
            <input
              type="number"
              step="0.01"
              id="riskFreeRate"
              name="riskFreeRate"
              value={inputs.riskFreeRate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time to Expiration (days)</label>
            <input
              type="number"
              id="time"
              name="time"
              value={inputs.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Calculate Probability
          </button>
        </form>
        {result !== null && (
          <div className="result-box">
            <h3>Probability Result:</h3>
            <p>{(result * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionProbability;
