import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Datasheets from "./pages/Datasheets";
import LogicSimulator from "./pages/LogicSimulator";
import ProjectGenerator from "./pages/ProjectGenerator";
import ShoppingCart from "./pages/ShoppingCart";
import UserDashboard from "./pages/UserDashboard";
import Social from "./pages/Social";
import Store from "./pages/Store";
// import Header from "./pages/Header";

function App() {
  return (
    <CartProvider>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/datasheets" element={<Datasheets />} />
        <Route path="/logic" element={<LogicSimulator />} />
        <Route path="/store" element={<Store />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/social" element={<Social />} />
        <Route path="/project-generator" element={<ProjectGenerator />} />
      </Routes>
    </CartProvider>
  );
}

export default App;