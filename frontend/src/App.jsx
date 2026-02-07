import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import Layout from "./components/Layout";

// PAGES
import Dashboard from "./pages/Dashboard";
import Arms from "./pages/Dashboard/Arms";
import Legs from "./pages/Dashboard/Legs";
import Wrists from "./pages/Dashboard/Wrists";
import FullBody from "./pages/Dashboard/FullBody";
import AllSimulations from "./pages/Dashboard/Simulations";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* MAIN DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* VIEW ALL SIMULATIONS */}
          <Route path="/dashboard/simulations" element={<AllSimulations />} />

          {/* INDIVIDUAL SIMULATIONS */}
          <Route path="/dashboard/arms" element={<Arms title="Fuck Niggers" difficulty="High" />} />
          <Route path="/dashboard/legs" element={<Legs />} />
          <Route path="/dashboard/wrists" element={<Wrists />} />
          <Route path="/dashboard/fullbody" element={<FullBody />} />

          {/* DEFAULT ROUTE */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
