import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  image: { type: String },
  sparks: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
