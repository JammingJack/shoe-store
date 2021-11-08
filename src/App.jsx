import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState([]); //[{id, sku, quanity},]

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart)
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      else return [...items, { id, sku, quantity: 1 }];
    });
  }
  function updateQuantity(sku, quantity) {
    quantity === 0
      ? setCart((cart) => cart.filter((item) => item.sku !== sku))
      : setCart((cart) =>
          cart.map((item) =>
            item.sku === sku ? { ...item, quantity: quantity } : item
          )
        );
  }
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome To Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
