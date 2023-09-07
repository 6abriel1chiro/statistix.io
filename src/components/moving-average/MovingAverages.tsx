import React, { useState } from "react";
import "./MovingAverages.css"
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";


interface MovingAveragesState {
  dataInput: string;
  windowSize: number;
  movingAverage: number[] | null;
}

const MovingAverages: React.FC = () => {
  const [state, setState] = useState<MovingAveragesState>({
    dataInput: "", // Store user input data
    windowSize: 0, // Number of consecutive points to average
    movingAverage: null, // Store the calculated moving average
  });

  // Function to handle data input change
  const handleDataInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, dataInput: event.target.value });
  };

  // Function to handle window size input change
  const handleWindowSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, windowSize: parseInt(event.target.value, 10) });
  };

  // Function to calculate the moving average
  const calculateMovingAverage = () => {
    const { dataInput, windowSize } = state;

    // Split the input data by commas and trim any extra whitespace
    const dataPoints = dataInput
      .split(",")
      .map((value) => parseFloat(value.trim())) // Parse values into numbers
      .filter((value) => !isNaN(value)); // Filter out NaN values

    if (dataPoints.length < windowSize) {
      alert("Window size cannot be greater than the number of data points.");
      return;
    }

    const movingAverage = [];

    for (let i = windowSize - 1; i < dataPoints.length; i++) {
      const sum = dataPoints
        .slice(i - windowSize + 1, i + 1)
        .reduce((acc, value) => acc + value, 0);
      movingAverage.push(sum / windowSize);
    }

    setState({ ...state, movingAverage });
  };

  return (
    <React.Fragment>
      <Navbar/>
    <div className="moving-averages-container">
      <h2 className="moving-averages-title">Moving Averages Tool</h2>
      <div className="input-section">
        <label>Data Points (Separated by Commas):</label>
        <input
          className="data-input"
          type="text"
          value={state.dataInput}
          onChange={handleDataInputChange}
        />
      </div>
      <div className="input-section">
        <label>Number of Consecutive Points to Average:</label>
        <input
          className="window-size-input"
          type="number"
          value={state.windowSize}
          onChange={handleWindowSizeChange}
        />
      </div>
      <button
        className="calculateBtn"
        onClick={calculateMovingAverage}
      >
        Calculate
      </button>
      {state.movingAverage !== null && (
        <div className="result">
          <h3>Moving Average: </h3>
          <p>{state.movingAverage.join(", ")}</p>
        </div>
      )}
    </div>
    <Footer/>
    </React.Fragment>
  );
};

export default MovingAverages;
