import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tous');

  const galleryImages = [
    { id: 1, category: 'Espaces', title: 'Vue Extérieure', img: '/images/vue.jpg' },
    { id: 2, category: 'Chambres', title: 'Suite Parentale 1', img: '/images/chambre-bleu.jpeg' },
    { id: 3, category: 'Piscine', title: 'Piscine Panoramique', img: '/images/piscine-c.jpg' },
    { id: 4, category: 'Cuisine', title: 'Cuisine Équipée', img: '/images/cuisine.jpg' },
    { id: 5, category: 'Espaces', title: 'Salon Authentique', img: '/images/salon-__.jpg' },
    { id: 6, category: 'Chambres', title: 'Suite 2', img: '/images/chambre2.jpeg' },
    { id: 7, category: 'Piscine', title: 'Espace Détente', img: '/images/piscine-_.jpg' },
    { id: 8, category: 'Espaces', title: 'La Terrasse', img: '/images/exterieur.jpg' },
  ];


  const filteredItems = activeTab === 'Tous' 
    ? galleryImages 
    : galleryImages.filter(item => item.category === activeTab);

  const tabs = ['Tous', 'Espaces', 'Chambres', 'Cuisine', 'Piscine'];

  return (
    <main>
      <Helmet>
        <title>Galerie Photos | Maison Sud Saint-Mélany | Sud Ardèche</title>
        <meta name="description" content="Visitez la Maison Sud en images : suites de charme, piscine panoramique, et paysages sauvages de la vallée de la Drobie." />
      </Helmet>
      <section className="section container">
        <div className="section-header text-center">
          <h2>NOTRE GALERIE</h2>
          <p className="subtitle">Découvrez l'atmosphère unique d'Olinda en images</p>
        </div>

        <div className="gallery-filter">
          {tabs.map(tab => (
            <button 
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="gallery-grid-rich">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-card">
              <img src={item.img} alt={item.title} />
              <div className="gallery-overlay">
                <span>{item.category}</span>
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .gallery-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }
        .tab-btn {
          padding: 0.8rem 2rem;
          border-radius: 30px;
          border: 1px solid #ddd;
          background: var(--color-white);
          color: var(--color-stone);
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition);
          cursor: pointer;
        }
        .tab-btn.active {
          background: var(--color-olive);
          color: var(--color-white);
          border-color: var(--color-olive);
        }
        .gallery-grid-rich {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .gallery-card {
          position: relative;
          height: 350px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .gallery-card:hover img {
          transform: scale(1.1);
        }
        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: var(--color-white);
          transform: translateY(20px);
          opacity: 0;
          transition: var(--transition);
        }
        .gallery-card:hover .gallery-overlay {
          transform: translateY(0);
          opacity: 1;
        }
        .gallery-overlay span {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          display: block;
        }
        .gallery-overlay h4 {
          font-size: 1.2rem;
          margin: 0;
        }
        .text-center {
          text-align: center;
        }
        @media (max-width: 1024px) {
          .gallery-grid-rich {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .gallery-grid-rich {
            grid-template-columns: 1fr;
          }
          .gallery-card {
            height: 300px;
          }
        }
      `}</style>
    </main>
  );
};

export default Gallery;
