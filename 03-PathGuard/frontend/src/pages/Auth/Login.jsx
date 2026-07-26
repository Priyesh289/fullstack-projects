
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ShieldAlert } from 'lucide-react';
import API_URL from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { token, setToken, saveToken, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/projects';

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.post(`${API_URL}/login`, { email, password });
      if (data.data.success) {
        saveToken(data.data.token);
        setCurrentUser(data.data.user)
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-logo-wrapper">
            <Lock size={28} color="#fff" />
          </div>
          <h1 className="auth-title">Login</h1>

        </div>



        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Security Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="email"
                type="email"
                className="form-input"
                style={{ width: '100%', paddingLeft: '44px' }}
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" htmlFor="password">Vault Access Code</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                id="password"
                type="password"
                className="form-input"
                style={{ width: '100%', paddingLeft: '44px' }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem', marginBottom: '16px' }}>
            Login
          </button>
        </form>
        <div className="auth-footer">
          <span>Create an Account? </span>
          <Link to="/Signup" className="auth-link"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login