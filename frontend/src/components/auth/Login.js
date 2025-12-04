import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Failed to log in');
            }
        } catch (error) {
            setError('Failed to log in. Please try again.');
            console.error('Login error:', error);
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">
                    Welcome Back
                </h2>
                <p className="auth-subtitle">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-link">
                        Sign up
                    </Link>
                </p>
                
                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}
                
                <form className="auth-form" onSubmit={handleSubmit}>
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
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-button"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    
                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            By signing in, you agree to our{' '}
                            <a href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms</a> and{' '}
                            <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
