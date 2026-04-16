import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Maximize, UserCheck, Droplet, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import BookingWidget from '../components/BookingWidget';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setCurrentSlide(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Une maison incroyable bourrée de charme, pierre poutres apparentes... panorama magnifique... piscine de 10m sur 5m chauffée. Un séjour de rêve.",
      cite: "Jacques Joly"
    },
    {
      id: 2,
      rating: 5,
      text: "Très beau gîte équipé de tout le confort... vue exceptionnelle... entretenu quotidiennement par René. Nous reviendrons avec grand plaisir !",
      cite: "Annette Bel"
    },
    {
      id: 3,
      rating: 5,
      text: "Le calme absolu. La vallée de la Drobie est un joyau caché et Olinda en est le plus bel écrin. Merci à René pour son accueil et ses légumes du potager.",
      cite: "Pierre-Yves D."
    },
    {
      id: 4,
      rating: 5,
      text: "Parfait pour un groupe de 12 personnes. Chacun son espace avec les suites privatives, et de grands espaces communs pour se retrouver. La cuisine d'été est géniale.",
      cite: "Famille G."
    }
  ];

  const slidesPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(testimonials.length / slidesPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Maison Sud - Gîte de Charme en Ardèche",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "description": "Location de vacances authentique à Saint-Mélany. Gîte pour 14 personnes avec piscine chauffée dans la vallée sauvage de la Drobie, Sud Ardèche.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vallée de la Drobie",
      "addressLocality": "Saint-Mélany",
      "addressRegion": "Ardèche",
      "postalCode": "07260",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.5294",
      "longitude": "4.1167"
    },
    "url": "https://maison-sud.fr",
    "telephone": "+33-6-00-00-00-00",
    "priceRange": "300€ - 500€",
    "numberOfRooms": 5,
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Piscine chauffée", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Wifi Fibre", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Cuisine équipée", "value": true }
    ]
  };

  return (
    <main>
      <Helmet>
        <title>Maison Sud | Gîte de Charme 14 Pers à Saint-Mélany, Sud Ardèche</title>
        <meta name="description" content="Réservez votre gîte à Saint-Mélany (07). Maison Sud vous accueille dans la vallée de la Drobie : 5 suites, piscine chauffée, calme absolu en Sud Ardèche." />
        <meta name="keywords" content="location gîte Ardèche, gîte Saint-Mélany, gîte 14 personnes Ardèche, location maison vallée de la Drobie, gîte de charme sud ardèche, maison de vacances 07" />
        <link rel="canonical" href="https://maison-sud.fr/" />
        <meta property="og:title" content="Maison Sud | Gîte de Charme à Saint-Mélany, Sud Ardèche" />
        <meta property="og:description" content="Gîte pour 14 personnes avec piscine chauffée dans la vallée sauvage de la Drobie. Réservez votre séjour authentique." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>BIENVENUE À OLINDA ! BIENVENUE CHEZ VOUS !</h1>
          <p>Une expérience de reconnexion à soi et à la nature</p>
        </div>
      </section>

      {/* Main Product Section */}
      <section id="product" className="section container product-layout">
        <div className="product-main">
          <div className="product-header">
            <span className="badge">AUTHENTICITÉ & RECONNEXION</span>
            <h2>MAISON SUD - LE REFUGE DES CÉVENNES</h2>
            <div className="product-meta">
              <span><MapPin size={16} aria-hidden="true" /> Saint-Mélany, Ardèche</span>
              <span><Maximize size={16} aria-hidden="true" /> 250 m² sur 6 000 m²</span>
              <span><UserCheck size={16} aria-hidden="true" /> Jusqu'à 14 personnes</span>
            </div>
          </div>

          <div className="product-description">
            <p>
              Que vous choisissiez de vous détendre au bord de la piscine, de partir à l'aventure sur les sentiers de randonnée ou simplement de contempler le paysage depuis votre terrasse, chaque moment passé dans la vallée de la Drobie est une parenthèse précieuse.
            </p>
            <p>
              Laissez-vous porter par l'authenticité de la vallée, par les rencontres simples et vraies, et par la beauté sauvage qui nous entoure. Bienvenue dans les Cévennes ardéchoises, au cœur du Parc naturel des Monts d'Ardèche... là où le monde s'arrête et la nature commence.
            </p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Voyageurs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Chambres</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10</span>
                <span className="stat-label">Lits</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Salles de bain</span>
              </div>
            </div>

            <div className="services-preview-grid">
              <div className="service-card">
                <Utensils size={32} />
                <h4>Cuisine Complète</h4>
                <p>"Comme à la maison", tout l'équipement pour vos repas en famille.</p>
              </div>
              <div className="service-card">
                <Maximize size={32} />
                <h4>Confort & Équipement</h4>
                <p>"Chez soi, version Olinda" avec un design authentique et moderne.</p>
              </div>
              <div className="service-card">
                <MapPin size={32} />
                <h4>Vue entre ciel & vallées</h4>
                <p>"Panorama Olinda" : une vue imprenable sur la vallée de la Drobie.</p>
              </div>
              <div className="service-card">
                <Droplet size={32} />
                <h4>Piscine et Nature</h4>
                <p>"100% privée, à ciel ouvert", chauffée et entretenue quotidiennement.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="product-sidebar">
          <div className="booking-card">
            <div className="price-tag">
              <h3 className="booking-title-main">Réserver votre séjour <br></br>À partir de 300€ / nuit</h3>
            </div>
            <BookingWidget />
            <div className="booking-info">
              <p>✓ Remise long séjour dès 6 nuits</p>
              <p>✓ Réservation directe gîte Ardèche</p>
              <p>✓ Animaux bienvenus</p>
            </div>
          </div>
        </aside>
      </section>

      {/* Testimonials Slider Section */}
      <section className="testimonials section bg-beige-dark overflow-hidden">
        <div className="container">
          <div className="section-header text-center">
            <h2>NOS CLIENTS ADORENT OLINDA</h2>
            <p className="subtitle">Des souvenirs inoubliables partagés par nos hôtes</p>
          </div>
          
          <div className="slider-container">
            <button className="slider-nav prev" onClick={prevSlide} aria-label="Précédent">
              <ChevronLeft size={32} />
            </button>
            
            <div className="slider-content-wrapper">
              <div 
                className="slider-track" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-slide">
                    <div className="testimonial-card-large">
                      <div className="rating">{'★'.repeat(testimonial.rating)}</div>
                      <p className="testimonial-text">"{testimonial.text}"</p>
                      <cite className="testimonial-cite">{testimonial.cite}</cite>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="slider-nav next" onClick={nextSlide} aria-label="Suivant">
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="slider-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button 
                key={index} 
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Aller à la page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin: 3rem 0;
          text-align: center;
          background: var(--color-white);
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #eee;
        }
        .stat-number {
          display: block;
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-olive);
        }
        .stat-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-accent);
        }
        .services-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }
        .service-card {
          padding: 2rem;
          background: #fdfdfb;
          border-radius: 8px;
          border: 1px solid #f0f0e8;
          transition: var(--transition);
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .service-card svg {
          color: var(--color-olive);
          margin-bottom: 1rem;
        }
        .service-card h4 {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }
        .service-card p {
          font-size: 0.9rem;
          color: var(--color-stone);
        }
        .text-center {
          text-align: center;
        }

        .booking-card-title {
          padding: 1.5rem 1.5rem 0;
          text-align: center;
        }

        .booking-card-title h3 {
          font-size: 1.1rem;
          color: var(--color-stone);
          font-family: var(--font-serif);
          margin: 0;
          line-height: 1.4;
        }
        
        /* Slider Styles */
        .slider-container {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 3rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .slider-content-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .slider-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .testimonial-slide {
          min-width: 50%;
          padding: 0 1rem;
        }
        .testimonial-card-large {
          background: var(--color-white);
          padding: 3rem 2rem;
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
          text-align: center;
          min-height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #f0f0e8;
        }
        .testimonial-text {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-style: italic;
          line-height: 1.6;
          margin: 1.5rem 0 2rem;
          color: var(--color-stone);
        }
        .testimonial-cite {
          font-weight: 700;
          color: var(--color-olive);
          font-style: normal;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.85rem;
        }
        .slider-nav {
          background: white;
          border: 1px solid #eee;
          color: var(--color-olive);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          z-index: 10;
          transition: var(--transition);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .slider-nav:hover {
          background: var(--color-olive);
          color: white;
        }
        .slider-nav.prev {
          left: -25px;
        }
        .slider-nav.next {
          right: -25px;
        }
        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 2rem;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ddd;
          border: none;
          padding: 0;
          transition: var(--transition);
          cursor: pointer;
        }
        .dot.active {
          background: var(--color-olive);
          width: 25px;
          border-radius: 5px;
        }
        .overflow-hidden {
          overflow: hidden;
        }
        
        @media (max-width: 1024px) {
          .slider-container {
            max-width: 95%;
          }
        }

        @media (max-width: 768px) {
          .testimonial-slide {
            min-width: 100%;
          }
          .testimonial-text {
            font-size: 1.1rem;
          }
          .slider-nav {
            display: none;
          }
          .testimonial-card-large {
            padding: 2rem 1.5rem;
            min-height: 300px;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;
