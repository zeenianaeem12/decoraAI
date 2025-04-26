import React, { useEffect, useState } from "react";
import apiRequest from "../api";
import "../App.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiRequest('/products');
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

  const handleAddToCart = (product) => {
    // You would typically implement actual cart functionality here
    console.log(`Added ${product.name} to cart`);
  };

  if (loading) {
    return <div className="container">Loading products...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Explore Our Products</h1>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card hover-lift">
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
            <h2 className="card-title">{product.name}</h2>
            <p className="card-body">{product.description}</p>
            <p
              className="mb-2"
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "var(--text-dark)",
              }}
            >
              ${product.price}
            </p>
            <button className="btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
