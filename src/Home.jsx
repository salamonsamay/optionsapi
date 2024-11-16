import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };
  const handleFreeQuoteClick = () => {
    navigate("/OptionChain");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <a href="https://ibb.co/vcY31p9">
            <img
              src="https://i.ibb.co/x2H1hWZ/DALL-E-2024-10-24-05-56-17-An-illustrated-picture-of-a-modern-spacious-office-interior-The-office-ha.webp"
              alt="Modern Spacious Office Interior"
              className="hero-image"
            />
          </a>
          <div className="hero-text">
            <h1>Options Chain Data API For Devoloper </h1>
            <p>
              Our platform provides a comprehensive and user-friendly API
              specifically designed for developers who need access to options
              market data. Whether you're building trading applications,
              analytical tools, or any other software that requires options
              data, our API is here to facilitate your needs.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleFreeQuoteClick}>
                {/* Free Quote */}
                Options Chain
              </button>
              <button className="btn-secondary" onClick={handleContactClick}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="services-section">
        <div className="service-box">
          <h4>Bull Spread Strategy</h4>
          <p>
            A vertical spread options strategy designed to profit from moderate
            upward price moves. Involves buying and selling options of the same
            type with different strike prices.
          </p>
        </div>
        <div className="service-box">
          <h4>Bear Spread Strategy</h4>
          <p>
            An options strategy that profits from a decline in the underlying
            asset's price. Created by simultaneously buying and selling options
            with different strikes but same expiration.
          </p>
        </div>
        <div className="service-box">
          <h4>Box Spread Strategy</h4>
          <p>
            An advanced options arbitrage strategy combining a bull call spread
            with a bear put spread, creating a "box" of four options with
            minimal risk exposure.
          </p>
        </div>
        <div className="service-box">
          <h4>Iron Condor Strategy</h4>
          <p>
            A non-directional options strategy that profits from low volatility.
            Combines a bull put spread with a bear call spread with same
            expiration dates.
          </p>
        </div>
        <div className="service-box">
          <h4>Synthetic Position</h4>
          <p>
            Create positions that simulate owning or shorting the underlying
            asset using options combinations. Offers leverage and potentially
            lower capital requirements.
          </p>
        </div>
        <div className="service-box">
          <h4>Reversal Strategy</h4>
          <p>
            An arbitrage strategy combining a synthetic long stock position with
            a short stock position to profit from price discrepancies in options
            markets.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
