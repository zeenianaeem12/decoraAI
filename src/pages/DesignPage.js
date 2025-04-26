import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequest, { BASE_URL } from "../api";
import "../App.css";

const DesignPage = () => {
  const { productId, roomImageId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mockups, setMockups] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const generateMockup = async () => {
      try {
        if (roomImageId && productId) {
          setLoading(true);
          const payload = {
            product_id: parseInt(productId),
            position_x: 0.5,
            position_y: 0.5,
            scale: 1.0,
            rotation: 0
          };
          
          const data = await apiRequest(`/room-images/${roomImageId}/generate_mockup/`, 'POST', payload);
          setMockups(data); // Save all mockups
          if (data.length > 0) {
            setProduct(data[0].product); // Get product info from first mockup
          }
          setError(null);
        }
      } catch (err) {
        console.error('Error generating mockup:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    generateMockup();
  }, [productId, roomImageId]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  if (!mockups.length || !product) {
    return <div className="container">No mockups generated</div>;
  }

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Your Design Options</h1>
      
      {/* Product Information */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="card-body">{product.description}</p>
          <p style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "var(--text-dark)",
          }}>
            ${product.price}
          </p>
          <p className="card-body">Category: {product.category}</p>
          <p className="card-body">Stock: {product.stock}</p>
        </div>
      </div>

      {/* Mockup Images Grid */}
      <div className="grid">
        {mockups.map((mockup, index) => (
          <div key={index} className="card">
            <h3 className="card-title">Option {index + 1}</h3>
            <img
              src={`${BASE_URL}${mockup.mockup_image}`}
              alt={`Generated design ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "var(--radius-md)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPage; 