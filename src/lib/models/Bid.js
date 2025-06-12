// models/Bid.js
import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  amount: Number,
  deliveryTime: Number, // in days
  comment: String,
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Bid || mongoose.model('Bid', bidSchema);
