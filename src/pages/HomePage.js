// src/pages/HomePage.js
import React, { useState } from 'react';
import '../styles/HomePage.css';

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Handle login logic here
    console.log('Connexion avec:', { email, password, rememberMe });
    
    // Reset form and error on success
    setError('');
  };



  const navigateToRegister = () => {
    window.location.href = '/register';
  };

  const navigateToSubscription = () => {
    window.location.href = '/subscription';
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

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
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

              <button type="submit" className="login-button">
                Se connecter
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;