import React from 'react';
import { Helmet } from 'react-helmet-async';

const LegalNotice: React.FC = () => {
  return (
    <main className="legal-page container">
      <Helmet>
        <title>Mentions Légales | Maison Sud</title>
      </Helmet>
      <h1>Mentions Légales</h1>
      <section>
        <h2>Éditeur du site</h2>
        <p>Maison Sud / Olinda<br />Saint-Mélany, Ardèche, France</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Ce site est hébergé localement à des fins de démonstration.</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de Maison Sud.</p>
      </section>
      <style>{`
        .legal-page { padding: 5rem 0; line-height: 1.6; color: var(--color-stone); }
        h1 { font-family: var(--font-serif); margin-bottom: 3rem; color: var(--color-olive); }
        h2 { margin-top: 2rem; font-size: 1.2rem; }
      `}</style>
    </main>
  );
};

export default LegalNotice;
