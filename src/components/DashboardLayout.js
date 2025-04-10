// src/components/DashboardLayout.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DashboardLayout.css';

function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Logique de déconnexion
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Acme Inc.</h2>
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>
        
        <div className="sidebar-menu">
          <Link to="/dashboard" className="menu-item active">
            <span className="menu-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          
          <Link to="/dashboard/subscriptions" className="menu-item">
            <span className="menu-icon">🔄</span>
            <span>Abonnements</span>
          </Link>
          
          <Link to="/dashboard/users" className="menu-item">
            <span className="menu-icon">👥</span>
            <span>Utilisateurs</span>
          </Link>
          
          <Link to="/dashboard/billing" className="menu-item">
            <span className="menu-icon">💳</span>
            <span>Facturation</span>
          </Link>
          
          <Link to="/dashboard/settings" className="menu-item">
            <span className="menu-icon">⚙️</span>
            <span>Paramètres</span>
          </Link>
        </div>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
          
          <div className="header-actions">
            <div className="search-bar">
              <input type="text" placeholder="Rechercher..." />
              <button>🔍</button>
            </div>
            
            <div className="notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </div>
            
            <div className="user-profile">
              <div className="avatar">JD</div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-role">Administrateur</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-main">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;