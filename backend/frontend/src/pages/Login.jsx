import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData);
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fff5f7 0%, #f8e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%',
        background: 'white', 
        padding: '50px 40px', 
        borderRadius: '25px', 
        boxShadow: '0 20px 60px rgba(183, 110, 121, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ 
            fontSize: '50px', 
            color: '#b76e79', 
            marginBottom: '15px' 
          }}>
            <FaSignInAlt />
          </div>
          <h2 style={{ 
            fontSize: '32px', 
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #b76e79 0%, #d4a5d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '800'
          }}>
            Welcome Back
          </h2>
          <p style={{ color: '#666', fontSize: '15px' }}>
            Login to continue shopping at Stone & Bloom
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ 
                position: 'absolute', 
                left: '18px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#b76e79',
                fontSize: '18px'
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@stoneandbloom.com"
                style={{ 
                  width: '100%',
                  paddingLeft: '50px',
                  paddingRight: '20px',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ 
                position: 'absolute', 
                left: '18px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#b76e79',
                fontSize: '18px'
              }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{ 
                  width: '100%',
                  paddingLeft: '50px',
                  paddingRight: '20px',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#b76e79'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '18px', 
              fontSize: '17px', 
              marginBottom: '25px',
              background: 'linear-gradient(135deg, #b76e79 0%, #d4a5d4 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(183, 110, 121, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? (
              <span>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '10px' }}>⏳</span>
                Logging in...
              </span>
            ) : (
              <span>
                <FaSignInAlt style={{ marginRight: '10px' }} />
                Login to Your Account
              </span>
            )}
          </button>

          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <Link to="/register" style={{ 
              color: '#b76e79', 
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>
              Don't have an account? <span style={{ textDecoration: 'underline' }}>Register here</span>
            </Link>
          </div>

          <div style={{ 
            padding: '25px', 
            background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', 
            borderRadius: '15px',
            border: '2px solid rgba(76, 175, 80, 0.2)'
          }}>
            <p style={{ 
              fontWeight: '700', 
              marginBottom: '15px',
              color: '#2e7d32',
              fontSize: '15px',
              textAlign: 'center'
            }}>
              ✨ New Customer?
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: '#555',
              textAlign: 'center',
              marginBottom: '15px',
              lineHeight: '1.6'
            }}>
              Create your own account to shop and track orders!
            </p>
            <Link to="/register" style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              📝 Create Account
            </Link>
            <p style={{ 
              fontSize: '12px', 
              color: '#888', 
              textAlign: 'center', 
              marginTop: '15px',
              fontStyle: 'italic'
            }}>
              Takes less than 2 minutes! ⏱️
            </p>
          </div>
        </form>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Login;
