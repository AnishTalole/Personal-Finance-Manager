import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <h1>Finance Manager</h1>
        </div>
        <button className="primary-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      <div className="hero-section">
        <h1>
          Unlocking the <span>Power</span> of Your Finances
        </h1>
        <p>Manage your expenses effortlessly with our smart finance tracker.</p>

        <div className="buttons">
          <button className="primary-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
          <button className="secondary-btn" onClick={() => navigate("/Learnmore")}>
            Learn More
          </button>
        </div>
      </div>

      <div className="info-cards">
        <div className="card">
          <h2>100+</h2>
          <p>🚀 New users exploring smarter financial management</p>
        </div>
        <div className="card highlight">
          <h2>₹0 fees</h2>
          <p>💰 Completely free to track and manage your expenses</p>
        </div>
        <div className="card">
          <h2>Secure & Private</h2>
          <p>🔒 Your data is encrypted and safe with us</p>
        </div>
      </div>

      <footer className="footer">
        Designed & Developed by <strong>Anish Talole</strong>
      </footer>
    </div>
  );
};

export default Home;
