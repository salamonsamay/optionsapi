import React from "react";
import "./css/Home.css"; // Import the CSS file

const SectionTitle = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome to Our Options API</h1>
      </div>
      <div className="content">
        <p>
          Our platform provides a comprehensive and user-friendly API
          specifically designed for developers who need access to options market
          data. Whether you're building trading applications, analytical tools,
          or any other software that requires options data, our API is here to
          facilitate your needs.
        </p>

        <SectionTitle>Key Features</SectionTitle>
        <div className="feature-grid">
          {[
            {
              title: "Real-Time Data",
              description:
                "Access up-to-the-minute information on various options, including pricing, volatility, and expiration dates.",
            },
            {
              title: "Historical Data",
              description:
                "Retrieve historical options data for in-depth analysis and research purposes.",
            },
            {
              title: "Comprehensive Coverage",
              description:
                "Our API covers a wide range of options across multiple underlying assets, ensuring you have the data you need.",
            },
            {
              title: "User-Friendly Documentation",
              description:
                "Our detailed documentation makes it easy for developers to integrate and utilize our API effectively.",
            },
            {
              title: "Support",
              description:
                "We offer dedicated support to assist you with any questions or challenges you may encounter.",
            },
          ].map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon"></div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle>Use Cases</SectionTitle>
        <div className="feature-grid">
          {[
            {
              title: "Trading Applications",
              description:
                "Develop robust trading platforms that require real-time options data to make informed decisions.",
            },
            {
              title: "Market Analysis",
              description:
                "Create analytical tools to study trends and patterns in the options market.",
            },
            {
              title: "Risk Management",
              description:
                "Implement risk assessment models using our extensive options data.",
            },
          ].map((useCase, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon"></div>
              <div className="feature-text">
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle>Why Choose Our API?</SectionTitle>
        <div className="why-choose">
          <p>
            Our API stands out in the market due to its reliability and
            accuracy. We ensure our data is consistently updated and accessible
            in the fast-paced trading environment.
          </p>
          <p>
            Built with developers in mind, we provide clear endpoints,
            comprehensive examples, and best practices for smooth integration.
          </p>
          <p>
            Security is a top priority. We implement industry-standard measures
            to protect your data and ensure authorized access only.
          </p>
          <p>
            Our API scales with your needs, from small applications to large
            enterprise systems, handling data requests efficiently.
          </p>
          <p>
            Join our community of developers leveraging our options API to build
            innovative solutions. Sign up today and start exploring the
            potential of options trading and analysis!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
