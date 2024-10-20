import React, { useState } from "react";
import "./css/OptionProbability.css"; // Import the CSS file

const calculateCallProbability = (
  stockPrice,
  strikePrice,
  volatility,
  riskFreeRate,
  timeToMaturity,
  steps
) => {
  steps = 300;
  timeToMaturity = timeToMaturity / 365.0;
  const sqrtTOverSteps = Math.sqrt(timeToMaturity / steps);
  const expRTOverSteps = Math.exp((riskFreeRate * timeToMaturity) / steps);

  // Precompute u and d
  const u = Math.exp(volatility * sqrtTOverSteps);
  const d = 1 / u;
  const pu = (expRTOverSteps - d) / (u - d);
  const pd = 1 - pu;

  // Construct the tree and calculate option values
  const optionValues = Array(steps + 1)
    .fill()
    .map(() => Array(steps + 1).fill(0));
  const probabilities = Array(steps + 1)
    .fill()
    .map(() => Array(steps + 1).fill(0));

  // Precompute powers of u and d
  const uPowers = [1.0];
  const dPowers = [1.0];
  for (let i = 1; i <= steps; i++) {
    uPowers[i] = uPowers[i - 1] * u;
    dPowers[i] = dPowers[i - 1] * d;
  }

  // Calculate option values
  for (let j = 0; j <= steps; j++) {
    for (let i = 0; i <= j; i++) {
      const price = stockPrice * uPowers[j - i] * dPowers[i];
      optionValues[j][i] = Math.max(0, price - strikePrice); // Call option payoff
    }
  }

  // Backward induction to calculate probabilities
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

  if (probabilities[0][0] <= 0) {
    return Number.MIN_VALUE;
  }
  if (probabilities[0][0] >= 1) {
    return 1 - Number.MIN_VALUE;
  }
  // Calculate overall probability of being in the money
  return probabilities[0][0];
};

const calculator = (
  stockPrice,
  strikePrice,
  iv,
  strikePrice2,
  iv2,
  riskFreeRate,
  time
) => {
  const r = calculateCallProbability(
    stockPrice,
    strikePrice,
    iv,
    riskFreeRate,
    time,
    700
  );
  const r2 = calculateCallProbability(
    stockPrice,
    strikePrice2,
    iv2,
    riskFreeRate,
    time,
    700
  );
  return {
    probabilityBelow: 1 - r,
    probabilityAbove: r2,
    probabilityBetween: 1 - (r2 + (1 - r)),
  };
};

const OptionProbability = () => {
  const [inputs, setInputs] = useState({
    stockPrice: 0,
    strikePrice: 0,
    iv: 0,
    strikePrice2: 0,
    iv2: 0,
    riskFreeRate: 0,
    time: 0,
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculator(
      inputs.stockPrice,
      inputs.strikePrice,
      inputs.iv,
      inputs.strikePrice2,
      inputs.iv2,
      inputs.riskFreeRate,
      inputs.time
    );
    setResults(result);
  };

  return (
    <div className="option-probability">
      <h2>Option Probability Calculator</h2>
      <form onSubmit={handleSubmit} className="probability-form">
        {Object.keys(inputs).map((key) => (
          <div key={key} className="input-group">
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={inputs[key]}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
        ))}
        <button type="submit" className="calculate-button">
          Calculate
        </button>
      </form>
      {results && (
        <div className="results">
          <h3>Results:</h3>
          <p>Probability Below: {results.probabilityBelow.toFixed(4)}</p>
          <p>Probability Above: {results.probabilityAbove.toFixed(4)}</p>
          <p>Probability Between: {results.probabilityBetween.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default OptionProbability;
