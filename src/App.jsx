import React, { useReducer, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";
import { CartContext } from "./CartContext";

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (e) {
  console.log("could not load cart off local storage");
  initialCart = [];
} //a cart is an array of objects[{id, sku, quanity},]

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  //persisting the cart into local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome To Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            ></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}
