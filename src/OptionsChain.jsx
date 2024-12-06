import React, { useState, useEffect } from "react";
import "./css/OptionsChain.css";

const API_URL = "https://optionsapi.dev/api";

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

const LoadingSpinner = () => (
  <div className="loading-overlay">
    <div className="loading-spinner"></div>
    <p>Loading data...</p>
  </div>
);

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
      <div className="modal-content symbols-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Available Symbols</h3>
          <button className="close-button" onClick={onClose}>×</button>
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
  const [formData, setFormData] = useState({
    symbol: "",
    strikePrice: "",
    startExpirationDate: "",
    endExpirationDate: "",
    contractType: "",
    order: "",
    limit: 10,
    sort: "",
    apiKey: localStorage.getItem("apiKey") || ""
  });

  const [queryResult, setQueryResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSymbolsModal, setShowSymbolsModal] = useState(false);
  const [queryUrl, setQueryUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = buildQueryUrl();
    setQueryUrl(url);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.symbol.trim()) newErrors.symbol = "Symbol is required";
    if (!formData.apiKey.trim()) newErrors.apiKey = "API Key is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildQueryUrl = () => {
    const params = Object.entries(formData)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    return `${API_URL}/optionsChain?${params}`;
  };

  const handleRunQuery = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(queryUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setQueryResult(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error running query:", error);
      setQueryResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(queryUrl)
      .then(() => alert("URL copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  };

  const handleSymbolSelect = (symbol) => {
    setFormData(prev => ({ ...prev, symbol }));
    setErrors(prev => ({ ...prev, symbol: undefined }));
  };

  return (
    <div className="options-chain-container">
      {isLoading && <LoadingSpinner />}
      <h2>Options Chain</h2>
      <p>Get the snapshot of all options contracts for an underlying ticker.</p>

      <div className={`form-group ${errors.symbol ? "error" : ""}`}>
        <label>Symbol* <span className="required">Required</span></label>
        <input
          type="text"
          name="symbol"
          value={formData.symbol}
          onChange={handleInputChange}
          placeholder="Enter symbol"
        />
        {errors.symbol && <div className="error-message">{errors.symbol}</div>}
      </div>

      <div className="form-group">
        <label>Strike Price</label>
        <input
          type="text"
          name="strikePrice"
          value={formData.strikePrice}
          onChange={handleInputChange}
          placeholder="Enter strike price"
        />
      </div>

      <div className="form-group">
        <label>Start Expiration Date</label>
        <input
          type="date"
          name="startExpirationDate"
          value={formData.startExpirationDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>End Expiration Date</label>
        <input
          type="date"
          name="endExpirationDate"
          value={formData.endExpirationDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Contract Type</label>
        <select
          name="contractType"
          value={formData.contractType}
          onChange={handleInputChange}
        >
          <option value="">Select contract type</option>
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
      </div>

      <div className="form-group">
        <label>Order</label>
        <select
          name="order"
          value={formData.order}
          onChange={handleInputChange}
        >
          <option value="">Select order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="form-group">
        <label>Limit</label>
        <select
          name="limit"
          value={formData.limit}
          onChange={handleInputChange}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="MAX">Max</option>
        </select>
      </div>

      <div className="form-group">
        <label>Sort</label>
        <select
          name="sort"
          value={formData.sort}
          onChange={handleInputChange}
        >
          <option value="">Select sort field</option>
          <option value="strike_price">Strike Price</option>
          <option value="expiration_date">Expiration Date</option>
        </select>
      </div>

      <div className={`form-group ${errors.apiKey ? "error" : ""}`}>
        <label>API Key* <span className="required">Required</span></label>
        <input
          type="text"
          name="apiKey"
          value={formData.apiKey}
          onChange={handleInputChange}
          placeholder="Enter API key"
        />
        {errors.apiKey && <div className="error-message">{errors.apiKey}</div>}
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

      <div className="button-group">
        <button className="run-query-btn" onClick={handleRunQuery}>
          Run Query
        </button>
        <button className="show-symbols-btn" onClick={() => setShowSymbolsModal(true)}>
          Show Available Symbols
        </button>
      </div>

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