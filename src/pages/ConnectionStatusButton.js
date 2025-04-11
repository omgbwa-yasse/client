import { useState, useEffect } from 'react';

export default function ConnectionStatusButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  // URL spécifique à vérifier
  const serverUrl = "http://localhost:3000/api/auth/user";

  // Fonction pour vérifier la connexion au serveur
  const checkServerConnection = async () => {
    setIsChecking(true);
    try {
      // Vérification réelle de l'URL spécifiée
      const response = await fetch(serverUrl, {
        method: 'GET',
        // Mode CORS pour permettre les requêtes cross-origin si nécessaire
        mode: 'cors',
        // Timeout de 5 secondes
        signal: AbortSignal.timeout(5000)
      });
      
      // Si le serveur répond avec un statut 2xx, considérons-le comme connecté
      setIsConnected(response.ok);
    } catch (error) {
      console.error("Erreur de connexion au serveur:", error);
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  // Vérifier la connexion au démarrage et périodiquement
  useEffect(() => {
    checkServerConnection();
    
    // Vérifier toutes les 10 secondes
    const interval = setInterval(() => {
      checkServerConnection();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={checkServerConnection}
        disabled={isChecking}
        className={`
          px-4 py-2 rounded-md font-medium transition-colors duration-300
          flex items-center gap-2
          ${isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
          ${isChecking ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-200' : 'bg-red-200'}`}></div>
        <span className="text-white">
          {isChecking ? 'Vérification...' : (isConnected ? 'Connecté' : 'Déconnecté')}
        </span>
      </button>
      
      <p className="text-sm text-gray-600">
        {isConnected 
          ? `Connecté à ${serverUrl}` 
          : `Non connecté à ${serverUrl}`}
      </p>
    </div>
  );
}