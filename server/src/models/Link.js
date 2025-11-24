import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  sourceNoteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "SourceNoteId is required"],
    ref: "Note"
  },
  targetNoteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "TargetNoteId is required"],
    ref: "Note"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "UserId is required"],
    ref: "User"
  }
}, {
  timestamps: true
});

// Prevent duplicate links
linkSchema.index({ sourceNoteId: 1, targetNoteId: 1 }, { unique: true });

const Link = mongoose.model("Link", linkSchema);

export default Link;

