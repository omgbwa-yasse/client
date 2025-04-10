// src/App.js
import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  
  const renderPage = () => {
    const path = window.location.pathname;
    
    switch (path) {
      case '/register':
        return <RegisterPage />;
      case '/subscription':
        return <div>Page de souscription - Bientôt disponible</div>;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;