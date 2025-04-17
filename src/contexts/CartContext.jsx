import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext([]);

function CartContextProvider({ children }) {
  const initialCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
  
    const existingProduct = cart.find((cartItem) => cartItem.id === product.id);
  
    if (existingProduct) {
      const updateCart = cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });
      setCart(updateCart);

    } else {
      setCart((prev) => [...prev, product]);
    }
    toast.success("Product added successfully!");
  };


  const removeFromCart = (product) => {
    
    toast.warning("Product removed successfully!");
    if (product.quantity > 1) {
      const updateCart = cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          return {
            ...cartItem,

            quantity: cartItem.quantity - 1,
          };
        } else {
          return cartItem;
        }
      });
      setCart(updateCart);
      return;
    } else {
      
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== product.id));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export { CartContext, CartContextProvider, useCart };