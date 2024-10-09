import React, { useState, useEffect } from "react";
import "./css/OptionsChain.css";
import { useNavigate } from "react-router-dom"; // Ensure this line is present

// Modal component remains unchanged
const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Query Result</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const OptionsChain = () => {
  const navigate = useNavigate();

  // Handle button click to go to the PayPal checkout page
  const handleProceedToPayPal = () => {
    navigate("/paypal-checkout");
  };

  const token = localStorage.getItem("token");

  const [symbol, setSymbol] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [startExpirationDate, setStartExpirationDate] = useState("");
  const [endExpirationDate, setEndExpirationDate] = useState("");
  const [contractType, setContractType] = useState("");
  const [order, setOrder] = useState("");
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || ""); // Set default API key from localStorage
  const [queryResult, setQueryResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryUrl, setQueryUrl] = useState("");

  // Effect to build the query URL whenever relevant state variables change
  useEffect(() => {
    const url = buildQueryUrl();
    setQueryUrl(url);
  }, [
    symbol,
    strikePrice,
    startExpirationDate,
    endExpirationDate,
    contractType,
    order,
    limit,
    sort,
    apiKey,
  ]);

  const handleRunQuery = async () => {
    try {
      console.log("Query URL: ", queryUrl);

      const response = await fetch(queryUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("token in optionsChain " + token);

      const data = await response.json();
      setQueryResult(data);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error running query:", error);
      setQueryResult(null); // Clear the result on error
    }
  };

  // Function to build query URL with non-empty fields only
  const buildQueryUrl = () => {
    let queryParams = [];

    if (symbol) queryParams.push(`symbol=${symbol}`);
    if (strikePrice) queryParams.push(`strike_price=${strikePrice}`);
    if (startExpirationDate)
      queryParams.push(`start_expiration_date=${startExpirationDate}`);
    if (endExpirationDate)
      queryParams.push(`end_expiration_date=${endExpirationDate}`);
    if (contractType) queryParams.push(`contract_type=${contractType}`);
    if (order) queryParams.push(`order=${order}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (sort) queryParams.push(`sort=${sort}`);
    if (apiKey) queryParams.push(`apiKey=${apiKey}`);

    return `http://localhost:8080/optionsChain?${queryParams.join("&")}`;
  };

  // Function to copy the URL to the clipboard
  const handleCopyUrl = () => {
    if (queryUrl) {
      navigator.clipboard
        .writeText(queryUrl)
        .then(() => {
          alert("URL copied to clipboard!"); // Feedback to the user
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="options-chain-container">
      <h2>Options Chain</h2>
      <p>Get the snapshot of all options contracts for an underlying ticker.</p>

      {/* Form Fields */}
      <div className="form-group">
        <label>Symbol*</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter symbol"
        />
        <small>Enter the stock ticker symbol (e.g., AAPL for Apple).</small>
      </div>

      <div className="form-group">
        <label>Strike Price</label>
        <input
          type="text"
          value={strikePrice}
          onChange={(e) => setStrikePrice(e.target.value)}
          placeholder="Enter strike price"
        />
        <small>Enter the strike price for the options contract.</small>
      </div>

      <div className="form-group">
        <label>Start Expiration Date</label>
        <input
          type="date"
          value={startExpirationDate}
          onChange={(e) => setStartExpirationDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
        <small>Select the start date for the expiration range.</small>
      </div>

      <div className="form-group">
        <label>End Expiration Date</label>
        <input
          type="date"
          value={endExpirationDate}
          onChange={(e) => setEndExpirationDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
        <small>Select the end date for the expiration range.</small>
      </div>

      <div className="form-group">
        <label>Contract Type</label>
        <select
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
        >
          <option value="">Select contract type</option>
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
        <small>Select the type of option contract (Call or Put).</small>
      </div>

      <div className="form-group">
        <label>Order</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="">Select order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <small>Choose the order in which to display results.</small>
      </div>

      <div className="form-group">
        <label>Limit</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          min="1"
          max="250"
        />
        <small>Specify the maximum number of results to return (1-250).</small>
      </div>

      <div className="form-group">
        <label>Sort</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Select sort field</option>
          <option value="strike_price">Strike Price</option>
          <option value="expiration_date">Expiration Date</option>
        </select>
        <small>Select the field by which to sort the results.</small>
      </div>

      <div className="form-group">
        <label>API Key*</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API key"
        />
        <small>Enter your API key for authentication.</small>
      </div>

      {/* Display the query URL with copy button */}
      {queryUrl && (
        <div className="query-url">
          <h4>Request URL:</h4>
          <h5>{queryUrl}</h5>
          <button className="copy-url-btn" onClick={handleCopyUrl}>
            Copy URL
          </button>
        </div>
      )}

      <button className="run-query-btn" onClick={handleRunQuery}>
        Run Query
      </button>

      <button onClick={handleProceedToPayPal}>Proceed to PayPal</button>

      {/* Render the Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={queryResult}
      />
    </div>
  );
};

export default OptionsChain;
