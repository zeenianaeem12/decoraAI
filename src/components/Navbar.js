import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="nav-logo">DecoraAI</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
