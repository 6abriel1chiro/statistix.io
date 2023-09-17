import React from "react";
import Plot from "react-plotly.js";
import regression from "regression";

// Define a type alias for DataPoint
type DataPoint = [number, number];

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

  // Check if a valid formula is available
  if (formula) {
    // Create an array of data points for regression
    const regressionData: DataPoint[] = x.map((xValue, index) => [
      xValue,
      y[index],
    ]);

    // Calculate the linear regression line
    const result = regression.linear(regressionData);
    const regressionLine = result.points;

    // Extract the x and y values for the regression line
    const regressionX = regressionLine.map((point) => point[0]);
    const regressionY = regressionLine.map((point) => point[1]);

    // Create data for the graph
    const scatterPlot = {
      x,
      y,
      mode: "markers",
      type: "scatter",
      name: "Data",
    };

    const regressionTrace = {
      x: regressionX,
      y: regressionY,
      mode: "lines",
      type: "scatter",
      name: "Linear Regression",
    };

    // Combine scatter and regression traces
    const data = [scatterPlot, regressionTrace];

    // Layout for the graph
    const layout = {
      title: "Linear Regression Trendline",
      xaxis: { title: "X" },
      yaxis: { title: "Y" },
      width: 400, // Specify the width (e.g., 400 pixels)
      height: 300, // Specify the height (e.g., 300 pixels)
    };

    return (
      <React.Fragment>
        <Plot data={data} layout={layout} />
      </React.Fragment>
    );
  }

  return null; // If no formula is available, don't render the graph
};

export default LinearRegressionGraph;
