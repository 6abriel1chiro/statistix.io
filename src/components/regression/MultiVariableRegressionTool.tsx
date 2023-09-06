import  { Component } from "react";
import "./MultiVariableRegressionTool.css";

export default class MultiVariableRegressionTool extends Component {
  constructor() {
    super();
    this.state = {
      numVariables: 2,
      variableInputs: [],
      dataPoints: [], // Array to store parsed data points
      formula: "",
      inputErrors: [], // Array to store validation errors
    };
  }

  handleNumVariablesChange = (event) => {
    const numVariables = parseInt(event.target.value, 10);
    this.setState({ numVariables });
  };

  generateVariableInputs = () => {
    const { numVariables } = this.state;
    const variableInputs = Array.from({ length: numVariables }, (_, i) => (
      <div key={i}>
        <label>Independent Variable {i + 1}:</label>
        <input
          type="text"
          ref={(input) => (this[`variableInput${i}`] = input)}
        />
        <button onClick={() => this.splitDataInput(i)}>Split Data</button>
      </div>
    ));
    this.setState({ variableInputs });
  };

  splitDataInput = (variableIndex) => {
    const { variableInputs, dataPoints, inputErrors } = this.state;
    const inputElement = this[`variableInput${variableIndex}`];
    const inputData = inputElement.value.trim();
    const dataPointsForVariable = inputData.split(",").map((value) => parseFloat(value));

    // Basic validation: Check if all entered values are valid numbers
    const invalidValues = dataPointsForVariable.some((value) => isNaN(value));
    if (invalidValues) {
      inputErrors[variableIndex] = "Invalid input. Please enter numeric values.";
    } else {
      inputErrors[variableIndex] = ""; // Clear error message if valid
    }

    dataPoints[variableIndex] = dataPointsForVariable;
    this.setState({ dataPoints, inputErrors });
  };

  calculateMultiVariableRegression = () => {
    const { dataPoints, inputErrors } = this.state;

    // Check if there are any validation errors before performing the calculation
    if (inputErrors.some((error) => error)) {
      alert("Please fix the input errors before calculating.");
      return;
    }
    
    const [beta0, beta1] = calculateCoefficients(dataPoints);
    const coefficients = [beta0, beta1];
    this.setState({ formula: generateFormula(coefficients) });
    console.log(this.state);
  };

  render() {
    const { numVariables, variableInputs, formula, dataPoints, inputErrors } = this.state;

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
          <button onClick={this.generateVariableInputs}>OK</button>
        </div>
        {variableInputs.length > 0 && (
          <div className="variable-inputs">
            {variableInputs}
            <div className="validation-errors">
              {inputErrors.map((error, index) => (
                <p key={index} className="error-message">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}

        <button onClick={this.calculateMultiVariableRegression}>Calculate</button>
        <div className="result">
          {formula && <p>Multi-Variable Regression Formula: {formula}</p>}
        </div>
        {dataPoints.length > 0 && (
          <div className="data-points">
            <p>Data Points:</p>
            {dataPoints.map((variables, index) => (
              <div key={index} className="data-column">
                <p>Data Column {index + 1}:</p>
                <ul>
                  {variables.map((value, i) => (
                    <li key={i}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
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

  console.log("X:", X);
  console.log("Y:", Y);

  // Calculate the means of X and Y
  const meanX = X.map(
    (variables) =>
      variables.reduce((sum, value) => sum + value, 0) / variables.length
  );
  const meanY = Y.reduce((sum, value) => sum + value, 0) / numDataPoints;
  console.log("meanX:", meanX);
  console.log("meanY:", meanY);

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

    console.log("xi:", xi);
    console.log("yi:", yi);
    console.log("xiMinusMeanX:", xiMinusMeanX);
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