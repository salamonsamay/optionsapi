import React, { useState, useEffect } from "react";
import "./css/OptionsChain.css";
import API_URL from "./config/config";

const ALLOWED_SYMBOLS = [
  "A",
  "AAPL",
  "ABBV",
  "ABMD",
  "ABT",
  "ABNB",
  "ACWI",
  "ACWX",
  "ACN",
  "ADBE",
  "ADM",
  "ADP",
  "AEE",
  "AEP",
  "AES",
  "AFL",
  "AGG",
  "AIG",
  "AIZ",
  "ALB",
  "ALK",
  "AMAT",
  "AMD",
  "AMGN",
  "AME",
  "AMZN",
  "ANSS",
  "APD",
  "APH",
  "ATO",
  "ATVI",
  "AVB",
  "AVGO",
  "AXP",
  "AZN",
  "AZO",
  "BA",
  "BABA",
  "BAC",
  "BDX",
  "BF.B",
  "BILI",
  "BIIB",
  "BIO",
  "BKR",
  "BLK",
  "BND",
  "BNDX",
  "BP",
  "BRK.B",
  "BSV",
  "BSX",
  "BWA",
  "BXP",
  "C",
  "CAG",
  "CAT",
  "CB",
  "CCL",
  "CDW",
  "CE",
  "CERN",
  "CFG",
  "CHD",
  "CHRW",
  "CI",
  "CINF",
  "CL",
  "CLX",
  "CME",
  "CMI",
  "CMS",
  "CNP",
  "COIN",
  "COF",
  "COO",
  "COP",
  "COST",
  "CPRT",
  "CPT",
  "CRL",
  "CRM",
  "CRWD",
  "CSCO",
  "CSX",
  "CTAS",
  "CTLT",
  "CTSH",
  "CTVA",
  "CVS",
  "CVX",
  "CZR",
  "D",
  "DAL",
  "DASH",
  "DBX",
  "DD",
  "DDOG",
  "DE",
  "DFS",
  "DG",
  "DGRO",
  "DGX",
  "DHI",
  "DHR",
  "DIA",
  "DIDI",
  "DIS",
  "DLR",
  "DOW",
  "DPZ",
  "DRE",
  "DRI",
  "DTE",
  "DUK",
  "DVA",
  "DVN",
  "EA",
  "ECL",
  "ED",
  "EEM",
  "EFA",
  "EFX",
  "EIX",
  "EL",
  "EMN",
  "EMR",
  "EOG",
  "ESGD",
  "ESGU",
  "ESS",
  "ETN",
  "ETR",
  "EVRG",
  "EW",
  "EXC",
  "EXPD",
  "EXR",
  "F",
  "FAST",
  "FCX",
  "FDX",
  "FE",
  "FIS",
  "FISV",
  "FLT",
  "FMC",
  "FOX",
  "FOXA",
  "FRT",
  "FTI",
  "FTNT",
  "FVD",
  "GD",
  "GE",
  "GILD",
  "GL",
  "GLD",
  "GLW",
  "GM",
  "GOOGL",
  "GOVT",
  "GPC",
  "GPN",
  "GS",
  "GSLC",
  "GWW",
  "HAE",
  "HAL",
  "HBAN",
  "HCA",
  "HD",
  "HES",
  "HIG",
  "HII",
  "HON",
  "HOOD",
  "HPE",
  "HRB",
  "HRL",
  "HST",
  "HSY",
  "HUM",
  "HWM",
  "IAU",
  "IBM",
  "ICE",
  "IDXX",
  "IEFA",
  "IEMG",
  "IEX",
  "IFF",
  "IGIB",
  "ILMN",
  "INTC",
  "INTU",
  "IPG",
  "IQV",
  "IR",
  "IRM",
  "ITA",
  "ITOT",
  "ITW",
  "IUSB",
  "IVE",
  "IVV",
  "IVW",
  "IWB",
  "IWD",
  "IWF",
  "IWM",
  "JD",
  "JNJ",
  "JPST",
  "JPM",
  "K",
  "KEY",
  "KHC",
  "KMB",
  "KMI",
  "KO",
  "KR",
  "LCID",
  "LHX",
  "LI",
  "LMT",
  "LNC",
  "LOW",
  "LQD",
  "MA",
  "MAR",
  "MCD",
  "MCK",
  "MCO",
  "MCHP",
  "MDLZ",
  "MDY",
  "MET",
  "META",
  "MINT",
  "MMC",
  "MMM",
  "MNST",
  "MO",
  "MRK",
  "MRO",
  "MS",
  "MSFT",
  "MSI",
  "MTB",
  "MTUM",
  "MU",
  "MUB",
  "NET",
  "NFLX",
  "NIO",
  "NKE",
  "NOC",
  "NSC",
  "NVDA",
  "NUE",
  "ORCL",
  "ORLY",
  "OXY",
  "PCAR",
  "PDD",
  "PEAK",
  "PEP",
  "PFE",
  "PG",
  "PH",
  "PKG",
  "PLTR",
  "PM",
  "PNC",
  "PPG",
  "PSX",
  "PWR",
  "PYPL",
  "QUAL",
  "QCOM",
  "QQQ",
  "RBLX",
  "RMD",
  "RIVN",
  "ROK",
  "ROKU",
  "ROST",
  "RSG",
  "RSP",
  "RTX",
  "SCHA",
  "SCHB",
  "SCHD",
  "SCHF",
  "SCHP",
  "SCHW",
  "SCHX",
  "SDY",
  "SHEL",
  "SHV",
  "SHW",
  "SHY",
  "SLB",
  "SLYV",
  "SNOW",
  "SOFI",
  "SPAB",
  "SPDW",
  "SPEM",
  "SPGI",
  "SPIB",
  "SPIP",
  "SPLG",
  "SPOT",
  "SPSB",
  "SPTI",
  "SPTM",
  "SPG",
  "SPY",
  "SPYG",
  "SPYV",
  "SQ",
  "SRE",
  "STZ",
  "SWK",
  "SYK",
  "SYY",
  "T",
  "TAP",
  "TDG",
  "TGT",
  "TJX",
  "TLT",
  "TMUS",
  "TRMB",
  "TRV",
  "TSM",
  "TSLA",
  "TTE",
  "TWLO",
  "TWTR",
  "TXN",
  "UBER",
  "UL",
  "UNH",
  "UPS",
  "USIG",
  "USB",
  "V",
  "VB",
  "VBK",
  "VBR",
  "VCIT",
  "VCLT",
  "VCR",
  "VDC",
  "VEA",
  "VFH",
  "VGIT",
  "VGLT",
  "VGSH",
  "VHT",
  "VIG",
  "VLO",
  "VLUE",
  "VMBS",
  "VNQ",
  "VOE",
  "VOO",
  "VONG",
  "VONV",
  "VOT",
  "VTEB",
  "VTIP",
  "VTI",
  "VTR",
  "VTV",
  "VUG",
  "VV",
  "VWO",
  "VXUS",
  "VYM",
  "VZ",
  "WAB",
  "WAT",
  "WBA",
  "WEC",
  "WFC",
  "WM",
  "WMT",
  "WRB",
  "WY",
  "XLC",
  "XLE",
  "XLF",
  "XLI",
  "XLK",
  "XLP",
  "XLV",
  "XOM",
  "XPEV",
  "YUM",
  "ZM",
];

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

const SymbolsModal = ({ isOpen, onClose, onSymbolSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content symbols-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Available Symbols</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="symbols-container">
          {ALLOWED_SYMBOLS.map((symbol) => (
            <span
              key={symbol}
              className="symbol-tag"
              onClick={() => {
                onSymbolSelect(symbol);
                onClose();
              }}
            >
              {symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const OptionsChain = () => {
  const [symbol, setSymbol] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [startExpirationDate, setStartExpirationDate] = useState("");
  const [endExpirationDate, setEndExpirationDate] = useState("");
  const [contractType, setContractType] = useState("");
  const [order, setOrder] = useState("");
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [queryResult, setQueryResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSymbolsModal, setShowSymbolsModal] = useState(false);
  const [queryUrl, setQueryUrl] = useState("");
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!symbol.trim()) {
      newErrors.symbol = "Symbol is required";
    }

    if (!apiKey.trim()) {
      newErrors.apiKey = "API Key is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRunQuery = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(queryUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQueryResult(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error running query:", error);
      setQueryResult(null);
    }
  };

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

  const handleCopyUrl = () => {
    if (queryUrl) {
      navigator.clipboard
        .writeText(queryUrl)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const handleSymbolSelect = (selectedSymbol) => {
    setSymbol(selectedSymbol);
    setErrors({ ...errors, symbol: undefined });
  };

  const handleApiKeyChange = (e) => {
    const value = e.target.value;
    setApiKey(value);
    setErrors({ ...errors, apiKey: undefined });
    localStorage.setItem("apiKey", value);
  };

  return (
    <div className="options-chain-container">
      <h2>Options Chain</h2>
      <p>Get the snapshot of all options contracts for an underlying ticker.</p>

      <div className={`form-group ${errors.symbol ? "error" : ""}`}>
        <label>
          Symbol* <span className="required">Required</span>
        </label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
            setErrors({ ...errors, symbol: undefined });
          }}
          placeholder="Enter symbol"
          className={errors.symbol ? "error-input" : ""}
        />
        {errors.symbol && <div className="error-message">{errors.symbol}</div>}
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
          <option value="MAX">Max (it may be slower)</option>
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

      <div className={`form-group ${errors.apiKey ? "error" : ""}`}>
        <label>
          API Key* <span className="required">Required</span>
        </label>
        <input
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter API key"
          className={errors.apiKey ? "error-input" : ""}
        />
        {errors.apiKey && <div className="error-message">{errors.apiKey}</div>}
        <small>Enter your API key for authentication.</small>
      </div>

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

      <button
        className="show-symbols-btn"
        onClick={() => setShowSymbolsModal(true)}
      >
        Show Available Symbols
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={queryResult}
      />

      <SymbolsModal
        isOpen={showSymbolsModal}
        onClose={() => setShowSymbolsModal(false)}
        onSymbolSelect={handleSymbolSelect}
      />
    </div>
  );
};

export default OptionsChain;
