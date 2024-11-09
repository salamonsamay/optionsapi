import React, { useState, useEffect } from "react";
import "./css/OptionsChain.css";
import { useNavigate } from "react-router-dom"; // Ensure this line is present
import API_URL from "./config/config";

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

const OptionsChainDocumentation = () => {
  return (
    <div>
      <div className="documentation">
        <h4>Response Attributes</h4>
        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                attribute: "next_url",
                type: "string",
                description:
                  "If present, this value can be used to fetch the next page of data.",
              },
              {
                attribute: "request_id*",
                type: "string",
                description: "Unique identifier for the request.",
              },
              {
                attribute: "results",
                type: "array",
                description:
                  "The array of option contracts returned in the response.",
              },
              {
                attribute: "break_even_price*",
                type: "number",
                description:
                  "The price of the underlying asset for the contract to break even.",
              },
              {
                attribute: "day",
                type: "object",
                description: "The most recent daily bar for this contract.",
              },
              {
                attribute: "change*",
                type: "number",
                description:
                  "The value of the price change for the contract from the previous trading day.",
              },
              {
                attribute: "change_percent*",
                type: "number",
                description:
                  "The percent of the price change for the contract from the previous trading day.",
              },
              {
                attribute: "close*",
                type: "number",
                description: "The closing price for the contract of the day.",
              },
              {
                attribute: "high*",
                type: "number",
                description: "The highest price for the contract of the day.",
              },
              {
                attribute: "last_updated*",
                type: "integer",
                description:
                  "The nanosecond timestamp of when this information was updated.",
              },
              {
                attribute: "low*",
                type: "number",
                description: "The lowest price for the contract of the day.",
              },
              {
                attribute: "open*",
                type: "number",
                description: "The open price for the contract of the day.",
              },
              {
                attribute: "previous_close*",
                type: "number",
                description:
                  "The closing price for the contract of the previous trading day.",
              },
              {
                attribute: "volume*",
                type: "number",
                description: "The trading volume for the contract of the day.",
              },
              {
                attribute: "vwap*",
                type: "number",
                description:
                  "The trading volume weighted average price for the contract of the day.",
              },
              {
                attribute: "details",
                type: "object",
                description: "The details for this contract.",
              },
              {
                attribute: "contract_type*",
                type: "enum [put, call, other]",
                description:
                  'The type of contract. Can be "put", "call", or in some rare cases, "other".',
              },
              {
                attribute: "exercise_style*",
                type: "enum [american, european, bermudan]",
                description: "The exercise style of this contract.",
              },
              {
                attribute: "expiration_date*",
                type: "string",
                description:
                  "The contract's expiration date in YYYY-MM-DD format.",
              },
              {
                attribute: "shares_per_contract*",
                type: "number",
                description:
                  "The number of shares per contract for this contract.",
              },
              {
                attribute: "strike_price*",
                type: "number",
                description: "The strike price of the option contract.",
              },
              {
                attribute: "ticker*",
                type: "string",
                description: "The ticker symbol for the asset.",
              },
              {
                attribute: "fmv",
                type: "number",
                description:
                  "Fair market value is only available on Business plans.",
              },
              {
                attribute: "greeks",
                type: "object",
                description: "The greeks for this contract.",
              },
              {
                attribute: "delta*",
                type: "number",
                description:
                  "The change in the option's price per $0.01 increment in the price of the underlying asset.",
              },
              {
                attribute: "gamma*",
                type: "number",
                description:
                  "The change in delta per $0.01 change in the price of the underlying asset.",
              },
              {
                attribute: "theta*",
                type: "number",
                description: "The change in the option's price per day.",
              },
              {
                attribute: "vega*",
                type: "number",
                description:
                  "The change in the option's price per 1% increment in volatility.",
              },
              {
                attribute: "implied_volatility",
                type: "number",
                description:
                  "The market's forecast for the volatility of the underlying asset.",
              },
              {
                attribute: "last_quote",
                type: "object",
                description: "The most recent quote for this contract.",
              },
              {
                attribute: "ask*",
                type: "number",
                description: "The ask price.",
              },
              {
                attribute: "ask_exchange",
                type: "number",
                description: "The ask side exchange ID.",
              },
              {
                attribute: "ask_size*",
                type: "number",
                description: "The ask size.",
              },
              {
                attribute: "bid*",
                type: "number",
                description: "The bid price.",
              },
              {
                attribute: "bid_exchange",
                type: "number",
                description: "The bid side exchange ID.",
              },
              {
                attribute: "bid_size*",
                type: "number",
                description: "The bid size.",
              },
              {
                attribute: "midpoint*",
                type: "number",
                description: "The average of the bid and ask price.",
              },
              {
                attribute: "timeframe*",
                type: "enum [DELAYED, REAL-TIME]",
                description: "The time relevance of the data.",
              },
              {
                attribute: "last_trade",
                type: "object",
                description: "The most recent trade for this contract.",
              },
              {
                attribute: "conditions",
                type: "array [integer]",
                description: "A list of condition codes.",
              },
              {
                attribute: "exchange*",
                type: "integer",
                description: "The exchange ID.",
              },
              {
                attribute: "price*",
                type: "number",
                description: "The price of the trade.",
              },
              {
                attribute: "sip_timestamp*",
                type: "integer",
                description:
                  "The timestamp of when the SIP received this trade from the exchange.",
              },
              {
                attribute: "size*",
                type: "integer",
                description: "The size of a trade.",
              },
              {
                attribute: "open_interest*",
                type: "number",
                description:
                  "The quantity of this contract held at the end of the last trading day.",
              },
              {
                attribute: "underlying_asset",
                type: "object",
                description: "The underlying asset for the options contract.",
              },
              {
                attribute: "underlying_asset_symbol*",
                type: "string",
                description: "The ticker symbol of the underlying asset.",
              },
              {
                attribute: "underlying_security_id*",
                type: "integer",
                description:
                  "The unique identifier for the underlying security.",
              },
              {
                attribute: "quote_time*",
                type: "integer",
                description: "The time when the last quote was received.",
              },
              {
                attribute: "trade_time*",
                type: "integer",
                description: "The time when the last trade was executed.",
              },
            ].map(({ attribute, type, description }) => (
              <tr key={attribute}>
                <td>{attribute}</td>
                <td>{type}</td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>* - indicates required attributes.</p>
      </div>
    </div>
  );
};

const OptionsChain = () => {
  const navigate = useNavigate();

  // Handle button click to go to the PayPal checkout page
  const handleProceedToPayPal = async () => {
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem("token");

      // Make API call to your backend
      const response = await fetch(`${API_URL}/api/paypal/payment/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create PayPal payment");
      }

      // Get the PayPal URL from the response
      const paypalUrl = await response.text();

      // Open PayPal in new window
      window.open(paypalUrl, "_blank");
    } catch (error) {
      console.error("Payment creation error:", error);
      alert("Failed to initiate PayPal payment. Please try again.");
    }
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

    return `${API_URL}/optionsChain?${queryParams.join("&")}`;
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
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="250">Max (it's may slower )</option>
        </select>
        <small>Specify the maximum number of results to return.</small>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={queryResult}
      />

      <button className="run-query-btn" onClick={handleRunQuery}>
        Run Query
      </button>

      {/* <button onClick={handleProceedToPayPal}>Proceed to PayPal</button> */}

      {/* Render the Modal */}

      {/* <OptionsChainDocumentation /> */}
    </div>
  );
};

export default OptionsChain;
