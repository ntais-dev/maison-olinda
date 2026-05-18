import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Mail, CreditCard, RefreshCw, Users, Trash2, Lock, Plus, CheckCircle } from 'lucide-react';

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  totalPrice: number;
  paymentId: string;
  payerEmail: string;
  status: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for manual blocking
  const [showBlockForm, setShowBlockForm] = useState(false);
  const [blockStart, setBlockStart] = useState('');
  const [blockEnd, setBlockEnd] = useState('');
  const [blockReason, setBlockReason] = useState('');

  // Airbnb Sync State
  const [airbnbIcalUrl, setAirbnbIcalUrl] = useState('');
  const [syncMessage, setSyncMessage] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError('Erreur lors de la récupération des réservations.');
      }
    } catch (err) {
      setError('Impossible de contacter le serveur.');
    } finally {
      setLoading(false);
    }
  };

  const fetchConfig = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/config');
      if (response.ok) {
        const data = await response.json();
        setAirbnbIcalUrl(data.airbnbIcalUrl || '');
      }
    } catch (err) {
      console.error('Failed to fetch config');
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchConfig();
  }, []);

  const handleSaveConfig = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ airbnbIcalUrl }),
      });
      if (response.ok) {
        alert('URL Airbnb enregistrée avec succès.');
      }
    } catch (err) {
      alert('Erreur lors de l\'enregistrement.');
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncMessage('Synchronisation en cours...');
    try {
      const response = await fetch('http://localhost:3001/api/sync-airbnb', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setSyncMessage(data.message);
        fetchBookings();
      } else {
        setSyncMessage('Échec de la synchronisation.');
      }
    } catch (err) {
      setSyncMessage('Erreur de connexion.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(''), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== id));
      } else {
        alert('Erreur lors de la suppression.');
      }
    } catch (err) {
      alert('Erreur technique.');
    }
  };

  const handleConfirmDeposit = async (id: string) => {
    if (!window.confirm('Confirmer la réception de l\'acompte ?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/bookings/${id}/confirm`, {
        method: 'PATCH',
      });
      if (response.ok) {
        fetchBookings();
      } else {
        alert('Erreur lors de la confirmation.');
      }
    } catch (err) {
      alert('Erreur technique.');
    }
  };

  const handleBlockDates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockStart || !blockEnd) {
      alert('Sélectionnez les dates de début et de fin.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/bookings/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: blockStart,
          checkOut: blockEnd,
          reason: blockReason
        }),
      });

      if (response.ok) {
        setShowBlockForm(false);
        setBlockStart('');
        setBlockEnd('');
        setBlockReason('');
        fetchBookings();
      } else {
        alert('Erreur lors du blocage des dates.');
      }
    } catch (err) {
      alert('Erreur technique.');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <main className="dashboard-page">
      <Helmet>
        <title>Tableau de Bord | Maison Sud</title>
      </Helmet>

      <section className="dashboard-header-section">
        <div className="container">
          <div className="dashboard-title-area">
            <h1>TABLEAU DE BORD</h1>
            <div className="dashboard-actions">
              <button onClick={() => setShowBlockForm(!showBlockForm)} className="btn-block-toggle">
                {showBlockForm ? 'Annuler' : <><Lock size={18} /> Bloquer Dates</>}
              </button>
              <button onClick={fetchBookings} className="btn-refresh">
                <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                Actualiser
              </button>
            </div>
          </div>
          
          {showBlockForm && (
            <div className="block-form-container">
              <h3>Bloquer des dates (Indisponibilité)</h3>
              <form onSubmit={handleBlockDates} className="block-form">
                <div className="form-group-dash">
                  <label>Début</label>
                  <input type="date" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} required />
                </div>
                <div className="form-group-dash">
                  <label>Fin</label>
                  <input type="date" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} required />
                </div>
                <div className="form-group-dash">
                  <label>Raison (Optionnel)</label>
                  <input type="text" placeholder="Entretien, Perso..." value={blockReason} onChange={(e) => setBlockReason(e.target.value)} />
                </div>
                <button type="submit" className="btn-submit-block">BLOQUER</button>
              </form>
            </div>
          )}
        </div>
      </section>

      <div className="container dashboard-container">
        {loading && bookings.length === 0 ? (
          <div className="dashboard-status">Chargement des données...</div>
        ) : error ? (
          <div className="dashboard-status error">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="dashboard-status empty">Aucune réservation pour le moment.</div>
        ) : (
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Date Résa</th>
                  <th>Client / Raison</th>
                  <th>Dates Séjour</th>
                  <th>Voyageurs</th>
                  <th>Montant</th>
                  <th>Transaction</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className={booking.status === 'Blocked' ? 'row-blocked' : ''}>
                    <td>{formatDate(booking.createdAt)}</td>
                    <td className="client-cell">
                      {booking.status === 'Blocked' ? (
                        <div className="block-info">
                          <Lock size={14} />
                          <strong>{booking.lastName}</strong>
                        </div>
                      ) : (
                        <div className="client-info">
                          <strong>{booking.firstName} {booking.lastName}</strong>
                          <div className="client-sub">
                            <Mail size={12} />
                            <span>{booking.email}</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="stay-dates">
                        <span>{formatDate(booking.checkIn)}</span>
                        <span className="separator">→</span>
                        <span>{formatDate(booking.checkOut)}</span>
                      </div>
                    </td>
                    <td>
                      {booking.status !== 'Blocked' && (
                        <div className="guests-info">
                          <Users size={14} />
                          <span>{booking.adults}A + {booking.children}E</span>
                        </div>
                      )}
                    </td>
                    <td className="price-cell">{booking.totalPrice > 0 ? `${booking.totalPrice} €` : '-'}</td>
                    <td>
                      {booking.status !== 'Blocked' && (
                        <div className="payment-id">
                          <CreditCard size={14} />
                          <span>{booking.paymentId}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '.')}`}>
                        {booking.status === 'Blocked' ? 'Bloqué' : 
                         booking.status === 'Awaiting Deposit' ? 'En attente acompte' : 
                         booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-cell">
                        {booking.status === 'Awaiting Deposit' && (
                          <button 
                            onClick={() => handleConfirmDeposit(booking.id)} 
                            className="btn-confirm-action"
                            title="Confirmer l'acompte"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(booking.id)} 
                          className="btn-delete"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Airbnb Synchronization Section */}
        <div className="sync-section">
          <h2>Synchronisation Airbnb</h2>
          
          <div className="sync-grid">
            <div className="sync-card">
              <h3>1. Exporter vers Airbnb</h3>
              <p>Copiez cette URL et collez-la dans Airbnb (Importer un calendrier) :</p>
              <div className="url-display">
                <code>http://localhost:3001/api/export-ical</code>
                <button onClick={() => {
                  navigator.clipboard.writeText('http://localhost:3001/api/export-ical');
                  alert('URL copiée !');
                }}>Copier</button>
              </div>
            </div>

            <div className="sync-card">
              <h3>2. Importer depuis Airbnb</h3>
              <p>Collez ici l'URL iCal fournie par Airbnb (Exporter le calendrier) :</p>
              <div className="sync-input-group">
                <input 
                  type="text" 
                  placeholder="https://www.airbnb.com/calendar/ical/..." 
                  value={airbnbIcalUrl}
                  onChange={(e) => setAirbnbIcalUrl(e.target.value)}
                />
                <button onClick={handleSaveConfig} className="btn-save">Enregistrer</button>
              </div>
              <div className="sync-actions">
                <button onClick={handleManualSync} disabled={isSyncing} className="btn-sync-now">
                  <RefreshCw size={16} className={isSyncing ? 'spinning' : ''} />
                  Synchroniser maintenant
                </button>
                {syncMessage && <span className="sync-status-msg">{syncMessage}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .action-cell {
          display: flex;
          gap: 0.5rem;
        }
        .btn-confirm-action {
          background: none;
          border: none;
          color: #27ae60;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
          padding: 0.5rem;
        }
        .btn-confirm-action:hover {
          opacity: 1;
        }
        .dashboard-page {
          background: #fcfcf9;
          min-height: calc(100vh - 200px);
          padding-bottom: 5rem;
        }
        .dashboard-header-section {
          background: var(--color-stone);
          color: white;
          padding: 3rem 0;
          margin-bottom: 3rem;
        }
        .dashboard-title-area {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dashboard-title-area h1 {
          margin: 0;
          letter-spacing: 4px;
          font-size: 2.5rem;
        }
        .dashboard-actions {
          display: flex;
          gap: 1rem;
        }
        .btn-refresh, .btn-block-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-olive);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition);
          cursor: pointer;
          border: none;
        }
        .btn-block-toggle {
          background: #8b4513;
        }
        .btn-refresh:hover, .btn-block-toggle:hover {
          opacity: 0.9;
        }
        
        .block-form-container {
          margin-top: 2rem;
          background: rgba(255,255,255,0.1);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px dashed rgba(255,255,255,0.3);
        }
        .block-form-container h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #eee;
        }
        .block-form {
          display: flex;
          gap: 1.5rem;
          align-items: flex-end;
          flex-wrap: wrap;
        }
        .form-group-dash {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group-dash label {
          font-size: 0.75rem;
          text-transform: uppercase;
          opacity: 0.8;
        }
        .form-group-dash input {
          padding: 0.5rem;
          border-radius: 4px;
          border: none;
          background: white;
          color: var(--color-stone);
        }
        .btn-submit-block {
          background: white;
          color: #8b4513;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 4px;
          font-weight: 700;
          cursor: pointer;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .dashboard-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          padding: 2rem;
          min-height: 400px;
        }
        .dashboard-status {
          text-align: center;
          padding: 5rem;
          color: var(--color-accent);
          font-style: italic;
        }
        .dashboard-status.error {
          color: #c0392b;
        }
        .bookings-table-wrapper {
          overflow-x: auto;
        }
        .bookings-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .bookings-table th {
          padding: 1rem;
          background: #f8f8f6;
          color: var(--color-accent);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          border-bottom: 1px solid #eee;
        }
        .bookings-table td {
          padding: 1.2rem 1rem;
          border-bottom: 1px solid #f5f5f5;
          font-size: 0.9rem;
          color: var(--color-stone);
        }
        .row-blocked {
          background-color: #fff9f5;
        }
        .block-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #8b4513;
        }
        .client-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .client-sub {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--color-accent);
        }
        .stay-dates, .guests-info, .payment-id {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .separator {
          color: var(--color-accent);
          font-weight: bold;
        }
        .price-cell {
          font-weight: 700;
          color: var(--color-olive);
        }
        .status-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .status-badge.confirmed {
          background: #e8f5e9;
          color: #2e7d32;
        }
        .status-badge.awaiting.deposit {
          background: #fff3e0;
          color: #ef6c00;
        }
        .status-badge.blocked {
          background: #ffe0b2;
          color: #e65100;
        }
        .btn-delete {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
          padding: 0.5rem;
        }
        .btn-delete:hover {
          opacity: 1;
        }
        
        /* Sync Styles */
        .sync-section {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 2px solid #f5f5f0;
        }
        .sync-section h2 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--color-stone);
          letter-spacing: 2px;
        }
        .sync-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .sync-card {
          background: #fcfcf9;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #eee;
        }
        .sync-card h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--color-olive);
        }
        .sync-card p {
          font-size: 0.85rem;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }
        .url-display {
          display: flex;
          background: #f0f0eb;
          padding: 0.5rem;
          border-radius: 4px;
          align-items: center;
          gap: 1rem;
        }
        .url-display code {
          flex: 1;
          font-size: 0.75rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .url-display button, .btn-save {
          background: var(--color-stone);
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
        }
        .sync-input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .sync-input-group input {
          flex: 1;
          padding: 0.6rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.85rem;
        }
        .btn-sync-now {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-olive);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-sync-now:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .sync-status-msg {
          display: block;
          margin-top: 0.8rem;
          font-size: 0.85rem;
          color: var(--color-olive);
          font-style: italic;
        }
        @media (max-width: 992px) {
          .sync-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .dashboard-title-area {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
};

export default Dashboard;
