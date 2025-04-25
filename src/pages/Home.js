import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/display", { state: { image } });
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
          <form onSubmit={handleSubmit} className="mt-1">
            <div className="form-group">
              <label htmlFor="prompt">
                Enter a description of your dream space:
              </label>
              <input
                id="prompt"
                type="text"
                placeholder="E.g., A modern living room with blue accents"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mb-1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image-upload">
                Upload a photo of your current space:
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="mb-1"
              />
            </div>

            <button className="btn" type="submit">
              Visualize Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
