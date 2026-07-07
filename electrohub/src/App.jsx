import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Store from './pages/Store';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </Router>
  );
}

export default App;