import React, { useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Modern Sofa", price: 599.99, quantity: 1 },
    { id: 2, name: "Classic Table Lamp", price: 89.99, quantity: 2 }
  ]);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${total}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
