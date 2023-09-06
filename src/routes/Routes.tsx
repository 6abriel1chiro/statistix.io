import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RRoutes,
} from "react-router-dom";
import Home from "../views/Home"; // Create a Home component for your home page
import LinearRegressionTool from "../components/regression/LinearRegressionTool"; // Import your tool components
import MovingAverages from "../components/moving-average/MovingAverages";
import DescriptiveStatisticsTool from "../components/regression/DescriptiveStatisticsTool";
const Routes: React.FC = () => {
  return (
    <Router>
      <RRoutes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tools/linear-regression"
          element={<LinearRegressionTool />}
        />
        <Route
          path="/tools/descriptive-statistics"
          element={<DescriptiveStatisticsTool />}
        />
        <Route
          path="/tools/moving-averages"
          element={<MovingAverages />}
        />
      </RRoutes>
    </Router>
  );
};

export default Routes;
