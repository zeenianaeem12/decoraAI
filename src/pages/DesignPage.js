import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequest, { BASE_URL } from "../api";
import "../App.css";

const DesignPage = () => {
  const { productId, roomImageId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mockupData, setMockupData] = useState(null);
  const { image: roomImage } = location.state || {};

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
          setMockupData(data[0]); // Get the first mockup from the response
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

  if (!roomImage || !mockupData) {
    return <div className="container">No product or room image selected</div>;
  }

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Your Design</h1>
      <div className="grid">
        <div className="card">
          <h2 className="card-title">Original Room</h2>
          <img
            src={roomImage}
            alt="Your room"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-md)",
            }}
          />
        </div>
        <div className="card">
          <h2 className="card-title">Generated Design</h2>
          <img
            src={`${BASE_URL}${mockupData.mockup_image}`}
            alt="Generated design"
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
            src={`${BASE_URL}${mockupData.product.product_image}`}
            alt={mockupData.product.name}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-md)",
            }}
          />
          <h3 className="mt-2">{mockupData.product.name}</h3>
          <p className="card-body">{mockupData.product.description}</p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            ${mockupData.product.price}
          </p>
          <p className="card-body">Category: {mockupData.product.category}</p>
          <p className="card-body">Stock: {mockupData.product.stock}</p>
        </div>
      </div>
    </div>
  );
};

export default DesignPage; 