import { useLocation, useParams } from "react-router-dom";
import "../App.css";

const DesignPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { image, product } = location.state || {};

  if (!image || !product) {
    return <div className="container">No product selected</div>;
  }

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Your Design</h1>
      <div className="grid">
        <div className="card">
          <h2 className="card-title">Your Room</h2>
          <img
            src={image}
            alt="Your room"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-md)",
            }}
          />
        </div>
        <div className="card">
          <h2 className="card-title">Selected Product</h2>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-md)",
            }}
          />
          <h3 className="mt-2">{product.name}</h3>
          <p className="card-body">{product.description}</p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignPage; 