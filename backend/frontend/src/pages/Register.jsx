import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);
    
    if (result.success) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '500px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px' }}>Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Muhammad Ahmed"
                  style={{ paddingLeft: '45px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ahmed@example.com"
                  style={{ paddingLeft: '45px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <FaPhone style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0300-1234567"
                  pattern="0[0-9]{10}"
                  style={{ paddingLeft: '45px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  placeholder="At least 6 characters"
                  style={{ paddingLeft: '45px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                  placeholder="Re-enter password"
                  style={{ paddingLeft: '45px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
              style={{ padding: '15px', fontSize: '16px', marginBottom: '20px' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p style={{ textAlign: 'center', color: '#666' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
