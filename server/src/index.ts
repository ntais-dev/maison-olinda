import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(process.cwd(), 'bookings.json');

app.use(cors());
app.use(express.json());

// Initialize database file if it doesn't exist
const initDB = async () => {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify([]));
  }
};
initDB();

// Transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get('/', (req, res) => {
  res.send('Maison Sud API is running. Visit http://localhost:5173 for the frontend.');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET all bookings for the dashboard
app.get('/api/bookings', async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    // Sort by most recent reservation date
    bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

const isRangeBooked = async (checkIn: string, checkOut: string) => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    const newStart = new Date(checkIn);
    const newEnd = new Date(checkOut);

    return bookings.some((booking: any) => {
      const existingStart = new Date(booking.checkIn);
      const existingEnd = new Date(booking.checkOut);
      return (newStart <= existingEnd && newEnd >= existingStart);
    });
  } catch {
    return false;
  }
};

app.post('/api/bookings/block', async (req, res) => {
  const { checkIn, checkOut, reason } = req.body;

  if (await isRangeBooked(checkIn, checkOut)) {
    return res.status(400).json({ error: 'Certaines dates sont déjà réservées ou bloquées.' });
  }

  const newBlock = {
    id: Date.now().toString(),
    checkIn,
    checkOut,
    firstName: 'BLOCKED',
    lastName: reason || 'Manual Block',
    email: '-',
    totalPrice: 0,
    paymentId: '-',
    payerEmail: '-',
    status: 'Blocked',
    createdAt: new Date().toISOString()
  };

  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    bookings.push(newBlock);
    await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
    res.status(201).json(newBlock);
  } catch (err) {
    console.error('Database write error:', err);
    res.status(500).json({ error: 'Failed to block dates' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    let bookings = JSON.parse(data);
    bookings = bookings.filter((b: any) => b.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

app.patch('/api/bookings/:id/confirm', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    let bookings = JSON.parse(data);
    const index = bookings.findIndex((b: any) => b.id === id);
    if (index !== -1) {
      bookings[index].status = 'Confirmed';
      const booking = bookings[index];
      await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
      
      // Send confirmation email
      const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
      };

      const mailOptions = {
        from: process.env.SMTP_FROM || '"Maison Sud" <noreply@maisonsud.com>',
        to: booking.email,
        subject: `✅ SÉJOUR CONFIRMÉ - Maison Sud`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #6b705c; border-bottom: 2px solid #6b705c; padding-bottom: 10px;">Réservation Confirmée</h2>
            <p>Bonjour ${booking.firstName},</p>
            <p>Nous avons bien reçu votre acompte. Votre séjour à <strong>Olinda</strong> est désormais <strong>entièrement confirmé</strong>.</p>
            
            <div style="background-color: #f5f5f0; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0;"><strong>Dates :</strong> Du ${formatDate(booking.checkIn)} au ${formatDate(booking.checkOut)}</p>
              <p style="margin: 5px 0 0;"><strong>Lieu :</strong> Saint-Mélany, Ardèche</p>
            </div>

            <p>Nous vous enverrons les détails d'accès quelques jours avant votre arrivée. L'arrivée se fait généralement à partir de 16h et le départ avant 10h.</p>
            
            <p>À très bientôt,<br>L'équipe Maison Sud</p>
          </div>
        `
      };
      
      try {
        await transporter.sendMail(mailOptions);
      } catch (e) {
        console.error('Failed to send confirmation email');
      }

      res.json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to confirm booking' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { checkIn, checkOut, adults, children, totalPrice, paymentId, payerEmail, firstName, lastName, email, status } = req.body;

  if (await isRangeBooked(checkIn, checkOut)) {
    return res.status(400).json({ error: 'Ces dates ne sont plus disponibles.' });
  }

  const currentStatus = status || 'Confirmed';
  const targetEmail = process.env.SMTP_TO || 'n.tais@eliott-markus.com';

  // 1. Save to JSON "Database"
  const newBooking = {
    id: Date.now().toString(),
    checkIn,
    checkOut,
    adults,
    children,
    firstName,
    lastName,
    email,
    totalPrice,
    paymentId,
    payerEmail, // PayPal payer email or 'PENDING'
    status: currentStatus,
    createdAt: new Date().toISOString()
  };

  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    bookings.push(newBooking);
    await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
  } catch (err) {
    console.error('Database write error:', err);
  }

  // 2. Send Email
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const displayCheckIn = formatDate(checkIn);
  const displayCheckOut = formatDate(checkOut);
  const depositAmount = (totalPrice / 2).toFixed(2);
  
  const isDeposit = currentStatus === 'Awaiting Deposit';

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Maison Sud" <noreply@maisonsud.com>',
    to: `${targetEmail}, ${email}`, // Send to both owner and client
    subject: isDeposit 
      ? `⏳ OPTION POSÉE - Réservation en attente d'acompte - ${firstName} ${lastName}`
      : `🏡 RÉSERVATION CONFIRMÉE - ${firstName} ${lastName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #6b705c; border-bottom: 2px solid #6b705c; padding-bottom: 10px;">
          ${isDeposit ? 'Votre Option pour Olinda' : 'Confirmation de Réservation Olinda'}
        </h2>
        
        <p>Bonjour ${firstName},</p>
        
        ${isDeposit ? `
          <div style="background-color: #fff9f0; border-left: 4px solid #f39c12; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #d35400;">Action Requise : Règlement de l'acompte</p>
            <p style="margin: 10px 0 0;">Pour valider définitivement votre séjour, un acompte de <strong>${depositAmount} €</strong> (50% du total) doit être réglé sous <strong>8 jours</strong>.</p>
            <p style="margin: 10px 0 0; font-size: 0.9em;">Nos coordonnées bancaires vous seront envoyées dans un second message ou contactez-nous directement.</p>
          </div>
        ` : `
          <p>Votre réservation a été confirmée et payée avec succès via PayPal.</p>
        `}
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f5f5f0;">
            <td style="padding: 10px; font-weight: bold;">Dates :</td>
            <td style="padding: 10px;">Du ${displayCheckIn} au ${displayCheckOut}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Client :</td>
            <td style="padding: 10px;">${firstName} ${lastName}</td>
          </tr>
          <tr style="background-color: #f5f5f0;">
            <td style="padding: 10px; font-weight: bold;">Montant Total :</td>
            <td style="padding: 10px; font-weight: bold; color: #6b705c;">${totalPrice} €</td>
          </tr>
          ${!isDeposit ? `
          <tr>
            <td style="padding: 10px; font-weight: bold;">ID Transaction :</td>
            <td style="padding: 10px; font-size: 0.8em;">${paymentId}</td>
          </tr>
          ` : ''}
        </table>

        <p>Nous avons hâte de vous accueillir à la Maison Sud.</p>
        <p style="color: #6b705c; font-style: italic;">L'équipe Maison Sud</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Success' });
  } catch (error) {
    console.log('--- EMAIL FAILED, BUT BOOKING SAVED ---');
    res.status(201).json({ message: 'Success (Saved to DB)' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
