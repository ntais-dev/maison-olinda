import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="legal-page container">
      <Helmet>
        <title>Politique de Confidentialité | Maison Sud</title>
      </Helmet>
      <h1>Politique de Confidentialité</h1>
      <section>
        <h2>1. Collecte des données</h2>
        <p>Nous collectons les informations que vous nous fournissez lors de votre réservation : nom, prénom, adresse e-mail, et détails du séjour.</p>
      </section>
      <section>
        <h2>2. Utilisation des données</h2>
        <p>Vos données sont utilisées exclusivement pour la gestion de vos réservations et la communication relative à votre séjour.</p>
      </section>
      <section>
        <h2>3. Paiements</h2>
        <p>Les transactions financières sont gérées par PayPal. Nous ne stockons aucune information bancaire sur nos serveurs.</p>
      </section>
      <style>{`
        .legal-page { padding: 5rem 0; line-height: 1.6; color: var(--color-stone); }
        h1 { font-family: var(--font-serif); margin-bottom: 3rem; color: var(--color-olive); }
        h2 { margin-top: 2rem; font-size: 1.2rem; }
      `}</style>
    </main>
  );
};

export default PrivacyPolicy;
