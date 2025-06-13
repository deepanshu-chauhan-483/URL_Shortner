import mongoose from 'mongoose';

const ShortURLSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  tags: [String],
  totalVisits: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  qrCode: String,
});

export default mongoose.model('ShortURL', ShortURLSchema);
