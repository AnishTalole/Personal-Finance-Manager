import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Register = () => {
  return (
    <div className="container">
      <h2>Create Account</h2>
      <p>Create your account</p>
      <form>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Full Name" required />
        </div>
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Email id" required />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
