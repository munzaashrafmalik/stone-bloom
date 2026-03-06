import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { productsAPI } from '../api/axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const allRes = await productsAPI.getAll({ limit: 50 });
      const allProducts = allRes.data.products || [];
      
      const earrings = allProducts.filter(p => p.category === 'Earrings');
      const rings = allProducts.filter(p => p.category === 'Rings');
      
      const mixedEarrings = earrings.slice(0, 8);
      const mixedRings = rings.slice(0, 8);
      
      const featured = [
        ...mixedEarrings.slice(0, 2),
        ...mixedRings.slice(0, 2)
      ];
      
      const saleProducts = [
        ...mixedEarrings,
        ...mixedRings
      ];
      
      setFeaturedProducts(featured);
      setSaleProducts(saleProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Earrings', icon: '✨', image: 'https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710630-product-3.webp' },
    { name: 'Rings', icon: '💍', image: 'https://content.public.markaz.app/markazimagevideo/public/products/12-44-455495-product-1.jpg' },
    { name: 'Necklaces', icon: '📿', image: 'https://content.public.markaz.app/markazimagevideo/public/products/239-40-494443-product-1-withcode.jpg' }
  ];

  const ProductCard = ({ product, onQuickView }) => (
    <div className="product-card">
      {product.isOnSale && (
        <span className="product-badge sale">
          -{product.discount || Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
        </span>
      )}

      <div className="product-image">
        <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} />
        <div className="product-actions">
          <button 
            className="action-btn" 
            title="Add to Wishlist"
            onClick={() => addToWishlist(product)}
            style={{ 
              background: isInWishlist(product._id) ? '#e91e63' : 'white',
              color: isInWishlist(product._id) ? 'white' : 'var(--text-dark)'
            }}
          >
            <FaHeart />
          </button>
          <button 
            className="action-btn" 
            title="Quick View"
            onClick={() => onQuickView(product)}
          >
            <FaEye />
          </button>
          <button
            className="action-btn"
            title="Add to Cart"
            onClick={() => addToCart(product)}
            style={{ background: 'var(--primary)', color: 'white' }}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="rating-count">({product.numReviews})</span>
        </div>
        <div className="product-price">
          <span className="price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="old-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Exquisite Jewelry<br />For Every Occasion</h1>
            <p>Discover our handpicked collection of Rings, Earrings & Designer jewelry.<br/>Premium quality at affordable prices.</p>
            <Link to="/products" className="btn btn-secondary">
              🛍️ Shop Now
            </Link>
          </div>
          <div className="hero-image">
            <img src="https://i.pinimg.com/736x/e5/61/30/e56130fcd13659ff06fa958058310cbe.jpg" alt="Jewelry Collection" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Collection</h2>
          <p className="section-subtitle">Explore our beautiful jewelry collections</p>

          <div className="categories-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {categories.map((category, index) => (
              <Link 
                to={`/products?category=${category.name}`} 
                key={index} 
                className="category-card"
              >
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <h3>{category.icon} {category.name}</h3>
                  <span>Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">Handpicked selections just for you</p>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {featuredProducts.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    onQuickView={(product) => window.setQuickViewProduct && window.setQuickViewProduct(product)}
                  />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/products" className="btn btn-outline">View All Products</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Sale Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Flash Sale</h2>
          <p className="section-subtitle">Limited time offers - Grab them before they're gone!</p>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="products-grid">
              {saleProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  onQuickView={(product) => window.setQuickViewProduct && window.setQuickViewProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚚</div>
              <h3 style={{ marginBottom: '10px' }}>Free Shipping</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>On orders above Rs. 5,000</p>
            </div>
            <div>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>↩️</div>
              <h3 style={{ marginBottom: '10px' }}>Easy Returns</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>14 days return policy</p>
            </div>
            <div>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>💎</div>
              <h3 style={{ marginBottom: '10px' }}>Certified Jewelry</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>100% authentic gemstones</p>
            </div>
            <div>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📞</div>
              <h3 style={{ marginBottom: '10px' }}>24/7 Support</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Dedicated customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
