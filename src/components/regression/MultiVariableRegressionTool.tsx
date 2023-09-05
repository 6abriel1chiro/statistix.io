import React, { Component } from "react";
import "./MultiVariableRegressionTool.css";

export default class MultiVariableRegressionTool extends Component {
  constructor() {
    super();
    this.state = {
      numVariables: 2, // Number of independent variables (default: 2)
      dataInput: "", // User input for data
      dataPoints: [], // Array to store parsed data points
      formula: "", // Multi-variable regression formula
      independentVariables: [], // Array to store text inputs for independent variables
    };
  }

  // Function to handle the number of independent variables change
  handleNumVariablesChange = (event) => {
    const numVariables = parseInt(event.target.value, 10);
    this.setState({ numVariables });
  };

  // Function to handle data input change
  handleDataInputChange = (event) => {
    this.setState({ dataInput: event.target.value });
  };

  // Function to split data input into individual data points
  splitDataInput = () => {
    const { dataInput, numVariables } = this.state;
    // Split data input into rows (each row represents a data point)
    const rows = dataInput.split("\n");
    // Parse each row into an array of numbers
    const dataPoints = rows.map((row) =>
      row.split(",").map((value) => parseFloat(value))
    );
    this.setState({ dataPoints, numVariables });
  };

  // Function to generate text inputs for independent variables
  generateIndependentVariablesInputs = () => {
    const { numVariables } = this.state;
    const independentVariables = Array.from(
      { length: numVariables },
      (_, i) => (
        <div key={i}>
          <label>Independent Variable {i + 1}:</label>
          <input type="text" />
        </div>
      )
    );
    this.setState({ independentVariables });
  };

  // Function to calculate multi-variable regression
  calculateMultiVariableRegression = () => {
    const { dataPoints } = this.state;

    // Calculate multi-variable regression here
    // You can implement the multi-variable regression algorithm of your choice

    // For example, using a simple multi-variable regression formula
    const coefficients = calculateCoefficients(dataPoints);

    // Generate the multi-variable regression formula
    const formula = generateFormula(coefficients);

    this.setState({ formula });
  };

  render() {
    const {
      numVariables,
      dataInput,
      dataPoints,
      formula,
      independentVariables,
    } = this.state;

    return (
      <div className="multi-variable-regression-tool">
        <h2>Multi-Variable Regression Tool</h2>
        <div className="num-variables-input">
          <label>Number of Independent Variables:</label>
          <input
            type="number"
            value={numVariables}
            onChange={this.handleNumVariablesChange}
          />
          <button onClick={this.generateIndependentVariablesInputs}>OK</button>
        </div>
        {independentVariables.length > 0 && (
          <div className="independent-variables">{independentVariables}</div>
        )}

        <div className="data-points">
          {dataPoints.length > 0 && (
            <div>
              <p>Data Points:</p>
              <table>{/* Display data points in a table format */}</table>
            </div>
          )}
        </div>
        <button onClick={this.calculateMultiVariableRegression}>
          Calculate
        </button>
        <div className="result">
          {formula && <p>Multi-Variable Regression Formula: {formula}</p>}
        </div>
      </div>
    );
  }
}

// Helper function to calculate coefficients (beta values) and generating the formula
function calculateCoefficients(dataPoints) {
  const numDataPoints = dataPoints.length;

  // Extract independent variables (X) and dependent variable (Y) from dataPoints
  const X = dataPoints.map((variables) => variables.slice(0, -1)); // All columns except the last one
  const Y = dataPoints.map((variables) => variables[variables.length - 1]); // Last column

  // Calculate the means of X and Y
  const meanX = X.map(
    (variables) =>
      variables.reduce((sum, value) => sum + value, 0) / variables.length
  );
  const meanY = Y.reduce((sum, value) => sum + value, 0) / numDataPoints;

  // Calculate the numerator and denominator for beta values
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < numDataPoints; i++) {
    const xi = X[i];
    const yi = Y[i];
    const xiMinusMeanX = xi.map((value, j) => value - meanX[j]);

    numerator += xiMinusMeanX.reduce(
      (sum, xiMinusMeanXj, j) => sum + xiMinusMeanXj * (yi - meanY),
      0
    );
    denominator += xiMinusMeanX.reduce(
      (sum, xiMinusMeanXj) => sum + xiMinusMeanXj ** 2,
      0
    );
  }

  // Calculate beta values
  const beta1 = numerator / denominator;
  const beta0 = meanY - beta1 * meanX.reduce((sum, xi) => sum + xi, 0);

  return [beta0, beta1];
}

// Helper function to generate the multi-variable regression formula
function generateFormula(coefficients) {
  const [beta0, beta1] = coefficients;

  // Customize this based on your calculation method
  const formula = `y = ${beta0.toFixed(2)} + ${beta1.toFixed(2)} * x1 + ...`; // Add more terms for additional independent variables

  return formula;
}
