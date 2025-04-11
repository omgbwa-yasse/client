// TopBanner.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaEdit, FaSignOutAlt, FaBell } from 'react-icons/fa';
import axios from 'axios';
import '../App.css';

// Configuration d'Axios
axios.defaults.withCredentials = true; // Pour inclure les cookies dans toutes les requêtes

const TopBanner = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState({
    name: '',
    initials: '',
    isLoading: true,
    error: null
  });

  async function checkUserAuth() {
    try {
      const response = await axios.get('auth/user');
      if(response) {
        alert("Connecté");
      }
    } catch (error) {
        alert("Non Connecté");
    }
  }
  
  // Then call the function
  checkUserAuth();

  
  // Récupérer les données utilisateur depuis l'API avec Axios
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('auth/user');
        
        // Extraire le nom et créer les initiales
        const fullName = response.data.name || 'Utilisateur';
        const initials = fullName
          .split(' ')
          .map(name => name[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
        
        setUser({
          name: fullName,
          initials: initials,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Erreur API:', error);
        setUser({
          name: 'Utilisateur',
          initials: 'UT',
          isLoading: false,
          error: error.message
        });
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Logique de recherche ici
    console.log('Recherche pour:', searchValue);
  };
  
  const handleLogout = async () => {
    try {
      // Appel à votre endpoint de déconnexion avec Axios
      await axios.post('http://localhost:3000/api/auth/logout');
      
      // Redirection après déconnexion
      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      // Gérer l'erreur (afficher un message, etc.)
    }
  };
  
  return (
    <div className="top-banner">
      <div className="banner-left">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Rechercher..." 
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </form>
        
        <div className="profile-container">
          <button className="notification-button">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
          
          <div className="profile-menu-container">
            <button 
              className="profile-button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="avatar">
                <span>{user.isLoading ? '...' : user.initials}</span>
              </div>
              <span className="profile-name">{user.isLoading ? 'Chargement...' : user.name}</span>
            </button>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <button className="dropdown-item">
                  <FaUser className="dropdown-icon" />
                  <span>Mon profil</span>
                </button>
                <button className="dropdown-item">
                  <FaEdit className="dropdown-icon" />
                  <span>Éditer le profil</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FaSignOutAlt className="dropdown-icon" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="banner-right">
        <div className="app-brand">
          <span className="brand-text">CollabSuite</span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;