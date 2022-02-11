import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";

const CartContext = React.createContext(null);

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (e) {
  console.log("could not load cart off local storage");
  initialCart = [];
} //a cart is an array of objects[{id, sku, quanity},]

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  //persisting the cart into local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const contextValue = { cart, dispatch };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useCart must be declared within a CartProvider. Wrap a parent component in <CartProvider> to fix this error"
    );
  return context;
}
