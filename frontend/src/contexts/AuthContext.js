import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            // Fetch user data
            axios.get('http://localhost:5000/api/user/profile')
                .then(res => {
                    setCurrentUser({
                        token,
                        user: res.data
                    });
                })
                .catch(err => {
                    console.error('Auth error:', err);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['x-auth-token'];
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // Register user
    const register = async (userData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', userData);
            const { token, userId, username } = res.data;
            
            // Set token in localStorage and axios headers
            localStorage.setItem('token', token);
            axios.defaults.headers.common['x-auth-token'] = token;

            setCurrentUser({
                token,
                user: { _id: userId, username, email: userData.email }
            });
            
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    // Login user
    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, userId, username } = res.data;
            
            // Set token in localStorage and axios headers
            localStorage.setItem('token', token);
            axios.defaults.headers.common['x-auth-token'] = token;

            setCurrentUser({
                token,
                user: { _id: userId, username, email }
            });
            
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        register,
        login,
        logout,
        isAuthenticated: !!currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
