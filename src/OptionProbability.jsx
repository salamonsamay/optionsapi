import React, { useState } from "react";
import "./css/OptionProbability.css";

const calculateProbabilities = (
  stockPrice,
  lowerStrike,
  upperStrike,
  lowerVolatility,
  upperVolatility,
  riskFreeRate,
  timeToMaturity,
  steps = 300
) => {
  timeToMaturity = timeToMaturity / 365.0;
  const avgVolatility = (lowerVolatility + upperVolatility) / 2;
  const sqrtTOverSteps = Math.sqrt(timeToMaturity / steps);
  const expRTOverSteps = Math.exp((riskFreeRate * timeToMaturity) / steps);

  const u = Math.exp(avgVolatility * sqrtTOverSteps);
  const d = 1 / u;
  const pu = (expRTOverSteps - d) / (u - d);
  const pd = 1 - pu;

  const priceTree = Array(steps + 1)
    .fill()
    .map(() => Array(steps + 1).fill(0));

  const probTree = Array(steps + 1)
    .fill()
    .map(() => Array(steps + 1).fill(0));

  // Initialize probability at root
  probTree[0][0] = 1.0;

  // Forward calculation of probabilities and prices
  for (let j = 0; j < steps; j++) {
    for (let i = 0; i <= j; i++) {
      probTree[j + 1][i] += probTree[j][i] * pu;
      probTree[j + 1][i + 1] += probTree[j][i] * pd;
    }
  }

  // Calculate final stock prices and count outcomes
  let aboveUpper = 0;
  let belowLower = 0;
  let between = 0;

  for (let i = 0; i <= steps; i++) {
    const upMoves = steps - i;
    const downMoves = i;
    const finalPrice =
      stockPrice * Math.pow(u, upMoves) * Math.pow(d, downMoves);
    const pathProb = probTree[steps][i];

    if (finalPrice > upperStrike) {
      aboveUpper += pathProb;
    } else if (finalPrice < lowerStrike) {
      belowLower += pathProb;
    } else {
      between += pathProb;
    }
  }

  return {
    aboveUpper,
    belowLower,
    between,
  };
};

const OptionProbability = () => {
  // ... rest of the component remains the same ...
  const [inputs, setInputs] = useState({
    stockPrice: "",
    lowerStrike: "",
    upperStrike: "",
    lowerVolatility: "",
    upperVolatility: "",
    riskFreeRate: "",
    time: "",
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
    const probability = calculateProbabilities(
      parseFloat(inputs.stockPrice),
      parseFloat(inputs.lowerStrike),
      parseFloat(inputs.upperStrike),
      parseFloat(inputs.lowerVolatility),
      parseFloat(inputs.upperVolatility),
      parseFloat(inputs.riskFreeRate),
      parseFloat(inputs.time)
    );
    setResult(probability);
  };

  return (
    <div className="option-probability-container">
      <div className="form-box">
        <h1>Option Probability Calculator</h1>
        <p>
          Calculate probabilities between two strikes with different
          volatilities.
        </p>
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
            <label htmlFor="lowerStrike">Lower Strike Price</label>
            <input
              type="number"
              id="lowerStrike"
              name="lowerStrike"
              value={inputs.lowerStrike}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="upperStrike">Upper Strike Price</label>
            <input
              type="number"
              id="upperStrike"
              name="upperStrike"
              value={inputs.upperStrike}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lowerVolatility">Lower Strike IV</label>
            <input
              type="number"
              step="0.01"
              id="lowerVolatility"
              name="lowerVolatility"
              value={inputs.lowerVolatility}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="upperVolatility">Upper Strike IV</label>
            <input
              type="number"
              step="0.01"
              id="upperVolatility"
              name="upperVolatility"
              value={inputs.upperVolatility}
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
            Calculate Probabilities
          </button>
        </form>
        {result !== null && (
          <div className="result-box">
            <h3>Probability Results:</h3>
            <p>Above Upper Strike: {(result.aboveUpper * 100).toFixed(2)}%</p>
            <p>Below Lower Strike: {(result.belowLower * 100).toFixed(2)}%</p>
            <p>Between Strikes: {(result.between * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionProbability;
