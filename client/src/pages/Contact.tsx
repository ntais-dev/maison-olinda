import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <main>
      <Helmet>
        <title>Contactez-nous | Réservation Gîte Saint-Mélany | Maison Sud</title>
        <meta name="description" content="Contactez l'équipe de la Maison Sud pour votre prochaine réservation en Ardèche. Nous sommes à votre écoute pour préparer votre séjour." />
      </Helmet>
      <section className="section container">
        <div className="contact-rich-grid">
          <div className="contact-info-rich">
            <span className="badge">CONTACT</span>
            <h2>LAISSEZ-NOUS UN MESSAGE</h2>
            <p className="contact-intro">
              Une question sur la maison, les disponibilités ou la région ? N'hésitez pas à nous contacter. René ou notre équipe vous répondront dans les plus brefs délais.
            </p>

            <div className="contact-methods">
              <div className="method-item">
                <Mail size={24} />
                <div>
                  <h4>Email</h4>
                  <p>maison.olinda@gmail.com</p>
                </div>
              </div>
              <div className="method-item">
                <Phone size={24} />
                <div>
                  <h4>Téléphone</h4>
                  <p>+33 (0)6 00 00 00 00</p>
                </div>
              </div>
              <div className="method-item">
                <MapPin size={24} />
                <div>
                  <h4>Localisation</h4>
                  <p>Saint-Mélany, 07260 France</p>
                </div>
              </div>
              <div className="method-item">
                <Clock size={24} />
                <div>
                  <h4>Arrivée / Départ</h4>
                  <p>Check-in: 16h00 | Check-out: 10h00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-rich">
            <form>
              <div className="form-row">
                <div className="form-group-rich">
                  <label>Nom Complet</label>
                  <input type="text" placeholder="Votre nom" required />
                </div>
                <div className="form-group-rich">
                  <label>Email</label>
                  <input type="email" placeholder="votre@email.com" required />
                </div>
              </div>
              <div className="form-group-rich">
                <label>Sujet</label>
                <input type="text" placeholder="Sujet de votre message" />
              </div>
              <div className="form-group-rich">
                <label>Message</label>
                <textarea placeholder="Comment pouvons-nous vous aider ?" rows={6} required></textarea>
              </div>
              <button type="submit" className="btn-send">ENVOYER LE MESSAGE</button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2842.123456789!2d4.1167!3d44.5294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b4e5f6a7b8c9d0%3A0x5cd123456789abcd!2sMaison%20Sud!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr&cid=6688122597116499871"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Maison Sud Location"
          className="google-map-iframe"
        ></iframe>
      </section>

      <style>{`
        .contact-rich-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          margin-bottom: 5rem;
        }
        .contact-intro {
          margin: 1.5rem 0 3rem;
          font-size: 1.1rem;
          color: var(--color-accent);
        }
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .method-item {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }
        .method-item svg {
          color: var(--color-olive);
          flex-shrink: 0;
        }
        .method-item h4 {
          font-size: 1rem;
          margin-bottom: 0.2rem;
          color: var(--color-stone);
        }
        .method-item p {
          font-size: 0.95rem;
          color: var(--color-accent);
        }
        .contact-form-rich {
          background: var(--color-white);
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
          border: 1px solid #eee;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group-rich {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .form-group-rich label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-olive);
        }
        .form-group-rich input, .form-group-rich textarea {
          padding: 1rem;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #fcfcfc;
          font-family: var(--font-sans);
          font-size: 1rem;
          transition: var(--transition);
        }
        .form-group-rich input:focus, .form-group-rich textarea:focus {
          outline: none;
          border-color: var(--color-olive);
          background: var(--color-white);
        }
        .btn-send {
          background: var(--color-olive);
          color: var(--color-white);
          padding: 1.2rem;
          width: 100%;
          border-radius: 4px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-top: 1rem;
          transition: var(--transition);
        }
        .btn-send:hover {
          background: var(--color-stone);
        }
        .map-section {
          height: 500px;
          background: #f0f0e8;
          width: 100%;
          overflow: hidden;
        }
        .google-map-iframe {
          /* Apply an olive-themed filter to the map */
          filter: sepia(20%) hue-rotate(40deg) saturate(80%) contrast(95%);
          transition: filter 0.5s ease;
        }
        .google-map-iframe:hover {
          filter: none;
        }
        @media (max-width: 1024px) {
          .contact-rich-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .contact-form-rich {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
};

export default Contact;
