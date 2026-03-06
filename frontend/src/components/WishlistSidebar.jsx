import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FaTimes, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

const WishlistSidebar = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`} style={{ width: '400px' }}>
        <div className="cart-header">
          <h3>
            <FaHeart style={{ marginRight: '10px', color: '#e91e63' }} />
            My Wishlist ({wishlist.length})
          </h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-items">
          {wishlist.length === 0 ? (
            <div className="empty-cart" style={{ padding: '60px 20px' }}>
              <FaHeart style={{ fontSize: '80px', marginBottom: '20px', opacity: 0.3, color: '#e91e63' }} />
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>Your wishlist is empty</p>
              <Link to="/products" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          ) : (
            wishlist.map((item, index) => (
              <div key={`${item._id}-${index}`} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.images?.[0] || 'https://via.placeholder.com/90'} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item._id);
                      }}
                      style={{ flex: 1, padding: '8px' }}
                    >
                      <FaShoppingCart style={{ marginRight: '5px' }} />
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => removeFromWishlist(item._id)}
                      style={{ padding: '8px 12px', color: '#e91e63', borderColor: '#e91e63' }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
    </>
  );
};

export default WishlistSidebar;
