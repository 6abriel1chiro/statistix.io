import React, { Component } from "react";
import "./LinearRegressionTool.css";

export default class LinearRegressionTool extends Component {
  constructor() {
    super();
    this.state = {
      dataInput: "", // User input for data separated by commas
      dataPoints: [], // Array to store parsed data points
      formula: "", // Linear regression formula to be displayed
    };
  }

  // Function to handle data input change
  handleDataInputChange = (event) => {
    this.setState({ dataInput: event.target.value });
  };

  // Function to split data input into individual data points
  splitDataInput = () => {
    const { dataInput } = this.state;
    const dataPoints = dataInput.split(",").map((point) => parseFloat(point));
    this.setState({ dataPoints });
  };

  // Function to calculate linear regression
  calculateLinearRegression = () => {
    const { dataPoints } = this.state;

    // Calculate linear regression here
    // You can implement the linear regression algorithm of your choice

    // For example, using a simple linear regression formula:
    const n = dataPoints.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    for (let i = 0; i < n; i++) {
      sumX += i + 1;
      sumY += dataPoints[i];
      sumXY += (i + 1) * dataPoints[i];
      sumX2 += (i + 1) ** 2;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;

    // Generate the linear regression formula
    const formula = `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`;

    this.setState({ formula });
  };

  render() {
    const { dataInput, dataPoints, formula } = this.state;

    return (
      <div className="linear-regression-tool">
        <h2>Linear Regression Tool</h2>
        <div className="data-input">
          <label>Enter Data Separated by Commas:</label>
          <input
            type="text"
            value={dataInput}
            onChange={this.handleDataInputChange}
          />
          <button onClick={this.splitDataInput}>Split Data</button>
        </div>
        <div className="data-points">
          {dataPoints.length > 0 && <p>Data Points: {dataPoints.join(", ")}</p>}
        </div>
        <button onClick={this.calculateLinearRegression}>Calculate</button>
        <div className="result">
          {formula && <p>Linear Regression Formula: {formula}</p>}
        </div>
      </div>
    );
  }
}
