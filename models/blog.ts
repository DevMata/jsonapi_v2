import mongoose from 'mongoose';
import { commentSchema } from './comment';

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: { type: [commentSchema], required: false },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: null },
  tags: { type: [String], required: false }
});

const Blog = mongoose.model('Blog', blogSchema);

export { Blog };
