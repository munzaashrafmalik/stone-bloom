import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../../api/axios';
import { toast } from 'react-toastify';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Rings',
    brand: 'Stone & Bloom',
    stock: '',
    sizes: [],
    colors: [],
    imageUrl: '',
    isFeatured: false,
    isOnSale: false,
    discount: ''
  });

  const categories = [
    'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bridal Sets', 
    'Anklets', 'Hair Clips', 'Chokers', 'Brooches', "Men's Jewelry", 
    "Kids Jewelry", 'Watches'
  ];

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
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock),
        discount: formData.discount ? parseInt(formData.discount) : 0,
        images: [formData.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500']
      };

      await productsAPI.create(productData);
      toast.success('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Add New Product</h1>

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
                  placeholder="Enter product name"
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
                  placeholder="Enter product description"
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
                  placeholder="e.g., Stone & Bloom"
                />
              </div>

              <div className="form-group">
                <label>Image URL *</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://i.pinimg.com/736x/..."
                  style={{ width: '100%', padding: '12px 15px', border: '1px solid var(--border)', borderRadius: '8px', fontFamily: 'inherit' }}
                />
                <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                  Paste image URL from Pinterest, Unsplash, or any image hosting site
                </p>
                {formData.imageUrl && (
                  <div style={{ marginTop: '15px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--border)' }}>
                    <img 
                      src={formData.imageUrl} 
                      alt="Product Preview" 
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
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
                    placeholder="2500"
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
                    placeholder="3500"
                    min="0"
                  />
                  <p style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>Leave empty if no discount</p>
                </div>
              </div>

              <div className="form-group">
                <label>Discount Percentage (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="25"
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
                  placeholder="100"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Sizes (comma separated)</label>
                <input
                  type="text"
                  placeholder="S, M, L, XL"
                  onChange={(e) => handleArrayChange('sizes', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Colors (comma separated)</label>
                <input
                  type="text"
                  placeholder="Red, Blue, Black"
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
                <p style={{ fontSize: '13px', color: '#666', marginLeft: '30px', marginTop: '5px' }}>
                  Show on homepage featured section
                </p>
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
                <p style={{ fontSize: '13px', color: '#666', marginLeft: '30px', marginTop: '5px' }}>
                  Show sale badge on product
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ padding: '15px 40px', fontSize: '16px' }}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
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

export default AdminAddProduct;
