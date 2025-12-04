import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiCalendar, FiEdit2, FiClock } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [lastLogin, setLastLogin] = useState('');
    const [accountCreated, setAccountCreated] = useState('');

    useEffect(() => {
        if (currentUser?.user?.createdAt) {
            const createdDate = new Date(currentUser.user.createdAt);
            setAccountCreated(createdDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));
            
            // Set last login time (for demo, using current time)
            const now = new Date();
            setLastLogin(now.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }));
        }
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    if (!currentUser) {
        return (
            <div className="dashboard-container flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading your dashboard...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <div className="dashboard-nav-inner">
                    <Link to="/" className="dashboard-logo">
                        Portfolio Dashboard
                    </Link>
                    <div className="dashboard-user">
                        <div className="dashboard-username">
                            Welcome back, <span>{currentUser.user?.username || 'User'}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="dashboard-logout"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="dashboard-main">
                <div className="dashboard-card">
                    <h1 className="dashboard-title">Dashboard Overview</h1>
                    <p className="dashboard-welcome">
                        Welcome back to your portfolio dashboard! Here you can manage your profile, 
                        view your activity, and access exclusive content. Everything you need is just 
                        a click away.
                    </p>

                    <div className="dashboard-section">
                        <h2 className="dashboard-section-title">Profile Information</h2>
                        <div className="dashboard-profile">
                            <div className="profile-item">
                                <div className="profile-label">
                                    <FiUser className="inline mr-1" /> Username
                                </div>
                                <div className="profile-value">
                                    {currentUser.user?.username || 'N/A'}
                                </div>
                            </div>
                            
                            <div className="profile-item">
                                <div className="profile-label">
                                    <FiMail className="inline mr-1" /> Email
                                </div>
                                <div className="profile-value">
                                    {currentUser.user?.email || 'N/A'}
                                </div>
                            </div>
                            
                            <div className="profile-item">
                                <div className="profile-label">
                                    <FiCalendar className="inline mr-1" /> Member Since
                                </div>
                                <div className="profile-value">
                                    {accountCreated || 'N/A'}
                                </div>
                            </div>
                            
                            <div className="profile-item">
                                <div className="profile-label">
                                    <FiClock className="inline mr-1" /> Last Login
                                </div>
                                <div className="profile-value">
                                    {lastLogin || 'Just now'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h2 className="dashboard-section-title">Quick Actions</h2>
                        <div className="quick-actions">
                            <button 
                                className="quick-action-btn"
                                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
                                onClick={() => navigate('/update-profile')}
                            >
                                <FiEdit2 /> Edit Profile
                            </button>
                            <button 
                                className="quick-action-btn"
                                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
                                onClick={() => navigate('/projects')}
                            >
                                <FiEdit2 /> View Projects
                            </button>
                            <button 
                                className="quick-action-btn"
                                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)' }}
                                onClick={() => navigate('/settings')}
                            >
                                <FiEdit2 /> Account Settings
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
