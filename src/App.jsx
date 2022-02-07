import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch (e) {
      console.log("could not load cart off local storage");
      return [];
    }
  }); //[{id, sku, quanity},]

  //persisting the cart into local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
            <Route path="/checkout" element={<Checkout cart={cart} />}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
