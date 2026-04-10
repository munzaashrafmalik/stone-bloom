import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';
import { ordersAPI } from '../api/axios';
import { formatPrice, formatDate } from '../utils/helpers';
import { toast } from 'react-toastify';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await ordersAPI.getById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Order not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle style={{ color: 'var(--success)', fontSize: '24px' }} />;
      case 'Shipped':
      case 'Out for Delivery':
        return <FaTruck style={{ color: 'var(--primary)', fontSize: '24px' }} />;
      case 'Processing':
        return <FaBox style={{ color: 'var(--warning)', fontSize: '24px' }} />;
      default:
        return <FaClock style={{ color: '#666', fontSize: '24px' }} />;
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="section">
      <div className="container">
        {/* Back Button */}
        <Link to="/orders" className="btn btn-outline" style={{ marginBottom: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <FaArrowLeft /> Back to Orders
        </Link>

        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Order Details</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
          {/* Main Content */}
          <div>
            {/* Order Status */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              marginBottom: '25px',
              boxShadow: 'var(--shadow)',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '15px' }}>
                {getStatusIcon(order.status)}
              </div>
              <h2 style={{ fontSize: '24px', marginBottom: '10px', color: getStatusColor(order.status) }}>
                {order.status}
              </h2>
              <p style={{ color: '#666' }}>
                {order.isPaid ? '✓ Payment Received' : '⏳ Payment Pending'}
              </p>
            </div>

            {/* Order Items */}
            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '25px', boxShadow: 'var(--shadow)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '18px' }}>Order Items</h3>
              </div>
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    borderBottom: index < order.orderItems.length - 1 ? '1px solid var(--border)' : 'none'
                  }}
                >
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#f5f5f5',
                    flexShrink: 0
                  }}>
                    <img
                      src={item.image || 'https://via.placeholder.com/120'}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>{item.name}</h4>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                      Quantity: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                    </p>
                    <p style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '18px' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Shipping Address</h3>
              <div style={{ lineHeight: '1.8', color: '#666' }}>
                <p style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                  {order.shippingAddress.fullName}
                </p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p style={{ marginTop: '10px' }}>
                  <strong>Phone:</strong> {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Order Summary</h3>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Order Number</p>
                <p style={{ fontWeight: '600' }}>#{order._id.toString().slice(-8).toUpperCase()}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Order Date</p>
                <p style={{ fontWeight: '600' }}>{formatDate(order.createdAt)}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Payment Method</p>
                <p style={{ fontWeight: '600' }}>{order.paymentMethod}</p>
              </div>

              {order.trackingNumber && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Tracking Number</p>
                  <p style={{ fontWeight: '600', color: 'var(--primary)' }}>{order.trackingNumber}</p>
                </div>
              )}

              <div style={{ borderTop: '2px solid var(--border)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span>{formatPrice(order.itemsPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span>{order.shippingPrice === 0 ? 'FREE' : formatPrice(order.shippingPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#666' }}>Tax</span>
                  <span>{formatPrice(order.taxPrice)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '15px',
                  borderTop: '2px solid var(--border)'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>Total</span>
                  <span style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary)' }}>
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
              </div>

              {order.isPaid && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
                  <p style={{ color: 'var(--success)', fontWeight: '600', textAlign: 'center' }}>
                    ✓ Payment Confirmed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'var(--success)';
    case 'Shipped':
    case 'Out for Delivery':
      return 'var(--primary)';
    case 'Processing':
      return 'var(--warning)';
    case 'Cancelled':
      return 'var(--danger)';
    default:
      return 'var(--text-dark)';
  }
};

export default OrderDetail;
