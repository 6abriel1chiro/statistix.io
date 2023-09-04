import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RRoutes,
} from "react-router-dom";
import Home from "../views/Home"; // Create a Home component for your home page
import LinearRegressionTool from "../components/regression/LinearRegressionTool"; // Import your tool components
import MultiVariableRegressionTool from "../components/regression/MultiVariableRegressionTool";
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
          path="/tools/multi-variable-regression"
          element={<MultiVariableRegressionTool />}
        />
        {/* Add routes for other tools */}
      </RRoutes>
    </Router>
  );
};

export default Routes;
