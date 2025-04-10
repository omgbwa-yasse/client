// src/pages/SubscriptionPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SubscriptionPage.css';

function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('MONTHLY');
  const [userCount, setUserCount] = useState(1);
  const [step, setStep] = useState(1);
  
  // Plans d'abonnement basés sur la structure de la base de données
  const plans = [
    { id: 1, name: 'Basic', monthlyPrice: 19.99, annualPrice: 199.90, features: ['3 utilisateurs', 'Fonctionnalités de base', 'Support email'] },
    { id: 2, name: 'Professional', monthlyPrice: 49.99, annualPrice: 479.90, features: ['10 utilisateurs', 'Toutes les fonctionnalités', 'Support prioritaire', 'API access'] },
    { id: 3, name: 'Enterprise', monthlyPrice: 99.99, annualPrice: 959.90, features: ['Utilisateurs illimités', 'Fonctionnalités avancées', 'Support 24/7', 'Customisations', 'Onboarding personnel'] }
  ];

  const handleContinue = () => {
    setStep(step + 1);
  };

  const calculatePrice = (plan) => {
    if (!plan) return 0;
    
    const basePrice = billingCycle === 'MONTHLY' ? plan.monthlyPrice : plan.annualPrice;
    // Calculer le prix en fonction du nombre d'utilisateurs (simplifié)
    let price = basePrice;
    
    // Si plus d'utilisateurs que le forfait de base, ajouter un supplément
    if (plan.id === 1 && userCount > 3) {
      price += (userCount - 3) * 5; // 5€ par utilisateur supplémentaire
    } else if (plan.id === 2 && userCount > 10) {
      price += (userCount - 10) * 4; // 4€ par utilisateur supplémentaire
    }
    
    return price.toFixed(2);
  };

  return (
    <div className="subscription-container">
      <div className="subscription-header">
        <Link to="/" className="back-link">
          ← Retour à l'accueil
        </Link>
        <h1>Choisissez votre abonnement</h1>
        <p>Accédez à toutes nos fonctionnalités avec un abonnement adapté à vos besoins</p>
      </div>

      <div className="subscription-steps">
        <div className={`step ${step === 1 ? 'active' : ''}`}>1. Choisir un plan</div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>2. Information de l'organisation</div>
        <div className={`step ${step === 3 ? 'active' : ''}`}>3. Paiement</div>
      </div>

      {step === 1 && (
        <div className="subscription-content">
          <div className="billing-toggle">
            <span className={billingCycle === 'MONTHLY' ? 'active' : ''}>Mensuel</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={billingCycle === 'ANNUAL'} 
                onChange={() => setBillingCycle(billingCycle === 'MONTHLY' ? 'ANNUAL' : 'MONTHLY')}
              />
              <span className="slider"></span>
            </label>
            <span className={billingCycle === 'ANNUAL' ? 'active' : ''}>
              Annuel <span className="discount-badge">-20%</span>
            </span>
          </div>

          <div className="plans-container">
            {plans.map(plan => (
              <div 
                key={plan.id}
                className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="amount">
                      {billingCycle === 'MONTHLY' 
                        ? `${plan.monthlyPrice}€` 
                        : `${plan.annualPrice}€`}
                    </span>
                    <span className="period">
                      {billingCycle === 'MONTHLY' ? '/mois' : '/an'}
                    </span>
                  </div>
                </div>
                
                <div className="plan-features">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="feature">
                      <span className="feature-icon">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="select-plan-btn"
                  onClick={() => setSelectedPlan(plan)}
                >
                  {selectedPlan?.id === plan.id ? 'Sélectionné' : 'Sélectionner'}
                </button>
              </div>
            ))}
          </div>

          <div className="user-count-section">
            <h3>Nombre d'utilisateurs</h3>
            <div className="user-count-control">
              <button 
                className="user-count-btn" 
                onClick={() => setUserCount(Math.max(1, userCount - 1))}
                disabled={userCount <= 1}
              >
                -
              </button>
              <span className="user-count">{userCount}</span>
              <button 
                className="user-count-btn" 
                onClick={() => setUserCount(userCount + 1)}
              >
                +
              </button>
            </div>
          </div>

          {selectedPlan && (
            <div className="summary-section">
              <h3>Récapitulatif</h3>
              <div className="summary-item">
                <span>Plan</span>
                <span>{selectedPlan.name}</span>
              </div>
              <div className="summary-item">
                <span>Facturation</span>
                <span>{billingCycle === 'MONTHLY' ? 'Mensuelle' : 'Annuelle'}</span>
              </div>
              <div className="summary-item">
                <span>Utilisateurs</span>
                <span>{userCount}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{calculatePrice(selectedPlan)}€ {billingCycle === 'MONTHLY' ? '/mois' : '/an'}</span>
              </div>
              
              <button 
                className="continue-btn" 
                onClick={handleContinue}
                disabled={!selectedPlan}
              >
                Continuer
              </button>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="subscription-content">
          <div className="org-form">
            <h2>Informations de l'organisation</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Nom de l'organisation</label>
                <input type="text" placeholder="Nom de votre entreprise" />
              </div>
              <div className="form-group">
                <label>Nom d'affichage</label>
                <input type="text" placeholder="Nom affiché publiquement" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Décrivez votre organisation en quelques mots"></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Site web</label>
                <input type="url" placeholder="https://votresite.com" />
              </div>
              <div className="form-group">
                <label>Industrie</label>
                <select>
                  <option value="">Sélectionnez une industrie</option>
                  <option value="technology">Technologie</option>
                  <option value="healthcare">Santé</option>
                  <option value="education">Éducation</option>
                  <option value="finance">Finance</option>
                  <option value="retail">Commerce de détail</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Taille de l'organisation</label>
              <select>
                <option value="1-10">1-10 employés</option>
                <option value="11-50">11-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="201-500">201-500 employés</option>
                <option value="501-1000">501-1000 employés</option>
                <option value="1000+">1000+ employés</option>
              </select>
            </div>
            
            <div className="form-buttons">
              <button className="back-btn" onClick={() => setStep(step - 1)}>
                Retour
              </button>
              <button className="continue-btn" onClick={handleContinue}>
                Continuer vers le paiement
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="subscription-content">
          <div className="payment-section">
            <h2>Informations de paiement</h2>
            <p>Votre abonnement sera activé immédiatement après confirmation du paiement.</p>
            
            <div className="payment-methods">
              <div className="payment-method">
                <input type="radio" id="card" name="payment" defaultChecked />
                <label htmlFor="card">Carte bancaire</label>
              </div>
              <div className="payment-method">
                <input type="radio" id="paypal" name="payment" />
                <label htmlFor="paypal">PayPal</label>
              </div>
              <div className="payment-method">
                <input type="radio" id="bank" name="payment" />
                <label htmlFor="bank">Virement bancaire</label>
              </div>
            </div>
            
            <div className="card-details">
              <div className="form-group">
                <label>Numéro de carte</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date d'expiration</label>
                  <input type="text" placeholder="MM/AA" />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Nom sur la carte</label>
                <input type="text" placeholder="John Doe" />
              </div>
            </div>
            
            <div className="billing-address">
              <h3>Adresse de facturation</h3>
              
              <div className="form-group">
                <label>Adresse</label>
                <input type="text" placeholder="Rue et numéro" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Ville</label>
                  <input type="text" placeholder="Ville" />
                </div>
                <div className="form-group">
                  <label>Code postal</label>
                  <input type="text" placeholder="Code postal" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Pays</label>
                <select>
                  <option value="france">France</option>
                  <option value="belgium">Belgique</option>
                  <option value="switzerland">Suisse</option>
                  <option value="canada">Canada</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Email de facturation</label>
                <input type="email" placeholder="facturation@entreprise.com" />
              </div>
              
              <div className="form-group">
                <label>Numéro de TVA (optionnel)</label>
                <input type="text" placeholder="FR12345678901" />
              </div>
            </div>
            
            <div className="agreement-checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les <a href="/terms">conditions d'utilisation</a> et la <a href="/privacy">politique de confidentialité</a>
              </label>
            </div>
            
            <div className="final-summary">
              <h3>Récapitulatif de la commande</h3>
              <div className="summary-item">
                <span>Plan</span>
                <span>{selectedPlan.name}</span>
              </div>
              <div className="summary-item">
                <span>Facturation</span>
                <span>{billingCycle === 'MONTHLY' ? 'Mensuelle' : 'Annuelle'}</span>
              </div>
              <div className="summary-item">
                <span>Utilisateurs</span>
                <span>{userCount}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{calculatePrice(selectedPlan)}€ {billingCycle === 'MONTHLY' ? '/mois' : '/an'}</span>
              </div>
            </div>
            
            <div className="form-buttons">
              <button className="back-btn" onClick={() => setStep(step - 1)}>
                Retour
              </button>
              <button className="confirm-btn">
                Confirmer et payer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;