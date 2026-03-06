import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import NewsletterPopup from './NewsletterPopup';

const Footer = () => {
  return (
    <>
      <NewsletterPopup />
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>About Stone & Bloom</h3>
              <p>
                Pakistan's premium jewelry destination. We offer exquisite handcrafted jewelry 
                with the finest gemstones and metals. Quality and elegance guaranteed.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              </div>
            </div>

            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">All Jewelry</Link></li>
                <li><Link to="/products?category=Earrings">Earrings Collection</Link></li>
                <li><Link to="/products?category=Rings">Rings Collection</Link></li>
                <li><Link to="/products?category=Necklaces">Necklaces Collection</Link></li>
                <li><Link to="/products?category=Earrings&sale=true">Party Wear Earrings</Link></li>
                <li><Link to="/products?category=Necklaces&sale=true">Bridal Necklaces</Link></li>
                <li><Link to="/products?category=Rings&sale=true">Engagement Rings</Link></li>
                <li><Link to="/products?sale=true">Flash Sale</Link></li>
                <li><Link to="/products?featured=true">Featured Collection</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Customer Service</h3>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/shipping">Shipping & Delivery</Link></li>
                <li><Link to="/returns">Returns & Exchange Policy</Link></li>
                <li><Link to="/faq">Frequently Asked Questions</Link></li>
                <li><Link to="/track-order">Track Your Order</Link></li>
                <li><Link to="/size-guide">Ring Size Guide</Link></li>
                <li><Link to="/jewelry-care">Jewelry Care Instructions</Link></li>
                <li><Link to="/wishlist">My Wishlist</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Contact Info</h3>
              <ul className="contact-info">
                <li>
                  <FaMapMarkerAlt />
                  <span>Saddar, Karachi, Sindh, Pakistan</span>
                </li>
                <li>
                  <FaPhone />
                  <a href="tel:+923366840648" style={{ color: 'inherit', textDecoration: 'none' }}>
                    0336-6840648
                  </a>
                </li>
                <li>
                  <FaWhatsapp />
                  <a 
                    href="https://wa.me/923366840648" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#25D366', fontWeight: '600', textDecoration: 'none' }}
                  >
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <FaEnvelope />
                  <a 
                    href="mailto:stone.bloom09@gmail.com?subject=Inquiry%20-%20Stone%20%26%20Bloom"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    stone.bloom09@gmail.com
                  </a>
                </li>
              </ul>
              <div style={{ marginTop: '20px' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px' }}>
                  <strong>Business Hours:</strong>
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  Monday - Saturday: 10:00 AM - 9:00 PM<br/>
                  Sunday: 12:00 PM - 8:00 PM
                </p>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a 
                  href="https://wa.me/923366840648" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 5px 15px rgba(37, 211, 102, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
                <a 
                  href="mailto:stone.bloom09@gmail.com?subject=Inquiry%20-%20Stone%20%26%20Bloom"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#EA4335',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 5px 15px rgba(234, 67, 53, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <FaEnvelope /> Email Us
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Stone & Bloom. All rights reserved. | Made with ❤️ in Pakistan</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <Link to="/privacy" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
