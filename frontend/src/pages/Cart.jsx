import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal >= 5000 ? 0 : 200;
  const total = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <FaShoppingCart style={{ fontSize: '100px', color: '#ddd', marginBottom: '30px' }} />
            <h2 style={{ marginBottom: '15px' }}>Your cart is empty</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Looks like you haven't added anything to your cart yet
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Shopping Cart ({cartItems.length} items)</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }}>
          {/* Cart Items */}
          <div>
            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              {cartItems.map((item, index) => (
                <div
                  key={`${item._id}-${index}`}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    borderBottom: index < cartItems.length - 1 ? '1px solid var(--border)' : 'none'
                  }}
                >
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#f5f5f5'
                  }}>
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/120'}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <Link
                      to={`/products/${item._id}`}
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        color: 'var(--text-dark)',
                        marginBottom: '8px',
                        display: 'block'
                      }}
                    >
                      {item.name}
                    </Link>

                    {(item.size || item.color) && (
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                      </p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item._id, item.quantity - 1, item.size, item.color)}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item._id, item.quantity + 1, item.size, item.color)}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)' }}>
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p style={{ fontSize: '14px', color: '#666' }}>
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id, item.size, item.color)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--danger)',
                      cursor: 'pointer',
                      fontSize: '20px',
                      padding: '10px'
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              style={{
                marginTop: '20px',
                background: 'none',
                border: '1px solid var(--danger)',
                color: 'var(--danger)',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid var(--border)' }}>
                Order Summary
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#666' }}>Subtotal ({cartItems.length} items)</span>
                  <span style={{ fontWeight: '600' }}>{formatPrice(cartTotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ fontWeight: '600', color: shipping === 0 ? 'var(--success)' : '' }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p style={{ color: 'var(--success)', fontSize: '14px', marginBottom: '15px' }}>
                    ✓ Free shipping on orders above Rs. 5,000
                  </p>
                )}
                {shipping > 0 && (
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                    Add {formatPrice(5000 - cartTotal)} more for free shipping
                  </p>
                )}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '20px',
                borderTop: '2px solid var(--border)',
                marginBottom: '25px'
              }}>
                <span style={{ fontSize: '18px', fontWeight: '700' }}>Total</span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                  {formatPrice(total)}
                </span>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate('/checkout')}
                style={{ padding: '15px', fontSize: '16px', marginBottom: '15px' }}
              >
                Proceed to Checkout <FaArrowRight style={{ marginLeft: '10px' }} />
              </button>

              <Link
                to="/products"
                className="btn btn-outline btn-block"
                style={{ padding: '15px', fontSize: '16px' }}
              >
                Continue Shopping
              </Link>

              <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  <strong>Why shop with us?</strong>
                </p>
                <ul style={{ fontSize: '14px', color: '#666', lineHeight: '2' }}>
                  <li>✓ 100% Authentic Products</li>
                  <li>✓ 7 Days Easy Returns</li>
                  <li>✓ Secure Payment Options</li>
                  <li>✓ Nationwide Delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
