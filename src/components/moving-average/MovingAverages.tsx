import React, { Component } from 'react'

export class MovingAverages extends Component {
    constructor() {
        super();
        this.state = {
          dataPoints: [], // Array to store parsed data points
          inputErrors: [], // Array to store validation errors
          window: 0,
        };
      }
        // Function to handle data input change
  handleDataInputChange = (event) => {
    this.setState({ dataInput: event.target.value });
  };
  render() {
    return (
      <div>MovingAverages</div>
    )
  }
}

function caculateMovingAverage(data, window) {
    let result = [];
    if (data.length < window) {
      return result;
  }
  let sum = 0;
  for (let i = 0; i < window; ++i) {
        sum += data[i];
  }
  result.push(sum / window);
    let steps = data.length - window - 1;
  for (vletar i = 0; i < steps; ++i) {
        sum -= data[i];
      sum += data[i + window];
      result.push(sum / window);
  }
    return result;
}




export default MovingAverages