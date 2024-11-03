import React from "react";
import "./css/Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Replacing the orange square with the image */}
          <a href="https://ibb.co/vcY31p9">
            <img 
              src="https://i.ibb.co/x2H1hWZ/DALL-E-2024-10-24-05-56-17-An-illustrated-picture-of-a-modern-spacious-office-interior-The-office-ha.webp" 
              alt="Modern Spacious Office Interior" 
              className="hero-image" 
            />
          </a>

          <div className="hero-text">
            <h1>Comprehensive API for Options Market Data</h1>
            <p>
              Our platform provides a comprehensive and user-friendly API
              specifically designed for developers who need access to options market
              data. Whether you're building trading applications, analytical tools,
              or any other software that requires options data, our API is here to
              facilitate your needs.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Free Quote</button>
              <button className="btn-secondary">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="service-box">
          <h4>Cyber Security</h4>
          <p>Smart data layer access and insights with the best security features and modern solutions.</p>
        </div>
        <div className="service-box">
          <h4>Data Analytics</h4>
          <p>Leverage advanced analytics to understand patterns and boost business performance.</p>
        </div>
        <div className="service-box">
          <h4>Web Development</h4>
          <p>Build modern, scalable websites with user-friendly interfaces and back-end integrations.</p>
        </div>
        <div className="service-box">
          <h4>Apps Development</h4>
          <p>Create cross-platform mobile apps that ensure high performance and excellent user experience.</p>
        </div>
        <div className="service-box">
          <h4>SEO Optimization</h4>
          <p>Improve search engine rankings, increase traffic, and build a strong online presence with SEO.</p>
        </div>
        <div className="service-box">
          <h4>Call Us for Quotes</h4>
          <p>Discuss your project needs with our team and get tailored solutions. +012 345 6789</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
