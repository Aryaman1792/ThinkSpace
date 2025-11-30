import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String },
    colorTheme: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model('Space', spaceSchema);
