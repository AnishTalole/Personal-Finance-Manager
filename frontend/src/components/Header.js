import React from "react";

const Header = ({ user, logout }) => (
  <nav>
    <h2>Auth</h2>
    {user && <button onClick={logout}>Logout</button>}
  </nav>
);

export default Header;
