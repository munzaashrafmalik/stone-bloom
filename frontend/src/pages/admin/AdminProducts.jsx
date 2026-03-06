import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { productsAPI } from '../../api/axios';
import { formatPrice } from '../../utils/helpers';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 100 });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productsAPI.delete(id);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px' }}>Products Management</h1>
        <Link to="/admin/products/add" className="btn btn-primary">
          <FaPlus style={{ marginRight: '10px' }} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '25px', boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Search</label>
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Product</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Stock</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/50'}
                      alt={product.name}
                      style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <p style={{ fontWeight: '600' }}>{product.name}</p>
                      <p style={{ fontSize: '13px', color: '#666' }}>{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    background: '#e8f5e9',
                    color: '#00a650'
                  }}>
                    {product.category}
                  </span>
                </td>
                <td style={{ padding: '15px', fontWeight: '600', color: 'var(--primary)' }}>
                  {formatPrice(product.price)}
                  {product.originalPrice && (
                    <span style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through', marginLeft: '8px' }}>
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ color: product.stock < 10 ? 'var(--danger)' : 'var(--success)', fontWeight: '600' }}>
                    {product.stock} {product.stock < 10 && '(Low)'}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {product.isFeatured && (
                      <span style={{ padding: '3px 8px', background: '#0066cc15', color: '#0066cc', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                        Featured
                      </span>
                    )}
                    {product.isOnSale && (
                      <span style={{ padding: '3px 8px', background: '#ffc10715', color: '#ff6b35', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                        Sale
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-outline btn-sm"
                      title="View"
                      style={{ padding: '8px 12px' }}
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="btn btn-outline btn-sm"
                      title="Edit"
                      style={{ padding: '8px 12px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm"
                      title="Delete"
                      style={{ padding: '8px 12px', background: 'var(--danger)', color: 'white', border: 'none' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
