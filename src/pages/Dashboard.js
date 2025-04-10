// src/pages/Dashboard.js
import React from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
  // Données fictives pour les statistiques
  const stats = [
    { label: 'Abonnement actif', value: 'Plan Professional', icon: '🔄' },
    { label: 'Date de renouvellement', value: '15 Mai 2025', icon: '📅' },
    { label: 'Utilisateurs', value: '7 / 10', icon: '👥' },
    { label: 'Facturation', value: 'Mensuelle', icon: '💳' }
  ];

  // Données fictives pour l'historique des paiements
  const payments = [
    { id: 1, date: '10 Avr 2025', amount: '49.99€', status: 'Payé', invoice: '#INV-2025-004' },
    { id: 2, date: '10 Mar 2025', amount: '49.99€', status: 'Payé', invoice: '#INV-2025-003' },
    { id: 3, date: '10 Fév 2025', amount: '49.99€', status: 'Payé', invoice: '#INV-2025-002' },
    { id: 4, date: '10 Jan 2025', amount: '49.99€', status: 'Payé', invoice: '#INV-2025-001' }
  ];

  // Données fictives pour l'utilisation
  const usage = [
    { feature: 'Stockage', used: 75, total: 100, unit: 'GB' },
    { feature: 'Projets', used: 8, total: 15, unit: '' },
    { feature: 'Utilisateurs', used: 7, total: 10, unit: '' },
    { feature: 'API Calls', used: 8500, total: 10000, unit: '' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Tableau de bord</h1>
      
      {/* Stats Overview */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Dashboard Content */}
      <div className="dashboard-grid">
        {/* Subscription Section */}
        <div className="dashboard-card subscription-overview">
          <div className="card-header">
            <h2>Détails de l'abonnement</h2>
            <button className="upgrade-btn">Changer de plan</button>
          </div>
          
          <div className="subscription-details">
            <div className="current-plan">
              <h3>Plan Professional</h3>
              <div className="plan-badge">Actif</div>
            </div>
            
            <div className="plan-features">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>10 utilisateurs</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Toutes les fonctionnalités</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Support prioritaire</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>API access</span>
              </div>
            </div>
            
            <div className="renew-info">
              <div className="next-payment">
                <span>Prochain paiement:</span>
                <span className="payment-date">15 Mai 2025</span>
              </div>
              <div className="payment-amount">49.99€ / mois</div>
            </div>
          </div>
        </div>
        
        {/* Usage Section */}
        <div className="dashboard-card usage-overview">
          <h2>Utilisation</h2>
          
          {usage.map((item, index) => (
            <div className="usage-item" key={index}>
              <div className="usage-info">
                <span className="usage-label">{item.feature}</span>
                <span className="usage-value">
                  {item.used} / {item.total} {item.unit}
                </span>
              </div>
              <div className="usage-bar">
                <div 
                  className="usage-progress" 
                  style={{ width: `${(item.used / item.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Payments History */}
        <div className="dashboard-card payment-history">
          <h2>Historique des paiements</h2>
          
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Facture</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.date}</td>
                  <td>{payment.amount}</td>
                  <td>
                    <span className={`payment-status ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <a href="#" className="invoice-link">{payment.invoice}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <a href="#" className="see-all-link">Voir tout l'historique</a>
        </div>
        
        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <h2>Actions rapides</h2>
          
          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">👤</span>
              <span>Ajouter un utilisateur</span>
            </button>
            
            <button className="action-btn">
              <span className="action-icon">📝</span>
              <span>Modifier le profil</span>
            </button>
            
            <button className="action-btn">
              <span className="action-icon">💳</span>
              <span>Mettre à jour le paiement</span>
            </button>
            
            <button className="action-btn">
              <span className="action-icon">📞</span>
              <span>Contacter le support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;