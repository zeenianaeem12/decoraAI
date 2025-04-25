import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/display', { state: { image } });
  };

  return (
    <div>
      <h1>Hi! Welcome to DecoraAI!</h1>
      <p>DecoraAI is an AI-powered interior visualization platform that transforms how people shop for
      decor. </p>
      <h2>How it Works</h2>
      <p>You can browse products, add to cart, and (eventually) order!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
