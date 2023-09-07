import React, { useState } from "react";

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
    <div>
      <h2>Moving Averages Tool</h2>
      <div>
        <label>Data Points (Separated by Commas):</label>
        <input
          type="text"
          value={state.dataInput}
          onChange={handleDataInputChange}
        />
      </div>
      <div>
        <label>Number of Consecutive Points to Average:</label>
        <input
          type="number"
          value={state.windowSize}
          onChange={handleWindowSizeChange}
        />
      </div>
      <button onClick={calculateMovingAverage}>Calculate</button>
      {state.movingAverage !== null && (
        <div>
          <h3>Moving Average:</h3>
          <p>{state.movingAverage.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default MovingAverages;
