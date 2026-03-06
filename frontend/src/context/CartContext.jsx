import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item._id === product._id && item.size === size && item.color === color
      );

      if (existing) {
        toast.info('Quantity updated in cart');
        return prev.map(item =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      toast.success('Added to cart!');
      return [...prev, { ...product, quantity, size, color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size = null, color = null) => {
    setCartItems(prev => {
      return prev.filter(
        item => !(item._id === productId && item.size === size && item.color === color)
      );
    });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, quantity, size = null, color = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item._id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    isCartOpen,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
