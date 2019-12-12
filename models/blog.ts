import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: null },
  tags: { type: [String], required: false }
});

const Blog = mongoose.model('Blog', blogSchema);

export { Blog };
