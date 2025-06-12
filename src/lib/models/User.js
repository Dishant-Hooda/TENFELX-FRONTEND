// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Hashed
  userType: { type: String, enum: ['freelancer', 'client'], required: true }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
