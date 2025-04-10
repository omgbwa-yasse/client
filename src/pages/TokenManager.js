// src/utils/tokenManager.js
export const setupTokenRefresh = () => {
    // Vérifier si un token existe déjà
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !tokenExpiry) return;
    
    // Calculer le délai avant rafraîchissement (2 minutes avant expiration)
    const currentTime = Date.now();
    const expiryTime = parseInt(tokenExpiry);
    const timeUntilRefresh = Math.max(0, expiryTime - currentTime - (2 * 60 * 1000));
    
    // Programmer le rafraîchissement
    setTimeout(async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('tokenExpiry', Date.now() + (12 * 60 * 1000)); // 12 minutes
          
          // Configurer le prochain rafraîchissement
          setupTokenRefresh();
        } else {
          // En cas d'échec, déconnecter l'utilisateur
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiry');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error refreshing token', error);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        window.location.href = '/login';
      }
    }, timeUntilRefresh);
  };
  
  // Pour intégrer ce script dans votre application, ajoutez ce code dans App.js:
  /*
  import { setupTokenRefresh } from './utils/tokenManager';
  
  function App() {
    useEffect(() => {
      setupTokenRefresh();
    }, []);
    
    // Votre code App.js existant...
  }
  */