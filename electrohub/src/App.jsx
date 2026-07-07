import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Components from "./pages/Components";
import Datasheets from "./pages/Datasheets";
import LogicSimulator from "./pages/LogicSimulator";
import ProjectGenerator from "./pages/ProjectGenerator";
import ShoppingCart from "./pages/ShoppingCart";
import UserDashboard from "./pages/UserDashboard";
import Social from "./pages/Social";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components" element={<Components />} />
      <Route path="/datasheets" element={<Datasheets />} />
      <Route path="/logic" element={<LogicSimulator />} />
      <Route path="/project-generator" element={<ProjectGenerator />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/social" element={<Social />} />
    </Routes>
  );
}

export default App;