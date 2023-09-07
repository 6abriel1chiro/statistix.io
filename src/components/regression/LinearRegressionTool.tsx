import React, { useState, ChangeEvent } from "react";
import "./LinearRegressionTool.css";

const LinearRegressionTool: React.FC = () => {
  const [state, setState] = useState<{
    dataInput: string;
    dataPoints: number[];
    formula: string;
  }>({
    dataInput: "",
    dataPoints: [],
    formula: "",
  });

  // Function to handle data input change
  const handleDataInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, dataInput: event.target.value });
  };

  // Function to split data input into individual data points
  const splitDataInput = () => {
    const { dataInput } = state;
    const dataPoints = dataInput.split(",").map((point) => parseFloat(point));
    setState({ ...state, dataPoints });
  };

  // Function to calculate linear regression
  const calculateLinearRegression = () => {
    const { dataPoints } = state;

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

    setState({ ...state, formula });
  };

  return (
    <div className="linear-regression-tool">
      <h2>Linear Regression Tool</h2>
      <div className="data-input">
        <label>Enter Data Separated by Commas:</label>
        <input
          type="text"
          value={state.dataInput}
          onChange={handleDataInputChange}
        />
        <button onClick={splitDataInput}>Split Data</button>
      </div>
      <div className="data-points">
        {state.dataPoints.length > 0 && (
          <div>
            <p>Data Points:</p>
            <ul>
              {state.dataPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={calculateLinearRegression}>Calculate</button>
      {state.formula && (
        <div className="result">Linear Regression Formula: {state.formula}</div>
      )}
    </div>
  );
};

export default LinearRegressionTool;
