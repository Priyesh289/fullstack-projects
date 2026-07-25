import React, { useState } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signup, token, setToken,
        saveToken,
        setCurrentUser
    } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("1. handleSubmit called");
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return
        }

        try {
            const data = await signup(username, email, password);
            toast.success(data.message);

            if (data.success) {
                saveToken(data.token);
                setCurrentUser(data.user);
            }
            navigate('/projects');

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
                    <h1 className='auth-title'>Sign Up</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '24px' }}>
                        <label className="form-label" htmlFor="confirmPassword">name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={16} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                id="confirmPassword"
                                type="text"
                                className="form-input"
                                style={{ width: '100%', paddingLeft: '44px' }}
                                placeholder="Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

                                required
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                style={{ width: '100%', paddingLeft: '44px' }}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                style={{ width: '100%', paddingLeft: '44px' }}
                                placeholder="Must be 6+ characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>
                        Sign Up
                    </button>

                </form>
                <div className="auth-footer">
                    <span>Already have an account? </span>
                    <Link to="/login" className="auth-link">login</Link>
                </div>

            </div>
        </div>
    )
}

export default Signup