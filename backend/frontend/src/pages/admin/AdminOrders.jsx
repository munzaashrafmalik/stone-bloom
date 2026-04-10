import { useState, useEffect } from 'react';
import { FaEye, FaTruck, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { ordersAPI } from '../../api/axios';
import { formatPrice, formatDate } from '../../utils/helpers';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      const params = filterStatus ? { status: filterStatus } : {};
      const response = await ordersAPI.getAll(params);
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await ordersAPI.updateStatus(orderId, { status });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      ));
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const markDelivered = async (orderId) => {
    try {
      await ordersAPI.deliver(orderId);
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: 'Delivered', isDelivered: true } : order
      ));
      toast.success('Order marked as delivered');
    } catch (error) {
      console.error('Error marking delivered:', error);
      toast.error('Failed to update order');
    }
  };

  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id.toString().toLowerCase().includes(searchLower) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(searchLower) ||
      order.shippingAddress?.phone?.includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>Orders Management</h1>
        <p style={{ color: '#666' }}>Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div style={{ 
        background: 'white', 
        padding: '25px', 
        borderRadius: '15px', 
        marginBottom: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block', color: '#333' }}>
              Search Orders
            </label>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#999' 
              }} />
              <input
                type="text"
                placeholder="Order ID, Customer Name, Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '12px 15px 12px 45px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block', color: '#333' }}>
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ 
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Order ID</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Customer</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Items</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Total</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Payment</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Date</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #f0e6e6' }}>
                  <td style={{ padding: '15px', fontWeight: '600' }}>
                    #{order._id.toString().slice(-8).toUpperCase()}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div>
                      <p style={{ fontWeight: '600', marginBottom: '3px' }}>{order.shippingAddress?.fullName}</p>
                      <p style={{ fontSize: '13px', color: '#666' }}>{order.shippingAddress?.phone}</p>
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>{order.orderItems?.length || 0} items</td>
                  <td style={{ padding: '15px', fontWeight: '600', color: '#00a650' }}>
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: order.isPaid ? '#e8f5e9' : '#fff3e0',
                      color: order.isPaid ? '#00a650' : '#ff9800'
                    }}>
                      {order.isPaid ? '✓ Paid' : '⏳ Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '20px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: getStatusColor(order.status) + '15',
                        color: getStatusColor(order.status),
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '15px', color: '#666' }}>
                    {formatDate(order.createdAt)}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => window.open(`/orders/${order._id}`, '_blank')}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '8px 12px' }}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                        <button
                          onClick={() => markDelivered(order._id)}
                          className="btn btn-sm"
                          style={{ padding: '8px 12px', background: '#00a650', color: 'white', border: 'none' }}
                          title="Mark Delivered"
                        >
                          <FaCheck />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
            <FaTruck style={{ fontSize: '60px', marginBottom: '20px', opacity: 0.3 }} />
            <p style={{ fontSize: '18px' }}>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return '#00a650';
    case 'Shipped': return '#0066cc';
    case 'Processing': return '#ffc107';
    case 'Pending': return '#ff6b35';
    case 'Out for Delivery': return '#9c27b0';
    case 'Cancelled': return '#dc3545';
    default: return '#666';
  }
};

export default AdminOrders;
