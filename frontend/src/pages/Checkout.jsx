import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../api/axios';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';
import { FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
    paymentMethod: 'COD',
    notes: ''
  });

  const shipping = cartTotal >= 5000 ? 0 : 200;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.info('Your cart is empty');
      navigate('/cart');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.images?.[0],
          size: item.size,
          color: item.color
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };

      const orderResponse = await ordersAPI.create(orderData);
      
      toast.success('Order placed successfully! We will contact you soon.');
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fff5f7 0%, #f8e8f0 100%)',
      padding: '40px 20px'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '42px', 
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #b76e79 0%, #d4a5d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '800'
          }}>
            Secure Checkout
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Complete your order in a few simple steps
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 400px', 
          gap: '40px' 
        }}>
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div style={{ 
                background: 'white', 
                padding: '35px', 
                borderRadius: '20px', 
                marginBottom: '25px',
                boxShadow: '0 10px 30px rgba(183, 110, 121, 0.15)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  marginBottom: '25px',
                  paddingBottom: '15px',
                  borderBottom: '2px solid #f0e6e6'
                }}>
                  <FaMoneyBillWave style={{ fontSize: '28px', color: '#b76e79' }} />
                  <h3 style={{ fontSize: '22px', color: '#333', fontWeight: '700' }}>
                    Shipping Information
                  </h3>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '14px'
                    }}>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Muhammad Ahmed"
                      style={{ 
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '14px'
                    }}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ahmed@example.com"
                      style={{ 
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '14px'
                    }}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="0300-1234567"
                      style={{ 
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '14px'
                    }}>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Karachi"
                      style={{ 
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: '600',
                    color: '#333',
                    fontSize: '14px'
                  }}>Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="House #, Street #, Area"
                    style={{ 
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '14px'
                    }}>Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      placeholder="75500"
                      style={{ 
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '14px'
                    }}>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      disabled
                      style={{ 
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        background: '#f5f5f5',
                        color: '#666'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ 
                background: 'white', 
                padding: '35px', 
                borderRadius: '20px', 
                marginBottom: '25px',
                boxShadow: '0 10px 30px rgba(183, 110, 121, 0.15)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  marginBottom: '25px',
                  paddingBottom: '15px',
                  borderBottom: '2px solid #f0e6e6'
                }}>
                  <FaMoneyBillWave style={{ fontSize: '28px', color: '#b76e79' }} />
                  <h3 style={{ fontSize: '22px', color: '#333', fontWeight: '700' }}>
                    Payment Method
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    border: `2px solid ${formData.paymentMethod === 'COD' ? '#4caf50' : '#e0e0e0'}`,
                    borderRadius: '15px',
                    cursor: 'pointer',
                    background: formData.paymentMethod === 'COD' ? '#e8f5e9' : 'white'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={handleChange}
                      style={{ width: '22px', height: '22px', marginRight: '15px' }}
                    />
                    <FaMoneyBillWave style={{ fontSize: '28px', color: '#4caf50', marginRight: '15px' }} />
                    <div>
                      <strong style={{ fontSize: '16px', color: '#333' }}>Cash on Delivery (COD)</strong>
                      <p style={{ fontSize: '14px', color: '#666', margin: '5px 0 0' }}>
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: '600',
                    color: '#333',
                    fontSize: '14px'
                  }}>Order Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any special instructions..."
                    style={{ 
                      width: '100%', 
                      padding: '15px', 
                      border: '2px solid #e0e0e0', 
                      borderRadius: '12px', 
                      fontSize: '15px',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                style={{ 
                  width: '100%',
                  padding: '20px',
                  fontSize: '18px',
                  background: 'linear-gradient(135deg, #b76e79 0%, #d4a5d4 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 15px 35px rgba(183, 110, 121, 0.4)',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Place Order - {formatPrice(total)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(183, 110, 121, 0.15)',
              position: 'sticky',
              top: '20px'
            }}>
              <h3 style={{ 
                fontSize: '22px', 
                marginBottom: '25px',
                color: '#333',
                fontWeight: '700',
                paddingBottom: '15px',
                borderBottom: '2px solid #f0e6e6'
              }}>
                Order Summary
              </h3>

              {/* Order Items */}
              <div style={{ 
                maxHeight: '350px', 
                overflowY: 'auto', 
                marginBottom: '25px'
              }}>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #f0e6e6'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#f5f5f5',
                      flexShrink: 0
                    }}>
                      <img 
                        src={item.images?.[0] || 'https://via.placeholder.com/80'} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        fontWeight: '600', 
                        fontSize: '14px', 
                        marginBottom: '8px',
                        color: '#333'
                      }}>{item.name}</p>
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>
                        Qty: {item.quantity}
                      </p>
                      <p style={{ fontWeight: '700', color: '#b76e79' }}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div style={{ borderTop: '2px solid #f0e6e6', paddingTop: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '12px'
                }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span style={{ fontWeight: '600' }}>{formatPrice(cartTotal)}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '12px'
                }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ 
                    fontWeight: '600', 
                    color: shipping === 0 ? '#4caf50' : '#333' 
                  }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                  borderTop: '3px solid #f0e6e6',
                  marginBottom: '25px'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>Total</span>
                  <span style={{ 
                    fontSize: '26px', 
                    fontWeight: '800', 
                    background: 'linear-gradient(135deg, #b76e79 0%, #d4a5d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Support Info */}
              <div style={{ 
                marginTop: '20px', 
                textAlign: 'center',
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '12px'
              }}>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px', fontWeight: '600' }}>
                  Need help? Contact us:
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a 
                    href="https://wa.me/923366840648" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#25D366',
                      color: 'white',
                      padding: '12px 25px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    WhatsApp
                  </a>
                  <a 
                    href="tel:+923366840648"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#007bff',
                      color: 'white',
                      padding: '12px 25px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    Call
                  </a>
                  <a 
                    href="mailto:stone.bloom09@gmail.com"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#EA4335',
                      color: 'white',
                      padding: '12px 25px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    Email
                  </a>
                </div>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '15px' }}>
                  📞 0336-6840648 | ✉️ stone.bloom09@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 968px) {
          .container {
            padding: 0 15px;
          }

          form > div {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
