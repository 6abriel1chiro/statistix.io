import React, { useState } from "react";
import "./DescriptiveStatisticsToolStyles.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Plot from "react-plotly.js";

const DescriptiveStatisticsTool: React.FC = () => {
  const [dataInput, setDataInput] = useState<string>("");
  const [descriptiveStatistics, setDescriptiveStatistics] = useState<
    Record<string, string | number>
  >({});

  const [histogramData, setHistogramData] = useState<{
    x: number[];
    type: "histogram";
  } | null>(null);

  // Function to handle data input change
  const handleDataInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataInput(event.target.value);
  };

  // Function to calculate descriptive statistics
  const calculateDescriptiveStatistics = () => {
    const dataPoints = dataInput
      .split(",")
      .map((value) => parseFloat(value.trim()));

    if (dataPoints.some(isNaN)) {
      alert("Please enter valid numeric values separated by commas.");
      return;
    }

    const histogramData = {
      x: dataPoints,
      type: "histogram" as const,
    };
    const count = dataPoints.length;
    const mean = dataPoints.reduce((sum, value) => sum + value, 0) / count;
    const sortedDataPoints = dataPoints.slice().sort((a, b) => a - b);
    const median =
      count % 2 === 0
        ? (sortedDataPoints[count / 2 - 1] + sortedDataPoints[count / 2]) / 2
        : sortedDataPoints[Math.floor(count / 2)];
    const modeMap: Record<string, number> = {};
    let maxCount = 0;
    let mode: string[] = [];

    dataPoints.forEach((value) => {
      if (!modeMap[value]) {
        modeMap[value] = 0;
      }
      modeMap[value]++;
      if (modeMap[value] > maxCount) {
        maxCount = modeMap[value];
        mode = [value.toString()];
      } else if (modeMap[value] === maxCount) {
        mode.push(value.toString());
      }
    });

    const range = sortedDataPoints[count - 1] - sortedDataPoints[0];
    const variance =
      dataPoints.reduce((sum, value) => sum + (value - mean) ** 2, 0) / count;
    const standardDeviation = Math.sqrt(variance);

    const newDescriptiveStatistics = {
      Count: count,
      Mean: mean.toFixed(2),
      Median: median.toFixed(2),
      Mode: mode.join(", "),
      Range: range.toFixed(2),
      Variance: variance.toFixed(2),
      "Standard Deviation": standardDeviation.toFixed(2),
    };
    setHistogramData(histogramData);

    setDescriptiveStatistics(newDescriptiveStatistics);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="descriptive-statistics-tool">
        <h2>Descriptive Statistics Tool</h2>
        <div className="data-input">
          <label>Enter Data (Separated by Commas):</label>
          <input
            type="text"
            value={dataInput}
            onChange={handleDataInputChange}
          />
        </div>
        <button
          className="calculateBtn"
          onClick={calculateDescriptiveStatistics}
        >
          Calculate
        </button>
        <div className="result">
          <ul>
            <li>{"Descriptive Statistics:  "}</li>
            {Object.entries(descriptiveStatistics).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <div className="histogram">
            {histogramData && (
              <Plot
                className="plot"
                data={[histogramData]}
                layout={{
                  title: "Data Distribution Histogram",
                  xaxis: {
                    title: "Value",
                    nticks: 10, // Adjust the number of bins
                  },
                  yaxis: { title: "Frequency" },
                  bargap: 0.05, // Adjust the gap between bars
                  width: 450, // Specify the width (e.g., 400 pixels)
                  height: 470, // Specify the height (e.g., 300 pixels)
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DescriptiveStatisticsTool;
