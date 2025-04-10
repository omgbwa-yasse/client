// src/pages/RegisterPage.js
import React, { useState } from 'react';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    // Nom validation
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simuler un appel API
      setTimeout(() => {
        console.log('Formulaire soumis:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Redirection après création réussie
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };
  
  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <button className="back-button" onClick={goBack}>
          ← Retour
        </button>
        
        <div className="register-header">
          <h1>Créer un compte</h1>
          <p>Rejoignez notre plateforme pour accéder à tous nos services</p>
        </div>
        
        {submitSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Compte créé avec succès!</h2>
            <p>Vous allez être redirigé vers la page de connexion...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Entrez votre nom"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Créez un mot de passe"
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <div className="error-text">{errors.password}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && (
                  <div className="error-text">{errors.confirmPassword}</div>
                )}
              </div>
            </div>
            
            <div className="form-group terms-checkbox">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">
                J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a>
              </label>
              {errors.agreeTerms && <div className="error-text">{errors.agreeTerms}</div>}
            </div>
            
            <button
              type="submit"
              className="register-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
            </button>
            
            <div className="login-link">
              Déjà un compte? <a href="/">Se connecter</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;