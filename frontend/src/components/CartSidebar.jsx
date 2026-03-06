import { useCart } from '../context/CartContext';
import { FaTimes, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = cartTotal >= 5000 ? 0 : 200;
  const total = cartTotal + shipping;

  return (
    <>
      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart ({cartItems.length} items)</h3>
          <button className="close-btn" onClick={closeCart}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <FaShoppingCart />
              <p>Your cart is empty</p>
              <Link to="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item._id}-${index}`} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.images?.[0] || 'https://via.placeholder.com/90'} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  {(item.size || item.color) && (
                    <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                      {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                    </p>
                  )}
                  <div className="cart-item-quantity">
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item._id, item.quantity - 1, item.size, item.color)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item._id, item.quantity + 1, item.size, item.color)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item._id, item.size, item.color)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
              <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Subtotal:</span>
                <span>{formatPrice(cartTotal)}</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </p>
              {cartTotal >= 5000 && (
                <p style={{ color: 'var(--success)', fontSize: '13px', marginTop: '8px' }}>
                  ✓ Free shipping on orders above Rs. 5,000
                </p>
              )}
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => {
                closeCart();
                setTimeout(() => {
                  navigate('/checkout');
                }, 300);
              }}
              className="btn btn-primary btn-block"
              style={{ width: '100%' }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <div 
        className={`overlay ${isCartOpen ? 'active' : ''}`} 
        onClick={closeCart}
        style={{ display: isCartOpen ? 'block' : 'none' }}
      ></div>
    </>
  );
};

export default CartSidebar;
