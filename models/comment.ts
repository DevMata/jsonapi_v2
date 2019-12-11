import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: String,
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: null }
})

export { commentSchema }
