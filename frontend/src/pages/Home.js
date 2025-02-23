import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const navigate = useNavigate();
  const user = "User"; 

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">
          <img src="logo.png" alt="Logo" className="logo-img" />
          <h1>auth</h1>
        </div>
        <button className="profile-btn">P</button>
      </header>

      {/* Content Section */}
      <div className="content">
        <img src="robot.png" alt="Welcome" className="robot" />
        <h3>Hey {user}! 👋</h3>
        <h1>Welcome to our app</h1>
        <p>
          Let's start with a quick product tour and we will have you up and
          running in no time!
        </p>
        <button className="start-btn" onClick={() => navigate("/register")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
