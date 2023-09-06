import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import bannerImage from "../assets/img/banner.jpg";
import "./HomeStyles.css";

const toolsData = [
  {
    id: "linear-regression",
    name: "Linear Regression Tool",
    description: "Perform linear regression analysis.",
  },
  {
    id: "descriptive-statistics",
    name: "Descriptive Statistics Tool",
    description: "Calculate descriptive statistics",
  },
  {
    id: "moving-averages",
    name: "Simple Moving Average Tool",
    description: "Straightforward simple moving average.",
  },
];

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="banner">
        <img src={bannerImage} alt="Banner" />
      </div>
      <h2 className="tools-title">Available Tools</h2>
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
