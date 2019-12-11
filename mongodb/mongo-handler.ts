import mongoose from 'mongoose'

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/playground', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(err.stack)
  }
}

connect()

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
  const courses = await Course.find()

  console.log(courses)
}

getCourses()
