import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home as HomeIcon } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Dashboard from './pages/Dashboard'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LegalNotice from './pages/LegalNotice'
import PageTransition from './components/PageTransition'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/a-propos" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/gallerie" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/product/olinda" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/politique-de-confidentialite" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/mentions-legales" element={<PageTransition><LegalNotice /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <header className="header">
          <nav className="container">
            <Link to="/" className="logo">
              <img src="/logo_olinda.png" alt="Olinda Logo" className="logo-img" />
            </Link>
            <ul className="nav-links">
              <li><Link to="/">La Maison</Link></li>
              <li><Link to="/a-propos">L'Expérience</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallerie">Galerie</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <Link to="/product/olinda" className="btn-reserve">RÉSERVATION</Link>
          </nav>
        </header>

        <AnimatedRoutes />

        <footer className="footer">
          <div className="container footer-grid">
            <div className="footer-brand">
              <Link to="/" className="logo light">
                <img src="/footer_logo.png" alt="Olinda Logo Footer" className="logo-img" />
              </Link>
              <p className="footer-tagline">Évasion et authenticité au cœur des Monts d'Ardèche.</p>
              <div className="social-links">
                <a href="#"><Instagram size={20} /></a>
                <a href="#"><Facebook size={20} /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">La Maison</Link></li>
                <li><Link to="/a-propos">L'Expérience</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/product/olinda">Réservation</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact</h4>
              <ul>
                <li><MapPin size={16} /> <span>Saint-Mélany, 07260, France</span></li>
                <li><Phone size={16} /> <span>+33 (0)4 75 XX XX XX</span></li>
                <li><Mail size={16} /> <span>contact@maisonsud.com</span></li>
              </ul>
            </div>

            <div className="footer-legal">
              <h4>Informations</h4>
              <ul>
                <li><Link to="/mentions-legales">Mentions Légales</Link></li>
                <li><Link to="/politique-de-confidentialite">Confidentialité</Link></li>
                <li><Link to="/contact">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <p>&copy; 2026 Maison Sud. Tous droits réservés.</p>
            </div>
          </div>
        </footer>

        <style>{`
          /* Footer Styles */
          .footer {
            background: var(--color-stone);
            color: var(--color-white);
            padding: 5rem 0 0;
            margin-top: 5rem;
          }

          .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1.5fr 1fr;
            gap: 4rem;
            padding-bottom: 4rem;
          }

          .footer h4 {
            color: var(--color-beige);
            font-family: var(--font-serif);
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
          }

          .logo.light { color: var(--color-white); }

          .footer-tagline {
            margin-top: 1.5rem;
            font-size: 0.95rem;
            opacity: 0.8;
            line-height: 1.6;
          }

          .social-links {
            display: flex;
            gap: 1.5rem;
            margin-top: 2rem;
          }

          .social-links a {
            color: var(--color-white);
            opacity: 0.7;
            transition: var(--transition);
          }

          .social-links a:hover { opacity: 1; transform: translateY(-3px); }

          .footer ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer ul li {
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-size: 0.9rem;
            opacity: 0.8;
          }

          .footer-links a, .footer-legal a {
            color: var(--color-white);
            text-decoration: none;
            transition: var(--transition);
          }

          .footer-links a:hover, .footer-legal a:hover {
            color: var(--color-beige);
            opacity: 1;
            padding-left: 5px;
          }

          .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding: 2rem 0;
            text-align: center;
            font-size: 0.85rem;
            opacity: 0.6;
          }

          @media (max-width: 1024px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 3rem;
            }
          }

          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 2.5rem;
            }
            .footer ul li { justify-content: center; }
            .social-links { justify-content: center; }
            .logo.light { justify-content: center; }
          }
          .header {
            position: sticky;
            top: 0;
            background: var(--color-white);
            z-index: 1000;
            padding: 1rem 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
          
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: var(--font-serif);
            font-weight: 700;
            font-size: 1.2rem;
            color: inherit;
            text-decoration: none;
          }

          .logo-img {
            height: 70px;
            width: auto;
            object-fit: contain;
            transition: var(--transition);
          }

          .logo:hover .logo-img {
            transform: scale(1.05);
          }
          
          .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          .nav-links a {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: var(--transition);
            color: inherit;
            text-decoration: none;
          }
          
          .nav-links a:hover {
            color: var(--color-olive);
          }
          
          .btn-reserve {
            background: var(--color-olive);
            color: var(--color-white) !important;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-weight: 600;
            letter-spacing: 1px;
            transition: var(--transition);
            text-decoration: none;
            display: inline-block;
            cursor: pointer;
          }
          
          .btn-reserve:hover {
            background: var(--color-stone);
          }
          
          .hero {
            height: 60vh;
            background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/exterieur.jpg');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-white);
            text-align: center;
          }
          
          .hero-content h1 {
            font-size: 3.5rem;
            margin: 0;
            margin-bottom: 1rem;
            letter-spacing: 2px;
          }
          
          .hero-content p {
            font-size: 1.2rem;
            font-weight: 300;
            font-style: italic;
            margin: 0;
          }

          /* Product Layout Styles */
          .product-layout {
            display: grid;
            grid-template-columns: 1fr 350px;
            gap: 4rem;
            padding-top: 5rem;
          }

          .product-header .badge {
            background: var(--color-beige);
            color: var(--color-olive);
            padding: 0.4rem 0.8rem;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 2px;
            border-radius: 4px;
          }

          .product-header h2 {
            font-size: 2.2rem;
            margin: 1rem 0;
            color: var(--color-stone);
          }

          .product-meta {
            display: flex;
            gap: 2rem;
            color: var(--color-accent);
            font-size: 0.9rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 1.5rem;
          }

          .product-meta span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .product-description h3, .product-services h3 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
            color: var(--color-olive);
          }

          .product-description p {
            margin-bottom: 1.2rem;
            font-size: 1.1rem;
          }

          .highlight-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin: 3rem 0;
          }

          .highlight-item {
            background: #fdfdfb;
            padding: 1.5rem;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            border: 1px solid #f0f0e8;
          }

          .highlight-item svg {
            color: var(--color-olive);
          }

          .highlight-item h4 {
            font-size: 1rem;
            margin-bottom: 0.3rem;
          }

          .highlight-item p {
            font-size: 0.85rem;
            margin: 0;
            color: var(--color-accent);
          }

          .services-list {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .service-tag {
            background: var(--color-white);
            border: 1px solid #ddd;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .caretaker-section {
            margin-top: 4rem;
            padding-top: 3rem;
            border-top: 1px solid #eee;
          }

          .caretaker-card {
            display: flex;
            gap: 2rem;
            align-items: center;
            background: var(--color-beige);
            padding: 2rem;
            border-radius: 12px;
          }

          .caretaker-image img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
          }

          /* Sidebar & Booking Card */
          .product-sidebar {
            position: sticky;
            top: 100px;
            height: fit-content;
          }

          .booking-card {
            background: var(--color-white);
            border-radius: 12px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.08);
            overflow: hidden;
            border: 1px solid #eee;
          }

          .price-tag {
            background: var(--color-stone);
            color: var(--color-white);
            padding: 1.5rem;
            text-align: center;
          }

          .price-tag .amount {
            font-size: 2rem;
            font-weight: 700;
            font-family: var(--font-serif);
          }

          .booking-info {
            padding: 1.5rem;
            border-top: 1px solid #eee;
            font-size: 0.85rem;
            color: var(--color-accent);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          /* Experience & Other Sections */
          .text-white {
            color: var(--color-white);
          }

          .bg-stone {
            background-color: var(--color-stone);
          }

          .experience-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
          }

          .experience-text h2 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-family: var(--font-serif);
          }

          .subtitle {
            font-style: italic;
            color: var(--color-accent);
            margin-bottom: 2rem;
            font-size: 1.2rem;
          }

          .experience-image img {
            width: 100%;
            border-radius: 8px;
          }

          .gallery-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
          }

          .tab {
            padding: 0.6rem 1.5rem;
            border-radius: 20px;
            font-size: 0.85rem;
            border: 1px solid #ddd;
            transition: var(--transition);
            background: none;
            cursor: pointer;
          }

          .tab.active {
            background: var(--color-olive);
            color: var(--color-white);
            border-color: var(--color-olive);
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 250px;
            gap: 1rem;
          }

          .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 4px;
          }

          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }

          .gallery-item.large {
            grid-column: span 2;
            grid-row: span 2;
          }

          .gallery-item:hover img {
            transform: scale(1.1);
          }

          .gallery-item .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-white);
            opacity: 0;
            transition: var(--transition);
            font-family: var(--font-serif);
            font-size: 1.5rem;
          }

          .gallery-item:hover .overlay {
            opacity: 1;
          }

          .bg-beige-dark {
            background-color: #edebe4;
          }

          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }

          .contact-details {
            margin-top: 2rem;
          }

          .contact-details p {
            margin-bottom: 0.5rem;
          }

          .contact-form form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .contact-form input, .contact-form textarea {
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: var(--font-sans);
          }

          .footer {
            padding: 3rem 0;
            // text-align: center;
            background: var(--color-stone);
            color: var(--color-white);
          }

          @media (max-width: 1024px) {
            .product-layout {
              grid-template-columns: 1fr;
            }
            .product-sidebar {
              position: static;
            }
          }

          @media (max-width: 768px) {
            .highlight-grid {
              grid-template-columns: 1fr;
            }
            .experience-grid {
              grid-template-columns: 1fr;
            }
            .gallery-grid {
              grid-template-columns: 1fr 1fr;
            }
            .contact-grid {
              grid-template-columns: 1fr;
            }
            .hero-content h1 {
              font-size: 2.5rem;
            }
            .nav-links {
              display: none;
            }
          }
        `}</style>
      </div>
    </Router>
  )
}

export default App
