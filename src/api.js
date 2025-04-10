import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les réponses
api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        // Cas spécial pour 401 (non autorisé)
        if (error.response && error.response.status === 401) {
            // Vérifier si c'est un problème de token expiré
            const originalRequest = error.config;
            
            // Ne pas entrer dans une boucle infinie
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                
                try {
                    // Essayer de rafraîchir le token
                    const response = await axios.post('http://127.0.0.1:8000/api/refresh-token', {}, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    });
                    
                    if (response.data.success) {
                        // Mise à jour du token
                        localStorage.setItem('token', response.data.access_token);
                        localStorage.setItem('tokenExpiry', Date.now() + (12 * 60 * 1000));
                        
                        // Mettre à jour le header et réessayer la requête
                        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
                        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                        
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    // En cas d'échec, rediriger vers la connexion
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('tokenExpiry');
                    window.location.href = '/';
                }
            } else {
                // Si on a déjà essayé de rafraîchir le token, déconnecter
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('tokenExpiry');
                window.location.href = '/';
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;