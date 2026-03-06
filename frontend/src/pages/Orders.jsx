import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaClock, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { ordersAPI } from '../api/axios';
import { formatPrice, formatDate } from '../utils/helpers';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle style={{ color: 'var(--success)' }} />;
      case 'Shipped':
      case 'Out for Delivery':
        return <FaTruck style={{ color: 'var(--primary)' }} />;
      case 'Processing':
        return <FaBox style={{ color: 'var(--warning)' }} />;
      default:
        return <FaClock style={{ color: '#666' }} />;
    }
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
        return '#666';
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>My Orders</h1>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '12px' }}>
            <FaBox style={{ fontSize: '80px', color: '#ddd', marginBottom: '20px' }} />
            <h2 style={{ marginBottom: '15px' }}>No orders yet</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Start shopping to see your orders here
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow)'
                }}
              >
                {/* Order Header */}
                <div style={{
                  padding: '20px',
                  background: '#f8f9fa',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                      Order #{order._id.toString().slice(-8).toUpperCase()}
                    </p>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 16px',
                    background: getStatusColor(order.status) + '15',
                    borderRadius: '20px',
                    color: getStatusColor(order.status),
                    fontWeight: '600'
                  }}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                {/* Order Items */}
                <div>
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
                        width: '100px',
                        height: '100px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#f5f5f5',
                        flexShrink: 0
                      }}>
                        <img
                          src={item.image || 'https://via.placeholder.com/100'}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Link
                          to={`/products/${item.product?._id || item.product}`}
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
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                          Quantity: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                        </p>
                        <p style={{ fontWeight: '600', color: 'var(--primary)' }}>
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div style={{
                  padding: '20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                      Total Amount
                    </p>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                  <Link
                    to={`/orders/${order._id}`}
                    className="btn btn-outline"
                    style={{ padding: '12px 24px' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
