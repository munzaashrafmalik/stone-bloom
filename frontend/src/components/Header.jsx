import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaHeart, FaBox, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import AuthModal from './AuthModal';
import WishlistSidebar from './WishlistSidebar';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (
    <>
      <header className="header">
        <div className="top-bar">
          <div className="container">
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div style={{ display: 'inline-block', animation: 'scroll-left 20s linear infinite' }}>
                <span>✨ <strong>New Collection!</strong> Trendy Jewelry Starting at Rs. 350 | 🚚 Free Shipping on Orders Above Rs. 5,000</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', float: 'right' }}>
              <a 
                href="https://wa.me/923366840648" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: '#25D366', 
                  fontSize: '20px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                title="Chat on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=stone.bloom09@gmail.com&su=Inquiry&body=Hi%20Stone%20%26%20Bloom%20Team,"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  background: 'none',
                  border: 'none',
                  color: '#EA4335', 
                  fontSize: '20px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                title="Email Us (Gmail)"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>

        <div className="header-main">
          <div className="container">
            <Link to="/" className="logo">
              <span className="logo-icon">💎</span>
              <span>Stone & Bloom</span>
            </Link>

            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>

            <div className="header-actions">
              {isAuthenticated ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="header-icon" style={{ color: '#b76e79' }}>
                      <FaBox />
                      <span>Admin</span>
                    </Link>
                  )}
                  <div 
                    className="header-icon" 
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    onMouseEnter={() => setUserMenuOpen(true)}
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <FaUser />
                    <span>{user.name.split(' ')[0]}</span>
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: 'white',
                      boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
                      borderRadius: '8px',
                      padding: '10px',
                      minWidth: '180px',
                      zIndex: 100,
                      display: userMenuOpen ? 'block' : 'none',
                      marginTop: '5px'
                    }}>
                      {user.role === 'admin' && (
                        <Link to="/admin" style={{ display: 'block', padding: '8px', color: '#b76e79', fontWeight: '600', borderRadius: '5px', marginBottom: '5px' }}>
                          <FaBox style={{ marginRight: '8px' }} /> Admin Dashboard
                        </Link>
                      )}
                      <Link to="/orders" style={{ display: 'block', padding: '8px', color: '#333', borderRadius: '5px', marginBottom: '5px' }}>
                        📦 My Orders
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        style={{ width: '100%', textAlign: 'left', padding: '8px', border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545', borderRadius: '5px' }}
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="header-icon" onClick={() => setAuthModalOpen(true)}>
                  <FaUser />
                  <span>Login</span>
                </div>
              )}

              {/* Wishlist Icon */}
              <div 
                className="header-icon" 
                onClick={() => setWishlistOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                <FaHeart />
                <span>Wishlist</span>
                {wishlistCount > 0 && <span className="cart-count">{wishlistCount}</span>}
              </div>

              <div className="header-icon" onClick={openCart}>
                <FaShoppingCart />
                <span>Cart</span>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>

              <button 
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        <nav className="nav-menu" style={{ display: mobileMenuOpen ? 'flex' : 'none', flexDirection: 'column' }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link to="/products?category=Men Fashion" onClick={() => setMobileMenuOpen(false)}>Men's Fashion</Link>
          <Link to="/products?category=Women Fashion" onClick={() => setMobileMenuOpen(false)}>Women's Fashion</Link>
          <Link to="/products?category=Electronics" onClick={() => setMobileMenuOpen(false)}>Electronics</Link>
          <Link to="/products?category=Home & Living" onClick={() => setMobileMenuOpen(false)}>Home & Living</Link>
          <Link to="/products?category=Kids" onClick={() => setMobileMenuOpen(false)}>Kids</Link>
          <Link to="/products?category=Sports" onClick={() => setMobileMenuOpen(false)}>Sports</Link>
        </nav>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <WishlistSidebar isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
};

export default Header;
