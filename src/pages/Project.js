// ProjectsPage.jsx
import React from 'react';
import '../App.css';
import SidebarLayout from './SidebarLayout';

function ProjectsPage() {
  return (
    <SidebarLayout>
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">
            Liste des projets
          </h3>
        </div>
        <div className="card-body">
          <p>Contenu de vos projets...</p>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default ProjectsPage;