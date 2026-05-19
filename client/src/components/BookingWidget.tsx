import React, { useState, useEffect, useRef } from 'react';
import { Users, Calendar as CalendarIcon, Plus, Minus, X, CheckCircle, Mail } from 'lucide-react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import CalendarPicker from './CalendarPicker';

const BookingWidget: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'deposit'>('paypal');
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  const BASE_PRICE = 300;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bookings');
        if (response.ok) {
          const data = await response.json();
          setExistingBookings(data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        let price = days * BASE_PRICE;
        if (days >= 6) price *= 0.9; // 10% discount
        setTotalPrice(Math.round(price));
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
      setShowPayment(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const handleProceedToPayment = () => {
    if (!startDate || !endDate) {
      alert('Veuillez sélectionner vos dates de séjour.');
      return;
    }
    if (!firstName || !lastName || !email) {
      alert('Veuillez remplir vos coordonnées (Nom, Prénom, Email).');
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Veuillez entrer une adresse email valide.');
      return;
    }
    setShowPayment(true);
  };

  const completeBooking = async (details: any = null) => {
    const depositAmount = totalPrice / 2;
    const bookingData = { 
      checkIn: startDate?.toISOString().split('T')[0], 
      checkOut: endDate?.toISOString().split('T')[0], 
      adults, 
      children, 
      firstName,
      lastName,
      email,
      totalPrice,
      depositAmount,
      paymentId: details?.id || 'PENDING',
      payerEmail: details?.payer?.email_address || '-',
      status: details ? 'Confirmed' : 'Awaiting Deposit',
      // The server will calculate the 8-day deadline
    };
    
    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      const data = await response.json();

      if (response.ok) {
        setPaymentDetails(details);
        setSubmitted(true);
      } else {
        alert(data.error || 'Une erreur est survenue lors de l\'enregistrement de la réservation. Veuillez vérifier vos dates.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Le serveur de réservation ne répond pas. Veuillez réessayer plus tard ou nous contacter directement.');
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (submitted) {
    return (
      <div className="booking-widget success-state">
        <div className="success-content">
          <div className="check-icon"><CheckCircle size={40} /></div>
          <h3>{paymentDetails ? 'Réservation Confirmée !' : 'Demande Enregistrée !'}</h3>
          {paymentDetails ? (
            <p>Merci <strong>{firstName}</strong> pour votre paiement de <strong>{totalPrice} €</strong>.</p>
          ) : (
            <p>Votre option pour <strong>{totalPrice} €</strong> est posée. Veuillez régler l'acompte de 50% ({totalPrice/2} €) sous 8 jours.</p>
          )}
          <p className="sub-text">Un email avec les instructions a été envoyé à {email}.</p>
          <button onClick={() => {
            setSubmitted(false);
            setStartDate(null);
            setEndDate(null);
            setFirstName('');
            setLastName('');
            setEmail('');
            setShowPayment(false);
            setPaymentMethod('paypal');
          }} className="btn-check">RETOUR</button>
        </div>
        <style>{`
          .success-state {
            text-align: center;
            padding: 3rem 1.5rem;
          }
          .success-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.2rem;
          }
          .check-icon {
            color: var(--color-olive);
            margin-bottom: 0.5rem;
          }
          .success-state h3 {
            font-size: 1.6rem;
            color: var(--color-olive);
            margin: 0;
          }
          .success-state p {
            color: var(--color-stone);
            line-height: 1.6;
            margin: 0;
          }
          .sub-text {
            font-size: 0.85rem;
            opacity: 0.8;
            color: var(--color-accent);
          }
          .btn-check {
            background: var(--color-olive);
            color: var(--color-white);
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="booking-widget">
      <div className="booking-form-content">
        <div className="date-selection-container" ref={calendarRef}>
          <div className="date-inputs-row" onClick={() => setShowCalendar(!showCalendar)}>
            <div className="form-group">
              <label><CalendarIcon size={14} /> ARRIVÉE</label>
              <div className="date-display">{formatDate(startDate) || 'Sélectionner'}</div>
            </div>
            <div className="date-separator">→</div>
            <div className="form-group">
              <label><CalendarIcon size={14} /> DÉPART</label>
              <div className="date-display">{formatDate(endDate) || 'Sélectionner'}</div>
            </div>
          </div>

          {showCalendar && (
            <div className="calendar-dropdown">
              <div className="calendar-dropdown-header">
                <span>Choisir vos dates</span>
                <button type="button" onClick={() => setShowCalendar(false)}><X size={16} /></button>
              </div>
              <CalendarPicker 
                startDate={startDate} 
                endDate={endDate} 
                existingBookings={existingBookings}
                onChange={(s, e) => {
                  setStartDate(s);
                  setEndDate(e);
                }} 
              />
            </div>
          )}
        </div>

        <div className="guests-row">
          <div className="form-group">
            <label><Users size={14} /> ADULTES</label>
            <div className="counter">
              <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}><Minus size={12} /></button>
              <span>{adults}</span>
              <button type="button" onClick={() => setAdults(adults + 1)}><Plus size={12} /></button>
            </div>
          </div>

          <div className="form-group">
            <label><Users size={14} /> ENFANTS</label>
            <div className="counter">
              <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}><Minus size={12} /></button>
              <span>{children}</span>
              <button type="button" onClick={() => setChildren(children + 1)}><Plus size={12} /></button>
            </div>
          </div>
        </div>

        <div className="personal-info-grid">
          <div className="form-group">
            <label>PRÉNOM</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>NOM</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label><Mail size={14} /> EMAIL DE CONTACT</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>

        {!showPayment && (
          <div className="price-summary">
            {totalPrice > 0 && (
              <div className="price-details">
                <span>Total pour le séjour :</span>
                <strong>{totalPrice} €</strong>
              </div>
            )}
            <button 
              type="button" 
              className="btn-check"
              onClick={handleProceedToPayment}
              disabled={!startDate || !endDate || !firstName || !lastName || !email}
            >
              CONTINUER
            </button>
          </div>
        )}

        {showPayment && totalPrice > 0 && (
          <div className="payment-area">
            <div className="payment-method-selector">
              <button 
                className={`method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                Payer maintenant
              </button>
              <button 
                className={`method-btn ${paymentMethod === 'deposit' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('deposit')}
              >
                Payer l'acompte plus tard
              </button>
            </div>

            {paymentMethod === 'paypal' ? (
              <div className="paypal-container">
                <div className="payment-header">
                  <span>Règlement via PayPal</span>
                  <button onClick={() => setShowPayment(false)} className="btn-back">Retour</button>
                </div>
                <PayPalButtons 
                  style={{ layout: "vertical", color: "silver", shape: "rect", label: "pay" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "EUR",
                            value: totalPrice.toString(),
                          },
                          description: `Séjour Maison Sud - ${formatDate(startDate)} au ${formatDate(endDate)}`,
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      const details = await actions.order.capture();
                      completeBooking(details);
                    }
                  }}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    alert("Une erreur est survenue avec PayPal. Veuillez réessayer.");
                  }}
                />
              </div>
            ) : (
              <div className="deposit-container">
                <p className="deposit-info">
                  Vous avez <strong>8 jours</strong> pour régler un acompte de <strong>{(totalPrice / 2).toFixed(2)} €</strong> (50%) afin de valider définitivement votre séjour.
                </p>
                <button className="btn-check" onClick={() => completeBooking()}>
                  CONFIRMER MA RÉSERVATION
                </button>
                <button onClick={() => setShowPayment(false)} className="btn-back-center">Retour aux options</button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .booking-widget {
          padding: 1.5rem;
          color: var(--color-stone);
        }

        .booking-form-content {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .date-selection-container {
          position: relative;
        }

        .date-inputs-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem;
          border: 1px solid #eee;
          border-radius: 8px;
          background: #fcfcfc;
          cursor: pointer;
          transition: border-color 0.2s;
          justify-content: space-between;
        }

        .date-inputs-row:hover {
          border-color: var(--color-olive);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.6rem 0.8rem;
          border: 1px solid #eee;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.9rem;
          background: #fcfcfc;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: var(--color-olive);
        }

        .personal-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .date-display {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-stone);
        }

        .calendar-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 100;
          margin-top: 0.5rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          background: white;
          border-radius: 8px;
          overflow: hidden;
          width: 320px;
        }

        .calendar-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1rem;
          background: #f8f8f8;
          border-bottom: 1px solid #eee;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .guests-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-olive);
        }

        .counter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem;
          border: 1px solid #eee;
          border-radius: 8px;
          background: #fcfcfc;
        }

        .counter button {
          color: var(--color-olive);
          padding: 0.2rem;
        }

        .counter span {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .price-summary {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px dotted #ccc;
        }

        .price-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-details strong {
          font-size: 1.4rem;
          color: var(--color-olive);
          font-family: var(--font-serif);
        }

        .payment-area {
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .payment-method-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .method-btn {
          padding: 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 4px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          transition: var(--transition);
        }

        .method-btn.active {
          background: var(--color-stone);
          color: white;
          border-color: var(--color-stone);
        }

        .payment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-accent);
          text-transform: uppercase;
        }

        .deposit-info {
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          background: var(--color-beige);
          padding: 1rem;
          border-radius: 8px;
          color: var(--color-stone);
        }

        .btn-back {
          color: var(--color-olive);
          text-decoration: underline;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .btn-back-center {
          display: block;
          margin: 1rem auto 0;
          background: none;
          color: var(--color-accent);
          text-decoration: underline;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .btn-check {
          background: var(--color-olive);
          color: var(--color-white);
          padding: 1rem;
          border-radius: 8px;
          font-weight: 700;
          letter-spacing: 1.5px;
          font-size: 0.8rem;
          transition: var(--transition);
          width: 100%;
          text-align: center;
          cursor: pointer;
        }

        .btn-check:hover:not(:disabled) {
          background: var(--color-stone);
        }

        .btn-check:disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default BookingWidget;
