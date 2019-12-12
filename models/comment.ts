import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: null }
});

export const Comment = mongoose.model('Comment', commentSchema);
