import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./HomeStyles.css";

// Sample data for the available tools
const toolsData = [
  {
    id: "linear-regression",
    name: "Linear Regression Tool",
    description: "Perform linear regression analysis.",
  },
  {
    id: "multi-variable-regression",
    name: "Multi-variable Regression Tool",
    description: "Analyze multi-variable regression.",
  },
];

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="banner">
        <h1>Welcome to statistix.io</h1>
      </div>
      <h2 className="cards-title">Available Tools</h2>
      <section className="tools-section">
        <div className="tool-cards">
          {toolsData.map((tool) => (
            <div key={tool.id} className="card">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <Link to={`/tools/${tool.id}`}>Go to Tool</Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
