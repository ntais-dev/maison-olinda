import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, ShieldCheck, Droplet, MapPin, Coffee, Calendar } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main>
      <Helmet>
        <title>L'Expérience Olinda | Notre Histoire & Philosophie | Maison Sud</title>
        <meta name="description" content="Découvrez l'histoire de la Maison Sud à Saint-Mélany. Un refuge authentique au cœur des Cévennes ardéchoises, entre tradition et confort moderne." />
      </Helmet>
      {/* Experience Section */}
      <section id="experience" className="section bg-stone text-white">
        <div className="container experience-grid">
          <div className="experience-text">
            <h2>NOTRE MAISON, VOTRE SÉJOUR</h2>
            <p className="subtitle">L'esprit d'Olinda</p>
            <p>
              Maison Sud est avant tout une histoire de famille. Ancienne bâtisse du XIXème siècle, elle a été rénovée avec passion pour offrir un confort moderne tout en préservant l'âme de la pierre ardéchoise. 
            </p>
            <p>
              Nous avons voulu créer un lieu où le temps s'arrête, un refuge où l'on se retrouve pour partager des moments simples et authentiques au cœur d'une nature sauvage et préservée.
            </p>
          </div>
          <div className="experience-image">
            <img src="/images/vue-2.jpg" alt="Maison Sud Extérieur" />
          </div>
        </div>
      </section>

      {/* Soul of the Place */}
      <section className="section container">
        <div className="soul-section grid-2">
          <div className="soul-image">
            <img src="/images/salon-2.jpeg" alt="Intérieur authentique" />
          </div>
          <div className="soul-text">
            <h2>UNE MAISON, UNE HISTOIRE</h2>
            <p>
              Perchée à l'extrémité d'un petit hameau, notre maison est un véritable havre au bout du monde. C'est ici que René, notre hôte local, vous accueillera. Figure emblématique de la vallée, il veille sur la maison et son jardin avec une discrétion et une bienveillance qui font toute la différence.
            </p>
            <p>
              De la source d'eau privée qui alimente la maison au potager qui regorge de saveurs, chaque détail raconte notre attachement à cette terre ardéchoise.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-beige-dark">
        <div className="container">
          <div className="section-header text-center">
            <h2>POURQUOI CHOISIR OLINDA ?</h2>
            <p className="subtitle">Ce qui rend votre séjour unique</p>
          </div>
          <div className="features-grid-rich">
            <div className="feature-item-rich">
              <Coffee size={24} />
              <h4>Repas à domicile</h4>
              <p>Possibilité de livraison de repas locaux.</p>
            </div>
            <div className="feature-item-rich">
              <Users size={24} />
              <h4>Animaux bienvenus</h4>
              <p>Vos compagnons sont les bienvenus.</p>
            </div>
            <div className="feature-item-rich">
              <Droplet size={24} />
              <h4>Eau de source</h4>
              <p>Une eau pure filtrée naturellement.</p>
            </div>
            <div className="feature-item-rich">
              <MapPin size={24} />
              <h4>Emplacement unique</h4>
              <p>Au cœur de la vallée de la Drobie.</p>
            </div>
            <div className="feature-item-rich">
              <ShieldCheck size={24} />
              <h4>Hôte sur place</h4>
              <p>René est là pour vous assister.</p>
            </div>
            <div className="feature-item-rich">
              <Calendar size={24} />
              <h4>Arrivée autonome</h4>
              <p>Pour une flexibilité totale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="section container">
        <div className="practical-info-grid">
          <div className="practical-card">
            <h3>BON À SAVOIR</h3>
            <div className="info-list">
              <div className="info-item">
                <h4>Piscine</h4>
                <p>Maintenance par René les mardis et jeudis à 7h30 pour une propreté irréprochable.</p>
              </div>
              <div className="info-item">
                <h4>Potager & Aromatiques</h4>
                <p>Accès libre au basilic, estragon, thym et romarin. Légumes frais selon la récolte.</p>
              </div>
            </div>
          </div>
          <div className="caretaker-card-rich">
            <div className="caretaker-header">
              <img src="/images/Image-1.jpeg" alt="René" />
              <div>
                <h4>René</h4>
                <p>Votre ange gardien</p>
              </div>
            </div>
            <p>
              Originaire de la vallée, René est bien plus qu'un gardien. Il est le garant de l'esprit du lieu. Il saura vous conseiller sur les meilleurs coins de baignade en rivière ou les sentiers méconnus.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .soul-image img {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .soul-text h2 {
          margin-bottom: 1.5rem;
          font-size: 2.2rem;
        }
        .soul-text p {
          margin-bottom: 1.2rem;
          font-size: 1.1rem;
        }
        .features-grid-rich {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        .feature-item-rich {
          background: var(--color-white);
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          transition: var(--transition);
        }
        .feature-item-rich:hover {
          transform: translateY(-5px);
        }
        .feature-item-rich svg {
          color: var(--color-olive);
          margin-bottom: 1rem;
        }
        .feature-item-rich h4 {
          margin-bottom: 0.5rem;
        }
        .feature-item-rich p {
          font-size: 0.9rem;
          color: var(--color-accent);
        }
        .practical-info-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }
        .practical-card {
          background: #fdfdfb;
          padding: 3rem;
          border-radius: 12px;
          border: 1px solid #f0f0e8;
        }
        .practical-card h3 {
          margin-bottom: 2rem;
          color: var(--color-olive);
        }
        .info-item {
          margin-bottom: 2rem;
        }
        .info-item h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--color-stone);
        }
        .caretaker-card-rich {
          background: var(--color-beige);
          padding: 2rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .caretaker-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .caretaker-header img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
        }
        .caretaker-card-rich p {
          font-size: 0.95rem;
          line-height: 1.6;
          font-style: italic;
        }
        @media (max-width: 768px) {
          .grid-2, .features-grid-rich, .practical-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
};

export default About;
