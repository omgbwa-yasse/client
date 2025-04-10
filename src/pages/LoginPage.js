// src/pages/LoginPage.js
import React, { useState } from 'react';
import '../styles/HomePage.css';
import api from '../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    alert('Tentative de connexion avec:', { email, password: '****', remember_me: rememberMe });

    try {
      const response = await api.post('/auth/login', {
      email,
      password,
      remember_me: rememberMe
      });
      if (response.data.success) {
        // Sauvegarder le token et les informations utilisateur
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Calculer l'expiration du token (12min ou 24h selon remember_me)
        const expiryMinutes = rememberMe ? 1440 : 12;
        const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
        localStorage.setItem('tokenExpiry', expiryTime);
        
        // Configurer le token par défaut pour les futures requêtes
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        
        // Rediriger vers le dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Erreur lors de la connexion');
      } else {
        setError('Erreur de connexion au serveur. Veuillez réessayer plus tard.');
      }
    } finally {
    }
  };

  const navigateToRegister = () => {
    window.location.href = '/register';
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="left-panel">
          <div className="welcome-section">
            <h1>Bienvenue sur notre plateforme</h1>
            <p>Gérez vos abonnements et accédez à nos services premium.</p>
          </div>
        </div>

        <div className="right-panel">
          <div className="login-container">
            <div className="login-header">
              <h2>Connexion</h2>
              <p>Connectez-vous pour accéder à votre compte</p>
            </div>

            {error && <div className="error-message" aria-live="assertive">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  aria-required="true"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  aria-required="true"
                  required
                />
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember">Se souvenir de moi</label>
                </div>
                <a href="#" className="forgot-password">
                  Mot de passe oublié?
                </a>
              </div>

              <button 
                type="submit" 
                className="login-button" 
                disabled={isLoading} 
                aria-busy={isLoading}
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>

              <div className="register-option">
                <p>Pas encore de compte?</p>
                <button
                  type="button"
                  onClick={navigateToRegister}
                  className="register-link"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;