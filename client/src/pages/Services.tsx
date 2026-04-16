import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Wifi, Tv, Utensils, Droplet, MapPin, Car, Leaf, Thermometer } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <main>
      <Helmet>
        <title>Services & Équipements | Piscine Chauffée & Potager Bio | Maison Sud</title>
        <meta name="description" content="Découvrez les services exclusifs de la Maison Sud : piscine privée 10x5m, cuisine équipée, Wifi Fibre, et l'accueil bienveillant de René." />
      </Helmet>
      <section className="section container">
        <div className="section-header text-center">
          <h2>VOS ÉQUIPEMENTS & SERVICES</h2>
          <p className="subtitle">Tout le confort moderne dans un écrin de nature</p>
        </div>

        <div className="amenities-grid">
          <div className="amenity-item">
            <Leaf />
            <span>Espace Vert</span>
          </div>
          <div className="amenity-item">
            <MapPin />
            <span>Vue sans vis-à-vis</span>
          </div>
          <div className="amenity-item">
            <Tv />
            <span>TV & Mezzanine</span>
          </div>
          <div className="amenity-item">
            <Utensils />
            <span>Cuisine équipée</span>
          </div>
          <div className="amenity-item">
            <Wifi />
            <span>Wifi Fibre</span>
          </div>
          <div className="amenity-item">
            <Droplet />
            <span>Piscine privée</span>
          </div>
          <div className="amenity-item">
            <Thermometer />
            <span>Eau chaude</span>
          </div>
          <div className="amenity-item">
            <Car />
            <span>Parking gratuit</span>
          </div>
        </div>

        <div className="detailed-services">
          <div className="service-block">
            <div className="service-content">
              <h3>Cuisine Complète</h3>
              <p>Comme à la maison. Notre cuisine est entièrement équipée pour régaler de grandes tablées : four, lave-vaisselle, grand réfrigérateur, et tout le nécessaire de cuisine.</p>
              <ul>
                <li>Gazinière professionnelle</li>
                <li>Machine à café (Nespresso & Filtre)</li>
                <li>Appareils à raclette & fondue</li>
              </ul>
            </div>
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800" alt="Cuisine Olinda" />
            </div>
          </div>

          <div className="service-block reverse">
            <div className="service-content">
              <h3>Confort & Équipements</h3>
              <p>Une capacité d'accueil jusqu'à 14 personnes. La maison allie le charme de l'authentique (pierres et poutres apparentes) au confort moderne le plus exigeant.</p>
              <ul>
                <li>5 suites avec salles d'eau privatives</li>
                <li>Literie de haute qualité</li>
                <li>Espace salon avec cheminée</li>
              </ul>
            </div>
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1616594864847-4767a0f5e703?auto=format&fit=crop&q=80&w=800" alt="Chambre Olinda" />
            </div>
          </div>

          <div className="service-block">
            <div className="service-content">
              <h3>Vue entre ciel et vallées</h3>
              <p>Un panorama à couper le souffle sur la vallée de la Drobie et les monts d'Ardèche. Profitez de nos terrasses aménagées pour vos moments de détente.</p>
              <ul>
                <li>Terrasse panoramique</li>
                <li>Mobilier de jardin confortable</li>
                <li>Calme absolu sans voisinage</li>
              </ul>
            </div>
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" alt="Vue Olinda" />
            </div>
          </div>

          <div className="service-block reverse">
            <div className="service-content">
              <h3>Piscine & Nature</h3>
              <p>Une grande piscine privée chauffée (10x5m) avec vue panoramique. Le terrain de 6000m² offre de nombreux espaces de détente et un accès à notre potager bio.</p>
              <ul>
                <li>Piscine chauffée de mai à septembre</li>
                <li>Bains de soleil & Parasols</li>
                <li>Potager et herbes aromatiques en accès libre</li>
              </ul>
            </div>
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" alt="Piscine Olinda" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin: 4rem 0;
        }
        .amenity-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          background: var(--color-white);
          border-radius: 8px;
          border: 1px solid #eee;
          transition: var(--transition);
        }
        .amenity-item:hover {
          border-color: var(--color-olive);
          transform: translateY(-5px);
        }
        .amenity-item svg {
          color: var(--color-olive);
          width: 32px;
          height: 32px;
        }
        .amenity-item span {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-stone);
        }
        .detailed-services {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          margin-top: 6rem;
        }
        .service-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .service-block.reverse {
          direction: rtl;
        }
        .service-block.reverse .service-content {
          direction: ltr;
        }
        .service-block h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: var(--color-olive);
        }
        .service-block p {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }
        .service-block ul {
          list-style: none;
          padding: 0;
        }
        .service-block li {
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 600;
        }
        .service-block li::before {
          content: "•";
          color: var(--color-olive);
          font-size: 1.5rem;
        }
        .service-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .text-center {
          text-align: center;
        }
        @media (max-width: 1024px) {
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .service-block {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .service-block.reverse {
            direction: ltr;
          }
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .amenity-item {
            padding: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
};

export default Services;
