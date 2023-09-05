import React from "react";
import { Link } from "react-router-dom";

import "./NavbarStyles.css"; // Import your CSS file for Navbar styling

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/documentation">Documentation</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact">Contact or Support</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about">About</Link>
        </li>
        {/* Add a Search Bar */}
        <li className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            // Add event handlers and functionality for search as needed
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
