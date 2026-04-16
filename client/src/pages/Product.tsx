import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Maximize, UserCheck, Star, Wifi, Tv, Utensils, Droplet, Calendar, ShieldCheck, Heart } from 'lucide-react';
import BookingWidget from '../components/BookingWidget';

const Product: React.FC = () => {
  const [activeTab, setActiveTab] = useState('description');

  const reviews = [
    { id: 1, author: 'Sophie M.', rating: 5, date: 'Août 2025', text: 'Un séjour inoubliable ! La maison est encore plus belle en vrai. La piscine chauffée est un pur bonheur.' },
    { id: 2, author: 'Marc L.', rating: 5, date: 'Juillet 2025', text: 'Parfait pour notre réunion de famille. René est aux petits soins et la vue est incroyable.' },
    { id: 3, author: 'Elena R.', rating: 4, date: 'Juin 2025', text: 'Authentique et confortable. Le calme absolu que nous recherchions.' },
  ];

  return (
    <main className="product-page">
      <Helmet>
        <title>Réserver Olinda | Gîte de Charme avec Piscine | Maison Sud</title>
        <meta name="description" content="Réservez votre séjour à Olinda, notre gîte de 250m² à Saint-Mélany. Piscine chauffée, 5 chambres, vue panoramique." />
      </Helmet>

      <section className="product-hero">
        <div className="container">
          <div className="product-title-area">
            <h1>OLINDA</h1>
            <div className="product-price-top">À partir de 250,00 € / Jour</div>
          </div>
        </div>
      </section>

      <div className="container product-container">
        <div className="product-main-content">
          <div className="product-intro-card">
            <div className="meta-grid">
              <div className="meta-item"><Maximize size={20} /> 250 m²</div>
              <div className="meta-item"><UserCheck size={20} /> 14 Voyageurs</div>
              <div className="meta-item"><MapPin size={20} /> Saint-Mélany</div>
              <div className="meta-item"><Star size={20} color="#f1c40f" fill="#f1c40f" /> 4.9 (132 avis)</div>
            </div>
            <p className="summary-text">
              Ancienne bâtisse du XIXème siècle entièrement restaurée, la Maison Sud (Olinda) allie le charme de la pierre sèche et des poutres apparentes au confort moderne le plus exigeant.
            </p>
          </div>

          <div className="product-tabs">
            <div className="tab-headers">
              <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</button>
              <button className={activeTab === 'infos' ? 'active' : ''} onClick={() => setActiveTab('infos')}>Informations</button>
              <button className={activeTab === 'pricing' ? 'active' : ''} onClick={() => setActiveTab('pricing')}>Tarifs Saisonniers</button>
              <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Avis ({reviews.length})</button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description-tab">
                  <h3>À propos d'Olinda</h3>
                  <p>Perchée dans la vallée de la Drobie, au cœur du Parc naturel des Monts d'Ardèche, Olinda est une maison de caractère offrant un panorama exceptionnel.</p>
                  <p>La maison dispose de 5 suites parentales, chacune avec sa propre salle d'eau et WC, garantissant une intimité totale. Une mezzanine avec coin TV et canapés convertibles offre des couchages supplémentaires.</p>
                  
                  <h4>Équipements phares</h4>
                  <div className="amenities-list">
                    <div className="amenity"><Wifi size={18} /> Wifi Fibre</div>
                    <div className="amenity"><Droplet size={18} /> Piscine chauffée (10x5m)</div>
                    <div className="amenity"><Utensils size={18} /> Cuisine d'été & BBQ</div>
                    <div className="amenity"><Tv size={18} /> TV & Mezzanine</div>
                    <div className="amenity"><ShieldCheck size={18} /> Arrivée autonome</div>
                    <div className="amenity"><Heart size={18} /> Potager bio</div>
                  </div>
                </div>
              )}
              
              {activeTab === 'infos' && (
                <div className="infos-tab">
                  <h3>Informations complémentaires</h3>
                  <ul className="info-points">
                    <li><strong>Piscine :</strong> Maintenue de mai à septembre. Entretien par René les mardis et jeudis matin.</li>
                    <li><strong>Animaux :</strong> Bienvenus, merci de nous prévenir si plus de deux.</li>
                    <li><strong>Capacité :</strong> 10 adultes et 4 enfants maximum.</li>
                    <li><strong>Parking :</strong> Gratuit sur place (3-4 voitures).</li>
                  </ul>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="pricing-tab">
                  <h3>Tarifs par saison</h3>
                  <div className="pricing-grid-display">
                    <div className="price-item"><span>Avril, Octobre, Novembre</span><strong>250 € / nuit</strong></div>
                    <div className="price-item"><span>Mai, Juin (1-14)</span><strong>300 € / nuit</strong></div>
                    <div className="price-item"><span>Juin (15-30), Septembre</span><strong>350 € / nuit</strong></div>
                    <div className="price-item"><span>Juillet</span><strong>450 € / nuit</strong></div>
                    <div className="price-item"><span>Août</span><strong>550 € / nuit</strong></div>
                  </div>
                  <p className="pricing-note">* Une remise de 10% est appliquée automatiquement pour tout séjour de 6 nuits ou plus.</p>
                  <p className="pricing-note">* La maison est fermée à la location de Décembre à Mars.</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-tab">
                  <h3>Ce que disent nos voyageurs</h3>
                  <div className="reviews-list">
                    {reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <span className="author">{review.author}</span>
                          <span className="date">{review.date}</span>
                        </div>
                        <div className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                        <p>{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="product-sidebar">
          <div className="booking-card-rich">
            <div className="booking-card-header">
              <h3>Réserver votre séjour</h3>
              <p>À partir de 300€ / nuit</p>
            </div>
            <BookingWidget />
            <div className="booking-perks">
              <div className="perk"><Calendar size={16} /> Remise -10% dès 6 nuits</div>
              <div className="perk"><ShieldCheck size={16} /> Annulation flexible</div>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .product-page {
          background: #fcfcf9;
          padding-bottom: 5rem;
        }
        .product-hero {
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000');
          background-size: cover;
          background-position: center;
          height: 400px;
          display: flex;
          align-items: flex-end;
          padding-bottom: 3rem;
          color: white;
        }
        .product-title-area {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product-title-area h1 {
          font-size: 4rem;
          margin: 0;
          letter-spacing: 4px;
        }
        .product-price-top {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          background: var(--color-olive);
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
        }
        .product-container {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 3rem;
          margin-top: -50px;
        }
        .product-main-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          overflow: hidden;
          padding: 3rem;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-stone);
        }
        .summary-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: var(--color-accent);
          margin-bottom: 3rem;
        }
        .product-tabs {
          margin-top: 2rem;
        }
        .tab-headers {
          display: flex;
          gap: 2rem;
          border-bottom: 1px solid #eee;
          margin-bottom: 2rem;
        }
        .tab-headers button {
          padding: 1rem 0;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.85rem;
          color: var(--color-accent);
          border-bottom: 2px solid transparent;
          transition: var(--transition);
        }
        .tab-headers button.active {
          color: var(--color-olive);
          border-bottom-color: var(--color-olive);
        }
        .tab-content h3 {
          margin-bottom: 1.5rem;
          color: var(--color-stone);
        }
        .amenities-list {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .amenity {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.95rem;
          color: var(--color-stone);
        }
        .info-points {
          padding-left: 1.2rem;
        }
        .info-points li {
          margin-bottom: 1rem;
        }
        .review-item {
          padding-bottom: 2rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #f5f5f5;
        }
        .review-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .author {
          font-weight: 700;
        }
        .date {
          font-size: 0.85rem;
          color: var(--color-accent);
        }
        .stars {
          color: #f1c40f;
          margin-bottom: 0.5rem;
        }
        .product-sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
        }
        .booking-card-rich {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          border: 1px solid #eee;
        }
        .booking-card-header {
          background: var(--color-stone);
          color: white;
          padding: 2rem;
          text-align: center;
        }
        .booking-card-header h3 {
          margin: 0;
          font-size: 1.5rem;
        }
        .booking-card-header p {
          margin: 0.5rem 0 0;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .booking-perks {
          padding: 1.5rem;
          background: #fafaf8;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .perk {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.85rem;
          color: var(--color-olive);
          font-weight: 600;
        }
        @media (max-width: 1024px) {
          .product-container {
            grid-template-columns: 1fr;
          }
          .product-sidebar {
            position: static;
          }
        }
        @media (max-width: 768px) {
          .product-hero {
            height: 300px;
          }
          .product-title-area h1 {
            font-size: 2.5rem;
          }
          .meta-grid {
            grid-template-columns: 1fr 1fr;
          }
          .amenities-list {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </main>
  );
};

export default Product;
