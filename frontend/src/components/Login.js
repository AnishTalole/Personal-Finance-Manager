import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Login = () => {
  return (
    <div className="container">
      <h2>Login</h2>
      <p>Enter your credentials to access your account</p>
      <form>
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Email" required />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
