import { useState, useEffect } from 'react';
import { FaTimes, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/helpers';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Don't render if no product
  if (!product) return null;

  // Set defaults when product changes
  useEffect(() => {
    setSelectedSize(product.sizes?.[0] || null);
    setSelectedColor(product.colors?.[0] || null);
  }, [product]);

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Image */}
          <div>
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/400'} 
              alt={product.name}
              style={{ width: '100%', borderRadius: '15px' }}
            />
          </div>

          {/* Details */}
          <div>
            <span className="product-category">{product.category}</span>
            <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>{product.name}</h2>
            
            <div className="product-rating" style={{ marginBottom: '15px' }}>
              <span className="stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-count">({product.numReviews} reviews)</span>
            </div>

            <div className="product-price" style={{ marginBottom: '20px' }}>
              <span className="price" style={{ fontSize: '28px' }}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="old-price" style={{ fontSize: '20px' }}>{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '25px' }}>{product.description}</p>

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Size</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '10px 20px',
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

            {/* Color */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Color</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '10px 20px',
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

            {/* Actions */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={() => addToCart(product, 1, selectedSize, selectedColor)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <FaShoppingCart style={{ marginRight: '8px' }} />
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="btn btn-outline"
              >
                <FaHeart />
              </button>
            </div>

            {/* Info */}
            <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '14px', color: '#666' }}>
                <strong>Brand:</strong> {product.brand || 'N/A'}
              </p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                <strong>Availability:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                <strong>Shipping:</strong> {product.price >= 5000 ? 'Free' : 'Rs. 200'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
