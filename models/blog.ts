import mongoose from 'mongoose'
import { commentSchema } from './comment'

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: { type: [commentSchema], required: false },
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: null },
  tags: { type: [String], required: false }
})

const Blog = mongoose.model('Blog', blogSchema)

export { Blog }
