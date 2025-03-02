import React from "react";
import "../Learnmore.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="learn-more-container">
      <header className="learn-more-header">
        <h1>✨ Personal Finance Manager ✨</h1>
        <p>Take control of your finances with ease!</p>
      </header>

      <section className="learn-more-content">
        <div className="info-section">
          <h2>📊 Manage Your Expenses, Smarter!</h2>
          <p>
            Our Personal Finance Manager helps you track and manage expenses effortlessly. Stay organized and achieve financial freedom!
          </p>
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>➕ Add Expenses</h3>
            <p>Keep a record of your daily expenses in a structured way.</p>
          </div>
          <div className="feature-card">
            <h3>✏️ Edit Expenses</h3>
            <p>Modify your expenses anytime to keep them accurate.</p>
          </div>
          <div className="feature-card">
            <h3>🗑️ Delete Expenses</h3>
            <p>Remove unnecessary expenses with a single click.</p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Start Tracking Today! 🚀</h2>
          <button className="cta-btn" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
