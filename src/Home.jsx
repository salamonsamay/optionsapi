import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import axios from "axios"; // Make sure to install axios
import "./css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptionsData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://optionsapi.dev:8080/count', {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        setApiResponse(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching options data:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchOptionsData();
  }, []); // Empty dependency array means this runs once when component mounts

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleFreeQuoteClick = () => {
    navigate("/OptionChain");
  };

  const strategiesData = [
    {
      title: "Bull Spread Strategy",
      description:
        "A vertical spread options strategy designed to profit from moderate upward price moves. Involves buying and selling options of the same type with different strike prices.",
    },
    {
      title: "Bear Spread Strategy",
      description:
        "An options strategy that profits from a decline in the underlying asset's price. Created by simultaneously buying and selling options with different strikes but same expiration.",
    },
    {
      title: "Box Spread Strategy",
      description:
        "An advanced options arbitrage strategy combining a bull call spread with a bear put spread, creating a 'box' of four options with minimal risk exposure.",
    },
    {
      title: "Iron Condor Strategy",
      description:
        "A non-directional options strategy that profits from low volatility. Combines a bull put spread with a bear call spread with same expiration dates.",
    },
    {
      title: "Synthetic Position",
      description:
        "Create positions that simulate owning or shorting the underlying asset using options combinations. Offers leverage and potentially lower capital requirements.",
    },
    {
      title: "Reversal Strategy",
      description:
        "An arbitrage strategy combining a synthetic long stock position with a short stock position to profit from price discrepancies in options markets.",
    },
  ];

  return (
    <div className="home-container">
      {/* Loading State */}
      {isLoading && (
        <div className="loading-container">
          <p>Loading options data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container">
          <p>Error loading options data: {error.message}</p>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Options Chain Data API For Developers</h1>

          {/* Video Container */}
          <div className="video-container">
            <ReactPlayer
              url="https://youtu.be/i-vcLzBI1jk" // Replace with your actual video URL
              width="100%"
              height="400px"
              controls={true}
              playing={isVideoPlaying}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />
          </div>

          <p className="hero-description">
            Our platform provides a comprehensive and user-friendly API
            specifically designed for developers who need access to options
            market data. Whether you're building trading applications,
            analytical tools, or any other software that requires options data,
            our API is here to facilitate your needs.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleFreeQuoteClick}>
              Options Chain
            </button>
            <button className="btn btn-secondary" onClick={handleContactClick}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="strategies-section">
        <h2>Options Trading Strategies</h2>
        <div className="strategies-grid">
          {strategiesData.map((strategy, index) => (
            <div key={index} className="strategy-card">
              <h3>{strategy.title}</h3>
              <p>{strategy.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our API?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <i className="icon-real-time">🕒</i>
            <h3>Real-Time Data</h3>
            <p>Instant access to live options market information.</p>
          </div>
          <div className="feature-item">
            <i className="icon-comprehensive">📊</i>
            <h3>Comprehensive Coverage</h3>
            <p>Detailed options chain data across multiple exchanges.</p>
          </div>
          <div className="feature-item">
            <i className="icon-easy">🔧</i>
            <h3>Easy Integration</h3>
            <p>Simple, well-documented API with multiple language support.</p>
          </div>
          <div className="feature-item">
            <i className="icon-secure">🔒</i>
            <h3>Secure Access</h3>
            <p>Advanced authentication and data protection mechanisms.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Supercharge Your Options Trading?</h2>
          <p>Get instant access to powerful options chain data and tools.</p>
          <button
            className="btn btn-primary btn-large"
            onClick={handleFreeQuoteClick}
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;