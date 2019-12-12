import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: null }
});

export const Tag = mongoose.model('Tag', tagSchema);
