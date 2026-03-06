import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item._id === product._id);
    if (exists) {
      toast.info('Already in wishlist!');
      return;
    }
    setWishlist([...wishlist, product]);
    toast.success('Added to wishlist! ❤️');
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item._id !== productId));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
