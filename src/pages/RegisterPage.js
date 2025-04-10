// src/pages/RegisterPage.js
import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    // Confirm password validation
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
    }
    
    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setApiError('');
      
      try {
        // Préparation des données pour l'API
        const apiData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation
        };
        
        // Appel à l'API d'enregistrement
        const response = await axios.post('/register', apiData);
        
        if (response.data.success) {
          setSubmitSuccess(true);
          
          // Stockage des informations utilisateur dans localStorage si nécessaire
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          
          // Redirection après création réussie
          setTimeout(() => {
            window.location.href = '/Dashboard';
          }, 2000);
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        
        if (error.response && error.response.data) {
          // Gérer les erreurs de validation renvoyées par l'API
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else {
            // Message d'erreur général
            setApiError(error.response.data.message || 'Une erreur est survenue lors de l\'inscription.');
          }
        } else {
          setApiError('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
        }
      } finally {
        setIsSubmitting(false);
      }
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
            {apiError && <div className="api-error-message">{apiError}</div>}
            
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
              {errors.name && <div className="error-text">{typeof errors.name === 'string' ? errors.name : errors.name[0]}</div>}
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
              {errors.email && <div className="error-text">{typeof errors.email === 'string' ? errors.email : errors.email[0]}</div>}
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
                {errors.password && <div className="error-text">{typeof errors.password === 'string' ? errors.password : errors.password[0]}</div>}
                <div className="password-requirements">
                  Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password_confirmation">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  className={errors.password_confirmation ? 'input-error' : ''}
                />
                {errors.password_confirmation && (
                  <div className="error-text">{typeof errors.password_confirmation === 'string' ? errors.password_confirmation : errors.password_confirmation[0]}</div>
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