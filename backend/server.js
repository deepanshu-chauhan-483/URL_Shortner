import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import redirectRoutes from './routes/redirectRoute.js';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import './utils/sendExpiryEmails.js'; 


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/', redirectRoutes); 


const PORT = process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected successfully');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
  process.exit(1); // Optional: exit process if connection fails
});