// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  budget: Number,
  deadline: Date,
  category: String,
  skillsRequired: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }]
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
