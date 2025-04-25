import React, { useState } from "react";
import "../App.css";

const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Modern Sofa", price: 599.99, quantity: 1 },
    { id: 2, name: "Classic Table Lamp", price: 89.99, quantity: 2 },
  ]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="card">
          <p className="text-center">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="card mb-2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 className="card-title">{item.name}</h3>
                  <p
                    className="mb-1"
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "600",
                      color: "var(--text-dark)",
                    }}
                  >
                    ${item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => removeItem(item.id)}
                  style={{ marginLeft: "auto" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="card mt-3" style={{ textAlign: "right" }}>
            <h2>
              Total:{" "}
              <span style={{ color: "var(--primary)", fontWeight: "700" }}>
                ${total}
              </span>
            </h2>
            <button className="btn btn-secondary mt-2">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
