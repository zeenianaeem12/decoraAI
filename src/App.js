import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import DisplayImage from './pages/DisplayImage';
import DesignPage from './pages/DesignPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/display" element={<DisplayImage />} />
        <Route path="/design/:productId/:roomImageId" element={<DesignPage />} />
      </Routes>
    </Router>
  );
}

export default App;
