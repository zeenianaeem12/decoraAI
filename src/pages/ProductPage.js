import React, { useEffect, useState } from 'react';
import productsData from '../data/Products.json';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set products to the data from products.json
    setProducts(productsData);
  }, []);

  return (
    <div>
      <h1>Explore Our Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
