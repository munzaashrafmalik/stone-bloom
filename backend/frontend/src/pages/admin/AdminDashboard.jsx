import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { productsAPI, ordersAPI, usersAPI } from '../../api/axios';
import { formatPrice } from '../../utils/helpers';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStock: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        productsAPI.getAll({ limit: 1 }),
        ordersAPI.getAll({ limit: 10 }),
        usersAPI.getStats()
      ]);

      console.log('Orders Response:', ordersRes.data);

      const allProducts = await productsAPI.getAll({ limit: 1000 });
      const lowStockCount = allProducts.data.products.filter(p => p.stock < 10).length;

      // Handle different response formats
      const ordersData = ordersRes.data.orders || ordersRes.data || [];
      const totalOrders = ordersRes.data.total || ordersData.length || 0;
      const totalRevenue = ordersData.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
      const pendingCount = ordersData.filter(o => o.status === 'Pending').length;

      setStats({
        totalProducts: productsRes.data.totalProducts || 0,
        totalOrders: totalOrders,
        totalUsers: usersRes.data.totalUsers || 0,
        totalRevenue: totalRevenue,
        pendingOrders: pendingCount,
        lowStock: lowStockCount
      });

      setRecentOrders(ordersData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: FaBox, color: '#00a650' },
    { title: 'Total Orders', value: stats.totalOrders, icon: FaShoppingCart, color: '#0066cc' },
    { title: 'Total Users', value: stats.totalUsers, icon: FaUsers, color: '#ff6b35' },
    { title: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: FaRupeeSign, color: '#ffc107' }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#333' }}>Dashboard</h1>
        <Link to="/admin/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '30px' }}>
        {statCards.map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: stat.color + '15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <stat.icon style={{ fontSize: '28px', color: stat.color }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>{stat.title}</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#333' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #ff6b35'
        }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Pending Orders</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: '#ff6b35' }}>{stats.pendingOrders}</p>
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #ffc107'
        }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Low Stock Items</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: '#ffc107' }}>{stats.lowStock}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '2px solid #f0e6e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '20px', color: '#333' }}>Recent Orders</h3>
          <Link to="/admin/orders" className="btn btn-outline btn-sm">View All</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Order ID</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Customer</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Total</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.slice(0, 5).map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #f0e6e6' }}>
                  <td style={{ padding: '15px', fontWeight: '600' }}>#{order._id.toString().slice(-8).toUpperCase()}</td>
                  <td style={{ padding: '15px' }}>{order.shippingAddress?.fullName || 'N/A'}</td>
                  <td style={{ padding: '15px', fontWeight: '600', color: '#00a650' }}>
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: getStatusColor(order.status) + '15',
                      color: getStatusColor(order.status)
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: '#666' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recentOrders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>No orders yet</p>
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
    case 'Cancelled': return '#dc3545';
    default: return '#666';
  }
};

export default AdminDashboard;
