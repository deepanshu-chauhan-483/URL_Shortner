import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
  shortCode: String,
  timestamp: Date,
  ip: String,
  referrer: String,
  deviceType: String,
  visitorHash: String,
});

export default mongoose.model('Visit', VisitSchema);
