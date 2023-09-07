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
          <Link to="/contact">Contact or Support</Link>
        </li>
        {/* dropdown */}
        <li className="navbar-item">
          <div className="dropdown">
            <button className="dropbtn">
              Tools
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to={`/tools/descriptive-statistics`}>
                Descriptive Stats
              </Link>
              <Link to={`/tools/linear-regression`}>Linear Regression</Link>
              <Link to={`/tools/moving-averages`}>Moving Averages</Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
