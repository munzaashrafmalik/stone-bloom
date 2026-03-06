import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCrown } from 'react-icons/fa';
import { usersAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        usersAPI.getAll({ limit: 100 }),
        usersAPI.getStats()
      ]);
      setUsers(usersRes.data.users || []);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await usersAPI.update(userId, { role: newRole });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
      toast.success('User role updated');
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await usersAPI.delete(userId);
      setUsers(users.filter(user => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
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
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Users Management</h1>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Total Users</p>
          <p style={{ fontSize: '28px', fontWeight: '700' }}>{stats.totalUsers || 0}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>New Users (Today)</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>{stats.newUsersToday || 0}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>New Users (Week)</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary)' }}>{stats.newUsersThisWeek || 0}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Admin Users</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--warning)' }}>{stats.adminUsers || 0}</p>
        </div>
      </div>

      {/* Users Table */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>User</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Phone</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Role</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Joined</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600',
                      fontSize: '18px'
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600' }}>{user.name}</p>
                      {user.role === 'admin' && (
                        <span style={{ fontSize: '12px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <FaCrown /> Admin
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '15px' }}>{user.email}</td>
                <td style={{ padding: '15px', color: '#666' }}>{user.phone || 'N/A'}</td>
                <td style={{ padding: '15px' }}>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '20px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: user.role === 'admin' ? '#ffc10715' : '#e8f5e9',
                      color: user.role === 'admin' ? '#ff9800' : '#00a650',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={{ padding: '15px', color: '#666' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '15px' }}>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm"
                    style={{ padding: '8px 12px', background: 'var(--danger)', color: 'white', border: 'none' }}
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
