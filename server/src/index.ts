import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import ical from 'ical-generator';
import nodeIcal from 'node-ical';
import axios from 'axios';
import cron from 'node-cron';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(process.cwd(), 'bookings.json');
const CONFIG_PATH = path.join(process.cwd(), 'config.json');

app.use(cors());
app.use(express.json());

// Expiration Logic Task (Runs every hour)
cron.schedule('0 * * * *', async () => {
  console.log('Running automatic expiration check...');
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    let bookings = JSON.parse(data);
    let updated = false;

    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

    bookings = bookings.map((booking: any) => {
      if (booking.status === 'Awaiting Deposit' && new Date(booking.createdAt) < eightDaysAgo) {
        booking.status = 'Expired';
        updated = true;
        console.log(`Booking ${booking.id} has expired.`);
      }
      return booking;
    });

    if (updated) {
      await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
    }
  } catch (err) {
    console.error('Expiration task failed:', err);
  }
});

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
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get('/', (req, res) => {
  res.send('Maison Sud API is running.');
});

// GET all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const bookings = JSON.parse(data);
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
      if (booking.status === 'Cancelled' || booking.status === 'Expired') return false;
      const existingStart = new Date(booking.checkIn);
      const existingEnd = new Date(booking.checkOut);
      return (newStart < existingEnd && newEnd > existingStart);
    });
  } catch {
    return false;
  }
};

app.post('/api/bookings', async (req, res) => {
  const { checkIn, checkOut, adults, children, totalPrice, depositAmount, paymentId, payerEmail, firstName, lastName, email, status } = req.body;

  if (await isRangeBooked(checkIn, checkOut)) {
    return res.status(400).json({ error: 'Ces dates ne sont plus disponibles.' });
  }

  const currentStatus = status || 'Confirmed';
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
    depositAmount: depositAmount || (totalPrice / 2),
    paymentId,
    payerEmail,
    status: currentStatus,
    createdAt: new Date().toISOString()
  };

  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const bookings = JSON.parse(data);
    bookings.push(newBooking);
    await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));

    // Send Emails... (Nodemailer logic here)
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save booking' });
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
      await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
      res.json(bookings[index]);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to confirm' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    let bookings = JSON.parse(data);
    bookings = bookings.filter((b: any) => b.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

// ICAL Sync logic remains...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
