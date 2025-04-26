import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/Products.json";
import "../App.css";

const Home = () => {
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowModal(true);
    }
  };

  const handleProductSelect = (product) => {
    navigate(`/design/${product.id}`, { state: { image, product } });
  };

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">Welcome to DecoraAI!</h1>
        <p className="hero-subtitle">
          An AI-powered interior visualization platform that transforms how
          people shop for decor.
        </p>
      </section>

      <section className="container mt-3">
        <div className="card scale-in">
          <h2 className="card-title">How it Works</h2>
          <p className="card-body">
            DecoraAI is an AI-powered interior visualization platform that
            transforms how people shop for decor. Users can upload an image of
            their room and instantly see how real products – like furniture,
            lamps, and AI-generated wall-art would look in their space. DecoraAI
            simultaneously eliminates the need for an interior decorator,
            allowing users to independently and effortlessly plan out their room
            decors. The system uses advanced image generation models to place
            items intelligently, giving users a highly personalized, immersive
            experience. On the backend, businesses manage their catalog,
            pricing, and receive customer orders through a streamlined
            dashboard. DecoraAI bridges the imagination gap between browsing and
            buying home decor.
          </p>
        </div>

        <div className="card mt-2 slide-in-bottom">
          <h2 className="card-title">Visualize Your Space</h2>
          <div className="form-group">
            <label htmlFor="image-upload">
              Upload a photo of your current space:
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-1"
            />
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Select a Product</h2>
            <div className="grid">
              {productsData.map((product) => (
                <div
                  key={product.id}
                  className="card hover-lift"
                  onClick={() => handleProductSelect(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-2"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "var(--radius-md)",
                    }}
                  />
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-body">${product.price}</p>
                </div>
              ))}
            </div>
            <button
              className="btn mt-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
