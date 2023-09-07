import React, { Component } from "react";

interface MovingAveragesState {
  dataInput: string;
  windowSize: number;
  movingAverage: number[] | null;
}

class MovingAverages extends Component<null, MovingAveragesState> {
  constructor(props: null) {
    super(props);
    this.state = {
      dataInput: "", // Store user input data
      windowSize: 0, // Number of consecutive points to average
      movingAverage: null, // Store the calculated moving average
    };
  }

  // Function to handle data input change
  handleDataInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ dataInput: event.target.value });
  };

  // Function to handle window size input change
  handleWindowSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ windowSize: parseInt(event.target.value, 10) });
  };

  // Function to calculate the moving average
  calculateMovingAverage = () => {
    const { dataInput, windowSize } = this.state;

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

    this.setState({ movingAverage });
  };

  render() {
    const { dataInput, windowSize, movingAverage } = this.state;

    return (
      <div>
        <h2>Moving Averages Tool</h2>
        <div>
          <label>Data Points (Separated by Commas):</label>
          <input
            type="text"
            value={dataInput}
            onChange={this.handleDataInputChange}
          />
        </div>
        <div>
          <label>Number of Consecutive Points to Average:</label>
          <input
            type="number"
            value={windowSize}
            onChange={this.handleWindowSizeChange}
          />
        </div>
        <button onClick={this.calculateMovingAverage}>Calculate</button>
        {movingAverage !== null && (
          <div>
            <h3>Moving Average:</h3>
            <p>{movingAverage.join(", ")}</p>
          </div>
        )}
      </div>
    );
  }
}

export default MovingAverages;
