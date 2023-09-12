import React from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

interface LinearRegressionGraphProps {
  dataPoints: number[];
  formula: string;
}

const LinearRegressionGraph: React.FC<LinearRegressionGraphProps> = ({
  dataPoints,
  formula,
}) => {
  // Extract x and y values from dataPoints
  const x = dataPoints.map((_, index) => index + 1);
  const y = dataPoints;

  // Create a function to calculate the predicted y values
  const calculatePredictedY = (xValue: number) => {
    const [slope, intercept] = formula.split("x");
    return parseFloat(slope) * xValue + parseFloat(intercept);
  };

  // Calculate the predicted y values using the function
  const predictedY = x.map((xValue) => calculatePredictedY(xValue));

  // Create data for the graph
  const traceData: Data[] = [
    {
      x,
      y,
      name: "Data Points",
      mode: "markers",
      type: "scatter",
    },
    {
      x,
      y: predictedY,
      name: "Trendline",
      mode: "lines+markers", // Display both lines and markers
      type: "scatter",
    },
  ];

  return (
    <React.Fragment>
      <Plot
        data={traceData}
        layout={{
          title: "Linear Regression Trendline",
          xaxis: { title: "X" },
          yaxis: { title: "Y" },
          width: 400, // Specify the width (e.g., 400 pixels)
          height: 300, // Specify the height (e.g., 300 pixels)
        }}
      />
    </React.Fragment>
  );
};

export default LinearRegressionGraph;
