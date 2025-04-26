import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../api";
import "../App.css";

const Home = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiRequest('/products/');
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('original_image', imageFile);
      
      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      const response = await apiRequest('/room-images/', 'POST', formData);
      console.log('Upload response:', response);
      setUploadedImageId(response.id);
      setShowModal(true);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    if (!uploadedImageId) return;
    // Navigate with both IDs as URL parameters
    navigate(`/design/${product.id}/${uploadedImageId}`, { 
      state: { 
        image // Keep the image in state for preview
      } 
    });
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
            {image && (
              <button 
                className="btn mt-2" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Submit Image'}
              </button>
            )}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Select a Product</h2>
            {loading ? (
              <div>Loading products...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="grid">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="card hover-lift"
                    onClick={() => handleProductSelect(product)}
                  >
                    <img
                      src={product.product_image}
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
            )}
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
