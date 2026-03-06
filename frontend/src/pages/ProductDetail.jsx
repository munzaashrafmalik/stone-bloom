import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaShare, FaStar } from 'react-icons/fa';
import { productsAPI } from '../api/axios';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data);
      if (response.data.sizes?.length) setSelectedSize(response.data.sizes[0]);
      if (response.data.colors?.length) setSelectedColor(response.data.colors[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Out of stock');
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="section">
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '30px' }}>
          <Link to="/" style={{ color: '#666' }}>Home</Link>
          <span style={{ margin: '0 10px' }}>/</span>
          <Link to="/products" style={{ color: '#666' }}>Products</Link>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--primary)' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
          {/* Images */}
          <div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', background: '#f5f5f5' }}>
              <img 
                src={product.images?.[selectedImage] || 'https://via.placeholder.com/500'} 
                alt={product.name}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
              />
            </div>
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      border: selectedImage === index ? '2px solid var(--primary)' : '2px solid transparent',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      width: '80px',
                      height: '80px',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '28px', margin: '10px 0' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="stars" style={{ color: '#ffc107', fontSize: '18px' }}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span>({product.numReviews} reviews)</span>
              </div>
              {product.stock > 0 ? (
                <span style={{ color: 'var(--success)', fontWeight: '600' }}>✓ In Stock</span>
              ) : (
                <span style={{ color: 'var(--danger)', fontWeight: '600' }}>✗ Out of Stock</span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '25px' }}>
              <span style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '20px', color: '#999', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.isOnSale && (
                <span style={{ 
                  background: 'var(--danger)', 
                  color: 'white', 
                  padding: '5px 12px', 
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Save {product.discount || Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Size</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '12px 20px',
                        border: selectedSize === size ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: selectedSize === size ? 'var(--primary)' : 'white',
                        color: selectedSize === size ? 'white' : 'var(--text-dark)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: '25px' }}>
                <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Color</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '12px 20px',
                        border: selectedColor === color ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: selectedColor === color ? 'var(--primary)' : 'white',
                        color: selectedColor === color ? 'white' : 'var(--text-dark)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Quantity</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border)',
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border)',
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  +
                </button>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  (Available: {product.stock})
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{ flex: 1, padding: '15px', fontSize: '16px' }}
              >
                <FaShoppingCart style={{ marginRight: '10px' }} />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="btn btn-outline" style={{ padding: '15px' }}>
                <FaHeart />
              </button>
              <button className="btn btn-outline" onClick={handleShare} style={{ padding: '15px' }}>
                <FaShare />
              </button>
            </div>

            {/* Additional Info */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '25px' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Brand:</strong> {product.brand || 'N/A'}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Category:</strong> {product.category}
              </div>
              <div>
                <strong>Shipping:</strong> {product.price >= 5000 ? 'Free Shipping' : 'Rs. 200'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
