import React, { useEffect, useState } from "react";
import productsData from "../data/Products.json";
import "../App.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set products to the data from products.json
    setProducts(productsData);
  }, []);

  const handleAddToCart = (product) => {
    // You would typically implement actual cart functionality here
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Explore Our Products</h1>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card hover-lift">
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
