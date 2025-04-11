// SidebarLayout.jsx
import React, { useState } from 'react';
import { MainMenu } from './MainMenu'; 
import TopBanner from './TopBanner';
import '../App.css';

export default function SidebarLayout({ children }) {
  const [activeSpace, setActiveSpace] = useState('projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="layout-container">
      {/* Bannière supérieure */}
      <TopBanner />
      
      <div className="h-screen flex overflow-hidden bg-white">
        {/* Bouton menu mobile */}
        <button 
          className="mobile-menu-trigger md:hidden fixed top-20 left-4 z-50 p-2 rounded-md bg-white shadow"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        {/* Barre latérale */}
        <div className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            <MainMenu onSpaceSelect={setActiveSpace} />
          </div>
          
        </div>
        
        {/* Contenu principal */}
        <div className="main-content">
          {/* Barre de navigation supérieure */}
          <div className="top-nav">
            <div className="page-title">
              {activeSpace.charAt(0).toUpperCase() + activeSpace.slice(1)}
            </div>
            <div className="view-controls">
              <button type="button" className="btn btn-outline">List</button>
              <button type="button" className="btn btn-outline">Board</button>
              <button type="button" className="btn btn-outline">Calendar</button>
              <button type="button" className="btn btn-primary">Add</button>
            </div>
          </div>
          
          {/* Contenu de la page */}
          <div className="content-area">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}