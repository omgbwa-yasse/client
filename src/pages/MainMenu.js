// MainMenu.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaInbox, FaEllipsisH, FaClock, FaTasks, FaUsers, FaFolder } from 'react-icons/fa';
import '../App.css';

// Badge pour les notifications
const Badge = ({ count }) => (
  <span className="badge">{count}</span>
);

// Élément de menu standard
const MenuItem = ({ icon, text, to, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`menu-item ${isActive ? 'active' : ''}`}
    >
      <div className="menu-item-icon">{icon}</div>
      <span className="menu-item-text">{text}</span>
      {badge && <Badge count={badge} />}
    </Link>
  );
};

// Élément d'espace avec lettre
const SpaceItem = ({ letter, color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="space-item"
    >
      <div className={`space-icon ${color}`}>
        {letter}
      </div>
      <span className="menu-item-text">{text}</span>
    </button>
  );
};

// Sous-menu avec icône de dossier
const SpaceSubMenu = ({ icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`submenu-item ${isActive ? 'active' : ''}`}
    >
      <div className="submenu-icon">{icon}</div>
      <span className="menu-item-text">{text}</span>
    </Link>
  );
};

// Composant principal du menu
export const MainMenu = ({ onSpaceSelect }) => {
  return (
    <div>
      <div className="menu-section">
        <nav>
          <MenuItem icon={<FaHome />} text="Home" to="/" />
          <MenuItem icon={<FaInbox />} text="Inbox" to="/inbox" badge={9} />
          <MenuItem icon={<FaEllipsisH />} text="More" to="/more" />
        </nav>
      </div>
      
      <div className="menu-section">
        <div className="section-title">
          Resources
        </div>
        <nav>
          <MenuItem icon={<FaClock />} text="Timesheet" to="/timesheet" />
          <MenuItem icon={<FaTasks />} text="Workload" to="/workload" />
          <MenuItem icon={<FaUsers />} text="Team view" to="/team" />
        </nav>
      </div>
      
      <div className="menu-section">
        <div className="section-title">
          Spaces
        </div>
        <nav>
          <SpaceItem 
            letter="P" 
            color="space-purple" 
            text="Projects" 
            onClick={() => onSpaceSelect('projects')} 
          />
          <SpaceSubMenu 
            icon={<FaFolder />} 
            text="All Projects" 
            to="/projects" 
          />
          <SpaceSubMenu 
            icon={<FaFolder />} 
            text="Tasks" 
            to="/tasks" 
          />
          <SpaceItem 
            letter="R" 
            color="space-green" 
            text="Resources" 
            onClick={() => onSpaceSelect('resources')} 
          />
          <SpaceItem 
            letter="F" 
            color="space-yellow" 
            text="Finance" 
            onClick={() => onSpaceSelect('finance')} 
          />
          <SpaceItem 
            letter="E" 
            color="space-blue" 
            text="Engineering" 
            onClick={() => onSpaceSelect('engineering')} 
          />
          <SpaceItem 
            letter="O" 
            color="space-indigo" 
            text="Operations" 
            onClick={() => onSpaceSelect('operations')} 
          />
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;