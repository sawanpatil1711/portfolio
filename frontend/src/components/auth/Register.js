import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = formData;
    useEffect(()=>{
        
    },[])
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);

        try {
            const result = await register({ username, email, password });
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Failed to create an account');
            }
        } catch (error) {
            setError('Failed to create an account. Please try again.');
            console.error('Registration error:', error);
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">
                    Create Account
                </h2>
                <p className="auth-subtitle">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                        Sign in
                    </Link>
                </p>
                
                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="form-input"
                            placeholder="Choose a username"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email-address" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="form-input"
                            placeholder="Create a password"
                            value={password}
                            onChange={handleChange}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Use 8 or more characters with a mix of letters, numbers & symbols
                        </p>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirm-password" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="form-input"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-button"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    
                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            By creating an account, you agree to our{' '}
                            <a href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms</a> and{' '}
                            <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
