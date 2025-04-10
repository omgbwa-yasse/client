// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
      // Token non présent ou expiré
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
      window.location.href = '/';
      return;
    }

    // Configurer le token dans les headers
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Récupérer les informations de l'utilisateur depuis l'API ou le localStorage
    const fetchUser = async () => {
      try {
        // Option 1: Utiliser les données stockées dans localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        // Option 2: Faire une requête à l'API pour des informations à jour
        const response = await api.get('/user');
        
        if (response.data.success) {
          setUser(response.data.user);
          // Mettre à jour les informations stockées
          localStorage.setItem('user', JSON.stringify(response.data.user));
        } else {
          throw new Error('Impossible de récupérer les informations utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        
        // Si l'erreur est 401 (non autorisé), rediriger vers la page de connexion
        if (error.response && error.response.status === 401) {
          setError('Session expirée. Veuillez vous reconnecter.');
          // Supprimer les informations de session
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('tokenExpiry');
          
          // Rediriger après un court délai
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          setError('Erreur lors du chargement des données. Veuillez réessayer.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    
    // Planifier un rafraîchissement de token avant expiration
    const checkAndRefreshToken = async () => {
      const currentTime = Date.now();
      const expiryTime = parseInt(localStorage.getItem('tokenExpiry'));
      
      // Si le token expire dans moins de 2 minutes
      if (expiryTime - currentTime < 2 * 60 * 1000) {
        try {
          // Appeler l'API pour rafraîchir le token
          const response = await api.post('/refresh-token');
          
          if (response.data.success) {
            // Mettre à jour le token
            localStorage.setItem('token', response.data.access_token);
            // Mettre à jour l'expiration (12 minutes)
            localStorage.setItem('tokenExpiry', Date.now() + (12 * 60 * 1000));
            // Mettre à jour le header Authorization
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
          }
        } catch (error) {
          console.error('Erreur lors du rafraîchissement du token:', error);
        }
      }
    };
    
    // Vérifier le token toutes les minutes
    const tokenInterval = setInterval(checkAndRefreshToken, 60 * 1000);
    
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(tokenInterval);
  }, []);

  const handleLogout = async () => {
    try {
      // Appeler l'API pour déconnecter l'utilisateur
      await api.post('/logout');
      
      // Supprimer les informations de session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
      
      // Rediriger vers la page de connexion
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      
      // En cas d'erreur, forcer la déconnexion côté client
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">!</div>
        <h2>Une erreur est survenue</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-logo">
          <h1>Ma Plateforme</h1>
        </div>
        <div className="dashboard-user-info">
          <span className="user-name">{user?.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <div className="welcome-card">
          <h1>Bienvenue, {user?.name}!</h1>
          <p>Vous êtes maintenant connecté à votre compte.</p>
          <p>Email: {user?.email}</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;