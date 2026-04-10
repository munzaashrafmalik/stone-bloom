import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    stock: '',
    sizes: [],
    colors: [],
    isFeatured: false,
    isOnSale: false,
    discount: ''
  });

  const categories = [
    'Men Fashion', 'Women Fashion', 'Electronics', 'Home & Living',
    'Sports', 'Beauty', 'Kids', 'Accessories'
  ];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      const product = response.data;
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        category: product.category || '',
        brand: product.brand || '',
        stock: product.stock || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        isFeatured: product.isFeatured || false,
        isOnSale: product.isOnSale || false,
        discount: product.discount || ''
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock),
        discount: formData.discount ? parseInt(formData.discount) : 0
      };

      await productsAPI.update(id, productData);
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
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
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Left Column */}
          <div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Basic Information</h3>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '12px 15px', border: '1px solid var(--border)', borderRadius: '8px', fontFamily: 'inherit', resize: 'vertical' }}
                />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Pricing</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (PKR) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Original Price (PKR)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Discount Percentage (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Category & Stock</h3>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px 15px', border: '1px solid var(--border)', borderRadius: '8px' }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Sizes (comma separated)</label>
                <input
                  type="text"
                  defaultValue={formData.sizes?.join(', ')}
                  onChange={(e) => handleArrayChange('sizes', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Colors (comma separated)</label>
                <input
                  type="text"
                  defaultValue={formData.colors?.join(', ')}
                  onChange={(e) => handleArrayChange('colors', e.target.value)}
                />
              </div>
            </div>

            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Product Status</h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="isOnSale"
                    checked={formData.isOnSale}
                    onChange={handleChange}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>On Sale</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            style={{ padding: '15px 40px', fontSize: '16px' }}
          >
            {submitting ? 'Updating...' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn btn-outline"
            style={{ padding: '15px 40px', fontSize: '16px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
