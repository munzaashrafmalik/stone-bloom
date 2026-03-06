import { useState, useEffect } from 'react';
import { FaTimes, FaEnvelope, FaGift } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletterShown');
    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterShown', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast.success('Subscribed successfully! Check your email for 10% off code! 🎉');
      localStorage.setItem('newsletterShown', 'true');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal active" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '500px',
          background: 'linear-gradient(135deg, #fff5f7 0%, #f8e8f0 100%)',
          padding: '50px 40px',
          textAlign: 'center'
        }}
      >
        <button className="modal-close" onClick={handleClose}>
          <FaTimes />
        </button>

        <div style={{ fontSize: '60px', marginBottom: '20px' }}>
          <FaGift style={{ color: '#b76e79' }} />
        </div>

        {!subscribed ? (
          <>
            <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333' }}>
              Get 10% Off Your First Order!
            </h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
              Subscribe to our newsletter and receive exclusive offers, new arrivals updates, and a special 10% discount code!
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <FaEnvelope style={{ 
                    position: 'absolute', 
                    left: '15px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: '#999',
                    fontSize: '18px'
                  }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      width: '100%',
                      padding: '15px 15px 15px 50px',
                      border: '2px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                style={{ padding: '15px', fontSize: '16px' }}
              >
                Subscribe & Get 10% Off
              </button>
            </form>

            <p style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div style={{ padding: '40px 0' }}>
            <div style={{ fontSize: '60px', color: '#4caf50', marginBottom: '20px' }}>✓</div>
            <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '15px' }}>
              Thank You for Subscribing!
            </h3>
            <p style={{ fontSize: '16px', color: '#666' }}>
              Check your email for your 10% discount code!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
