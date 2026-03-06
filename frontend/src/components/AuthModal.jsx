import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaTimes } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login({ email: formData.email, password: formData.password });
    } else {
      result = await register(formData);
    }

    if (result.success) {
      onClose();
      setFormData({ name: '', email: '', password: '', phone: '' });
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <button
            className={`btn ${isLogin ? 'btn-primary' : 'btn-outline'} btn-block`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline'} btn-block`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0300-1234567"
                pattern="0[0-9]{10}"
                title="Please enter a valid Pakistani phone number"
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
            style={{ marginTop: '10px' }}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Demo Admin: admin@pakistani-store.com / admin123
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
