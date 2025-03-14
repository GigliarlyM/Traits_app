import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ComponetArtProp } from './ArtView';

interface CartContextProps {
  cart: ComponetArtProp[];
  addToCart: (art: ComponetArtProp) => void;
  removeFromCart: (art: ComponetArtProp) => void;
  removeAllFromCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ComponetArtProp[]>([]);

  const addToCart = (art: ComponetArtProp) => {
    setCart([...cart, art]);
  };

  const removeFromCart = (art: ComponetArtProp) => {
    setCart(cart.filter((item) => item.title !== art.title));
  };

  const removeAllFromCart = () => {
    setCart([])
  }

  const value = { cart, addToCart, removeFromCart, removeAllFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};