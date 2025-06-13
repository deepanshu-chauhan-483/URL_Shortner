import cron from 'node-cron';
import ShortURL from '../models/ShortURL.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule('0 * * * *', async () => {
  const now = new Date();
  const soon = new Date(Date.now() + 3600 * 1000);

  const expiring = await ShortURL.find({
    expiresAt: { $gte: now, $lte: soon },
  });

  for (const url of expiring) {
    const user = await User.findById(url.userId);
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Your Short URL is Expiring Soon!',
      text: `Link: ${url.originalUrl} will expire at ${url.expiresAt}`,
    });
  }
});
