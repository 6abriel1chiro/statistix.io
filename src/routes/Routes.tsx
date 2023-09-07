import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RRoutes,
} from "react-router-dom";
import Home from "../views/Home";
import LinearRegressionTool from "../components/regression/LinearRegressionTool";
import MovingAverages from "../components/moving-average/MovingAverages";
import DescriptiveStatisticsTool from "../components/regression/DescriptiveStatisticsTool";

const Routes: React.FC = () => {
  return (
    <Router>
      <RRoutes>
        <Route path="/statistix.io" element={<Home />} />
        <Route
          path="/tools/linear-regression"
          element={<LinearRegressionTool />}
        />
        <Route
          path="/tools/descriptive-statistics"
          element={<DescriptiveStatisticsTool />}
        />
        <Route path="/tools/moving-averages" element={<MovingAverages />} />
      </RRoutes>
    </Router>
  );
};

export default Routes;
