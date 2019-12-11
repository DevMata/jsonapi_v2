import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/blogs', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
