import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Wifi, Tv, Utensils, Droplet, MapPin, Car, Leaf, Thermometer, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const serviceData = [
  {
    id: 0,
    title: "Cuisine Complète",
    description: "Comme à la maison. Notre cuisine est entièrement équipée pour régaler de grandes tablées : four, lave-vaisselle, grand réfrigérateur, et tout le nécessaire de cuisine.",
    items: ["Gazinière professionnelle", "Machine à café (Nespresso & Filtre)", "Appareils à raclette & fondue"],
    image: "/images/cuisine.jpg"
  },
  {
    id: 1,
    title: "Confort & Équipements",
    description: "Une capacité d'accueil jusqu'à 14 personnes. La maison allie le charme de l'authentique (pierres et poutres apparentes) au confort moderne le plus exigeant.",
    items: ["5 suites avec salles d'eau privatives", "Literie de haute qualité", "Espace salon avec cheminée"],
    image: "/images/chambre-5.jpg"
  },
  {
    id: 2,
    title: "Vue entre ciel et vallées",
    description: "Un panorama à couper le souffle sur la vallée de la Drobie et les monts d'Ardèche. Profitez de nos terrasses aménagées pour vos moments de détente.",
    items: ["Terrasse panoramique", "Mobilier de jardin confortable", "Calme absolu sans voisinage"],
    image: "/images/vue.jpg"
  },
  {
    id: 3,
    title: "Piscine & Nature",
    description: "Une grande piscine privée chauffée (10x5m) avec vue panoramique. Le terrain de 6000m² offre de nombreux espaces de détente et un accès à notre potager bio.",
    items: ["Piscine chauffée de mai à septembre", "Bains de soleil & Parasols", "Potager et herbes aromatiques en accès libre"],
    image: "/images/piscine-c.jpg"
  }
];

const Services: React.FC = () => {
  const [activeId, setActiveId] = useState(0);
  const activeService = serviceData[activeId];

  return (
    <main>
      <Helmet>
        <title>Services & Équipements | Piscine Chauffée & Potager Bio | Maison Sud</title>
        <meta name="description" content="Découvrez les services exclusifs de la Maison Sud : piscine privée 10x5m, cuisine équipée, Wifi Fibre, et l'accueil bienveillant de René." />
      </Helmet>
      <section className="section container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            VOS ÉQUIPEMENTS & SERVICES
          </motion.h2>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Tout le confort moderne dans un écrin de nature
          </motion.p>
        </div>

        <div className="amenities-grid">
          {[
            { Icon: Leaf, label: "Espace Vert" },
            { Icon: MapPin, label: "Vue sans vis-à-vis" },
            { Icon: Tv, label: "TV & Mezzanine" },
            { Icon: Utensils, label: "Cuisine équipée" },
            { Icon: Wifi, label: "Wifi Fibre" },
            { Icon: Droplet, label: "Piscine privée" },
            { Icon: Thermometer, label: "Eau chaude" },
            { Icon: Car, label: "Parking gratuit" },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="amenity-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <item.Icon />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="interactive-services">
          <div className="services-sidebar">
            {serviceData.map((service) => (
              <motion.button
                key={service.id}
                className={`sidebar-item ${activeId === service.id ? 'active' : ''}`}
                onClick={() => setActiveId(service.id)}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="sidebar-number">0{service.id + 1}</span>
                <span className="sidebar-title">{service.title}</span>
                {activeId === service.id && (
                  <motion.div 
                    layoutId="active-line"
                    className="active-line"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="service-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="service-display-content"
              >
                <div className="display-image">
                  <img src={activeService.image} alt={activeService.title} />
                </div>
                <div className="display-text">
                  <h3>{activeService.title}</h3>
                  <p>{activeService.description}</p>
                  <ul>
                    {activeService.items.map((item, i) => (
                      <li key={i}>
                        <ChevronRight className="li-icon" size={18} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
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

        .interactive-services {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 4rem;
          margin-top: 6rem;
          min-height: 500px;
        }

        .services-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-left: 1px solid #eee;
          padding-left: 1rem;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 1rem;
          text-align: left;
          position: relative;
          color: var(--color-stone);
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .sidebar-item.active {
          opacity: 1;
          color: var(--color-olive);
        }

        .sidebar-number {
          font-size: 0.9rem;
          font-weight: 700;
          font-family: var(--font-sans);
          color: var(--color-accent);
        }

        .sidebar-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
        }

        .active-line {
          position: absolute;
          left: -17px;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: var(--color-olive);
        }

        .service-display {
          position: relative;
        }

        .service-display-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        .display-image img {
          width: 100%;
          height: 450px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .display-text h3 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-olive);
        }

        .display-text p {
          font-size: 1.15rem;
          margin-bottom: 2rem;
          line-height: 1.8;
          max-width: 800px;
        }

        .display-text ul {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .display-text li {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 600;
          font-size: 1rem;
        }

        .li-icon {
          color: var(--color-olive);
          flex-shrink: 0;
        }

        .text-center {
          text-align: center;
        }

        @media (max-width: 1024px) {
          .interactive-services {
            grid-template-columns: 1fr;
          }
          .services-sidebar {
            flex-direction: row;
            overflow-x: auto;
            border-left: none;
            border-bottom: 1px solid #eee;
            padding-left: 0;
            padding-bottom: 1rem;
            white-space: nowrap;
          }
          .active-line {
            left: 0;
            right: 0;
            top: auto;
            bottom: -11px;
            width: auto;
            height: 3px;
          }
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .display-text h3 {
            font-size: 1.8rem;
          }
          .display-image img {
            height: 300px;
          }
        }
      `}</style>
    </main>
  );
};

export default Services;
